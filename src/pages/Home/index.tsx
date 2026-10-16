import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { CinematicHero } from '../../components/home/CinematicHero';
import { HeroSearch } from '../../components/home/HeroSearch';
import { FeaturedProperties } from '../../components/home/FeaturedProperties';
import { SignatureProjects } from '../../components/home/SignatureProjects';
import { PrimeLocations } from '../../components/home/PrimeLocations';
import { PrivateClientServices } from '../../components/home/PrivateClientServices';
import { ArchitectureStatement } from '../../components/home/ArchitectureStatement';
import { Button } from '../../components/common/Button';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      {/* 1. World-Class Cinematic Luxury Hero (Architecture as Visual Centerpiece) */}
      <CinematicHero />

      {/* 2. Refined Property Search Section (Sleek white card overlapping hero bottom by 36px) */}
      <section className="relative z-20 -mt-8 sm:-mt-10 mb-2">
        <HeroSearch />
      </section>

      {/* 3. Featured Signature Residences */}
      <FeaturedProperties />

      {/* 4. Masterpiece Flagship Developments */}
      <SignatureProjects />

      {/* 5. Explore by Qatar Prime Locations */}
      <PrimeLocations />

      {/* 6. Private Client Bespoke Services (Dark Rhythm Section) */}
      <PrivateClientServices />

      {/* 7. Architectural Manifesto & Key Metrics */}
      <ArchitectureStatement />

      {/* 8. Private Consultation VIP CTA Banner */}
      <section className="py-20 sm:py-24 bg-[#18201D] text-white border-t border-[#2A3530] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left rtl:lg:text-right">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
              {t('home.consultation.badge')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              {t('home.consultation.title')}
            </h2>
            <p className="mt-4 text-sm text-[#777C76] font-light leading-relaxed">
              {t('home.consultation.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4 rtl:rotate-90" />}
              >
                {t('home.consultation.cta')}
              </Button>
            </Link>

            <a href="tel:+97444998800">
              <Button
                variant="outline-light"
                size="lg"
                icon={<PhoneCall className="w-4 h-4" />}
              >
                +974 4499 8800
              </Button>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
