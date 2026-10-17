import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { KeyRound, ArrowUpRight } from 'lucide-react';
import { properties } from '../../data';
import { PropertyCard } from '../property/PropertyCard';

export const PropertiesForSaleSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const [activeCategory, setActiveCategory] = useState<'all' | 'Villa' | 'Penthouse' | 'Mansion'>('all');

  const saleListings = useMemo(() => {
    return properties
      .filter((p) => {
        if (p.listingType !== 'buy') return false;
        if (activeCategory === 'Villa') return p.propertyType === 'Villa';
        if (activeCategory === 'Penthouse') return p.propertyType === 'Penthouse' || p.propertyType === 'Sky Villa';
        if (activeCategory === 'Mansion') return p.propertyType === 'Palatial Mansion' || p.propertyType === 'Waterfront Residence';
        return true;
      })
      .slice(0, 6);
  }, [activeCategory]);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E7E3DA]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#B69A70] mb-2">
              <KeyRound className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'شراء حر' : 'For Sale'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#10212B] tracking-tight">
              {lang === 'ar' ? 'عقارات للبيع في قطر' : 'Properties for Sale in Qatar'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#727A7B] max-w-xl font-light">
              {lang === 'ar'
                ? 'استثمر في أرقى الفلل الشاطئية والقصور الفاخرة والبنتهاوس بأفضل المواقع الاستراتيجية.'
                : 'Invest in freehold villas, beachfront estates, and luxury penthouses in prime Qatari destinations.'}
            </p>
          </div>

          {/* Subcategory Pills & View All CTA */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-[#F7F5F0] border border-[#E7E3DA] rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-[#10212B] text-white shadow-xs'
                    : 'text-[#727A7B] hover:text-[#10212B]'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('Villa')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'Villa'
                    ? 'bg-[#10212B] text-white shadow-xs'
                    : 'text-[#727A7B] hover:text-[#10212B]'
                }`}
              >
                {lang === 'ar' ? 'فلل' : 'Villas'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('Penthouse')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'Penthouse'
                    ? 'bg-[#10212B] text-white shadow-xs'
                    : 'text-[#727A7B] hover:text-[#10212B]'
                }`}
              >
                {lang === 'ar' ? 'بنتهاوس' : 'Penthouses'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('Mansion')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === 'Mansion'
                    ? 'bg-[#10212B] text-white shadow-xs'
                    : 'text-[#727A7B] hover:text-[#10212B]'
                }`}
              >
                {lang === 'ar' ? 'قصور ومساكن بحرية' : 'Mansions & Waterfront'}
              </button>
            </div>

            <Link
              to="/buy"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#10212B] hover:bg-[#00253B] rounded-xl transition-colors shadow-sm"
            >
              <span>{lang === 'ar' ? 'عرض كل العقارات للبيع' : 'View All for Sale'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
            </Link>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {saleListings.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesForSaleSection;
