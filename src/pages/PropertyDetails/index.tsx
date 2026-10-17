import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Heart, 
  Layers, 
  Share2, 
  MessageSquare, 
  Phone, 
  Calendar, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Building, 
  ArrowRight
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { PropertyGallery } from '../../components/property/PropertyGallery';
import { PropertyMap } from '../../components/property/PropertyMap';
import { MortgageCalculator } from '../../components/property/MortgageCalculator';
import { ScheduleViewingModal } from '../../components/property/ScheduleViewingModal';
import { ShareModal } from '../../components/property/ShareModal';
import { PropertyCard } from '../../components/property/PropertyCard';
import { getPropertyBySlug, getAgentById, properties } from '../../data';
import { formatPrice, generateWhatsAppLink } from '../../utils/formatters';
import { 
  localizeAreaName, 
  localizePropertyType, 
  localizeFurnishing, 
  localizeAmenity, 
  localizeSpecificationValue 
} from '../../utils/localize';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { useRecentlyViewedStore } from '../../store/recentlyViewedStore';

export const PropertyDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const { currency } = useCurrencyStore();

  const property = getPropertyBySlug(slug || '');
  const agent = property ? getAgentById(property.agentId) : undefined;

  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Stores
  const isFavorite = useFavoritesStore((s) => (property ? s.isFavorite(property.id) : false));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const isInCompare = useCompareStore((s) => (property ? s.isInCompare(property.id) : false));
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);

  // Compute nearby luxury residences within the enclave / region
  const nearbyProperties = useMemo(() => {
    if (!property) return [];
    return properties.filter((p) => {
      if (p.id === property.id) return true;
      const dLat = Math.abs(p.location.lat - property.location.lat);
      const dLng = Math.abs(p.location.lng - property.location.lng);
      return dLat < 0.12 && dLng < 0.12;
    });
  }, [property]);

  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addRecentlyViewed);

  useEffect(() => {
    if (property) {
      addRecentlyViewed(property.id);
      window.scrollTo(0, 0);
    }
  }, [property?.id]);

  if (!property) {
    return (
      <PageLayout>
        <div className="py-36 max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-[#17201C] mb-4">{t('propertyDetails.notFound')}</h2>
          <p className="text-sm text-[#777C76] mb-8">
            {t('propertyDetails.notFoundDesc')}
          </p>
          <Link to="/properties">
            <Button variant="dark" size="md">
              {t('propertyDetails.returnToList')}
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleCompareClick = () => {
    if (isInCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  const whatsAppHref = generateWhatsAppLink(
    agent?.whatsapp || '+97444998800',
    property.title[lang],
    property.id,
    lang
  );

  // Similar properties in same area
  const similarProperties = properties
    .filter((p) => p.id !== property.id && p.location.area === property.location.area)
    .slice(0, 3);

  return (
    <PageLayout>
      <div className="pt-28 pb-24 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: t('nav.home'), path: '/' },
                {
                  label: property.listingType === 'buy' ? t('nav.buy') : t('nav.rent'),
                  path: property.listingType === 'buy' ? '/buy' : '/rent',
                },
                { label: localizeAreaName(property.location.area, lang), path: `/properties?area=${property.location.area}` },
                { label: property.title[lang] },
              ]}
            />
          </div>

          {/* Immersive Gallery Section */}
          <PropertyGallery images={property.images} title={property.title[lang]} />

          {/* Primary Info Header Grid */}
          <div className="mt-10 flex flex-col lg:flex-row lg:items-start justify-between pb-8 border-b border-[#E8E6E0] gap-8">
            <div className="max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="charcoal" size="sm">
                  {localizePropertyType(property.propertyType, lang)}
                </Badge>
                {property.exclusive && (
                  <Badge variant="gold" size="sm">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#B49A70]" />
                      {t('properties.exclusive')}
                    </span>
                  </Badge>
                )}
                <span className="text-xs text-[#777C76] font-mono">
                  {t('properties.ref')}: {property.id}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#17201C] tracking-tight leading-tight">
                {property.title[lang]}
              </h1>

              {/* Location Address */}
              <div className="mt-3 flex items-center gap-2 text-sm text-[#777C76] font-medium">
                <MapPin className="w-4 h-4 text-[#B49A70] shrink-0" />
                <span>{property.location.address}, {localizeAreaName(property.location.area, lang)}, {lang === 'ar' ? 'الدوحة' : 'Doha'}</span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-col lg:items-end">
              <span className="text-xs uppercase tracking-widest text-[#777C76] font-medium">
                {property.listingType === 'rent' ? (lang === 'ar' ? 'قيمة الإيجار الشهري' : 'Monthly Rental') : (lang === 'ar' ? 'السعر المطلوب' : 'Offered At')}
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-[#17201C] tracking-tight mt-1">
                {formatPrice(property.price, currency, lang)}
                {property.listingType === 'rent' && (
                  <span className="text-sm font-normal text-[#777C76] ml-1 rtl:ml-0 rtl:mr-1">{lang === 'ar' ? '/ شهرياً' : '/ month'}</span>
                )}
              </div>

              {/* Social Action Bar */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(property.id)}
                  title={isFavorite ? t('properties.saved') : t('properties.saveToFavorites')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    isFavorite
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-[#17201C] border-[#E8E6E0] hover:border-[#B49A70]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{isFavorite ? t('properties.saved') : (lang === 'ar' ? 'حفظ' : 'Save')}</span>
                </button>

                <button
                  onClick={handleCompareClick}
                  title={isInCompare ? t('properties.removeFromCompare') : t('properties.addToCompare')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    isInCompare
                      ? 'bg-[#B49A70] text-[#111715] border-[#B49A70]'
                      : 'bg-white text-[#17201C] border-[#E8E6E0] hover:border-[#B49A70]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isInCompare ? (lang === 'ar' ? 'قيد المقارنة' : 'Comparing') : (lang === 'ar' ? 'مقارنة' : 'Compare')}</span>
                </button>

                <button
                  onClick={() => setShareModalOpen(true)}
                  className="p-2 bg-white text-[#17201C] border border-[#E8E6E0] hover:border-[#B49A70] rounded-sm transition-colors"
                  title={t('properties.shareProperty')}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Specifications Matrix Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-6 bg-white border border-[#E8E6E0] rounded-sm shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#F8F7F4] text-[#B49A70]">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#777C76]">{t('propertyDetails.bedrooms')}</span>
                <span className="font-serif font-semibold text-sm text-[#17201C]">{property.bedrooms} {lang === 'ar' ? 'أجنحة نوم' : 'Suites'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#F8F7F4] text-[#B49A70]">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#777C76]">{t('propertyDetails.bathrooms')}</span>
                <span className="font-serif font-semibold text-sm text-[#17201C]">{property.bathrooms} {t('properties.baths')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#F8F7F4] text-[#B49A70]">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#777C76]">{t('propertyDetails.builtUpArea')}</span>
                <span className="font-serif font-semibold text-sm text-[#17201C]">{property.areaSqM} {t('properties.sqm')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#F8F7F4] text-[#B49A70]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#777C76]">{t('propertyDetails.privateParking')}</span>
                <span className="font-serif font-semibold text-sm text-[#17201C]">{property.specifications.parkingSpaces} {lang === 'ar' ? 'مواقف سيارات' : 'Bays'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#F8F7F4] text-[#B49A70]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#777C76]">{t('propertyDetails.yearBuilt')}</span>
                <span className="font-serif font-semibold text-sm text-[#17201C]">{property.yearBuilt}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#F8F7F4] text-[#B49A70]">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#777C76]">{t('propertyDetails.furnishingStatus')}</span>
                <span className="font-serif font-semibold text-sm text-[#17201C]">{localizeFurnishing(property.furnishing, lang)}</span>
              </div>
            </div>
          </div>

          {/* Two-Column Layout: Details + Sidebar Agent & Actions */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column (8 cols): Description, Specs, Amenities, Map */}
            <div className="lg:col-span-8 space-y-12">
              {/* Description */}
              <div className="bg-white border border-[#E8E6E0] rounded-sm p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-medium text-[#17201C] mb-4">
                  {t('properties.overview')}
                </h2>
                <div className="prose prose-stone text-sm text-[#17201C]/80 leading-relaxed font-light space-y-4">
                  <p>{property.description[lang]}</p>
                  <p>
                    {lang === 'ar'
                      ? 'تم تشييد هذا العقار وفق أعلى المواصفات الهندسية العالمية، مع مراعاة كاملة لأدق تفاصيل العزل الصوتي والحراري والإطلالات البانورامية المفتوحة، ليوفر لساكنيه أعلى درجات الخصوصية والرفاهية.'
                      : 'Crafted with peerless architectural precision, this home integrates acoustics, thermal efficiency, and open-horizon views. Designed for an international lifestyle of quiet elegance and discreet security.'}
                  </p>
                </div>
              </div>

              {/* Private Amenities Grid */}
              <div className="bg-white border border-[#E8E6E0] rounded-sm p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-medium text-[#17201C] mb-6">
                  {t('properties.amenities')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-sm bg-[#F8F7F4] border border-[#E8E6E0]"
                    >
                      <Sparkles className="w-4 h-4 text-[#B49A70] shrink-0" />
                      <span className="text-xs font-medium text-[#17201C]">{localizeAmenity(amenity, lang)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="bg-white border border-[#E8E6E0] rounded-sm p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-medium text-[#17201C] mb-6">
                  {t('properties.specifications')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                  <div className="flex justify-between py-2 border-b border-[#E8E6E0]">
                    <span className="text-[#777C76]">{t('propertyDetails.primaryView')}</span>
                    <span className="font-semibold text-[#17201C]">{localizeSpecificationValue('view', property.specifications.view, lang)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E8E6E0]">
                    <span className="text-[#777C76]">{t('propertyDetails.coolingSystem')}</span>
                    <span className="font-semibold text-[#17201C]">{localizeSpecificationValue('cooling', property.specifications.cooling, lang)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E8E6E0]">
                    <span className="text-[#777C76]">{t('propertyDetails.flooring')}</span>
                    <span className="font-semibold text-[#17201C]">{localizeSpecificationValue('flooring', property.specifications.flooring, lang)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E8E6E0]">
                    <span className="text-[#777C76]">{t('propertyDetails.ceilingHeight')}</span>
                    <span className="font-semibold text-[#17201C]">{localizeSpecificationValue('ceilingHeight', property.specifications.ceilingHeight || '4.2 meters', lang)}</span>
                  </div>
                  {property.landAreaSqM && (
                    <div className="flex justify-between py-2 border-b border-[#E8E6E0]">
                      <span className="text-[#777C76]">{lang === 'ar' ? 'المساحة الإجمالية للأرض' : 'Total Plot Area'}</span>
                      <span className="font-semibold text-[#17201C]">{property.landAreaSqM} {t('properties.sqm')}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-[#E8E6E0]">
                    <span className="text-[#777C76]">{lang === 'ar' ? 'البنية الأمنية والخصوصية' : 'Security Infrastructure'}</span>
                    <span className="font-semibold text-[#17201C]">{lang === 'ar' ? 'بصمة بيومترية وحراسة ومراقبة 24/7' : 'Biometric & 24/7 Monitored'}</span>
                  </div>
                </div>
              </div>

              {/* Location Map Section */}
              <div className="bg-white border border-[#E8E6E0] rounded-sm p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-medium text-[#17201C] mb-2">
                  {t('properties.locationAndNeighborhood')}
                </h2>
                <p className="text-xs text-[#777C76] font-light mb-6">
                  {property.location.address}, {localizeAreaName(property.location.area, lang)}
                </p>

                <PropertyMap
                  properties={nearbyProperties}
                  selectedProperty={property}
                  className="h-[460px] sm:h-[520px]"
                />
              </div>

              {/* Mortgage Calculator Pre-filled */}
              <MortgageCalculator initialPrice={property.price} />
            </div>

            {/* Right Column (4 cols): Sticky Agent Card, Inquiry Form, WhatsApp */}
            <div className="lg:col-span-4 space-y-8">
              {/* Agent Card */}
              {agent && (
                <div className="bg-white border border-[#E8E6E0] rounded-sm p-6 sm:p-7 shadow-sm sticky top-28">
                  <div className="flex items-center gap-4 pb-6 border-b border-[#E8E6E0]">
                    <img
                      src={agent.image}
                      alt={agent.name[lang]}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#B49A70]"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B49A70] font-semibold">
                        {lang === 'ar' ? 'كبير مستشاري العقارات الخاصة' : 'Senior Private Advisor'}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#17201C]">
                        {agent.name[lang]}
                      </h3>
                      <p className="text-xs text-[#777C76] leading-tight">
                        {agent.title[lang]}
                      </p>
                    </div>
                  </div>

                  <p className="py-4 text-xs text-[#777C76] font-light leading-relaxed">
                    {agent.bio[lang]}
                  </p>

                  <div className="space-y-3 pt-2">
                    {/* VIP Viewing Modal Trigger */}
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => setViewingModalOpen(true)}
                      icon={<Calendar className="w-4 h-4" />}
                    >
                      {t('nav.scheduleViewing')}
                    </Button>

                    {/* WhatsApp Direct Link */}
                    <a
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold uppercase tracking-wider hover:bg-[#25D366]/20 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'استفسار عبر واتساب' : 'WhatsApp Inquiry'}</span>
                    </a>

                    {/* Direct Call */}
                    <a
                      href={`tel:${agent.phone}`}
                      dir="ltr"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#111715] text-[#F8F7F4] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A2320] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#B49A70]" />
                      <span>{agent.phone}</span>
                    </a>
                  </div>

                  {/* Trust credentials */}
                  <div className="mt-6 pt-5 border-t border-[#E8E6E0] flex items-center justify-center gap-2 text-[11px] text-[#777C76]">
                    <ShieldCheck className="w-4 h-4 text-[#B49A70]" />
                    <span>{lang === 'ar' ? 'وساطة معتمدة وسرية مطلقة' : 'Confidential & Certified Brokerage'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Exclusive Properties Section */}
          {similarProperties.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[#E8E6E0]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B49A70] font-semibold block mb-1">
                    {t('favoritesPage.badge')}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#17201C]">
                    {t('properties.similarProperties')}
                  </h2>
                </div>
                <Link to="/properties" className="text-xs uppercase tracking-wider font-semibold text-[#B49A70] hover:text-[#17201C] flex items-center gap-1">
                  <span>{t('properties.viewAll')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((p, idx) => (
                  <PropertyCard key={p.id} property={p} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile Action Bar (Call, WhatsApp, Schedule Viewing) */}
      <aside
        aria-label="Quick Actions"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E7E3DA] p-3 shadow-2xl pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          {/* Direct Phone */}
          <a
            href={`tel:${agent?.phone || '+97444998800'}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#10212B] text-white text-xs font-semibold shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#B69A70]" />
            <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </a>

          {/* Schedule Viewing Modal */}
          <button
            type="button"
            onClick={() => setViewingModalOpen(true)}
            className="flex-[1.2] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#B69A70] text-[#10212B] text-xs font-semibold shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'حجز معاينة' : 'Book Viewing'}</span>
          </button>
        </div>
      </aside>

      {/* Modals */}
      <ScheduleViewingModal
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
        propertyTitle={property.title[lang]}
        propertyRef={property.id}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={property.title[lang]}
      />
    </PageLayout>
  );
};
