# 🌾 UdyamSaathi — System Architecture & Technology Stack
> **Smart India Hackathon (SIH 26091)**  
> *AI-Driven Rural Entrepreneurship & Micro-Enterprise Feasibility Intelligence Platform*

---

## 📑 Table of Contents
1. [Tech Stack Directory & Logos](#-tech-stack-directory--logos)
2. [High-Level System Architecture (ASCII & Unicode Diagram)](#-high-level-system-architecture)
3. [Interactive Mermaid Architecture Diagram](#-interactive-mermaid-architecture-diagram)
4. [Data Flow & Connection Protocols](#-data-flow--connection-protocols)
5. [Layer-by-Layer Detailed Breakdown](#-layer-by-layer-detailed-breakdown)
6. [Security & Compliance Architecture](#-security--compliance-architecture)

---

## 🛠 Tech Stack Directory & Logos

| Layer | Technology | Logo / Symbol | Version / Spec | Purpose & Responsibility |
| :--- | :--- | :---: | :---: | :--- |
| **Frontend UI** | **React.js** | `⚛️ [REACT]` | `v19.2.8` | Component-based reactive UI, state-driven rendering, assessment wizards |
| **Bundler & Build** | **Vite** | `⚡ [VITE]` | `v8.2.2` | Hot Module Replacement (HMR), ultra-fast build engine & asset pipeline |
| **Routing** | **React Router** | `🧭 [ROUTER]` | `v7.18.3` | Client-side routing, protected auth routes, deep-linking |
| **Geospatial Maps** | **Leaflet & OSM** | `🗺️ [LEAFLET]` | `v1.9.4` | Interactive village gap mapping, shop clustering, live radar circles |
| **Icons & Design** | **Lucide Icons** | `🎨 [LUCIDE]` | `v1.39.0` | Clean SVG iconography for rural tools and dashboard metrics |
| **Styling** | **Vanilla CSS3** | `💅 [CSS3]` | Modern CSS | Custom glassmorphism, responsive grid, micro-animations, zero bloat |
| **Backend Runtime**| **Node.js** | `🟢 [NODE]` | `>=18.0.0` | High-performance asynchronous non-blocking I/O JavaScript runtime |
| **API Framework** | **Express.js** | `🚂 [EXPRESS]` | `v4.19.2` | RESTful API server, routing, controllers, modular services |
| **API Security** | **Helmet & RateLimit**| `🛡️ [SECURITY]` | `v7.1 / v7.4` | HTTP header hardening, IP rate limiting against DoS/brute-force |
| **Database & Auth**| **Supabase** | `⚡ [SUPABASE]` | `v2.45.4` | Backend-as-a-Service, Auth sessions, PostgreSQL connection pool |
| **Relational DB** | **PostgreSQL** | `🐘 [POSTGRES]` | `v15+ (PG)` | Relational persistence, JSONB documents, spatial lat-long indexes |
| **Access Control** | **Row Level Security**| `🔐 [RLS]` | Postgres RLS | Strict tenant data isolation; users access only their own assessments |
| **Generative AI** | **Google Gemini** | `🤖 [GEMINI]` | `1.5 Flash` | Multilingual rural advisory, voice bot inference, What-If simulation |
| **Live Geodata** | **OpenStreetMap** | `🌐 [OSM API]` | Overpass API | Live local competitor discovery, amenities, POI fetching |
| **Voice Interface**| **Web Speech API** | `🎙️ [STT/TTS]` | W3C Standard | Speech-to-Text & Text-to-Speech in Hindi/English for rural accessibility |

---

## 🏛 High-Level System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT & PRESENTATION TIER                                    │
│                                                                                                 │
│   📱 Mobile Web Browser       💻 Desktop Workstation        🎙️ Rural Voice (Hindi/En)          │
│   ┌───────────────────────┐   ┌─────────────────────────┐   ┌───────────────────────────────┐   │
│   │   Village User UI     │   │   SHG / CSC Operator    │   │  Web Speech API (STT / TTS)   │   │
│   │   [React 19 ⚛️ + CSS3]│   │   [React 19 ⚛️ + Leaflet]   │   │  Microphone / Speaker Audio   │   │
│   └───────────┬───────────┘   └────────────┬────────────┘   └───────────────┬───────────────┘   │
└───────────────┼────────────────────────────┼────────────────────────────────┼───────────────────┘
                │                            │                                │
                │  HTTPS / WSS / JSON        │  HTTPS / REST                  │  Speech Stream
                ▼                            ▼                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND APPLICATION LAYER (Vite ⚡)                                │
│                                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ 🧭 Client Router [React Router DOM v7]                                                     │  │
│  │  ├── 🏠 Hero Landing Page          ├── 🔍 AI Business Finder     ├── 🗺️ Village Gap Map    │  │
│  │  ├── 🧙‍♂️ Assessment Wizard (5 Steps)├── 🎛️ What-If Simulator     ├── 📜 Safe EMI & Schemes │  │
│  │  ├── 📊 Feasibility Dashboard     ├── 💬 WhatsApp AI Advisor    ├── 👤 User Profile       │  │
│  └─────────────────────────────────────────┬─────────────────────────────────────────────────┘  │
│                                            │                                                    │
│  ┌─────────────────────────────────────────┴─────────────────────────────────────────────────┐  │
│  │ 📦 Client Utilities & State                                                                │  │
│  │  ├── ⚡ Supabase Auth Client (JWT LocalStorage Session)                                   │  │
│  │  ├── 🌐 Leaflet Map Canvas (Custom SVG Pin Layers & 5km Radius Buffer)                     │  │
│  │  └── 📡 Centralized API Handler (Axios/Fetch with Bearer Tokens)                          │  │
│  └─────────────────────────────────────────┬─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────┼────────────────────────────────────────────────────┘
                                             │
                        HTTPS REST / JSON    │   Supabase Direct REST
                        (Port 5000)          │   (Port 443)
                         ┌───────────────────┴───────────────────┐
                         ▼                                       ▼
┌───────────────────────────────────────────────────┐ ┌───────────────────────────────────────────┐
│           BACKEND API GATEWAY & SERVICES          │ │          SUPABASE CLOUD PLATFORM          │
│                 [Node.js 🟢 + Express 🚂]          │ │              [⚡ Supabase BaaS]           │
│                                                   │ │                                           │
│ 🛡️ Security Perimeter:                            │ │ 🔐 Supabase Auth Engine:                  │
│  ├── Helmet HTTP Headers Hardening                │ │  ├── Mobile / Email JWT Authentication    │
│  ├── CORS Whitelist Validation                    │ │  ├── Token Refresh & Session Management   │
│  └── Express Rate Limiting (100 req/15 min)       │ │  └── Password Hashing (bcrypt)            │
│                                                   │ │                                           │
│ 🚦 API Route Controllers:                         │ │ 🐘 PostgreSQL Relational Database:        │
│  ├── 🔑 /api/auth/*        (Profiles & Identity)  │ │  ├── 📋 public.profiles                   │
│  ├── 🌾 /api/villages/*    (Census & Geo Lookup)  │ │  ├── 🌾 public.villages (Spatial Lat/Lng) │
│  ├── 💼 /api/businesses/*  (Viability & Scoring)  │ │  └── 📊 public.assessments (JSONB Results)│
│  └── 🤖 /api/ai/*          (Gemini Voice/Chat)    │ │                                           │
│                                                   │ │ 🔒 Row-Level Security (RLS Policies):     │
│ ⚙️ Core Business Engines:                         │ │  └── Tenants isolate user-specific reports │
│  ├── 🧮 Financial Feasibility Calculator          │ └─────────────────────▲─────────────────────┘
│  │    (Capex, Opex, Break-Even, Safe EMI 35%)     │                       │
│  ├── 🗺️ OSM Overpass Geospatial Aggregator        │                       │
│  │    (Live Competitor & Service Density)         │                       │
│  └── 🧠 Village Intelligence Rule Engine          │      SQL Queries via  │
│       (Demand vs Saturated Trade Matrix)          │      Supabase Client  │
└─────────────────────────┬─────────────────────────┘                       │
                          │                                                 │
                          └─────────────────────────────────────────────────┘
                                       │
                                       │ External API Requests (HTTPS)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               EXTERNAL APIS & INTELLIGENCE CLOUD                                │
│                                                                                                 │
│   🤖 Google Gemini 1.5 Flash API     🌐 OpenStreetMap (OSM) Overpass    🏛️ Govt Census 2011 /    │
│   ┌───────────────────────────────┐  ┌───────────────────────────────┐  ┌─────────────────────┐ │
│   │ Natural Language Advisory     │  │ Live Geo-Competitor Radar     │  │ Basti District Data │ │
│   │ Multilingual Audio Context    │  │ Radius POI Fetch (5-10 km)    │  │ Demographics, Power,│ │
│   │ Hindi Rural Enterprise Mentor │  │ Shop Density & Missing Trades │  │ Water, Agro-Crops   │ │
│   └───────────────────────────────┘  └───────────────────────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Interactive Mermaid Architecture Diagram

```mermaid
graph TD
    %% Styling Definitions
    classDef clientStyle fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef frontStyle fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#15803d;
    classDef backStyle fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#b45309;
    classDef dbStyle fill:#fdf2f8,stroke:#db2777,stroke-width:2px,color:#be185d;
    classDef aiStyle fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px,color:#6d28d9;

    subgraph CLIENT_TIER["📱 User Client Tier"]
        U1["👤 Rural Citizen (Mobile / Web)"]:::clientStyle
        U2["🎙️ Voice Input (Web Speech STT)"]:::clientStyle
        U3["💬 WhatsApp Interface"]:::clientStyle
    end

    subgraph FRONTEND_TIER["⚡ Frontend Web Application (Vite + React 19)"]
        F1["🧭 App Router (react-router-dom)"]:::frontStyle
        F2["🧙 Feasibility Wizard & Simulator"]:::frontStyle
        F3["🗺️ Leaflet Map & Radar Engine"]:::frontStyle
        F4["🤖 GramAI Voice & Chat Drawer"]:::frontStyle
        F5["🔐 Client Supabase Auth Listener"]:::frontStyle
    end

    subgraph BACKEND_TIER["🟢 Backend API Server (Node.js + Express)"]
        B1["🛡️ Security Perimeter\n(Helmet + RateLimiter + CORS)"]:::backStyle
        B2["📡 API Gateway & Routing\n(/api/villages, /api/businesses, /api/ai)"]:::backStyle
        B3["🧮 Financial Viability Engine\n(Capex, Opex, EMI, PMEGP Subsidy)"]:::backStyle
        B4["📊 Competitor Intelligence Service\n(Density vs Population Ratios)"]:::backStyle
        B5["🤖 Gemini AI Service Wrapper\n(Prompt Engineering & Hindi TTS)"]:::backStyle
    end

    subgraph DATA_TIER["⚡ Supabase BaaS & PostgreSQL 15"]
        D1["🔐 Supabase Auth\n(JWT Tokens & Password Hashing)"]:::dbStyle
        D2["🐘 PostgreSQL Relational Tables\n(profiles, villages, assessments)"]:::dbStyle
        D3["🔒 Row-Level Security (RLS)\n(Tenant Data Isolation)"]:::dbStyle
    end

    subgraph EXTERNAL_TIER["🌐 External Intelligence Clouds"]
        E1["🤖 Google Gemini 1.5 Flash API\n(Multilingual Conversational LLM)"]:::aiStyle
        E2["🗺️ OpenStreetMap Overpass API\n(Live GPS POIs & Competitor Radar)"]:::aiStyle
        E3["🏛️ Census 2011 Data Store\n(Locked: UP, Basti District Benchmark)"]:::aiStyle
    end

    %% Connections
    U1 -->|User Clicks & Touches| F1
    U2 -->|Speech Recognition Transcript| F4
    U3 -->|Direct Inquiry / Mock Webhook| F1

    F1 --> F2
    F1 --> F3
    F1 --> F4
    F1 --> F5

    F5 <-->|Auth Tokens / User Session| D1
    F2 -->|Calculate Feasibility Request| B2
    F3 -->|Fetch OSM Live Amenities| B2
    F4 -->|Natural Language Prompt| B2

    B1 --> B2
    B2 --> B3
    B2 --> B4
    B2 --> B5

    B2 <-->|Store & Read Records| D2
    D2 --- D3

    B4 <-->|Query Overpass QL [out:json]| E2
    B4 <-->|Seed & Match Village Data| E3
    B5 <-->|Generate Conversational Response| E1
```

---

## 📡 Data Flow & Connection Protocols

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   STEP-BY-STEP DATA FLOW                               │
└────────────────────────────────────────────────────────────────────────────────────────┘

  [1] USER ASSESSMENT FLOW
      Citizen enters: Village (Ganeshpur), Capital (₹1,00,000), Skill (Dairy)
          │
          ├──► Frontend collects state & validates via AssessmentWizard.jsx
          ├──► Sends POST /api/businesses/evaluate with payload
          ├──► Backend intelligence.service.js checks population (4,250) vs existing units
          ├──► Financial engine computes:
          │    • Capex: ₹95,000 | Opex: ₹52,000/mo | Net Profit: ₹73,000/mo
          │    • Safe EMI: ₹12,000 (35% threshold) | PMEGP Subsidy: 35%
          └──► Returns Feasibility Score (91/100) -> Stored in Supabase assessments table.

  [2] LIVE COMPETITOR RADAR (GAP MAP) FLOW
      User views Interactive Map centered at Lat 26.8105, Lng 82.7214
          │
          ├──► Frontend Leaflet requests live POIs within 5km radius
          ├──► Backend osm.service.js dispatches Overpass QL query:
          │    [out:json]; node["shop"](around:5000, 26.8105, 82.7214); out body;
          ├──► System maps categories: Dairy, Atta Chakki, Solar, Repair
          └──► Identifies 12 saturated traditional shops vs 0 organized cold storage units.

  [3] GRAM-AI VOICE / CHAT ADVISORY FLOW
      Citizen speaks in Hindi: "क्या गणेशपुर में आटा चक्की लगाना सही रहेगा?"
          │
          ├──► Web Speech API converts audio to Devanagari text
          ├──► GramAIDrawer dispatches prompt to Backend /api/ai/chat
          ├──► gemini.service.js enriches prompt with village context & rule guards
          ├──► Google Gemini 1.5 Flash returns response in natural Hindi
          └──► Web Speech Synthesis speaks answer back through device speaker.
```

---

## 🔍 Network & Protocol Connectivity Matrix

| From | To | Protocol | Port | Format | Authentication | Description |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Browser UI** | **Backend Server** | `HTTPS / REST` | `5000` | JSON | `Bearer <JWT>` | API calls for village lists, feasibility, AI chat |
| **Browser UI** | **Supabase Auth** | `HTTPS` | `443` | JSON | `Anon Key + JWT` | User sign-up, sign-in, session refresh |
| **Browser UI** | **Leaflet Tile Server** | `HTTPS` | `443` | PNG Tiles | Public / None | OpenStreetMap standard map visual tile rendering |
| **Backend API** | **Supabase DB** | `PostgreSQL / HTTPS`| `5432 / 443`| SQL / JSON | `Service Role Key` | CRUD operations on profiles, assessments, villages |
| **Backend API** | **Google Gemini** | `HTTPS / REST` | `443` | JSON | `API Key` | Gemini 1.5 Flash conversational inference API |
| **Backend API** | **OSM Overpass API**| `HTTPS / REST` | `443` | Overpass QL / JSON | Public API | Fetching real-world rural shops and infrastructure nodes |

---

## 🔒 Security & Data Privacy Framework

1. **Zero Plaintext Passwords**:
   - Authentication is managed via Supabase GoTrue engine using salted bcrypt hashing and cryptographically signed JSON Web Tokens (JWT).
2. **Row-Level Security (RLS)**:
   - PostgreSQL RLS ensures that multi-tenant data leaks are prevented at the database kernel level:
     ```sql
     CREATE POLICY "Users can only view own assessments"
     ON public.assessments FOR SELECT
     USING (auth.uid() = user_id);
     ```
3. **API Rate-Limiting & DDOS Protection**:
   - `express-rate-limit` enforces a maximum of 100 requests per 15-minute window for standard endpoints and a strict 20 attempts per 15-minute window on authentication routes.
4. **Content Security Policy & Headers**:
   - `helmet()` automatically injects HSTS, X-Frame-Options, X-XSS-Protection, and restricts unauthorized framing.
5. **CORS Governance**:
   - Strict origin whitelisting ensures only verified client applications can consume backend microservices.

---

*Document compiled for UdyamSaathi System Documentation • Smart India Hackathon 2026 (SIH 26091)*
