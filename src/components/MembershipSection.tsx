import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/gymData';
import { MembershipPlan } from '../types';

interface MembershipSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="membership" className="py-20 lg:py-28 bg-neutral-50/80 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              TRANSPARENT PASSES
            </span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase tracking-tight leading-[0.9]">
            NO CONTRACT LOCKS. NO HIDDEN FEES.
          </h2>
          <p className="mt-3.5 text-neutral-600 text-sm sm:text-base leading-relaxed">
            Choose your level of commitment. Freeze or cancel anytime with a single tap. All memberships include full open-gym access and certified coach instruction.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center bg-neutral-200/80 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly Flex
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Annual Commit</span>
              <span className="text-[10px] bg-[#D3121A] text-white px-1.5 py-0.5 rounded-sm font-semibold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between border ${
                  isPopular
                    ? 'border-[#D3121A] shadow-lg ring-1 ring-[#D3121A]/30 scale-[1.02] z-10'
                    : 'border-neutral-200 hover:border-neutral-300 hover:shadow-xs'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D3121A] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs">
                    CHAMPION CHOICE
                  </div>
                )}

                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-neutral-400 mb-1">
                    {plan.name}
                  </div>

                  <div className="flex items-baseline gap-1 mt-2 mb-3">
                    <span className="font-bebas text-5xl text-neutral-900 leading-none">
                      ${price}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {plan.priceMonthly === 0 ? 'first session' : plan.period}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2.5">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-[#D3121A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      isPopular
                        ? 'bg-[#D3121A] hover:bg-[#b00e15] text-white'
                        : 'bg-[#111111] hover:bg-[#D3121A] text-white'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#D3121A] shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-neutral-900">14-Day Ironclad Satisfaction Guarantee</h4>
              <p className="text-xs text-neutral-500">If your first two weeks do not surpass any gym experience you’ve ever had, cancel with zero penalty.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan(MEMBERSHIP_PLANS[0])}
            className="text-xs font-bold text-[#D3121A] hover:underline whitespace-nowrap cursor-pointer"
          >
            Start with Free Trial Session →
          </button>
        </div>
      </div>
    </section>
  );
};
