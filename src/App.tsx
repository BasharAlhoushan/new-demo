import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n/config';

import { HomePage } from './pages/Home';
import { PropertiesPage } from './pages/Properties';
import { PropertyDetailsPage } from './pages/PropertyDetails';
import { ProjectsPage } from './pages/Projects';
import { ProjectDetailsPage } from './pages/ProjectDetails';
import { AreasPage } from './pages/Areas';
import { AreaDetailsPage } from './pages/AreaDetails';
import { ServicesPage } from './pages/Services';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';
import { FavoritesPage } from './pages/Favorites';
import { ComparePage } from './pages/Compare';
import { NotFoundPage } from './pages/NotFound';

const queryClient = new QueryClient();

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/buy" element={<PropertiesPage initialListingType="buy" />} />
          <Route path="/rent" element={<PropertiesPage initialListingType="rent" />} />
          <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/areas/:slug" element={<AreaDetailsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
