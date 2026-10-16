import { Area } from '../types';

export const areas: Area[] = [
  {
    id: 'area-pearl',
    slug: 'the-pearl',
    name: {
      en: 'The Pearl-Qatar',
      ar: 'جزيرة اللؤلؤة',
    },
    headline: {
      en: 'The Riviera of the Arabian Gulf',
      ar: 'ريفييرا الخليج العربي والجزيرة الأيقونية',
    },
    description: {
      en: 'An iconic man-made island spanning four million square meters, The Pearl-Qatar is renowned for its Mediterranean-style marinas, private beach villas in La Plage South, luxury towers in Porto Arabia, and Venetian canals in Qanat Quartier.',
      ar: 'جزيرة اصطناعية ساحرة تمتد على مساحة 4 ملايين متر مربع، تشتهر بمراسيها المتوسطية، وفللها الشاطئية في لا بلاج، وأبراجها الشاهقة في بورتو أرابيا، وقنواتها المائية الفينيسية في قناة كارتييه.',
    },
    lifestyle: {
      en: 'Private yacht berths, Michelin-starred waterfront restaurants, high-fashion boutiques, and pristine beach promenades.',
      ar: 'مراسٍ خاصة لليخوت، مطاعم فاخرة على الواجهة البحرية، متاجر لأرقى دور الأزياء العالمية، وممشى شاطئي خلاب.',
    },
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    ],
    propertiesCount: 16,
    popularTypes: ['Waterfront Residence', 'Penthouse', 'Villa', 'Duplex'],
    landmarks: ['Porto Arabia Marina', 'Qanat Quartier Canals', 'Medina Centrale', 'Isola Dana Islands'],
    coordinates: {
      lat: 25.3695,
      lng: 51.5513,
    },
  },
  {
    id: 'area-lusail',
    slug: 'lusail-city',
    name: {
      en: 'Lusail City',
      ar: 'مدينة لوسيل الحديثة',
    },
    headline: {
      en: 'The Sustainable City of the Future',
      ar: 'مدينة المستقبل الذكية والمستدامة',
    },
    description: {
      en: 'Lusail represents Qatar futuristic urban vision. Home to the iconic Lusail Marina, Fox Hills, Al Maha Island, and Lusail Boulevard, offering cutting-edge architectural marvels and world-class leisure destinations.',
      ar: 'تجسد لوسيل أحدث الرؤى الحضرية المستقبلية لدولة قطر، وتضم مارينا لوسيل الأيقونية، والفوكس هيلز، وجزيرة المها، وبوليفارد لوسيل بمرافقه العالمية.',
    },
    lifestyle: {
      en: 'State-of-the-art smart infrastructure, international concert arenas, waterfront esplanades, and championship golf clubs.',
      ar: 'بنية تحتية ذكية فائقة التطور، ممشى مارينا بحري استثنائي، نوادي غولف عالمية، ومطاعم وترفيه راقٍ في جزيرة المها.',
    },
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    ],
    propertiesCount: 14,
    popularTypes: ['Sky Villa', 'Penthouse', 'Palatial Mansion', 'Waterfront Residence'],
    landmarks: ['Lusail Marina Promenade', 'Al Maha Island', 'Katara Towers', 'Lusail Boulevard'],
    coordinates: {
      lat: 25.4167,
      lng: 51.5167,
    },
  },
  {
    id: 'area-westbay',
    slug: 'west-bay',
    name: {
      en: 'West Bay & West Bay Lagoon',
      ar: 'الخليج الغربي ولاغون',
    },
    headline: {
      en: 'The Diplomatic Heart & Private Lagoon Sanctuaries',
      ar: 'القلب الدبلوماسي وملاذات اللاغون الشاطئية الخاصة',
    },
    description: {
      en: 'Combining the dramatic skyline of West Bay diplomatic district with the ultra-private gated estates of West Bay Lagoon (Al Qutaifiya). Residents enjoy private beach access, lush parks, and serene coastal water channels.',
      ar: 'يجمع بين ناطحات سحاب الخليج الغربي الدبلوماسية وأرقى الفلل الشاطئية الخاصة في لاغون القطيفية، حيث الشواطئ الهادئة والحدائق الغناء المحاطة بالأمان والخصوصية المطلقة.',
    },
    lifestyle: {
      en: 'Gated security, direct boat mooring, five-star luxury hotel resorts, and close proximity to foreign embassies and corporate centers.',
      ar: 'بوابات أمنية خاصة، رسو مباشر للقوارب واليخوت، قرب من أرقى المنتجعات العالمية والسفارات والمراكز المالية.',
    },
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    ],
    propertiesCount: 10,
    popularTypes: ['Palatial Mansion', 'Villa', 'Penthouse'],
    landmarks: ['West Bay Lagoon Private Beaches', 'Diplomatic Area', 'Four Seasons Marina', 'Doha Corniche'],
    coordinates: {
      lat: 25.3217,
      lng: 51.5312,
    },
  },
  {
    id: 'area-msheireb',
    slug: 'msheireb-downtown',
    name: {
      en: 'Msheireb Downtown Doha',
      ar: 'مشيرب قلب الدوحة',
    },
    headline: {
      en: 'The Pinnacle of Sustainable Qatari Heritage',
      ar: 'قمة الاستدامة المعمارية والتراث القطري العصري',
    },
    description: {
      en: 'The world first fully sustainable downtown regeneration project. Msheireb merges traditional Qatari architectural proportion and shade with modern smart-home technology, luxury townhomes, and private courtyard mansions.',
      ar: 'أول مشروع مستدام بالكامل لتجديد وسط المدينة في العالم، يمزج روح العمارة القطرية بالهندسة الذكية الحديثة والمنازل ذات الأفنية الخاصة الهادئة.',
    },
    lifestyle: {
      en: 'Pedestrian-friendly shaded arcades, the Msheireb Tram, boutique design galleries, Barahat Msheireb, and cultural museums.',
      ar: 'ممرات مشاة مظللة، ترام مشيرب، ساحة البراحة الفاخرة، معارض تصميم فنية، ومطاعم استثنائية في قلب العاصمة.',
    },
    heroImage: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    propertiesCount: 6,
    popularTypes: ['Townhouse', 'Duplex', 'Penthouse'],
    landmarks: ['Barahat Msheireb', 'Msheireb Museums', 'Mandarin Oriental Square', 'Galleria Mall'],
    coordinates: {
      lat: 25.2867,
      lng: 51.5289,
    },
  },
  {
    id: 'area-alwaab',
    slug: 'al-waab',
    name: {
      en: 'Al Waab & Aspire Zone',
      ar: 'الوعب ومنطقة أسباير',
    },
    headline: {
      en: 'Prestigious Family Living & Expansive Compounds',
      ar: 'الملاذ العائلي الراقي والقصور الفسيحة',
    },
    description: {
      en: 'One of Doha most established and prestigious residential neighborhoods. Known for grand private palaces, VIP gated residential compounds, lush gardens, and international academies.',
      ar: 'من أرقى الأحياء السكنية وأكثرها عراقة في الدوحة، يتميز بالقصور المستقلة الفخمة، والمجمعات السكنية المغلقة ذات الحدائق الوارفة والهدوء التام.',
    },
    lifestyle: {
      en: 'Family estates, private pools, proximity to Aspire Park, Villaggio Mall, and leading international private schools.',
      ar: 'مساحات عائلية واسعة، مسابح وحدائق خاصة، قرب من حديقة أسباير وفلاجيو وأرقى المدارس الدولية.',
    },
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    propertiesCount: 8,
    popularTypes: ['Palatial Mansion', 'Villa', 'Townhouse'],
    landmarks: ['Aspire Park', 'Khalifa International Stadium', 'Villaggio', 'Al Waab City'],
    coordinates: {
      lat: 25.2608,
      lng: 51.4647,
    },
  },
  {
    id: 'area-katara',
    slug: 'katara-hills',
    name: {
      en: 'Katara Hills',
      ar: 'تلال كتارا السكنية',
    },
    headline: {
      en: 'Exclusive Hilltop Sanctuary Overlooking Cultural Heritage',
      ar: 'ملاذ جبلي استثنائي مطل على معالم كتارا الثقافية',
    },
    description: {
      en: 'Perched on rolling green elevations with sweeping panoramic views over Katara Cultural Village and the Arabian Gulf. An ultra-exclusive residential enclave offering privacy and bespoke architectural finishes.',
      ar: 'يتربع فوق المرتفعات الخضراء بإطلالات ساحرة ومفتوحة على قرية كتارا الثقافية ومياه الخليج العربي، ويقدم مستوى استثنائياً من العزلة والرفاهية.',
    },
    lifestyle: {
      en: 'Curated tranquility, cultural amphitheatres, fine art galleries, luxury wellness spas, and private buggy chauffeur service.',
      ar: 'سكينة مطلقة، مسارح كتارا المفتوحة، معارض فنية راقية، مراكز سبا وصحة متخصصة، وخدمات تنقل خاصة.',
    },
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    ],
    propertiesCount: 5,
    popularTypes: ['Palatial Mansion', 'Villa', 'Sky Villa'],
    landmarks: ['Katara Amphitheatre', 'Katara Beach', 'Hills Promenade', 'Galeries Lafayette Doha'],
    coordinates: {
      lat: 25.3585,
      lng: 51.5273,
    },
  },
];
