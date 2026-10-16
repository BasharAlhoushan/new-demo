import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

const heroVisuals = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90',
    title: {
      en: 'The Sovereign Palace, Isola Dana',
      ar: 'قصر السوفرين، جزيرة إيزولا دانا',
    },
    area: {
      en: 'The Pearl-Qatar',
      ar: 'جزيرة اللؤلؤة',
    },
    specs: {
      en: '7 Suites • Private Beach • Yacht Slipway',
      ar: '٧ أجنحة ملكية • شاطئ خاص • مرسى يخوت',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=90',
    title: {
      en: 'Royal Beachfront Estate',
      ar: 'القصر الملكي الشاطئي',
    },
    area: {
      en: 'West Bay Lagoon',
      ar: 'لاغون الخليج الغربي',
    },
    specs: {
      en: '8 Suites • 3,200 m² Estate • Private Jetty',
      ar: '٨ أجنحة • أرض ٣,٢٠٠ م² • رصيف خاص',
    },
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90',
    title: {
      en: 'Minimalist Architectural Villa',
      ar: 'فيلا معمارية مينيمالية',
    },
    area: {
      en: 'Lusail Marina Enclave',
      ar: 'مدينة لوسيل الحديثة',
    },
    specs: {
      en: 'Infinity Pool • Cantilevered Glass • 950 m²',
      ar: 'مسبح إنفينيتي • واجهات زجاجية • ٩٥٠ م²',
    },
  },
];

export const CinematicHero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const isRTL = lang === 'ar';
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroVisuals.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92svh] sm:min-h-[94svh] lg:min-h-[95svh] flex flex-col justify-between overflow-hidden bg-[#111715]">
      {/* 1. VISUAL CENTERPIECE: High-Resolution Architectural Villa Photography */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="absolute inset-0 bg-cover bg-center md:bg-[position:70%_center] rtl:md:bg-[position:30%_center]"
            style={{ backgroundImage: `url(${heroVisuals[currentIdx].image})` }}
          />
        </AnimatePresence>

        {/* 2. DIRECTIONAL GRADIENT OVERLAY (Only behind text, leaving the villa architecture bright & unobstructed) */}
        {/* For Arabic RTL: Subtle gradient from right to left */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/45 via-45% to-transparent rtl:block hidden pointer-events-none" />

        {/* For English LTR: Subtle gradient from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent ltr:block hidden pointer-events-none" />

        {/* Subtle top vignette for navbar contrast */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Soft bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111715]/70 to-transparent pointer-events-none" />
      </div>

      {/* 3. CONTENT LAYOUT: Side-Aligned Editorial Column (Not Centered) */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16 w-full">
        <div
          className={`w-full max-w-[580px] flex flex-col ${
            isRTL ? 'text-right items-start mr-0 ml-auto' : 'text-left items-start ml-0 mr-auto'
          }`}
        >
          {/* Subtle Pretitle Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-black/40 border border-[#B49A70]/30 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 text-[#B49A70]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#F8F7F4]/90 font-medium">
              {t('hero.pretitle')}
            </span>
          </motion.div>

          {/* Refined Headline: 30% smaller than previous oversized display */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-white tracking-tight leading-[1.2] drop-shadow-sm"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Short Description: Maximum 2 lines with balanced line height */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-white/85 font-light leading-relaxed max-w-[500px] line-clamp-2"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* 4. CALL TO ACTION: One prominent primary CTA + one subtle text link */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6"
          >
            {/* Primary Prominent CTA */}
            <Link to="/properties">
              <Button
                size="md"
                variant="primary"
                icon={<ArrowUpRight className="w-4 h-4 rtl:rotate-90" />}
              >
                {t('hero.exploreProperties')}
              </Button>
            </Link>

            {/* Subtle Secondary Text Link */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 hover:text-[#B49A70] font-medium transition-colors py-2 group"
            >
              <span>{t('hero.discoverProjects')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B49A70] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 5. HERO FOOTER: Discreet Slide Metadata & Navigation Controls */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 w-full">
        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
          {/* Active Landmark Tag */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-[#B49A70]" />
            <span className="font-serif font-medium text-white text-xs sm:text-sm">
              {heroVisuals[currentIdx].title[lang]}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#B49A70] text-[11px] uppercase tracking-wider font-semibold">
              {heroVisuals[currentIdx].area[lang]}
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-white/60 text-[11px]">
              {heroVisuals[currentIdx].specs[lang]}
            </span>
          </div>

          {/* Slide Progress Dots / Indicators */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-widest text-white/50">
              0{currentIdx + 1} / 0{heroVisuals.length}
            </span>
            <div className="flex items-center gap-1.5">
              {heroVisuals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  aria-label={`Go to residence slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentIdx ? 'w-7 bg-[#B49A70]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
