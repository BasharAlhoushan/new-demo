import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Award, Users, Compass, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';
import { agents } from '../../data';

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';

  const stats = [
    { value: '4.8B+ QAR', label: t('about.stats.portfolioValue') },
    { value: '280+', label: t('about.stats.propertiesSold') },
    { value: '98.4%', label: t('about.stats.clientSatisfaction') },
    { value: '18+', label: t('about.stats.yearsExperience') },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end bg-[#111715] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="THE ONE Luxury Real Estate Heritage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111715] via-[#111715]/60 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Breadcrumbs
            className="mb-4 text-white/70"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.about') },
            ]}
          />

          <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
            {t('about.badge')}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight max-w-4xl leading-tight">
            {t('about.title')}
          </h1>
        </div>
      </div>

      <div className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Story & Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block">
                {t('aboutPage.badge')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#17201C] font-medium leading-tight">
                {t('aboutPage.title')}
              </h2>
              <p className="text-sm text-[#17201C]/80 leading-relaxed font-light">
                {t('aboutPage.p1')}
              </p>
              <p className="text-sm text-[#17201C]/80 leading-relaxed font-light">
                {t('aboutPage.p2')}
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-[#18201D] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural precision"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rtl:-left-auto rtl:-right-6 bg-[#111715] text-white p-6 rounded-sm border border-[#222B26] shadow-2xl hidden sm:block">
                <span className="font-serif text-3xl font-semibold text-[#B49A70] block">18+</span>
                <span className="text-xs text-[#777C76] uppercase tracking-wider">{t('about.stats.yearsExperience')}</span>
              </div>
            </div>
          </div>

          {/* Core Values 3-Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-[#E8E6E0] rounded-sm shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#B49A70] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#17201C] mb-2">{t('aboutPage.v1Title')}</h3>
              <p className="text-xs text-[#777C76] leading-relaxed font-light">
                {t('aboutPage.v1Desc')}
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E8E6E0] rounded-sm shadow-sm">
              <Compass className="w-8 h-8 text-[#B49A70] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#17201C] mb-2">{t('aboutPage.v2Title')}</h3>
              <p className="text-xs text-[#777C76] leading-relaxed font-light">
                {t('aboutPage.v2Desc')}
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E8E6E0] rounded-sm shadow-sm">
              <Award className="w-8 h-8 text-[#B49A70] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#17201C] mb-2">{t('aboutPage.v3Title')}</h3>
              <p className="text-xs text-[#777C76] leading-relaxed font-light">
                {t('aboutPage.v3Desc')}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-[#111715] text-white p-10 sm:p-14 rounded-sm border border-[#222B26]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#222B26] rtl:divide-x-reverse text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="pt-4 lg:pt-0">
                  <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#B49A70] tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#777C76] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[11px] text-center text-[#777C76] font-light">
              * Demonstration benchmarks reflecting representative practice metrics.
            </p>
          </div>

          {/* Leadership Team (8 Agents) */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
                {t('aboutPage.leadershipBadge')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#17201C] font-medium">
                {t('about.leadership')}
              </h2>
              <p className="mt-3 text-sm text-[#777C76] font-light">
                {t('aboutPage.leadershipSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white border border-[#E8E6E0] rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#B49A70]/50 transition-all duration-300"
                >
                  <div>
                    <div className="aspect-[4/5] overflow-hidden bg-[#18201D]">
                      <img
                        src={agent.image}
                        alt={agent.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <span className="text-[10px] uppercase tracking-wider text-[#B49A70] font-semibold block mb-1">
                        {agent.specialization}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#17201C]">
                        {agent.name[lang]}
                      </h3>
                      <p className="text-xs text-[#777C76] mb-3 leading-tight">
                        {agent.title[lang]}
                      </p>
                      <p className="text-xs text-[#777C76] font-light line-clamp-3 leading-relaxed">
                        {agent.bio[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#F8F7F4] flex items-center justify-between text-xs text-[#777C76]">
                    <a
                      href={`tel:${agent.phone}`}
                      className="hover:text-[#B49A70] flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B49A70]" />
                      <span>{lang === 'ar' ? 'اتصال مباشر' : 'Direct'}</span>
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="hover:text-[#B49A70] flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B49A70]" />
                      <span>{lang === 'ar' ? 'بريد إلكتروني' : 'Email'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
