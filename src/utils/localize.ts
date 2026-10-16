// Bilingual Localization Helpers for Real Estate Terminology, Amenities & Specs

export function localizePropertyType(type: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return type;
  const map: Record<string, string> = {
    'Villa': 'فيلا فاخرة',
    'Palatial Mansion': 'قصر فاخر',
    'Penthouse': 'بنتهاوس فاخر',
    'Waterfront Residence': 'مسكن على الواجهة البحرية',
    'Sky Villa': 'سكاي فيلا',
    'Duplex': 'دوبلكس فاخر',
    'Townhouse': 'تاون هاوس',
    'Luxury Villa': 'فيلا فاخرة',
    'All Categories': 'كافة التصنيفات',
    'All Types': 'كافة الأنواع',
  };
  return map[type] || type;
}

export function localizeFurnishing(furnishing: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return furnishing;
  const map: Record<string, string> = {
    'Furnished': 'مفروش بالكامل بأرقى الماركات',
    'Semi-Furnished': 'نصف مفروش',
    'Unfurnished': 'غير مفروش',
  };
  return map[furnishing] || furnishing;
}

export function localizeListingType(type: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') {
    if (type === 'buy') return 'Buy';
    if (type === 'rent') return 'Rent';
    if (type === 'new_development') return 'New Development';
    return type;
  }
  const map: Record<string, string> = {
    'buy': 'شراء حر حصري',
    'rent': 'إيجار سنوي فاخر',
    'new_development': 'مشروع قيد التطوير',
  };
  return map[type] || type;
}

export function localizeStatus(status: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return status;
  const map: Record<string, string> = {
    'Under Construction': 'قيد الإنشاء والتطوير',
    'Off-Plan': 'على المخطط — إطلاق حصري',
    'Ready to Move': 'جاهز للسكن الفوري',
    'Nearing Handover': 'قريب من مرحلة التسليم',
  };
  return map[status] || status;
}

export function localizeAreaName(area: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return area;
  const map: Record<string, string> = {
    'The Pearl-Qatar': 'جزيرة اللؤلؤة قطر',
    'The Pearl': 'اللؤلؤة قطر',
    'Lusail City': 'مدينة لوسيل',
    'Lusail': 'لوسيل',
    'West Bay': 'الدفنة / الخليج الغربي',
    'West Bay Lagoon': 'خليج لاغون الغربي',
    'Msheireb Downtown': 'مشيرب قلب الدوحة',
    'Msheireb': 'مشيرب',
    'Al Waab': 'منطقة الوعب الملكية',
    'Katara Hills': 'تلال كتارا',
    'Katara': 'كتارا',
    'All Areas': 'جميع المناطق',
    'All Locations': 'كافة الوجهات',
    'All Enclaves': 'كافة المناطق',
  };
  return map[area] || area;
}

export function localizeAmenity(amenity: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return amenity;
  const map: Record<string, string> = {
    'Private Sand Beach': 'شاطئ رملي خاص ومباشر',
    'Yacht Slipway & Marina Berth': 'منزلق ومربط خاص لليخوت الفارهة',
    'Private Yacht Berths': 'مرسى يخوت خاص',
    'Indoor & Outdoor Heated Pools': 'مسابح مدفأة داخلية وخارجية',
    'Cantilevered Sky Pool': 'مسبح سماوي معلق وإطلالة بانورامية',
    'Infinity Edge Ocean Pool': 'مسبح إنفينيتي مطل على البحر',
    'Subterranean 8-Car Garage': 'موقف سيارات تحت الأرض يتسع لـ 8 سيارات',
    'Subterranean 6-Car Garage': 'موقف تحت الأرض لـ 6 سيارات',
    'Private Cinema Room': 'قاعة سينما خاصة مجهزة بأحدث التقنيات',
    'Private Cinema Suite': 'سينما VIP خاصة',
    'Turkish Hammam & Spa': 'حمام تركي وسبا صحي متكامل',
    'Bespoke Wellness Spa': 'سبا ومركز استرخاء فاخر',
    'Smart Home Automation': 'نظام تحكم وأتمتة منزلية ذكية شامل',
    'Staff Quarters (4 Maid & Driver Rooms)': 'أجنحة خاصة للضيافة والسائقين والمساعدين',
    'Staff Quarters': 'أجنحة خاصة للخدم والسائقين',
    'Caviar & Cigar Lounge': 'صالة كافيار وسيجار فاخرة',
    '24/7 Butler & Valet': 'خدمة المساعد الشخصي وصف السيارات 24/7',
    '24/7 Diplomatic Security & Concierge': 'حراسة دبلوماسية وخدمة كونسيرج 24/7',
    'Direct Marina Access': 'مدخل مباشر إلى مرسى اليخوت',
    'Private Elevator': 'مصعد بانورامي خاص بالمسكن',
    'Rooftop Helipad Access': 'مهبط طائرات هليكوبتر على السطح',
    'Private Rooftop Jacuzzi': 'جاكوزي خاص على التراس العلوي',
    'Wine Cellar & Tasting Room': 'غرفة تذوق وتخزين مبردة',
    'Private Gym & Yoga Studio': 'صالة لياقة بدنية واستوديو يوغا خاص',
    'Landscaped Italian Gardens': 'حدائق غناء مصممة بالطراز الإيطالي',
    'Private Boat Mooring': 'رصيف خاص لرسو القوارب',
    'Private Tennis Court': 'ملعب تنس خاص',
  };
  return map[amenity] || amenity;
}

export function localizeFeature(feature: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return feature;
  const map: Record<string, string> = {
    'Private Beach Frontage': 'واجهة بحرية خاصة',
    'Marina Superyacht Mooring': 'رصيف لليخوت الفاخرة',
    'Dual Olympic Swimming Pools': 'مسابح أولمبية مزدوجة',
    'Full Home Automation System': 'نظام أتمتة وتحكم ذكي بالكامل',
    'Subterranean Parking Facility': 'مواقف سيارات فسيحة تحت الأرض',
    'Curvilinear Low-E Thermal Glazing': 'واجهات زجاجية منحنية عازلة للحرارة',
    'Triple-Height Grand Marble Atrium': 'بهو استقبال مهيب بارتفاع ثلاثة طوابق من الرخام',
    'Direct Marina Promenade Access': 'وصول مباشر إلى ممشى المارينا',
    'Parametric Kinetic Shading Screens': 'أنظمة تظليل حركية ذكية ومستدامة',
    'Subterranean Valet & Detail Garage': 'خدمة استقبال وغسيل سيارات خاصة',
    'LEED Platinum Certified': 'شهادة الريادة البلاتينية في التصميم البيئي (LEED Platinum)',
    'Smart District Cooling': 'تبريد مناطقي ذكي عالي الكفاءة',
    'Floor-to-ceiling soundproof acoustic triple glazing': 'زجاج ثلاثي عازل للصوت ممتد من الأرض حتى السقف',
    'Integrated Poliform Italian kitchens & Gaggenau appliances': 'مطابخ بوليفورم إيطالية مجهزة بأجهزة غاغيناو الفاخرة',
    'Private elevator foyer directly into each sky home': 'بهو مصعد خاص يؤدي مباشرة إلى كل مسكن سماوي',
    'LEED Gold sustainable certification': 'شهادة الاستدامة الذهبية المعتمدة (LEED Gold)',
    'Direct deep-water private navigational channel': 'قناة ملاحية خاصة ومباشرة للمياه العميقة',
    'Custom marble imported from Carrara, Italy': 'رخام كارارا إيطالي فاخر مستورد حسب الطلب',
    'Dual separate master wings with private security suites': 'جناحان رئيسيان منفصلان مع أجنحة حراسة خاصة',
    'Lush tropical landscape curation with infinity lagoon': 'حدائق استوائية مصممة وبحيرة إنفينيتي خاصة',
    'Platinum LEED environmental certification': 'شهادة الريادة البلاتينية في التصميم البيئي (LEED Platinum)',
    'Integrated solar thermal shading and smart air purification': 'أنظمة تظليل شمسية حرارية وتنقية هواء ذكية',
    'Solid oak carpentry and honed limestone finishes': 'أعمال نجارة خشب البلوط الصلب وحجر جيري مصقول',
    'Double-height formal receiving majlis with garden views': 'مجلس استقبال رسمي بارتفاع مضاعف وإطلالات على الحدائق',
    'Integrated Boffi Italian designer kitchen & wet prep kitchen': 'مطبخ بوفي إيطالي فاخر مع مطبخ تحضيري منفصل',
    'Private elevator spanning 3 levels including subterranean spa': 'مصعد خاص يربط 3 مستويات بما فيها السبا السفلي',
    'Zero-edge glass perimeter overlooking private saltwater lagoon': 'واجهات زجاجية منعدمة الحواف تطل على بحيرة خاصة',
    'Smart home biometric access and automated lighting scenes': 'دخول ذكي بالمؤشرات الحيوية وسيناريوهات إضاءة متطورة',
    'Solar energy integration delivering net-zero daytime energy': 'نظام طاقة شمسية يوفر استهلاكاً صفرياً خلال النهار',
    'Dedicated high-speed direct resident elevators': 'مصاعد فائقة السرعة مخصصة للملاك والقاطنين',
    'Floor-to-ceiling 3.8m acoustic panoramic curtain walling': 'واجهات زجاجية بانورامية عازلة بارتفاع 3.8 متر',
    'Subzero and Wolf gourmet commercial kitchen suite': 'أجهزة مطابخ فاخرة متكاملة من ساب زيرو وولف',
    'Unobstructed sunset views over the marina basin': 'إطلالات خلابة ومباشرة لغروب الشمس على حوض المارينا',
    'Large wrap-around entertaining terraces': 'شرفات وتراسات رحبة محيطة بالمسكن للضيافة والترفيه',
    'Crestron smart home automation for climate and lighting': 'نظام تحكم وأتمتة متطور للمناخ والإضاءة من كريسترون',
    'Imported Portuguese honed limestone facades': 'واجهات حجر جيري برتغالي مصقول عالي الجودة',
    'High ceilings (4.2m on ground level and 3.6m on upper levels)': 'أسقف شاهقة (4.2 م بالطابق الأرضي و3.6 م بالطوابق العلوية)',
    'Custom chandelier structural reinforcement and ambient recessed lighting': 'هياكل مدعمة للثريات الفاخرة وإضاءة مخفية محيطية',
    'Biophilic indoor-outdoor architecture with reflective koi pools': 'تصميم حيوي يدمج المساحات الداخلية بالخارجية مع برك كوي عاكسة',
    'Custom motorized minimalist sliding glass panels': 'ألواح زجاجية منزلقة آلية بتصميم عصري انسيابي',
    'Integrated Bulthaup kitchen and wine room': 'مطبخ بولثاوب متكامل وغرفة مخصصة لحفظ المقتنيات',
    'Handcrafted natural timber deck overlooking superyachts': 'تراس خشبي طبيعي مصنوع يدوياً مطل على اليخوت الفارهة',
    'Original artisanal plaster and natural brass ironmongery': 'طلاء حرفي فاخر وتشطيبات نحاسية طبيعية راقية',
    'Soundproofed acoustic windows ensuring harbor serenity': 'نوافذ عازلة للصوت تضمن الهدوء التام والسكينة',
  };
  return map[feature] || feature;
}

export function localizeUnitType(unitType: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return unitType;
  const map: Record<string, string> = {
    '3-Bedroom Marina Residence': 'مسكن 3 غرف نوم بإطلالة المارينا',
    '4-Bedroom Sky Duplex': 'سكاي دوبلكس فاخر 4 غرف نوم',
    'Full-Floor Crown Penthouse': 'بنتهاوس ملكي طابق كامل',
    'Royal Waterfront Estate': 'قصر ملكي على الواجهة البحرية',
    'Sovereign Island Palace': 'قصر سيادي جزيري حصري',
    '3-Bedroom Heritage Townhouse': 'تاون هاوس تراثي فاخر 3 غرف نوم',
    '4-Bedroom Courtyard Villa': 'فيلا 4 غرف نوم مع فناء أندلسي خاص',
    '5-Bedroom Hillside Villa': 'فيلا تلال بانورامية 5 غرف نوم',
    '7-Bedroom Royal Hill Palace': 'قصر تلال ملكي 7 غرف نوم',
    '4-Bedroom Lagoon Villa': 'فيلا لاغون شاطئية 4 غرف نوم',
    '5-Bedroom Solstice Island Villa': 'فيلا جزيرة سولستيس 5 غرف نوم',
    '3-Bedroom High-Floor Sky Residence': 'مسكن سماوي طابق علوي 3 غرف نوم',
    '2-Bedroom Marina View Apartment': 'شقة فاخرة غرفتي نوم بإطلالة المارينا',
    '3-Bedroom Duplex Loft': 'لوفت دوبلكس فسيح 3 غرف نوم',
    '6-Bedroom Neoclassical Palace': 'قصر كلاسيكي حديث 6 غرف نوم',
    '8-Bedroom Grand Sovereign Estate': 'قصر سيادي ملكي فاره 8 غرف نوم',
    '4-Bedroom Seaside Pavilion': 'بافيليون بحري فاخر 4 غرف نوم',
    '5-Bedroom Master Waterfront Residence': 'مسكن ماستر على الواجهة البحرية 5 غرف نوم',
    '2-Bedroom Maritime Loft': 'لوفت بحري فاخر غرفتي نوم',
    '3-Bedroom Duplex Marina House': 'منزل مارينا دوبلكس 3 غرف نوم',
  };
  return map[unitType] || unitType;
}

export function localizePostHandover(text: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return text;
  const map: Record<string, string> = {
    '3 Years Flexible Post-Handover': 'سداد مرن لمدة 3 سنوات بعد التسليم',
    '2 Years Post-Handover': 'سنتان بعد التسليم',
    'Key collection and title registration.': 'استلام المفاتيح وتسجيل صك الملكية.',
  };
  return map[text] || text;
}

export function localizeLandmark(landmark: string, lang: 'en' | 'ar'): string {
  if (lang === 'en') return landmark;
  const map: Record<string, string> = {
    'Porto Arabia Marina': 'مارينا بورتو أرابيا',
    'Qanat Quartier Canals': 'قنوات قناة كارتييه',
    'Medina Centrale': 'مدينا سنترال',
    'Isola Dana Islands': 'جزر إيسولا دانا',
    'Lusail Marina Promenade': 'ممشى مارينا لوسيل',
    'Al Maha Island': 'جزيرة المها الترفيهية',
    'Katara Towers': 'أبراج كتارا الأيقونية',
    'Lusail Boulevard': 'بوليفارد لوسيل التجاري',
    'West Bay Lagoon Private Beaches': 'شواطئ لاغون الخليج الغربي الخاصة',
    'Diplomatic Area': 'الحي الدبلوماسي',
    'Four Seasons Marina': 'مرسى الفورسيزونز',
    'Doha Corniche': 'كورنيش الدوحة',
    'Barahat Msheireb': 'براحة مشيرب',
    'Msheireb Museums': 'متاحف مشيرب',
    'Mandarin Oriental Square': 'ساحة ماندارين أورينتال',
    'Galleria Mall': 'غاليريا مول مشيرب',
    'Aspire Park': 'حديقة أسباير زون',
    'Khalifa International Stadium': 'استاد خليفة الدولي',
    'Villaggio': 'فيلاجيو مول',
    'Al Waab City': 'مدينة الوعب',
    'Katara Amphitheatre': 'مسرح كتارا المكشوف',
    'Katara Beach': 'شاطئ كتارا',
    'Hills Promenade': 'ممشى تلال كتارا',
    'Galeries Lafayette Doha': 'غاليري لافاييت الدوحة',
  };
  return map[landmark] || landmark;
}

export function localizeSpecificationValue(key: string, value: string | number, lang: 'en' | 'ar'): string {
  if (lang === 'en') return String(value);
  const strVal = String(value);

  if (key === 'cooling') {
    if (strVal.includes('District Cooling')) return 'تبريد مناطقي مركزي فائق الهدوء مع وحدات تحكم فردية';
    return strVal;
  }
  if (key === 'flooring') {
    if (strVal.includes('Calacatta') || strVal.includes('Marble')) return 'رخام كالاكاتا وستاتوريو إيطالي فاخر وبورسلين نخب أول';
    return strVal;
  }
  if (key === 'view') {
    if (strVal.includes('Arabian Gulf') || strVal.includes('Gulf')) return 'إطلالة بانورامية مفتوحة على الخليج العربي وأفق اللؤلؤة';
    if (strVal.includes('Marina')) return 'إطلالة مباشرة على مارينا اليخوت والقنوات المائية';
    if (strVal.includes('Skyline')) return 'إطلالة خلابة على أفق مدينة الدوحة الحديثة';
    return strVal;
  }
  if (key === 'parkingSpaces') {
    return `${value} مواقف سيارات خاصة`;
  }
  if (key === 'ceilingHeight') {
    return `${strVal.replace('meters', 'أمتار')}`;
  }
  return strVal;
}

