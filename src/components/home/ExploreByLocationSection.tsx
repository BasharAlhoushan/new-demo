import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { areas, properties } from '../../data';

export const ExploreByLocationSection: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  return (
    <section className="py-16 sm:py-20 bg-[#F7F5F0] border-t border-[#E7E3DA]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#B69A70] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'أبرز الوجهات' : 'Prime Locations'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#10212B] tracking-tight">
              {lang === 'ar' ? 'استكشف حسب المنطقة' : 'Explore by Location'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#727A7B] max-w-xl font-light">
              {lang === 'ar'
                ? 'تعرف على أشهر وأرقى المناطق السكنية والاستثمارية في دولة قطر.'
                : "Discover Qatar's most distinguished residential and investment districts."}
            </p>
          </div>

          <Link
            to="/areas"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#10212B] hover:text-[#B69A70] transition-colors border border-[#E7E3DA] rounded-xl bg-white hover:bg-[#F7F5F0] self-start md:self-auto"
          >
            <span>{lang === 'ar' ? 'دليل كافة المناطق' : 'All Neighborhood Guides'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
          </Link>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => {
            // Count actual properties for this area
            const actualCount = properties.filter((p) => p.location.area.toLowerCase().includes(area.name.en.toLowerCase().replace('-qatar', '').replace(' city', '').replace(' lagoon', ''))).length || area.propertiesCount;

            return (
              <Link
                key={area.id}
                to={`/areas/${area.slug}`}
                className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#E7E3DA] flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-xl hover:border-[#B69A70]/60"
              >
                <img
                  src={area.heroImage}
                  alt={area.name[lang]}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10212B]/95 via-[#10212B]/40 to-black/20" />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-end">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#10212B] text-xs font-semibold backdrop-blur-sm">
                    {actualCount} {lang === 'ar' ? 'عقار' : 'Properties'}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 text-white">
                  <h3 className="text-xl font-serif font-semibold mb-1 group-hover:text-[#B69A70] transition-colors">
                    {area.name[lang]}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 font-light leading-relaxed mb-3">
                    {area.headline[lang]}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B69A70] group-hover:underline">
                    <span>{lang === 'ar' ? 'استكشف المنطقة' : 'Explore Area'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreByLocationSection;
