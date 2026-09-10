/**
 * UdyamSaathi — Village Business Health Score & Competitor Intelligence Service
 */

// Standard rural business benchmarks (Population per shop threshold)
const RURAL_THRESHOLDS = {
  grocery:          { popPerUnit: 600,   name: 'Kirana & General Store',       priority: 'Essential' },
  dairy:            { popPerUnit: 1500,  name: 'Dairy & Milk Collection',      priority: 'High' },
  pharmacy:         { popPerUnit: 2500,  name: 'Medical Store & Clinic',       priority: 'Critical' },
  agri_inputs:      { popPerUnit: 2000,  name: 'Fertilizer & Seed Depot',      priority: 'High' },
  tailoring:        { popPerUnit: 1200,  name: 'Tailoring & Boutique',         priority: 'Medium' },
  csc_center:       { popPerUnit: 3000,  name: 'Common Service Center (CSC)',  priority: 'Critical' },
  welding:          { popPerUnit: 3500,  name: 'Welding & Agro-Fabrication',    priority: 'Medium' },
  atta_chakki:      { popPerUnit: 2000,  name: 'Atta Chakki & Spice Mill',     priority: 'High' },
  mechanic:         { popPerUnit: 1800,  name: 'Bike Repair & Puncture Point', priority: 'Medium' },
  cold_storage:     { popPerUnit: 5000,  name: 'Mini Cold Storage & Chilling', priority: 'High' }
};

/**
 * Analyze existing competitors in village
 */
export function analyzeCompetitors(businesses = []) {
  const countsByCategory = {};
  const categoryDetails = {};

  for (const b of businesses) {
    const cat = b.category || 'other_retail';
    countsByCategory[cat] = (countsByCategory[cat] || 0) + 1;

    if (!categoryDetails[cat]) {
      categoryDetails[cat] = {
        category: cat,
        count: 0,
        names: [],
        locations: []
      };
    }
    categoryDetails[cat].count += 1;
    if (categoryDetails[cat].names.length < 5) {
      categoryDetails[cat].names.push(b.name);
    }
    categoryDetails[cat].locations.push({ lat: b.lat, lng: b.lng });
  }

  return {
    totalBusinesses: businesses.length,
    countsByCategory,
    breakdown: Object.values(categoryDetails)
  };
}

/**
 * Detect Business Gaps in the Village
 */
export function detectBusinessGaps(village, businesses = []) {
  const population = Number(village.population) || 3500;
  const amenities = village.amenities || {};
  const vLat = Number(village.lat) || 25.2845;
  const vLng = Number(village.lng) || 82.7844;
  const { countsByCategory } = analyzeCompetitors(businesses);

  const gaps = [];

  // Offset helper to place gap opportunity pins in logical clusters around village
  const pinOffset = (angleRad, distKm = 0.6) => {
    const dLat = (distKm / 111) * Math.cos(angleRad);
    const dLng = (distKm / (111 * Math.cos((vLat * Math.PI) / 180))) * Math.sin(angleRad);
    return { lat: Number((vLat + dLat).toFixed(6)), lng: Number((vLng + dLng).toFixed(6)) };
  };

  // 1. Check Pharmacy / Medical Gap
  const pharmacyCount = countsByCategory['pharmacy'] || 0;
  if (population >= 2000 && pharmacyCount === 0) {
    const coords = pinOffset(0.2);
    gaps.push({
      id: 'gap_pharmacy',
      category: 'pharmacy',
      title_hi: 'दवा व प्राथमिक उपचार केंद्र (Pharmacy & Clinic)',
      title_en: 'Retail Chemist & Primary Health Store',
      urgency: 'Critical',
      opportunity_score: 96,
      investment_range: '₹1.5 Lakh - ₹3 Lakh',
      monthly_earning_est: '₹35,000 - ₹60,000',
      reason_hi: `${village.name} में ${population} की आबादी पर कोई रजिस्टर्ड मेडिकल स्टोर नहीं है। ग्रामीण 8-10 किमी दूर शहर जाने पर मजबूर हैं।`,
      reason_en: `No registered medical shop for ${population} villagers. High daily footfall guaranteed with Jan Aushadhi generic medicines.`,
      recommended_action: 'Apply for PM Jan Aushadhi Kendra or Retail Drug License',
      lat: coords.lat,
      lng: coords.lng
    });
  }

  // 2. Check CSC / Digital Seva Gap
  const cscCount = countsByCategory['csc_center'] || 0;
  if (cscCount === 0) {
    const coords = pinOffset(1.2);
    gaps.push({
      id: 'gap_csc',
      category: 'csc_center',
      title_hi: 'कॉमन सर्विस सेंटर (CSC) व ऑनलाइन सुविधा',
      title_en: 'Digital Seva CSC & Online Services',
      urgency: 'High',
      opportunity_score: 92,
      investment_range: '₹40,000 - ₹80,000',
      monthly_earning_est: '₹22,000 - ₹40,000',
      reason_hi: 'किसान सम्मान निधि, आधार, राशन कार्ड व बिजली बिल भुगतान के लिए ग्रामीणों को ब्लॉक मुख्यालय जाना पड़ता है।',
      reason_en: 'Direct demand for PM-KISAN KYC, Aadhaar printing, utility bills, and DBT banking services.',
      recommended_action: 'Register on CSC VLE portal and setup computer/printer setup',
      lat: coords.lat,
      lng: coords.lng
    });
  }

  // 3. Check Milk Chilling / Value-Added Dairy Gap
  const coldStorageDist = Number(amenities.cold_storage_dist_km) || 12;
  const dairyCount = countsByCategory['dairy'] || 0;
  if (coldStorageDist > 8 && dairyCount <= 1) {
    const coords = pinOffset(2.4);
    gaps.push({
      id: 'gap_dairy_chiller',
      category: 'dairy',
      title_hi: 'मिल्क कलेक्शन व मिनी पनीर/दही प्रोसेसिंग यूनिट',
      title_en: 'Milk Chilling & Value-Added Dairy Unit',
      urgency: 'High',
      opportunity_score: 89,
      investment_range: '₹1 Lakh - ₹2.5 Lakh',
      monthly_earning_est: '₹30,000 - ₹55,000',
      reason_hi: `नजदीकी कोल्ड स्टोरेज ${coldStorageDist} किमी दूर है। शाम का दूध खराब होने के डर से किसान औने-पौने दामों में बेचते हैं।`,
      reason_en: `Cold storage is ${coldStorageDist} km away. Paneer and curd production offers 40% higher margin than raw milk sales.`,
      recommended_action: 'Leverage AHIDF or PMFME 35% government subsidy for dairy machinery',
      lat: coords.lat,
      lng: coords.lng
    });
  }

  // 4. Check Agro-Inputs / Organic Fertilizer Gap
  const agriCount = countsByCategory['agri_inputs'] || 0;
  if (agriCount === 0 || (population > 5000 && agriCount < 2)) {
    const coords = pinOffset(3.6);
    gaps.push({
      id: 'gap_agri_inputs',
      category: 'agri_inputs',
      title_hi: 'उन्नत बीज, जैविक खाद व कीटनाशक केंद्र',
      title_en: 'Certified Seed & Bio-Fertilizer Depot',
      urgency: 'Medium',
      opportunity_score: 85,
      investment_range: '₹1 Lakh - ₹3 Lakh',
      monthly_earning_est: '₹25,000 - ₹50,000',
      reason_hi: 'फसल बुवाई के मौसम में समय पर डीएपी, यूरिया व प्रमाणित बीज न मिलने से किसानों की लागत बढ़ जाती है।',
      reason_en: 'Seasonal surges create guaranteed bulk demand for seeds, bio-pesticides, and micro-nutrients.',
      recommended_action: 'Obtain District Agriculture Office Fertilizer Retail License',
      lat: coords.lat,
      lng: coords.lng
    });
  }

  // 5. Check Solar Atta Chakki & Spice Grinding Gap
  const attaCount = countsByCategory['atta_chakki'] || 0;
  if (attaCount <= 1) {
    const coords = pinOffset(4.8);
    gaps.push({
      id: 'gap_atta_chakki',
      category: 'atta_chakki',
      title_hi: 'सोलर आटा चक्की व मसाला पिसाई संयंत्र',
      title_en: 'Solar Powered Flour & Spice Grinding Mill',
      urgency: 'Medium',
      opportunity_score: 82,
      investment_range: '₹75,000 - ₹1.8 Lakh',
      monthly_earning_est: '₹20,000 - ₹38,000',
      reason_hi: 'पारंपरिक डीजल चक्की पर 50% खर्च ईंधन में चला जाता है। सोलर चक्की से शून्य बिजली बिल पर शुद्ध मुनाफा होता है।',
      reason_en: 'Zero electricity cost using PM-KUSUM solar subsidy yields stable daily cash earnings.',
      recommended_action: 'Apply for PM-KUSUM Scheme Component-A for solar setup',
      lat: coords.lat,
      lng: coords.lng
    });
  }

  return gaps;
}

/**
 * Calculate Village Business Health Score (0 - 100)
 */
export function calculateVillageHealthScore(village, businesses = []) {
  const population = Number(village.population) || 3500;
  const literacy = Number(village.literacy_rate) || 68.0;
  const amenities = village.amenities || {};

  // 1. Infrastructure Index (30 pts max)
  let infraScore = 0;
  const elecHours = Number(amenities.electricity_hours) || 16;
  infraScore += Math.min(10, Math.round((elecHours / 24) * 10)); // up to 10 pts
  if (village.road_type === 'paved') infraScore += 6; else infraScore += 2;
  if (amenities.mobile_coverage === '5G') infraScore += 5;
  else if (amenities.mobile_coverage === '4G') infraScore += 4;
  if (amenities.atm || amenities.bank_branch) infraScore += 5;
  if (village.bus_service) infraScore += 4;
  const infrastructure_index = Math.min(100, Math.round((infraScore / 30) * 100));

  // 2. Demographic & Market Capacity (25 pts max)
  let demoScore = 0;
  if (population >= 8000) demoScore += 12;
  else if (population >= 4500) demoScore += 10;
  else if (population >= 2500) demoScore += 8;
  else demoScore += 5;

  demoScore += Math.min(13, Math.round((literacy / 100) * 13));
  const demand_index = Math.min(100, Math.round((demoScore / 25) * 100));

  // 3. Market Competition Space (25 pts max)
  const competitorAnalysis = analyzeCompetitors(businesses);
  const gaps = detectBusinessGaps(village, businesses);
  let compScore = 15; // baseline
  // If there are high-value untapped gaps, high opportunity score
  compScore += Math.min(10, gaps.length * 2);
  const competition_index = Math.min(100, Math.round((compScore / 25) * 100));

  // Overall Score (Weighted)
  const overall_score = Math.round(
    infrastructure_index * 0.35 +
    demand_index * 0.35 +
    competition_index * 0.30
  );

  let grade = 'B';
  if (overall_score >= 85) grade = 'A+';
  else if (overall_score >= 75) grade = 'A';
  else if (overall_score >= 60) grade = 'B';
  else grade = 'C';

  return {
    village_id: village.id,
    village_name: village.name,
    overall_score,
    grade,
    infrastructure_index,
    demand_index,
    competition_index,
    metrics: {
      population,
      literacy_rate: literacy,
      electricity_hours: elecHours,
      total_existing_shops: businesses.length,
      identified_gaps_count: gaps.length
    },
    gaps,
    competitors: competitorAnalysis
  };
}
