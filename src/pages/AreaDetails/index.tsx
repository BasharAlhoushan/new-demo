import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Building, Sparkles, Compass } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { PropertyCard } from '../../components/property/PropertyCard';
import { PropertyMap } from '../../components/property/PropertyMap';
import { Button } from '../../components/common/Button';
import { getAreaBySlug, properties } from '../../data';
import { localizeLandmark } from '../../utils/localize';

export const AreaDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';

  const area = getAreaBySlug(slug || '');

  if (!area) {
    return (
      <PageLayout>
        <div className="py-36 text-center">
          <h2 className="font-serif text-3xl mb-4">{t('areaDetails.notFound')}</h2>
          <Link to="/areas">
            <Button variant="dark" size="md">
              {t('areaDetails.returnToList')}
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Filter properties matching this area
  const areaProperties = properties.filter((p) =>
    p.location.area.toLowerCase().includes(area.name.en.toLowerCase().replace('-qatar', '').replace(' city', '')) ||
    area.name.en.toLowerCase().includes(p.location.area.toLowerCase())
  );

  return (
    <PageLayout>
      {/* Area Hero */}
      <div className="relative min-h-[44vh] sm:min-h-[50vh] flex items-end bg-[#10212B] overflow-hidden">
        <img
          src={area.heroImage}
          alt={area.name[lang]}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10212B] via-[#10212B]/60 to-black/30" />

        <div className="relative z-10 max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <Breadcrumbs
            className="mb-4 text-white/70"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.areas'), path: '/areas' },
              { label: area.name[lang] },
            ]}
          />

          <span className="text-xs uppercase tracking-wider text-[#B69A70] font-semibold block mb-1.5">
            {area.headline[lang]}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight">
            {area.name[lang]}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-2xl font-light leading-relaxed">
            {area.lifestyle[lang]}
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-20 bg-[#F7F5F0]">
        <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Overview & Key Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 border border-[#E7E3DA] rounded-2xl shadow-xs space-y-5">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#10212B]">
                {lang === 'ar' ? `أسلوب الحياة في ${area.name[lang]}` : `Living in ${area.name[lang]}`}
              </h2>
              <p className="text-xs sm:text-sm text-[#172B35]/85 leading-relaxed font-light">
                {area.description[lang]}
              </p>

              {/* Landmarks */}
              <div className="pt-4 border-t border-[#E7E3DA]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#10212B] mb-2.5">
                  {lang === 'ar' ? 'أبرز المعالم والوجهات المحيطة:' : 'Signature Destinations & Enclaves:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {area.landmarks.map((landmark, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-[#F7F5F0] border border-[#E7E3DA] text-xs text-[#10212B] font-medium"
                    >
                      {localizeLandmark(landmark, lang)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="lg:col-span-4 bg-white p-5 border border-[#E7E3DA] rounded-2xl shadow-xs">
              <h3 className="font-serif text-base font-semibold text-[#10212B] mb-3">
                {t('areaDetails.geographicalPlacement')}
              </h3>
              <PropertyMap
                properties={areaProperties}
                center={[area.coordinates.lat, area.coordinates.lng]}
                zoom={14}
                className="h-[280px] rounded-xl overflow-hidden"
              />
            </div>
          </div>

          {/* Active Available Properties in this Area */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8E6E0]">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-1">
                  {t('areaDetails.exclusiveResidences')}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#17201C]">
                  {lang === 'ar'
                    ? `المساكن المتاحة في ${area.name[lang]} (${areaProperties.length})`
                    : `Available in ${area.name[lang]} (${areaProperties.length})`}
                </h2>
              </div>
            </div>

            {areaProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {areaProperties.map((p, idx) => (
                  <PropertyCard key={p.id} property={p} index={idx} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center border border-[#E8E6E0] rounded-sm">
                <p className="text-sm text-[#777C76]">
                  {t('areaDetails.noPublicProperties')}
                </p>
                <div className="mt-4">
                  <Link to="/contact">
                    <Button variant="dark" size="sm">
                      {t('areaDetails.requestOffMarket')}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
