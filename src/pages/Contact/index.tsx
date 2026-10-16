import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Send,
  Building,
  ShieldCheck 
} from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Button } from '../../components/common/Button';

const contactSchema = z.object({
  fullName: z.string().min(3, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter your telephone or WhatsApp number'),
  inquiryType: z.string().min(1, 'Please select the nature of your inquiry'),
  message: z.string().min(10, 'Please provide details regarding your requirements (minimum 10 characters)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const [submitted, setSubmitted] = useState(false);

  const contactSchema = React.useMemo(() => {
    return z.object({
      fullName: z.string().min(3, lang === 'ar' ? 'يرجى إدخال الاسم الكريم' : 'Please enter your full name'),
      email: z.string().email(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address'),
      phone: z.string().min(8, lang === 'ar' ? 'يرجى إدخال رقم الهاتف أو الواتساب' : 'Please enter your telephone or WhatsApp number'),
      inquiryType: z.string().min(1, lang === 'ar' ? 'يرجى تحديد نوع الاستفسار' : 'Please select the nature of your inquiry'),
      message: z.string().min(10, lang === 'ar' ? 'يرجى توضيح متطلباتكم (10 أحرف على الأقل)' : 'Please provide details regarding your requirements (minimum 10 characters)'),
    });
  }, [lang]);

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'Acquisition / Buying',
    },
  });

  const onSubmit = async () => {
    // Simulate luxury confidential dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
  };

  return (
    <PageLayout>
      <div className="pt-28 pb-24 bg-[#F8F7F4] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: t('nav.home'), path: '/' },
              { label: t('nav.contact') },
            ]}
          />

          <div className="pb-8 border-b border-[#E8E6E0] mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B49A70] font-semibold block mb-2">
              {t('contact.badge')}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#17201C] tracking-tight">
              {t('contact.title')}
            </h1>
            <p className="mt-3 text-sm text-[#777C76] font-light max-w-2xl leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Info & Office (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#111715] text-[#F8F7F4] p-8 sm:p-10 rounded-sm border border-[#222B26] space-y-8 shadow-xl">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B49A70] font-semibold block mb-2">
                    {t('contact.headquarters')}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium mb-3">
                    {t('contactPage.suite')}
                  </h3>
                  <div className="flex items-start gap-3 text-xs text-[#777C76] font-light leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#B49A70] shrink-0 mt-0.5" />
                    <span>{t('contact.address')}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#222B26] text-xs">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#B49A70] shrink-0" />
                    <div>
                      <span className="text-[#777C76] block text-[10px] uppercase">{t('contactPage.directConcierge')}</span>
                      <a href="tel:+97444998800" dir="ltr" className="text-white hover:text-[#B49A70] font-medium">
                        +974 4499 8800
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                    <div>
                      <span className="text-[#777C76] block text-[10px] uppercase">{t('contactPage.vipWhatsapp')}</span>
                      <a
                        href="https://wa.me/97444998800"
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="text-white hover:text-[#25D366] font-medium"
                      >
                        +974 4499 8800
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#B49A70] shrink-0" />
                    <div>
                      <span className="text-[#777C76] block text-[10px] uppercase">{t('contactPage.advisoryDesk')}</span>
                      <a href="mailto:concierge@theonerealestate.qa" dir="ltr" className="text-white hover:text-[#B49A70] font-medium">
                        concierge@theonerealestate.qa
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Clock className="w-4 h-4 text-[#B49A70] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#777C76] block text-[10px] uppercase">{t('contact.hours')}</span>
                      <span className="text-white leading-relaxed font-light">
                        {t('contact.hoursDetail')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#222B26] flex items-center gap-2 text-[11px] text-[#777C76]">
                  <ShieldCheck className="w-4 h-4 text-[#B49A70] shrink-0" />
                  <span>{t('contactPage.confidentialityNotice')}</span>
                </div>
              </div>

              {/* Office Location Map Preview Embed */}
              <div className="bg-white p-4 border border-[#E8E6E0] rounded-sm shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#17201C]">
                  <Building className="w-4 h-4 text-[#B49A70]" />
                  <span>{lang === 'ar' ? 'أبراج المارينا التوأم، لوسيل' : 'Marina Twin Towers, Lusail'}</span>
                </div>
                <div className="h-48 w-full rounded-sm overflow-hidden border border-[#E8E6E0] bg-[#18201D] relative">
                  <iframe
                    title="THE ONE Lusail Marina Headquarters"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14418.572793285747!2d51.523589417436034!3d25.42146430932064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c4db1cbb94c1%3A0xbcf03a277717da20!2sLusail%20Marina%2C%20Lusail!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
                    className="w-full h-full border-0 filter grayscale opacity-90 contrast-125"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#E8E6E0] rounded-sm shadow-sm">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17201C] font-medium mb-2">
                {t('contactPage.formTitle')}
              </h2>
              <p className="text-xs text-[#777C76] font-light mb-8">
                {t('contactPage.formSubtitle')}
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#B49A70]/15 text-[#B49A70] rounded-full flex items-center justify-center mx-auto border border-[#B49A70]/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#17201C] font-medium">
                    {lang === 'ar' ? 'تم تسجيل الاستفسار بنجاح' : 'Inquiry Successfully Registered'}
                  </h3>
                  <p className="text-sm text-[#777C76] font-light max-w-md mx-auto leading-relaxed">
                    {t('contact.success')}
                  </p>
                  <div className="pt-4">
                    <Button variant="dark" size="md" onClick={() => setSubmitted(false)}>
                      {lang === 'ar' ? 'تقديم استفسار آخر' : 'Submit Another Inquiry'}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                      {t('contact.fullName')} *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder={lang === 'ar' ? 'سعادة / الاسم الكامل' : 'His/Her Excellency / Full Legal Name'}
                      className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-4 py-3 text-xs text-[#17201C] outline-none"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                        {t('viewingModal.email')} *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="client@familyoffice.qa"
                        className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-4 py-3 text-xs text-[#17201C] outline-none"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                        {t('viewingModal.phone')} *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="+974 5500 0000"
                        dir="ltr"
                        className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-4 py-3 text-xs text-[#17201C] outline-none"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                      {t('contact.inquiryType')} *
                    </label>
                    <select
                      {...register('inquiryType')}
                      className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-4 py-3 text-xs text-[#17201C] outline-none cursor-pointer"
                    >
                      <option value="Acquisition / Buying">{t('contact.inquiryBuying')}</option>
                      <option value="Listing & Private Selling">{t('contact.inquirySelling')}</option>
                      <option value="Institutional / Private Investment">{t('contact.inquiryInvestment')}</option>
                      <option value="VIP Viewing Request">{t('contact.inquiryViewing')}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      rows={5}
                      {...register('message')}
                      placeholder={t('contactPage.messagePlaceholder')}
                      className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm p-4 text-xs text-[#17201C] outline-none resize-none leading-relaxed"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      icon={<Send className="w-4 h-4 rtl:rotate-180" />}
                    >
                      {t('contact.send')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
