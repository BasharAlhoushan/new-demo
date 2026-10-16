import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowUpRight, 
  Heart, 
  Layers, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Compass
} from 'lucide-react';
import { Property } from '../../types';
import { properties } from '../../data';
import { formatPrice } from '../../utils/formatters';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { Button } from '../common/Button';

export const FeaturedProperties: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const isRTL = lang === 'ar';
  const shouldReduceMotion = useReducedMotion();

  const { currency } = useCurrencyStore();
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isInCompare = useCompareStore((s) => s.isInCompare);
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [pageIdx, setPageIdx] = useState<number>(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(0);

  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const filterCategories = [
    { id: 'all', label: { en: 'All Signature', ar: 'كافة المجموعة' } },
    { id: 'palaces', label: { en: 'Palaces & Mansions', ar: 'قصور وفلل' } },
    { id: 'penthouses', label: { en: 'Penthouses', ar: 'بنتهاوس' } },
    { id: 'waterfront', label: { en: 'Waterfront', ar: 'واجهات مائية' } },
    { id: 'skyvillas', label: { en: 'Sky Villas', ar: 'سكاي فيلا' } },
  ];

  // Category filtering with robust property matching
  const filteredProperties = useMemo(() => {
    switch (activeFilter) {
      case 'palaces':
        return properties.filter(
          (p) =>
            p.propertyType === 'Palatial Mansion' ||
            p.propertyType === 'Villa' ||
            p.title.en.toLowerCase().includes('palace') ||
            p.title.en.toLowerCase().includes('mansion') ||
            p.title.en.toLowerCase().includes('manor')
        );
      case 'penthouses':
        return properties.filter(
          (p) =>
            p.propertyType === 'Penthouse' ||
            p.title.en.toLowerCase().includes('penthouse')
        );
      case 'waterfront':
        return properties.filter(
          (p) =>
            p.propertyType === 'Waterfront Residence' ||
            p.specifications.view.toLowerCase().includes('sea') ||
            p.specifications.view.toLowerCase().includes('gulf') ||
            p.specifications.view.toLowerCase().includes('marina') ||
            p.amenities.some(
              (a) =>
                a.toLowerCase().includes('beach') ||
                a.toLowerCase().includes('waterfront') ||
                a.toLowerCase().includes('yacht')
            )
        );
      case 'skyvillas':
        return properties.filter(
          (p) =>
            p.propertyType === 'Sky Villa' ||
            p.propertyType === 'Duplex' ||
            p.title.en.toLowerCase().includes('sky') ||
            p.title.en.toLowerCase().includes('tower')
        );
      case 'all':
      default:
        return [...properties].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [activeFilter]);

  // Reset page indices when activeFilter changes
  useEffect(() => {
    setPageIdx(0);
    setActiveMobileIdx(0);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  // Track mobile carousel scroll position to update current active card & progress bar
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft } = mobileScrollRef.current;
    const firstCard = mobileScrollRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 280;
    const gap = 16;
    const effectiveScroll = isRTL ? Math.abs(scrollLeft) : scrollLeft;
    const calculatedIdx = Math.round(effectiveScroll / (cardWidth + gap));
    const boundedIdx = Math.min(filteredProperties.length - 1, Math.max(0, calculatedIdx));
    if (boundedIdx !== activeMobileIdx) {
      setActiveMobileIdx(boundedIdx);
    }
  };

  // Scroll mobile carousel programmatically via Next/Prev buttons
  const scrollMobileBy = (direction: 'prev' | 'next') => {
    if (!mobileScrollRef.current) return;
    const firstCard = mobileScrollRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 280;
    const gap = 16;
    const delta = (cardWidth + gap) * (direction === 'next' ? 1 : -1);
    const scrollAmount = isRTL ? -delta : delta;
    mobileScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Curation pagination for desktop
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / pageSize));
  
  const currentSet = useMemo(() => {
    const start = pageIdx * pageSize;
    return filteredProperties.slice(start, start + pageSize);
  }, [filteredProperties, pageIdx]);

  const featuredProperty = currentSet[0];
  const secondaryProperties = currentSet.slice(1, 3);

  const handleFavoriteClick = (e: React.MouseEvent, propId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(propId);
  };

  const handleCompareClick = (e: React.MouseEvent, prop: Property) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare(prop.id)) {
      removeFromCompare(prop.id);
    } else {
      addToCompare(prop);
    }
  };

  return (
    <section
      id="private-collection-section"
      className="py-16 sm:py-24 lg:py-32 bg-[#F8F7F4] relative overflow-hidden border-t border-[#E8E6E0]"
    >
      {/* Subtle Architectural Grid Texture in Background */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#111715 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= 1. HEADER SECTION ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 lg:mb-16 gap-6 sm:gap-8">
          <div className="max-w-3xl">
            {/* Architectural Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E6E0] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B49A70] mb-3 sm:mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRTL ? 'المجموعة الخاصة — الأرشيف الحصري' : 'PRIVATE COLLECTION • CURATED ARCHIVE'}</span>
            </div>

            {/* Main Section Heading */}
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#17201C] tracking-tight leading-[1.15]">
              {t('properties.featuredTitle')}
            </h2>

            {/* Supporting Architectural Subtitle */}
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-[#777C76] font-light leading-relaxed max-w-2xl">
              {t('properties.featuredSubtitle')}
            </p>
          </div>

          {/* Right Header Action: Portfolio Explorer CTA (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <Link to="/properties">
              <Button
                variant="outline"
                size="md"
                className="group border-[#17201C] text-[#17201C] hover:bg-[#111715] hover:text-white transition-all text-xs tracking-wider uppercase px-5 py-2.5 font-medium"
                icon={
                  <ArrowUpRight className="w-4 h-4 text-[#B49A70] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
                }
              >
                <span>{t('properties.viewAll')}</span>
                <span className="text-[10px] opacity-60 ml-1.5 rtl:mr-1.5 font-mono">({properties.length}+)</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* ================= 2. HORIZONTALLY SCROLLABLE FILTER ROW ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 mb-6 sm:mb-10 border-b border-[#E8E6E0]">
          {/* Filter Pills with 44px min touch height on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {filterCategories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? properties.length
                  : cat.id === 'palaces'
                  ? properties.filter((p) => p.propertyType === 'Palatial Mansion' || p.propertyType === 'Villa').length
                  : cat.id === 'penthouses'
                  ? properties.filter((p) => p.propertyType === 'Penthouse').length
                  : cat.id === 'waterfront'
                  ? properties.filter((p) => p.propertyType === 'Waterfront Residence').length
                  : properties.filter((p) => p.propertyType === 'Sky Villa' || p.propertyType === 'Duplex').length;

              const isActive = activeFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative min-h-[44px] px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer select-none flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'text-[#F8F7F4]'
                      : 'text-[#777C76] hover:text-[#17201C] bg-white sm:bg-transparent border border-[#E8E6E0] sm:border-transparent'
                  }`}
                >
                  {/* Sliding Pill Background with Framer Motion */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#111715] rounded-full shadow-md"
                      transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label[lang]}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-[#B49A70] text-[#111715] font-bold' : 'bg-black/5 text-[#777C76]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop/Tablet Curation Set Controls */}
          {totalPages > 1 && (
            <div className="hidden sm:flex items-center gap-3 self-end sm:self-auto pb-2 sm:pb-0">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#777C76]">
                {isRTL ? `مجموعة منتقاة ٠${pageIdx + 1} / ٠${totalPages}` : `CURATION 0${pageIdx + 1} / 0${totalPages}`}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
                  disabled={pageIdx === 0}
                  className="w-8 h-8 rounded-full border border-[#E8E6E0] bg-white text-[#17201C] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B49A70] hover:text-[#B49A70] transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Previous Curation"
                >
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setPageIdx((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={pageIdx >= totalPages - 1}
                  className="w-8 h-8 rounded-full border border-[#E8E6E0] bg-white text-[#17201C] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B49A70] hover:text-[#B49A70] transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Next Curation"
                >
                  {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= 3A. MOBILE-FIRST SWIPEABLE SHOWCASE (< 768px) ================= */}
        <div className="block md:hidden">
          {/* Swiping Track with 10–15% Peek of Next Card & Snap Navigation */}
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 touch-pan-x"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredProperties.map((property, idx) => (
              <article
                key={`mobile-${property.id}`}
                className="w-[82vw] max-w-[340px] shrink-0 snap-start bg-white border border-[#E8E6E0] rounded-sm overflow-hidden shadow-lg flex flex-col justify-between select-none"
              >
                {/* 1. Large Portrait Architectural Image (Aspect 4:5) */}
                <div className="relative w-full aspect-[4/5] bg-[#18201D] overflow-hidden">
                  <Link to={`/properties/${property.slug}`} className="block w-full h-full">
                    <img
                      src={property.images[0]}
                      alt={property.title[lang]}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover transition-transform duration-700 active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 opacity-70" />
                  </Link>

                  {/* Clean Top Floating Bar: Category Badge + Favorite & Compare (44x44px Touch Targets) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-sm bg-[#111715]/90 backdrop-blur-md border border-[#B49A70]/50 text-[#B49A70] text-[9.5px] uppercase tracking-wider font-semibold shadow-xs">
                      {property.propertyType}
                    </span>

                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      {/* Compare Button */}
                      <button
                        onClick={(e) => handleCompareClick(e, property)}
                        title={isInCompare(property.id) ? t('properties.removeFromCompare') : t('properties.addToCompare')}
                        className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center backdrop-blur-md border transition-all active:scale-95 cursor-pointer ${
                          isInCompare(property.id)
                            ? 'bg-[#B49A70] border-[#B49A70] text-[#111715] shadow-md'
                            : 'bg-black/50 border-white/25 text-white active:bg-white active:text-[#111715]'
                        }`}
                        aria-label="Compare property"
                      >
                        <Layers className="w-4 h-4" />
                      </button>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => handleFavoriteClick(e, property.id)}
                        title={isFavorite(property.id) ? t('properties.saved') : t('properties.saveToFavorites')}
                        className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center backdrop-blur-md border transition-all active:scale-95 cursor-pointer ${
                          isFavorite(property.id)
                            ? 'bg-rose-600 border-rose-600 text-white shadow-md'
                            : 'bg-black/50 border-white/25 text-white active:bg-white active:text-rose-600'
                        }`}
                        aria-label="Save to favorites"
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Key Property Information Placed Below Image */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B49A70] font-medium mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B49A70] shrink-0" />
                      <span className="truncate">{property.location.area}</span>
                    </div>

                    {/* Title */}
                    <Link to={`/properties/${property.slug}`} className="block">
                      <h3 className="font-serif text-lg font-medium text-[#17201C] line-clamp-1 leading-snug hover:text-[#B49A70] transition-colors">
                        {property.title[lang]}
                      </h3>
                    </Link>

                    {/* Price Hierarchy */}
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-xl font-serif font-semibold text-[#17201C] tracking-tight">
                        {formatPrice(property.price, currency, lang)}
                      </span>
                      {property.listingType === 'rent' && (
                        <span className="text-[11px] text-[#777C76]">
                          / {isRTL ? 'شهرياً' : 'mo'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Specs & Explore CTA */}
                  <div className="mt-3.5 pt-3.5 border-t border-[#E8E6E0]">
                    {/* Specs Row */}
                    <div className="flex items-center justify-between text-xs text-[#777C76] font-medium mb-3.5">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#B49A70]" />
                        <span>{property.bedrooms} {t('properties.beds')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#B49A70]" />
                        <span>{property.bathrooms} {t('properties.baths')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#B49A70]" />
                        <span>{property.areaSqM} {t('properties.sqm')}</span>
                      </div>
                    </div>

                    {/* Full-Width Mobile CTA Button with 44px min touch target */}
                    <Link to={`/properties/${property.slug}`} className="block w-full">
                      <button
                        type="button"
                        className="w-full min-h-[44px] py-2.5 px-4 rounded-sm bg-[#111715] hover:bg-[#B49A70] text-[#F8F7F4] hover:text-[#111715] text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        <span>{isRTL ? 'استكشف المسكن' : 'Explore Residence'}</span>
                        <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 3. Mobile Touch Controls, Progress Bar & Live Counter */}
          <div className="mt-4 flex items-center justify-between px-1">
            {/* Slide Index Counter */}
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#777C76] font-medium">
              {isRTL
                ? `مسكن ٠${activeMobileIdx + 1} / ٠${filteredProperties.length}`
                : `RESIDENCE 0${activeMobileIdx + 1} / 0${filteredProperties.length}`}
            </span>

            {/* Dynamic Gold Progress Line */}
            <div className="flex-1 max-w-[130px] mx-4 h-1 bg-[#E8E6E0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#B49A70] rounded-full"
                animate={{
                  width: `${((activeMobileIdx + 1) / Math.max(1, filteredProperties.length)) * 100}%`
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Accessible Touch Arrows (44x44px Touch Targets) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollMobileBy('prev')}
                disabled={activeMobileIdx === 0}
                aria-label="Previous property slide"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#E8E6E0] bg-white flex items-center justify-center text-[#17201C] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B49A70] active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <button
                onClick={() => scrollMobileBy('next')}
                disabled={activeMobileIdx >= filteredProperties.length - 1}
                aria-label="Next property slide"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#E8E6E0] bg-white flex items-center justify-center text-[#17201C] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B49A70] active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Bottom Portfolio Link */}
          <div className="mt-8 pt-4 border-t border-[#E8E6E0] text-center">
            <Link to="/properties" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#17201C] hover:text-[#B49A70] transition-colors py-2">
              <span>{isRTL ? 'عرض كامل المحفظة (أكثر من ٤٠ مسكن)' : 'View Complete Portfolio (40+ Residences)'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#B49A70] rtl:rotate-90" />
            </Link>
          </div>
        </div>

        {/* ================= 3B. DESKTOP & TABLET ASYMMETRIC EDITORIAL SHOWCASE (>= 768px) ================= */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`desktop-${activeFilter}-${pageIdx}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* If 3+ properties: Asymmetric Grid (Left 7 cols / Right 5 cols) */}
              {currentSet.length >= 3 && featuredProperty && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  
                  {/* ----------------- LEFT FEATURED HERO PROPERTY (7 COLS) ----------------- */}
                  <div className="lg:col-span-7">
                    <motion.article
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative w-full h-[580px] sm:h-[640px] lg:h-[720px] rounded-sm overflow-hidden bg-[#111715] border border-[#222B26] shadow-2xl flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:border-[#B49A70]/60"
                    >
                      {/* Background Full-Bleed Architectural Image with Hover Zoom */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          src={featuredProperty.images[0]}
                          alt={featuredProperty.title[lang]}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111715] via-[#111715]/60 to-black/35 opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />
                      </div>

                      {/* Top Floating Strip: Category, Type & Action Buttons */}
                      <div className="relative z-10 flex items-center justify-between gap-3 pointer-events-none">
                        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
                          <span className="px-3 py-1.5 rounded-sm bg-[#111715]/85 backdrop-blur-md border border-[#B49A70]/50 text-[#B49A70] text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center gap-1.5 shadow-sm">
                            <Sparkles className="w-2.5 h-2.5 text-[#B49A70]" />
                            <span>{featuredProperty.propertyType}</span>
                          </span>
                          <span className="px-3 py-1.5 rounded-sm bg-white/15 backdrop-blur-md border border-white/25 text-white text-[10px] tracking-wider uppercase font-medium">
                            {featuredProperty.listingType === 'rent'
                              ? isRTL ? 'إيجار دبلوماسي فاخر' : 'Private Lease'
                              : isRTL ? 'تملك حر حصري' : 'Freehold Acquisition'}
                          </span>
                        </div>

                        {/* Action Icons: Favorite & Compare */}
                        <div className="flex items-center gap-2 pointer-events-auto">
                          <button
                            onClick={(e) => handleCompareClick(e, featuredProperty)}
                            title={isInCompare(featuredProperty.id) ? t('properties.removeFromCompare') : t('properties.addToCompare')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                              isInCompare(featuredProperty.id)
                                ? 'bg-[#B49A70] border-[#B49A70] text-[#111715] shadow-lg'
                                : 'bg-black/40 border-white/20 text-white hover:bg-white hover:text-[#111715]'
                            }`}
                            aria-label="Compare property"
                          >
                            <Layers className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => handleFavoriteClick(e, featuredProperty.id)}
                            title={isFavorite(featuredProperty.id) ? t('properties.saved') : t('properties.saveToFavorites')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                              isFavorite(featuredProperty.id)
                                ? 'bg-rose-600 border-rose-600 text-white shadow-lg'
                                : 'bg-black/40 border-white/20 text-white hover:bg-white hover:text-rose-600'
                            }`}
                            aria-label="Save to favorites"
                          >
                            <Heart className={`w-4 h-4 ${isFavorite(featuredProperty.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Editorial Content Panel */}
                      <div className="relative z-10 pt-16">
                        {/* Location Badge */}
                        <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[#B49A70] font-semibold mb-2.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B49A70] shrink-0" />
                          <span>{featuredProperty.location.area}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/70">{featuredProperty.location.address}</span>
                        </div>

                        {/* Title */}
                        <Link to={`/properties/${featuredProperty.slug}`} className="block group/link">
                          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight group-hover/link:text-[#D4C3A3] transition-colors duration-300">
                            {featuredProperty.title[lang]}
                          </h3>
                        </Link>

                        {/* Narrative */}
                        <p className="mt-3 text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2 max-w-2xl">
                          {featuredProperty.description[lang]}
                        </p>

                        {/* Specifications Strip */}
                        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-3 sm:grid-cols-4 gap-3 text-white/90">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-[#B49A70] shrink-0" />
                            <span className="text-xs font-medium">{featuredProperty.bedrooms} {t('properties.beds')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="w-4 h-4 text-[#B49A70] shrink-0" />
                            <span className="text-xs font-medium">{featuredProperty.bathrooms} {t('properties.baths')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Maximize2 className="w-4 h-4 text-[#B49A70] shrink-0" />
                            <span className="text-xs font-medium">{featuredProperty.areaSqM} {t('properties.sqm')}</span>
                          </div>
                          {featuredProperty.landAreaSqM && (
                            <div className="hidden sm:flex items-center gap-2 text-white/70">
                              <Compass className="w-4 h-4 text-[#B49A70] shrink-0" />
                              <span className="text-xs font-light">{featuredProperty.landAreaSqM} {isRTL ? 'م² أرض' : 'sq m Plot'}</span>
                            </div>
                          )}
                        </div>

                        {/* Price & Primary CTA */}
                        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 block mb-0.5">
                              {isRTL ? 'القيمة التقديرية' : 'PRICE ON APPLICATION / ACQUISITION'}
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-tight">
                                {formatPrice(featuredProperty.price, currency, lang)}
                              </span>
                              {featuredProperty.listingType === 'rent' && (
                                <span className="text-xs text-white/70">
                                  / {isRTL ? 'شهرياً' : 'mo'}
                                </span>
                              )}
                            </div>
                          </div>

                          <Link to={`/properties/${featuredProperty.slug}`}>
                            <button
                              type="button"
                              className="px-6 py-3 rounded-sm bg-[#B49A70] hover:bg-[#D4C3A3] text-[#111715] font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#B49A70]/30 cursor-pointer"
                            >
                              <span>{isRTL ? 'استكشف المسكن الملكي' : 'Explore Residence'}</span>
                              <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  </div>

                  {/* ----------------- RIGHT STACKED SHOWCASES (5 COLS) ----------------- */}
                  <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
                    {secondaryProperties.map((property, idx) => (
                      <motion.article
                        key={property.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: 0.15 * (idx + 1), ease: [0.22, 1, 0.36, 1] }}
                        className="group relative w-full h-[320px] sm:h-[340px] lg:h-[344px] rounded-sm overflow-hidden bg-[#111715] border border-[#222B26] shadow-xl flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 hover:border-[#B49A70]/60"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            src={property.images[0]}
                            alt={property.title[lang]}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111715] via-[#111715]/70 to-black/30 opacity-90 transition-opacity duration-500 group-hover:opacity-85" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-70" />
                        </div>

                        {/* Top: Category & Actions */}
                        <div className="relative z-10 flex items-center justify-between gap-2 pointer-events-none">
                          <span className="px-2.5 py-1 rounded-sm bg-[#111715]/85 backdrop-blur-md border border-[#B49A70]/40 text-[#B49A70] text-[9.5px] tracking-[0.18em] uppercase font-semibold shadow-xs">
                            {property.propertyType}
                          </span>

                          <div className="flex items-center gap-1.5 pointer-events-auto">
                            <button
                              onClick={(e) => handleCompareClick(e, property)}
                              title={isInCompare(property.id) ? t('properties.removeFromCompare') : t('properties.addToCompare')}
                              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                                isInCompare(property.id)
                                  ? 'bg-[#B49A70] border-[#B49A70] text-[#111715]'
                                  : 'bg-black/40 border-white/20 text-white hover:bg-white hover:text-[#111715]'
                              }`}
                              aria-label="Compare property"
                            >
                              <Layers className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={(e) => handleFavoriteClick(e, property.id)}
                              title={isFavorite(property.id) ? t('properties.saved') : t('properties.saveToFavorites')}
                              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                                isFavorite(property.id)
                                  ? 'bg-rose-600 border-rose-600 text-white'
                                  : 'bg-black/40 border-white/20 text-white hover:bg-white hover:text-rose-600'
                              }`}
                              aria-label="Save to favorites"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Bottom: Location, Title, Specs & Price */}
                        <div className="relative z-10 pt-4">
                          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#B49A70] font-medium mb-1">
                            <MapPin className="w-3 h-3 text-[#B49A70] shrink-0" />
                            <span>{property.location.area}</span>
                          </div>

                          <Link to={`/properties/${property.slug}`} className="block group/link">
                            <h4 className="font-serif text-lg sm:text-xl font-normal text-white leading-snug line-clamp-1 group-hover/link:text-[#D4C3A3] transition-colors">
                              {property.title[lang]}
                            </h4>
                          </Link>

                          <div className="mt-3 pt-3 border-t border-white/15 flex items-center gap-4 text-xs text-white/80 font-light">
                            <div className="flex items-center gap-1.5">
                              <Bed className="w-3.5 h-3.5 text-[#B49A70]" />
                              <span>{property.bedrooms} {t('properties.beds')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Bath className="w-3.5 h-3.5 text-[#B49A70]" />
                              <span>{property.bathrooms} {t('properties.baths')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Maximize2 className="w-3.5 h-3.5 text-[#B49A70]" />
                              <span>{property.areaSqM} {t('properties.sqm')}</span>
                            </div>
                          </div>

                          <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between">
                            <span className="text-lg sm:text-xl font-serif font-medium text-white tracking-tight">
                              {formatPrice(property.price, currency, lang)}
                            </span>

                            <Link
                              to={`/properties/${property.slug}`}
                              className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#B49A70] hover:text-[#D4C3A3] font-semibold transition-colors"
                            >
                              <span>{isRTL ? 'تفاصيل' : 'Explore'}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>

                </div>
              )}

              {/* If 2 properties: Balanced 2-Column Split */}
              {currentSet.length === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {currentSet.map((property, idx) => (
                    <motion.article
                      key={property.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: idx * 0.15 }}
                      className="group relative w-full h-[520px] sm:h-[580px] rounded-sm overflow-hidden bg-[#111715] border border-[#222B26] shadow-xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 hover:border-[#B49A70]/60"
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          src={property.images[0]}
                          alt={property.title[lang]}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111715] via-[#111715]/70 to-black/35 opacity-90" />
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-3 py-1.5 rounded-sm bg-[#111715]/85 backdrop-blur-md border border-[#B49A70]/40 text-[#B49A70] text-[10px] tracking-widest uppercase font-semibold">
                          {property.propertyType}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleCompareClick(e, property)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                              isInCompare(property.id) ? 'bg-[#B49A70] text-[#111715]' : 'bg-black/40 text-white'
                            }`}
                          >
                            <Layers className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleFavoriteClick(e, property.id)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                              isFavorite(property.id) ? 'bg-rose-600 text-white' : 'bg-black/40 text-white'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <div className="relative z-10 pt-8">
                        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B49A70] font-semibold mb-2">
                          <MapPin className="w-3.5 h-3.5 text-[#B49A70]" />
                          <span>{property.location.area}</span>
                        </div>
                        <Link to={`/properties/${property.slug}`}>
                          <h3 className="font-serif text-2xl font-normal text-white leading-tight hover:text-[#D4C3A3] transition-colors">
                            {property.title[lang]}
                          </h3>
                        </Link>
                        <div className="mt-4 pt-4 border-t border-white/15 flex items-center gap-5 text-xs text-white/80">
                          <span>{property.bedrooms} {t('properties.beds')}</span>
                          <span>•</span>
                          <span>{property.bathrooms} {t('properties.baths')}</span>
                          <span>•</span>
                          <span>{property.areaSqM} {t('properties.sqm')}</span>
                        </div>
                        <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                          <span className="text-2xl font-serif text-white font-medium">
                            {formatPrice(property.price, currency, lang)}
                          </span>
                          <Link to={`/properties/${property.slug}`}>
                            <button className="px-5 py-2.5 rounded-sm bg-[#B49A70] text-[#111715] font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
                              <span>{isRTL ? 'استكشف' : 'Explore'}</span>
                              <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* If 1 property: Full Width Panoramic Masterpiece */}
              {currentSet.length === 1 && (
                <div className="w-full">
                  <motion.article
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="group relative w-full h-[520px] sm:h-[600px] rounded-sm overflow-hidden bg-[#111715] border border-[#222B26] shadow-2xl flex flex-col justify-between p-8 sm:p-12 transition-all duration-500 hover:border-[#B49A70]/60"
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={currentSet[0].images[0]}
                        alt={currentSet[0].title[lang]}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111715] via-[#111715]/70 to-black/35 opacity-90" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3.5 py-1.5 rounded-sm bg-[#111715]/90 border border-[#B49A70] text-[#B49A70] text-xs tracking-widest uppercase font-semibold">
                        {currentSet[0].propertyType}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleCompareClick(e, currentSet[0])}
                          className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border ${
                            isInCompare(currentSet[0].id) ? 'bg-[#B49A70] text-[#111715]' : 'bg-black/40 text-white'
                          }`}
                        >
                          <Layers className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleFavoriteClick(e, currentSet[0].id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border ${
                            isFavorite(currentSet[0].id) ? 'bg-rose-600 text-white' : 'bg-black/40 text-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFavorite(currentSet[0].id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="relative z-10 max-w-3xl">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B49A70] font-semibold mb-2">
                        <MapPin className="w-4 h-4 text-[#B49A70]" />
                        <span>{currentSet[0].location.area}</span>
                      </div>
                      <Link to={`/properties/${currentSet[0].slug}`}>
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight hover:text-[#D4C3A3] transition-colors">
                          {currentSet[0].title[lang]}
                        </h3>
                      </Link>
                      <p className="mt-3 text-sm text-white/80 font-light line-clamp-2">
                        {currentSet[0].description[lang]}
                      </p>
                      <div className="mt-6 pt-5 border-t border-white/20 flex flex-wrap items-center justify-between gap-6">
                        <span className="text-3xl font-serif text-white font-medium">
                          {formatPrice(currentSet[0].price, currency, lang)}
                        </span>
                        <Link to={`/properties/${currentSet[0].slug}`}>
                          <button className="px-7 py-3 rounded-sm bg-[#B49A70] text-[#111715] font-semibold text-xs tracking-widest uppercase flex items-center gap-2">
                            <span>{isRTL ? 'استكشف المسكن' : 'Explore Residence'}</span>
                            <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Desktop Bottom Archive Footer */}
          <div className="mt-16 pt-8 border-t border-[#E8E6E0] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#777C76]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B49A70]" />
              <span className="font-serif text-[#17201C] font-medium text-sm">
                {isRTL ? 'المحفظة الخاصة للعقارات السكنية الفاخرة' : 'Private Archive Portfolio • Doha & Lusail'}
              </span>
            </div>

            <Link to="/properties" className="inline-flex items-center gap-2 font-medium text-[#17201C] hover:text-[#B49A70] transition-colors uppercase tracking-wider group">
              <span>{isRTL ? 'تصفح جميع العقارات (أكثر من ٤٠ مسكن)' : 'Browse Full Residential Catalog (40+ Residences)'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#B49A70] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
