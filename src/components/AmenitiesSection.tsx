import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { GYM_RING_IMAGE, AMENITIES } from '../data/gymData';

interface AmenitiesSectionProps {
  onScheduleTour: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ onScheduleTour }) => {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information & Feature List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
                THE FACILITY
              </span>
            </div>

            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase tracking-tight leading-[0.9]">
              BUILT FOR FIGHTERS. <br />
              <span className="text-[#D3121A]">REFINED FOR ATHLETES.</span>
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              12,000 square feet of high-spec athletic infrastructure. Designed from the ground up for biomechanical efficiency, shock absorption, and swift post-round recovery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {AMENITIES.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:border-neutral-300 transition-colors"
                >
                  <div className="text-[11px] font-bold text-[#D3121A] uppercase tracking-wider mb-1">
                    {item.tag}
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onScheduleTour}
                className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#D3121A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>Schedule a Walkthrough Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Gym Ring Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 group">
              <img
                src={GYM_RING_IMAGE}
                alt="Modern luxury boxing gym ring and heavy bags"
                className="w-full h-[460px] sm:h-[520px] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Graphic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Dynamic bottom badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="font-bebas text-2xl tracking-wider block">MAIN STAGE RING</span>
                  <span className="text-xs text-neutral-300">Sanctioned 20ft Championship Canvas</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#D3121A]" />
                  <span>Pro Grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
