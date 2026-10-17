import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Home, 
  Coins, 
  Bed, 
  SlidersHorizontal 
} from 'lucide-react';
import { localizeAreaName, localizePropertyType } from '../../utils/localize';
import { MobileFilterSheet } from '../common/MobileFilterSheet';

interface HeroSlide {
  id: string;
  url: string;
  title: { en: string; ar: string };
  location: { en: string; ar: string };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    title: { en: 'Palatial Private Villa', ar: 'قصر ملكي خاص' },
    location: { en: 'The Pearl-Qatar', ar: 'اللؤلؤة قطر' },
  },
  {
    id: 'slide-2',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    title: { en: 'Modern Architectural Villa', ar: 'فيلا معمارية حديثة' },
    location: { en: 'West Bay Lagoon', ar: 'لاغون الخليج الغربي' },
  },
  {
    id: 'slide-3',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
    title: { en: 'The Azure Crest Marina Tower', ar: 'برج أزور كريست مارينا' },
    location: { en: 'Lusail Marina South', ar: 'مارينا لوسيل الجنوبية' },
  },
  {
    id: 'slide-4',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    title: { en: 'Marina Skyline Penthouse', ar: 'بنتهاوس بإطلالة المارينا' },
    location: { en: 'Porto Arabia', ar: 'بورتو أرابيا' },
  },
  {
    id: 'slide-5',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    title: { en: 'Waterfront Private Estate', ar: 'مسكن استثنائي على الواجهة المائية' },
    location: { en: 'Katara Hills', ar: 'تلال كتارا' },
  },
];

const LOCATIONS = [
  'The Pearl-Qatar',
  'Lusail City',
  'West Bay Lagoon',
  'West Bay',
  'Msheireb Downtown',
  'Katara Hills',
  'Al Waab',
];

const PROPERTY_TYPES = [
  'Villa',
  'Penthouse',
  'Palatial Mansion',
  'Waterfront Residence',
  'Duplex',
  'Sky Villa',
  'Townhouse',
];

export const MarketplaceHero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const navigate = useNavigate();

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Search filter states
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'all'>('buy');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [pricePreset, setPricePreset] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile bottom sheet state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Automatic slide transition every 6 seconds with reduced-motion support
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePricePresetChange = (preset: string) => {
    setPricePreset(preset);
    if (!preset) {
      setMinPrice(0);
      setMaxPrice(0);
      return;
    }
    const [min, max] = preset.split('-').map(Number);
    setMinPrice(min || 0);
    setMaxPrice(max || 0);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPricePreset(min || max ? `${min}-${max}` : '');
  };

  const executeSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedLocation) params.set('area', selectedLocation);
    if (selectedType) params.set('propertyType', selectedType);
    if (selectedBeds) params.set('beds', selectedBeds);
    if (minPrice > 0) params.set('minPrice', String(minPrice));
    if (maxPrice > 0) params.set('maxPrice', String(maxPrice));

    const targetBase = activeTab === 'rent' ? '/rent' : activeTab === 'buy' ? '/buy' : '/properties';
    const queryString = params.toString();
    navigate(`${targetBase}${queryString ? `?${queryString}` : ''}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const resetFilters = () => {
    setSelectedLocation('');
    setSelectedType('');
    setSelectedBeds('');
    setPricePreset('');
    setMinPrice(0);
    setMaxPrice(0);
    setSearchQuery('');
  };

  const isRent = activeTab === 'rent';

  return (
    <section className="relative min-h-[680px] sm:min-h-[720px] lg:min-h-[760px] flex items-center justify-center overflow-hidden bg-[#10212B] pt-28 pb-20">
      {/* 1. Cinematic Background Image Slider */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
              }}
            >
              <img
                src={slide.url}
                alt={slide.title[lang]}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover object-center scale-100"
              />
            </div>
          );
        })}

        {/* Elegant cinematic gradient overlay allowing architectural image visibility */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(180deg, rgba(5, 18, 28, 0.58) 0%, rgba(5, 18, 28, 0.32) 50%, rgba(5, 18, 28, 0.52) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Main Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mb-8 sm:mb-10"
        >
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-[#B69A70] bg-[#10212B]/60 border border-[#B69A70]/40 mb-3 backdrop-blur-md shadow-xs">
            {lang === 'ar' ? 'سوق العقارات الرائد في قطر' : "Qatar's Premier Property Marketplace"}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight leading-tight drop-shadow-md">
            {lang === 'ar'
              ? 'اكتشف عقارك القادم في قطر'
              : 'Discover Your Next Property in Qatar'}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-xs">
            {lang === 'ar'
              ? 'استكشف أرقى الفلل الفاخرة، البنتهاوس والمساكن الشاطئية الخاصة في اللؤلؤة ولوسيل والخليج الغربي.'
              : 'Explore verified luxury villas, penthouses, and waterfront estates across The Pearl, Lusail, and West Bay.'}
          </p>
        </motion.div>

        {/* 2. Transparent Glassmorphism Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-[1100px] rounded-[18px] p-4 sm:p-6 text-left rtl:text-right"
          style={{
            background: 'rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.32)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.22)',
          }}
        >
          {/* Buy / Rent / All Tabs */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/20">
            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'buy'
                  ? 'bg-[#10212B] text-white shadow-md border border-[#B69A70]/50'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-md'
              }`}
            >
              {t('search.tabBuy')}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'rent'
                  ? 'bg-[#10212B] text-white shadow-md border border-[#B69A70]/50'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-md'
              }`}
            >
              {t('search.tabRent')}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-[#10212B] text-white shadow-md border border-[#B69A70]/50'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/25 backdrop-blur-md'
              }`}
            >
              {lang === 'ar' ? 'كافة العقارات' : 'All Properties'}
            </button>
          </div>

          {/* Desktop Search Grid */}
          <form onSubmit={handleSubmit} className="hidden lg:grid grid-cols-12 gap-3 items-center">
            {/* Location Selector */}
            <div className="col-span-3">
              <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-1 drop-shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>{t('search.location')}</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                style={{ background: 'rgba(255, 255, 255, 0.90)' }}
                className="w-full border border-white/60 rounded-xl px-3 py-2.5 text-xs text-[#10212B] font-medium outline-none focus:border-[#B69A70] focus:ring-2 focus:ring-[#B69A70]/25 transition-all shadow-xs cursor-pointer"
              >
                <option value="">{t('search.allLocations')}</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {localizeAreaName(loc, lang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Selector */}
            <div className="col-span-3">
              <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-1 drop-shadow-xs">
                <Home className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>{t('search.propertyType')}</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{ background: 'rgba(255, 255, 255, 0.90)' }}
                className="w-full border border-white/60 rounded-xl px-3 py-2.5 text-xs text-[#10212B] font-medium outline-none focus:border-[#B69A70] focus:ring-2 focus:ring-[#B69A70]/25 transition-all shadow-xs cursor-pointer"
              >
                <option value="">{t('search.allTypes')}</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {localizePropertyType(type, lang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Selector */}
            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-1 drop-shadow-xs">
                <Coins className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>{t('search.priceRange')}</span>
              </label>
              <select
                value={pricePreset}
                onChange={(e) => handlePricePresetChange(e.target.value)}
                style={{ background: 'rgba(255, 255, 255, 0.90)' }}
                className="w-full border border-white/60 rounded-xl px-3 py-2.5 text-xs text-[#10212B] font-medium outline-none focus:border-[#B69A70] focus:ring-2 focus:ring-[#B69A70]/25 transition-all shadow-xs cursor-pointer"
              >
                <option value="">{lang === 'ar' ? 'أي سعر' : 'Any Price'}</option>
                {isRent ? (
                  <>
                    <option value="0-30000">&lt; 30K QAR</option>
                    <option value="30000-60000">30K - 60K QAR</option>
                    <option value="60000-100000">60K - 100K QAR</option>
                    <option value="100000-0">&gt; 100K QAR</option>
                  </>
                ) : (
                  <>
                    <option value="0-10000000">&lt; 10M QAR</option>
                    <option value="10000000-25000000">10M - 25M QAR</option>
                    <option value="25000000-40000000">25M - 40M QAR</option>
                    <option value="40000000-0">&gt; 40M QAR</option>
                  </>
                )}
              </select>
            </div>

            {/* Bedrooms */}
            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-1 drop-shadow-xs">
                <Bed className="w-3.5 h-3.5 text-[#B69A70]" />
                <span>{t('search.bedrooms')}</span>
              </label>
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                style={{ background: 'rgba(255, 255, 255, 0.90)' }}
                className="w-full border border-white/60 rounded-xl px-3 py-2.5 text-xs text-[#10212B] font-medium outline-none focus:border-[#B69A70] focus:ring-2 focus:ring-[#B69A70]/25 transition-all shadow-xs cursor-pointer"
              >
                <option value="">{t('search.anyBeds')}</option>
                <option value="1">1 {t('properties.beds')}</option>
                <option value="2">2 {t('properties.beds')}</option>
                <option value="3">3 {t('properties.beds')}</option>
                <option value="4">4 {t('properties.beds')}</option>
                <option value="5">5+ {t('properties.beds')}</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-span-2 pt-5">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#10212B] hover:bg-[#00253B] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md border border-[#B69A70]/40 hover:shadow-lg active:scale-[0.98]"
              >
                <Search className="w-4 h-4 text-[#B69A70]" />
                <span>{t('search.searchButton')}</span>
              </button>
            </div>
          </form>

          {/* Mobile Search Row & Bottom Sheet Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث بالمنطقة أو اسم العقار...' : 'Search by area or property...'}
                style={{ background: 'rgba(255, 255, 255, 0.90)' }}
                className="w-full border border-white/50 rounded-xl pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2.5 text-xs text-[#10212B] outline-none placeholder-[#727A7B] font-medium shadow-xs"
              />
              <Search className="w-4 h-4 text-[#727A7B] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Bottom Sheet Trigger */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              style={{ background: 'rgba(255, 255, 255, 0.90)' }}
              className="p-2.5 rounded-xl border border-white/50 text-[#10212B] hover:bg-white flex items-center justify-center shadow-xs"
              aria-label="Open Filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#B69A70]" />
            </button>

            {/* Search Execute Button */}
            <button
              type="button"
              onClick={executeSearch}
              className="py-2.5 px-4 rounded-xl bg-[#10212B] hover:bg-[#00253B] text-white text-xs font-semibold shadow-md border border-[#B69A70]/30 shrink-0"
            >
              {t('search.searchButton')}
            </button>
          </div>
        </motion.div>
      </div>

      {/* 3. Slider Indicators (Minimal & Accessible) */}
      <div
        className="absolute bottom-5 inset-x-0 z-20 flex items-center justify-center gap-2.5 pointer-events-auto"
        role="tablist"
        aria-label={lang === 'ar' ? 'شرائح الصور الرئيسية' : 'Hero background slides'}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isCurrent = idx === currentSlide;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-label={`${lang === 'ar' ? 'انتقال إلى' : 'Go to slide'} ${idx + 1}: ${slide.title[lang]}`}
              onClick={() => {
                setCurrentSlide(idx);
                setIsPaused(true);
              }}
              className={`group relative h-2 transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B69A70] ${
                isCurrent
                  ? 'w-8 bg-[#B69A70] shadow-sm'
                  : 'w-2 bg-white/45 hover:bg-white/80'
              }`}
            >
              <span className="sr-only">{slide.title[lang]}</span>
            </button>
          );
        })}
      </div>

      {/* Slide Context Label */}
      <div 
        className={`hidden sm:flex items-center gap-2 absolute bottom-5 ${
          lang === 'ar' ? 'left-6' : 'right-6'
        } z-20 pointer-events-none text-white/80 text-[11px] font-light tracking-wide bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/10`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#B69A70] animate-pulse" />
        <span>
          {HERO_SLIDES[currentSlide].title[lang]} • {HERO_SLIDES[currentSlide].location[lang]}
        </span>
      </div>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        listingType={activeTab}
        onListingTypeChange={(t) => setActiveTab(t)}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
        selectedBeds={selectedBeds}
        onBedsChange={setSelectedBeds}
        onApply={executeSearch}
        onReset={resetFilters}
      />
    </section>
  );
};

export default MarketplaceHero;

