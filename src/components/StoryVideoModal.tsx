import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ArrowRight, Award, Zap } from 'lucide-react';
import { GYM_RING_IMAGE, TRAINER_MITTS_IMAGE, HERO_IMAGE } from '../data/gymData';

interface StoryVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const StoryVideoModal: React.FC<StoryVideoModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const chapters = [
    {
      title: '01. The Sweet Science',
      duration: '0:45',
      image: HERO_IMAGE,
      headline: 'STRIKE WITH PURPOSE, MOVE WITH PRECISION',
      description: 'EMMY was built on one immutable rule: boxing is not just cardio; it is an art of geometry, breath control, and kinetic power transfer.',
      quote: '"When your hands are up and you hear the first bell, nothing outside this canvas matters."',
      speaker: 'Marcus Vance, Head Coach',
    },
    {
      title: '02. Inside the Ropes',
      duration: '1:10',
      image: GYM_RING_IMAGE,
      headline: 'A SANCTUARY OF DISCIPLINE AND FOCUS',
      description: 'Every heavy bag, speed bag, and inch of our elevated competition ring is calibrated for authentic athletic development. No gimmick lighting, no shortcuts.',
      quote: '"We don’t measure workouts by sweat puddles alone; we measure them by technical progression."',
      speaker: 'Elena Rostova, Technical Striking Director',
    },
    {
      title: '03. Real Member Transformation',
      duration: '1:35',
      image: TRAINER_MITTS_IMAGE,
      headline: 'MORE THAN A GYM. A COMMUNITY OF CONTENDERS.',
      description: 'Lawyers, designers, teachers, and weekend athletes training side-by-side. The shared struggle on round eight creates an unbreakable bond.',
      quote: '"In 6 months at EMMY, I gained more mental fortitude than a decade in traditional corporate gyms."',
      speaker: 'Samantha W., EMMY Contender Member',
    },
  ];

  // Optional synthetic sound synthesis for boxing bell gong chime
  const playBoxingBell = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Bell chime tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch {
      // Audio fallback silent
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      playBoxingBell();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const current = chapters[activeChapter];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#111111] text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 border border-neutral-800">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#161616]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
              DOCUMENTARY FEATURE · EMMY ORIGINS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!isMuted) {
                  setIsMuted(true);
                } else {
                  setIsMuted(false);
                  playBoxingBell();
                }
              }}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label={isMuted ? 'Unmute bell chime' : 'Mute audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D3121A]" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close documentary player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <img
            src={current.image}
            alt={current.headline}
            className={`w-full h-full object-cover transition-transform duration-10000 ease-out ${
              isPlaying ? 'scale-110' : 'scale-100'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Moody Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/30" />

          {/* Center Play / Pause Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-[#D3121A] text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-2xl active:scale-90"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
              ) : (
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
              )}
            </button>
          </div>

          {/* Chapter Text Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-3.5 h-3.5 text-[#D3121A]" />
              <span className="text-[11px] font-mono tracking-widest text-[#D3121A] uppercase">
                {current.title}
              </span>
            </div>
            <h3 className="font-bebas text-2xl sm:text-4xl text-white leading-tight tracking-wide">
              {current.headline}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 sm:line-clamp-none font-normal leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Timeline scrub simulation */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
            <div
              className="h-full bg-[#D3121A] transition-all duration-500"
              style={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Chapters & Quote Panel */}
        <div className="p-6 bg-[#141414] border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {chapters.map((ch, idx) => (
              <button
                key={ch.title}
                onClick={() => {
                  setActiveChapter(idx);
                  setIsPlaying(true);
                  playBoxingBell();
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  activeChapter === idx
                    ? 'border-[#D3121A] bg-neutral-900/90 text-white ring-1 ring-[#D3121A]'
                    : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={activeChapter === idx ? 'text-[#D3121A]' : 'text-neutral-500'}>
                    Part {idx + 1}
                  </span>
                  <span>{ch.duration}</span>
                </div>
                <div className="text-xs font-bold truncate text-white">{ch.title.split('. ')[1]}</div>
              </button>
            ))}
          </div>

          {/* Quote & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-neutral-800">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#D3121A] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs italic text-neutral-300 leading-snug">{current.quote}</p>
                <span className="text-[11px] text-neutral-500 font-semibold block mt-0.5">
                  — {current.speaker}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#D3121A] hover:bg-[#b00e15] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-md"
            >
              <span>Book Your First Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
