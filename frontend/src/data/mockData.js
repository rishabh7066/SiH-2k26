// Mock data engine for UdyamSaathi (SIH 26091)
// LOCKED STATE: Uttar Pradesh | LOCKED DISTRICT: Basti
export const ALL_VILLAGES = [
  // Basti District (Locked Focus)
  { id: "ganeshpur", name: "Ganeshpur", nameHi: "गणेशपुर", block: "Basti Sadar", district: "Basti", state: "Uttar Pradesh", pop: 4250, households: 610, agro: "Paddy, Sugarcane, Dairy", marketDistKm: 4.5, lat: 26.8105, lng: 82.7214 },
  { id: "harraiya", name: "Harraiya", nameHi: "हरैया", block: "Harraiya", district: "Basti", state: "Uttar Pradesh", pop: 6800, households: 980, agro: "Wheat, Mustard, Agro-Machinery", marketDistKm: 2.5, lat: 26.7933, lng: 82.4642 },
  { id: "bhadawal", name: "Bhadawal", nameHi: "भदावल", block: "Harraiya", district: "Basti", state: "Uttar Pradesh", pop: 3200, households: 460, agro: "Paddy, Wheat, Mustard, Dairy", marketDistKm: 3.0, lat: 26.7811, lng: 82.5064 },
  { id: "kaptanganj", name: "Kaptanganj", nameHi: "कप्तानगंज", block: "Kaptanganj", district: "Basti", state: "Uttar Pradesh", pop: 5100, households: 740, agro: "Sugarcane, Dairy, Agro-Processing", marketDistKm: 8.0, lat: 26.8361, lng: 82.5934 },
  { id: "ramnagar", name: "Ramnagar", nameHi: "रामनगर", block: "Ramnagar", district: "Basti", state: "Uttar Pradesh", pop: 3900, households: 560, agro: "Paddy, Vegetables, Food Processing", marketDistKm: 14.0, lat: 26.9602, lng: 82.7485 },
  { id: "saltaua", name: "Saltaua Gopalpur", nameHi: "सलटौआ गोपालपुर", block: "Saltaua Gopalpur", district: "Basti", state: "Uttar Pradesh", pop: 4600, households: 670, agro: "Dairy, Maize, CSC & Services", marketDistKm: 11.0, lat: 26.9123, lng: 82.7831 },
  { id: "vikramjot", name: "Vikramjot", nameHi: "विक्रमजोत", block: "Vikramjot", district: "Basti", state: "Uttar Pradesh", pop: 3450, households: 490, agro: "Fisheries, Dairy, Riverine Agri", marketDistKm: 16.0, lat: 26.7540, lng: 82.3582 },
  { id: "dubolia", name: "Dubolia", nameHi: "दुबौलिया", block: "Dubolia", district: "Basti", state: "Uttar Pradesh", pop: 3800, households: 540, agro: "Vegetables, Pulses, Cattle Feed", marketDistKm: 13.0, lat: 26.6890, lng: 82.6120 },
  { id: "bankaati", name: "Bankaati", nameHi: "बनकटी", block: "Bankaati", district: "Basti", state: "Uttar Pradesh", pop: 4100, households: 590, agro: "Wheat, Dairy, Rural Retail", marketDistKm: 9.0, lat: 26.7200, lng: 82.8500 },
  { id: "kudraha", name: "Kudraha", nameHi: "कुदरहा", block: "Kudraha", district: "Basti", state: "Uttar Pradesh", pop: 3600, households: 510, agro: "Sugarcane, Paddy, Dairy", marketDistKm: 12.0, lat: 26.7050, lng: 82.8900 },
  { id: "parasrampur", name: "Parasrampur", nameHi: "परसरामपुर", block: "Parasrampur", district: "Basti", state: "Uttar Pradesh", pop: 4400, households: 620, agro: "Mustard, Wheat, Agro-Services", marketDistKm: 18.0, lat: 26.8820, lng: 82.3950 },
  { id: "gaur", name: "Gaur", nameHi: "गौर", block: "Gaur", district: "Basti", state: "Uttar Pradesh", pop: 3750, households: 530, agro: "Vegetables, Dairy, Fish Pond", marketDistKm: 15.0, lat: 26.8600, lng: 82.5200 },
  { id: "rudauli", name: "Rudauli", nameHi: "रूदौली", block: "Rudauli", district: "Basti", state: "Uttar Pradesh", pop: 4300, households: 600, agro: "Paddy, Dairy, Food Processing", marketDistKm: 10.5, lat: 26.9400, lng: 82.6800 },

  // Varanasi / Sewapuri Cluster
  { id: "adampur", name: "Adampur", nameHi: "आदमपुर", block: "Sewapuri", district: "Varanasi", state: "Uttar Pradesh", pop: 3420, households: 485, agro: "Dairy, Vegetables, Handicraft", marketDistKm: 8.5, lat: 25.2845, lng: 82.7844 },
  { id: "kapsethi", name: "Kapsethi", nameHi: "कपसेठी", block: "Sewapuri", district: "Varanasi", state: "Uttar Pradesh", pop: 4150, households: 590, agro: "Dairy, Retail, Handloom", marketDistKm: 5.0, lat: 25.3200, lng: 82.7600 },
  { id: "baraki", name: "Baraki", nameHi: "बराकी", block: "Sewapuri", district: "Varanasi", state: "Uttar Pradesh", pop: 2890, households: 410, agro: "Paddy, Dairy, Poultry", marketDistKm: 7.0, lat: 25.2950, lng: 82.7700 },
  { id: "rampur", name: "Rampur", nameHi: "रामपुर", block: "Kashi Vidyapeeth", district: "Varanasi", state: "Uttar Pradesh", pop: 4850, households: 690, agro: "Vegetables, Milk Supply, Retail", marketDistKm: 4.2, lat: 25.3100, lng: 83.0100 },
  { id: "shivpur", name: "Shivpur", nameHi: "शिवपुर", block: "Arajiline", district: "Varanasi", state: "Uttar Pradesh", pop: 2750, households: 395, agro: "Dairy, Local Market, Agro-Trade", marketDistKm: 12.0, lat: 25.2200, lng: 82.9800 },
  { id: "lohta", name: "Lohta", nameHi: "लोहता", block: "Arajiline", district: "Varanasi", state: "Uttar Pradesh", pop: 5900, households: 860, agro: "Weaving, Garments, Rural Hub", marketDistKm: 2.5, lat: 25.3300, lng: 82.9300 },
  { id: "baragaon", name: "Baragaon", nameHi: "बड़ागांव", block: "Baragaon", district: "Varanasi", state: "Uttar Pradesh", pop: 8350, households: 1220, agro: "Paddy, Dairy, Agri-Equipment", marketDistKm: 15.0, lat: 25.4400, lng: 82.8200 },
  { id: "chandpur", name: "Chandpur", nameHi: "चांदपुर", block: "Pindra", district: "Varanasi", state: "Uttar Pradesh", pop: 3120, households: 440, agro: "Mustard, Pulses, Dairy", marketDistKm: 9.2, lat: 25.5100, lng: 82.8900 },

  // Chandauli District
  { id: "mughal_sarai", name: "Mughal Sarai", nameHi: "मुगलसराय", block: "Mughal Sarai", district: "Chandauli", state: "Uttar Pradesh", pop: 10200, households: 1450, agro: "Agro-Trade, Retail, Dairy", marketDistKm: 1.5, lat: 25.2800, lng: 83.1200 },
  { id: "sakaldiha", name: "Sakaldiha", nameHi: "सकलडीहा", block: "Sakaldiha", district: "Chandauli", state: "Uttar Pradesh", pop: 6650, households: 940, agro: "Paddy, Sugarcane, Dairy", marketDistKm: 1.2, lat: 25.3200, lng: 83.2500 },

  // Mirzapur District
  { id: "mirzapur_rural", name: "Mirzapur", nameHi: "मिर्जापुर", block: "Mirzapur", district: "Mirzapur", state: "Uttar Pradesh", pop: 7500, households: 1080, agro: "Carpet & Brass Handicrafts, Dairy", marketDistKm: 3.0, lat: 25.1500, lng: 82.5800 },
  { id: "chunar", name: "Chunar", nameHi: "चुनार", block: "Narayanpur", district: "Mirzapur", state: "Uttar Pradesh", pop: 9400, households: 1380, agro: "Pottery, Dairy, Horticulture", marketDistKm: 2.0, lat: 25.1200, lng: 82.8800 },

  // Jaunpur District
  { id: "jaunpur_rural", name: "Jaunpur", nameHi: "जौनपुर", block: "Jaunpur", district: "Jaunpur", state: "Uttar Pradesh", pop: 6200, households: 890, agro: "Mustard, Dairy, Food Processing", marketDistKm: 4.0, lat: 25.7500, lng: 82.6800 },

  // Gorakhpur District
  { id: "pipraich", name: "Pipraich", nameHi: "पिपराइच", block: "Pipraich", district: "Gorakhpur", state: "Uttar Pradesh", pop: 7800, households: 1120, agro: "Sugarcane, Jaggery, Agro-Services", marketDistKm: 2.0, lat: 26.8300, lng: 83.5200 },

  // Lucknow District
  { id: "mohanlalganj", name: "Mohanlalganj", nameHi: "मोहनलालगंज", block: "Mohanlalganj", district: "Lucknow", state: "Uttar Pradesh", pop: 8900, households: 1280, agro: "Horticulture, Mango, Dairy", marketDistKm: 5.0, lat: 26.6800, lng: 80.9800 },

  // Other Regions
  { id: "bikram", name: "Bikram", nameHi: "बिक्रम", block: "Bikram", district: "Patna", state: "Bihar", pop: 5400, households: 780, agro: "Paddy, Dairy, Food Grain", marketDistKm: 6.0, lat: 25.4300, lng: 84.8500 },
  { id: "sanwer", name: "Sanwer", nameHi: "सांवेर", block: "Sanwer", district: "Indore", state: "Madhya Pradesh", pop: 6100, households: 870, agro: "Soybean, Wheat, Cattle Feed", marketDistKm: 4.5, lat: 22.9800, lng: 75.8300 },
  { id: "sinnar", name: "Sinnar Rural", nameHi: "सिन्नर", block: "Sinnar", district: "Nashik", state: "Maharashtra", pop: 7200, households: 1040, agro: "Onion, Grapes, Rural MSME", marketDistKm: 3.5, lat: 19.8500, lng: 74.0000 }
];

export const LOCATIONS = [
  {
    state: "Uttar Pradesh",
    district: "Basti",
    block: "Basti Sadar",
    villages: ALL_VILLAGES
  }
];

export const BUSINESS_CATEGORIES = [
  { 
    id: "dairy", 
    name: "Dairy & Milk Products", 
    nameHi: "डेयरी एवं दुग्ध उत्पाद", 
    icon: "Milk", 
    emoji: "🥛",
    viabilityBase: 78, 
    roiMonths: 14, 
    minCap: 75000, 
    demandHigh: "Festival season, Daily morning",
    demandHighHi: "दैनिक सुबह व शादी-त्योहारों में पीक मांग"
  },
  { 
    id: "poultry", 
    name: "Poultry Farming (Broiler/Desi)", 
    nameHi: "पोल्ट्री फार्मिंग (देसी कड़कनाथ व ब्रायलर)", 
    icon: "Egg", 
    emoji: "🥚",
    viabilityBase: 74, 
    roiMonths: 12, 
    minCap: 60000, 
    demandHigh: "Year-round, Weekend spikes",
    demandHighHi: "वर्षभर स्थिर मांग, सप्ताहांत व सर्दियों में पीक"
  },
  { 
    id: "food_proc", 
    name: "Spices & Food Processing Unit", 
    nameHi: "मसाला पिसाई, तेल एक्सपेलर व फूड प्रोसेसिंग", 
    icon: "Wheat", 
    emoji: "🌾",
    viabilityBase: 82, 
    roiMonths: 16, 
    minCap: 90000, 
    demandHigh: "Post-harvest & winter",
    demandHighHi: "दैनिक रसोई मांग, फसल कटाई के बाद पीक"
  },
  { 
    id: "tailoring", 
    name: "Garment & Tailoring Boutique", 
    nameHi: "आधुनिक सिलाई व रेडीमेड गारमेंट बुटीक", 
    icon: "Scissors", 
    emoji: "✂️",
    viabilityBase: 71, 
    roiMonths: 10, 
    minCap: 40000, 
    demandHigh: "Wedding & Festive months",
    demandHighHi: "लगन, शादी, स्कूल सत्र व त्योहारों में भारी मांग"
  },
  { 
    id: "agro_retail", 
    name: "Agri-Input & Organic Fertilizer Shop", 
    nameHi: "खाद-बीज, जैविक कीटनाशक व कृषि इनपुट केंद्र", 
    icon: "Sprout", 
    emoji: "🌱",
    viabilityBase: 79, 
    roiMonths: 18, 
    minCap: 120000, 
    demandHigh: "Kharif & Rabi sowing",
    demandHighHi: "खरीफ व रबी बुवाई सीजन में सर्वाधिक मांग"
  },
  { 
    id: "solar_pump", 
    name: "Solar Pump & Electric Motor Repair", 
    nameHi: "सोलर पंप, मोटर वाइंडिंग व उपकरण रिपेयर", 
    icon: "Wrench", 
    emoji: "🔧",
    viabilityBase: 84, 
    roiMonths: 8, 
    minCap: 50000, 
    demandHigh: "Summer & Irrigation cycle",
    demandHighHi: "गर्मी व सिंचाई चक्र में सबसे ज़्यादा कमाई"
  }
];

export const BUSINESS_INTELLIGENCE_PROFILES = {
  dairy: {
    id: "dairy",
    nameHi: "डेयरी एवं दुग्ध उत्पाद",
    nameEn: "Dairy & Milk Products",
    icon: "🥛",
    score: 78,
    statusHi: "शर्तों के साथ सुरक्षित (Viable)",
    statusEn: "Viable with Value-Addition",
    overviewHi: (village) => `${village} और आस-पास के 10 किमी क्षेत्र में डेयरी व्यवसाय के लिए दूध की दैनिक घरेलू मांग और पास के हाईवे ढाबों व मिष्ठान्न भंडारों से अच्छी बिक्री की संभावना है (स्कोर 78/100)। हालांकि, इस इलाके में पहले से ही 15 पारंपरिक दूध विक्रेता सक्रिय हैं।`,
    overviewEn: (village) => `High domestic demand for daily milk and highway dhabas within 10 km of ${village} (Score 78/100). However, traditional unorganized vendors exist.`,
    adviceHi: "केवल कच्चा दूध बेचने की साधारण दुकान मत खोलिए। घर-घर सुबह पैक दूध पहुँचाने और ताज़ा पनीर, मक्खन व दही की सेवा शुरू करें। इसमें आम दूध के मुकाबले 40% ज़्यादा बचत होती है और मुकाबला भी बहुत कम है।",
    adviceEn: "Do not just sell raw unpasteurized milk. Launch door-to-door packaged morning delivery and fresh paneer & curd subscriptions for 40% higher margins.",
    metrics: [
      { labelHi: "स्थानीय मांग", labelEn: "Local Demand", score: "82/100", subHi: "दैनिक व शादी के मौसम में", subEn: "Daily & festive peaks", color: "#15803d" },
      { labelHi: "दुकानों की भीड़", labelEn: "Competition", score: "64/100", subHi: "मध्यम से ज़्यादा", subEn: "Moderate-High", color: "#d97706" },
      { labelHi: "मुनाफे की गुंजाइश", labelEn: "Profit Margin", score: "80/100", subHi: "₹45,000+ बचत / माह", subEn: "₹45,000+ / mo", color: "#15803d" },
      { labelHi: "चारे की निर्भरता", labelEn: "Fodder Risk", score: "58/100", subHi: "सूखे व हरे चारे पर ध्यान दें", subEn: "Requires local tie-up", color: "#ef4444" }
    ],
    competitors: [
      { id: 1, name: "किसान दूध डेयरी (लोकल मंडी)", distKm: 1.2, type: "कच्चा दूध डिपो", pricePerLtr: "₹48/लीटर", saturation: "उच्च" },
      { id: 2, name: "चौराहा मिल्क व टी सेंटर", distKm: 2.8, type: "पारंपरिक दुकान", pricePerLtr: "₹50/लीटर", saturation: "मध्यम" },
      { id: 3, name: "साइकिल दूध विक्रेता संघ", distKm: 4.2, type: "घर-घर डिलीवरी", pricePerLtr: "₹46/लीटर", saturation: "उच्च" },
      { id: 4, name: "शीत केंद्र / चिलिंग पॉइंट", distKm: 6.5, type: "चिलिंग पॉइंट", pricePerLtr: "₹52/लीटर", saturation: "कम" }
    ],
    seasonalAdviceHi: "सबसे ज़्यादा कमाई अक्टूबर से दिसंबर (दिवाली और लगन का मौसम) में होगी। मई-जून की भीषण गर्मी में दूध कम होता है, इसलिए अप्रैल में ही अतिरिक्त बचत व हरे चारे का प्रबंध रखें।",
    seasonalAdviceEn: "Peak revenue is during festival & wedding months (Oct-Dec). Keep liquid buffer for dry fodder transition during peak summer (May-June).",
    risks: [
      { titleHi: "एक ही चारे सप्लायर पर निर्भर न रहें", descHi: "मंडी का व्यापारी सूखा चारा महंगा कर सकता है। आस-पास के किसानों से हरे चारे का सीधा अनुबंध रखें।" },
      { titleHi: "केवल एक बड़े ग्राहक पर निर्भर न रहें", descHi: "सारा दूध किसी एक हलवाई को न दें। आधा दूध सीधे घरों में और आधा ढाबों को बाँटें।" }
    ],
    checklist: [
      "गाँव के 15 परिवारों से सुबह ताज़ा दूध और पनीर पहुँचाने की बात तय करें।",
      "हाईवे के ढाबों व मिष्ठान्न भंडारों से नियमित दूध सप्लाई का लिखित/मौखिक समझौता करें।",
      "स्थानीय किसानों से हरे चारे की सीधी आपूर्ति तय करें।",
      "दूध चिलर/डीप फ्रीज़र और स्वच्छ बर्तनों की व्यवस्था पूरी करें।",
      "आधार कार्ड, पैन कार्ड, बैंक पासबुक और मुद्रा/PMEGP आवेदन तैयार रखें।"
    ]
  },
  solar_pump: {
    id: "solar_pump",
    nameHi: "सोलर पंप व मोटर वाइंडिंग रिपेयर",
    nameEn: "Solar Pump & Electric Motor Repair",
    icon: "🔧",
    score: 84,
    statusHi: "अत्यधिक लाभदायक व कम प्रतिस्पर्धा",
    statusEn: "Highly Viable / Low Competition",
    overviewHi: (village) => `${village} और आस-पास के 10 किमी कृषि क्षेत्र में पीएम-कुसुम व निजी बोरवेल के 70+ सोलर पंप और 200+ सबमर्सिबल मोटरें हैं। मोटर जलने या कंट्रोलर खराब होने पर किसानों को 20 किमी दूर शहर जाना पड़ता है, जिससे स्थानीय रिपेयर सेवा की भारी मांग है (स्कोर 84/100)।`,
    overviewEn: (village) => `Over 70+ solar pumps and 200+ submersible borewells exist around ${village}. Farmers currently travel 20km to city for motor winding and controller repair (Score 84/100).`,
    adviceHi: "केवल दुकान पर बैठने के बजाय 'खेत पर जाकर ऑन-साइट रिपेयरिंग' की आपातकालीन सेवा दें। साथ ही सोलर इन्वर्टर, कैपेसिटर, स्टार्टर रिले और तांबे के तार (Copper Wire) का स्टॉक रखें। प्रति सर्विस 65% तक सीधा मार्जिन मिलता है।",
    adviceEn: "Provide on-field emergency repair visits instead of a passive workshop. Stock copper wire, drive capacitors, and solar inverter fuses for quick turnaround.",
    metrics: [
      { labelHi: "स्थानीय मांग", labelEn: "Local Demand", score: "88/100", subHi: "सिंचाई व गर्मी सीजन में चरम", subEn: "Peak summer & sowing", color: "#15803d" },
      { labelHi: "प्रतिस्पर्धा स्तर", labelEn: "Competition", score: "28/100", subHi: "गाँव में कोई आधुनिक सेंटर नहीं", subEn: "Very Low (No rivals)", color: "#15803d" },
      { labelHi: "मुनाफे की गुंजाइश", labelEn: "Profit Margin", score: "85/100", subHi: "₹55,000+ बचत / माह", subEn: "₹55,000+ / mo", color: "#15803d" },
      { labelHi: "स्पेयर पार्ट्स उपलब्धता", labelEn: "Parts Access", score: "72/100", subHi: "जिला मंडी से 1 दिन में डिलीवरी", subEn: "Next-day delivery", color: "#3b82f6" }
    ],
    competitors: [
      { id: 1, name: "मिश्रा जी पंखा-कूलर रिपेयर (पारंपरिक)", distKm: 3.5, type: "साधारण वाइंडिंग", pricePerLtr: "₹600/मोटर", saturation: "कम" },
      { id: 2, name: "तहसील चौराहा ऑटो-इलेक्ट्रिक वर्कशॉप", distKm: 7.2, type: "जनरल रिपेयर", pricePerLtr: "₹850/मोटर", saturation: "मध्यम" },
      { id: 3, name: "जिला मुख्यालय सोलर अधिकृत सर्विस सेंटर", distKm: 18.0, type: "कंपनी ऑथोराइज्ड", pricePerLtr: "₹1,500/विजिट", saturation: "दूर (18 किमी)" }
    ],
    seasonalAdviceHi: "मार्च से जून (गर्मी की सिंचाई) और अक्टूबर-नवंबर (रबी बुवाई) में पीक कमाई होगी। बरसात के समय जब पंप कम चलते हैं, तब घरेलू इन्वर्टर, पंखे व जेनरेटर मरम्मत का काम संभालें।",
    seasonalAdviceEn: "Maximum revenue peaks during pre-monsoon sowing (Mar-June) and winter irrigation (Oct-Nov). Balance monsoon months with home inverter & alternator repair.",
    risks: [
      { titleHi: "स्पेयर पार्ट्स की कमी से काम न रोकें", descHi: "ज़रूरी कैपेसिटर, स्टार्टर रिले और कॉपर वायर का बफर स्टॉक पहले से रखें।" },
      { titleHi: "उधारी पर पूरा काम न करें", descHi: "किसानों से पार्ट्स का नकद भुगतान लें और लेबर चार्ज पर ही छोटी उधारी दें।" }
    ],
    checklist: [
      "ब्लॉक के 20 प्रमुख बोरवेल व सोलर पंप वाले किसानों से संपर्क जोड़ें।",
      "ऑटोमैटिक वाइंडिंग मशीन, डिजिटल क्लैंप मीटर और टेस्टिंग पैनल के कोटेशन लें।",
      "जिला स्पेयर पार्ट्स थोक विक्रेता से डीलरशिप या 15 दिन की क्रेडिट तय करें।",
      "पीएम-कुसुम व सौर ऊर्जा वेंडर्स के साथ लोकल सर्विस टाई-अप स्थापित करें।",
      "मुद्रा योजना (किशोर लोन ₹2-3 लाख) के लिए बैंक आवेदन तैयार रखें।"
    ]
  },
  poultry: {
    id: "poultry",
    nameHi: "पोल्ट्री फार्मिंग (देसी कड़कनाथ व ब्रायलर)",
    nameEn: "Poultry Farming (Broiler/Desi)",
    icon: "🥚",
    score: 74,
    statusHi: "मध्यम जोखिम, उच्च प्रतिफल (High Return)",
    statusEn: "High Return / Moderate Risk",
    overviewHi: (village) => `${village} और आस-पास के ढाबों, साप्ताहिक हाटों और ग्रामीण परिवारों में ताज़ा चिकन और शुद्ध देशी अंडों की निरंतर मांग है। गाँव में कोई संगठित फार्म न होने से माल बाहर से मंगाना पड़ता है (स्कोर 74/100)।`,
    overviewEn: (village) => `High consumer demand for fresh chicken and organic desi eggs in ${village}. Currently supplied from distant mandi brokers (Score 74/100).`,
    adviceHi: "केवल थोक ब्रायलर बेचने के बजाय 60% देसी कड़कनाथ/सोनाली मुर्गियां पालें। देसी मुर्गियों में बीमारी का खतरा कम होता है, चारा सस्ता पड़ता है और बाजार में 2.5 गुना अधिक दाम (₹350-400/किग्रा) मिलता है।",
    adviceEn: "Focus on dual-purpose desi & Kadaknath breeds alongside broilers. Desi birds fetch 2.5x higher margins (₹350+/kg) with lower mortality rates.",
    metrics: [
      { labelHi: "स्थानीय मांग", labelEn: "Local Demand", score: "86/100", subHi: "सप्ताहांत व शादी सीजन में", subEn: "Weekend & winter spike", color: "#15803d" },
      { labelHi: "प्रतिस्पर्धा स्तर", labelEn: "Competition", score: "40/100", subHi: "देसी फार्मिंग में शून्य प्रतिस्पर्धा", subEn: "Zero local desi farms", color: "#15803d" },
      { labelHi: "मुनाफे की गुंजाइश", labelEn: "Profit Margin", score: "76/100", subHi: "₹48,000+ बचत / माह", subEn: "₹48,000+ / mo", color: "#15803d" },
      { labelHi: "बायो-सिक्योरिटी", labelEn: "Disease Risk", score: "62/100", subHi: "टीकाकरण व शेड स्वच्छता आवश्यक", subEn: "Vaccination needed", color: "#ef4444" }
    ],
    competitors: [
      { id: 1, name: "मंडी पोल्ट्री ब्रोकर्स व आढ़ती", distKm: 4.5, type: "थोक सप्लायर", pricePerLtr: "₹130/किग्रा जीवित", saturation: "उच्च" },
      { id: 2, name: "हाईवे चिकन कॉर्नर व ढाबा", distKm: 2.2, type: "थोक खरीदार", pricePerLtr: "₹145/किग्रा", saturation: "मांग केंद्र" },
      { id: 3, name: "साप्ताहिक ग्रामीण हाट विक्रेता", distKm: 3.8, type: "खुले बाजार में", pricePerLtr: "₹280/देशी पक्षी", saturation: "मध्यम" }
    ],
    seasonalAdviceHi: "सर्दियों (अक्टूबर से मार्च) में पोल्ट्री और अंडे की मांग चरम पर रहती है। अत्यधिक गर्मी (मई-जून) में शेड में फॉगर्स या घास के पर्दे लगाकर तापमान नियंत्रित रखें।",
    seasonalAdviceEn: "Peak demand occurs in winter and festival months. Guard against heat stress in peak summer using foggers and cool water.",
    risks: [
      { titleHi: "संक्रामक बीमारी का जोखिम", descHi: "रानीखेत और गम्बोरो का टीका नियत समय पर लगवाएं और बाहरी व्यक्तियों का प्रवेश शेड में सीमित रखें।" },
      { titleHi: "फीड की बढ़ती लागत", descHi: "स्थानीय मक्का, सोया और चोकर मिलाकर खुद दाना तैयार करें ताकि 20% फीड लागत बचे।" }
    ],
    checklist: [
      "गाँव की आबादी से 200 मीटर दूर हवादार पोल्ट्री शेड की जगह तय करें।",
      "प्रमाणित हैचरी से वैक्सीनेटेड चूजों की पहली खेप का कोटेशन लें।",
      "पशु चिकित्सा अधिकारी से नियमित टीकाकरण चार्ट प्राप्त करें।",
      "स्थानीय मक्का उत्पादकों से थोक दर पर दाने का प्रबंध करें।",
      "नाबार्ड पोल्ट्री वेंचर कैपिटल या KCC फॉर्म बैंक में जमा करें।"
    ]
  },
  food_proc: {
    id: "food_proc",
    nameHi: "मसाला पिसाई, तेल एक्सपेलर व मिनी फूड प्रोसेसिंग",
    nameEn: "Spices & Food Processing Unit",
    icon: "🌾",
    score: 82,
    statusHi: "अत्यधिक सुरक्षित व निरंतर मांग",
    statusEn: "Highly Viable / Constant Demand",
    overviewHi: (village) => `${village} कृषि बाहुल्य क्षेत्र है जहाँ सरसों, हल्दी, मिर्च, धान और गेहूं की भरपूर पैदावार होती है। वर्तमान में किसान कच्चा माल सस्ते में बेचते हैं और शहर से महंगे पैकेट उत्पाद लाते हैं (स्कोर 82/100)।`,
    overviewEn: (village) => `Rich agricultural produce (mustard, turmeric, wheat) in ${village}. Tremendous value-addition margin by local grinding & clean packaging (Score 82/100).`,
    adviceHi: "कच्चा माल सीधे स्थानीय किसानों से खरीदें। FSSAI मानक के अनुसार 'ग्राम-ब्रांड' की शुद्ध 250 ग्राम और 500 ग्राम मसाला व कच्ची घानी सरसों तेल की पैकेजिंग करें। 15 स्थानीय किराना दुकानों को 10% अतिरिक्त कमीशन देकर अपने उत्पाद रखवाएं।",
    adviceEn: "Procure directly from local farmers at harvest. Pack hygienic 250g/500g branded pure spices and cold-pressed mustard oil with local retailer margins.",
    metrics: [
      { labelHi: "स्थानीय मांग", labelEn: "Local Demand", score: "91/100", subHi: "दैनिक रसोई की आवश्यक मांग", subEn: "Daily essential demand", color: "#15803d" },
      { labelHi: "प्रतिस्पर्धा स्तर", labelEn: "Competition", score: "38/100", subHi: "शुद्ध स्थानीय पैकेट ब्रांड नहीं", subEn: "Low (No branded rival)", color: "#15803d" },
      { labelHi: "मुनाफे की गुंजाइश", labelEn: "Profit Margin", score: "84/100", subHi: "₹62,000+ बचत / माह", subEn: "₹62,000+ / mo", color: "#15803d" },
      { labelHi: "मशीनरी व बिजली", labelEn: "Power Access", score: "76/100", subHi: "3-फेज या सोलर आटा-तेल चक्की", subEn: "3-Phase connection", color: "#3b82f6" }
    ],
    competitors: [
      { id: 1, name: "पुरानी डीजल आटा-चक्की (पारंपरिक)", distKm: 0.8, type: "कस्टम पिसाई मात्र", pricePerLtr: "₹4/किग्रा पिसाई", saturation: "मध्यम" },
      { id: 2, name: "मंडी मसाला थोक डिपो", distKm: 6.0, type: "थोक व्यापारी", pricePerLtr: "₹240/किग्रा मसाला", saturation: "दूर" },
      { id: 3, name: "ब्रांडेड पैकेट मसाला (MDH/Tata)", distKm: 1.0, type: "किराना दुकान", pricePerLtr: "₹400/किग्रा", saturation: "महंगा विकल्प" }
    ],
    seasonalAdviceHi: "फसल कटाई (अप्रैल में गेहूं, दिसंबर-जनवरी में सरसों व हल्दी) के समय सीधा सस्ता माल स्टॉक करें। बरसात के मौसम में मसाले को नमी से बचाने के लिए एयर-टाइट कंटेनर का उपयोग करें।",
    seasonalAdviceEn: "Procure raw stock during harvest season for lowest price. Use moisture-proof packaging during monsoon months.",
    risks: [
      { titleHi: "गुणवत्ता व मिलावट का शक", descHi: "पारदर्शी पैकेजिंग और '100% शुद्ध स्थानीय मसाला' की गारंटी दें ताकि ब्रांड पर भरोसा बने।" },
      { titleHi: "बिजली कटौती से उत्पादन रुकना", descHi: "3-फेज कनेक्शन के साथ बैकअप जनरेटर या सोलर ड्राइव का प्रावधान रखें।" }
    ],
    checklist: [
      "मिनी पल्वराइज़र, तेल एक्सपेलर और हीट-सीलिंग मशीन के कोटेशन लें।",
      "FSSAI बेसिक रजिस्ट्रेशन व उद्यम आधार (Udyam) का ऑनलाइन प्रमाण पत्र लें।",
      "गाँव के 20 किसानों से सरसों व खड़े मसाले की सीधी खरीद का करार करें।",
      "फूड-ग्रेड पाउच प्रिंटिंग और लेबल डिज़ाइन फाइनल करें।",
      "PMEGP 35% सब्सिडी योजना के तहत जिला उद्योग केंद्र (DIC) में फाइल लगाएं।"
    ]
  },
  tailoring: {
    id: "tailoring",
    nameHi: "आधुनिक सिलाई, रेडीमेड गारमेंट व बुटीक",
    nameEn: "Garment & Tailoring Boutique",
    icon: "✂️",
    score: 71,
    statusHi: "अल्प पूँजी में तुरंत चालू (Immediate Cashflow)",
    statusEn: "Low Capex / Immediate Cashflow",
    overviewHi: (village) => `${village} की महिलाएं, युवतियां और स्कूली छात्र आधुनिक फिटिंग, ब्लाउज डिजाइनिंग, फॉल-पीको और स्कूल यूनिफॉर्म के लिए 12 किमी दूर शहर जाते हैं (स्कोर 71/100)।`,
    overviewEn: (village) => `High unmet demand for modern women's tailoring, school uniforms, and ready-made alterations around ${village} (Score 71/100).`,
    adviceHi: "केवल साधारण सिलाई पर निर्भर न रहें। साथ में मैचिंग फॉल, अस्तर, बटन, धागे, कॉस्मेटिक्स और रेडीमेड बच्चों के कपड़ों का मिनी काउंटर रखें। शादी के सीजन में 2-3 महिला सहायिकाओं के साथ बल्क आर्डर लें।",
    adviceEn: "Combine custom tailoring with boutique accessories (fall, lining, threads, cosmetics) and school uniform bulk contracts for steady year-round revenue.",
    metrics: [
      { labelHi: "स्थानीय मांग", labelEn: "Local Demand", score: "79/100", subHi: "स्कूल सत्र व शादी में पीक", subEn: "Wedding & school peaks", color: "#15803d" },
      { labelHi: "प्रतिस्पर्धा स्तर", labelEn: "Competition", score: "52/100", subHi: "पारंपरिक दर्जी हैं, बुटीक शून्य", subEn: "Traditional tailors only", color: "#d97706" },
      { labelHi: "मुनाफे की गुंजाइश", labelEn: "Profit Margin", score: "75/100", subHi: "₹38,000+ बचत / माह", subEn: "₹38,000+ / mo", color: "#15803d" },
      { labelHi: "पूँजी आवश्यकता", labelEn: "Capital Ease", score: "88/100", subHi: "अल्प पूँजी में आसानी से शुरू", subEn: "Low initial cost", color: "#15803d" }
    ],
    competitors: [
      { id: 1, name: "रामबली जेंट्स टेलर (चौपाल)", distKm: 0.5, type: "केवल पुरुष पैंट-शर्ट", pricePerLtr: "₹350/सूट", saturation: "मध्यम" },
      { id: 2, name: "कस्बा लेडीज बुटीक सेंटर", distKm: 9.5, type: "फैंसी लेडीज बुटीक", pricePerLtr: "₹450/सूट", saturation: "दूर" }
    ],
    seasonalAdviceHi: "अक्टूबर से फरवरी (त्योहार व शादियां) और जून-जुलाई (स्कूल यूनिफॉर्म) में जबरदस्त काम आता है। इस दौरान पहले से कपड़े और धागों का स्टॉक रखें।",
    seasonalAdviceEn: "Peak season during festivals, weddings (Oct-Feb) and school admissions (June-July). Stock fabric and lining in advance.",
    risks: [
      { titleHi: "सीजन के बाद काम कम होना", descHi: "ऑफ-सीजन में रेडीमेड बच्चों के कपड़े और घरेलू परदे/कुशन सिलाई पर ध्यान दें।" },
      { titleHi: "कारीगरों की अनुपलब्धता", descHi: "स्थानीय स्वयं सहायता समूह (SHG) की महिलाओं को प्रशिक्षित कर सहयोगी बनाएं।" }
    ],
    checklist: [
      "2 मोटर चालित सिलाई मशीनें, 1 इंटरलॉक/पीको मशीन और स्टीम प्रेस खरीदें।",
      "गाँव के प्राथमिक व जूनियर हाई स्कूल से यूनिफॉर्म सिलाई का करार करें।",
      "कपड़ा मंडी से थोक दर पर अस्तर, फॉल, जिप और धागे लाएं।",
      "दुकान पर आधुनिक डिजाइन कैटलॉग व डिस्प्ले बोर्ड लगाएं।",
      "मुद्रा योजना (शिशु ₹50,000 लोन) के लिए बैंक शाखा में आवेदन करें।"
    ]
  },
  agro_retail: {
    id: "agro_retail",
    nameHi: "खाद, बीज, जैविक कीटनाशक व कृषि इनपुट केंद्र",
    nameEn: "Agri-Input & Organic Fertilizer Shop",
    icon: "🌱",
    score: 79,
    statusHi: "स्थिर व भरोसेमंद ग्रामीण व्यवसाय",
    statusEn: "Stable & Trusted Rural Business",
    overviewHi: (village) => `${village} के 500+ किसान उर्वरक, डीएपी, बीज व कीटनाशक के लिए हर बार ब्लॉक मंडी जाते हैं। गाँव में अधिकृत डिपो किसानों का समय और भाड़ा दोनों बचाएगा (स्कोर 79/100)।`,
    overviewEn: (village) => `Over 500+ farming families in ${village} travel to block headquarters for fertilizer, certified seeds, and bio-inputs (Score 79/100).`,
    adviceHi: "केवल रासायनिक खाद पर जोर न दें। इफको (IFFCO) नैनो यूरिया, सागरिका, बायो-फर्टिलाइजर और सूक्ष्म पोषक तत्वों का स्टॉक रखें। किसानों को 'सच्चा कृषि सलाहकार' बनकर उत्पाद बेचें, इससे पक्के ग्राहक बनेंगे।",
    adviceEn: "Do not just sell generic chemicals. Stock IFFCO Nano Urea, organic micronutrients, and certified hybrid seeds with expert agri-consulting.",
    metrics: [
      { labelHi: "स्थानीय मांग", labelEn: "Local Demand", score: "94/100", subHi: "खरीफ व रबी बुवाई में भारी मांग", subEn: "Heavy Kharif/Rabi demand", color: "#15803d" },
      { labelHi: "प्रतिस्पर्धा स्तर", labelEn: "Competition", score: "58/100", subHi: "समितियों पर समय से माल नहीं मिलता", subEn: "Govt societies out of stock", color: "#d97706" },
      { labelHi: "मुनाफे की गुंजाइश", labelEn: "Profit Margin", score: "78/100", subHi: "₹58,000+ बचत / माह", subEn: "₹58,000+ / mo", color: "#15803d" },
      { labelHi: "लाइसेंस व वर्किंग कैपिटल", labelEn: "Licensing", score: "65/100", subHi: "कृषि विभाग लाइसेंस व पीओएस मशीन", subEn: "Fertilizer license needed", color: "#ef4444" }
    ],
    competitors: [
      { id: 1, name: "साधन सहकारी समिति (पैक्स)", distKm: 2.1, type: "सरकारी समिति", pricePerLtr: "सरकारी दर", saturation: "स्टॉक की कमी" },
      { id: 2, name: "हरैया रोड किसान बीज भंडार", distKm: 4.8, type: "निजी दुकान", pricePerLtr: "MRP", saturation: "मध्यम" }
    ],
    seasonalAdviceHi: "जून-जुलाई (धान बुवाई) और नवंबर-दिसंबर (गेहूं/सरसों बुवाई) में 80% बिक्री होती है। इस समय नकदी और खाद का पूरा स्टॉक एडवांस में रखें।",
    seasonalAdviceEn: "80% of sales occur in June-July and Nov-Dec. Maintain strong working capital and pre-booking with distributors.",
    risks: [
      { titleHi: "किसानों की उधारी का जोखिम", descHi: "उधारी की सख्त सीमा तय करें। नकद भुगतान पर 2% छूट देकर समय पर पैसे वसूलें।" },
      { titleHi: "बिना लाइसेंस के बिक्री का जोखिम", descHi: "कृषि विभाग से खाद, बीज और कीटनाशक का अधिकृत लाइसेंस अनिवार्य रूप से लें।" }
    ],
    checklist: [
      "जिला कृषि रक्षा अधिकारी कार्यालय से खाद-बीज लाइसेंस का आवेदन करें।",
      "सड़क किनारे पक्की दुकान का रेंट एग्रीमेंट या खतौनी तैयार करें।",
      "IFFCO और प्रमुख बीज कंपनियों के अधिकृत डिस्ट्रीब्यूटर से अनुबंध करें।",
      "उर्वरक बिक्री के लिए अनिवार्य पीओएस (PoS) मशीन प्राप्त करें।",
      "मुद्रा किशोर योजना (₹5 लाख वर्किंग कैपिटल) के लिए बैंक में फाइल लगाएं।"
    ]
  }
};

export const SCHEMES = [
  {
    id: "pmmy_kishore",
    name: "Pradhan Mantri Mudra Yojana (PMMY) - Kishore",
    maxLoan: 500000,
    interestRate: 8.5,
    subsidy: "Nil (Collateral Free)",
    tenureYears: 5,
    moratoriumMonths: 6,
    bestFor: "Working capital + small equipment purchase"
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation (PMEGP)",
    maxLoan: 2500000,
    interestRate: 9.0,
    subsidy: "25% - 35% Margin Money Subsidy for Rural Areas",
    tenureYears: 7,
    moratoriumMonths: 6,
    bestFor: "Manufacturing & processing units with capital grant"
  },
  {
    id: "kcc_dairy",
    name: "Kisan Credit Card (KCC) - Animal Husbandry",
    maxLoan: 200000,
    interestRate: 7.0,
    subsidy: "3% Interest Subvention on Prompt Repayment (Eff. 4%)",
    tenureYears: 3,
    moratoriumMonths: 3,
    bestFor: "Working capital for dairy cows/buffaloes & feed"
  }
];

export const COMPETITORS_MOCK = [
  { id: 1, name: "Basti Kisan Dudh Dairy (Ganeshpur Road)", distKm: 1.2, type: "Raw Milk Depot", pricePerLtr: "₹48/L", saturation: "High", latOffset: 0.012, lngOffset: 0.008 },
  { id: 2, name: "Harraiya Chauraha Milk Center", distKm: 2.8, type: "Traditional Shop", pricePerLtr: "₹50/L", saturation: "Medium", latOffset: -0.015, lngOffset: 0.014 },
  { id: 3, name: "Basti Sadar Yadav Milk Vendor", distKm: 4.2, type: "Door-to-door cycle", pricePerLtr: "₹46/L", saturation: "High", latOffset: 0.022, lngOffset: -0.011 },
  { id: 4, name: "Kaptanganj Cold Milk Point", distKm: 6.5, type: "Chilling Point", pricePerLtr: "₹52/L", saturation: "Low", latOffset: -0.03, lngOffset: -0.02 }
];

export const OPPORTUNITY_Gaps = [
  {
    id: "gap_1",
    title: "Chilled Milk Home Delivery + Daily Paneer & Curd Subscription",
    score: 89,
    category: "High Margin Value-Addition",
    description: "15 traditional milk vendors exist in 10 km, but ZERO organized morning delivery or fresh paneer subscription exists for 650+ teacher & govt employee households.",
    addressableDemand: "₹1,45,000 / mo",
    recommendedPricing: "₹58/L packaged + ₹340/kg fresh Paneer",
    badge: "Top AI Recommendation"
  },
  {
    id: "gap_2",
    title: "Direct B2B Supply to Local Sweet Shops & Dhabas (Highway 19)",
    score: 83,
    category: "Bulk Institutional Supply",
    description: "3 dhabas within 4 km currently travel 14 km to block headquarters daily for 120 liters of milk. Opportunity to establish guaranteed bulk contract.",
    addressableDemand: "₹1,80,000 / mo",
    recommendedPricing: "₹49/L bulk contract with 15-day credit",
    badge: "Stable Cashflow"
  },
  {
    id: "gap_3",
    title: "Organic Cow Dung Vermicompost & Biogas By-product",
    score: 76,
    category: "Circular Agri-Waste",
    description: "Nearby vegetable farmers pay high shipping for bagged vermicompost from district center. Zero local processing creates a high-margin secondary revenue.",
    addressableDemand: "₹38,000 / mo",
    recommendedPricing: "₹12/kg packaged vermicompost",
    badge: "Eco-Bonus"
  }
];

export const SEASONAL_DATA = [
  { month: "Jan", demand: 85, note: "High winter dairy consumption & weddings" },
  { month: "Feb", demand: 80, note: "Steady domestic demand" },
  { month: "Mar", demand: 70, note: "Holi festival peak milk/khoya demand" },
  { month: "Apr", demand: 55, note: "Early summer dry fodder transition" },
  { month: "May", demand: 45, note: "Peak heat, lower milk yield; prepare water reserves" },
  { month: "Jun", demand: 50, note: "Monsoon onset, humidity care needed" },
  { month: "Jul", demand: 65, note: "Green fodder abundant, lactation increases" },
  { month: "Aug", demand: 75, note: "Raksha Bandhan & Janmashtami sweet demand" },
  { month: "Sep", demand: 80, note: "Navratri & festive season onset" },
  { month: "Oct", demand: 95, note: "Diwali, Dussehra - Peak annual dairy margin" },
  { month: "Nov", demand: 90, note: "Wedding season surge" },
  { month: "Dec", demand: 92, note: "Winter peak consumption" }
];

export const DIGITAL_TWIN_BASE = {
  conservative: {
    monthlyRevenue: 124000,
    monthlyOpex: 89000,
    netProfit: 35000,
    emiPayment: 15400,
    netSurplus: 19600,
    dscr: 1.45,
    breakEvenUnits: "2,100 Litres/mo"
  },
  expected: {
    monthlyRevenue: 182000,
    monthlyOpex: 114000,
    netProfit: 68000,
    emiPayment: 15400,
    netSurplus: 52600,
    dscr: 2.15,
    breakEvenUnits: "1,850 Litres/mo"
  },
  optimistic: {
    monthlyRevenue: 245000,
    monthlyOpex: 138000,
    netProfit: 107000,
    emiPayment: 15400,
    netSurplus: 91600,
    dscr: 3.4,
    breakEvenUnits: "1,600 Litres/mo"
  }
};

// ==========================================
// 15 NEW FEATURES DATASETS (docs/New_Features.md)
// ==========================================

// 1 & 4. Budget Business Planner & Finder presets
export const BUDGET_PLANS = [
  {
    tier: 25000,
    label: "₹25,000",
    labelHi: "₹25,000 तक (अल्प पूँजी)",
    businesses: [
      {
        id: "mobile_recharge_csc",
        nameHi: "डिजिटल सेवा व मोबाइल रिचार्ज केंद्र",
        nameEn: "Digital CSC & Mobile Point",
        capex: 22000,
        opex: 4500,
        expectedRev: 21000,
        expectedProfit: 16500,
        breakEvenMonths: 2,
        risk: "Low",
        demandScore: 88,
        compScore: 65,
        oppScore: 84,
        bestFor: "Tech-savvy youth, low space required"
      },
      {
        id: "spices_packaging",
        nameHi: "घरेलू मसाला पिसाई व मिनी पैकेजिंग",
        nameEn: "Home Spice Grinding & Micro-Packaging",
        capex: 24000,
        opex: 8000,
        expectedRev: 28000,
        expectedProfit: 20000,
        breakEvenMonths: 3,
        risk: "Low",
        demandScore: 91,
        compScore: 50,
        oppScore: 87,
        bestFor: "Women SHG, local kitchen demand"
      }
    ]
  },
  {
    tier: 50000,
    label: "₹50,000",
    labelHi: "₹50,000 तक (मध्यम पूँजी)",
    businesses: [
      {
        id: "tailoring_boutique",
        nameHi: "आधुनिक सिलाई व रेडीमेड गारमेंट केंद्र",
        nameEn: "Modern Tailoring & Garment Boutique",
        capex: 48000,
        opex: 12000,
        expectedRev: 45000,
        expectedProfit: 33000,
        breakEvenMonths: 3.5,
        risk: "Low",
        demandScore: 85,
        compScore: 55,
        oppScore: 82,
        bestFor: "High wedding and festive rush"
      },
      {
        id: "poultry_desi",
        nameHi: "देसी कड़कनाथ व ब्रायलर बैकयार्ड पोल्ट्री",
        nameEn: "Backyard Desi Poultry Unit",
        capex: 45000,
        opex: 15000,
        expectedRev: 48000,
        expectedProfit: 33000,
        breakEvenMonths: 4,
        risk: "Medium",
        demandScore: 86,
        compScore: 40,
        oppScore: 85,
        bestFor: "Farmers with spare backyard land"
      }
    ]
  },
  {
    tier: 100000,
    label: "₹1,00,000",
    labelHi: "₹1,00,000 तक (मानक उद्यम)",
    businesses: [
      {
        id: "dairy_chilled_value_add",
        nameHi: "दूध चिलिंग, पनीर व सुबह घर-घर डिलीवरी",
        nameEn: "Chilled Milk Delivery & Paneer Hub",
        capex: 95000,
        opex: 52000,
        expectedRev: 125000,
        expectedProfit: 73000,
        breakEvenMonths: 5,
        risk: "Low-Medium",
        demandScore: 94,
        compScore: 45,
        oppScore: 91,
        bestFor: "Cattle owners & daily dairy vendors"
      },
      {
        id: "agro_input_organic",
        nameHi: "जैविक खाद, बीज व कीटनाशक केंद्र",
        nameEn: "Organic Fertilizer & Agri-Input Center",
        capex: 90000,
        opex: 35000,
        expectedRev: 92000,
        expectedProfit: 57000,
        breakEvenMonths: 6,
        risk: "Low",
        demandScore: 89,
        compScore: 60,
        oppScore: 83,
        bestFor: "Farming clusters & vegetable growers"
      }
    ]
  },
  {
    tier: 500000,
    label: "₹5,00,000+",
    labelHi: "₹5,00,000+ (औद्योगिक / एग्रो प्रोसेसिंग)",
    businesses: [
      {
        id: "flour_oil_mini_mill",
        nameHi: "मिनी आटा चक्की, सरसों तेल एक्सपेलर व फीड प्लांट",
        nameEn: "Mini Flour & Mustard Oil Expeller Unit",
        capex: 480000,
        opex: 120000,
        expectedRev: 280000,
        expectedProfit: 160000,
        breakEvenMonths: 9,
        risk: "Medium",
        demandScore: 96,
        compScore: 35,
        oppScore: 93,
        bestFor: "PMEGP 35% Subsidy eligible entrepreneurs"
      },
      {
        id: "solar_cold_storage",
        nameHi: "सोलर पावर्ड माइक्रो कोल्ड स्टोरेज व रूरल हब",
        nameEn: "Solar Micro-Cold Room for Perishables",
        capex: 520000,
        opex: 80000,
        expectedRev: 240000,
        expectedProfit: 160000,
        breakEvenMonths: 11,
        risk: "Low",
        demandScore: 92,
        compScore: 20,
        oppScore: 95,
        bestFor: "Vegetable & fruit farmer collectives"
      }
    ]
  }
];

// 2. Village Business Gap Map Data
export const VILLAGE_GAP_MAP_DATA = {
  village: "Adampur (Sewapuri Block)",
  population: 3420,
  households: 480,
  densityRating: "High Competition in Traditional, Zero in Value-Addition",
  totalShops: 28,
  existingCategories: [
    { name: "पारंपरिक किराना (Traditional Grocery)", count: 12, saturation: "Over-Saturated", color: "#ef4444" },
    { name: "कच्चा दूध विक्रेता (Raw Milk Vendors)", count: 6, saturation: "Saturated", color: "#f59e0b" },
    { name: "साइकिल व पंचर रिपेयर (Cycle Repair)", count: 4, saturation: "Normal", color: "#3b82f6" },
    { name: "चाय व समोसा नाश्ता (Tea & Snacks)", count: 5, saturation: "Normal", color: "#10b981" },
    { name: "नाई व सैलून (Local Salon)", count: 1, saturation: "Low", color: "#8b5cf6" }
  ],
  missingCategories: [
    {
      nameHi: "पनीर, दही व पैकेज्ड चिलिंग यूनिट",
      nameEn: "Paneer, Curd & Cold Milk Storage",
      gapScore: 94,
      demandReasonHi: "480 में से 180 नौकरीपेशा व शिक्षक परिवार प्रतिदिन ब्लॉक मुख्यालय से ₹380/किग्रा पनीर लाते हैं।",
      estimatedMarketMonthly: "₹1,45,000"
    },
    {
      nameHi: "पशु आहार, साइलेज व मिनरल मिक्सचर डिपो",
      nameEn: "Cattle Feed, Silage & Mineral Depot",
      gapScore: 89,
      demandReasonHi: "गाँव में 620 दुधारू पशु हैं, पर उच्च गुणवत्ता पशु आहार 8 किमी दूर से महंगा मंगाना पड़ता है।",
      estimatedMarketMonthly: "₹2,10,000"
    },
    {
      nameHi: "सोलर पंप व कृषि उपकरण सर्विस सेंटर",
      nameEn: "Solar Pump & Farm Tech Repair Center",
      gapScore: 85,
      demandReasonHi: "पीएम कुसुम योजना के तहत 34 सोलर पंप लगे हैं, किसी भी तकनीकी खराबी पर मैकेनिक बनारस शहर से आता है।",
      estimatedMarketMonthly: "₹95,000"
    },
    {
      nameHi: "मिनी कोल्ड स्टोरेज व फल-सब्जी ग्रेडिंग",
      nameEn: "Micro Cold Storage & Produce Grading",
      gapScore: 91,
      demandReasonHi: "टमाटर व हरी मिर्च की तुड़ाई के समय 25% फसल सड़ जाती है। कोल्ड स्टोरेज से 3x दाम मिलता है।",
      estimatedMarketMonthly: "₹2,80,000"
    }
  ],
  nearbyComparison: [
    { village: "गणेशपुर (Ganeshpur - Your Village)", pop: 4250, shopCount: 32, missingGaps: 3, healthScore: 84 },
    { village: "हरैया (Harraiya Mandi)", pop: 6800, shopCount: 58, missingGaps: 2, healthScore: 89 },
    { village: "कप्तानगंज (Kaptanganj)", pop: 5100, shopCount: 22, missingGaps: 5, healthScore: 74 }
  ]
};

// 9. Village Business Health Score (7 Indicators)
export const VILLAGE_HEALTH_SCORE = {
  overallScore: 84,
  tier: "High Growth Potential (Basti District)",
  indicators: [
    { nameHi: "स्थानीय बाज़ार मांग (Local Demand)", nameEn: "Local Market Demand", score: 88, max: 100, weight: "20%", status: "Strong" },
    { nameHi: "प्रतिस्पर्धा संतुलन (Competition Balance)", nameEn: "Competition Balance", score: 74, max: 100, weight: "15%", status: "Moderate" },
    { nameHi: "व्यापार विविधता (Business Diversity)", nameEn: "Business Diversity", score: 68, max: 100, weight: "15%", status: "Needs Improvement" },
    { nameHi: "डिजिटल व यूपीआई अपनाना (Digital Adoption)", nameEn: "Digital & UPI Adoption", score: 86, max: 100, weight: "15%", status: "Excellent" },
    { nameHi: "संस्थागत लोन उपलब्धता (Credit Access)", nameEn: "Credit & Bank Access", score: 82, max: 100, weight: "15%", status: "Strong (SBI / PNB Basti)" },
    { nameHi: "हाईवे व मंडी कनेक्टिविटी (Market Connectivity)", nameEn: "Market Connectivity", score: 94, max: 100, weight: "10%", status: "Superb (NH-28 Highway 2.5km)" },
    { nameHi: "उभरते नए अवसर (Emerging Sectors)", nameEn: "Emerging Trade Gaps", score: 92, max: 100, weight: "10%", status: "Very High" }
  ]
};

// 11. Local Resource Finder Database
export const LOCAL_RESOURCES_DATA = [
  {
    category: "दूध व कच्चा माल (Dairy & Agri Raw Materials)",
    items: [
      { name: "गणेशपुर दुग्ध उत्पादक सहकारी समिति (28 किसान)", type: "Raw Milk Supplier", contact: "98712XXXXX", rate: "₹42/L भैंस, ₹34/L गाय", dist: "गाँव में ही (Local)" },
      { name: "बस्ती किसान एग्रो खाद-बीज केंद्र", type: "Certified Seeds & Bio-Inputs", contact: "94501XXXXX", rate: "सरकारी दर से 10% छूट", dist: "2.5 किमी (हरैया रोड)" }
    ]
  },
  {
    category: "पैकेजिंग व मशीनरी सप्लायर (Packaging & Machinery)",
    items: [
      { name: "बस्ती पैकटेक इंडस्ट्रीज (औद्योगिक क्षेत्र)", type: "Food Grade Pouches & Bottles", contact: "98390XXXXX", rate: "₹0.85 प्रति पाउच (न्यूनतम 5000)", dist: "8.5 किमी (बस्ती शहर)" },
      { name: "अवध एग्रो इंजीनियरिंग", type: "Milk Chiller & Paneer Press", contact: "94152XXXXX", rate: "PMEGP अनुमोदित मशीनरी", dist: "12 किमी (बस्ती सदर)" }
    ]
  },
  {
    category: "ट्रांसपोर्ट व लॉजिस्टिक्स (Transporters & Delivery)",
    items: [
      { name: "बस्ती-हरैया ग्रामीण टेम्पो व पिकअप यूनियन", type: "Daily Morning Market Route", contact: "91612XXXXX", rate: "₹200 प्रति ट्रिप (बस्ती गल्ला मंडी)", dist: "1.2 किमी" },
      { name: "ई-रिक्शा डिलीवरी फ्लीट (रामदेव)", type: "Inter-Village Delivery", contact: "97940XXXXX", rate: "₹30 प्रति 5 किमी डिलीवरी", dist: "गाँव में ही" }
    ]
  },
  {
    category: "बैंक व सरकारी सेवा केंद्र (Banks & CSC)",
    items: [
      { name: "भारतीय स्टेट बैंक (बस्ती सदर / हरैया शाखा)", type: "PMEGP / Mudra Nodal Branch", contact: "05542-242XXXX", rate: "मुद्रा नोडल अधिकारी: श्री श्रीवास्तव", dist: "3.5 किमी" },
      { name: "कॉमन सर्विस सेंटर (CSC) गणेशपुर चौपाल", type: "Udyam Registration & Loan Filing", contact: "99180XXXXX", rate: "निशुल्क सरकारी परामर्श", dist: "गाँव चौपाल" }
    ]
  }
];

// 12. Local-to-National Market Advisor (5-Stage Ladder)
export const MARKET_LADDER = [
  {
    stage: "चरण 1",
    level: "गाँव स्तर (Village Direct)",
    radius: "0-3 किमी",
    targetCustomers: "गणेशपुर गाँव के 610 परिवार, स्कूल, पंचायत व स्थानीय ग्रामीण",
    products: "ताज़ा दूध, रोज़मर्रा का आटा व मसाले",
    paymentMode: "नकद, मासिक खाता, UPI",
    margin: "18% - 25%"
  },
  {
    stage: "चरण 2",
    level: "पड़ोसी हाट व गाँव (Nearby Haats)",
    radius: "3-8 किमी",
    targetCustomers: "हरैया, कप्तानगंज साप्ताहिक ग्रामीण बाजार व ढाबे",
    products: "पनीर, खोया, जैविक सब्जियां व रेडीमेड कपड़े",
    paymentMode: "तुरंत UPI, साप्ताहिक भुगतान",
    margin: "25% - 32%"
  },
  {
    stage: "चरण 3",
    level: "जिला व मंडी (District Market)",
    radius: "8-25 किमी",
    targetCustomers: "बस्ती शहर की प्रमुख मिष्ठान्न दुकानें, होटल, ढाबे",
    products: "थोक में ताजा पनीर, शुद्ध देसी घी, सरसों तेल",
    paymentMode: "15 दिवसीय बैंक अनुबंध",
    margin: "30% - 38%"
  },
  {
    stage: "चरण 4",
    level: "राज्य स्तरीय ब्रांड (State Network)",
    radius: "25-200 किमी",
    targetCustomers: "लखनऊ, कानपुर, प्रयागराज के सुपरमार्केट व एग्रो ब्रांड्स",
    products: "FSSAI प्रमाणित पैकेज्ड दालें, मसाले व आंवला कैंडी",
    paymentMode: "लेटर ऑफ क्रेडिट, बी2बी बैंक ट्रांसफर",
    margin: "35% - 45%"
  },
  {
    stage: "चरण 5",
    level: "राष्ट्रीय ई-कॉमर्स (National Digital Market)",
    radius: "अखिल भारतीय (Pan-India)",
    targetCustomers: "ONDC, Amazon Saheli, Flipkart Samarth, GeM पोर्टल",
    products: "GI-टैग्ड हस्तशिल्प, ऑर्गेनिक उत्पाद, बनारसी हैंडलूम",
    paymentMode: "डिजिटल एस्क्रो, प्रीपेड ऑर्डर्स",
    margin: "45% - 60%"
  }
];

// 13. Business Partner Finder
export const BUSINESS_PARTNERS = [
  {
    id: "shg_1",
    name: "उजाला महिला स्वयं सहायता समूह (12 सदस्य)",
    type: "Women Self-Help Group",
    skills: "मसाला पिसाई, पैकेजिंग, दाल प्रसंस्करण",
    capitalAvailable: "₹1,50,000 (SHG सीसीएल लोन)",
    lookingFor: "मार्केटिंग पार्टनर जो शहर में सप्लाई करे",
    location: "आदमपुर, वार्ड 4"
  },
  {
    id: "youth_1",
    name: "सुमित पटेल (डिप्लोमा इलेक्ट्रिकल)",
    type: "Skilled Technical Youth",
    skills: "सोलर पैनल इंस्टालेशन, वायरिंग, इन्वर्टर रिपेयर",
    capitalAvailable: "₹40,000 + टूल्स",
    lookingFor: "पूँजी निवेश भागीदार सोलर दुकान शुरू करने हेतु",
    location: "सेवापुरी"
  },
  {
    id: "farmer_1",
    name: "रामबली यादव (डेयरी फार्मर)",
    type: "Milk Producer Partner",
    skills: "14 गाय-भैंस, 90 लीटर दैनिक दूध उत्पादन",
    capitalAvailable: "प्रतिदिन 90 लीटर कच्चा दूध सप्लाई गारंटी",
    lookingFor: "चिलिंग व पनीर यूनिट में 40% इक्विटी पार्टनर",
    location: "कपसेठी रोड"
  }
];

// 14. AI Business Alerts (Real-Time Dynamic Conditions)
export const AI_BUSINESS_ALERTS = [
  {
    id: "alert_1",
    type: "festival",
    urgency: "High",
    titleHi: "आगामी नवरात्रि व दशहरा मांग उछाल",
    titleEn: "Navratri & Dussehra Surge Alert",
    descHi: "अगले 15 दिनों में पनीर, घी, कुट्टू का आटा व फल-मिठाई की मांग में 40% वृद्धि अनुमानित है। कच्चा माल अग्रिम स्टॉक करें।",
    descEn: "40% spike expected in paneer, ghee & buckwheat flour. Stock raw materials in advance.",
    impactTrade: "डेयरी व खाद्य प्रसंस्करण (Dairy & Agro-Processing)",
    action: "स्टॉक 30% बढ़ाएँ"
  },
  {
    id: "alert_2",
    type: "weather",
    urgency: "Medium",
    titleHi: "मौसम चेतावनी: 3 दिन भारी बारिश का अनुमान",
    titleEn: "Weather Alert: Heavy Monsoon Rains",
    descHi: "सब्जियों व खुले अनाज को सुरक्षित सूखे स्थान पर रखें। हरा चारा गीला न होने दें, पशुओं में खुरपका से बचाव का टीका लगवाएँ।",
    descEn: "Protect grain stocks from moisture. Ensure dry storage and cattle vaccination.",
    impactTrade: "पशुपालन व सब्जी विक्रेता",
    action: "सुरक्षित स्टोरेज सुनिश्चित करें"
  },
  {
    id: "alert_3",
    type: "price",
    urgency: "Opportunity",
    titleHi: "सरसों थोक भाव में ₹420/क्विंटल की गिरावट",
    titleEn: "Mustard Raw Price Dip Opportunity",
    descHi: "मंडी में सरसों के दाम घटने से तेल एक्सपेलर यूनिट्स के लिए पेराई मार्जिन 12% बढ़ गया है। कच्चा माल खरीदने का उत्तम समय।",
    descEn: "Mustard prices dipped in mandi, creating an immediate 12% higher profit margin for oil expellers.",
    impactTrade: "तेल एक्सपेलर व मिनी मिल",
    action: "कच्ची सरसों खरीदें"
  }
];

// 7. Expanded Government Scheme Matcher Profiles
export const SCHEMES_EXPANDED = [
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    nameHi: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    category: "विनिर्माण व सेवा (Manufacturing & Processing)",
    maxProjectCost: 5000000,
    subsidyRuralGeneral: "25%",
    subsidyRuralSpecial: "35% (SC/ST/OBC/Women/Minority/Ex-Servicemen)",
    ownContribution: "5% (Special) या 10% (General)",
    interestRate: "9.0% - 10.5%",
    collateral: "₹10 लाख तक शून्य (No Collateral under CGTMSE)",
    eligibility: {
      minAge: 18,
      education: "8th Pass for projects > ₹10 Lakh",
      location: "Rural Area gets 35% subsidy"
    },
    documents: [
      "आधार कार्ड व पैन कार्ड",
      "विस्तृत प्रोजेक्ट रिपोर्ट (DPR - UdyamSaathi द्वारा जनरेटेड)",
      "जाति / श्रेणी प्रमाण पत्र (35% सब्सिडी हेतु)",
      "शैक्षणिक योग्यता प्रमाण पत्र (8वीं पास)",
      "ग्राम प्रधान या पंचायत का निवास प्रमाण पत्र"
    ]
  },
  {
    id: "pmmy_kishore",
    name: "Pradhan Mantri Mudra Yojana (PMMY) - Kishore & Tarun",
    nameHi: "प्रधानमंत्री मुद्रा योजना (PMMY)",
    category: "व्यापार व लघु सेवा (Trading, Shop & Small Service)",
    maxProjectCost: 1000000,
    subsidyRuralGeneral: "बिना गारंटी शून्य कोलैटरल (0% Subsidy, Collateral Free)",
    subsidyRuralSpecial: "शून्य प्रोसेसिंग शुल्क + CGTMSE गारंटी",
    ownContribution: "15% - 20%",
    interestRate: "8.5% - 9.5%",
    collateral: "पूर्णतः संपार्श्विक मुक्त (100% Collateral Free)",
    eligibility: {
      minAge: 18,
      education: "कोई न्यूनतम शैक्षणिक शर्त नहीं",
      location: "गाँव व शहर दोनों"
    },
    documents: [
      "पहचान व निवास प्रमाण (Aadhaar / Voter ID)",
      "उद्यम रजिस्ट्रेशन (Udyam Certificate)",
      "अंतिम 6 माह का बैंक खाता विवरण",
      "दुकान या व्यापार का कोटेशन व बिल"
    ]
  },
  {
    id: "stand_up_india",
    name: "Stand-Up India Scheme for Women & SC/ST",
    nameHi: "स्टैंड-अप इंडिया योजना (महिला व SC/ST उद्यमी)",
    category: "ग्रीनफील्ड नया उद्यम (Greenfield Ventures)",
    maxProjectCost: 10000000,
    subsidyRuralGeneral: "कन्वर्जेंस सब्सिडी + 15% मार्जिन मनी सपोर्ट",
    subsidyRuralSpecial: "7 वर्ष की आसान पुनर्भुगतान अवधि",
    ownContribution: "15%",
    interestRate: "MCLR + 3% + Tenor Premium",
    collateral: "क्रेडिट गारंटी फंड (NABCredit Guarantee)",
    eligibility: {
      minAge: 18,
      education: "नया उद्यम (Greenfield only)",
      location: "महिला या SC/ST आवेदक अनिवार्य"
    },
    documents: [
      "आवेदक महिला या SC/ST प्रमाण पत्र",
      "प्रोजेक्ट फिजिबिलिटी रिपोर्ट",
      "भूमि या लीज एग्रीमेंट दस्तावेज",
      "पैन, आधार व 3 पासपोर्ट साइज फोटो"
    ]
  }
];

