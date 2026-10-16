import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { areas } from '../../data';
import { localizeLandmark } from '../../utils/localize';

export const AreasPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';

  return (
    <PageLayout>
      <div className="pt-28 pb-24 bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.areas') },
            ]}
          />

          <div className="pb-8 border-b border-[#E8E6E0] mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
              {t('areasPage.badge')}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
              {t('areasPage.title')}
            </h1>
            <p className="mt-3 text-sm text-[#777C76] font-light max-w-2xl leading-relaxed">
              {t('areasPage.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, idx) => (
              <div
                key={area.id}
                className="group relative bg-white border border-[#E8E6E0] rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#B49A70]/50 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#18201D]">
                    <img
                      src={area.heroImage}
                      alt={area.name[lang]}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[11px] uppercase tracking-wider font-semibold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-sm">
                      {area.propertiesCount} {t('areas.availableListings')}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-xs uppercase tracking-widest text-[#B49A70] font-medium block mb-1">
                      {area.headline[lang]}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#17201C] group-hover:text-[#B49A70] transition-colors mb-2">
                      {area.name[lang]}
                    </h3>
                    <p className="text-xs text-[#777C76] font-light line-clamp-3 leading-relaxed mb-4">
                      {area.description[lang]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {area.landmarks.slice(0, 3).map((l, i) => (
                        <span
                          key={i}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F8F7F4] text-[#777C76] border border-[#E8E6E0] rounded-sm"
                        >
                          {localizeLandmark(l, lang)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/areas/${area.slug}`}
                    className="w-full inline-flex items-center justify-between p-3 bg-[#F8F7F4] group-hover:bg-[#111715] group-hover:text-[#B49A70] text-xs font-semibold uppercase tracking-wider text-[#17201C] transition-colors rounded-sm"
                  >
                    <span>{t('areas.exploreArea')}</span>
                    <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
