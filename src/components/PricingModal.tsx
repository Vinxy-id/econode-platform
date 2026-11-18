import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('campus');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F3F6F4] rounded-2xl border border-slate-200 max-w-5xl w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Skema Harga &amp; Monetisasi EcoNode SaaS
              </h2>
              <p className="text-xs text-slate-500">
                Selaras dengan model bisnis B2B lokal — dari Freemium hingga Campus/Enterprise &amp; Jasa Audit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
          {PRICING_PLANS.map((plan) => {
            const isHero = Boolean(plan.highlight);
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`p-4 flex flex-col justify-between transition-all ${
                  isHero
                    ? 'bento-hero text-white'
                    : 'bento-card text-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={`text-sm font-extrabold ${
                        isHero ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.name}
                    </span>
                    {isHero && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                        Populer
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      isHero ? 'text-emerald-200/80' : 'text-slate-500'
                    }`}
                  >
                    {plan.target}
                  </p>

                  <div className="mt-3.5 pb-3 border-b border-current/10">
                    <span
                      className={`font-mono-num text-xl font-extrabold ${
                        isHero ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.priceLabel}
                    </span>
                    <span
                      className={`text-[11px] ml-1 ${
                        isHero ? 'text-emerald-200/75' : 'text-slate-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className={`flex items-start gap-2 text-[11px] leading-snug ${
                          isHero ? 'text-emerald-50/90' : 'text-slate-700'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isHero ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isHero
                      ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                      : isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? 'Paket Aktif' : 'Pilih Paket'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
