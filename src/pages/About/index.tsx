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

  const commitments = [
    { value: lang === 'ar' ? 'معتمد' : 'Verified', label: lang === 'ar' ? 'وساطة واستشارات مرخصة' : 'Licensed Real Estate Brokerage' },
    { value: lang === 'ar' ? 'مختارة' : 'Curated', label: lang === 'ar' ? 'عقارات في أرقى مناطق قطر' : 'Prime Qatar Enclaves & Estates' },
    { value: lang === 'ar' ? 'شفافية' : 'Integrity', label: lang === 'ar' ? 'تقييمات واقعية وموثوقة' : 'Transparent Market Guidance' },
    { value: lang === 'ar' ? 'سرية' : 'Discreet', label: lang === 'ar' ? 'حماية تامة لخصوصية العملاء' : 'Confidential Client Representation' },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative min-h-[44vh] sm:min-h-[50vh] flex items-end bg-[#10212B] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="THE ONE Real Estate Qatar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10212B] via-[#10212B]/60 to-black/30" />

        <div className="relative z-10 max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <Breadcrumbs
            className="mb-4 text-white/70"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.about') },
            ]}
          />

          <span className="text-xs uppercase tracking-wider text-[#B69A70] font-semibold block mb-2">
            {t('about.badge')}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight max-w-4xl leading-tight">
            {t('about.title')}
          </h1>
        </div>
      </div>

      <div className="py-16 sm:py-20 bg-[#F7F5F0]">
        <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Story & Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs uppercase tracking-wider text-[#B69A70] font-semibold block">
                {t('aboutPage.badge')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#10212B] font-medium leading-tight">
                {t('aboutPage.title')}
              </h2>
              <p className="text-xs sm:text-sm text-[#172B35]/85 leading-relaxed font-light">
                {t('aboutPage.p1')}
              </p>
              <p className="text-xs sm:text-sm text-[#172B35]/85 leading-relaxed font-light">
                {t('aboutPage.p2')}
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#10212B] shadow-lg border border-[#E7E3DA]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="THE ONE Real Estate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Core Values 3-Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 border border-[#E7E3DA] rounded-2xl shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[#B69A70] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-[#10212B] mb-2">{t('aboutPage.v1Title')}</h3>
              <p className="text-xs text-[#727A7B] leading-relaxed font-light">
                {t('aboutPage.v1Desc')}
              </p>
            </div>

            <div className="bg-white p-7 border border-[#E7E3DA] rounded-2xl shadow-xs">
              <Compass className="w-8 h-8 text-[#B69A70] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-[#10212B] mb-2">{t('aboutPage.v2Title')}</h3>
              <p className="text-xs text-[#727A7B] leading-relaxed font-light">
                {t('aboutPage.v2Desc')}
              </p>
            </div>

            <div className="bg-white p-7 border border-[#E7E3DA] rounded-2xl shadow-xs">
              <Award className="w-8 h-8 text-[#B69A70] mb-4" />
              <h3 className="font-serif text-lg font-semibold text-[#10212B] mb-2">{t('aboutPage.v3Title')}</h3>
              <p className="text-xs text-[#727A7B] leading-relaxed font-light">
                {t('aboutPage.v3Desc')}
              </p>
            </div>
          </div>

          {/* Commitments Bar */}
          <div className="bg-[#10212B] text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10 rtl:divide-x-reverse text-center">
              {commitments.map((c, idx) => (
                <div key={idx} className="pt-4 lg:pt-0">
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#B69A70] tracking-tight mb-1.5">
                    {c.value}
                  </div>
                  <div className="text-xs text-white/80 font-medium">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
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
