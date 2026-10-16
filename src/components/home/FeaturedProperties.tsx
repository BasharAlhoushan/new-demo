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
import { localizePropertyType, localizeAreaName } from '../../utils/localize';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { Button } from '../common/Button';

// Category matching helper shared across filters and counts
const matchesCategory = (p: Property, categoryId: string): boolean => {
  switch (categoryId) {
    case 'palaces':
      return (
        p.propertyType === 'Palatial Mansion' ||
        p.propertyType === 'Villa' ||
        p.title.en.toLowerCase().includes('palace') ||
        p.title.en.toLowerCase().includes('mansion') ||
        p.title.en.toLowerCase().includes('manor')
      );
    case 'penthouses':
      return (
        p.propertyType === 'Penthouse' ||
        p.title.en.toLowerCase().includes('penthouse')
      );
    case 'waterfront':
      return (
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
      return (
        p.propertyType === 'Sky Villa' ||
        p.propertyType === 'Duplex' ||
        p.title.en.toLowerCase().includes('sky') ||
        p.title.en.toLowerCase().includes('tower')
      );
    case 'all':
    default:
      return true;
  }
};

const FILTER_CATEGORIES = [
  { id: 'all', label: { en: 'All Signature', ar: 'كافة المجموعة' } },
  { id: 'palaces', label: { en: 'Palaces & Mansions', ar: 'قصور وفلل' } },
  { id: 'penthouses', label: { en: 'Penthouses', ar: 'بنتهاوس' } },
  { id: 'waterfront', label: { en: 'Waterfront', ar: 'واجهات مائية' } },
  { id: 'skyvillas', label: { en: 'Sky Villas', ar: 'سكاي فيلا' } },
];

interface MobilePropertyCardProps {
  property: Property;
  idx: number;
  isActive: boolean;
  lang: 'en' | 'ar';
  isRTL: boolean;
  currency: string;
  isFavorite: boolean;
  isInCompare: boolean;
  onFavoriteClick: (e: React.MouseEvent, id: string) => void;
  onCompareClick: (e: React.MouseEvent, prop: Property) => void;
  t: (key: string) => string;
}

const MobilePropertyCard: React.FC<MobilePropertyCardProps> = ({
  property,
  idx,
  lang,
  isRTL,
  currency,
  isFavorite,
  isInCompare,
  onFavoriteClick,
  onCompareClick,
  t,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="w-full bg-white border border-[#E7E3DA] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_2px_12px_rgba(16,33,43,0.04)] select-none">
      {/* 1. Cinematic Architectural Photography (16:9 Aspect Ratio) */}
      <div className="relative w-full aspect-[16/9] bg-[#10212B] overflow-hidden">
        <Link to={`/properties/${property.slug}`} className="block w-full h-full">
          <img
            src={property.images[0]}
            alt={property.title[lang]}
            loading={idx === 0 ? 'eager' : 'lazy'}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </Link>

        {/* Minimal Semi-Transparent Overlay Controls (40px) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="pointer-events-auto inline-flex items-center px-2.5 py-1 rounded-full bg-[#10212B]/75 backdrop-blur-md border border-white/20 text-[#B69A70] text-[10px] uppercase font-semibold tracking-wider shadow-xs">
            <span>{localizePropertyType(property.propertyType, lang)}</span>
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Button (40px) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => onCompareClick(e, property)}
              title={isInCompare ? t('properties.removeFromCompare') : t('properties.addToCompare')}
              aria-label="Compare property"
              className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center backdrop-blur-md border transition-colors cursor-pointer ${
                isInCompare
                  ? 'bg-[#B69A70] border-[#B69A70] text-[#10212B] shadow-sm'
                  : 'bg-[#10212B]/45 border-white/20 text-white hover:text-[#B69A70]'
              }`}
            >
              <Layers className="w-4 h-4" />
            </motion.button>

            {/* Favorite Button (40px) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => onFavoriteClick(e, property.id)}
              title={isFavorite ? t('properties.saved') : t('properties.saveToFavorites')}
              aria-label="Save to favorites"
              className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center backdrop-blur-md border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-[#10212B]/90 border-[#B69A70] text-[#B69A70] shadow-sm'
                  : 'bg-[#10212B]/45 border-white/20 text-white hover:text-[#B69A70]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-[#B69A70]' : ''}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Card Content with Exact Specified Hierarchy (16px padding) */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* 1. Location and Property Type */}
          <div className="flex items-center justify-between gap-2 text-[12.5px] mb-1.5">
            <div className="flex items-center gap-1.5 text-[#B69A70] font-medium uppercase tracking-wider truncate">
              <MapPin className="w-3.5 h-3.5 text-[#B69A70] shrink-0" />
              <span className="truncate">{localizeAreaName(property.location.area, lang)}</span>
            </div>
            <span className="text-[11px] font-mono text-[#727A7B] shrink-0 uppercase tracking-wider">
              {property.listingType === 'rent' ? (isRTL ? 'إيجار' : 'Lease') : (isRTL ? 'تملك حر' : 'Freehold')}
            </span>
          </div>

          {/* 2. Property Title (18-20px, max 2 lines, no single-line truncation) */}
          <Link to={`/properties/${property.slug}`} className="block group/title mb-2">
            <h3 className="font-serif text-[18px] sm:text-[19px] font-medium text-[#10212B] leading-snug line-clamp-2 min-h-[46px] group-hover/title:text-[#B69A70] transition-colors">
              {property.title[lang]}
            </h3>
          </Link>

          {/* 3. Price (22-25px, weight 600, proper currency formatting) */}
          <div className="mb-3 flex items-baseline gap-1.5">
            <span className="text-[22px] sm:text-[24px] font-serif font-semibold text-[#10212B] tracking-tight">
              {formatPrice(property.price, currency, lang)}
            </span>
            {property.listingType === 'rent' && (
              <span className="text-xs text-[#727A7B] font-light">
                / {isRTL ? 'شهرياً' : 'mo'}
              </span>
            )}
          </div>
        </div>

        <div>
          {/* 4. Compact Specifications (12-13px, 3 equal columns) */}
          <div className="grid grid-cols-3 gap-1 py-3 border-y border-[#E7E3DA] text-[#727A7B] text-[12.5px] font-medium mb-4">
            <div className="flex items-center justify-center gap-1.5 px-1">
              <Bed className="w-3.5 h-3.5 text-[#B69A70] shrink-0" />
              <span className="truncate">{property.bedrooms} {t('properties.beds')}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-1 border-x border-[#E7E3DA]">
              <Bath className="w-3.5 h-3.5 text-[#B69A70] shrink-0" />
              <span className="truncate">{property.bathrooms} {t('properties.baths')}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#B69A70] shrink-0" />
              <span className="truncate">{property.areaSqM} {t('properties.sqm')}</span>
            </div>
          </div>

          {/* 5. Full-Width CTA (48px height, dark navy background, white text) */}
          <Link to={`/properties/${property.slug}`} className="block w-full">
            <button
              type="button"
              className="group w-full h-12 min-h-[48px] rounded-[10px] bg-[#10212B] hover:bg-[#B69A70] active:bg-[#9A8159] text-white hover:text-[#10212B] text-xs uppercase tracking-[0.16em] rtl:tracking-normal font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <span>{isRTL ? 'استكشف العقار' : 'Explore Residence'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#B69A70] group-hover:text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90 rtl:group-hover:-translate-x-0.5" />
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

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
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Accurate category counts synchronized with filter logic
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FILTER_CATEGORIES.forEach((cat) => {
      counts[cat.id] = properties.filter((p) => matchesCategory(p, cat.id)).length;
    });
    return counts;
  }, []);

  // Category filtering with robust property matching
  const filteredProperties = useMemo(() => {
    if (activeFilter === 'all') {
      return [...properties].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return properties.filter((p) => matchesCategory(p, activeFilter));
  }, [activeFilter]);

  // Reset page indices and scroll position when activeFilter changes
  useEffect(() => {
    setPageIdx(0);
    setActiveMobileIdx(0);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  // Clamp activeMobileIdx when filtered dataset length changes
  useEffect(() => {
    if (activeMobileIdx >= filteredProperties.length && filteredProperties.length > 0) {
      setActiveMobileIdx(filteredProperties.length - 1);
    }
  }, [filteredProperties.length, activeMobileIdx]);

  // Keep activeMobileIdx synchronized using IntersectionObserver
  useEffect(() => {
    const track = mobileScrollRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute('data-index');
            if (idxAttr !== null) {
              const idx = parseInt(idxAttr, 10);
              if (!isNaN(idx)) {
                setActiveMobileIdx(idx);
              }
            }
          }
        });
      },
      {
        root: track,
        threshold: 0.6,
      }
    );

    const cards = track.querySelectorAll('[data-index]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProperties]);

  // Mobile scroll handler fallback
  const handleMobileScroll = () => {
    const track = mobileScrollRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-index]');
    if (!cards.length) return;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < minDistance) {
        minDistance = distance;
        const idxAttr = card.getAttribute('data-index');
        if (idxAttr) closestIdx = parseInt(idxAttr, 10);
      }
    });

    if (closestIdx !== activeMobileIdx) {
      setActiveMobileIdx(closestIdx);
    }
  };

  // Scroll to slide by index smoothly in both LTR & RTL
  const scrollToSlide = (idx: number) => {
    const targetIdx = Math.max(0, Math.min(filteredProperties.length - 1, idx));
    const card = cardRefs.current[targetIdx];
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      });
    }
    setActiveMobileIdx(targetIdx);
  };

  // Accessible keyboard arrow navigation
  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (isRTL) {
        scrollToSlide(activeMobileIdx + 1);
      } else {
        scrollToSlide(activeMobileIdx - 1);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (isRTL) {
        scrollToSlide(activeMobileIdx - 1);
      } else {
        scrollToSlide(activeMobileIdx + 1);
      }
    }
  };

  // Format index counter (e.g. 01 / 08 or ٠١ / ٠٨)
  const formatCounter = (num: number) => {
    if (isRTL) {
      return new Intl.NumberFormat('ar-QA', { minimumIntegerDigits: 2 }).format(num);
    }
    return String(num).padStart(2, '0');
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
      className="py-12 sm:py-20 lg:py-32 bg-[#F7F5F0] relative overflow-hidden border-t border-[#E7E3DA]"
    >
      {/* Subtle Architectural Grid Texture in Background */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10212B 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= 1. SECTION HEADER (REFINED LUXURY EDITORIAL) ================= */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-5 sm:mb-8 lg:mb-14 gap-4 sm:gap-6"
        >
          <div className="max-w-3xl">
            {/* Architectural Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E7E3DA] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] rtl:tracking-normal font-semibold text-[#B69A70] mb-2.5 sm:mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>{isRTL ? 'المجموعة الخاصة — الأرشيف الحصري' : 'PRIVATE COLLECTION • CURATED ARCHIVE'}</span>
            </div>

            {/* Main Section Heading */}
            <h2 className="font-serif text-[28px] sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#10212B] tracking-tight leading-[1.18]">
              {t('properties.featuredTitle')}
            </h2>

            {/* Supporting Architectural Subtitle */}
            <p className="mt-2 sm:mt-3.5 text-[13px] sm:text-sm md:text-base text-[#727A7B] font-light leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
              {t('properties.featuredSubtitle')}
            </p>
          </div>

          {/* Right Header Action: Portfolio Explorer CTA (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <Link to="/properties">
              <Button
                variant="outline"
                size="md"
                className="group border-[#10212B] text-[#10212B] hover:bg-[#10212B] hover:text-white transition-all text-xs tracking-wider uppercase px-5 py-2.5 font-medium"
                icon={
                  <ArrowUpRight className="w-4 h-4 text-[#B69A70] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
                }
              >
                <span>{t('properties.viewAll')}</span>
                <span className="text-[10px] opacity-60 ml-1.5 rtl:mr-1.5 font-mono">({properties.length}+)</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ================= 2. HORIZONTALLY SCROLLABLE FILTER ROW ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-2 mb-6 sm:mb-10 border-b border-[#E7E3DA]">
          {/* Filter Pills with compact 38-42px touch height on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {FILTER_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              const isActive = activeFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative h-[38px] sm:h-10 px-3.5 sm:px-4 rounded-full text-xs uppercase tracking-wider font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer select-none flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#727A7B] hover:text-[#10212B] bg-white border border-[#E7E3DA]'
                  }`}
                >
                  {/* Sliding Pill Background with Framer Motion */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#10212B] rounded-full shadow-sm"
                      transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label[lang]}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                      isActive ? 'bg-[#B69A70] text-[#10212B] font-bold' : 'bg-[#F7F5F0] text-[#727A7B]'
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
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#727A7B]">
                {isRTL ? `مجموعة منتقاة ٠${pageIdx + 1} / ٠${totalPages}` : `CURATION 0${pageIdx + 1} / 0${totalPages}`}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
                  disabled={pageIdx === 0}
                  className="w-8 h-8 rounded-full border border-[#E7E3DA] bg-white text-[#10212B] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B69A70] hover:text-[#B69A70] transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Previous Curation"
                >
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setPageIdx((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={pageIdx >= totalPages - 1}
                  className="w-8 h-8 rounded-full border border-[#E7E3DA] bg-white text-[#10212B] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B69A70] hover:text-[#B69A70] transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Next Curation"
                >
                  {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= 3A. MOBILE LUXURY SWIPE CAROUSEL (< 768px) ================= */}
        <div className="block md:hidden">
          {filteredProperties.length === 0 ? (
            /* Graceful Empty State */
            <div className="bg-white border border-[#E7E3DA] rounded-[16px] p-8 text-center my-4 mx-1 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#F7F5F0] text-[#B69A70] flex items-center justify-center mx-auto mb-3">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg text-[#10212B] font-medium mb-1">
                {isRTL ? 'لا توجد مساكن في هذا التصنيف' : 'No Residences Found'}
              </h4>
              <p className="text-xs text-[#727A7B] max-w-xs mx-auto mb-4 font-light">
                {isRTL
                  ? 'يرجى اختيار تصنيف آخر لاستعراض التحف المعمارية المتاحة.'
                  : 'Please choose another collection category to view available residences.'}
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 rounded-full bg-[#10212B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#B69A70] transition-colors cursor-pointer"
              >
                {isRTL ? 'عرض كافة المجموعة' : 'View All Signature'}
              </button>
            </div>
          ) : (
            <>
              {/* 100% Full-Width Single-Card Track: Exactly 1 Card Visible, Zero Peeking, Zero Overflow */}
              <div className="w-full overflow-hidden rounded-[16px]">
                <div
                  ref={mobileScrollRef}
                  onScroll={handleMobileScroll}
                  onKeyDown={handleCarouselKeyDown}
                  tabIndex={0}
                  role="region"
                  aria-label={isRTL ? 'معرض المساكن المختارة' : 'Curated Residences Carousel'}
                  className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x overscroll-x-contain select-none focus:outline-none"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollSnapType: 'x mandatory',
                  }}
                >
                  {filteredProperties.map((property, idx) => (
                    <div
                      key={`mobile-slide-${property.id}`}
                      data-index={idx}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      className="w-full shrink-0 snap-center snap-always"
                    >
                      <MobilePropertyCard
                        property={property}
                        idx={idx}
                        isActive={idx === activeMobileIdx}
                        lang={lang}
                        isRTL={isRTL}
                        currency={currency}
                        isFavorite={isFavorite(property.id)}
                        isInCompare={isInCompare(property.id)}
                        onFavoriteClick={handleFavoriteClick}
                        onCompareClick={handleCompareClick}
                        t={t}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Pagination Dots, Slide Counter & Compact Prev/Next Controls */}
              <div className="mt-4 flex items-center justify-between px-0.5">
                {/* Compact Slide Counter */}
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#727A7B] font-medium shrink-0">
                  {isRTL
                    ? `مسكن ${formatCounter(activeMobileIdx + 1)} / ${formatCounter(filteredProperties.length)}`
                    : `RESIDENCE ${formatCounter(activeMobileIdx + 1)} / ${formatCounter(filteredProperties.length)}`}
                </span>

                {/* Minimal Pagination Dots */}
                <div className="flex items-center gap-1.5 mx-2 overflow-x-auto scrollbar-none py-1">
                  {filteredProperties.slice(0, 10).map((_, dotIdx) => {
                    const isDotActive = dotIdx === activeMobileIdx;
                    return (
                      <button
                        key={`dot-${dotIdx}`}
                        onClick={() => scrollToSlide(dotIdx)}
                        aria-label={`Go to residence ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isDotActive
                            ? 'w-5 bg-[#B69A70]'
                            : 'w-1.5 bg-[#E7E3DA] hover:bg-[#B69A70]/60'
                        }`}
                      />
                    );
                  })}
                  {filteredProperties.length > 10 && (
                    <span className="text-[10px] text-[#727A7B] font-mono leading-none">
                      +{filteredProperties.length - 10}
                    </span>
                  )}
                </div>

                {/* Accessible Minimal Touch Arrows (40x40px) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => scrollToSlide(activeMobileIdx - 1)}
                    disabled={activeMobileIdx === 0}
                    aria-label="Previous residence"
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-[#E7E3DA] bg-white flex items-center justify-center text-[#10212B] disabled:opacity-25 disabled:cursor-not-allowed hover:border-[#B69A70] hover:text-[#B69A70] active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => scrollToSlide(activeMobileIdx + 1)}
                    disabled={activeMobileIdx >= filteredProperties.length - 1}
                    aria-label="Next residence"
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-[#E7E3DA] bg-white flex items-center justify-center text-[#10212B] disabled:opacity-25 disabled:cursor-not-allowed hover:border-[#B69A70] hover:text-[#B69A70] active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Mobile Bottom Portfolio Link */}
              <div className="mt-6 pt-4 border-t border-[#E7E3DA] text-center">
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#10212B] hover:text-[#B69A70] transition-colors py-1"
                >
                  <span>{isRTL ? 'عرض كامل المحفظة (أكثر من ٤٠ مسكن)' : 'View Complete Portfolio (40+ Residences)'}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B69A70] rtl:rotate-90" />
                </Link>
              </div>
            </>
          )}
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
                  <div className="lg:col-span-5 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-6 lg:gap-8 justify-between">
                    {secondaryProperties.map((property, idx) => (
                      <motion.article
                        key={property.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: 0.15 * (idx + 1), ease: [0.22, 1, 0.36, 1] }}
                        className="group relative w-full h-[320px] sm:h-[340px] md:h-[380px] lg:h-[344px] rounded-sm overflow-hidden bg-[#111715] border border-[#222B26] shadow-xl flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 hover:border-[#B49A70]/60"
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
