import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Building2, ArrowUpRight } from 'lucide-react';
import { properties } from '../../data';
import { PropertyCard } from '../property/PropertyCard';

export const PropertiesForRentSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  const rentalListings = useMemo(() => {
    return properties
      .filter((p) => p.listingType === 'rent')
      .slice(0, 6);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#F7F5F0] border-t border-[#E7E3DA]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#B69A70] mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إيجار سنوي فاخر' : 'Luxury Rentals'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#10212B] tracking-tight">
              {lang === 'ar' ? 'عقارات للإيجار في قطر' : 'Properties for Rent in Qatar'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#727A7B] max-w-xl font-light">
              {lang === 'ar'
                ? 'استأجر أرقى الشقق السكنية والفلل الفارهة المؤثثة بالكامل في أحدث الأبراج والمنتجعات.'
                : 'Discover premium serviced residences, penthouses, and turnkey luxury villas for annual lease.'}
            </p>
          </div>

          <Link
            to="/rent"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#10212B] hover:bg-[#00253B] rounded-xl transition-colors shadow-sm self-start md:self-auto"
          >
            <span>{lang === 'ar' ? 'عرض كل العقارات للإيجار' : 'View All for Rent'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {rentalListings.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesForRentSection;
