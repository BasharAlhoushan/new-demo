// Utility for formatting currency, numbers, and areas

export function formatPrice(amount: number, currency: string = 'QAR', locale: string = 'en-US'): string {
  if (currency === 'USD') {
    // Fixed approximate conversion 1 USD = 3.64 QAR
    const usdAmount = Math.round(amount / 3.64);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(usdAmount);
  }

  return `${new Intl.NumberFormat(locale === 'ar' ? 'ar-QA' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(amount)} ${locale === 'ar' ? 'ر.ق' : 'QAR'}`;
}

export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-QA' : 'en-US').format(num);
}

export function formatArea(sqm: number, locale: string = 'en-US'): string {
  const sqft = Math.round(sqm * 10.7639);
  if (locale === 'ar') {
    return `${formatNumber(sqm, 'ar')} م² (${formatNumber(sqft, 'ar')} قدم²)`;
  }
  return `${formatNumber(sqm)} sq m (${formatNumber(sqft)} sq ft)`;
}

export function calculateMortgage(
  price: number,
  downPaymentPercent: number,
  interestRateAnnual: number,
  loanTermYears: number
) {
  const downPayment = (price * downPaymentPercent) / 100;
  const principal = price - downPayment;
  const monthlyRate = interestRateAnnual / 100 / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = principal / totalMonths;
  }

  const totalCost = monthlyPayment * totalMonths + downPayment;
  const totalInterest = totalCost - price;

  return {
    principal,
    downPayment,
    monthlyPayment: Math.round(monthlyPayment),
    totalCost: Math.round(totalCost),
    totalInterest: Math.round(totalInterest),
  };
}

export function generateWhatsAppLink(
  phoneNumber: string,
  propertyTitle: string,
  propertyRef: string,
  lang: 'en' | 'ar' = 'en'
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const text =
    lang === 'ar'
      ? `مرحباً، أود الاستفسار عن العقار الحصري: "${propertyTitle}" (الرقم المرجعي: ${propertyRef}) المعروض على منصة ذا ون العقارية.`
      : `Hello, I would like to inquire about the luxury residence: "${propertyTitle}" (Ref: ${propertyRef}) featured on THE ONE Luxury Real Estate.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
