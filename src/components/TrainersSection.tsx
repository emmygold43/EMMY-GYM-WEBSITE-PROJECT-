import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { TRAINERS_DATA } from '../data/gymData';

interface TrainersSectionProps {
  onBookPrivate: (coachName: string) => void;
}

export const TrainersSection: React.FC<TrainersSectionProps> = ({ onBookPrivate }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background athletic accent stripes */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none athletic-stripes-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
                COACHING ROSTER
              </span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.9]">
              LEARN FROM PROS. <br />
              <span className="text-[#D3121A]">NOT FITNESS INFLUENCERS.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-neutral-400 max-w-md text-sm sm:text-base leading-relaxed">
            Our coaching staff has over 40 collective years in professional boxing rings, Olympic camps, and collegiate strength programs.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS_DATA.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-neutral-800/80 rounded-2xl overflow-hidden border border-neutral-700/60 hover:border-[#D3121A] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Trainer Photo Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                  
                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-4 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono text-[#D3121A] border border-white/10">
                    {trainer.experienceYears} Years Experience
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#D3121A] mb-1 font-bold">
                    {trainer.role}
                  </div>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                    {trainer.name}
                  </h3>

                  <div className="mt-2 text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#D3121A] shrink-0" />
                    <span>{trainer.record}</span>
                  </div>

                  <p className="mt-3.5 text-xs text-neutral-400 leading-relaxed font-normal">
                    {trainer.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-700/60">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-mono">
                      Specialization:
                    </span>
                    <span className="text-xs text-neutral-300 font-medium mt-0.5 block">
                      {trainer.specialty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onBookPrivate(trainer.name)}
                  className="w-full py-2.5 bg-neutral-700/60 hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:bg-[#D3121A]"
                >
                  <span>Book with {trainer.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
