import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Layers, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';
import { Property } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { localizeAreaName, localizePropertyType } from '../../utils/localize';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
  index?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  viewMode = 'grid',
  index = 0,
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const isRTL = lang === 'ar';
  const { currency } = useCurrencyStore();

  const isFavorite = useFavoritesStore((s) => s.isFavorite(property.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const isInCompare = useCompareStore((s) => s.isInCompare(property.id));
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);

  // Multi-image gallery state
  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left
        if (isRTL) prevImage();
        else nextImage();
      } else {
        // Swiped right
        if (isRTL) nextImage();
        else prevImage();
      }
    }
    setTouchStartX(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const isGrid = viewMode === 'grid';
  const isRent = property.listingType === 'rent';

  // WhatsApp quick inquiry URL
  const whatsAppMessage = lang === 'ar'
    ? `مرحباً، أود الاستفسار عن العقار: ${property.title.ar} (${property.location.area})`
    : `Hello, I'd like to inquire about: ${property.title.en} (${property.location.area})`;
  const whatsAppUrl = `https://wa.me/97444998800?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className={`group relative bg-white border border-[#E7E3DA] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#B69A70]/50 ${
        isGrid ? 'flex flex-col' : 'flex flex-col md:flex-row'
      }`}
    >
      {/* 1. Property Image Section with swipeable gallery */}
      <div
        className={`relative overflow-hidden bg-[#10212B] select-none ${
          isGrid ? 'w-full aspect-[16/10]' : 'w-full md:w-5/12 md:min-h-[260px]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Link to={`/properties/${property.slug}`} className="block w-full h-full">
          <img
            src={images[currentImageIndex]}
            alt={property.title[lang]}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </Link>

        {/* Top Badges (Listing Type & Property Type) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
            <span
              className={`px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md shadow-sm uppercase ${
                isRent
                  ? 'bg-[#174B65] text-white'
                  : 'bg-[#10212B] text-[#B69A70]'
              }`}
            >
              {isRent ? (lang === 'ar' ? 'للإيجار' : 'For Rent') : (lang === 'ar' ? 'للبيع' : 'For Sale')}
            </span>

            <span className="px-2.5 py-1 text-[11px] font-medium bg-white/95 text-[#10212B] rounded-md shadow-sm backdrop-blur-sm">
              {localizePropertyType(property.propertyType, lang)}
            </span>
          </div>

          {/* Quick Actions (Favorite & Compare) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Toggle */}
            <button
              type="button"
              onClick={handleCompareClick}
              aria-label={isInCompare ? t('properties.removeFromCompare') : t('properties.addToCompare')}
              title={isInCompare ? t('properties.removeFromCompare') : t('properties.addToCompare')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-sm ${
                isInCompare
                  ? 'bg-[#B69A70] text-[#10212B]'
                  : 'bg-black/45 text-white hover:bg-white hover:text-[#10212B]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Toggle */}
            <button
              type="button"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? t('properties.saved') : t('properties.saveToFavorites')}
              title={isFavorite ? t('properties.saved') : t('properties.saveToFavorites')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-sm ${
                isFavorite
                  ? 'bg-rose-600 text-white'
                  : 'bg-black/45 text-white hover:bg-white hover:text-rose-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Gallery Prev/Next Desktop Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous image"
              className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white hover:bg-white hover:text-[#10212B] items-center justify-center backdrop-blur-sm transition-all z-10"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white hover:bg-white hover:text-[#10212B] items-center justify-center backdrop-blur-sm transition-all z-10"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none z-10">
              {images.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImageIndex
                      ? 'w-4 bg-[#B69A70]'
                      : 'w-1.5 bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 2. Property Content Section */}
      <div className={`p-4 sm:p-5 flex flex-col justify-between flex-1 ${!isGrid ? 'md:p-6' : ''}`}>
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <div className="text-xl sm:text-2xl font-serif font-semibold text-[#10212B] tracking-tight">
              {formatPrice(property.price, currency, lang)}
              {isRent && (
                <span className="text-xs font-sans font-normal text-[#727A7B] ml-1.5 rtl:mr-1.5">
                  / {lang === 'ar' ? 'شهر' : 'month'}
                </span>
              )}
            </div>

            {property.exclusive && (
              <span className="text-[10px] uppercase font-semibold text-[#B69A70] tracking-wider shrink-0 bg-[#B69A70]/10 px-2 py-0.5 rounded">
                {lang === 'ar' ? 'حصري' : 'Exclusive'}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#727A7B] mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#B69A70] shrink-0" />
            <span className="truncate">{localizeAreaName(property.location.area, lang)}</span>
          </div>

          {/* Property Title */}
          <Link
            to={`/properties/${property.slug}`}
            className="block group-hover:text-[#174B65] transition-colors"
          >
            <h3 className="text-sm sm:text-base font-medium text-[#10212B] line-clamp-1 leading-snug">
              {property.title[lang]}
            </h3>
          </Link>
        </div>

        {/* Specifications & Actions Footer */}
        <div className="mt-4 pt-3.5 border-t border-[#E7E3DA]">
          {/* Beds, Baths, Area */}
          <div className="flex items-center justify-between text-xs text-[#172B35] font-medium pb-3">
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-4 h-4 text-[#B69A70]" />
              <span>{property.bedrooms} <span className="text-[#727A7B] font-normal">{t('properties.beds')}</span></span>
            </div>

            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-4 h-4 text-[#B69A70]" />
              <span>{property.bathrooms} <span className="text-[#727A7B] font-normal">{t('properties.baths')}</span></span>
            </div>

            <div className="flex items-center gap-1.5" title={`${property.areaSqM} sqm`}>
              <Maximize2 className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>{property.areaSqM} <span className="text-[#727A7B] font-normal">{t('properties.sqm')}</span></span>
            </div>
          </div>

          {/* Bottom Card Navigation & WhatsApp Button */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#F7F5F0]">
            <Link
              to={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#10212B] hover:text-[#B69A70] transition-colors py-1"
            >
              <span>{lang === 'ar' ? 'تفاصيل العقار' : 'View Details'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90 text-[#B69A70]" />
            </Link>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Inquiry"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PropertyCard;
