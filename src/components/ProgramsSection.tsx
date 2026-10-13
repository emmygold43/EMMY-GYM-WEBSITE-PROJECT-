import React, { useState } from 'react';
import { Flame, Clock, Target, ArrowRight, Shield, Check } from 'lucide-react';
import { PROGRAMS_DATA } from '../data/gymData';
import { ProgramItem } from '../types';

interface ProgramsSectionProps {
  onSelectProgram: (id: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const [activeModalProgram, setActiveModalProgram] = useState<ProgramItem | null>(null);

  return (
    <section id="programs" className="py-20 lg:py-28 bg-neutral-50/80 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
                6 SPECIALIZED DISCIPLINES
              </span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight uppercase leading-[0.9]">
              ENGINEERED FOR PROGRESS. <br />
              <span className="text-[#D3121A]">BUILT FOR EVERY LEVEL.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-neutral-600 max-w-md text-sm sm:text-base leading-relaxed">
            Whether your goal is explosive conditioning, technical Sweet Science mastery, mittwork precision, or stepping into competition ropes, our 6 pathways deliver structured athletic results.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS_DATA.map((prog, index) => {
            const isFeatured = index === 1; // Heavy Bag Conditioning
            return (
              <div
                key={prog.id}
                className={`relative bg-white rounded-2xl p-7 transition-all duration-200 flex flex-col justify-between border ${
                  isFeatured
                    ? 'border-[#D3121A] shadow-md ring-1 ring-[#D3121A]/20'
                    : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 right-6 bg-[#D3121A] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-neutral-400 font-bold">0{index + 1}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700">
                      {prog.level}
                    </span>
                  </div>

                  <h3 className="font-bebas text-2xl sm:text-3xl text-neutral-900 tracking-wide leading-tight">
                    {prog.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#D3121A] mt-0.5 tracking-wide">
                    {prog.subtitle}
                  </div>

                  <p className="mt-3.5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {prog.description}
                  </p>

                  {/* Program stats & metrics */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-neutral-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-neutral-400 mb-0.5">
                        <Clock className="w-3 h-3 text-[#D3121A]" />
                      </div>
                      <span className="font-bold text-neutral-800 text-[11px] block">{prog.durationMinutes} Min</span>
                    </div>

                    <div className="bg-neutral-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-neutral-400 mb-0.5">
                        <Flame className="w-3 h-3 text-[#D3121A]" />
                      </div>
                      <span className="font-bold text-neutral-800 text-[11px] block">{prog.caloriesBurn.split(' ')[0]}</span>
                    </div>

                    <div className="bg-neutral-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-neutral-400 mb-0.5">
                        <Target className="w-3 h-3 text-[#D3121A]" />
                      </div>
                      <span className="font-bold text-neutral-800 text-[11px] block">Lvl {prog.intensity}/5</span>
                    </div>
                  </div>

                  {/* Target Focus Bullets */}
                  <div className="mt-5 space-y-2">
                    {prog.targetFocus.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-neutral-600">
                        <Check className="w-3.5 h-3.5 text-[#D3121A] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 pt-4 border-t border-neutral-100 flex items-center gap-3">
                  <button
                    onClick={() => onSelectProgram(prog.id)}
                    className="flex-1 py-3 bg-[#111111] hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Reserve Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveModalProgram(prog)}
                    className="p-3 text-neutral-500 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 rounded-xl text-xs transition-colors"
                    title="View Program Syllabus"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Program Syllabus Modal */}
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setActiveModalProgram(null)}
            />
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-neutral-200">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-bold text-[#D3121A] uppercase tracking-wider">
                    PROGRAM BREAKDOWN
                  </span>
                  <h3 className="font-bebas text-3xl text-neutral-900 mt-0.5">
                    {activeModalProgram.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProgram(null)}
                  className="p-2 text-neutral-400 hover:text-black rounded-full"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs sm:text-sm text-neutral-700">
                <p className="leading-relaxed">{activeModalProgram.description}</p>
                <div>
                  <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider mb-2">
                    Core Technical Pillars
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeModalProgram.targetFocus.map((f) => (
                      <div key={f} className="p-2 bg-neutral-50 rounded-lg border border-neutral-200 font-medium text-xs">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl text-xs text-red-900 flex items-center justify-between">
                  <span>Intensity Rating: {activeModalProgram.intensity}/5</span>
                  <span>Duration: {activeModalProgram.durationMinutes} Minutes</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    const id = activeModalProgram.id;
                    setActiveModalProgram(null);
                    onSelectProgram(id);
                  }}
                  className="flex-1 py-3 bg-[#D3121A] hover:bg-[#b00e15] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Book This Program Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
