import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyRef?: string;
}

export const ScheduleViewingModal: React.FC<ScheduleViewingModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  propertyRef,
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const [submitted, setSubmitted] = useState(false);

  const viewingSchema = useMemo(() => {
    return z.object({
      fullName: z.string().min(3, lang === 'ar' ? 'يرجى إدخال الاسم الكريم (3 أحرف على الأقل)' : 'Please enter your full name'),
      email: z.string().email(lang === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address'),
      phone: z.string().min(8, lang === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number'),
      preferredDate: z.string().min(1, lang === 'ar' ? 'يرجى اختيار التاريخ المفضل' : 'Please select your preferred date'),
      preferredTime: z.string().min(1, lang === 'ar' ? 'يرجى تحديد الفترة المفضلة' : 'Please select your preferred time slot'),
      message: z.string().optional(),
    });
  }, [lang]);

  type ViewingFormData = z.infer<typeof viewingSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ViewingFormData>({
    resolver: zodResolver(viewingSchema),
    defaultValues: {
      preferredTime: 'Morning (10:00 AM – 12:00 PM)',
    },
  });

  const onSubmit = async () => {
    // Simulate luxury API booking dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
  };

  const handleModalClose = () => {
    setSubmitted(false);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={t('viewingModal.title')}
      subtitle={
        propertyTitle
          ? (lang === 'ar' ? `موعد معاينة خاصة لعقار: ${propertyTitle} (المرجع: ${propertyRef || 'LUX-ONE'})` : `Private appointment for: ${propertyTitle} (Ref: ${propertyRef || 'LUX-ONE'})`)
          : t('viewingModal.subtitle')
      }
      maxWidth="md"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-[#B49A70]/15 text-[#B49A70] rounded-full flex items-center justify-center mx-auto border border-[#B49A70]/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-2xl text-[#17201C] font-medium">
            {t('modals.scheduleViewing.successTitle')}
          </h4>
          <p className="text-sm text-[#777C76] font-light max-w-sm mx-auto leading-relaxed">
            {t('viewingModal.successMessage')}
          </p>
          <div className="pt-4">
            <Button variant="dark" size="md" onClick={handleModalClose}>
              {t('modals.scheduleViewing.done')}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
              {t('viewingModal.name')} *
            </label>
            <div className="relative">
              <input
                type="text"
                {...register('fullName')}
                placeholder={lang === 'ar' ? 'سعادة / السيد / السيدة...' : 'His/Her Excellency / Mr. / Mrs.'}
                className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none"
              />
              <User className="w-4 h-4 text-[#777C76] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-3" />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('viewingModal.email')} *
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email')}
                  placeholder="advisor@familyoffice.com"
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none"
                />
                <Mail className="w-4 h-4 text-[#777C76] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-3" />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('viewingModal.phone')} *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="+974 5500 0000"
                  dir="ltr"
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none"
                />
                <Phone className="w-4 h-4 text-[#777C76] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-3" />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('viewingModal.preferredDate')} *
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register('preferredDate')}
                className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none cursor-pointer"
              />
              {errors.preferredDate && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.preferredDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
                {t('viewingModal.preferredTime')} *
              </label>
              <select
                {...register('preferredTime')}
                className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none cursor-pointer"
              >
                <option value="Morning (10:00 AM – 12:00 PM)">{t('modals.scheduleViewing.morning')}</option>
                <option value="Afternoon (02:00 PM – 05:00 PM)">{t('modals.scheduleViewing.afternoon')}</option>
                <option value="Sunset / Evening (05:00 PM – 07:30 PM)">{lang === 'ar' ? 'فترة الغروب والمساء (05:00 م – 07:30 م)' : 'Sunset / Evening (05:00 PM – 07:30 PM)'}</option>
              </select>
            </div>
          </div>

          {/* Message / Special Requests */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1">
              {t('viewingModal.message')}
            </label>
            <textarea
              rows={3}
              {...register('message')}
              placeholder={lang === 'ar' ? 'أي متطلبات خاصة بالاستقبال أو بروتوكولات الحراسة أو استفسارات معمارية محددة...' : 'Chauffeur pickup required, security escort protocols, or specific architectural questions...'}
              className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm p-3 text-xs text-[#17201C] outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              {t('viewingModal.submit')}
            </Button>
            <p className="text-[10px] text-center text-[#777C76] mt-2 font-light">
              {t('modals.scheduleViewing.ndaNotice')}
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};
