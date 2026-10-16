import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const ArchitectureStatement: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '4.8B+ QAR', label: t('about.stats.portfolioValue') },
    { value: '280+', label: t('about.stats.propertiesSold') },
    { value: '98.4%', label: t('about.stats.clientSatisfaction') },
    { value: '18+', label: t('about.stats.yearsExperience') },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F8F7F4] border-t border-[#E8E6E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#B49A70] block mb-4">
            {t('home.architecture.badge')}
          </span>

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#17201C] font-normal leading-relaxed italic">
            {t('home.architecture.quote')}
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#B49A70]" />
            <span className="text-xs uppercase tracking-widest text-[#777C76] font-medium">
              {t('home.architecture.editorial')}
            </span>
            <span className="h-px w-10 bg-[#B49A70]" />
          </div>
        </div>

        {/* Animated Statistics Grid */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E6E0] rtl:divide-x-reverse">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center pt-6 lg:pt-0 px-4"
            >
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#17201C] tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#777C76] font-medium max-w-[160px] mx-auto">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-12 text-[11px] text-center text-[#777C76] font-light">
          {t('home.architecture.footnote')}
        </p>
      </div>
    </section>
  );
};
