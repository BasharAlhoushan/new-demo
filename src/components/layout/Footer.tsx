import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Camera, 
  Globe, 
  Share2, 
  Send 
} from 'lucide-react';
import { Button } from '../common/Button';
import { BrandLogo } from '../common/BrandLogo';
import { localizeAreaName } from '../../utils/localize';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#10212B] text-white border-t border-[#174B65]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <BrandLogo variant="white" size="lg" />
            </div>

            <p className="text-sm text-[#777C76] leading-relaxed max-w-md font-light">
              {t('hero.subtitle')}
            </p>

            {/* Newsletter Box */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-widest text-white/90 font-medium mb-3">
                {t('footer.newsletterTitle')}
              </h4>
              <p className="text-xs text-[#777C76] mb-3">
                {t('footer.newsletterSubtitle')}
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#18201D] border border-[#B49A70]/40 rounded-sm text-[#B49A70] text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t('footer.newsletterSuccess')}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t('footer.newsletterPlaceholder')}
                    className="flex-1 bg-[#18201D] border border-[#2A3530] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-[#777C76] outline-none transition-colors"
                  />
                  <Button type="submit" size="sm" variant="primary">
                    {t('footer.newsletterButton')}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B49A70] mb-5">
              {t('footer.portfolio')}
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#777C76]">
              <li>
                <Link to="/buy" className="hover:text-white transition-colors">
                  {t('footer.buyResidences')}
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-white transition-colors">
                  {t('footer.luxuryLeasing')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  {t('footer.flagshipDevelopments')}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition-colors">
                  {t('nav.favorites')}
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  {t('nav.compare')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Areas */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B49A70] mb-5">
              {t('footer.primeDestinations')}
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#777C76]">
              <li>
                <Link to="/areas/the-pearl" className="hover:text-white transition-colors">
                  {localizeAreaName('The Pearl-Qatar', lang)}
                </Link>
              </li>
              <li>
                <Link to="/areas/lusail-city" className="hover:text-white transition-colors">
                  {localizeAreaName('Lusail City', lang)}
                </Link>
              </li>
              <li>
                <Link to="/areas/west-bay" className="hover:text-white transition-colors">
                  {localizeAreaName('West Bay Lagoon', lang)}
                </Link>
              </li>
              <li>
                <Link to="/areas/msheireb-downtown" className="hover:text-white transition-colors">
                  {localizeAreaName('Msheireb Downtown', lang)}
                </Link>
              </li>
              <li>
                <Link to="/areas/katara-hills" className="hover:text-white transition-colors">
                  {localizeAreaName('Katara Hills', lang)}
                </Link>
              </li>
              <li>
                <Link to="/areas/al-waab" className="hover:text-white transition-colors">
                  {localizeAreaName('Al Waab', lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B49A70] mb-5">
              {t('contact.badge')}
            </h4>
            <ul className="space-y-3.5 text-xs text-[#777C76]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B49A70] shrink-0 mt-0.5" />
                <span>{t('contact.address')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B49A70] shrink-0" />
                <a href="tel:+97444998800" dir="ltr" className="hover:text-white transition-colors">
                  +974 4499 8800
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B49A70] shrink-0" />
                <a href="mailto:concierge@theonerealestate.qa" dir="ltr" className="hover:text-white transition-colors">
                  concierge@theonerealestate.qa
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-6 text-[#777C76]">
              <a href="#" className="p-2 rounded-full bg-[#18201D] hover:text-[#B49A70] hover:bg-[#222B26] transition-colors" aria-label="Visual Gallery">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#18201D] hover:text-[#B49A70] hover:bg-[#222B26] transition-colors" aria-label="International Portal">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#18201D] hover:text-[#B49A70] hover:bg-[#222B26] transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#18201D] hover:text-[#B49A70] hover:bg-[#222B26] transition-colors" aria-label="Direct Message">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#777C76] gap-4">
          <p>© {new Date().getFullYear()} THE ONE REAL ESTATE. {t('footer.legal')}</p>
          <p className="text-[11px] max-w-xl text-center md:text-right font-light">
            {t('footer.disclaimer')} {t('footer.regulatoryCredentials')}
          </p>
        </div>
      </div>
    </footer>
  );
};

