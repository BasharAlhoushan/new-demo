import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Grid, 
  List, 
  Map as MapIcon, 
  SlidersHorizontal, 
  X, 
  Search, 
  ChevronDown, 
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { PropertyCard } from '../../components/property/PropertyCard';
import { PropertyMap } from '../../components/property/PropertyMap';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';
import { properties } from '../../data';
import { Property, ListingType } from '../../types';
import { localizeAreaName, localizePropertyType, localizeAmenity } from '../../utils/localize';

interface PropertiesPageProps {
  initialListingType?: 'buy' | 'rent';
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ initialListingType }) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // View mode
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Determine listing type from prop or path
  const inferredListingType: ListingType | 'all' = 
    initialListingType || 
    (location.pathname === '/buy' ? 'buy' : location.pathname === '/rent' ? 'rent' : 'all');

  // Filter States synced with URL Search Params
  const searchQuery = searchParams.get('q') || '';
  const selectedType = searchParams.get('propertyType') || 'all';
  const selectedArea = searchParams.get('area') || 'all';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 0;
  const selectedBeds = searchParams.get('beds') || 'all';
  const selectedBaths = searchParams.get('baths') || 'all';
  const furnishing = searchParams.get('furnishing') || 'all';
  const sortBy = searchParams.get('sort') || 'newest';
  const selectedAmenities = searchParams.getAll('amenity');

  // Update URL params
  const updateFilter = (key: string, value: string | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === '0') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const toggleAmenity = (amenity: string) => {
    const nextParams = new URLSearchParams(searchParams);
    const current = nextParams.getAll('amenity');
    nextParams.delete('amenity');
    if (current.includes(amenity)) {
      current.filter((a) => a !== amenity).forEach((a) => nextParams.append('amenity', a));
    } else {
      [...current, amenity].forEach((a) => nextParams.append('amenity', a));
    }
    setSearchParams(nextParams, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Filter & Sort properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // 1. Listing Type
      if (inferredListingType !== 'all' && p.listingType !== inferredListingType) {
        return false;
      }
      // 2. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.en.toLowerCase().includes(q) || p.title.ar.includes(q);
        const matchArea = p.location.area.toLowerCase().includes(q);
        const matchAddress = p.location.address.toLowerCase().includes(q);
        if (!matchTitle && !matchArea && !matchAddress) return false;
      }
      // 3. Property Type
      if (selectedType !== 'all' && p.propertyType !== selectedType) {
        return false;
      }
      // 4. Area
      if (selectedArea !== 'all' && !p.location.area.toLowerCase().includes(selectedArea.toLowerCase())) {
        return false;
      }
      // 5. Price
      if (minPrice > 0 && p.price < minPrice) return false;
      if (maxPrice > 0 && p.price > maxPrice) return false;
      // 6. Bedrooms
      if (selectedBeds !== 'all') {
        const bedNum = Number(selectedBeds);
        if (p.bedrooms < bedNum) return false;
      }
      // 7. Bathrooms
      if (selectedBaths !== 'all') {
        const bathNum = Number(selectedBaths);
        if (p.bathrooms < bathNum) return false;
      }
      // 8. Furnishing
      if (furnishing !== 'all' && p.furnishing !== furnishing) {
        return false;
      }
      // 9. Amenities
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every((amenity) =>
          p.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.areaSqM - a.areaSqM;
      // default newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    inferredListingType,
    searchQuery,
    selectedType,
    selectedArea,
    minPrice,
    maxPrice,
    selectedBeds,
    selectedBaths,
    furnishing,
    selectedAmenities,
    sortBy,
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const activeFiltersCount = Array.from(searchParams.entries()).length;

  const pageTitle =
    inferredListingType === 'buy'
      ? (lang === 'ar' ? 'مساكن فاخرة للبيع والتملك الحر' : 'Ultra-Luxury Residences For Sale')
      : inferredListingType === 'rent'
      ? (lang === 'ar' ? 'عقارات سكنية فاخرة للإيجار السنوي' : 'Prestigious Residential Leasing')
      : (lang === 'ar' ? 'محفظة العقارات الفاخرة في قطر' : 'Qatar Prime Luxury Residences');

  return (
    <PageLayout>
      <div className="pt-28 pb-20 bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Header */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: t('nav.home'), path: '/' },
                {
                  label:
                    inferredListingType === 'buy'
                      ? t('nav.buy')
                      : inferredListingType === 'rent'
                      ? t('nav.rent')
                      : t('nav.properties'),
                },
              ]}
            />
          </div>

          {/* Page Headline & View Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E8E6E0] gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
                {t('propertiesPage.badge')}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
                {pageTitle}
              </h1>
              <p className="mt-2 text-sm text-[#777C76] font-light">
                {t('search.resultsFound', { count: filteredProperties.length })}
              </p>
            </div>

            {/* View Mode Switcher (Grid, List, Map) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-white border border-[#E8E6E0] rounded-sm shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  title={lang === 'ar' ? 'عرض شبكي' : 'Grid View'}
                  className={`p-2 rounded-sm transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#111715] text-[#B49A70]'
                      : 'text-[#777C76] hover:text-[#17201C]'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title={lang === 'ar' ? 'عرض طولي' : 'List View'}
                  className={`p-2 rounded-sm transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#111715] text-[#B49A70]'
                      : 'text-[#777C76] hover:text-[#17201C]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  title={lang === 'ar' ? 'عرض الخريطة التفاعلية' : 'Interactive Map View'}
                  className={`p-2 rounded-sm transition-colors ${
                    viewMode === 'map'
                      ? 'bg-[#111715] text-[#B49A70]'
                      : 'text-[#777C76] hover:text-[#17201C]'
                  }`}
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E6E0] rounded-sm text-xs font-semibold uppercase tracking-wider text-[#17201C]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#B49A70]" />
                <span>{lang === 'ar' ? 'تصفية العقارات' : 'Filters'} {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
              </button>
            </div>
          </div>

          {/* Horizontal Top Filters Bar (Desktop) */}
          <div className="mt-8 bg-white border border-[#E8E6E0] rounded-sm p-4 shadow-sm hidden lg:block">
            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Keyword Search */}
              <div className="col-span-3 relative">
                <Search className="w-4 h-4 text-[#777C76] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none rtl:left-auto rtl:right-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => updateFilter('q', e.target.value)}
                  placeholder={lang === 'ar' ? 'ابحث بالكلمة المفتاحية، اللؤلؤة، بنتهاوس...' : 'Keyword, Pearl, Penthouse...'}
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm pl-9 pr-3 py-2 text-xs text-[#17201C] outline-none rtl:pl-3 rtl:pr-9"
                />
              </div>

              {/* Location */}
              <div className="col-span-2">
                <select
                  value={selectedArea}
                  onChange={(e) => updateFilter('area', e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm px-3 py-2 text-xs text-[#17201C] outline-none cursor-pointer"
                >
                  <option value="all">{t('search.allLocations')}</option>
                  <option value="The Pearl">{localizeAreaName('The Pearl-Qatar', lang)}</option>
                  <option value="Lusail">{localizeAreaName('Lusail City', lang)}</option>
                  <option value="West Bay">{localizeAreaName('West Bay', lang)}</option>
                  <option value="Msheireb">{localizeAreaName('Msheireb Downtown', lang)}</option>
                  <option value="Al Waab">{localizeAreaName('Al Waab', lang)}</option>
                  <option value="Katara">{localizeAreaName('Katara Hills', lang)}</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="col-span-2">
                <select
                  value={selectedType}
                  onChange={(e) => updateFilter('propertyType', e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm px-3 py-2 text-xs text-[#17201C] outline-none cursor-pointer"
                >
                  <option value="all">{t('search.allTypes')}</option>
                  <option value="Villa">{localizePropertyType('Villa', lang)}</option>
                  <option value="Palatial Mansion">{localizePropertyType('Palatial Mansion', lang)}</option>
                  <option value="Penthouse">{localizePropertyType('Penthouse', lang)}</option>
                  <option value="Waterfront Residence">{localizePropertyType('Waterfront Residence', lang)}</option>
                  <option value="Sky Villa">{localizePropertyType('Sky Villa', lang)}</option>
                  <option value="Duplex">{localizePropertyType('Duplex', lang)}</option>
                  <option value="Townhouse">{localizePropertyType('Townhouse', lang)}</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="col-span-2">
                <select
                  value={selectedBeds}
                  onChange={(e) => updateFilter('beds', e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm px-3 py-2 text-xs text-[#17201C] outline-none cursor-pointer"
                >
                  <option value="all">{t('search.anyBeds')}</option>
                  <option value="2">{lang === 'ar' ? '2+ غرف نوم' : '2+ Beds'}</option>
                  <option value="3">{lang === 'ar' ? '3+ غرف نوم' : '3+ Beds'}</option>
                  <option value="4">{lang === 'ar' ? '4+ غرف نوم' : '4+ Beds'}</option>
                  <option value="5">{lang === 'ar' ? '5+ غرف نوم' : '5+ Beds'}</option>
                  <option value="6">{lang === 'ar' ? '6+ غرف نوم' : '6+ Beds'}</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm px-3 py-2 text-xs text-[#17201C] outline-none cursor-pointer"
                >
                  <option value="newest">{t('search.sortNewest')}</option>
                  <option value="price-asc">{t('search.sortPriceLow')}</option>
                  <option value="price-desc">{t('search.sortPriceHigh')}</option>
                  <option value="area-desc">{t('search.sortArea')}</option>
                </select>
              </div>

              {/* Clear Reset Button */}
              <div className="col-span-1 flex justify-end">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    title={t('search.resetFilters')}
                    className="p-2 text-[#777C76] hover:text-rose-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Amenity Chips */}
            <div className="mt-3 pt-3 border-t border-[#E8E6E0] flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#777C76] font-semibold mr-1">
                {t('search.amenities')}:
              </span>
              {['Private Beach', 'Infinity Pool', 'Yacht', 'Hammam', 'Smart Home', 'Cinema'].map(
                (amenity) => {
                  const isSelected = selectedAmenities.some((a) =>
                    a.toLowerCase().includes(amenity.toLowerCase())
                  );
                  return (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#B49A70] text-[#111715] font-semibold'
                          : 'bg-[#F8F7F4] text-[#777C76] hover:text-[#17201C] border border-[#E8E6E0]'
                      }`}
                    >
                      {localizeAmenity(amenity, lang)}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#777C76]">{lang === 'ar' ? 'الفلاتر النشطة:' : 'Active Filters:'}</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111715] text-[#F8F7F4] text-xs">
                  <span>{lang === 'ar' ? `الكلمة: ${searchQuery}` : `Keyword: ${searchQuery}`}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateFilter('q', null)}
                  />
                </span>
              )}
              {selectedType !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111715] text-[#F8F7F4] text-xs">
                  <span>{lang === 'ar' ? `النوع: ${localizePropertyType(selectedType, lang)}` : `Type: ${selectedType}`}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateFilter('propertyType', null)}
                  />
                </span>
              )}
              {selectedArea !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111715] text-[#F8F7F4] text-xs">
                  <span>{lang === 'ar' ? `المنطقة: ${localizeAreaName(selectedArea, lang)}` : `Area: ${selectedArea}`}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateFilter('area', null)}
                  />
                </span>
              )}
              {selectedBeds !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111715] text-[#F8F7F4] text-xs">
                  <span>{lang === 'ar' ? `${selectedBeds}+ غرف نوم` : `${selectedBeds}+ Beds`}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => updateFilter('beds', null)}
                  />
                </span>
              )}
              {selectedAmenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#B49A70] text-[#111715] text-xs font-medium"
                >
                  <span>{localizeAmenity(amenity, lang)}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => toggleAmenity(amenity)}
                  />
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#B49A70] underline hover:text-[#17201C] ml-2 rtl:ml-0 rtl:mr-2"
              >
                {t('search.resetFilters')}
              </button>
            </div>
          )}

          {/* Main Listings Body */}
          <div className="mt-8">
            {filteredProperties.length === 0 ? (
              /* Empty State */
              <div className="py-20 bg-white border border-[#E8E6E0] rounded-sm text-center p-8">
                <div className="w-16 h-16 bg-[#F8F7F4] border border-[#E8E6E0] rounded-full flex items-center justify-center mx-auto mb-4 text-[#B49A70]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#17201C] font-medium mb-2">
                  {t('propertiesPage.noResults')}
                </h3>
                <p className="text-xs text-[#777C76] font-light max-w-md mx-auto mb-6">
                  {t('properties.noProperties')}
                </p>
                <Button variant="dark" size="md" onClick={clearAllFilters}>
                  {t('search.resetFilters')}
                </Button>
              </div>
            ) : viewMode === 'map' ? (
              /* Map View */
              <div className="space-y-6">
                <PropertyMap
                  properties={filteredProperties}
                  className="h-[650px]"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paginatedProperties.slice(0, 3).map((property, idx) => (
                    <PropertyCard key={property.id} property={property} index={idx} />
                  ))}
                </div>
              </div>
            ) : (
              /* Grid or List View */
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                      : 'flex flex-col gap-6'
                  }
                >
                  {paginatedProperties.map((property, idx) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      viewMode={viewMode}
                      index={idx}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-14 flex items-center justify-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="px-4 py-2 border border-[#E8E6E0] rounded-sm text-xs font-medium uppercase tracking-wider text-[#17201C] bg-white disabled:opacity-40 hover:border-[#B49A70] transition-colors"
                    >
                      {lang === 'ar' ? 'السابق' : 'Prev'}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-sm text-xs font-semibold transition-all ${
                          currentPage === page
                            ? 'bg-[#111715] text-[#B49A70]'
                            : 'bg-white border border-[#E8E6E0] text-[#17201C] hover:border-[#B49A70]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="px-4 py-2 border border-[#E8E6E0] rounded-sm text-xs font-medium uppercase tracking-wider text-[#17201C] bg-white disabled:opacity-40 hover:border-[#B49A70] transition-colors"
                    >
                      {lang === 'ar' ? 'التالي' : 'Next'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-lg bg-white rounded-t-xl sm:rounded-lg p-6 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E6E0] pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#17201C]">
                {t('search.advancedFilters')}
              </h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-full text-[#777C76] hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {lang === 'ar' ? 'الكلمة المفتاحية' : 'Search Keyword'}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateFilter('q', e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث بالكلمة المفتاحية، اللؤلؤة، بنتهاوس...' : 'Search Pearl, Marina, Penthouse...'}
                className="w-full p-2.5 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('search.location')}
              </label>
              <select
                value={selectedArea}
                onChange={(e) => updateFilter('area', e.target.value)}
                className="w-full p-2.5 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              >
                <option value="all">{t('search.allLocations')}</option>
                <option value="The Pearl">{localizeAreaName('The Pearl-Qatar', lang)}</option>
                <option value="Lusail">{localizeAreaName('Lusail City', lang)}</option>
                <option value="West Bay">{localizeAreaName('West Bay', lang)}</option>
                <option value="Msheireb">{localizeAreaName('Msheireb Downtown', lang)}</option>
                <option value="Al Waab">{localizeAreaName('Al Waab', lang)}</option>
                <option value="Katara">{localizeAreaName('Katara Hills', lang)}</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('search.propertyType')}
              </label>
              <select
                value={selectedType}
                onChange={(e) => updateFilter('propertyType', e.target.value)}
                className="w-full p-2.5 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              >
                <option value="all">{t('search.allTypes')}</option>
                <option value="Villa">{localizePropertyType('Villa', lang)}</option>
                <option value="Palatial Mansion">{localizePropertyType('Palatial Mansion', lang)}</option>
                <option value="Penthouse">{localizePropertyType('Penthouse', lang)}</option>
                <option value="Waterfront Residence">{localizePropertyType('Waterfront Residence', lang)}</option>
                <option value="Sky Villa">{localizePropertyType('Sky Villa', lang)}</option>
                <option value="Duplex">{localizePropertyType('Duplex', lang)}</option>
                <option value="Townhouse">{localizePropertyType('Townhouse', lang)}</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('search.bedrooms')}
              </label>
              <select
                value={selectedBeds}
                onChange={(e) => updateFilter('beds', e.target.value)}
                className="w-full p-2.5 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              >
                <option value="all">{t('search.anyBeds')}</option>
                <option value="2">{lang === 'ar' ? '2+ غرف نوم' : '2+ Bedrooms'}</option>
                <option value="3">{lang === 'ar' ? '3+ غرف نوم' : '3+ Bedrooms'}</option>
                <option value="4">{lang === 'ar' ? '4+ غرف نوم' : '4+ Bedrooms'}</option>
                <option value="5">{lang === 'ar' ? '5+ غرف نوم' : '5+ Bedrooms'}</option>
                <option value="6">{lang === 'ar' ? '6+ غرف نوم' : '6+ Bedrooms'}</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('search.sortBy')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="w-full p-2.5 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              >
                <option value="newest">{t('search.sortNewest')}</option>
                <option value="price-asc">{t('search.sortPriceLow')}</option>
                <option value="price-desc">{t('search.sortPriceHigh')}</option>
                <option value="area-desc">{t('search.sortArea')}</option>
              </select>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                variant="outline"
                size="md"
                className="flex-1"
                onClick={clearAllFilters}
              >
                {t('search.resetFilters')}
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => setMobileFiltersOpen(false)}
              >
                {lang === 'ar' ? `عرض النتائج (${filteredProperties.length})` : `Show Results (${filteredProperties.length})`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
