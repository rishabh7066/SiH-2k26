# 📜 UdyamSaathi — Terms of Service & Privacy Policy

> **Platform:** UdyamSaathi (उद्यमसाथी) • Smart India Hackathon (SIH 26091)  
> **Effective Date:** September 10, 2026  
> **Jurisdiction:** Republic of India (Digital Personal Data Protection Act, 2023)

---

## 📑 Section A: Terms of Service (सेवा की शर्तें)

### 1. Platform Overview & Scope
UdyamSaathi is an AI-driven rural business intelligence platform designed to empower rural citizens, Self-Help Groups (SHGs), and small farmers with reliable data before taking micro-enterprise loans.

### 2. Algorithmic Guidance & Banking Feasibility Disclaimer
- **Not a Banking Guarantee:** All profit projections, market gap scores (0-100), Capex/Opex estimates, and Break-Even horizons are computational projections derived from Census 2011 demographics, OpenStreetMap geospatial data, and conservative economic formulas.
- **Official Sanction:** Actual loan sanctions under PMEGP, Mudra, or KCC are solely at the discretion of the designated lending bank branch and district authorities (DIC/KVIC/NABARD).

### 3. Safe Loan Repayment Benchmark (35% Net Profit Ceiling)
- To prevent debt stress in rural families, UdyamSaathi adheres to the **Safe EMI Rule**: monthly loan repayment installments must not exceed **35%** of projected conservative monthly net profits.

### 4. Permitted Use & User Obligations
- Users agree to submit truthful details for themselves or their SHG collective.
- The use of automated scrapers or creating fraudulent subsidy documents is strictly prohibited.

---

## 🔒 Section B: Privacy Policy (गोपनीयता नीति)

### 1. Zero Commercialization Pledge
We strictly **NEVER sell, trade, or monetize** rural citizen personal data to commercial advertisers or data brokers.

### 2. Data Collected & Storage
| Data Element | Purpose | Storage & Security |
| :--- | :--- | :--- |
| **Name & Mobile Number** | Profile identity & communication | Encrypted in Supabase PostgreSQL |
| **Password** | Authentication session | Salted bcrypt one-way cryptographic hash |
| **GPS Geolocation** | Nearest village cluster identification | Processed on-device; no tracking history |
| **Business Inputs** | Feasibility report calculation | Secured with Postgres Row Level Security (RLS) |

### 3. Compliance with India DPDP Act 2023
- **Consent-Driven:** Information is gathered only with explicit user agreement.
- **Right to Erasure:** Citizens may delete their profile and saved assessments at any time.

---

## 📞 Legal & Regulatory Inquiries
- **Email:** `privacy@udyamsaathi.gov.in`
- **Rural Enterprise Toll-Free Helpline:** `1800-180-1551`
