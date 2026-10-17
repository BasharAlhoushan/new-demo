import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { MarketplaceHero } from '../../components/home/MarketplaceHero';
import { SignatureProjects } from '../../components/home/SignatureProjects';
import { FeaturedPropertiesSection } from '../../components/home/FeaturedPropertiesSection';
import { PropertiesForSaleSection } from '../../components/home/PropertiesForSaleSection';
import { PropertiesForRentSection } from '../../components/home/PropertiesForRentSection';
import { FindByCategorySection } from '../../components/home/FindByCategorySection';
import { ExploreByLocationSection } from '../../components/home/ExploreByLocationSection';
import { ServicesOverviewSection } from '../../components/home/ServicesOverviewSection';
import { WhyChooseUsSection } from '../../components/home/WhyChooseUsSection';
import { ContactConsultationSection } from '../../components/home/ContactConsultationSection';

export const HomePage: React.FC = () => {
  return (
    <PageLayout>
      {/* SECTION 1 — HERO + PROPERTY SEARCH */}
      <MarketplaceHero />

      {/* SECTION 2 — FEATURED PROJECTS */}
      <SignatureProjects />

      {/* SECTION 3 — FEATURED PROPERTIES */}
      <FeaturedPropertiesSection />

      {/* SECTION 4 — PROPERTIES FOR SALE */}
      <PropertiesForSaleSection />

      {/* SECTION 5 — PROPERTIES FOR RENT */}
      <PropertiesForRentSection />

      {/* SECTION 6 — FIND BY CATEGORY */}
      <FindByCategorySection />

      {/* SECTION 7 — EXPLORE BY LOCATION */}
      <ExploreByLocationSection />

      {/* SECTION 8 — OUR SERVICES */}
      <ServicesOverviewSection />

      {/* SECTION 9 — WHY CHOOSE THE ONE */}
      <WhyChooseUsSection />

      {/* SECTION 10 — CONTACT / CONSULTATION */}
      <ContactConsultationSection />
    </PageLayout>
  );
};

export default HomePage;
