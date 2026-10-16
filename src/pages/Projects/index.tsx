import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Compass, Filter } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { projects } from '../../data';
import { localizeStatus, localizeAreaName } from '../../utils/localize';

export const ProjectsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (selectedArea !== 'all' && !p.location.area.toLowerCase().includes(selectedArea.toLowerCase())) return false;
    return true;
  });

  return (
    <PageLayout>
      <div className="pt-28 pb-24 bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: t('nav.home'), path: '/' },
                { label: t('nav.projects') },
              ]}
            />
          </div>

          {/* Headline */}
          <div className="pb-8 border-b border-[#E8E6E0]">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
              {t('projectsPage.badge')}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
              {lang === 'ar' ? 'المشاريع التطويرية الكبرى وإطلاقات المخططات' : 'Flagship Developments & Master Launches'}
            </h1>
            <p className="mt-3 text-sm text-[#777C76] font-light max-w-2xl leading-relaxed">
              {t('projectsPage.subtitle')}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-[#E8E6E0] rounded-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#777C76] font-semibold mr-1">
                {t('projectsPage.filterStatus')}
              </span>
              {['all', 'Off-Plan', 'Under Construction', 'Nearing Handover', 'Ready to Move'].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors ${
                      selectedStatus === status
                        ? 'bg-[#111715] text-[#B49A70]'
                        : 'bg-[#F8F7F4] text-[#777C76] hover:text-[#17201C] border border-[#E8E6E0]'
                    }`}
                  >
                    {status === 'all'
                      ? (lang === 'ar' ? 'كافة المشاريع' : 'All Launches')
                      : localizeStatus(status, lang)}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#777C76] font-semibold">
                {t('projectsPage.filterArea')}
              </span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm px-3 py-1.5 text-xs text-[#17201C] outline-none cursor-pointer"
              >
                <option value="all">{t('projectsPage.allEnclaves')}</option>
                <option value="Lusail">{localizeAreaName('Lusail City', lang)}</option>
                <option value="The Pearl">{localizeAreaName('The Pearl-Qatar', lang)}</option>
                <option value="West Bay">{localizeAreaName('West Bay', lang)}</option>
                <option value="Msheireb">{localizeAreaName('Msheireb Downtown', lang)}</option>
                <option value="Katara">{localizeAreaName('Katara Hills', lang)}</option>
                <option value="Al Waab">{localizeAreaName('Al Waab', lang)}</option>
              </select>
            </div>
          </div>

          {/* Grid of Projects */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
