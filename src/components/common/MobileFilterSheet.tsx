import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { localizeAreaName, localizePropertyType } from '../../utils/localize';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  listingType: 'buy' | 'rent' | 'all';
  onListingTypeChange?: (type: 'buy' | 'rent' | 'all') => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  selectedBeds: string;
  onBedsChange: (beds: string) => void;
  onApply: () => void;
  onReset: () => void;
  totalResultsCount?: number;
}

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

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  listingType,
  onListingTypeChange,
  selectedLocation,
  onLocationChange,
  selectedType,
  onTypeChange,
  minPrice,
  maxPrice,
  onPriceChange,
  selectedBeds,
  onBedsChange,
  onApply,
  onReset,
  totalResultsCount,
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isRent = listingType === 'rent';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E7E3DA]">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[#10212B]">
                  {t('search.advancedFilters')}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onReset}
                  className="flex items-center gap-1 text-xs text-[#727A7B] hover:text-[#10212B] font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('search.resetFilters')}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-[#727A7B] hover:text-[#10212B] hover:bg-[#F7F5F0]"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Filter Fields */}
            <div className="p-4 overflow-y-auto space-y-5 flex-1">
              {/* 1. Transaction Type (Buy / Rent) */}
              {onListingTypeChange && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#727A7B] tracking-wider mb-2">
                    {lang === 'ar' ? 'نوع المعاملة' : 'Transaction Type'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onListingTypeChange('buy')}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                        listingType === 'buy'
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-white text-[#172B35] border-[#E7E3DA]'
                      }`}
                    >
                      {t('search.tabBuy')}
                    </button>
                    <button
                      type="button"
                      onClick={() => onListingTypeChange('rent')}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                        listingType === 'rent'
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-white text-[#172B35] border-[#E7E3DA]'
                      }`}
                    >
                      {t('search.tabRent')}
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Prime Location */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#727A7B] tracking-wider mb-2">
                  {t('search.location')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onLocationChange('')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      !selectedLocation
                        ? 'bg-[#10212B] text-white border-[#10212B]'
                        : 'bg-white text-[#172B35] border-[#E7E3DA]'
                    }`}
                  >
                    {t('search.allLocations')}
                  </button>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => onLocationChange(loc === selectedLocation ? '' : loc)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                        selectedLocation === loc
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-white text-[#172B35] border-[#E7E3DA]'
                      }`}
                    >
                      {localizeAreaName(loc, lang)}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Property Type */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#727A7B] tracking-wider mb-2">
                  {t('search.propertyType')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onTypeChange('')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      !selectedType
                        ? 'bg-[#10212B] text-white border-[#10212B]'
                        : 'bg-white text-[#172B35] border-[#E7E3DA]'
                    }`}
                  >
                    {t('search.allTypes')}
                  </button>
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onTypeChange(type === selectedType ? '' : type)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                        selectedType === type
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-white text-[#172B35] border-[#E7E3DA]'
                      }`}
                    >
                      {localizePropertyType(type, lang)}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Bedrooms */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#727A7B] tracking-wider mb-2">
                  {t('search.bedrooms')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['all', '1', '2', '3', '4', '5+'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => onBedsChange(b === 'all' ? '' : b.replace('+', ''))}
                      className={`py-2 px-3.5 rounded-xl text-xs font-medium border transition-colors ${
                        (b === 'all' && !selectedBeds) || selectedBeds === b.replace('+', '')
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-white text-[#172B35] border-[#E7E3DA]'
                      }`}
                    >
                      {b === 'all' ? t('search.anyBeds') : `${b} ${t('properties.beds')}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Price Range Quick Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#727A7B] tracking-wider mb-2">
                  {t('search.priceRange')}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {isRent ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onPriceChange(0, 30000)}
                        className={`p-2 rounded-lg border text-center ${
                          maxPrice === 30000 ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        &lt; 30,000 QAR
                      </button>
                      <button
                        type="button"
                        onClick={() => onPriceChange(30000, 60000)}
                        className={`p-2 rounded-lg border text-center ${
                          minPrice === 30000 && maxPrice === 60000 ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        30K - 60K QAR
                      </button>
                      <button
                        type="button"
                        onClick={() => onPriceChange(60000, 100000)}
                        className={`p-2 rounded-lg border text-center ${
                          minPrice === 60000 && maxPrice === 100000 ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        60K - 100K QAR
                      </button>
                      <button
                        type="button"
                        onClick={() => onPriceChange(100000, 0)}
                        className={`p-2 rounded-lg border text-center ${
                          minPrice === 100000 && !maxPrice ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        &gt; 100,000 QAR
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => onPriceChange(0, 10000000)}
                        className={`p-2 rounded-lg border text-center ${
                          maxPrice === 10000000 ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        &lt; 10M QAR
                      </button>
                      <button
                        type="button"
                        onClick={() => onPriceChange(10000000, 25000000)}
                        className={`p-2 rounded-lg border text-center ${
                          minPrice === 10000000 && maxPrice === 25000000 ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        10M - 25M QAR
                      </button>
                      <button
                        type="button"
                        onClick={() => onPriceChange(25000000, 40000000)}
                        className={`p-2 rounded-lg border text-center ${
                          minPrice === 25000000 && maxPrice === 40000000 ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        25M - 40M QAR
                      </button>
                      <button
                        type="button"
                        onClick={() => onPriceChange(40000000, 0)}
                        className={`p-2 rounded-lg border text-center ${
                          minPrice === 40000000 && !maxPrice ? 'bg-[#B69A70]/15 border-[#B69A70] font-semibold text-[#10212B]' : 'border-[#E7E3DA]'
                        }`}
                      >
                        &gt; 40M QAR
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Apply CTA */}
            <div className="p-4 border-t border-[#E7E3DA] bg-[#F7F5F0]/60">
              <button
                type="button"
                onClick={() => {
                  onApply();
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#10212B] text-white text-sm font-semibold hover:bg-[#00253B] transition-colors shadow-sm"
              >
                {totalResultsCount !== undefined
                  ? `${t('search.searchButton')} (${totalResultsCount})`
                  : t('search.searchButton')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileFilterSheet;
