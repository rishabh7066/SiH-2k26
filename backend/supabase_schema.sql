-- ============================================================
-- GramVenture AI — Supabase Postgres Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── PROFILES TABLE ──────────────────────────────────────────────────────────
-- Extends Supabase auth.users with extra profile info
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name    TEXT,
  phone        TEXT,
  village      TEXT,
  state        TEXT,
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.phone
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── VILLAGES TABLE ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.villages (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT        NOT NULL,
  block        TEXT,
  tehsil       TEXT,
  district     TEXT        NOT NULL,
  state        TEXT        NOT NULL,
  population   INTEGER,
  lat          DECIMAL(10, 7),
  lng          DECIMAL(10, 7),
  pincode      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast text search
CREATE INDEX IF NOT EXISTS idx_villages_name ON public.villages USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_villages_district ON public.villages(district);
CREATE INDEX IF NOT EXISTS idx_villages_state ON public.villages(state);

-- ─── ASSESSMENTS TABLE ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.assessments (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  village_id      UUID        REFERENCES public.villages(id) ON DELETE SET NULL,
  business_type   TEXT        NOT NULL,
  input_data      JSONB       NOT NULL DEFAULT '{}',
  result_data     JSONB       NOT NULL DEFAULT '{}',
  score           INTEGER     CHECK (score >= 0 AND score <= 100),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessments_user ON public.assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created ON public.assessments(created_at DESC);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

-- Profiles: users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Villages: anyone can read (public data)
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Villages are publicly readable"
  ON public.villages FOR SELECT
  USING (true);

-- Assessments: users can only see their own
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessments"
  ON public.assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON public.assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- ─── PHASE 2 SCHEMA EXPANSIONS ───────────────────────────────────────────────

-- 1. Add Census demographics & amenities columns to villages
ALTER TABLE public.villages 
  ADD COLUMN IF NOT EXISTS households        INTEGER,
  ADD COLUMN IF NOT EXISTS male_pop          INTEGER,
  ADD COLUMN IF NOT EXISTS female_pop        INTEGER,
  ADD COLUMN IF NOT EXISTS literacy_rate     DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS road_type         TEXT DEFAULT 'paved',
  ADD COLUMN IF NOT EXISTS railway_dist_km   DECIMAL(6, 2),
  ADD COLUMN IF NOT EXISTS bus_service       BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS amenities         JSONB DEFAULT '{}';

-- 2. Local Businesses & Competitor Intelligence Table
CREATE TABLE IF NOT EXISTS public.local_businesses (
  id            UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id    UUID         REFERENCES public.villages(id) ON DELETE CASCADE,
  name          TEXT         NOT NULL,
  category      TEXT         NOT NULL,
  sub_category  TEXT,
  lat           DECIMAL(10, 7) NOT NULL,
  lng           DECIMAL(10, 7) NOT NULL,
  source        TEXT         DEFAULT 'osm_overpass', -- 'osm_overpass' | 'census' | 'field_survey'
  is_competitor BOOLEAN      DEFAULT true,
  tags          JSONB        DEFAULT '{}',
  created_at    TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_local_biz_village ON public.local_businesses(village_id);
CREATE INDEX IF NOT EXISTS idx_local_biz_category ON public.local_businesses(category);
CREATE INDEX IF NOT EXISTS idx_local_biz_coords ON public.local_businesses(lat, lng);

ALTER TABLE public.local_businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Local businesses are publicly readable"
  ON public.local_businesses FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated or service insert to local_businesses"
  ON public.local_businesses FOR INSERT
  WITH CHECK (true);

-- 3. Village Business Health Scores Table
CREATE TABLE IF NOT EXISTS public.village_health_scores (
  id                    UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id            UUID        REFERENCES public.villages(id) ON DELETE CASCADE UNIQUE,
  overall_score         INTEGER     CHECK (overall_score >= 0 AND overall_score <= 100),
  demand_index          INTEGER     CHECK (demand_index >= 0 AND demand_index <= 100),
  competition_index     INTEGER     CHECK (competition_index >= 0 AND competition_index <= 100),
  infrastructure_index  INTEGER     CHECK (infrastructure_index >= 0 AND infrastructure_index <= 100),
  missing_categories    JSONB       DEFAULT '[]',
  recommendations       JSONB       DEFAULT '[]',
  metrics               JSONB       DEFAULT '{}',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_health_scores_village ON public.village_health_scores(village_id);

ALTER TABLE public.village_health_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Health scores are publicly readable"
  ON public.village_health_scores FOR SELECT
  USING (true);

-- ─── SAMPLE VILLAGE DATA (UP) ─────────────────────────────────────────────────
INSERT INTO public.villages (name, block, district, state, population, lat, lng, pincode, households, literacy_rate, road_type, railway_dist_km, bus_service, amenities) VALUES
  ('Adampur',     'Sewapuri',    'Varanasi',   'Uttar Pradesh', 3200,  25.2845, 82.9563, '221404', 450, 68.5, 'paved', 8.5, true, '{"electricity_hours": 18, "bank_branch": false, "atm": true, "primary_health_center": true, "veterinary_clinic": false, "cold_storage_dist_km": 14, "mandi_dist_km": 11, "mobile_coverage": "4G"}'),
  ('Rampur',      'Kashi Vidyapeeth', 'Varanasi', 'Uttar Pradesh', 4800, 25.3100, 83.0100, '221105', 680, 72.0, 'paved', 4.0, true, '{"electricity_hours": 20, "bank_branch": true, "atm": true, "primary_health_center": true, "veterinary_clinic": true, "cold_storage_dist_km": 9, "mandi_dist_km": 6, "mobile_coverage": "5G"}'),
  ('Shivpur',     'Arajiline',   'Varanasi',   'Uttar Pradesh', 2700,  25.2200, 82.9800, '221010', 380, 64.0, 'paved', 12.0, true, '{"electricity_hours": 16, "bank_branch": false, "atm": false, "primary_health_center": false, "veterinary_clinic": false, "cold_storage_dist_km": 18, "mandi_dist_km": 15, "mobile_coverage": "4G"}'),
  ('Lohta',       'Lohta',       'Varanasi',   'Uttar Pradesh', 5600,  25.3800, 83.0600, '221107', 820, 75.5, 'paved', 2.5, true, '{"electricity_hours": 22, "bank_branch": true, "atm": true, "primary_health_center": true, "veterinary_clinic": false, "cold_storage_dist_km": 6, "mandi_dist_km": 4, "mobile_coverage": "5G"}'),
  ('Baragaon',    'Baragaon',    'Varanasi',   'Uttar Pradesh', 8200,  25.2000, 82.8500, '221002', 1200, 70.0, 'paved', 15.0, true, '{"electricity_hours": 18, "bank_branch": true, "atm": true, "primary_health_center": true, "veterinary_clinic": true, "cold_storage_dist_km": 12, "mandi_dist_km": 8, "mobile_coverage": "4G"}'),
  ('Chandpur',    'Pindra',      'Varanasi',   'Uttar Pradesh', 3100,  25.5100, 83.0200, '221206', 420, 66.0, 'unpaved', 9.0, false, '{"electricity_hours": 14, "bank_branch": false, "atm": false, "primary_health_center": false, "veterinary_clinic": false, "cold_storage_dist_km": 22, "mandi_dist_km": 16, "mobile_coverage": "4G"}'),
  ('Sakaldiha',   'Sakaldiha',   'Chandauli',  'Uttar Pradesh', 6400,  25.0800, 83.2800, '232105', 910, 68.0, 'paved', 1.0, true, '{"electricity_hours": 19, "bank_branch": true, "atm": true, "primary_health_center": true, "veterinary_clinic": true, "cold_storage_dist_km": 15, "mandi_dist_km": 10, "mobile_coverage": "4G"}'),
  ('Mughal Sarai','Mughal Sarai','Chandauli',  'Uttar Pradesh', 92000, 25.2800, 83.1200, '232101', 14000, 78.0, 'paved', 0.5, true, '{"electricity_hours": 23, "bank_branch": true, "atm": true, "primary_health_center": true, "veterinary_clinic": true, "cold_storage_dist_km": 5, "mandi_dist_km": 3, "mobile_coverage": "5G"}'),
  ('Jaunpur',     'Jaunpur',     'Jaunpur',    'Uttar Pradesh', 180000, 25.7454, 82.6842, '222001', 28000, 79.5, 'paved', 2.0, true, '{"electricity_hours": 22, "bank_branch": true, "atm": true, "primary_health_center": true, "veterinary_clinic": true, "cold_storage_dist_km": 8, "mandi_dist_km": 2, "mobile_coverage": "5G"}'),
  ('Mirzapur',    'Mirzapur',    'Mirzapur',   'Uttar Pradesh', 233691, 25.1449, 82.5691, '231001', 36000, 76.0, 'paved', 3.0, true, '{"electricity_hours": 21, "bank_branch": true, "atm": true, "primary_health_center": true, "veterinary_clinic": true, "cold_storage_dist_km": 7, "mandi_dist_km": 4, "mobile_coverage": "5G"}')
ON CONFLICT DO NOTHING;
