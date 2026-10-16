import React from 'react';
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
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import { Property } from '../../types';
import { formatPrice, formatArea } from '../../utils/formatters';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { Badge } from '../common/Badge';

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
  const lang = i18n.language as 'en' | 'ar';
  const { currency } = useCurrencyStore();

  const isFavorite = useFavoritesStore((s) => s.isFavorite(property.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const isInCompare = useCompareStore((s) => s.isInCompare(property.id));
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      className={`group relative bg-white border border-[#E8E6E0] rounded-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-[#17201C]/5 hover:border-[#B49A70]/40 ${
        isGrid ? 'flex flex-col' : 'flex flex-col md:flex-row'
      }`}
    >
      {/* Property Image Container */}
      <div
        className={`relative overflow-hidden bg-[#18201D] ${
          isGrid ? 'w-full aspect-[16/11]' : 'w-full md:w-2/5 md:min-h-[280px]'
        }`}
      >
        <Link to={`/properties/${property.slug}`} className="block w-full h-full">
          <img
            src={property.images[0]}
            alt={property.title[lang]}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {property.exclusive && (
              <Badge variant="glass" size="sm">
                <span className="flex items-center gap-1 text-[10px] tracking-widest text-[#B49A70]">
                  <Sparkles className="w-2.5 h-2.5" />
                  {t('properties.exclusive')}
                </span>
              </Badge>
            )}
            <Badge variant="white" size="sm">
              <span className="text-[10px] font-semibold text-[#17201C]">
                {property.propertyType}
              </span>
            </Badge>
          </div>

          {/* Action Icons (Save & Compare) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Toggle */}
            <button
              onClick={handleCompareClick}
              title={isInCompare ? t('properties.removeFromCompare') : t('properties.addToCompare')}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                isInCompare
                  ? 'bg-[#B49A70] text-[#111715] shadow-md'
                  : 'bg-black/40 text-white hover:bg-white hover:text-[#111715]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Toggle */}
            <button
              onClick={handleFavoriteClick}
              title={isFavorite ? t('properties.saved') : t('properties.saveToFavorites')}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                isFavorite
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-black/40 text-white hover:bg-white hover:text-rose-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay: Price on Mobile/Grid */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
          <span className="text-[11px] uppercase tracking-wider font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-sm">
            {property.listingType === 'rent' ? `${t('search.tabRent')} / mo` : t('search.tabBuy')}
          </span>
        </div>
      </div>

      {/* Property Details Section */}
      <div className={`p-5 flex flex-col justify-between flex-1 ${!isGrid ? 'md:p-7' : ''}`}>
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#777C76] mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#B49A70] shrink-0" />
            <span className="truncate">{property.location.area}</span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.slug}`} className="block group-hover:text-[#B49A70] transition-colors">
            <h3 className="text-base sm:text-lg font-serif font-medium text-[#17201C] line-clamp-1 leading-snug">
              {property.title[lang]}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-2.5 mb-4">
            <span className="text-xl sm:text-2xl font-serif font-semibold text-[#17201C] tracking-tight">
              {formatPrice(property.price, currency, lang)}
            </span>
            {property.listingType === 'rent' && (
              <span className="text-xs text-[#777C76] font-normal ml-1 rtl:mr-1">
                / {lang === 'ar' ? 'شهرياً' : 'month'}
              </span>
            )}
          </div>
        </div>

        {/* Specs Strip */}
        <div className="border-t border-[#E8E6E0] pt-4">
          <div className="flex items-center justify-between text-xs text-[#777C76] font-medium">
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-4 h-4 text-[#B49A70]" />
              <span>{property.bedrooms} {t('properties.beds')}</span>
            </div>

            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-4 h-4 text-[#B49A70]" />
              <span>{property.bathrooms} {t('properties.baths')}</span>
            </div>

            <div className="flex items-center gap-1.5" title={`${property.areaSqM} sq meters`}>
              <Maximize2 className="w-3.5 h-3.5 text-[#B49A70]" />
              <span>{property.areaSqM} {t('properties.sqm')}</span>
            </div>
          </div>

          {/* Card Footer Detail Link */}
          <div className="mt-4 pt-3 border-t border-[#F8F7F4] flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#17201C] group-hover:text-[#B49A70] transition-colors">
            <span>{t('properties.overview')}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};
