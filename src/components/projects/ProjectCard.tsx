import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useCurrencyStore } from '../../store/currencyStore';
import { Badge } from '../common/Badge';
import { localizeStatus, localizeAreaName, localizePropertyType } from '../../utils/localize';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const { currency } = useCurrencyStore();

  const statusColors = {
    'Under Construction': 'bg-amber-500/20 text-amber-700 border-amber-300',
    'Off-Plan': 'bg-blue-500/20 text-blue-700 border-blue-300',
    'Ready to Move': 'bg-emerald-500/20 text-emerald-700 border-emerald-300',
    'Nearing Handover': 'bg-purple-500/20 text-purple-700 border-purple-300',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group relative bg-white border border-[#E8E6E0] rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-[#B49A70]/50 transition-all duration-500"
    >
      <div>
        {/* Hero Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#18201D]">
          <Link to={`/projects/${project.slug}`} className="block w-full h-full">
            <img
              src={project.heroImage}
              alt={project.name[lang]}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </Link>

          {/* Badges on top */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm border backdrop-blur-md ${
                statusColors[project.status] || 'bg-white/80 text-[#17201C]'
              }`}
            >
              {localizeStatus(project.status, lang)}
            </span>

            <Badge variant="glass" size="sm">
              <span className="flex items-center gap-1 text-[10px] text-white">
                <Calendar className="w-3 h-3 text-[#B49A70]" />
                {project.completionDate}
              </span>
            </Badge>
          </div>

          {/* Developer Tag at Bottom Left */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-xs">
            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-sm text-[11px] font-medium tracking-wide">
              <Building className="w-3 h-3 text-[#B49A70]" />
              {project.developer[lang]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-xs text-[#777C76] mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#B49A70] shrink-0" />
            <span>{localizeAreaName(project.location.area, lang)}</span>
          </div>

          <Link to={`/projects/${project.slug}`}>
            <h3 className="font-serif text-xl font-medium text-[#17201C] group-hover:text-[#B49A70] transition-colors leading-snug">
              {project.name[lang]}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-[#777C76] line-clamp-2 font-light leading-relaxed">
            {project.tagline[lang]}
          </p>

          {/* Unit Types Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.propertyTypes.slice(0, 3).map((pt, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F8F7F4] text-[#17201C] border border-[#E8E6E0] rounded-sm font-medium"
              >
                {localizePropertyType(pt, lang)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#E8E6E0] bg-[#F8F7F4]/60 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-[#777C76]">
            {t('projects.startingFrom')}
          </span>
          <span className="text-base sm:text-lg font-serif font-semibold text-[#17201C]">
            {formatPrice(project.startingPrice, currency, lang)}
          </span>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="p-2 rounded-full bg-white border border-[#E8E6E0] group-hover:bg-[#B49A70] group-hover:text-[#111715] group-hover:border-[#B49A70] text-[#17201C] transition-all"
          aria-label={lang === 'ar' ? 'عرض تفاصيل المشروع' : 'View Project'}
        >
          <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
        </Link>
      </div>
    </motion.article>
  );
};

