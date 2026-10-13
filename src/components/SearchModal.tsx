import React, { useState, useMemo } from 'react';
import { Search, X, Calendar, Dumbbell, User, ArrowRight } from 'lucide-react';
import { PROGRAMS_DATA, SCHEDULE_DATA, TRAINERS_DATA } from '../data/gymData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: (id: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProgram,
  onNavigateSection,
}) => {
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        programs: PROGRAMS_DATA.slice(0, 3),
        classes: SCHEDULE_DATA.slice(0, 4),
        trainers: TRAINERS_DATA,
      };
    }

    const programs = PROGRAMS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.level.toLowerCase().includes(q)
    );

    const classes = SCHEDULE_DATA.filter(
      (c) =>
        c.className.toLowerCase().includes(q) ||
        c.coach.toLowerCase().includes(q) ||
        c.day.toLowerCase().includes(q) ||
        c.time.toLowerCase().includes(q)
    );

    const trainers = TRAINERS_DATA.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q) ||
        t.specialty.toLowerCase().includes(q)
    );

    return { programs, classes, trainers };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl z-10 border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Search input header */}
        <div className="relative flex items-center border-b border-neutral-200 pb-4">
          <Search className="w-5 h-5 text-neutral-400 absolute left-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search classes, programs, coaches, times (e.g. 'heavy bag', 'marcus', 'sparring')..."
            className="w-full pl-10 pr-10 py-2 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-5 pr-1">
          {/* Programs */}
          {filteredResults.programs.length > 0 && (
            <div>
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-[#D3121A]" />
                <span>Programs ({filteredResults.programs.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredResults.programs.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProgram(p.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-neutral-100 hover:border-[#D3121A] hover:bg-red-50/30 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-sm text-neutral-900 group-hover:text-[#D3121A] transition-colors">
                        {p.name}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        {p.subtitle} · {p.durationMinutes} min · {p.level}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#D3121A] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Classes */}
          {filteredResults.classes.length > 0 && (
            <div>
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D3121A]" />
                <span>Classes & Time Slots</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.classes.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onNavigateSection('schedule');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all text-xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between font-semibold text-neutral-900">
                      <span>{c.day} · {c.time}</span>
                      <span className="text-[#D3121A] font-bold">{c.spotsLeft} spots left</span>
                    </div>
                    <div className="text-neutral-600 mt-0.5 truncate">{c.className}</div>
                    <div className="text-neutral-400 text-[11px]">Coach {c.coach}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coaches */}
          {filteredResults.trainers.length > 0 && (
            <div>
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D3121A]" />
                <span>Coaches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.trainers.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onNavigateSection('about');
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-neutral-900 truncate">{t.name}</div>
                      <div className="text-[11px] text-neutral-500 truncate">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredResults.programs.length === 0 &&
            filteredResults.classes.length === 0 &&
            filteredResults.trainers.length === 0 && (
              <div className="text-center py-8 text-neutral-400 text-sm">
                No matching results found for "{query}". Try "Fundamentals", "Sparring", or "Marcus".
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Click any item to view details or book</span>
          <button
            onClick={() => {
              onNavigateSection('schedule');
              onClose();
            }}
            className="text-[#D3121A] font-semibold hover:underline"
          >
            View Full Timetable →
          </button>
        </div>
      </div>
    </div>
  );
};
