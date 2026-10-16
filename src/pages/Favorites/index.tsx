import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Trash2, ArrowUpRight } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Button } from '../../components/common/Button';
import { useFavoritesStore } from '../../store/favoritesStore';
import { properties } from '../../data';

export const FavoritesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const favoriteIds = useFavoritesStore((s) => s.favorites);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);

  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));

  return (
    <PageLayout>
      <div className="pt-28 pb-24 bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.favorites') },
            ]}
          />

          {/* Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E8E6E0] mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
                {t('favoritesPage.badge')}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
                {t('favorites.title')}
              </h1>
              <p className="mt-2 text-sm text-[#777C76] font-light">
                {t('favorites.subtitle')} ({lang === 'ar' ? `${favoriteProperties.length} مساكن محفوظة` : `${favoriteProperties.length} saved`})
              </p>
            </div>

            {favoriteProperties.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFavorites}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              >
                {t('favorites.clearAll')}
              </Button>
            )}
          </div>

          {favoriteProperties.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-[#E8E6E0] rounded-sm p-12 sm:p-16 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 bg-[#F8F7F4] border border-[#E8E6E0] rounded-full flex items-center justify-center mx-auto mb-5 text-[#B49A70]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#17201C] font-medium mb-3">
                {t('favorites.empty')}
              </h3>
              <p className="text-xs text-[#777C76] font-light leading-relaxed mb-6">
                {t('favorites.emptySubtitle')}
              </p>
              <Link to="/properties">
                <Button variant="primary" size="md">
                  {t('favoritesPage.exploreCta')}
                </Button>
              </Link>
            </div>
          ) : (
            /* Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteProperties.map((p, idx) => (
                <PropertyCard key={p.id} property={p} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
