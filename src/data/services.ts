import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'service-acquisition',
    slug: 'property-acquisition',
    title: {
      en: 'Bespoke Property Acquisition',
      ar: 'الاستحواذ والشراء العقاري الحصري',
    },
    shortDescription: {
      en: 'Discreet sourcing and acquisition of prime residences, off-market estates, and private island parcels across Qatar.',
      ar: 'البحث السري والاستحواذ على أرقى المساكن والقصور والفلل الشاطئية في قطر وغير المعروضة في الأسواق العامة.',
    },
    fullDescription: {
      en: 'Our acquisition desk acts exclusively in the interests of discerning private buyers. We provide access to private off-market residences in The Pearl, West Bay Lagoon, and Lusail, conducting comprehensive structural diligence, legal title verification, and price negotiations.',
      ar: 'يعمل فريق الاستحواذ لدينا لصالح نخبة المشترين من المستثمرين وكبار الشخصيات. نوفر وصولاً حصرياً إلى عقارات خاصة غير معلنة في اللؤلؤة ولاغون ولوسيل، مع مراجعة قانونية وهندسية شاملة ومفاوضات سعرية تضمن أفضل عائد.',
    },
    benefits: {
      en: [
        'Exclusive access to non-public luxury listings',
        'Confidential buyer representation & NDA protocols',
        'Independent valuation and comparative market analysis',
        'Complete conveyancing and title deed registration support',
      ],
      ar: [
        'وصول حصري إلى قوائم العقارات الخاصة غير المعلنة',
        'تمثيل المشتري بسرية تامة وبروتوكولات حماية الخصوصية',
        'تقييم عقاري مستقل وتحليل مقارن لأسعار السوق',
        'إنهاء كافة إجراءات التسجيل ونقل الملكية بسلاسة',
      ],
    },
    iconName: 'KeyRound',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'service-selling',
    slug: 'private-property-selling',
    title: {
      en: 'Private Property Selling & Disposals',
      ar: 'بيع وتسويق العقارات والقصور الفاخرة',
    },
    shortDescription: {
      en: 'Targeted luxury marketing and confidential placement of trophy assets to qualified regional and international buyers.',
      ar: 'تسويق احترافي واستراتيجي موجه لنخبة المستثمرين الإقليميين والدوليين مع الحفاظ على أعلى درجات الخصوصية.',
    },
    fullDescription: {
      en: 'Selling a prestigious asset requires sophisticated curation. We produce cinema-grade videography, architectural editorials, and discrete private showings, exposing your estate directly to pre-vetted family offices and accredited private investors.',
      ar: 'يتطلب بيع العقارات الراقية أسلوباً استثنائياً. نقدم إنتاجاً بصرياً سينمائياً ومواد تحريرية معمارية متقنة، مع إتاحة المعاينات الخاصة لنخبة المشترين المؤهلين مالياً فقط.',
    },
    benefits: {
      en: [
        'Cinematic architectural production & bespoke lookbooks',
        'Direct distribution to our private high-net-worth network',
        'Tailored confidentiality tiers (Public, Semi-Private, Ghost Listing)',
        'Optimal price realization through strategic timing',
      ],
      ar: [
        'إنتاج سينمائي وكتيبات تعريفية مصممة خصيصاً للعقار',
        'عرض مباشر على شبكتنا الحصرية من كبار المستثمرين',
        'مستويات سرية مخصصة (تسويق عام، شبه خاص، تسويق غير معلن)',
        'تحقيق أعلى قيمة استثمارية ممكنة عبر التوقيت الاستراتيجي',
      ],
    },
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'service-residential-leasing',
    slug: 'residential-leasing',
    title: {
      en: 'Executive & Diplomatic Residential Leasing',
      ar: 'التأجير السكني التنفيذي والدبلوماسي',
    },
    shortDescription: {
      en: 'Curated long-term leases for palatial villas, full-floor penthouses, and branded hotel apartments.',
      ar: 'توفير عقود إيجار سنوية راقية للفلل الشاطئية الفسيحة وشقق البنتهاوس متكاملة الخدمات الدبلوماسية.',
    },
    fullDescription: {
      en: 'We connect corporate leadership, international diplomats, and royal delegations with bespoke residential residences across Doha and Lusail. Each property undergoes rigorous quality checks for privacy, security, and exceptional craftsmanship.',
      ar: 'نلبي متطلبات السفارات والشركات العالمية الكبرى في تأمين أفخم المقار السكنية للرؤساء التنفيذيين والدبلوماسيين في الدوحة ولوسيل، مع مراعاة كافة المعايير الأمنية والخدمية.',
    },
    benefits: {
      en: [
        'Fully furnished turnkey homes with luxury Italian/German interiors',
        'Dedicated 24/7 concierge & VIP maintenance dispatch',
        'Seamless diplomatic lease agreement drafting',
        'Flexible corporate settlement terms',
      ],
      ar: [
        'مساكن جاهزة ومفروشة بأفخم الماركات الإيطالية والألمانية',
        'خدمات كونسيرج وصيانة خاصة على مدار الساعة',
        'صياغة احترافية لعقود الإيجار الدبلوماسية والمؤسسية',
        'مرونة عالية في حلول الفوترة والدفع للشركات العالمية',
      ],
    },
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'service-commercial-leasing',
    slug: 'commercial-leasing',
    title: {
      en: 'Flagship Commercial & Retail Leasing',
      ar: 'تأجير المساحات التجارية والمقار الرئيسية',
    },
    shortDescription: {
      en: 'Strategic acquisition of luxury retail boutiques, corporate flagship headquarters, and private office towers.',
      ar: 'توفير أرقى المساحات التجارية لبوتيكات الموضة العالمية والمقار الإدارية للشركات الاستثمارية في لوسيل والخليج الغربي.',
    },
    fullDescription: {
      en: 'Securing trophy commercial real estate in Lusail Boulevard, Barahat Msheireb, and West Bay. We advise global brands and regional holding groups on prime footprint selection and long-term lease economics.',
      ar: 'نساعد كبرى المجموعات التجارية والعلامات الفاخرة في حجز مواقع استراتيجية متميزة في بوليفارد لوسيل وبراحة مشيرب وأبراج الخليج الغربي لتعزيز مكانتها التجارية.',
    },
    benefits: {
      en: [
        'Prime high-visibility boulevard and waterfront frontages',
        'LEED-Gold and LEED-Platinum certified green premises',
        'Comprehensive lease negotiation & tenant improvement allowances',
        'Detailed footfall and demographic catchment research',
      ],
      ar: [
        'مواقع حيوية وإطلالات بارزة على الواجهات المائية والشوارع التجارية',
        'مبانٍ ذكية حاصلة على شهادات الاستدامة العالمية (LEED)',
        'تفاوض استراتيجي حول بنود الإيجار وفترات السماح للتجهيز',
        'دراسات دقيقة لحركة الرواد والقوة الشرائية للمنطقة',
      ],
    },
    iconName: 'Landmark',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'service-property-management',
    slug: 'property-management',
    title: {
      en: 'Private Asset & Property Management',
      ar: 'إدارة الأملاك والأصول العقارية الخاصة',
    },
    shortDescription: {
      en: 'White-glove management for private mansions, high-end residential towers, and absentee-owner portfolios.',
      ar: 'إدارة شاملة ورفيعة المستوى للقصور والفلل الاستثمارية والمحافظ العقارية للعملاء المقيمين وخارج الدولة.',
    },
    fullDescription: {
      en: 'Our asset management division protects and enhances the capital value of your real estate holdings. From routine preventative maintenance and tenant relations to financial reporting and yield optimization, your estate is overseen with meticulous dedication.',
      ar: 'يعمل قطاع إدارة الأصول على صيانة وتعظيم القيمة الاستثمارية لممتلكاتك العقارية. من الصيانة الوقائية الفورية إلى إدارة الإيجارات والتقارير المالية الدورية، نعتني بأملاكك كأنها أملاكنا الخاصة.',
    },
    benefits: {
      en: [
        'Preventative maintenance by certified master technicians',
        'Tenant vetting, rent collection, and escrow accounting',
        'Transparent digital financial statements & asset dashboards',
        'Vacant property inspections, climate monitoring & housekeeping',
      ],
      ar: [
        'صيانة وقائية مستمرة عبر كوادر فنية متخصصة ومعتمدة',
        'تدقيق دقيق للمستأجرين وتحصيل الإيجارات وإدارة الحسابات',
        'تقارير مالية رقمية شفافة ومتابعة مستمرة للأداء الاستثماري',
        'فحص دوري للعقارات الشاغرة ومراقبة أنظمة التكييف والنظافة',
      ],
    },
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'service-investment',
    slug: 'real-estate-investment',
    title: {
      en: 'Real Estate Investment & Wealth Advisory',
      ar: 'الاستشارات والاستثمارات العقارية الاستراتيجية',
    },
    shortDescription: {
      en: 'Data-driven underwriting, portfolio diversification, and cross-border capital deployment in prime GCC markets.',
      ar: 'تحليلات بيانات معمقة واستراتيجيات توزيع الأصول لتعظيم العوائد الرأسمالية والتدفقات النقدية طويلة الأجل.',
    },
    fullDescription: {
      en: 'Tailored for family offices, sovereign funds, and high-net-worth investors. We structure high-yield residential acquisitions, off-plan bulk unit placements, and master development joint ventures with projected IRRs benchmarked against global indices.',
      ar: 'خدمة مصممة للمكاتب العائلية الاستثمارية وصناديق الثروة. نقوم بهيكلة صفقات شراء حزم الوحدات قيد الإنشاء والاستثمار في المشاريع التطويرية الكبرى لتحقيق أعلى معدل عائد داخلي (IRR).',
    },
    benefits: {
      en: [
        'Yield modeling, cash flow forecasting & sensitivity analysis',
        'Bulk off-plan discount access with institutional developers',
        'Qatar residency by real estate investment advisory',
        'Tax-efficient asset holding structures guidance',
      ],
      ar: [
        'نمذجة العوائد وتوقعات التدفقات النقدية ودراسات الحساسية المالية',
        'خصومات حصرية على شراء الحزم الكبيرة من كبار المطورين',
        'استشارات الحصول على الإقامة الدائمة في قطر عبر التملك العقاري',
        'توجيه استثماري حول الهياكل القانونية الأكثر كفاءة',
      ],
    },
    iconName: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'service-valuation',
    slug: 'property-valuation',
    title: {
      en: 'Certified Property Valuation & Appraisals',
      ar: 'التقييم العقاري المعتمد ودراسات الجدوى',
    },
    shortDescription: {
      en: 'Rigorous RICS-aligned appraisals for collateral lending, probate, portfolio accounting, and acquisitions.',
      ar: 'تقييمات عقارية معتمدة وفق المعايير الدولية للأغراض البنكية، والمحاسبية، وتسوية التركات، وصفقات البيع والشراء.',
    },
    fullDescription: {
      en: 'Our certified appraisal team provides defensible, data-backed property valuations utilizing hedonic pricing, replacement cost methods, and discounted cash flow models, recognized by leading financial institutions throughout Qatar.',
      ar: 'يقدم فريق التقييم المعتمد لدينا تقارير موثقة تعتمد على أحدث المنهجيات العلمية، بما في ذلك أسلوب التكلفة والتدفقات النقدية المخصومة المقبولة لدى كافة المصارف والجهات الرسمية في قطر.',
    },
    benefits: {
      en: [
        'Fully certified by Ministry of Justice & Qatar real estate authorities',
        'In-depth neighborhood comparative transaction analysis',
        'Accepted by tier-1 banks for mortgage underwriting',
        'Comprehensive physical inspection and condition reporting',
      ],
      ar: [
        'معتمد رسمياً من وزارة العدل والجهات العقارية المعنية في قطر',
        'تحليل مقارن دقيق ومحدث لأسعار الصفقات المبرمة في ذات الحي',
        'معتمد لدى البنوك والمصارف الكبرى لتمويل الرهن العقاري',
        'تقرير معاينة فنية شامل لحالة العقار والتشطيبات الإنشائية',
      ],
    },
    iconName: 'FileCheck2',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'service-consultation',
    slug: 'architectural-consultation',
    title: {
      en: 'Architectural Advisory & Interior Curation',
      ar: 'الاستشارات المعمارية والتصميم الداخلي الراقي',
    },
    shortDescription: {
      en: 'Bespoke design reviews, floor-plan optimization, and coordination with world-renowned interior design ateliers.',
      ar: 'مراجعة المخططات الهندسية وتحسين المساحات وتنسيق الديكورات والتأثيث مع كبرى دور التصميم العالمية.',
    },
    fullDescription: {
      en: 'Transforming raw architectural spaces into timeless residential works of art. We collaborate with master Italian stonemasons, lighting designers, and landscape architects to realize palatial visions that reflect our clients unique stature.',
      ar: 'تحويل المساحات المعمارية إلى تحف سكنية خالدة. نتعاون مع أمهر مصممي الإضاءة والرخام الطبيعي ومهندسي تنسيق الحدائق العالميين لتحقيق الرؤية الجمالية المتكاملة للعميل.',
    },
    benefits: {
      en: [
        'Personalized architectural layout consultations',
        'Direct sourcing from European luxury furniture houses',
        'Smart-home automation and acoustic cinema integration',
        'Landscape architecture and private infinity pool design',
      ],
      ar: [
        'استشارات هندسية مخصصة لتوزيع المساحات والمخططات',
        'توريد مباشر من دور الأثاث الفاخر في إيطاليا وفرنسا',
        'دمج أنظمة المنازل الذكية والسينما المنزلية الصوتية المتطورة',
        'تصميم حدائق ومسابح إنفينيتي خاصة فائقة الروعة',
      ],
    },
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  },
];
