import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Layers,
  Menu,
  X,
  Phone,
  MessageCircle,
  Globe
} from 'lucide-react';
import { setAppLanguage } from '../../i18n/config';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCompareStore } from '../../store/compareStore';
import { useCurrencyStore } from '../../store/currencyStore';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenViewingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const isRTL = lang === 'ar';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const favorites = useFavoritesStore((s) => s.favorites);
  const compareProperties = useCompareStore((s) => s.properties);
  const { currency, toggleCurrency } = useCurrencyStore();

  const isCurrentHome = location.pathname === '/';

  // Transparent only when on Homepage and not scrolled
  const isTransparent = isCurrentHome && !isScrolled;
  const logoVariant = isTransparent ? 'white' : 'black';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
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
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setAppLanguage(nextLang);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/buy', label: t('nav.buy') },
    { to: '/rent', label: t('nav.rent') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/areas', label: t('nav.areas') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
            : 'bg-white/95 backdrop-blur-md border-b border-[#E7E3DA] shadow-sm py-3'
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* 1. Official Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <BrandLogo variant={logoVariant} size="md" />
            </div>

            {/* 2. Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-1 min-w-0 px-2"
            >
              {navLinks.map((item) => {
                const isActive =
                  item.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`text-[13px] font-medium tracking-wide transition-colors py-1 relative whitespace-nowrap ${
                      isActive
                        ? 'text-[#B69A70] font-semibold'
                        : isTransparent
                        ? 'text-white/90 hover:text-[#B69A70]'
                        : 'text-[#172B35] hover:text-[#B69A70]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B69A70] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right Utilities (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Currency Switcher */}
              <button
                type="button"
                onClick={toggleCurrency}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded transition-colors ${
                  isTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-[#172B35] hover:bg-[#F7F5F0]'
                }`}
                title="Switch Currency"
              >
                {currency}
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded transition-colors ${
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-[#172B35] hover:bg-[#F7F5F0]'
                }`}
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* Compare Icon with Badge */}
              <Link
                to="/compare"
                className={`relative p-2 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/15'
                    : 'text-[#172B35] hover:bg-[#F7F5F0]'
                }`}
                aria-label="Compare properties"
                title={t('nav.compare')}
              >
                <Layers className="w-4 h-4" />
                {compareProperties.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B69A70] text-[#10212B] text-[10px] font-bold flex items-center justify-center">
                    {compareProperties.length}
                  </span>
                )}
              </Link>

              {/* Favorites Icon with Badge */}
              <Link
                to="/favorites"
                className={`relative p-2 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white hover:bg-white/15'
                    : 'text-[#172B35] hover:bg-[#F7F5F0]'
                }`}
                aria-label="Favorite properties"
                title={t('nav.favorites')}
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* WhatsApp Quick CTA */}
              <a
                href="https://wa.me/97444998800"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>

            {/* 4. Mobile Controls (Logo + Favorites + Menu Toggle) */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  isTransparent ? 'text-white' : 'text-[#10212B]'
                }`}
              >
                {lang === 'en' ? 'عربي' : 'EN'}
              </button>

              {/* Mobile Favorites shortcut */}
              <Link
                to="/favorites"
                className={`relative p-2 rounded-full ${
                  isTransparent ? 'text-white' : 'text-[#10212B]'
                }`}
                aria-label="Favorites"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors focus:outline-none ${
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-[#10212B] hover:bg-[#F7F5F0]'
                }`}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 5. Mobile Navigation Drawer (Native App Experience) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.aside
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className={`fixed top-0 bottom-0 ${
                isRTL ? 'right-0' : 'left-0'
              } w-[85%] max-w-[340px] bg-white z-50 flex flex-col justify-between shadow-2xl overflow-y-auto`}
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#E7E3DA]">
                  <BrandLogo variant="black" size="sm" />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#727A7B] hover:text-[#10212B] rounded-lg focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-3 space-y-1">
                  {navLinks.map((item) => {
                    const isActive =
                      item.to === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#10212B] text-white font-semibold'
                            : 'text-[#172B35] hover:bg-[#F7F5F0]'
                        }`}
                      >
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Saved & Compare Quick Links */}
                <div className="px-3 pt-2 pb-3 border-t border-[#E7E3DA] space-y-1">
                  <Link
                    to="/favorites"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-[#172B35] hover:bg-[#F7F5F0]"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-600" />
                      <span>{t('nav.favorites')}</span>
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">
                      {favorites.length}
                    </span>
                  </Link>

                  <Link
                    to="/compare"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-[#172B35] hover:bg-[#F7F5F0]"
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#B69A70]" />
                      <span>{t('nav.compare')}</span>
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#B69A70]/10 text-[#B69A70]">
                      {compareProperties.length}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-[#E7E3DA] bg-[#F7F5F0]/60 space-y-2.5">
                {/* Language & Currency Row */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#E7E3DA] bg-white text-xs font-semibold text-[#10212B]"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#B69A70]" />
                    <span>{lang === 'en' ? 'العربية' : 'English'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleCurrency}
                    className="flex-1 py-2 px-3 rounded-lg border border-[#E7E3DA] bg-white text-xs font-semibold text-[#10212B]"
                  >
                    <span>Currency: {currency}</span>
                  </button>
                </div>

                {/* Direct Contact CTAs */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://wa.me/97444998800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                  </a>

                  <a
                    href="tel:+97444998800"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#10212B] text-white text-xs font-semibold shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B69A70]" />
                    <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
