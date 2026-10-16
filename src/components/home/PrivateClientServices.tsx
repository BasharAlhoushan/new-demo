import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  KeyRound, 
  Sparkles, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  TrendingUp, 
  FileCheck2, 
  Compass,
  ArrowUpRight 
} from 'lucide-react';
import { services } from '../../data';
import { Button } from '../common/Button';

const iconMap: Record<string, React.ReactNode> = {
  KeyRound: <KeyRound className="w-6 h-6 text-[#B49A70]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#B49A70]" />,
  Building2: <Building2 className="w-6 h-6 text-[#B49A70]" />,
  Landmark: <Landmark className="w-6 h-6 text-[#B49A70]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#B49A70]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#B49A70]" />,
  FileCheck2: <FileCheck2 className="w-6 h-6 text-[#B49A70]" />,
  Compass: <Compass className="w-6 h-6 text-[#B49A70]" />,
};

export const PrivateClientServices: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';

  return (
    <section className="py-24 sm:py-32 bg-[#111715] text-[#F8F7F4] relative overflow-hidden">
      {/* Background Subtle Luxury Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B49A70]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B49A70]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#B49A70] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('services.badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              {t('services.title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#777C76] font-light max-w-xl">
              {t('services.subtitle')}
            </p>
          </div>

          <Link to="/services">
            <Button
              variant="outline-light"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4 rtl:rotate-90" />}
            >
              {t('home.services.allDisciplines')}
            </Button>
          </Link>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="group bg-[#18201D] border border-[#222B26] hover:border-[#B49A70]/50 p-6 sm:p-7 rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
            >
              <div>
                <div className="p-3 bg-[#111715] border border-[#2A3530] rounded-sm w-fit mb-5 group-hover:border-[#B49A70]/40 transition-colors">
                  {iconMap[service.iconName] || <KeyRound className="w-6 h-6 text-[#B49A70]" />}
                </div>

                <h3 className="font-serif text-lg font-medium text-white mb-2 leading-snug group-hover:text-[#B49A70] transition-colors">
                  {service.title[lang]}
                </h3>

                <p className="text-xs text-[#777C76] font-light leading-relaxed mb-6">
                  {service.shortDescription[lang]}
                </p>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B49A70] hover:text-white transition-colors"
              >
                <span>{t('home.services.discoverDetails')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
