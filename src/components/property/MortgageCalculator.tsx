import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, DollarSign, Percent, Calendar, Info } from 'lucide-react';
import { calculateMortgage, formatPrice, formatNumber } from '../../utils/formatters';
import { useCurrencyStore } from '../../store/currencyStore';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 12000000,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const { currency } = useCurrencyStore();

  const [price, setPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.25);
  const [loanTerm, setLoanTerm] = useState<number>(20);

  const result = calculateMortgage(price, downPaymentPercent, interestRate, loanTerm);

  return (
    <div className="bg-white border border-[#E8E6E0] rounded-sm p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#E8E6E0]">
        <div className="p-2.5 rounded-sm bg-[#111715] text-[#B49A70]">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-medium text-[#17201C]">
            {t('mortgage.title')}
          </h3>
          <p className="text-xs text-[#777C76] font-light">
            {t('modals.mortgage.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Property Price */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="text-[#777C76] uppercase tracking-wider">{t('mortgage.propertyPrice')}</span>
              <span className="font-serif font-semibold text-sm text-[#17201C]">
                {formatPrice(price, currency, lang)}
              </span>
            </div>
            <input
              type="range"
              min={3000000}
              max={50000000}
              step={250000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#B49A70] cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="text-[#777C76] uppercase tracking-wider">
                {t('mortgage.downPayment')} ({downPaymentPercent}%)
              </span>
              <span className="font-serif font-semibold text-sm text-[#17201C]">
                {formatPrice(result.downPayment, currency, lang)}
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#B49A70] cursor-pointer"
            />
          </div>

          {/* Rate & Tenure Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                {t('mortgage.interestRate')} (%)
              </label>
              <input
                type="number"
                step="0.05"
                min="1"
                max="12"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#777C76] font-medium mb-1.5">
                {t('mortgage.loanTerm')}
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full bg-[#F8F7F4] border border-[#E8E6E0] focus:border-[#B49A70] rounded-sm px-3.5 py-2.5 text-xs text-[#17201C] outline-none cursor-pointer"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculation Result Breakdown Card */}
        <div className="lg:col-span-5 bg-[#111715] text-[#F8F7F4] rounded-sm p-6 sm:p-7 border border-[#222B26]">
          <div className="text-center pb-6 border-b border-[#222B26]">
            <span className="block text-[11px] uppercase tracking-widest text-[#B49A70] font-medium mb-1">
              {t('mortgage.monthlyInstallment')}
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {formatPrice(result.monthlyPayment, currency, lang)}
            </div>
            <span className="text-[11px] text-[#777C76] font-light">/ month</span>
          </div>

          <div className="mt-5 space-y-3 text-xs">
            <div className="flex items-center justify-between text-[#777C76]">
              <span>{t('mortgage.totalPrincipal')}</span>
              <span className="text-white font-medium">
                {formatPrice(result.principal, currency, lang)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[#777C76]">
              <span>{t('mortgage.downPayment')}</span>
              <span className="text-white font-medium">
                {formatPrice(result.downPayment, currency, lang)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[#777C76]">
              <span>{t('mortgage.totalInterest')}</span>
              <span className="text-white font-medium">
                {formatPrice(result.totalInterest, currency, lang)}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#222B26] flex items-start gap-2 text-[10px] text-[#777C76] leading-relaxed">
            <Info className="w-3.5 h-3.5 text-[#B49A70] shrink-0 mt-0.5" />
            <span>{t('mortgage.disclaimer')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
