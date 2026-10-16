import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { areas } from '../../data';

export const PrimeLocations: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';

  return (
    <section className="py-24 sm:py-32 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#B49A70] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('areas.badge')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
            {t('areas.title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#777C76] font-light leading-relaxed">
            {t('areas.subtitle')}
          </p>
        </div>

        {/* Asymmetrical Editorial Grid of Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {areas.map((area, idx) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`group relative overflow-hidden rounded-sm bg-[#111715] aspect-[4/3] ${
                idx === 0 || idx === 3 ? 'lg:col-span-2 aspect-[16/9]' : ''
              }`}
            >
              <Link to={`/areas/${area.slug}`} className="block w-full h-full">
                {/* Image */}
                <img
                  src={area.heroImage}
                  alt={area.name[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest font-semibold px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white">
                      {area.propertiesCount} {t('areas.availableListings')}
                    </span>

                    <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-[#B49A70] group-hover:text-[#111715] transition-all">
                      <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
                    </span>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#B49A70] font-medium block mb-1">
                      {area.headline[lang]}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-2 leading-tight">
                      {area.name[lang]}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 max-w-xl font-light">
                      {area.description[lang]}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
