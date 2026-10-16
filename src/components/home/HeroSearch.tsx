import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';
import { Button } from '../common/Button';
import { localizeAreaName, localizePropertyType } from '../../utils/localize';

export const HeroSearch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'new_development'>('buy');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'new_development') {
      navigate('/projects');
      return;
    }

    const params = new URLSearchParams();
    if (activeTab !== 'buy') params.set('type', activeTab);
    if (propertyType) params.set('propertyType', propertyType);
    if (location) params.set('area', location);
    if (bedrooms) params.set('beds', bedrooms);
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
    }

    const targetPath = activeTab === 'rent' ? '/rent' : '/buy';
    navigate(`${targetPath}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-[#E8E6E0] rounded-sm shadow-xl p-4 sm:p-5">
        {/* Category Tabs: Buy / Rent / Off-Plan */}
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#E8E6E0] overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('buy')}
            className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all rounded-sm select-none ${
              activeTab === 'buy'
                ? 'bg-[#111715] text-[#B49A70]'
                : 'text-[#777C76] hover:text-[#17201C] hover:bg-[#F8F7F4]'
            }`}
          >
            {t('search.tabBuy')}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rent')}
            className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all rounded-sm select-none ${
              activeTab === 'rent'
                ? 'bg-[#111715] text-[#B49A70]'
                : 'text-[#777C76] hover:text-[#17201C] hover:bg-[#F8F7F4]'
            }`}
          >
            {t('search.tabRent')}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('new_development')}
            className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all rounded-sm select-none ${
              activeTab === 'new_development'
                ? 'bg-[#111715] text-[#B49A70]'
                : 'text-[#777C76] hover:text-[#17201C] hover:bg-[#F8F7F4]'
            }`}
          >
            {t('search.tabProjects')}
          </button>
        </div>

        {/* Desktop Search Grid Form */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:grid grid-cols-12 gap-3 items-center divide-x divide-[#E8E6E0] rtl:divide-x-reverse"
        >
          {/* Location Field */}
          <div className="col-span-3 px-3">
            <label className="block text-[10px] uppercase tracking-wider text-[#777C76] font-semibold mb-1">
              {t('search.location')}
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-[#17201C] appearance-none outline-none cursor-pointer pr-5 rtl:pr-0 rtl:pl-5"
              >
                <option value="">{t('search.allLocations')}</option>
                <option value="The Pearl">{localizeAreaName('The Pearl-Qatar', lang)}</option>
                <option value="Lusail">{localizeAreaName('Lusail City', lang)}</option>
                <option value="West Bay">{localizeAreaName('West Bay Lagoon', lang)}</option>
                <option value="Msheireb">{localizeAreaName('Msheireb Downtown', lang)}</option>
                <option value="Al Waab">{localizeAreaName('Al Waab', lang)}</option>
                <option value="Katara">{localizeAreaName('Katara Hills', lang)}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#B49A70] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-0" />
            </div>
          </div>

          {/* Property Type Field */}
          <div className="col-span-3 px-3">
            <label className="block text-[10px] uppercase tracking-wider text-[#777C76] font-semibold mb-1">
              {t('search.propertyType')}
            </label>
            <div className="relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-[#17201C] appearance-none outline-none cursor-pointer pr-5 rtl:pr-0 rtl:pl-5"
              >
                <option value="">{t('search.allTypes')}</option>
                <option value="Villa">{localizePropertyType('Villa', lang)}</option>
                <option value="Palatial Mansion">{localizePropertyType('Palatial Mansion', lang)}</option>
                <option value="Penthouse">{localizePropertyType('Penthouse', lang)}</option>
                <option value="Waterfront Residence">{localizePropertyType('Waterfront Residence', lang)}</option>
                <option value="Sky Villa">{localizePropertyType('Sky Villa', lang)}</option>
                <option value="Duplex">{localizePropertyType('Duplex', lang)}</option>
                <option value="Townhouse">{localizePropertyType('Townhouse', lang)}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#B49A70] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-0" />
            </div>
          </div>

          {/* Price Range */}
          <div className="col-span-2 px-3">
            <label className="block text-[10px] uppercase tracking-wider text-[#777C76] font-semibold mb-1">
              {t('search.priceRange')}
            </label>
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-[#17201C] appearance-none outline-none cursor-pointer pr-5 rtl:pr-0 rtl:pl-5"
              >
                <option value="">{lang === 'ar' ? 'أي نطاق سعري' : 'Any Range'}</option>
                {activeTab === 'rent' ? (
                  <>
                    <option value="0-20000">{lang === 'ar' ? 'حتى 20,000 ر.ق' : 'Up to 20,000 QAR'}</option>
                    <option value="20000-35000">{lang === 'ar' ? '20,000 – 35,000 ر.ق' : '20,000 – 35,000 QAR'}</option>
                    <option value="35000-60000">{lang === 'ar' ? '35,000 – 60,000 ر.ق' : '35,000 – 60,000 QAR'}</option>
                    <option value="60000-100000">{lang === 'ar' ? '60,000+ ر.ق' : '60,000+ QAR'}</option>
                  </>
                ) : (
                  <>
                    <option value="0-6000000">{lang === 'ar' ? 'حتى 6 مليون ر.ق' : 'Up to 6M QAR'}</option>
                    <option value="6000000-15000000">{lang === 'ar' ? '6 – 15 مليون ر.ق' : '6M – 15M QAR'}</option>
                    <option value="15000000-30000000">{lang === 'ar' ? '15 – 30 مليون ر.ق' : '15M – 30M QAR'}</option>
                    <option value="30000000-60000000">{lang === 'ar' ? '30+ مليون ر.ق' : '30M+ QAR'}</option>
                  </>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#B49A70] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-0" />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="col-span-2 px-3">
            <label className="block text-[10px] uppercase tracking-wider text-[#777C76] font-semibold mb-1">
              {t('search.bedrooms')}
            </label>
            <div className="relative">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-[#17201C] appearance-none outline-none cursor-pointer pr-5 rtl:pr-0 rtl:pl-5"
              >
                <option value="">{t('search.anyBeds')}</option>
                <option value="2">{lang === 'ar' ? 'غرفتان' : '2 Bedrooms'}</option>
                <option value="3">{lang === 'ar' ? '3 غرف نوم' : '3 Bedrooms'}</option>
                <option value="4">{lang === 'ar' ? '4 غرف نوم' : '4 Bedrooms'}</option>
                <option value="5">{lang === 'ar' ? '5 غرف نوم' : '5 Bedrooms'}</option>
                <option value="6">{lang === 'ar' ? '6+ غرف نوم' : '6+ Bedrooms'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#B49A70] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-0" />
            </div>
          </div>

          {/* Search Button */}
          <div className="col-span-2 pl-3 rtl:pl-0 rtl:pr-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              icon={<Search className="w-4 h-4" />}
            >
              {t('search.searchButton')}
            </Button>
          </div>
        </form>

        {/* Mobile Search Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-between bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm px-4 py-3 text-xs text-[#17201C] font-medium"
          >
            <span className="flex items-center gap-2 text-[#777C76]">
              <Search className="w-4 h-4 text-[#B49A70]" />
              <span className="truncate">
                {location ? localizeAreaName(location, lang) : (propertyType ? localizePropertyType(propertyType, lang) : t('search.allLocations'))}
              </span>
            </span>
            <SlidersHorizontal className="w-4 h-4 text-[#B49A70] shrink-0" />
          </button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleSearch}
            icon={<Search className="w-4 h-4" />}
          >
            {t('search.searchButton')}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-lg bg-white rounded-t-xl sm:rounded-lg p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E6E0] pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#17201C]">
                {t('search.advancedFilters')}
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#777C76] hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                {t('search.location')}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              >
                <option value="">{t('search.allLocations')}</option>
                <option value="The Pearl">{localizeAreaName('The Pearl-Qatar', lang)}</option>
                <option value="Lusail">{localizeAreaName('Lusail City', lang)}</option>
                <option value="West Bay">{localizeAreaName('West Bay Lagoon', lang)}</option>
                <option value="Msheireb">{localizeAreaName('Msheireb Downtown', lang)}</option>
                <option value="Al Waab">{localizeAreaName('Al Waab', lang)}</option>
                <option value="Katara">{localizeAreaName('Katara Hills', lang)}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                {t('search.propertyType')}
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-3 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              >
                <option value="">{t('search.allTypes')}</option>
                <option value="Villa">{localizePropertyType('Villa', lang)}</option>
                <option value="Palatial Mansion">{localizePropertyType('Palatial Mansion', lang)}</option>
                <option value="Penthouse">{localizePropertyType('Penthouse', lang)}</option>
                <option value="Waterfront Residence">{localizePropertyType('Waterfront Residence', lang)}</option>
                <option value="Sky Villa">{localizePropertyType('Sky Villa', lang)}</option>
                <option value="Duplex">{localizePropertyType('Duplex', lang)}</option>
                <option value="Townhouse">{localizePropertyType('Townhouse', lang)}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                {t('search.bedrooms')}
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full p-3 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm text-xs text-[#17201C]"
              >
                <option value="">{t('search.anyBeds')}</option>
                <option value="2">{lang === 'ar' ? 'غرفتان' : '2 Bedrooms'}</option>
                <option value="3">{lang === 'ar' ? '3 غرف نوم' : '3 Bedrooms'}</option>
                <option value="4">{lang === 'ar' ? '4 غرف نوم' : '4 Bedrooms'}</option>
                <option value="5">{lang === 'ar' ? '5 غرف نوم' : '5 Bedrooms'}</option>
                <option value="6">{lang === 'ar' ? '6+ غرف نوم' : '6+ Bedrooms'}</option>
              </select>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="flex-1"
                onClick={() => {
                  setLocation('');
                  setPropertyType('');
                  setPriceRange('');
                  setBedrooms('');
                }}
              >
                {t('search.resetFilters')}
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="flex-1"
                onClick={(e) => {
                  setMobileFilterOpen(false);
                  handleSearch(e);
                }}
              >
                {t('search.searchButton')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
