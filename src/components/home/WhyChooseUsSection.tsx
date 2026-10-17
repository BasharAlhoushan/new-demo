import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Compass, 
  UserCheck, 
  Scale 
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  const pillars = [
    {
      icon: <Compass className="w-6 h-6 text-[#B69A70]" />,
      title: {
        en: 'Deep Local Market Expertise',
        ar: 'معرفة عميقة بالسوق العقاري المحلي',
      },
      desc: {
        en: "Our advisors possess an intimate, micro-market understanding of Qatar's premier zones — from The Pearl to Lusail and West Bay Lagoon.",
        ar: 'فريقنا يتمتع بدراية تامة بأدق تفاصيل المناطق العقارية في قطر، من جزيرة اللؤلؤة إلى مدينة لوسيل والخليج الغربي.',
      },
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[#B69A70]" />,
      title: {
        en: 'Personalized Property Advisory',
        ar: 'استشارات عقارية مخصصة وشخصية',
      },
      desc: {
        en: 'We tailor every search to your exact lifestyle, investment parameters, and architectural preferences, ensuring a refined buying or leasing journey.',
        ar: 'نصمم كل رحلة بحث وفقاً لأولوياتكم الاستثمارية والنمط المعيشي الذي تنشدونه، لضمان تجربة تملك مريحة وموفقة.',
      },
    },
    {
      icon: <Scale className="w-6 h-6 text-[#B69A70]" />,
      title: {
        en: 'Transparent Client Communication',
        ar: 'شفافية ومصداقية كاملة في التعامل',
      },
      desc: {
        en: 'Clear valuations, verified listings, and direct communication at every phase of property acquisition, lease, and management.',
        ar: 'تقييمات واقعية، عقارات تم التحقق منها بدقة، وتواصل مباشر ومستمر في كافة مراحل المعاينة والتعاقد.',
      },
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#B69A70]" />,
      title: {
        en: 'Professional & Confidential Service',
        ar: 'خدمة احترافية بأعلى معايير السرية',
      },
      desc: {
        en: 'We uphold strict confidentiality protocols and professional ethics, safeguarding client discretion across all private transactions.',
        ar: 'نلتزم بأعلى معايير السرية والخصوصية والأمانة المهنية لحماية مصالح عملائنا في كافة الصفقات العقارية.',
      },
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F7F5F0] border-t border-[#E7E3DA]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#B69A70] block mb-2">
            {lang === 'ar' ? 'قيمنا ومعاييرنا' : 'Our Commitments'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#10212B] tracking-tight">
            {lang === 'ar' ? 'لماذا تختار ذا ون العقارية؟' : 'Why Choose THE ONE Real Estate?'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#727A7B] font-light">
            {lang === 'ar'
              ? 'نضع خبرتنا وشفافيتنا في خدمتكم لنساعدكم في اتخاذ قرارات عقارية واثقة ومستنيرة.'
              : 'Dedicated to empowering buyers, sellers, and tenants with informed confidence and trusted guidance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E7E3DA] rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:border-[#B69A70]/60"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] border border-[#E7E3DA] flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-base font-semibold text-[#10212B] mb-2 leading-snug">
                {item.title[lang]}
              </h3>

              <p className="text-xs text-[#727A7B] font-light leading-relaxed">
                {item.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
