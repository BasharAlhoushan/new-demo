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
      <div className="relative min-h-[55vh] sm:min-h-[65vh] flex items-end bg-[#10212B] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.name[lang]}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10212B] via-[#10212B]/70 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
          <Breadcrumbs
            className="mb-6 text-white/70"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.projects'), path: '/projects' },
              { label: project.name[lang] },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="glass" size="sm">
              <span className="text-white font-semibold">{localizeStatus(project.status, lang)}</span>
            </Badge>
            <Badge variant="gold" size="sm">
              <span className="text-[#B69A70]">
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
              <Building className="w-4 h-4 text-[#B69A70]" />
              <span>{lang === 'ar' ? 'المطور الرئيسي:' : 'Developer:'} {project.developer[lang]}</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B69A70]" />
              <span>{project.location[lang]}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="py-12 sm:py-16 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Overview & Concept */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white p-6 sm:p-10 border border-[#E7E3DA] rounded-2xl shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-2">
                  {t('projectDetails.conceptBadge')}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#172B35] font-medium">
                  {lang === 'ar'
                    ? `إبداع معماري استثنائي في ${localizeAreaName(project.location.area, lang)}`
                    : `Visionary Craftsmanship in ${project.location.area}`}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#727A7B] leading-relaxed font-light">
                {project.description[lang]}
              </p>

              {/* Key Features Bullet List */}
              <div className="pt-6 border-t border-[#E7E3DA]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#172B35] mb-4">
                  {lang === 'ar' ? 'أبرز المزايا الهندسية والتصميمية الاستثنائية:' : 'Signature Engineering & Design Highlights:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#172B35]">
                      <Sparkles className="w-4 h-4 text-[#B69A70] shrink-0 mt-0.5" />
                      <span>{localizeFeature(feat, lang)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions Sidebar */}
            <div className="lg:col-span-4 bg-[#10212B] text-white p-6 sm:p-8 rounded-2xl border border-[#1E3A4B] space-y-6 shadow-sm">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#B69A70] font-semibold block">
                  {t('projects.startingFrom')}
                </span>
                <div className="font-serif text-3xl font-semibold text-white tracking-tight mt-1.5">
                  {formatPrice(project.startingPrice, currency, lang)}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setPresentationModalOpen(true)}
                  icon={<Calendar className="w-4 h-4" />}
                >
                  {t('projects.schedulePresentation')}
                </Button>

                <Button
                  variant="outline-light"
                  size="md"
                  className="w-full justify-center"
                  onClick={handleBrochureDownload}
                  icon={brochureDownloaded ? <CheckCircle2 className="w-4 h-4 text-[#B69A70]" /> : <Download className="w-4 h-4" />}
                >
                  {brochureDownloaded
                    ? (lang === 'ar' ? 'تم طلب الكتيب الشامل' : 'Master Brochure Queued')
                    : t('projects.downloadBrochure')}
                </Button>
              </div>

              {brochureDownloaded && (
                <div className="p-3 bg-[#174B65]/40 border border-[#B69A70]/30 rounded-xl text-xs text-[#B69A70]">
                  {t('projectDetails.requestDossier')}
                </div>
              )}
            </div>
          </div>

          {/* Available Units Matrix Table */}
          <div className="bg-white p-6 sm:p-10 border border-[#E7E3DA] rounded-2xl shadow-sm">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
                {t('projectDetails.inventoryBadge')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#172B35] font-medium">
                {t('projects.availableUnits')}
              </h2>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
              <table className="w-full text-left rtl:text-right text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E7E3DA] text-[#727A7B] uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 font-semibold">{t('projectDetails.unitConfiguration')}</th>
                    <th className="py-3.5 px-4 font-semibold">{t('projectDetails.internalArea')}</th>
                    <th className="py-3.5 px-4 font-semibold">{t('projectDetails.startingValuation')}</th>
                    <th className="py-3.5 px-4 font-semibold">{lang === 'ar' ? 'الوحدات المتبقية' : 'Remaining Allocation'}</th>
                    <th className="py-3.5 px-4 font-semibold text-right rtl:text-left">{lang === 'ar' ? 'استفسار' : 'Inquire'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E3DA]">
                  {project.availableUnits.map((unit, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F5F0]/60 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#172B35]">{localizeUnitType(unit.type, lang)}</td>
                      <td className="py-4 px-4 text-[#727A7B]">{unit.sizeSqM} {t('properties.sqm')}</td>
                      <td className="py-4 px-4 font-serif font-semibold text-[#172B35] text-sm sm:text-base">
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
                          className="text-xs font-semibold uppercase tracking-wider text-[#B69A70] hover:text-[#172B35] transition-colors"
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
          <div className="bg-white p-6 sm:p-10 border border-[#E7E3DA] rounded-2xl shadow-sm">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
                {lang === 'ar' ? 'خطة استثمارية مرنة' : 'FLEXIBLE INVESTMENT'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#172B35] font-medium">
                {t('projects.paymentPlan')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F7F5F0] border border-[#E7E3DA] rounded-2xl">
                <span className="text-[10px] uppercase tracking-widest text-[#727A7B] font-semibold block mb-1">
                  {lang === 'ar' ? 'المرحلة ٠١' : 'Step 01'}
                </span>
                <div className="font-serif text-3xl font-semibold text-[#172B35] mb-2">
                  {project.paymentPlan.downPaymentPercent}%
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172B35] mb-1">
                  {t('projectDetails.downPayment')}
                </h4>
                <p className="text-xs text-[#727A7B] font-light">
                  {lang === 'ar' ? 'عند الحجز وتوقيع عقد البيع المبدئي.' : 'Upon reservation and sale contract signing.'}
                </p>
              </div>

              <div className="p-6 bg-[#F7F5F0] border border-[#E7E3DA] rounded-2xl">
                <span className="text-[10px] uppercase tracking-widest text-[#727A7B] font-semibold block mb-1">
                  {lang === 'ar' ? 'المرحلة ٠٢' : 'Step 02'}
                </span>
                <div className="font-serif text-3xl font-semibold text-[#172B35] mb-2">
                  {project.paymentPlan.constructionPercent}%
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172B35] mb-1">
                  {t('projectDetails.duringConstruction')}
                </h4>
                <p className="text-xs text-[#727A7B] font-light">
                  {lang === 'ar' ? 'مرتبطة بمراحل الإنجاز والإنشاء المعتمدة.' : 'Linked to verified construction milestones.'}
                </p>
              </div>

              <div className="p-6 bg-[#10212B] text-white border border-[#1E3A4B] rounded-2xl">
                <span className="text-[10px] uppercase tracking-widest text-[#B69A70] font-semibold block mb-1">
                  {lang === 'ar' ? 'المرحلة ٠٣' : 'Step 03'}
                </span>
                <div className="font-serif text-3xl font-semibold text-white mb-2">
                  {project.paymentPlan.handoverPercent}%
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B69A70] mb-1">
                  {t('projectDetails.onHandover')}
                </h4>
                <p className="text-xs text-white/70 font-light">
                  {localizePostHandover(project.paymentPlan.postHandoverDuration || 'Key collection and title registration.', lang)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E7E3DA] px-4 py-3 z-40 shadow-lg pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-[#727A7B] block truncate">
              {t('projects.startingFrom')}
            </span>
            <div className="font-serif text-base font-semibold text-[#172B35] truncate">
              {formatPrice(project.startingPrice, currency, lang)}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="shrink-0"
            onClick={() => setPresentationModalOpen(true)}
            icon={<Calendar className="w-3.5 h-3.5" />}
          >
            {lang === 'ar' ? 'طلب تفاصيل' : 'Inquire Now'}
          </Button>
          <a
            href="https://wa.me/97444998800"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-[#E7E3DA] text-[#172B35] hover:bg-[#F7F5F0] transition-colors shrink-0"
            aria-label="WhatsApp"
          >
            <PhoneCall className="w-4 h-4 text-[#10212B]" />
          </a>
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

