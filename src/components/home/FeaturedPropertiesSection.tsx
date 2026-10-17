import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { properties } from '../../data';
import { PropertyCard } from '../property/PropertyCard';

export const FeaturedPropertiesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'rent'>('all');

  const featuredListings = useMemo(() => {
    return properties
      .filter((p) => {
        if (!p.featured) return false;
        if (filterType !== 'all' && p.listingType !== filterType) return false;
        return true;
      })
      .slice(0, 6);
  }, [filterType]);

  return (
    <section className="py-16 sm:py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#B69A70] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'مختارات مميزة' : 'Featured Listings'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#10212B] tracking-tight">
              {lang === 'ar' ? 'عقارات مختارة بعناية' : 'Curated Featured Properties'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#727A7B] max-w-xl font-light">
              {lang === 'ar'
                ? 'مجموعة من أرقى العقارات المعروضة للبيع والإيجار في أفضل أحياء الدوحة.'
                : 'A handpicked selection of prestigious properties available for purchase and lease.'}
            </p>
          </div>

          {/* Filter Pills & View All Link */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-white border border-[#E7E3DA] rounded-xl">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'all'
                    ? 'bg-[#10212B] text-white shadow-xs'
                    : 'text-[#727A7B] hover:text-[#10212B]'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setFilterType('buy')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'buy'
                    ? 'bg-[#10212B] text-white shadow-xs'
                    : 'text-[#727A7B] hover:text-[#10212B]'
                }`}
              >
                {t('search.tabBuy')}
              </button>
              <button
                type="button"
                onClick={() => setFilterType('rent')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'rent'
                    ? 'bg-[#10212B] text-white shadow-xs'
                    : 'text-[#727A7B] hover:text-[#10212B]'
                }`}
              >
                {t('search.tabRent')}
              </button>
            </div>

            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#10212B] hover:text-[#B69A70] transition-colors border border-[#E7E3DA] rounded-xl bg-white hover:bg-[#F7F5F0]"
            >
              <span>{t('properties.viewAll')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
            </Link>
          </div>
        </div>

        {/* Property Grid: Desktop 3 columns, Tablet 2 columns, Mobile 1 single vertical feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {featuredListings.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
