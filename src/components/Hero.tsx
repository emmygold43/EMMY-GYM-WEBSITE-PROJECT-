import React from 'react';
import { ArrowRight, Mic } from 'lucide-react';
import { HERO_IMAGE } from '../data/gymData';

interface HeroProps {
  onStartJourney: () => void;
  onOpenVoice: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartJourney,
  onOpenVoice,
}) => {
  return (
    <section id="home" className="relative pt-24 lg:pt-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Split Asymmetric Grid (~45% Left, ~55% Right on lg+) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)] lg:min-h-[720px] items-stretch">
          
          {/* ================= LEFT COLUMN: CONTENT & STATS (~33% width = 4 cols on lg/xl) ================= */}
          <div className="lg:col-span-4 xl:col-span-4 px-6 sm:px-8 lg:pl-10 lg:pr-6 pt-8 pb-10 lg:py-14 flex flex-col justify-between z-20 bg-white">
            <div>
              {/* Eyebrow Tag */}
              <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#9CA3AF] uppercase">
                  DISCIPLINE &nbsp;/&nbsp; STRENGTH &nbsp;/&nbsp; RESULTS
                </span>
              </div>

              {/* Main Headline: Massive, tightly tracked, heavy condensed text */}
              <h1 className="font-bebas tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[4.4rem] xl:text-[5.4rem] leading-[0.88] uppercase font-bold text-balance">
                <span className="block text-[#111111]">MORE THAN</span>
                <span className="block text-[#D3121A] mt-1 sm:mt-1.5">JUST A GYM.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-lg font-normal">
                At EMMY Boxing Club, we build stronger bodies, sharper minds, and greater confidence. Whether you're a beginner or a seasoned fighter, this is where your journey gets real.
              </p>

              {/* Action Buttons (Dual CTA) */}
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                {/* Button 1: Solid red rounded rectangle */}
                <button
                  onClick={onStartJourney}
                  className="bg-[#D3121A] hover:bg-[#b00e15] text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 group active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Button 2: EMMY AI Voice Assistant Action */}
                <button
                  onClick={onOpenVoice}
                  className="inline-flex items-center justify-center sm:justify-start gap-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/90 hover:border-[#D3121A]/50 text-[#111111] hover:text-[#D3121A] font-bold text-sm sm:text-base px-5 py-3.5 sm:py-4 rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 group cursor-pointer active:scale-95"
                  aria-label="Talk to EMMY AI Voice Assistant"
                >
                  <span className="relative w-9 h-9 rounded-full bg-[#111111] group-hover:bg-[#D3121A] text-white flex items-center justify-center transition-colors shadow-xs shrink-0">
                    <Mic className="w-4 h-4 text-[#D3121A] group-hover:text-white transition-colors" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#D3121A] border-2 border-white animate-pulse" />
                  </span>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bebas tracking-wider text-lg sm:text-xl uppercase text-[#111111] group-hover:text-[#D3121A] leading-tight">
                        TALK TO EMMY AI
                      </span>
                      {/* Subtle red audio-wave animation */}
                      <span className="flex items-center gap-0.5 h-3.5" aria-hidden="true">
                        <span className="w-0.5 h-2 bg-[#D3121A] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                        <span className="w-0.5 h-3.5 bg-[#D3121A] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_200ms]" />
                        <span className="w-0.5 h-2.5 bg-[#D3121A] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_400ms]" />
                        <span className="w-0.5 h-1.5 bg-[#D3121A] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_100ms]" />
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-[#6B7280] font-sans font-medium leading-none hidden sm:block">
                      Voice assistant · Ask anything
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Social Proof / Stats Counter (Bottom Left) */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-neutral-200">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left divide-x divide-neutral-200">
                {/* Metric 1: 500+ Active Members */}
                <div className="pr-2 sm:pr-3">
                  <div className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-[#111111] leading-none tracking-tight">
                    500+
                  </div>
                  <div className="mt-1.5 inline-block">
                    <span className="text-xs sm:text-sm font-semibold text-[#1F2937] block">
                      Active Members
                    </span>
                    <div className="h-[2px] w-full bg-[#D3121A] mt-1 rounded-full" />
                  </div>
                </div>

                {/* Metric 2: 10+ Expert Trainers */}
                <div className="px-2 sm:px-3">
                  <div className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-[#111111] leading-none tracking-tight">
                    10+
                  </div>
                  <div className="mt-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-[#1F2937] block">
                      Expert Trainers
                    </span>
                    <span className="text-[11px] text-[#6B7280] hidden sm:block">Pro fighters & coaches</span>
                  </div>
                </div>

                {/* Metric 3: 6 Training Programs */}
                <div className="pl-2 sm:pl-3">
                  <div className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-[#111111] leading-none tracking-tight">
                    6
                  </div>
                  <div className="mt-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-[#1F2937] block">
                      Disciplines
                    </span>
                    <span className="text-[11px] text-[#6B7280] hidden sm:block">Beginner to Pro</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: PHOTOGRAPHY DOMINANT (~67% width = 8 cols) ================= */}
          <div className="lg:col-span-8 xl:col-span-8 relative min-h-[460px] sm:min-h-[580px] lg:min-h-full w-full overflow-hidden flex items-stretch bg-neutral-900">
            
            {/* High-Resolution Cinematic Action Shot - Athletic female boxer punching forward with red glove */}
            <div className="relative w-full h-full min-h-[480px] sm:min-h-[600px] lg:min-h-full">
              <img
                src={HERO_IMAGE}
                alt="Athletic female boxer with braided hair delivering powerful straight punch with red boxing glove at EMMY Boxing Club"
                className="w-full h-full object-cover object-[52%_32%] sm:object-[50%_35%] lg:object-[48%_38%]"
                referrerPolicy="no-referrer"
              />

              {/* Gentle ambient gradient that keeps the red punching glove and athlete in pristine clarity */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Right Slogan: Vertically stacked in top-right corner over photo in thin, all-caps red/white text */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 text-right select-none pointer-events-none drop-shadow-md">
                <div className="font-oswald tracking-[0.2em] sm:tracking-[0.25em] text-sm sm:text-base font-light text-white/95 leading-tight">
                  REAL PEOPLE.
                </div>
                <div className="font-oswald tracking-[0.2em] sm:tracking-[0.25em] text-sm sm:text-base font-light text-white/95 leading-tight mt-0.5">
                  REAL PROGRESS.
                </div>
                <div className="font-bebas tracking-[0.2em] sm:tracking-[0.25em] text-xl sm:text-2xl font-bold text-[#D3121A] leading-tight mt-1">
                  EMMY.
                </div>
              </div>

              {/* Bottom-Right Dynamic Graphic: Diagonal athletic stripes tucked safely into corner */}
              <div
                className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-10 pointer-events-none select-none opacity-85"
                aria-hidden="true"
              >
                <div className="flex items-end gap-3 sm:gap-4 -rotate-45 transform origin-bottom-right">
                  <div className="w-3 sm:w-5 h-32 sm:h-44 bg-[#1F2937]/90 rounded-xs shadow-lg" />
                  <div className="w-6 sm:w-8 h-40 sm:h-56 bg-[#D3121A] rounded-xs shadow-xl" />
                  <div className="w-2.5 sm:w-4 h-36 sm:h-48 bg-[#111111]/95 rounded-xs shadow-md" />
                </div>
              </div>

              {/* Bottom-Left Feature Badge */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2.5 bg-black/65 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-white text-xs">
                <div className="w-2 h-2 rounded-full bg-[#D3121A] animate-pulse" />
                <span className="font-medium tracking-wide">Elite Training Facility · Downtown Athletic District</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
