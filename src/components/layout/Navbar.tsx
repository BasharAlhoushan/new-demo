import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Layers,
  Menu,
  X,
  Globe,
  Calendar,
  ChevronDown,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { setAppLanguage } from '../../i18n/config';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { Button } from '../common/Button';

interface NavbarProps {
  onOpenViewingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenViewingModal }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language as 'en' | 'ar';
  const isRTL = lang === 'ar';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Accordion states for mobile menu
  const [mobilePropsOpen, setMobilePropsOpen] = useState(true);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const propertiesDropdownRef = useRef<HTMLDivElement>(null);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const favorites = useFavoritesStore((s) => s.favorites);
  const compareProperties = useCompareStore((s) => s.properties);
  const { currency, toggleCurrency } = useCurrencyStore();

  const isCurrentHome = location.pathname === '/';

  // Scroll listener for sticky transparent -> frosted solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPropertiesOpen(false);
    setExploreOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // Click outside and ESC listener for dropdowns and mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        propertiesDropdownRef.current &&
        !propertiesDropdownRef.current.contains(e.target as Node)
      ) {
        setPropertiesOpen(false);
      }
      if (
        exploreDropdownRef.current &&
        !exploreDropdownRef.current.contains(e.target as Node)
      ) {
        setExploreOpen(false);
      }
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(e.target as Node)
      ) {
        setMoreOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPropertiesOpen(false);
        setExploreOpen(false);
        setMoreOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setAppLanguage(nextLang);
  };

  const isLightNav = !isCurrentHome || isScrolled;

  // Active checks
  const isHomeActive = location.pathname === '/';

  const isPropertiesActive =
    location.pathname === '/properties' ||
    location.pathname === '/buy' ||
    location.pathname === '/rent' ||
    location.pathname.startsWith('/properties/');

  const isDevelopmentsActive =
    location.pathname === '/projects' || location.pathname.startsWith('/projects/');

  const isExploreActive =
    location.pathname === '/areas' ||
    location.pathname.startsWith('/areas/') ||
    location.pathname === '/services' ||
    location.pathname.startsWith('/services/');

  const isMoreActive =
    location.pathname === '/about' ||
    location.pathname === '/contact';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[84px] sm:h-[88px] transition-all duration-300 flex items-center ${isLightNav
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#E8E6E0] shadow-sm'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
          }`}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Constrained Flexbox 3-Zone Architecture */}
          <div className="flex items-center justify-between w-full min-w-0">

            {/* ZONE 1: Left - Original Company Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                dir="ltr"
                className="flex flex-col group focus:outline-none select-none brand-logo-lock text-left"
                aria-label="THE ONE Luxury Real Estate Home"
              >
                <span
                  className={`font-serif text-2xl sm:text-[26px] tracking-widest font-semibold transition-colors duration-300 leading-none ${isLightNav ? 'text-[#17201C]' : 'text-white'
                    }`}
                >
                  THE ONE<span className="text-[#B49A70]">.</span>
                </span>
                <span
                  className={`text-[8.5px] sm:text-[9px] tracking-[0.28em] uppercase mt-1 font-light transition-colors duration-300 ${isLightNav ? 'text-[#777C76]' : 'text-white/75'
                    }`}
                >
                  LUXURY REAL ESTATE
                </span>
              </Link>
            </div>

            {/* ZONE 2: Center - Primary Navigation Links (Desktop 1200px+) */}
            <nav
              aria-label="Primary Navigation"
              className="hidden xl:flex items-center justify-center flex-1 min-w-0 px-4 2xl:px-8 gap-5 2xl:gap-8"
            >
              {/* 1. Home */}
              <Link
                to="/"
                className={`relative text-[13px] uppercase tracking-[0.06em] font-medium transition-colors duration-200 py-1.5 whitespace-nowrap flex-shrink-0 ${isHomeActive
                  ? 'text-[#B49A70]'
                  : isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70]'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                {t('nav.home')}
                {isHomeActive && (
                  <motion.span
                    layoutId="navActiveUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B49A70]"
                    transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                  />
                )}
              </Link>

              {/* 2. Properties (Dropdown: Buy, Rent, All) */}
              <div
                ref={propertiesDropdownRef}
                className="relative flex-shrink-0"
                onMouseEnter={() => setPropertiesOpen(true)}
                onMouseLeave={() => setPropertiesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setPropertiesOpen((prev) => !prev)}
                  className={`relative flex items-center gap-1.5 text-[13px] uppercase tracking-[0.06em] font-medium transition-colors duration-200 py-1.5 whitespace-nowrap cursor-pointer ${isPropertiesActive
                    ? 'text-[#B49A70]'
                    : isLightNav
                      ? 'text-[#17201C] hover:text-[#B49A70]'
                      : 'text-white/90 hover:text-white'
                    }`}
                  aria-expanded={propertiesOpen}
                >
                  <span>{t('nav.properties')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${propertiesOpen ? 'rotate-180 text-[#B49A70]' : ''
                      }`}
                  />
                  {isPropertiesActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B49A70]"
                      transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                    />
                  )}
                </button>

                {/* Animated Dropdown Menu */}
                <AnimatePresence>
                  {propertiesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className={`absolute top-full mt-2 w-56 bg-white border border-[#E8E6E0] rounded-sm shadow-xl p-2 z-50 ${isRTL ? 'right-0 text-right' : 'left-0 text-left'
                        }`}
                    >
                      <Link
                        to="/buy"
                        onClick={() => setPropertiesOpen(false)}
                        className="group flex flex-col p-2.5 rounded-sm hover:bg-[#F8F7F4] transition-colors"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#17201C] group-hover:text-[#B49A70] flex items-center justify-between">
                          <span>{t('nav.buy')}</span>
                          <ArrowRight className="w-3 h-3 text-[#B49A70] opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                        </span>
                        <span className="text-[11px] text-[#777C76] font-light mt-0.5">
                          {isRTL ? 'قصور وفلل شاطئية وبنتهاوس' : 'Private Palaces & Waterfront Villas'}
                        </span>
                      </Link>

                      <Link
                        to="/rent"
                        onClick={() => setPropertiesOpen(false)}
                        className="group flex flex-col p-2.5 rounded-sm hover:bg-[#F8F7F4] transition-colors"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#17201C] group-hover:text-[#B49A70] flex items-center justify-between">
                          <span>{t('nav.rent')}</span>
                          <ArrowRight className="w-3 h-3 text-[#B49A70] opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                        </span>
                        <span className="text-[11px] text-[#777C76] font-light mt-0.5">
                          {isRTL ? 'تأجير سكني ودبلوماسي فاخر' : 'Luxury Residential & Diplomatic Leases'}
                        </span>
                      </Link>

                      <div className="my-1 border-t border-[#E8E6E0]" />

                      <Link
                        to="/properties"
                        onClick={() => setPropertiesOpen(false)}
                        className="group flex items-center justify-between p-2 rounded-sm text-[11px] font-semibold uppercase tracking-wider text-[#777C76] hover:text-[#B49A70] transition-colors"
                      >
                        <span>{t('nav.allProperties')}</span>
                        <span className="text-[10px] text-[#B49A70] font-mono">40+</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Developments */}
              <Link
                to="/projects"
                className={`relative text-[13px] uppercase tracking-[0.06em] font-medium transition-colors duration-200 py-1.5 whitespace-nowrap flex-shrink-0 ${isDevelopmentsActive
                  ? 'text-[#B49A70]'
                  : isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70]'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                {t('nav.developments')}
                {isDevelopmentsActive && (
                  <motion.span
                    layoutId="navActiveUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B49A70]"
                    transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                  />
                )}
              </Link>

              {/* 4. Explore (Dropdown: Areas, Services) */}
              <div
                ref={exploreDropdownRef}
                className="relative flex-shrink-0"
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setExploreOpen((prev) => !prev)}
                  className={`relative flex items-center gap-1.5 text-[13px] uppercase tracking-[0.06em] font-medium transition-colors duration-200 py-1.5 whitespace-nowrap cursor-pointer ${isExploreActive
                    ? 'text-[#B49A70]'
                    : isLightNav
                      ? 'text-[#17201C] hover:text-[#B49A70]'
                      : 'text-white/90 hover:text-white'
                    }`}
                  aria-expanded={exploreOpen}
                >
                  <span>{t('nav.explore')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? 'rotate-180 text-[#B49A70]' : ''
                      }`}
                  />
                  {isExploreActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B49A70]"
                      transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                    />
                  )}
                </button>

                {/* Animated Dropdown Menu */}
                <AnimatePresence>
                  {exploreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className={`absolute top-full mt-2 w-56 bg-white border border-[#E8E6E0] rounded-sm shadow-xl p-2 z-50 ${isRTL ? 'right-0 text-right' : 'left-0 text-left'
                        }`}
                    >
                      <Link
                        to="/areas"
                        onClick={() => setExploreOpen(false)}
                        className="group flex flex-col p-2.5 rounded-sm hover:bg-[#F8F7F4] transition-colors"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#17201C] group-hover:text-[#B49A70] flex items-center justify-between">
                          <span>{t('nav.areas')}</span>
                          <ArrowRight className="w-3 h-3 text-[#B49A70] opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                        </span>
                        <span className="text-[11px] text-[#777C76] font-light mt-0.5">
                          {isRTL ? 'أرقى الوجهات في قطر' : 'The Pearl, Lusail, West Bay'}
                        </span>
                      </Link>

                      <Link
                        to="/services"
                        onClick={() => setExploreOpen(false)}
                        className="group flex flex-col p-2.5 rounded-sm hover:bg-[#F8F7F4] transition-colors"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#17201C] group-hover:text-[#B49A70] flex items-center justify-between">
                          <span>{t('nav.services')}</span>
                          <ArrowRight className="w-3 h-3 text-[#B49A70] opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                        </span>
                        <span className="text-[11px] text-[#777C76] font-light mt-0.5">
                          {isRTL ? 'استشارات وإدارة أصول خاصة' : 'Private Advisory & Asset Management'}
                        </span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 5. "More" Dropdown: Active on 1200px - 1599px to consolidate About & Contact */}
              <div
                ref={moreDropdownRef}
                className="relative flex-shrink-0 2xl:hidden"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMoreOpen((prev) => !prev)}
                  className={`relative flex items-center gap-1.5 text-[13px] uppercase tracking-[0.06em] font-medium transition-colors duration-200 py-1.5 whitespace-nowrap cursor-pointer ${isMoreActive
                    ? 'text-[#B49A70]'
                    : isLightNav
                      ? 'text-[#17201C] hover:text-[#B49A70]'
                      : 'text-white/90 hover:text-white'
                    }`}
                  aria-expanded={moreOpen}
                >
                  <span>{t('nav.more')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180 text-[#B49A70]' : ''
                      }`}
                  />
                  {isMoreActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B49A70]"
                      transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className={`absolute top-full mt-2 w-48 bg-white border border-[#E8E6E0] rounded-sm shadow-xl p-2 z-50 ${isRTL ? 'right-0 text-right' : 'left-0 text-left'
                        }`}
                    >
                      <Link
                        to="/about"
                        onClick={() => setMoreOpen(false)}
                        className={`group flex items-center justify-between p-2.5 rounded-sm hover:bg-[#F8F7F4] text-xs font-semibold uppercase tracking-wider transition-colors ${location.pathname === '/about' ? 'text-[#B49A70]' : 'text-[#17201C] hover:text-[#B49A70]'
                          }`}
                      >
                        <span>{t('nav.about')}</span>
                        <ArrowRight className="w-3 h-3 text-[#B49A70] opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                      </Link>

                      <div className="my-1 border-t border-[#E8E6E0]" />

                      <Link
                        to="/contact"
                        onClick={() => setMoreOpen(false)}
                        className={`group flex items-center justify-between p-2.5 rounded-sm hover:bg-[#F8F7F4] text-xs font-semibold uppercase tracking-wider transition-colors ${location.pathname === '/contact' ? 'text-[#B49A70]' : 'text-[#17201C] hover:text-[#B49A70]'
                          }`}
                      >
                        <span>{t('nav.contact')}</span>
                        <ArrowRight className="w-3 h-3 text-[#B49A70] opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 6. Standalone About (Visible on Large screens 1600px+) */}
              <Link
                to="/about"
                className={`relative hidden 2xl:inline-flex text-[13px] uppercase tracking-[0.06em] font-medium transition-colors duration-200 py-1.5 whitespace-nowrap flex-shrink-0 ${location.pathname === '/about'
                  ? 'text-[#B49A70]'
                  : isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70]'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                {t('nav.about')}
                {location.pathname === '/about' && (
                  <motion.span
                    layoutId="navActiveUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B49A70]"
                    transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                  />
                )}
              </Link>

              {/* 7. Standalone Contact (Visible on Large screens 1600px+) */}
              <Link
                to="/contact"
                className={`relative hidden 2xl:inline-flex text-[13px] uppercase tracking-[0.06em] font-medium transition-colors duration-200 py-1.5 whitespace-nowrap flex-shrink-0 ${location.pathname === '/contact'
                  ? 'text-[#B49A70]'
                  : isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70]'
                    : 'text-white/90 hover:text-white'
                  }`}
              >
                {t('nav.contact')}
                {location.pathname === '/contact' && (
                  <motion.span
                    layoutId="navActiveUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B49A70]"
                    transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                  />
                )}
              </Link>
            </nav>

            {/* ZONE 3: Right - Grouped Utility Actions + CTA */}
            <div className="flex-shrink-0 flex items-center justify-end">

              {/* Tablet & Mobile View (< 1200px): ONLY Favorites Icon + Menu Button */}
              <div className="flex xl:hidden items-center gap-1.5 sm:gap-2">
                {/* Favorites Icon */}
                <Link
                  to="/favorites"
                  title={t('nav.favorites')}
                  className={`relative p-2 rounded-sm transition-colors ${isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70] hover:bg-black/5'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                    }`}
                >
                  <Heart className="w-5 h-5" />
                  {favorites.length > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#B49A70] text-[#111715] font-bold text-[10px] rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>

                {/* Mobile / Tablet Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`p-2 rounded-sm transition-colors ${isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70] hover:bg-black/5'
                    : 'text-white hover:text-[#B49A70] hover:bg-white/10'
                    }`}
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* Desktop View (1200px+): Currency, Language, Compare, Favorites, Book Viewing CTA */}
              <div className="hidden xl:flex items-center gap-2 2xl:gap-3">
                {/* Currency Selector */}
                <button
                  onClick={toggleCurrency}
                  title="Toggle Currency (QAR / USD)"
                  className={`px-2 py-1 text-[11px] font-semibold tracking-wider rounded-sm border transition-colors select-none whitespace-nowrap cursor-pointer ${isLightNav
                    ? 'border-[#E8E6E0] text-[#17201C] hover:border-[#B49A70] hover:text-[#B49A70]'
                    : 'border-white/25 text-white hover:border-white hover:text-white'
                    }`}
                >
                  {currency}
                </button>

                {/* Language Switcher */}
                <button
                  onClick={toggleLanguage}
                  title="Toggle Language (EN / العربية)"
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs tracking-wider uppercase font-medium rounded-sm border transition-colors select-none whitespace-nowrap cursor-pointer ${isLightNav
                    ? 'border-transparent text-[#17201C] hover:text-[#B49A70] hover:bg-black/5'
                    : 'border-transparent text-white hover:text-[#B49A70] hover:bg-white/10'
                    }`}
                >
                  <Globe className="w-3.5 h-3.5 text-[#B49A70]" />
                  <span className="font-semibold">{lang === 'ar' ? 'EN' : 'العربية'}</span>
                </button>

                {/* Compare Icon */}
                <Link
                  to="/compare"
                  title={t('nav.compare')}
                  className={`relative p-2 rounded-sm transition-colors whitespace-nowrap ${isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70] hover:bg-black/5'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                    }`}
                >
                  <Layers className="w-4 h-4" />
                  {compareProperties.length > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#B49A70] text-[#111715] font-bold text-[10px] rounded-full flex items-center justify-center">
                      {compareProperties.length}
                    </span>
                  )}
                </Link>

                {/* Favorites Icon */}
                <Link
                  to="/favorites"
                  title={t('nav.favorites')}
                  className={`relative p-2 rounded-sm transition-colors whitespace-nowrap ${isLightNav
                    ? 'text-[#17201C] hover:text-[#B49A70] hover:bg-black/5'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                    }`}
                >
                  <Heart className="w-4 h-4" />
                  {favorites.length > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#B49A70] text-[#111715] font-bold text-[10px] rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>

                {/* Primary CTA: "Book Viewing" */}
                <Button
                  size="sm"
                  variant={isLightNav ? 'dark' : 'primary'}
                  onClick={onOpenViewingModal}
                  className="whitespace-nowrap font-medium text-xs tracking-wider uppercase px-4 py-2 flex-shrink-0"
                  icon={<Calendar className="w-3.5 h-3.5" />}
                >
                  {t('nav.bookViewing')}
                </Button>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Luxury Animated Mobile / Tablet Navigation Drawer using Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={`fixed top-0 bottom-0 z-50 w-full sm:max-w-md bg-[#111715] text-[#F8F7F4] flex flex-col justify-between shadow-2xl border-l rtl:border-l-0 rtl:border-r border-[#222B26] overflow-y-auto ${isRTL ? 'left-0' : 'right-0'
                }`}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Drawer Top / Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#222B26]">
                <Link
                  to="/"
                  dir="ltr"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col select-none brand-logo-lock text-left"
                >
                  <span className="font-serif text-2xl tracking-widest font-semibold text-white leading-none">
                    THE ONE<span className="text-[#B49A70]">.</span>
                  </span>
                  <span className="text-[8px] tracking-[0.28em] uppercase mt-1 font-light text-white/60">
                    LUXURY REAL ESTATE
                  </span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-[#18201D] text-white hover:text-[#B49A70] hover:bg-[#222B26] transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                {/* 1. Home */}
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-serif transition-colors py-1 ${location.pathname === '/' ? 'text-[#B49A70]' : 'text-white hover:text-[#B49A70]'
                    }`}
                >
                  {t('nav.home')}
                </Link>

                {/* 2. Expandable Properties Menu */}
                <div className="border-t border-[#222B26] pt-3">
                  <button
                    type="button"
                    onClick={() => setMobilePropsOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-xl font-serif text-white hover:text-[#B49A70] transition-colors py-1 cursor-pointer"
                  >
                    <span>{t('nav.properties')}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B49A70] transition-transform duration-200 ${mobilePropsOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobilePropsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden flex flex-col space-y-2.5 pt-2.5 pb-1 pl-4 rtl:pl-0 rtl:pr-4"
                      >
                        <Link
                          to="/buy"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-white/80 hover:text-[#B49A70] flex items-center justify-between"
                        >
                          <span>{t('nav.buy')}</span>
                          <span className="text-[10px] text-[#777C76]">
                            {isRTL ? 'شراء خاص' : 'Private Acquisitions'}
                          </span>
                        </Link>
                        <Link
                          to="/rent"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-white/80 hover:text-[#B49A70] flex items-center justify-between"
                        >
                          <span>{t('nav.rent')}</span>
                          <span className="text-[10px] text-[#777C76]">
                            {isRTL ? 'إيجار فاخر' : 'Luxury Leases'}
                          </span>
                        </Link>
                        <Link
                          to="/properties"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-[#B49A70] hover:underline uppercase tracking-wider pt-1 flex items-center gap-1"
                        >
                          <span>{t('nav.allProperties')}</span>
                          <span>→</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Developments */}
                <Link
                  to="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-serif transition-colors py-2 border-t border-[#222B26] ${isDevelopmentsActive ? 'text-[#B49A70]' : 'text-white hover:text-[#B49A70]'
                    }`}
                >
                  {t('nav.developments')}
                </Link>

                {/* 4. Expandable Explore Menu */}
                <div className="border-t border-[#222B26] pt-3">
                  <button
                    type="button"
                    onClick={() => setMobileExploreOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-xl font-serif text-white hover:text-[#B49A70] transition-colors py-1 cursor-pointer"
                  >
                    <span>{t('nav.explore')}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B49A70] transition-transform duration-200 ${mobileExploreOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExploreOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden flex flex-col space-y-2.5 pt-2.5 pb-1 pl-4 rtl:pl-0 rtl:pr-4"
                      >
                        <Link
                          to="/areas"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-white/80 hover:text-[#B49A70] flex items-center justify-between"
                        >
                          <span>{t('nav.areas')}</span>
                          <span className="text-[10px] text-[#777C76]">
                            {isRTL ? 'أرقى المناطق' : 'Prime Destinations'}
                          </span>
                        </Link>
                        <Link
                          to="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-white/80 hover:text-[#B49A70] flex items-center justify-between"
                        >
                          <span>{t('nav.services')}</span>
                          <span className="text-[10px] text-[#777C76]">
                            {isRTL ? 'الخدمات الخاصة' : 'Private Advisory'}
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. About */}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-serif transition-colors py-2 border-t border-[#222B26] ${location.pathname === '/about' ? 'text-[#B49A70]' : 'text-white hover:text-[#B49A70]'
                    }`}
                >
                  {t('nav.about')}
                </Link>

                {/* 6. Contact */}
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-serif transition-colors py-2 border-t border-[#222B26] ${location.pathname === '/contact' ? 'text-[#B49A70]' : 'text-white hover:text-[#B49A70]'
                    }`}
                >
                  {t('nav.contact')}
                </Link>

                {/* Favorites and Compare Quick Access in Drawer */}
                <div className="pt-4 border-t border-[#222B26] grid grid-cols-2 gap-3">
                  <Link
                    to="/favorites"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-sm bg-[#18201D] text-xs font-medium text-white hover:text-[#B49A70] transition-colors"
                  >
                    <Heart className="w-4 h-4 text-[#B49A70]" />
                    <span>{t('nav.favorites')}</span>
                    {favorites.length > 0 && (
                      <span className="ml-auto rtl:ml-0 rtl:mr-auto px-1.5 py-0.5 rounded-full bg-[#B49A70] text-[#111715] font-bold text-[10px]">
                        {favorites.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/compare"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-sm bg-[#18201D] text-xs font-medium text-white hover:text-[#B49A70] transition-colors"
                  >
                    <Layers className="w-4 h-4 text-[#B49A70]" />
                    <span>{t('nav.compare')}</span>
                    {compareProperties.length > 0 && (
                      <span className="ml-auto rtl:ml-0 rtl:mr-auto px-1.5 py-0.5 rounded-full bg-[#B49A70] text-[#111715] font-bold text-[10px]">
                        {compareProperties.length}
                      </span>
                    )}
                  </Link>
                </div>
              </div>

              {/* Drawer Footer / CTA & Global Actions */}
              <div className="p-6 border-t border-[#222B26] flex flex-col space-y-4 bg-[#141C19]">
                {/* Book Viewing CTA */}
                <Button
                  size="md"
                  variant="primary"
                  className="w-full text-xs uppercase tracking-wider py-3 font-semibold"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenViewingModal?.();
                  }}
                  icon={<Calendar className="w-4 h-4" />}
                >
                  {t('nav.bookViewing')}
                </Button>

                {/* Currency, Language & Concierge */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center gap-1.5 text-white/90 hover:text-[#B49A70] cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#B49A70]" />
                      <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                    </button>

                    <button
                      onClick={toggleCurrency}
                      className="px-2 py-0.5 rounded border border-[#2A3530] text-white/90 hover:border-[#B49A70] hover:text-[#B49A70] cursor-pointer"
                    >
                      {currency}
                    </button>
                  </div>

                  <a
                    href="tel:+97444998800"
                    className="flex items-center gap-1.5 text-[#B49A70] hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span dir="ltr">+974 4499 8800</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
