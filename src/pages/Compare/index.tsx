import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { formatPrice } from '../../utils/formatters';
import { 
  localizeAreaName, 
  localizePropertyType, 
  localizeFurnishing, 
  localizeSpecificationValue, 
  localizeAmenity 
} from '../../utils/localize';

export const ComparePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const { currency } = useCurrencyStore();

  const properties = useCompareStore((s) => s.properties);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const clearCompare = useCompareStore((s) => s.clearCompare);

  const allAmenities = [
    'Private Sand Beach',
    'Yacht Slipway & Marina Berth',
    'Indoor & Outdoor Heated Pools',
    'Subterranean 8-Car Garage',
    'Private Cinema Room',
    'Turkish Hammam & Spa',
    'Smart Home Automation',
    'Cantilevered Sky Pool',
    'Private Rooftop Jacuzzi',
  ];

  return (
    <PageLayout>
      <div className="pt-28 pb-24 bg-[#F7F5F0] min-h-screen">
        <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.compare') },
            ]}
          />

          {/* Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E7E3DA] mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B69A70] font-semibold block mb-1.5">
                {t('comparePage.badge')}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#10212B] tracking-tight">
                {t('compare.title')}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#727A7B] font-light">
                {t('compare.subtitle')} ({lang === 'ar' ? `تم اختيار ${properties.length} من 4` : `${properties.length}/4 selected`})
              </p>
            </div>

            {properties.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCompare}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              >
                {t('compare.clearAll')}
              </Button>
            )}
          </div>

          {/* When Empty */}
          {properties.length === 0 ? (
            <div className="bg-white border border-[#E8E6E0] rounded-sm p-12 sm:p-16 text-center max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-[#F8F7F4] border border-[#E8E6E0] rounded-full flex items-center justify-center mx-auto mb-5 text-[#B49A70]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#17201C] font-medium mb-3">
                {t('comparePage.emptyTitle')}
              </h3>
              <p className="text-xs text-[#777C76] font-light leading-relaxed mb-6">
                {t('compare.empty')}
              </p>
              <Link to="/properties">
                <Button variant="primary" size="md">
                  {t('comparePage.explorePortfolio')}
                </Button>
              </Link>
            </div>
          ) : (
            /* Comparison Table Container (Horizontal Scroll for Responsive) */
            <div className="bg-white border border-[#E8E6E0] rounded-sm shadow-sm overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                {/* Header Row: Property Cards & Remove Buttons */}
                <thead>
                  <tr className="border-b border-[#E8E6E0]">
                    <th className="p-6 text-left rtl:text-right w-1/5 bg-[#F8F7F4]/50 font-serif text-base text-[#17201C] font-medium">
                      {t('comparePage.residence')}
                    </th>
                    {properties.map((p) => (
                      <th key={p.id} className="p-6 w-1/4 align-top text-left rtl:text-right">
                        <div className="relative group">
                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 z-10 p-1.5 rounded-full bg-white shadow-md border border-[#E8E6E0] text-[#777C76] hover:text-rose-600 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          {/* Image */}
                          <div className="aspect-[16/10] overflow-hidden rounded-sm mb-3 bg-[#18201D]">
                            <img
                              src={p.images[0]}
                              alt={p.title[lang]}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <span className="text-[10px] uppercase tracking-wider text-[#B49A70] font-semibold block mb-1">
                            {localizeAreaName(p.location.area, lang)}
                          </span>
                          <Link
                            to={`/properties/${p.slug}`}
                            className="font-serif text-base font-semibold text-[#17201C] hover:text-[#B49A70] line-clamp-2 leading-tight block mb-2"
                          >
                            {p.title[lang]}
                          </Link>

                          <div className="font-serif text-lg font-bold text-[#17201C]">
                            {formatPrice(p.price, currency, lang)}
                            {p.listingType === 'rent' && (
                              <span className="text-xs text-[#777C76] font-normal"> {lang === 'ar' ? '/ شهرياً' : '/ mo'}</span>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}

                    {/* Placeholder Slot if < 4 */}
                    {properties.length < 4 && (
                      <th className="p-6 w-1/4 align-top text-center bg-[#F8F7F4]/20 border-l border-[#E8E6E0] rtl:border-r rtl:border-l-0">
                        <Link
                          to="/properties"
                          className="h-full min-h-[220px] flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E8E6E0] hover:border-[#B49A70] rounded-sm transition-colors text-[#777C76] hover:text-[#B49A70]"
                        >
                          <Plus className="w-6 h-6 mb-2" />
                          <span className="text-xs uppercase tracking-wider font-semibold">
                            {t('comparePage.addAnother')}
                          </span>
                        </Link>
                      </th>
                    )}
                  </tr>
                </thead>

                {/* Rows */}
                <tbody className="divide-y divide-[#E8E6E0] text-xs">
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-semibold uppercase tracking-wider text-[#777C76] bg-[#F8F7F4]/50">
                      {t('compare.category')}
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 font-medium text-[#17201C]">
                        {localizePropertyType(p.propertyType, lang)}
                      </td>
                    ))}
                    {properties.length < 4 && <td className="p-4" />}
                  </tr>

                  {/* Built-up Area */}
                  <tr>
                    <td className="p-4 font-semibold uppercase tracking-wider text-[#777C76] bg-[#F8F7F4]/50">
                      {t('compare.area')}
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-[#17201C]">
                        <span className="font-semibold">{p.areaSqM} {t('properties.sqm')}</span> ({Math.round(p.areaSqM * 10.76)} {t('properties.sqft')})
                      </td>
                    ))}
                    {properties.length < 4 && <td className="p-4" />}
                  </tr>

                  {/* Bedrooms */}
                  <tr>
                    <td className="p-4 font-semibold uppercase tracking-wider text-[#777C76] bg-[#F8F7F4]/50">
                      {t('compare.bedrooms')}
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-[#17201C]">
                        {p.bedrooms} {lang === 'ar' ? 'أجنحة نوم' : 'Suites'}
                      </td>
                    ))}
                    {properties.length < 4 && <td className="p-4" />}
                  </tr>

                  {/* Bathrooms */}
                  <tr>
                    <td className="p-4 font-semibold uppercase tracking-wider text-[#777C76] bg-[#F8F7F4]/50">
                      {t('compare.bathrooms')}
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-[#17201C]">
                        {p.bathrooms} {lang === 'ar' ? 'دورات مياه' : 'Bathrooms'}
                      </td>
                    ))}
                    {properties.length < 4 && <td className="p-4" />}
                  </tr>

                  {/* Furnishing */}
                  <tr>
                    <td className="p-4 font-semibold uppercase tracking-wider text-[#777C76] bg-[#F8F7F4]/50">
                      {t('compare.furnishing')}
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-[#17201C]">
                        {localizeFurnishing(p.furnishing, lang)}
                      </td>
                    ))}
                    {properties.length < 4 && <td className="p-4" />}
                  </tr>

                  {/* View */}
                  <tr>
                    <td className="p-4 font-semibold uppercase tracking-wider text-[#777C76] bg-[#F8F7F4]/50">
                      {t('propertyDetails.primaryView')}
                    </td>
                    {properties.map((p) => (
                      <td key={p.id} className="p-4 text-[#17201C] text-[11px]">
                        {localizeSpecificationValue('view', p.specifications.view, lang)}
                      </td>
                    ))}
                    {properties.length < 4 && <td className="p-4" />}
                  </tr>

                  {/* Amenities Checklist */}
                  {allAmenities.map((amenity, i) => (
                    <tr key={i}>
                      <td className="p-4 font-semibold text-[#777C76] bg-[#F8F7F4]/50 text-[11px]">
                        {localizeAmenity(amenity, lang)}
                      </td>
                      {properties.map((p) => {
                        const hasAmenity = p.amenities.some((a) =>
                          a.toLowerCase().includes(amenity.toLowerCase())
                        );
                        return (
                          <td key={p.id} className="p-4">
                            {hasAmenity ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                                <Check className="w-4 h-4 text-emerald-600" />
                                <span>{t('comparePage.included')}</span>
                              </span>
                            ) : (
                              <span className="text-[#777C76]/50">—</span>
                            )}
                          </td>
                        );
                      })}
                      {properties.length < 4 && <td className="p-4" />}
                    </tr>
                  ))}

                  {/* Action Link Row */}
                  <tr>
                    <td className="p-6 bg-[#F8F7F4]/50" />
                    {properties.map((p) => (
                      <td key={p.id} className="p-6">
                        <Link to={`/properties/${p.slug}`}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full"
                            icon={<ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />}
                          >
                            {t('comparePage.view')}
                          </Button>
                        </Link>
                      </td>
                    ))}
                    {properties.length < 4 && <td className="p-6" />}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
