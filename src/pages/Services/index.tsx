import React, { useState } from 'react';
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
  CheckCircle2, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';
import { ScheduleViewingModal } from '../../components/property/ScheduleViewingModal';
import { services } from '../../data';

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

export const ServicesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <PageLayout>
      <div className="pt-28 pb-24 bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.services') },
            ]}
          />

          <div className="pb-8 border-b border-[#E8E6E0] mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
              {t('servicesPage.badge')}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
              {t('services.title')}
            </h1>
            <p className="mt-3 text-sm text-[#777C76] font-light max-w-2xl leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Detailed Editorial Services List (Alternating Rows) */}
          <div className="space-y-16">
            {services.map((service, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className={`bg-white border border-[#E8E6E0] rounded-sm overflow-hidden flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } shadow-sm`}
                >
                  {/* Service Editorial Image */}
                  <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#18201D] relative">
                    <img
                      src={service.image}
                      alt={service.title[lang]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Service Text & Benefits */}
                  <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <div className="p-3 bg-[#F8F7F4] border border-[#E8E6E0] rounded-sm w-fit mb-5">
                        {iconMap[service.iconName] || <KeyRound className="w-6 h-6 text-[#B49A70]" />}
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#17201C] mb-3">
                        {service.title[lang]}
                      </h3>

                      <p className="text-sm text-[#17201C]/80 leading-relaxed font-light mb-6">
                        {service.fullDescription[lang]}
                      </p>

                      {/* Benefits Checklist */}
                      <div className="space-y-2.5 pt-2 border-t border-[#E8E6E0]">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B49A70] block mb-2">
                          {t('servicesPage.coreCapabilities')}
                        </span>
                        {service.benefits[lang].map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#17201C]">
                            <CheckCircle2 className="w-4 h-4 text-[#B49A70] shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8">
                      <Button
                        variant="dark"
                        size="md"
                        onClick={() => setSelectedService(service.title[lang])}
                        icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                      >
                        {t('servicesPage.engageDesk')}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ScheduleViewingModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        propertyTitle={lang === 'ar' ? `استشارة خاصة: ${selectedService || ''}` : `Private Consultation: ${selectedService || ''}`}
      />
    </PageLayout>
  );
};
