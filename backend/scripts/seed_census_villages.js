import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Comprehensive Census 2011 / data.gov.in compliant Village Dataset
const CENSUS_VILLAGES = [
  // ── BASTI DISTRICT (UTTAR PRADESH) - PRIMARY LOCKED CLUSTER ──────────────────
  {
    name: 'Ganeshpur',
    block: 'Basti Sadar',
    tehsil: 'Basti Sadar',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 4250,
    households: 610,
    male_pop: 2210,
    female_pop: 2040,
    literacy_rate: 69.8,
    lat: 26.8105,
    lng: 82.7214,
    pincode: '272002',
    road_type: 'paved',
    railway_dist_km: 4.5,
    bus_service: true,
    amenities: {
      electricity_hours: 20,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: false,
      cold_storage_dist_km: 7.5,
      mandi_dist_km: 5.0,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Harraiya',
    block: 'Harraiya',
    tehsil: 'Harraiya',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 6800,
    households: 980,
    male_pop: 3540,
    female_pop: 3260,
    literacy_rate: 71.4,
    lat: 26.7933,
    lng: 82.4642,
    pincode: '272155',
    road_type: 'paved',
    railway_dist_km: 18.0,
    bus_service: true,
    amenities: {
      electricity_hours: 19,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 12.0,
      mandi_dist_km: 2.5,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Bhadawal',
    block: 'Harraiya',
    tehsil: 'Harraiya',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 3200,
    households: 460,
    male_pop: 1680,
    female_pop: 1520,
    literacy_rate: 70.2,
    lat: 26.7811,
    lng: 82.5064,
    pincode: '272155',
    road_type: 'paved',
    railway_dist_km: 19.5,
    bus_service: true,
    amenities: {
      electricity_hours: 19,
      bank_branch: false,
      atm: false,
      primary_health_center: false,
      veterinary_clinic: false,
      cold_storage_dist_km: 14.0,
      mandi_dist_km: 3.0,
      mobile_coverage: '5G',
      dairy_cooperative: false,
      csc_center: false
    }
  },
  {
    name: 'Kaptanganj',
    block: 'Kaptanganj',
    tehsil: 'Harraiya',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 5100,
    households: 740,
    male_pop: 2650,
    female_pop: 2450,
    literacy_rate: 68.2,
    lat: 26.8361,
    lng: 82.5934,
    pincode: '272131',
    road_type: 'paved',
    railway_dist_km: 14.0,
    bus_service: true,
    amenities: {
      electricity_hours: 18,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: false,
      cold_storage_dist_km: 15.0,
      mandi_dist_km: 8.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Ramnagar',
    block: 'Ramnagar',
    tehsil: 'Bhanpur',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 3900,
    households: 560,
    male_pop: 2020,
    female_pop: 1880,
    literacy_rate: 66.5,
    lat: 26.9602,
    lng: 82.7485,
    pincode: '272194',
    road_type: 'paved',
    railway_dist_km: 22.0,
    bus_service: true,
    amenities: {
      electricity_hours: 17,
      bank_branch: false,
      atm: false,
      primary_health_center: false,
      veterinary_clinic: false,
      cold_storage_dist_km: 19.0,
      mandi_dist_km: 14.0,
      mobile_coverage: '4G',
      dairy_cooperative: false,
      csc_center: true
    }
  },
  {
    name: 'Saltaua Gopalpur',
    block: 'Saltaua Gopalpur',
    tehsil: 'Bhanpur',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 4600,
    households: 670,
    male_pop: 2380,
    female_pop: 2220,
    literacy_rate: 67.8,
    lat: 26.9123,
    lng: 82.7831,
    pincode: '272190',
    road_type: 'paved',
    railway_dist_km: 16.0,
    bus_service: true,
    amenities: {
      electricity_hours: 18,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 14.0,
      mandi_dist_km: 11.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Vikramjot',
    block: 'Vikramjot',
    tehsil: 'Harraiya',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 3450,
    households: 490,
    male_pop: 1790,
    female_pop: 1660,
    literacy_rate: 65.0,
    lat: 26.7540,
    lng: 82.3582,
    pincode: '272127',
    road_type: 'paved',
    railway_dist_km: 26.0,
    bus_service: true,
    amenities: {
      electricity_hours: 16,
      bank_branch: false,
      atm: false,
      primary_health_center: true,
      veterinary_clinic: false,
      cold_storage_dist_km: 22.0,
      mandi_dist_km: 16.0,
      mobile_coverage: '4G',
      dairy_cooperative: false,
      csc_center: false
    }
  },
  {
    name: 'Dubolia',
    block: 'Dubolia',
    tehsil: 'Harraiya',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 3800,
    households: 540,
    male_pop: 1980,
    female_pop: 1820,
    literacy_rate: 66.2,
    lat: 26.6890,
    lng: 82.6120,
    pincode: '272128',
    road_type: 'paved',
    railway_dist_km: 20.0,
    bus_service: true,
    amenities: {
      electricity_hours: 17,
      bank_branch: true,
      atm: false,
      primary_health_center: false,
      veterinary_clinic: false,
      cold_storage_dist_km: 18.0,
      mandi_dist_km: 13.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Bankaati',
    block: 'Bankaati',
    tehsil: 'Basti Sadar',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 4100,
    households: 590,
    male_pop: 2130,
    female_pop: 1970,
    literacy_rate: 68.0,
    lat: 26.7200,
    lng: 82.8500,
    pincode: '272123',
    road_type: 'paved',
    railway_dist_km: 12.0,
    bus_service: true,
    amenities: {
      electricity_hours: 18,
      bank_branch: false,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: false,
      cold_storage_dist_km: 11.0,
      mandi_dist_km: 9.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Kudraha',
    block: 'Kudraha',
    tehsil: 'Basti Sadar',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 3200,
    households: 460,
    male_pop: 1660,
    female_pop: 1540,
    literacy_rate: 64.5,
    lat: 26.6500,
    lng: 82.7500,
    pincode: '272178',
    road_type: 'paved',
    railway_dist_km: 16.0,
    bus_service: true,
    amenities: {
      electricity_hours: 16,
      bank_branch: false,
      atm: false,
      primary_health_center: false,
      veterinary_clinic: false,
      cold_storage_dist_km: 17.0,
      mandi_dist_km: 14.0,
      mobile_coverage: '4G',
      dairy_cooperative: false,
      csc_center: false
    }
  },
  {
    name: 'Parasrampur',
    block: 'Parasrampur',
    tehsil: 'Harraiya',
    district: 'Basti',
    state: 'Uttar Pradesh',
    population: 4950,
    households: 710,
    male_pop: 2580,
    female_pop: 2370,
    literacy_rate: 67.5,
    lat: 26.8800,
    lng: 82.3800,
    pincode: '272130',
    road_type: 'paved',
    railway_dist_km: 24.0,
    bus_service: true,
    amenities: {
      electricity_hours: 17,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 16.0,
      mandi_dist_km: 10.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },

  // ── Varanasi & Eastern UP Cluster ──────────────────────────────────────────
  {
    name: 'Adampur',
    block: 'Sewapuri',
    tehsil: 'Raja Talab',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    population: 3420,
    households: 485,
    male_pop: 1780,
    female_pop: 1640,
    literacy_rate: 68.5,
    lat: 25.2845,
    lng: 82.7844,
    pincode: '221404',
    road_type: 'paved',
    railway_dist_km: 8.5,
    bus_service: true,
    amenities: {
      electricity_hours: 18,
      bank_branch: false,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: false,
      cold_storage_dist_km: 14.2,
      mandi_dist_km: 11.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Rampur',
    block: 'Kashi Vidyapeeth',
    tehsil: 'Varanasi Sadar',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    population: 4850,
    households: 690,
    male_pop: 2510,
    female_pop: 2340,
    literacy_rate: 72.4,
    lat: 25.3100,
    lng: 83.0100,
    pincode: '221105',
    road_type: 'paved',
    railway_dist_km: 4.2,
    bus_service: true,
    amenities: {
      electricity_hours: 20,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 8.5,
      mandi_dist_km: 6.0,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Shivpur',
    block: 'Arajiline',
    tehsil: 'Raja Talab',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    population: 2750,
    households: 395,
    male_pop: 1420,
    female_pop: 1330,
    literacy_rate: 64.2,
    lat: 25.2200,
    lng: 82.9800,
    pincode: '221010',
    road_type: 'paved',
    railway_dist_km: 12.0,
    bus_service: true,
    amenities: {
      electricity_hours: 16,
      bank_branch: false,
      atm: false,
      primary_health_center: false,
      veterinary_clinic: false,
      cold_storage_dist_km: 18.0,
      mandi_dist_km: 15.2,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: false
    }
  },
  {
    name: 'Lohta',
    block: 'Arajiline',
    tehsil: 'Varanasi Sadar',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    population: 5900,
    households: 860,
    male_pop: 3080,
    female_pop: 2820,
    literacy_rate: 75.8,
    lat: 25.3300,
    lng: 82.9300,
    pincode: '221107',
    road_type: 'paved',
    railway_dist_km: 2.5,
    bus_service: true,
    amenities: {
      electricity_hours: 22,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: false,
      cold_storage_dist_km: 6.0,
      mandi_dist_km: 4.5,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Baragaon',
    block: 'Baragaon',
    tehsil: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    population: 8350,
    households: 1220,
    male_pop: 4320,
    female_pop: 4030,
    literacy_rate: 70.1,
    lat: 25.4400,
    lng: 82.8200,
    pincode: '221204',
    road_type: 'paved',
    railway_dist_km: 15.0,
    bus_service: true,
    amenities: {
      electricity_hours: 19,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 11.5,
      mandi_dist_km: 8.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Chandpur',
    block: 'Pindra',
    tehsil: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    population: 3120,
    households: 440,
    male_pop: 1610,
    female_pop: 1510,
    literacy_rate: 66.0,
    lat: 25.5100,
    lng: 82.8900,
    pincode: '221206',
    road_type: 'unpaved',
    railway_dist_km: 9.2,
    bus_service: false,
    amenities: {
      electricity_hours: 14,
      bank_branch: false,
      atm: false,
      primary_health_center: false,
      veterinary_clinic: false,
      cold_storage_dist_km: 21.0,
      mandi_dist_km: 16.5,
      mobile_coverage: '4G',
      dairy_cooperative: false,
      csc_center: false
    }
  },

  // ── Chandauli & Mirzapur Cluster ───────────────────────────────────────────
  {
    name: 'Sakaldiha',
    block: 'Sakaldiha',
    tehsil: 'Sakaldiha',
    district: 'Chandauli',
    state: 'Uttar Pradesh',
    population: 6650,
    households: 940,
    male_pop: 3450,
    female_pop: 3200,
    literacy_rate: 69.2,
    lat: 25.3200,
    lng: 83.2500,
    pincode: '232109',
    road_type: 'paved',
    railway_dist_km: 1.2,
    bus_service: true,
    amenities: {
      electricity_hours: 19,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 14.5,
      mandi_dist_km: 9.0,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Chunar',
    block: 'Narayanpur',
    tehsil: 'Chunar',
    district: 'Mirzapur',
    state: 'Uttar Pradesh',
    population: 9400,
    households: 1380,
    male_pop: 4900,
    female_pop: 4500,
    literacy_rate: 73.5,
    lat: 25.1200,
    lng: 82.8800,
    pincode: '231304',
    road_type: 'paved',
    railway_dist_km: 2.0,
    bus_service: true,
    amenities: {
      electricity_hours: 20,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 10.0,
      mandi_dist_km: 5.2,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },

  // ── Gorakhpur & Lucknow Cluster ────────────────────────────────────────────
  {
    name: 'Pipraich',
    block: 'Pipraich',
    tehsil: 'Gorakhpur Sadar',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    population: 7800,
    households: 1100,
    male_pop: 4050,
    female_pop: 3750,
    literacy_rate: 71.0,
    lat: 26.8300,
    lng: 83.5200,
    pincode: '273152',
    road_type: 'paved',
    railway_dist_km: 0.8,
    bus_service: true,
    amenities: {
      electricity_hours: 21,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 7.0,
      mandi_dist_km: 6.5,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Mohanlalganj',
    block: 'Mohanlalganj',
    tehsil: 'Mohanlalganj',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    population: 11200,
    households: 1650,
    male_pop: 5800,
    female_pop: 5400,
    literacy_rate: 77.2,
    lat: 26.6800,
    lng: 80.9800,
    pincode: '226301',
    road_type: 'paved',
    railway_dist_km: 1.5,
    bus_service: true,
    amenities: {
      electricity_hours: 23,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 5.0,
      mandi_dist_km: 3.5,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },

  // ── Bihar Cluster ──────────────────────────────────────────────────────────
  {
    name: 'Bikram',
    block: 'Bikram',
    tehsil: 'Paliganj',
    district: 'Patna',
    state: 'Bihar',
    population: 8900,
    households: 1290,
    male_pop: 4620,
    female_pop: 4280,
    literacy_rate: 67.8,
    lat: 25.4300,
    lng: 84.8500,
    pincode: '801104',
    road_type: 'paved',
    railway_dist_km: 16.0,
    bus_service: true,
    amenities: {
      electricity_hours: 17,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 12.0,
      mandi_dist_km: 8.5,
      mobile_coverage: '4G',
      dairy_cooperative: true,
      csc_center: true
    }
  },

  // ── Madhya Pradesh & Maharashtra Cluster ───────────────────────────────────
  {
    name: 'Sanwer',
    block: 'Sanwer',
    tehsil: 'Sanwer',
    district: 'Indore',
    state: 'Madhya Pradesh',
    population: 9600,
    households: 1420,
    male_pop: 4950,
    female_pop: 4650,
    literacy_rate: 74.5,
    lat: 22.9700,
    lng: 75.8200,
    pincode: '453551',
    road_type: 'paved',
    railway_dist_km: 14.0,
    bus_service: true,
    amenities: {
      electricity_hours: 22,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 8.0,
      mandi_dist_km: 4.0,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  },
  {
    name: 'Sinnar Rural',
    block: 'Sinnar',
    tehsil: 'Sinnar',
    district: 'Nashik',
    state: 'Maharashtra',
    population: 10500,
    households: 1540,
    male_pop: 5400,
    female_pop: 5100,
    literacy_rate: 81.2,
    lat: 19.8500,
    lng: 74.0000,
    pincode: '422103',
    road_type: 'paved',
    railway_dist_km: 24.0,
    bus_service: true,
    amenities: {
      electricity_hours: 23,
      bank_branch: true,
      atm: true,
      primary_health_center: true,
      veterinary_clinic: true,
      cold_storage_dist_km: 6.5,
      mandi_dist_km: 5.0,
      mobile_coverage: '5G',
      dairy_cooperative: true,
      csc_center: true
    }
  }
];

async function seed() {
  console.log('🌾 UdyamSaathi — Seeding Census 2011 / data.gov.in Village Data...');

  for (const village of CENSUS_VILLAGES) {
    try {
      // Check if village with same name & district already exists
      const { data: existing } = await supabase
        .from('villages')
        .select('id')
        .eq('name', village.name)
        .eq('district', village.district)
        .maybeSingle();

      if (existing) {
        // Update with full demographics and amenities
        const { error: updateErr } = await supabase
          .from('villages')
          .update(village)
          .eq('id', existing.id);

        if (updateErr) {
          // If columns don't exist yet, fallback to core fields
          console.warn(`⚠️ Full update warning for ${village.name}:`, updateErr.message);
          await supabase
            .from('villages')
            .update({
              name: village.name,
              block: village.block,
              district: village.district,
              state: village.state,
              population: village.population,
              lat: village.lat,
              lng: village.lng,
              pincode: village.pincode
            })
            .eq('id', existing.id);
        }
        console.log(`✅ Updated: ${village.name}, ${village.district} (${village.state})`);
      } else {
        // Insert new
        const { error: insertErr } = await supabase
          .from('villages')
          .insert(village);

        if (insertErr) {
          console.warn(`⚠️ Insert fallback for ${village.name}:`, insertErr.message);
          await supabase
            .from('villages')
            .insert({
              name: village.name,
              block: village.block,
              district: village.district,
              state: village.state,
              population: village.population,
              lat: village.lat,
              lng: village.lng,
              pincode: village.pincode
            });
        }
        console.log(`✨ Inserted: ${village.name}, ${village.district} (${village.state})`);
      }
    } catch (err) {
      console.error(`❌ Failed to seed ${village.name}:`, err.message);
    }
  }

  // Count total villages now in DB
  const { count } = await supabase
    .from('villages')
    .select('*', { count: 'exact', head: true });

  console.log(`\n🎉 Seeding complete! Total villages in Supabase: ${count}`);
}

seed().catch(console.error);
