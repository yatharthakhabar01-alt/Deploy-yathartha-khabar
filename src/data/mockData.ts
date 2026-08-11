import { Article, AdBanner, TeamMember, CategoryItem, CitizenReporter } from '../types';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', nameNepali: 'मुख्य समाचार', slug: 'main-news', isActive: true, displayOrder: 1 },
  { id: 'cat-priority-1', nameNepali: 'पूर्णविराम पछिको प्रश्नवाचक', slug: 'purnabiram-pachiko-prashnawachak', isActive: true, displayOrder: 2 },
  { id: 'cat-priority-2', nameNepali: 'जन चौतारी', slug: 'jana-chautari', isActive: true, displayOrder: 3 },
  { id: 'cat-priority-3', nameNepali: 'नागरिक रिपोर्ट', slug: 'nagarik-report', isActive: true, displayOrder: 4 },
  { id: 'cat-priority-4', nameNepali: 'खोजी हाम्रो, उत्तर तपाईंको', slug: 'khoji-hamro-uttar-tapainko', isActive: true, displayOrder: 5 },
  { id: 'cat-2', nameNepali: 'राजनीति', slug: 'politics', isActive: true, displayOrder: 6 },
  { id: 'cat-3', nameNepali: 'अर्थतन्त्र', slug: 'economy', isActive: true, displayOrder: 7 },
  { id: 'cat-4', nameNepali: 'समाज', slug: 'society', isActive: true, displayOrder: 8 },
  { id: 'cat-5', nameNepali: 'विचार/ब्लग', slug: 'opinion', isActive: true, displayOrder: 9 },
  { id: 'cat-6', nameNepali: 'विश्व', slug: 'world', isActive: true, displayOrder: 10 },
  { id: 'cat-7', nameNepali: 'खेलकुद', slug: 'sports', isActive: true, displayOrder: 11 },
  { id: 'cat-8', nameNepali: 'प्रविधि', slug: 'technology', isActive: true, displayOrder: 12 },
  { id: 'cat-9', nameNepali: 'मनोरञ्जन', slug: 'entertainment', isActive: true, displayOrder: 13 },
  { id: 'cat-10', nameNepali: 'हाम्रो टोली', slug: 'our-team', isActive: true, displayOrder: 14 },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    nameNepali: 'सरिता थापा',
    nameEnglish: 'Sarita Thapa',
    designation: 'अध्यक्ष (Chairperson)',
    department: 'व्यवस्थापन तथा सञ्चालक समिति',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    email: 'sarita.thapa@yatharthakhabar.com',
    phone: '+977 9763695666',
    bio: 'यथार्थ खबरको अध्यक्ष तथा सञ्चालक समितिको नेतृत्वकर्ता। स्वतन्त्र, निष्पक्ष र संस्थागत मिडिया विकासमा नेतृत्वदायी भूमिका।',
    pressCardNo: 'सूचना विभाग द.नं. ४१२५',
    displayOrder: 1,
  },
  {
    id: 'team-2',
    nameNepali: 'कल्पना भट्ट',
    nameEnglish: 'Kalpana Bhatta',
    designation: 'सम्पादक (Editor)',
    department: 'सम्पादकीय मण्डल',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    email: 'editor@yatharthakhabar.com',
    phone: '+977 9763695666',
    bio: 'खोजी पत्रकारिता र सम्पादकीय नेतृत्वमा सक्रिय। सत्य, निष्पक्ष र तथ्यपरक समाचार सम्पादनमा निरन्तर क्रियाशील।',
    pressCardNo: 'सूचना विभाग द.नं. ५३०१',
    displayOrder: 2,
  },
  {
    id: 'team-3',
    nameNepali: 'रोशन खड्का',
    nameEnglish: 'Roshan Khadka',
    designation: 'संवाददाता (Reporter)',
    department: 'समाचार कक्ष',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    email: 'roshan.reporter@yatharthakhabar.com',
    phone: '+977 9763695666',
    bio: 'जनसरोकारका विषय, सामाजिक खोजी र समसामयिक घटनाक्रमको स्थलगत रिपोर्टिङमा सिद्धहस्त संवाददाता।',
    pressCardNo: 'सूचना विभाग द.नं. ६११०',
    displayOrder: 3,
  },
  {
    id: 'team-4',
    nameNepali: 'बलराम गौतम',
    nameEnglish: 'Balram Gautam',
    designation: 'उत्पादन प्रमुख (Head of Production)',
    department: 'उत्पादन तथा मल्टिमिडिया',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    email: 'production@yatharthakhabar.com',
    phone: '+977 9763695666',
    bio: 'डिजिटल मिडिया, भिडियो उत्पादन तथा मल्टिमिडिया प्रस्तुतीकरणको प्रमुख। उच्च प्रविधि र गुणस्तरीय समाचार उत्पादनमा समर्पित।',
    pressCardNo: 'सूचना विभाग द.नं. ७२०४',
    displayOrder: 4,
  },
];

export const INITIAL_ADS: AdBanner[] = [
  // 1. TOP HEADER LANDSCAPE ADS (Carousel of 3 ads)
  {
    id: 'ad-slot-1a',
    placementSlot: 'TOP_HEADER_LANDSCAPE',
    title: 'नेपाल एसबिआइ बैंक - स्मार्ट बैंकिङ तथा क्यासब्याक अफर',
    advertiserName: 'SBI Bank Nepal',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=900&auto=format&fit=crop',
    targetUrl: 'https://example.com/sbi-nepal',
    isActive: true,
    impressions: 48200,
    clicks: 1420,
    dimensions: '728 x 90 px',
  },
  {
    id: 'ad-slot-1b',
    placementSlot: 'TOP_HEADER_LANDSCAPE',
    title: 'नबिल बैंक - डिजिटल बैंकिङ डिजिटल जीवन',
    advertiserName: 'Nabil Bank',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=900&auto=format&fit=crop',
    targetUrl: 'https://nabilbank.com',
    isActive: true,
    impressions: 39100,
    clicks: 1180,
    dimensions: '728 x 90 px',
  },
  {
    id: 'ad-slot-1c',
    placementSlot: 'TOP_HEADER_LANDSCAPE',
    title: 'सिजी इलेक्ट्रोनिक्स - समर डिस्काउन्ट अफर',
    advertiserName: 'CG Electronics Nepal',
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=900&auto=format&fit=crop',
    targetUrl: 'https://cgdigital.com.np',
    isActive: true,
    impressions: 29400,
    clicks: 890,
    dimensions: '728 x 90 px',
  },

  // 2. BELOW CATEGORY LANDSCAPE ADS (Carousel of 3 ads)
  {
    id: 'ad-slot-2a',
    placementSlot: 'BELOW_CATEGORY_LANDSCAPE',
    title: 'एनआइसी एशिया बैंक - ६ मिनेटमै अनलाइन खाता खोल्नुहोस्',
    advertiserName: 'NIC ASIA Bank',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    targetUrl: 'https://nicasiabank.com',
    isActive: true,
    impressions: 62400,
    clicks: 2890,
    dimensions: '1200 x 120 px',
  },
  {
    id: 'ad-slot-2b',
    placementSlot: 'BELOW_CATEGORY_LANDSCAPE',
    title: 'सुबिसु केबलनेट - उच्च गतिको फाइबर इन्टरनेट र टिभी',
    advertiserName: 'Subisu Cablenet',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    targetUrl: 'https://subisu.net.np',
    isActive: true,
    impressions: 44100,
    clicks: 1650,
    dimensions: '1200 x 120 px',
  },
  {
    id: 'ad-slot-2c',
    placementSlot: 'BELOW_CATEGORY_LANDSCAPE',
    title: 'बजाज पल्सर - २५० सीसी एक्सचेन्ज मेला र नगद छुट',
    advertiserName: 'Bajaj Nepal',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop',
    targetUrl: 'https://bajajnepal.com',
    isActive: true,
    impressions: 38200,
    clicks: 1410,
    dimensions: '1200 x 120 px',
  },

  // 3. MID FEED WIDE ADS
  {
    id: 'ad-slot-3a',
    placementSlot: 'MID_FEED_WIDE',
    title: 'डिशहोम फाइभरनेट - ६०० Mbps सुपरफास्ट इन्टरनेट',
    advertiserName: 'DishHome Nepal',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
    targetUrl: 'https://dishhome.com.np',
    isActive: true,
    impressions: 31200,
    clicks: 980,
    dimensions: '970 x 150 px',
  },
  {
    id: 'ad-slot-3b',
    placementSlot: 'MID_FEED_WIDE',
    title: 'एनसेल - नयाँ अल्ट्रा ५जी डाटा प्याक र भ्वाइस बोनस',
    advertiserName: 'Ncell Axiata',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    targetUrl: 'https://ncell.axiata.com',
    isActive: true,
    impressions: 51200,
    clicks: 1940,
    dimensions: '970 x 150 px',
  },

  // 4. RIGHT SIDEBAR 1 ADS
  {
    id: 'ad-slot-4a',
    placementSlot: 'RIGHT_SIDEBAR_1',
    title: 'नेपाल टेलिकम - ५जी सेवा परीक्षण तथा अनलिमिटेड नाइट प्याक',
    advertiserName: 'Nepal Telecom',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop',
    targetUrl: 'https://ntc.net.np',
    isActive: true,
    impressions: 29800,
    clicks: 1120,
    dimensions: '300 x 250 px',
  },
  {
    id: 'ad-slot-4b',
    placementSlot: 'RIGHT_SIDEBAR_1',
    title: 'एभरेस्ट बैंक - विशेष आवास र सवारी कर्जा योजना',
    advertiserName: 'Everest Bank',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop',
    targetUrl: 'https://everestbankltd.com',
    isActive: true,
    impressions: 21000,
    clicks: 810,
    dimensions: '300 x 250 px',
  },

  // 5. RIGHT SIDEBAR 2 ADS
  {
    id: 'ad-slot-5a',
    placementSlot: 'RIGHT_SIDEBAR_2',
    title: 'महालक्ष्मी विकास बैंक - उच्च ब्याजदर बचत खाता',
    advertiserName: 'Mahalaxmi Bikas Bank',
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&auto=format&fit=crop',
    targetUrl: 'https://mahalaxmibank.com',
    isActive: true,
    impressions: 21500,
    clicks: 740,
    dimensions: '300 x 600 px',
  },
  {
    id: 'ad-slot-5b',
    placementSlot: 'RIGHT_SIDEBAR_2',
    title: 'सिटीजन लाइफ इन्स्योरेन्स - सुरक्षित भविष्यको ग्यारेन्टी',
    advertiserName: 'Citizen Life Insurance',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop',
    targetUrl: 'https://citizenlifene-pal.com',
    isActive: true,
    impressions: 18400,
    clicks: 620,
    dimensions: '300 x 600 px',
  },

  // 6. IN ARTICLE MID
  {
    id: 'ad-slot-6a',
    placementSlot: 'IN_ARTICLE_MID',
    title: 'हन्डा नेपाल - नयाँ मोटरसाइकल एक्सचेन्ज क्याम्प',
    advertiserName: 'Honda Nepal',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
    targetUrl: 'https://hondanepal.com',
    isActive: true,
    impressions: 18900,
    clicks: 650,
    dimensions: '728 x 120 px',
  },

  // 7. BOTTOM STICKY FLOATING
  {
    id: 'ad-slot-7a',
    placementSlot: 'BOTTOM_STICKY_FLOATING',
    title: 'आइएमई पे - डिजिटल भुक्तानीमा क्यासब्याक धमाका',
    advertiserName: 'IME Pay Nepal',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a6703f8a00c?q=80&w=1200&auto=format&fit=crop',
    targetUrl: 'https://imepay.com.np',
    isActive: true,
    impressions: 89400,
    clicks: 3410,
    dimensions: '1000 x 80 px (Sticky Bottom)',
  },

  // 8. PRE FOOTER SPONSOR
  {
    id: 'ad-slot-8a',
    placementSlot: 'PRE_FOOTER_SPONSOR',
    title: 'नेपाल लाइफ इन्स्योरेन्स - जीवन बीमा नै भविष्यको आधार',
    advertiserName: 'Nepal Life Insurance',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    targetUrl: 'https://nepallife.com.np',
    isActive: true,
    impressions: 41000,
    clicks: 1290,
    dimensions: '1200 x 140 px',
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-p1',
    title: 'पूर्णविराम पछिको प्रश्नवाचक: सुन्दरीजल खानेपानी आयोजनामा अरबौँ बजेट सकिँदा पनि उपत्यकावासीको धारामा धमिलो पानी किन?',
    slug: 'purnabiram-sundarijal-drinking-water-investigation',
    category: 'पूर्णविराम पछिको प्रश्नवाचक',
    subCategory: 'विशेष खोजी',
    summary: 'सार्वजनिक लेखा परीक्षण समिति र अख्तियारले फाइल तामेलीमा राखेपछि सुन्दरीजल खानेपानी सुधार आयोजनाको अनुगमन रोकिएको छ। यथार्थ खबरको विशेष अनुसन्धान: के राज्यकोषको करोडौँ रकम खर्च भएपछि नियमन अन्तिम प्रतिवेदनमै सीमित हुने हो?',
    content: `काठमाडौँ — उपत्यकाको खानेपानी समस्या समाधानका लागि सुन्दरीजल प्रशोधन केन्द्र र वितरण सञ्जाल सुधारमा विनियोजित ५ अर्बभन्दा बढी रकम खर्च भइसक्दा पनि वर्षायाममा उपत्यकावासीको धारामा लेदो र धमिलो पानी आउने समस्या जस्ताको तस्तै छ।

यथार्थ खबरको खोज अनुसन्धान टोलीले प्राप्त गरेको आन्तरिक लेखापरीक्षण प्रतिवेदन अनुसार प्रशोधन प्लान्टको गुणस्तर नियन्त्रण र फिल्टर मिडिया परिवर्तनका लागि छुट्याइएको रकम कागजमै सीमित भएको पाइएको छ। आयोजनाका अधिकारीहरूले 'प्राविधिक त्रुटि' भन्दै पन्छिन खोजे पनि सार्वजनिक लेखा समितिले औँल्याएका १५ वटा गम्भीर त्रुटिहरूमा कुनै कारबाही भएको छैन।

'हामीले शुद्ध पानीको महसुल बुझाएका छौँ, तर ट्याङ्कीमा हिलो थिग्र्याएर प्रयोग गर्नुपर्ने बाध्यता छ,' नयाँ बानेश्वरका बासिन्दा रामेश्वर श्रेष्ठ भन्छन्। 

पूर्णविराम पछिको प्रश्नवाचक: ठेकेदार र आयोजना नेतृत्वले काम सम्पन्न भएको कागज बनाएर भुक्तानी लिइसकेपछि, नागरिकको स्वास्थ्यसँग प्रत्यक्ष जोडिएको यो लापरबाहीको जिम्मेवारी कसले लिने? के हरेक वर्ष आयोजना थपिँदै जाने र जवाफदेहिता अन्त्य हुने शृंखला कहिल्यै रोकिँदैन?`,
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'सुन्दरीजल प्रशोधन केन्द्र क्षेत्र र काठमाडौँ खानेपानी सञ्जाल। फोटो: यथार्थ खबर',
    authorName: 'सुनिता श्रेष्ठ',
    authorRole: 'प्रधान सम्पादक',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: '२०८३ साउन २२, बिहीबार',
    publishedAtIso: '2026-08-06T11:00:00Z',
    readTimeMinutes: 5,
    viewsCount: 18920,
    isBreaking: true,
    isFeatured: true,
    location: 'काठमाडौँ',
    province: 'बागमती प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 520, respect: 310, sad: 85, informative: 640 },
    comments: [
      {
        id: 'cp1-1',
        authorName: 'बिन्दु पोखरेल',
        content: 'गम्भीर र साहसिक खोजी! यस्ता आयोजनाको सत्यतथ्य बाहिर ल्याएर दोषीमाथि कारबाही गराउनै पर्छ।',
        createdAt: '१५ मिनेट अघि',
        likes: 34,
      }
    ],
    aiAuditReport: {
      aiGeneratedProbability: 2,
      authenticityScore: 99,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 98,
      keyHighlights: ['५ अर्ब खर्च भएपछि पनि धमिलो पानी', 'लेखा समितिका १५ त्रुटि कार्यान्वयन भएनन्', 'जवाफदेहिताको गम्भीर प्रश्न'],
      grammarSuggestions: [],
      suggestedTags: ['खोजी', 'खानेपानी', 'सुन्दरीजल', 'जवाफदेहिता'],
      sentiment: 'NEUTRAL',
      reviewedAt: '२०८३ साउन २२, ११:०५ AM',
    }
  },
  {
    id: 'art-p2',
    title: 'जन चौतारी: काठमाडौँका सडकपेटी फराकिलो बनाउने अभियानमा स्थानीय नागरिक र फुटपाथ व्यापारीको मिश्रित मत',
    slug: 'jana-chautari-kathmandu-footpath-expansion-public-debate',
    category: 'जन चौतारी',
    subCategory: 'नागरिक संवाद',
    summary: 'उपत्यकाको सौन्दर्यीकरण र पैदलयात्री सुरक्षा अभियानमा साना व्यापारी र पैदलयात्रीको अनुभव कस्तो छ? यथार्थ खबरको विशेष जन चौतारी बहसमा नागरिकहरू भन्छन्— "सडक सुधार प्रशंसनीय छ, तर विकल्प नदिई हटाउनु अन्यायपूर्ण भयो।"',
    content: `काठमाडौँ — काठमाडौँ महानगरपालिकाले थालेको सडकपेटी विस्तार, अव्यवस्थित तार व्यवस्थापन र फुटपाथ क्षेत्र अतिक्रमण हटाउने अभियान अहिले चौतर्फी चर्चाको विषय बनेको छ। यथार्थ खबरको 'जन चौतारी' टोलीले असन, इन्द्रचोक, र बानेश्वर क्षेत्रका स्थानीय बासिन्दा, पैदलयात्री र साना व्यापारीहरूसँग प्रत्यक्ष कुराकानी गरेको छ।

पैदलयात्री अनिता अधिकारी भन्छिन्— 'पहिले असन गल्लीमा हिँड्न सम्भव थिएन। अहिले पैदलयात्रीका लागि सडक सुरक्षित र सफा भएको छ। यो कदमको म पूर्ण समर्थन गर्छु।'

तर अर्कोतर्फ १५ वर्षदेखि असनमा साना हस्तकलाका सामान बेच्दै आएका हरिबहादुर थारुको दुःख बेग्लै छ— 'हामीले पनि इमानदारीपूर्वक जीवन चलाउन खोजेका हौँ। महानगरले निश्चित समय वा साझपखको बजार तोकिदिएको भए हाम्रो रोजीरोटी खोसिने थिएन।'

जन चौतारी निष्कर्ष: विकास र सौन्दर्यीकरण अत्यावश्यक छ, तर निम्न आयवर्गका नागरिकको वैकल्पिक व्यवस्थापन नगरिँदा सामाजिक असन्तुलन बढ्ने खतरा रहन्छ।`,
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'असन क्षेत्रमा पैदलयात्री र स्थानीय बासिन्दासँग जन चौतारी संवाद। फोटो: यथार्थ खबर',
    authorName: 'रमेश पौडेल',
    authorRole: 'कार्यकारी सम्पादक',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: '२०८३ साउन २२, बिहीबार',
    publishedAtIso: '2026-08-06T10:15:00Z',
    readTimeMinutes: 4,
    viewsCount: 12400,
    isBreaking: false,
    isFeatured: true,
    location: 'काठमाडौँ',
    province: 'बागमती प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 410, respect: 290, sad: 12, informative: 380 },
    comments: [
      {
        id: 'cp2-1',
        authorName: 'श्यामसुन्दर श्रेष्ठ',
        content: 'जन चौतारीको यो पहल धेरै राम्रो छ। दुवै पक्षका आवाज सुन्न पाउनु सकारात्मक कुरा हो।',
        createdAt: '२० मिनेट अघि',
        likes: 19,
      }
    ],
    aiAuditReport: {
      aiGeneratedProbability: 3,
      authenticityScore: 97,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 99,
      keyHighlights: ['पैदलयात्री सुरक्षा र व्यापारिक व्यवस्थापन बहस', 'स्थानीय नागरिकका प्रत्यक्ष अनुभव', 'वैकल्पिक बजार व्यवस्थापनको माग'],
      grammarSuggestions: [],
      suggestedTags: ['जनचौतारी', 'काठमाडौँ', 'सडकपेटी', 'नागरिकआवाज'],
      sentiment: 'POSITIVE',
      reviewedAt: '२०८३ साउन २२, १०:२० AM',
    }
  },
  {
    id: 'art-p3',
    title: 'नागरिक रिपोर्ट: पोखरा-बागलुङ राजमार्गको अलपत्र पुल, २ वर्षदेखि जोखिमपूर्ण काठको साँघुबाट दैनिक ५ हजार सर्वसाधारणको यात्रा',
    slug: 'nagarik-report-pokhara-baglung-bridge-dilapidated',
    category: 'नागरिक रिपोर्ट',
    subCategory: 'स्थलगत रिपोर्ट',
    summary: 'पोखराका नागरिक रिपोर्टर सन्तोष शर्माले पठाउनुभएको प्रत्यक्ष स्थलगत विवरण र तस्वीरसहितको एक्सक्लुसिभ रिपोर्ट। ठेकेदारको ढिलासुस्ती र नियमनकारी निकायको बेवास्ताले दैनिक हजारौँ नागरिक ज्यान जोखिममा राखेर यात्रा गर्न बाध्य छन्।',
    content: `कास्की (पोखरा) — पोखरा-बागलुङ राजमार्ग जोड्ने याम्दी खोलाको पक्की पुल निर्माण सम्झौता सकिएको दुई वर्ष बित्दा पनि जग हालेकै अवस्थामा अलपत्र परेको छ। स्थानीय नागरिक रिपोर्टर सन्तोष शर्माले पठाउनुभएको भिडियो तथा फोटो रिपोर्ट अनुसार वर्षायाम सुरु भएसँगै सर्वसाधारण बाँस र काठको अस्थाई साँघुबाट वारपार गर्न बाध्य छन्।

'विद्यालय जाने बालबालिका र बिरामी बोकेका एम्बुलेन्स समेत यहाँ घण्टौँ रोकिनुपर्छ,' स्थानीय नागरिक रिपोर्टर सन्तोष शर्मा लेख्नुहुन्छ। 'हामीले पटक-पटक सडक डिभिजन कार्यालयमा ज्ञापनपत्र बुझायौँ, तर कुनै सुनुवाइ भएन।'

सडक डिभिजन कार्यालय पोखराका प्रतिनिधिहरूले भने निर्माण कम्पनीलाई कालोसूचीमा राख्ने चेतावनी दिइएको बताएका छन्। नागरिक रिपोर्टमार्फत खबर सार्वजनिक भएपछि निर्माणस्थलमा प्राविधिक टोली निरीक्षणका लागि खटाइएको छ।`,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'याम्दी खोलामा अलपत्र पुल र जोखिमपूर्ण काठको साँघु। फोटो: नागरिक रिपोर्टर सन्तोष शर्मा',
    authorName: 'सन्तोष शर्मा (नागरिक रिपोर्टर)',
    authorRole: 'नागरिक संवाददाता, कास्की',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: '२०८३ साउन २२, बिहीबार',
    publishedAtIso: '2026-08-06T09:45:00Z',
    readTimeMinutes: 3,
    viewsCount: 15600,
    isBreaking: false,
    isFeatured: false,
    location: 'पोखरा',
    province: 'गण्डकी प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 380, respect: 210, sad: 140, informative: 490 },
    comments: [
      {
        id: 'cp3-1',
        authorName: 'गणेश गुरुङ',
        content: 'नागरिक रिपोर्टर सन्तोषजीलाई धन्यवाद! यस्ता जनसरोकारका विषयमा तुरुन्तै कदम चालियोस्।',
        createdAt: '३० मिनेट अघि',
        likes: 27,
      }
    ],
    aiAuditReport: {
      aiGeneratedProbability: 1,
      authenticityScore: 99,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 100,
      keyHighlights: ['नागरिक रिपोर्टरबाट प्रत्यक्ष रिपोर्ट प्राप्त', 'अलपत्र पुलले ५ हजार यात्रु जोखिममा', 'सडक डिभिजनद्वारा टोली परिचालन'],
      grammarSuggestions: [],
      suggestedTags: ['नागरिकरिपोर्ट', 'पोखरा', 'सडक', 'पुल'],
      sentiment: 'NEUTRAL',
      reviewedAt: '२०८३ साउन २२, ०९:५० AM',
    }
  },
  {
    id: 'art-p4',
    title: 'खोजी हाम्रो, उत्तर तपाईंको: सरकारी अस्पतालहरूमा ५० करोडभन्दा बढीका आधुनिक एमआरआई मेसिन थन्किनुका पछाडि को जिम्मेवार?',
    slug: 'khoji-hamro-uttar-tapainko-hospital-mri-machines-unused',
    category: 'खोजी हाम्रो, उत्तर तपाईंको',
    subCategory: 'खोजी पत्रकारिता',
    summary: 'यथार्थ खबरको अनुसन्धान टोलीले मुलुकका ८ मुख्य प्रादेशिक तथा केन्द्रीय सरकारी अस्पतालमा थन्किएका एमआरआई र सीटी स्क्यान मेसिनको खोजी गरेको छ। अस्पताल प्रशासन र स्वास्थ्य मन्त्रालयसँग हाम्रा सीधा प्रश्नहरू।',
    content: `काठमाडौँ — देशका अग्रणी सरकारी अस्पतालमा लाखौँ विपन्न नागरिकहरू एमआरआई र सीटी स्क्यान सेवाका लागि ६ महिनासम्म पालो पर्खिन बाध्य छन्। तर यथार्थ खबरको 'खोजी हाम्रो, उत्तर तपाईंको' विशेष शृंखला अन्तर्गत गरिएको छानबिनमा विभिन्न ८ वटा प्रादेशिक र शिक्षण अस्पतालमा ५० करोड मूल्य बराबरका उपकरणहरू सानो प्राविधिक मर्मत र अपरेटर अभावको बहानामा थन्क्याएर राखिएको तथ्य फेला परेको छ।

हाम्रो अनुसन्धान टोलीले वीर अस्पताल, कोशी प्रादेशिक अस्पताल र भेरी अस्पतालका स्टोर रुममा थन्किएका मेसिनहरूको सूची तयार पारेको छ। निजी डाइग्नोस्टिक सेन्टरहरूसँगको सम्भावित सेटिङका कारण सरकारी उपकरण जानीजानी बिगारेर राखिएको आरोप स्थानीय बिरामी कुरुवाहरूले लगाएका छन्।

हाम्रो सीधा प्रश्न:
१. स्वास्थ्य मन्त्रालय: अनुदान वा बजेटबाट किनिएका उपकरण वर्षौँसम्म प्रयोगमा नआउँदा अनुगमन किन भएन?
२. अस्पताल प्रशासन: रेडियोलोजिस्ट र प्राविधिक दरबन्दी पदपूर्ति गर्न किन तदारुकता देखाइएन?

(तपाईंको क्षेत्रमा पनि यस्तै सरकारी अस्पताल वा आयोजनामा अनियमितता देखिएको छ भने यथार्थ खबरलाई सिधै सम्पर्क गर्नुहोस्। उत्तर सम्बन्धित निकायबाट हामी माग्नेछौँ।)` ,
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'सरकारी अस्पतालमा थन्किएका आधुनिक स्वास्थ्य उपकरणहरू। फोटो: यथार्थ खबर अनुसन्धान टोली',
    authorName: 'विकास खत्री',
    authorRole: 'मल्टीमीडिया तथा खोजी प्रमुख',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: '२०८३ साउन २२, बिहीबार',
    publishedAtIso: '2026-08-06T08:30:00Z',
    readTimeMinutes: 6,
    viewsCount: 22100,
    isBreaking: false,
    isFeatured: true,
    location: 'काठमाडौँ',
    province: 'बागमती प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 780, respect: 450, sad: 190, informative: 890 },
    comments: [
      {
        id: 'cp4-1',
        authorName: 'डा. दिलिप ढकाल',
        content: 'सत्य विषय उठान गर्नुभएको छ। स्वास्थ्य क्षेत्रको सुधारका लागि यो प्रश्नको उत्तर मन्त्रालयले दिनैपर्छ।',
        createdAt: '४० मिनेट अघि',
        likes: 52,
      }
    ],
    aiAuditReport: {
      aiGeneratedProbability: 2,
      authenticityScore: 98,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 99,
      keyHighlights: ['५० करोडका उपकरण ८ सरकारी अस्पतालमा थन्किए', 'निजी डाइग्नोस्टिकसँग सेटिङको आशंका', 'स्वास्थ्य मन्त्रालयसँग सोझो प्रश्न'],
      grammarSuggestions: [],
      suggestedTags: ['खोजीहाम्रो', 'स्वास्थ्य', 'अस्पताल', 'एमआरआई'],
      sentiment: 'NEUTRAL',
      reviewedAt: '२०८३ साउन २२, ०८:३५ AM',
    }
  },
  {
    id: 'art-101',
    title: 'संसदको बजेट अधिवेशन आह्वान, देशको आर्थिक पुनरुत्थान र राजस्व सुधार प्राथमिकतामा',
    slug: 'parliament-budget-session-called',
    category: 'राजनीति',
    subCategory: 'संसदीय मामिला',
    summary: 'राष्ट्रपतिद्वारा संसदको आगामी बजेट अधिवेशन बोलाइएको छ। सरकारले आगामी आर्थिक वर्षका लागि दिगो विकास, आन्तरिक उत्पादन वृद्धि र राजस्व चुहावट नियन्त्रणलाई प्राथमिकता दिने स्पष्ट पारेको छ।',
    content: `काठमाडौँ — राष्ट्रपति कार्यालयले व्यवस्थापिका संसदको बजेट अधिवेशन आगामी हप्ताका लागि आह्वान गरेको छ। अर्थमन्त्रालयले चालु आर्थिक वर्षको समीक्षा गर्दै आगामी बजेटमा आन्तरिक उत्पादन बढाउने र रोजगारी सिर्जना गर्ने आयोजनालाई प्राथमिकता दिइने जनाएको छ।

प्रतिनिधिसभाका सभामुखले संसद सञ्चालन सम्बन्धी तयारी चुस्त बनाइएको बताउँदै सबै दलहरूसँग समन्वय गरी विधेयकहरू पारित गरिने प्रतिबद्धता व्यक्त गरे। अर्थमन्त्रीले विनियोजन विधेयकका सिद्धान्त र प्राथमिकता संसद समक्ष पेश गर्ने कार्यसूची तय भएको छ।

विशेषज्ञहरूका अनुसार नेपालको वर्तमान आर्थिक अवस्था सुधार्न वैदेशिक लगानी आकर्षित गर्ने र आन्तरिक उद्योगहरूलाई सहुलियत दरमा कर्जा उपलब्ध गराउने नीति बजेटमा समेटिनुपर्ने सुझाव छ।`,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'व्यवस्थापिका संसद भवन नयाँ बानेश्वरमा अधिवेशन तयारीको दृश्य। फोटो: यथार्थ खबर',
    authorName: 'आशा थापा',
    authorRole: 'वरिष्ठ संवाददाता',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: '२०८३ साउन २२, बिहीबार',
    publishedAtIso: '2026-08-06T10:30:00Z',
    readTimeMinutes: 4,
    viewsCount: 14250,
    isBreaking: true,
    isFeatured: true,
    location: 'काठमाडौँ',
    province: 'बागमती प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 342, respect: 120, sad: 12, informative: 289 },
    comments: [
      {
        id: 'c-1',
        authorName: 'दीपक केसी',
        content: 'संसदमा देशको वास्तविक आर्थिक समस्या र युवा पलायन रोक्ने ठोस नीति आउनुपर्छ।',
        createdAt: '१० मिनेट अघि',
        likes: 18,
      },
      {
        id: 'c-2',
        authorName: 'मनिषा बराल',
        content: 'बजेट भाषण समयमै सकिएर विकास निर्माणका कामहरूमा पारदर्शिता कायम होस्।',
        createdAt: '२५ मिनेट अघि',
        likes: 9,
      }
    ],
    aiAuditReport: {
      aiGeneratedProbability: 4,
      authenticityScore: 98,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 99,
      keyHighlights: ['राष्ट्रपतिद्वारा बजेट अधिवेशन आह्वान', 'आन्तरिक उत्पादन र राजस्व सुधार मुख्य एजेन्डा', 'संसद भवन तयारी सम्पन्न'],
      grammarSuggestions: [],
      suggestedTags: ['राजनीति', 'संसद', 'बजेट', 'अर्थमन्त्री'],
      sentiment: 'NEUTRAL',
      reviewedAt: '२०८३ साउन २२, १०:३५ AM',
    }
  },
  {
    id: 'art-102',
    title: 'नेप्से परिसूचक ४५ अंकले बढेर २८०० को विन्दु नजिक, सेयर बजारमा लगानीकर्ताको उत्साह',
    slug: 'nepse-index-rises-45-points',
    category: 'अर्थतन्त्र',
    subCategory: 'सेयर बजार',
    summary: 'धितोपत्र बोर्डको नयाँ नीति र बैंकहरूको ब्याजदर घट्दो क्रममा रहेपछि सेयर बजारमा हरियाली छाएको छ। आज कुल ८ अर्बभन्दा बढीको कारोबार भएको छ।',
    content: `काठमाडौँ — नेपाल स्टक एक्सचेन्ज (नेप्से) परिसूचक साताको चौथो दिन ४५.२ अंकले बढेर २,७९५.६० को विन्दुमा पुगेको छ। आज कारोबारमा आएका २३० भन्दा बढी कम्पनीको सेयर मूल्य उकालो लागेको छ।

बैंकिङ, जलविद्युत् र बीमा समूहका सेयरमा उच्च आकर्षण देखिएको छ। राष्ट्र बैंकले मौद्रिक नीतिको समीक्षा मार्फत नीतिगत दरमा लचिलोपन देखाएपछि लगानीकर्ताहरूको मनोबल उच्च भएको नेपाल सेयर लगानीकर्ता संघका प्रतिनिधिहरूले बताएका छन्।

आज सबैभन्दा बढी कारोबार हुनेमा माथिल्लो तामाकोशी र शिवम् सिमेन्ट अग्रस्थानमा रहे। विश्लेषकहरूका अनुसार सूचीकृत कम्पनीहरूको चौथो त्रैमासिक वित्तीय विवरण सकारात्मक आउनाले पनि सेयर बजारमा उत्साह छाएको हो।`,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'नेप्सेको कारोबार कक्ष र सेयर सूचक बोर्ड।',
    authorName: 'रमेश पौडेल',
    authorRole: 'कार्यकारी सम्पादक',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: '२०८३ साउन २२, बिहीबार',
    publishedAtIso: '2026-08-06T11:15:00Z',
    readTimeMinutes: 3,
    viewsCount: 18900,
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    location: 'काठमाडौँ',
    province: 'बागमती प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 512, respect: 88, sad: 4, informative: 410 },
    comments: [
      {
        id: 'c-3',
        authorName: 'सुरेश खड्का',
        content: 'ब्याजदर घटेसँगै सेयर बजारमा थप सुधार आउने संकेत देखिएको छ।',
        createdAt: '५ मिनेट अघि',
        likes: 24,
      }
    ],
    aiAuditReport: {
      aiGeneratedProbability: 2,
      authenticityScore: 99,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 98,
      keyHighlights: ['नेप्से ४५.२ अंकले वृद्धि', '८ अर्बको कारोबार', 'बैंक ब्याजदर घट्नु मुख्य कारण'],
      grammarSuggestions: [],
      suggestedTags: ['नेप्से', 'सेयर बजार', 'अर्थतन्त्र', 'बैंक'],
      sentiment: 'POSITIVE',
      reviewedAt: '२०८३ साउन २२, ११:२० AM',
    }
  },
  {
    id: 'art-103',
    title: 'पोखरामा अन्तर्राष्ट्रिय डिजिटल पर्यटन सम्मेलन सुरु, प्रविधिले मोड्दैछ पर्यटनको भविष्य',
    slug: 'pokhara-digital-tourism-conference',
    category: 'प्रविधि',
    subCategory: 'डिजिटल रुपान्तरण',
    summary: 'नेपाललाई दक्षिण एसियाको प्रमुख डिजिटल नोमाड हब बनाउने लक्ष्यका साथ पोखरामा ३ दिने सम्मेलन सञ्चालन भइरहेको छ। १५ देशका ३०० भन्दा बढी विज्ञ सहभागी।',
    content: `पोखरा — गण्डकी प्रदेशको पर्यटकीय राजधानी पोखरामा अन्तर्राष्ट्रिय डिजिटल पर्यटन सम्मेलन २०८३ सुरु भएको छ। सम्मेलनमा एआई, ब्लकचेन र डिजिटल भुक्तानी प्रणालीलाई नेपालको पर्यटन प्रवर्द्धनसँग जोड्ने विषयमा बृहत् छलफल भइरहेको छ।

गण्डकी प्रदेशका मुख्यमन्त्रीले सम्मेलनको उद्घाटन गर्दै विदेशी पर्यटकहरूका लागि सहज अनलाइन भिसा, क्युआर भुक्तानी र डिजिटल गाइड एप्स तयार पारिएको जानकारी दिए।

विश्वभरबाट आएका डिजिटल नोमाड्स र प्रविधि उद्यमीहरूले पोखराको प्राकृतिक सौन्दर्य र तीव्र गतिको इन्टरनेट सुविधाले यसलाई रिमोट वर्कका लागि उत्कृष्ट गन्तव्य बनाएको बताएका छन्।`,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'फेवाताल र अन्नपूर्ण हिमश्रृंखलाको मनमोहक दृश्यसँगै पोखरा शहर।',
    authorName: 'विकास खत्री',
    authorRole: 'प्रविधि सम्पादक',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    publishedAtBikramSambat: '२०८३ साउन २१, बुधबार',
    publishedAtIso: '2026-08-05T14:20:00Z',
    readTimeMinutes: 4,
    viewsCount: 9400,
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    location: 'पोखरा',
    province: 'गण्डकी प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 420, respect: 195, sad: 1, informative: 310 },
    comments: [],
    aiAuditReport: {
      aiGeneratedProbability: 5,
      authenticityScore: 97,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 96,
      keyHighlights: ['पोखरामा डिजिटल पर्यटन सम्मेलन', '१५ देशका विज्ञ सहभागी', 'डिजिटल नोमाड हब बनाउने लक्ष्य'],
      grammarSuggestions: [],
      suggestedTags: ['पोखरा', 'पर्यटन', 'प्रविधि', 'गण्डकी प्रदेश'],
      sentiment: 'POSITIVE',
      reviewedAt: '२०८३ साउन २१, ०२:३० PM',
    }
  },
  {
    id: 'art-104',
    title: 'नेपाली राष्ट्रिय क्रिकेट टोलीद्वारा त्रिदेशीय टी-२० सिरिजको फाइनल यात्रा तय',
    slug: 'nepal-cricket-team-reaches-tri-series-final',
    category: 'खेलकुद',
    subCategory: 'क्रिकेट',
    summary: 'टियु क्रिकेट मैदान कीर्तिपुरमा भएको रोमाञ्चक खेलमा नेपालले युएईलाई ६ विकेटले पराजित गर्दै फाइनलमा स्थान पक्का गरेको हो। कुशल भुर्तेलको शानदार अर्धशतक।',
    content: `काठमाडौँ — कीर्तिपुरस्थित त्रिवि क्रिकेट मैदानमा हजारौँ समर्थकका बीच नेपालले त्रिदेशीय टी-२० अन्तर्राष्ट्रिय सिरिजको रोमाञ्चक खेलमा युएईलाई पराजित गरेको छ।

युएईले प्रस्तुत गरेको १६५ रनको लक्ष्य नेपालले १८.४ ओभरमा मात्र ४ विकेट गुमाएर पूरा गर्‍यो। नेपालका ओपनर कुशल भुर्तेलले ४२ बलमा ६८ रनको आक्रामक पारी खेले भने कप्तान रोहित पौडेलले अविजित ३५ रन जोडे।

बलिङतर्फ करण केसी र सोमपाल कामीले समान २-२ विकेट लिएका थिए। नेपालले अब आगामी शनिबार हुने फाइनल खेलमा हङकङको सामना गर्नेछ।`,
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'टियु क्रिकेट मैदान कीर्तिपुरमा नेपाली समर्थकहरूको भीड।',
    authorName: 'सुमन खनाल',
    authorRole: 'खेलकुद संवाददाता',
    publishedAtBikramSambat: '२०८३ साउन २१, बुधबार',
    publishedAtIso: '2026-08-05T18:00:00Z',
    readTimeMinutes: 3,
    viewsCount: 24500,
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    location: 'कीर्तिपुर, काठमाडौँ',
    province: 'बागमती प्रदेश',
    status: 'PUBLISHED',
    reactions: { likes: 1250, respect: 420, sad: 2, informative: 150 },
    comments: [
      {
        id: 'c-4',
        authorName: 'प्रशान्त अधिकारी',
        content: 'जय नेपाल! नेपाली क्रिकेट टोलीलाई फाइनलको लागि धेरै धेरै शुभकामना।',
        createdAt: '१ घण्टा अघि',
        likes: 45
      }
    ],
    aiAuditReport: {
      aiGeneratedProbability: 3,
      authenticityScore: 99,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 98,
      keyHighlights: ['नेपाल final मा प्रवेश', 'कुशल भुर्तेलको ६८ रन', 'शनिबार final खेल'],
      grammarSuggestions: [],
      suggestedTags: ['क्रिकेट', 'नेपाली खेलकुद', 'कीर्तिपुर', 'नेपाल'],
      sentiment: 'POSITIVE',
      reviewedAt: '२०८३ साउन २१, ०६:१५ PM'
    }
  },
  {
    id: 'art-105',
    title: 'नागरिक समाचार: मुस्ताङको मुक्तिनाथ सडकखण्डमा बाढीपछि यातायात सञ्चालनमा सास्ती',
    slug: 'citizen-news-mustang-road-blocked',
    category: 'समाज',
    subCategory: 'नागरिक रिपोर्टिङ',
    summary: 'अविरल वर्षाका कारण मुस्ताङ जोड्ने कागबेनी-मुक्तिनाथ सडकखण्डमा लेदो माटो र बाढी आउँदा तीर्थयात्री तथा स्थानीय बासिन्दा समस्यामा परेका छन्। स्थानीय प्रशासनद्वारा पन्छाउने काम जारी।',
    content: `मुस्ताङ — जोमसोमबाट मुक्तिनाथ जाने मुख्य सडकखण्ड अन्तर्गत कागबेनी नजिकैको खोलामा भीषण बाढी आउँदा सडक अवरुद्ध भएको छ।

नागरिक रिपोर्टर केशव गुरुङले पठाएको प्रत्यक्ष विवरण अनुसार आज बिहानैदेखि सयौँ सवारी साधन र मुक्तिनाथ दर्शनका लागि आएका तीर्थयात्रीहरू बीच बाटोमै रोकिएका छन्।

स्थानीय प्रशासन, नेपाली सेना र सशस्त्र प्रहरी बलको टोली डोजर लिएर पहिरो र लेदो सफा गर्न खटिएको छ। सुरक्षा निकायले बाटो खुलाउन ३-४ घण्टा लाग्ने अनुमान गरेको छ।`,
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'हिमाली क्षेत्र मुस्ताङको भौगोलिक दृश्य। फोटो: केशव गुरुङ (नागरिक रिपोर्टर)',
    authorName: 'केशव गुरुङ (नागरिक रिपोर्टर)',
    authorRole: 'प्रमाणित नागरिक रिपोर्टर',
    publishedAtBikramSambat: '२०८३ साउन २२, बिहीबार',
    publishedAtIso: '2026-08-06T08:10:00Z',
    readTimeMinutes: 2,
    viewsCount: 7800,
    isBreaking: false,
    isFeatured: false,
    location: 'मुस्ताङ',
    province: 'गण्डकी प्रदेश',
    status: 'PUBLISHED',
    submittedByCitizen: true,
    reporterPhone: '+977-9846712345',
    reactions: { likes: 110, respect: 45, sad: 95, informative: 230 },
    comments: [],
    aiAuditReport: {
      aiGeneratedProbability: 6,
      authenticityScore: 94,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 95,
      keyHighlights: ['मुक्तिनाथ सडक अवरुद्ध', 'कागबेनी नजिकै बाढी', 'नागरिक रिपोर्टरबाट प्राप्त समाचार'],
      grammarSuggestions: [],
      suggestedTags: ['मुस्ताङ', 'मुक्तिनाथ', 'बाढी', 'नागरिक रिपोर्टिङ'],
      sentiment: 'CRITICAL',
      reviewedAt: '२०८३ साउन २२, ०८:४५ AM'
    }
  },
  {
    id: 'art-106',
    title: 'विचार: नेपालमा सूचना प्रविधि र एआई क्रान्ति — समृद्धिको नयाँ ढोका',
    slug: 'opinion-ai-and-it-revolution-in-nepal',
    category: 'विचार/ब्लग',
    subCategory: 'विश्लेषण',
    summary: 'सूचना प्रविधिको विकाससँगै नेपालका युवाहरूले विश्वव्यापी सेवा प्रवाह गरिरहेका छन्। सरकारी नीति तथा पूर्वाधारमा सुधार ल्याउन सके प्रविधि नेपालको प्रमुख आयस्रोत बन्न सक्छ।',
    content: `नेपालमा पछिल्लो समय प्रविधि क्षेत्रमा आएको उछाल केवल एउटा भ्रामक लहर मात्र होइन, यो एक दिगो आर्थिक रुपान्तरणको जग हो। वार्षिक अर्बौँ रुपैयाँको सफ्टवेयर निर्यात गरिरहेका नेपाली युवाहरूले आर्टिफिसियल इन्टेलिजेन्स (AI), डाटा साइन्स र क्लाउड कम्प्युटिङमा विश्वस्तरीय क्षमता प्रदर्शन गरिरहेका छन्।

तर यसका लागि राज्यले विश्वविद्यालय स्तरमै व्यावहारिक एआई शिक्षा, उच्च गतिको ब्रोडब्यान्ड इन्टरनेट र स्टार्टअपहरूलाई कर छुटको सुविधा दिनुपर्छ।`,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'प्रविधि र डाटा एनालिटिक्स सम्बन्धी प्रतीकात्मक चित्र।',
    authorName: 'डा. डाक्टर गोविन्द भट्टराई',
    authorRole: 'प्रविधि विश्लेषक तथा प्राध्यापक',
    publishedAtBikramSambat: '२०८३ साउन २०, मंगलबार',
    publishedAtIso: '2026-08-04T10:00:00Z',
    readTimeMinutes: 5,
    viewsCount: 11200,
    isBreaking: false,
    isFeatured: false,
    status: 'PUBLISHED',
    reactions: { likes: 380, respect: 210, sad: 0, informative: 450 },
    comments: [],
    aiAuditReport: {
      aiGeneratedProbability: 1,
      authenticityScore: 99,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 99,
      keyHighlights: ['नेपालमा IT र AI को सम्भावना', 'युवा उद्यमीहरूलाई प्रवर्द्धन गर्ने नीति आवश्यक'],
      grammarSuggestions: [],
      suggestedTags: ['विचार', 'प्रविधि', 'एआई', 'नेपाल'],
      sentiment: 'POSITIVE',
      reviewedAt: '२०८३ साउन २०, ११:०० AM'
    }
  },
  {
    id: 'art-107',
    title: 'विश्व समाचार: संयुक्त राष्ट्रसंघ द्वारा विश्वव्यापी जलवायु संकट सम्बन्धी आपतकालीन चेतावनी जारी',
    slug: 'world-news-un-climate-crisis-warning',
    category: 'विश्व',
    subCategory: 'जलवायु परिवर्तन',
    summary: 'विश्वभर बढ्दो तापमान र चरम मौसमका घटनाहरूका कारण संयुक्त राष्ट्रसंघले सबै राष्ट्रहरूलाई शून्य कार्बन उत्सर्जन लक्ष्य छिटो हासिल गर्न आह्वान गरेको छ।',
    content: `न्यूयोर्क — संयुक्त राष्ट्रसंघका महासचिवले जेनेभामा आयोजित विश्व पर्यावरण शिखर सम्मेलनमा बोल्दै पृथ्वीको तापमान कीर्तिमानी विन्दुमा पुगेको प्रति गम्भीर चिन्ता व्यक्त गरेका छन्।

ग्लोबल वार्मिङका कारण हिमाली क्षेत्रका हिमतालहरू पग्लिने क्रम तीव्र बनेको र नेपाल जस्ता साना विकासोन्मुख देशहरू प्रत्यक्ष जोखिममा परेको प्रति सम्मेलनमा जोड दिइयो।`,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'जलवायु परिवर्तनका कारण प्रभावित हिउँद र हिमाल।',
    authorName: 'यथार्थ खबर विदेश डेस्क',
    authorRole: 'अन्तर्राष्ट्रिय समाचार',
    publishedAtBikramSambat: '२०८३ साउन २१, बुधबार',
    publishedAtIso: '2026-08-05T09:15:00Z',
    readTimeMinutes: 3,
    viewsCount: 6500,
    isBreaking: false,
    isFeatured: false,
    status: 'PUBLISHED',
    reactions: { likes: 95, respect: 60, sad: 140, informative: 180 },
    comments: [],
    aiAuditReport: {
      aiGeneratedProbability: 2,
      authenticityScore: 98,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 97,
      keyHighlights: ['UN जलवायु चेतावनी', 'नेपाल लगायत हिमाली राष्ट्र उच्च जोखिममा'],
      grammarSuggestions: [],
      suggestedTags: ['विश्व', 'संयुक्त राष्ट्रसंघ', 'जलवायु'],
      sentiment: 'CRITICAL',
      reviewedAt: '२०८३ साउन २१, १०:०० AM'
    }
  },
  {
    id: 'art-108',
    title: 'मनोरञ्जन: नयाँ नेपाली फिल्म ‘गाउँको कथा’ को टिजर सार्वजनिक, दर्शकको उत्कृष्ट प्रतिक्रिया',
    slug: 'entertainment-nepali-movie-gaunko-katha-teaser',
    category: 'मनोरञ्जन',
    subCategory: 'चलचित्र',
    summary: 'नेपालका ग्रामीण भेगको मौलिक जनजीवन, दुःख र आत्मीयता दर्शाउने बहुप्रतिक्षित फिल्मको टिजरले युट्युबमा भाइरल भई ट्रेन्डिङ #१ हासिल गरेको छ।',
    content: `काठमाडौँ — राष्ट्रिय पुरस्कार विजेता निर्देशकको नयाँ नेपाली कथानक चलचित्र ‘गाउँको कथा’ को औपचारिक टिजर मंगलबार सार्वजनिक गरिएको छ।

फिल्ममा नेपाली समाजको यथार्थपरक चित्रण र मौलिक संगीतको प्रयोग गरिएको छ। आगामी भदौ महिनामा देशव्यापी प्रदर्शनमा आउने तयारीमा रहेको यो चलचित्रलाई विदेशका विभिन्न शहरहरूमा पनि भव्य प्रदर्शन गरिने निर्माण पक्षले जनाएको छ।`,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    imageCaption: 'चलचित्र ‘गाउँको कथा’ को विशेष पोस्टर र सिनेमा हल दृश्य।',
    authorName: 'निर्मला देवकोटा',
    authorRole: 'कला तथा मनोरञ्जन संवाददाता',
    publishedAtBikramSambat: '२०८३ साउन २०, मंगलबार',
    publishedAtIso: '2026-08-04T16:40:00Z',
    readTimeMinutes: 2,
    viewsCount: 15400,
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    status: 'PUBLISHED',
    reactions: { likes: 620, respect: 110, sad: 2, informative: 80 },
    comments: [],
    aiAuditReport: {
      aiGeneratedProbability: 4,
      authenticityScore: 96,
      factCheckStatus: 'VERIFIED',
      contentSafety: 'SAFE',
      imageAuthenticityScore: 97,
      keyHighlights: ['‘गाउँको कथा’ फिल्म टिजर सार्वजनिक', 'युट्युबमा ट्रेन्डिङ १'],
      grammarSuggestions: [],
      suggestedTags: ['मनोरञ्जन', 'नेपाली फिल्म', 'सिनेमा'],
      sentiment: 'POSITIVE',
      reviewedAt: '२०८३ साउन २०, ०५:०० PM'
    }
  }
];

export const INITIAL_CITIZEN_REPORTERS: CitizenReporter[] = [
  {
    id: 'cr-001',
    fullName: 'केशव गुरुङ',
    phone: '+977-9846712345',
    isVerifiedPhone: true,
    idDocumentType: 'CITIZENSHIP',
    idDocumentNumber: '44-01-78-01294',
    idDocumentUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop',
    address: 'कागबेनी-४, मुस्ताङ',
    status: 'VERIFIED',
    registeredAt: '२०८३ असार १५',
    articlesSubmittedCount: 3
  },
  {
    id: 'cr-002',
    fullName: 'सुनिता लम्साल',
    phone: '+977-9801234567',
    isVerifiedPhone: true,
    idDocumentType: 'PRESS_CARD',
    idDocumentNumber: 'PC-9012',
    idDocumentUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    address: 'विराटनगर-८, मोरङ',
    status: 'VERIFIED',
    registeredAt: '२०८३ साउन ०१',
    articlesSubmittedCount: 1
  }
];
