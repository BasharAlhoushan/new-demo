import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Compass, Building2 } from 'lucide-react';
import { projects } from '../../data';
import { ProjectCard } from '../projects/ProjectCard';
import { Button } from '../common/Button';

export const SignatureProjects: React.FC = () => {
  const { t } = useTranslation();
  const signatureList = projects.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-y border-[#E8E6E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#B49A70] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{t('projects.badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#777C76] font-light max-w-xl">
              {t('projects.subtitle')}
            </p>
          </div>

          <Link to="/projects">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4 rtl:rotate-90" />}
            >
              {t('home.projects.allDevelopments')} ({projects.length})
            </Button>
          </Link>
        </div>

        {/* 3 Major Signature Projects Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureList.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
