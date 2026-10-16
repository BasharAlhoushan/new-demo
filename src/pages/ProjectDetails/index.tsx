import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Download, 
  FileCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Layers,
  PhoneCall
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ScheduleViewingModal } from '../../components/property/ScheduleViewingModal';
import { getProjectBySlug, properties } from '../../data';
import { formatPrice } from '../../utils/formatters';
import { useCurrencyStore } from '../../store/currencyStore';
import { 
  localizeStatus, 
  localizeAreaName, 
  localizeFeature, 
  localizeUnitType, 
  localizePostHandover 
} from '../../utils/localize';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const { currency } = useCurrencyStore();

  const project = getProjectBySlug(slug || '');
  const [presentationModalOpen, setPresentationModalOpen] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  if (!project) {
    return (
      <PageLayout>
        <div className="py-36 text-center">
          <h2 className="font-serif text-3xl mb-4">{t('projectDetails.notFound')}</h2>
          <Link to="/projects">
            <Button variant="dark" size="md">
              {t('projectDetails.returnToList')}
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleBrochureDownload = () => {
    setBrochureDownloaded(true);
    setTimeout(() => setBrochureDownloaded(false), 4000);
  };

  return (
    <PageLayout>
      {/* Cinematic Hero */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end bg-[#111715] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.name[lang]}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111715] via-[#111715]/60 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Breadcrumbs
            className="mb-6 text-white/70"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.projects'), path: '/projects' },
              { label: project.name[lang] },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="glass" size="sm">
              <span className="text-white font-semibold">{localizeStatus(project.status, lang)}</span>
            </Badge>
            <Badge variant="gold" size="sm">
              <span className="text-[#8F764F]">
                {lang === 'ar' ? 'التسليم المتوقع:' : 'Handover:'} {project.completionDate}
              </span>
            </Badge>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight max-w-4xl leading-tight">
            {project.name[lang]}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/80 font-light max-w-2xl leading-relaxed">
            {project.tagline[lang]}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-white/70">
            <span className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#B49A70]" />
              <span>{lang === 'ar' ? 'المطور الرئيسي:' : 'Developer:'} {project.developer[lang]}</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B49A70]" />
              <span>{project.location[lang]}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Overview & Concept */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 bg-white p-8 sm:p-10 border border-[#E8E6E0] rounded-sm shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
                  {t('projectDetails.conceptBadge')}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#17201C] font-medium">
                  {lang === 'ar'
                    ? `إبداع معماري استثنائي في ${localizeAreaName(project.location.area, lang)}`
                    : `Visionary Craftsmanship in ${project.location.area}`}
                </h2>
              </div>

              <p className="text-sm text-[#17201C]/80 leading-relaxed font-light">
                {project.description[lang]}
              </p>

              {/* Key Features Bullet List */}
              <div className="pt-4 border-t border-[#E8E6E0]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#17201C] mb-4">
                  {lang === 'ar' ? 'أبرز المزايا الهندسية والتصميمية الاستثنائية:' : 'Signature Engineering & Design Highlights:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#17201C]">
                      <Sparkles className="w-4 h-4 text-[#B49A70] shrink-0 mt-0.5" />
                      <span>{localizeFeature(feat, lang)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions Sidebar */}
            <div className="lg:col-span-4 bg-[#111715] text-[#F8F7F4] p-8 rounded-sm border border-[#222B26] space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B49A70] block">
                  {t('projects.startingFrom')}
                </span>
                <div className="font-serif text-3xl font-semibold text-white tracking-tight mt-1">
                  {formatPrice(project.startingPrice, currency, lang)}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#222B26]">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setPresentationModalOpen(true)}
                  icon={<Calendar className="w-4 h-4" />}
                >
                  {t('projects.schedulePresentation')}
                </Button>

                <Button
                  variant="outline-light"
                  size="md"
                  className="w-full"
                  onClick={handleBrochureDownload}
                  icon={brochureDownloaded ? <CheckCircle2 className="w-4 h-4 text-[#B49A70]" /> : <Download className="w-4 h-4" />}
                >
                  {brochureDownloaded
                    ? (lang === 'ar' ? 'تم طلب الكتيب الشامل' : 'Master Brochure Queued')
                    : t('projects.downloadBrochure')}
                </Button>
              </div>

              {brochureDownloaded && (
                <div className="p-3 bg-[#18201D] border border-[#B49A70]/30 rounded-sm text-[11px] text-[#B49A70]">
                  {t('projectDetails.requestDossier')}
                </div>
              )}
            </div>
          </div>

          {/* Available Units Matrix Table */}
          <div className="bg-white p-8 sm:p-10 border border-[#E8E6E0] rounded-sm shadow-sm">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-1">
                {t('projectDetails.inventoryBadge')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17201C] font-medium">
                {t('projects.availableUnits')}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead>
                  <tr className="border-b border-[#E8E6E0] text-[#777C76] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">{t('projectDetails.unitConfiguration')}</th>
                    <th className="py-3.5 px-4 font-semibold">{t('projectDetails.internalArea')}</th>
                    <th className="py-3.5 px-4 font-semibold">{t('projectDetails.startingValuation')}</th>
                    <th className="py-3.5 px-4 font-semibold">{lang === 'ar' ? 'الوحدات المتبقية' : 'Remaining Allocation'}</th>
                    <th className="py-3.5 px-4 font-semibold text-right rtl:text-left">{lang === 'ar' ? 'استفسار' : 'Inquire'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E6E0]">
                  {project.availableUnits.map((unit, idx) => (
                    <tr key={idx} className="hover:bg-[#F8F7F4]/60 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#17201C]">{localizeUnitType(unit.type, lang)}</td>
                      <td className="py-4 px-4 text-[#777C76]">{unit.sizeSqM} {t('properties.sqm')}</td>
                      <td className="py-4 px-4 font-serif font-semibold text-[#17201C] text-sm">
                        {formatPrice(unit.startingPrice, currency, lang)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                          {unit.availableCount} {lang === 'ar' ? 'وحدات متاحة' : 'Available'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right rtl:text-left">
                        <button
                          onClick={() => setPresentationModalOpen(true)}
                          className="text-xs font-semibold uppercase tracking-wider text-[#B49A70] hover:text-[#17201C]"
                        >
                          {lang === 'ar' ? '← حجز' : 'Reserve →'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Plan Timeline */}
          <div className="bg-white p-8 sm:p-10 border border-[#E8E6E0] rounded-sm shadow-sm">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-1">
                {lang === 'ar' ? 'خطة استثمارية مرنة' : 'FLEXIBLE INVESTMENT'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17201C] font-medium">
                {t('projects.paymentPlan')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#777C76] font-semibold block mb-1">
                  {lang === 'ar' ? 'المرحلة ٠١' : 'Step 01'}
                </span>
                <div className="font-serif text-3xl font-semibold text-[#17201C] mb-2">
                  {project.paymentPlan.downPaymentPercent}%
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17201C] mb-1">
                  {t('projectDetails.downPayment')}
                </h4>
                <p className="text-xs text-[#777C76] font-light">
                  {lang === 'ar' ? 'عند الحجز وتوقيع عقد البيع المبدئي.' : 'Upon reservation and sale contract signing.'}
                </p>
              </div>

              <div className="p-6 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#777C76] font-semibold block mb-1">
                  {lang === 'ar' ? 'المرحلة ٠٢' : 'Step 02'}
                </span>
                <div className="font-serif text-3xl font-semibold text-[#17201C] mb-2">
                  {project.paymentPlan.constructionPercent}%
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17201C] mb-1">
                  {t('projectDetails.duringConstruction')}
                </h4>
                <p className="text-xs text-[#777C76] font-light">
                  {lang === 'ar' ? 'مرتبطة بمراحل الإنجاز والإنشاء المعتمدة.' : 'Linked to verified construction milestones.'}
                </p>
              </div>

              <div className="p-6 bg-[#111715] text-white border border-[#222B26] rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#B49A70] font-semibold block mb-1">
                  {lang === 'ar' ? 'المرحلة ٠٣' : 'Step 03'}
                </span>
                <div className="font-serif text-3xl font-semibold text-white mb-2">
                  {project.paymentPlan.handoverPercent}%
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B49A70] mb-1">
                  {t('projectDetails.onHandover')}
                </h4>
                <p className="text-xs text-[#777C76] font-light">
                  {localizePostHandover(project.paymentPlan.postHandoverDuration || 'Key collection and title registration.', lang)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScheduleViewingModal
        isOpen={presentationModalOpen}
        onClose={() => setPresentationModalOpen(false)}
        propertyTitle={lang === 'ar' ? `إطلاق حصري: ${project.name[lang]}` : `Flagship Launch: ${project.name[lang]}`}
      />
    </PageLayout>
  );
};

