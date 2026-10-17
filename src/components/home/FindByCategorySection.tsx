import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, ArrowUpRight } from 'lucide-react';
import { properties, projects } from '../../data';
import { localizePropertyType } from '../../utils/localize';

interface CategoryCardItem {
  id: string;
  name: { en: string; ar: string };
  filterValue: string;
  link: string;
  image: string;
  count: number;
}

export const FindByCategorySection: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  const categories: CategoryCardItem[] = [
    {
      id: 'villas',
      name: { en: 'Luxury Villas', ar: 'فلل فاخرة' },
      filterValue: 'Villa',
      link: '/properties?propertyType=Villa',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      count: properties.filter((p) => p.propertyType === 'Villa').length,
    },
    {
      id: 'penthouses',
      name: { en: 'Penthouses & Sky Residences', ar: 'بنتهاوس وأبراج سكنية' },
      filterValue: 'Penthouse',
      link: '/properties?propertyType=Penthouse',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      count: properties.filter((p) => p.propertyType === 'Penthouse' || p.propertyType === 'Sky Villa').length,
    },
    {
      id: 'mansions',
      name: { en: 'Palatial Mansions', ar: 'قصور ملكية خاصة' },
      filterValue: 'Palatial Mansion',
      link: '/properties?propertyType=Palatial Mansion',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      count: properties.filter((p) => p.propertyType === 'Palatial Mansion').length,
    },
    {
      id: 'waterfront',
      name: { en: 'Waterfront Residences', ar: 'مساكن على الواجهة البحرية' },
      filterValue: 'Waterfront Residence',
      link: '/properties?propertyType=Waterfront Residence',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      count: properties.filter((p) => p.propertyType === 'Waterfront Residence').length,
    },
    {
      id: 'duplexes',
      name: { en: 'Duplexes & Townhouses', ar: 'دوبلكس وتاون هاوس' },
      filterValue: 'Duplex',
      link: '/properties?propertyType=Duplex',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      count: properties.filter((p) => p.propertyType === 'Duplex' || p.propertyType === 'Townhouse').length,
    },
    {
      id: 'projects',
      name: { en: 'Off-Plan & New Launches', ar: 'مشاريع جديدة وقيد الإنشاء' },
      filterValue: 'projects',
      link: '/projects',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      count: projects.length,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E7E3DA]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#B69A70] mb-2">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تصنيفات العقارات' : 'Browse Categories'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#10212B] tracking-tight">
            {lang === 'ar' ? 'ابحث حسب نوع العقار' : 'Find by Category'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#727A7B] font-light">
            {lang === 'ar'
              ? 'تصفح محفظتنا الشاملة المصنفة حسب نوع المسكن لتجد عقارك المنشود بسهولة.'
              : 'Explore our portfolio structured by property type to find your ideal home.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E7E3DA] flex flex-col justify-end p-4 transition-all duration-300 hover:shadow-lg hover:border-[#B69A70]/60"
            >
              <img
                src={cat.image}
                alt={cat.name[lang]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10212B]/90 via-[#10212B]/40 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-[11px] font-medium text-[#B69A70] block mb-0.5">
                  {cat.count} {lang === 'ar' ? 'عقار متاح' : 'Listings'}
                </span>
                <h3 className="text-sm font-semibold leading-snug group-hover:text-[#B69A70] transition-colors">
                  {cat.name[lang]}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindByCategorySection;
