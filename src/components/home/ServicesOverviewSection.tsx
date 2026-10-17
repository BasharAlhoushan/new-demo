import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Briefcase, 
  KeyRound, 
  TrendingUp, 
  Building, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';
import { services } from '../../data';

export const ServicesOverviewSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  const iconMap: Record<string, React.ReactNode> = {
    KeyRound: <KeyRound className="w-5 h-5 text-[#B69A70]" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-[#B69A70]" />,
    Building: <Building className="w-5 h-5 text-[#B69A70]" />,
    Compass: <Compass className="w-5 h-5 text-[#B69A70]" />,
  };

  const topServices = services.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E7E3DA]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#B69A70] mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'خدماتنا العقارية' : 'Our Services'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#10212B] tracking-tight">
              {lang === 'ar' ? 'حلول عقارية متكاملة ورفيعة المستوى' : 'Comprehensive Real Estate Services'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#727A7B] max-w-xl font-light">
              {lang === 'ar'
                ? 'نقدم لعملائنا استشارات موثوقة في الوساطة والتسويق وإدارة الأصول والاستثمار العقاري في قطر.'
                : 'Providing our clients with trusted guidance in brokerage, marketing, asset management, and property investment.'}
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#10212B] hover:text-[#B69A70] transition-colors border border-[#E7E3DA] rounded-xl bg-white hover:bg-[#F7F5F0] self-start md:self-auto"
          >
            <span>{lang === 'ar' ? 'عرض كافة الخدمات' : 'Explore All Services'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
          </Link>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-[#F7F5F0] border border-[#E7E3DA] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#B69A70]/60 hover:bg-white"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E7E3DA] flex items-center justify-center mb-5 shadow-2xs">
                  {iconMap[svc.iconName] || <Briefcase className="w-5 h-5 text-[#B69A70]" />}
                </div>

                <h3 className="text-base font-semibold text-[#10212B] mb-2">
                  {svc.title[lang]}
                </h3>

                <p className="text-xs text-[#727A7B] font-light leading-relaxed mb-6">
                  {svc.shortDescription[lang]}
                </p>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#10212B] hover:text-[#B69A70] transition-colors"
              >
                <span>{lang === 'ar' ? 'المزيد من التفاصيل' : 'Learn More'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90 text-[#B69A70]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;
