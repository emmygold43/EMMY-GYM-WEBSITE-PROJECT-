import React from 'react';
import { Quote } from 'lucide-react';
import { REVIEWS } from '../data/gymData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              ATHLETE TESTIMONIALS
            </span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase tracking-tight leading-[0.9]">
            REAL STORIES. REAL SWEAT.
          </h2>
          <p className="mt-3.5 text-neutral-600 text-sm sm:text-base leading-relaxed">
            See how everyday people transformed their physical resilience and mental focus on our canvas.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.author}
              className="bg-neutral-50 rounded-2xl p-7 border border-neutral-200/80 hover:border-neutral-300 transition-all flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D3121A]/30 mb-4" />
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">{rev.author}</h4>
                  <span className="text-[11px] text-neutral-500">{rev.role}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#D3121A] bg-red-50 px-2 py-1 rounded">
                  {rev.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
