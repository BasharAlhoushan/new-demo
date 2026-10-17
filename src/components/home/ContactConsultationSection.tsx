import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

export const ContactConsultationSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'buy' | 'rent' | 'invest'>('buy');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && phone) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E7E3DA]">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10212B] rounded-3xl overflow-hidden shadow-xl text-white p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Info & CTAs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#B69A70] block mb-2">
                  {lang === 'ar' ? 'استشارة عقارية خاصة' : 'Personal Consultation'}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium tracking-tight text-white leading-tight">
                  {lang === 'ar'
                    ? 'تحدث مع كبار مستشارينا العقاريين'
                    : 'Speak with Our Senior Property Advisors'}
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {lang === 'ar'
                    ? 'سواء كنت تبحث عن شراء فيلا فاخرة، استئجار مسكن شاطئي، أو استثمار آمن في مشاريع قطر الجديدة، فريقنا مستعد لمساعدتك.'
                    : 'Whether you are acquiring a luxury villa, leasing a waterfront residence, or seeking high-yield off-plan investments, our team is at your service.'}
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+97444998800"
                  dir="ltr"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#B69A70] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#B69A70]/20 flex items-center justify-center text-[#B69A70] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#727A7B] block font-medium">
                      {lang === 'ar' ? 'اتصال مباشر' : 'Direct Phone'}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      +974 4499 8800
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/97444998800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#25D366] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#727A7B] block font-medium">
                      {lang === 'ar' ? 'تواصل عبر واتساب' : 'Instant WhatsApp'}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      +974 4499 8800
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-[#B69A70]/20 flex items-center justify-center text-[#B69A70] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#727A7B] block font-medium">
                      {lang === 'ar' ? 'المكتب الرئيسي' : 'Headquarters'}
                    </span>
                    <span className="text-xs text-white/90">
                      Tower 22, Marina District, Lusail City, Doha
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Form */}
            <div className="lg:col-span-7 bg-white text-[#10212B] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#E7E3DA]">
              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#10212B]">
                    {lang === 'ar' ? 'شكراً لتواصلك معنا' : 'Thank You for Your Inquiry'}
                  </h3>
                  <p className="text-xs text-[#727A7B] max-w-md mx-auto font-light">
                    {lang === 'ar'
                      ? 'تم استلام طلبك بنجاح. سيتواصل معك أحد كبار مستشارينا خلال أقرب وقت.'
                      : 'Your inquiry has been received. One of our private advisors will reach out promptly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#10212B] text-white hover:bg-[#00253B]"
                  >
                    {lang === 'ar' ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#10212B] mb-1">
                    {lang === 'ar' ? 'طلب استشارة أو معاينة عقار' : 'Request a Consultation or Private Viewing'}
                  </h3>

                  {/* Interest Selector */}
                  <div className="grid grid-cols-3 gap-2 pb-1">
                    <button
                      type="button"
                      onClick={() => setInterest('buy')}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                        interest === 'buy'
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-[#F7F5F0] text-[#727A7B] border-[#E7E3DA]'
                      }`}
                    >
                      {lang === 'ar' ? 'شراء' : 'Purchase'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterest('rent')}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                        interest === 'rent'
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-[#F7F5F0] text-[#727A7B] border-[#E7E3DA]'
                      }`}
                    >
                      {lang === 'ar' ? 'إيجار' : 'Lease'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterest('invest')}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                        interest === 'invest'
                          ? 'bg-[#10212B] text-white border-[#10212B]'
                          : 'bg-[#F7F5F0] text-[#727A7B] border-[#E7E3DA]'
                      }`}
                    >
                      {lang === 'ar' ? 'استثمار' : 'Invest'}
                    </button>
                  </div>

                  {/* Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#727A7B] mb-1">
                        {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={lang === 'ar' ? 'الاسم الكريم' : 'Your name'}
                        className="w-full bg-[#F7F5F0] border border-[#E7E3DA] rounded-xl px-3.5 py-2.5 text-xs text-[#10212B] outline-none focus:border-[#B69A70]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#727A7B] mb-1">
                        {lang === 'ar' ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+974 ...."
                        className="w-full bg-[#F7F5F0] border border-[#E7E3DA] rounded-xl px-3.5 py-2.5 text-xs text-[#10212B] outline-none focus:border-[#B69A70]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-[#727A7B] mb-1">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#F7F5F0] border border-[#E7E3DA] rounded-xl px-3.5 py-2.5 text-xs text-[#10212B] outline-none focus:border-[#B69A70]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-[#727A7B] mb-1">
                      {lang === 'ar' ? 'تفاصيل الاستفسار أو العقار المطلوب' : 'Property Requirements or Inquiries'}
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={lang === 'ar' ? 'أود الاستفسار عن فلل اللؤلؤة أو مشاريع لوسيل...' : 'I am interested in waterfront residences in The Pearl...'}
                      className="w-full bg-[#F7F5F0] border border-[#E7E3DA] rounded-xl px-3.5 py-2.5 text-xs text-[#10212B] outline-none focus:border-[#B69A70] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#10212B] hover:bg-[#00253B] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-[#B69A70]" />
                    <span>{lang === 'ar' ? 'إرسال الاستفسار الآن' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactConsultationSection;
