import React, { useState, useMemo } from 'react';
import { Clock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/gymData';
import { ClassScheduleItem } from '../types';

interface ScheduleSectionProps {
  onBookClass: (item: ClassScheduleItem) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onBookClass }) => {
  const [activeDay, setActiveDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>('Mon');
  const [levelFilter, setLevelFilter] = useState<string>('All');

  const days: { key: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'; label: string; full: string }[] = [
    { key: 'Mon', label: 'MON', full: 'Monday' },
    { key: 'Tue', label: 'TUE', full: 'Tuesday' },
    { key: 'Wed', label: 'WED', full: 'Wednesday' },
    { key: 'Thu', label: 'THU', full: 'Thursday' },
    { key: 'Fri', label: 'FRI', full: 'Friday' },
    { key: 'Sat', label: 'SAT', full: 'Saturday' },
    { key: 'Sun', label: 'SUN', full: 'Sunday' },
  ];

  const filteredSchedule = useMemo(() => {
    return SCHEDULE_DATA.filter((item) => {
      const matchDay = item.day === activeDay;
      const matchLevel = levelFilter === 'All' || item.level === levelFilter;
      return matchDay && matchLevel;
    });
  }, [activeDay, levelFilter]);

  return (
    <section id="schedule" className="py-20 lg:py-28 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
              WEEKLY TIMETABLE
            </span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase tracking-tight leading-[0.9]">
            TRAIN ON YOUR SCHEDULE.
          </h2>
          <p className="mt-3.5 text-neutral-600 text-sm sm:text-base leading-relaxed">
            Over 35 high-intensity sessions every week, from 6:00 AM dawn bags to 7:30 PM sparring. Reserve your bag in advance to secure coaching feedback.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className={`py-3 px-5 rounded-xl font-bebas text-lg sm:text-xl tracking-wider transition-all duration-150 shrink-0 cursor-pointer ${
                activeDay === d.key
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              <span className="block sm:hidden">{d.label}</span>
              <span className="hidden sm:block">{d.full}</span>
            </button>
          ))}
        </div>

        {/* Level Filters */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-8">
          {['All', 'Beginner', 'Intermediate', 'Fighter Pro'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                levelFilter === lvl
                  ? 'bg-[#D3121A] text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {lvl === 'All' ? 'All Skill Levels' : lvl}
            </button>
          ))}
        </div>

        {/* Classes List */}
        <div className="space-y-3">
          {filteredSchedule.length > 0 ? (
            filteredSchedule.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-50/80 hover:bg-white rounded-2xl p-5 border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Time & Class Name */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  <div className="bg-white group-hover:bg-neutral-900 group-hover:text-white transition-colors border border-neutral-200 rounded-xl px-3.5 py-2.5 text-center min-w-[90px] shrink-0">
                    <Clock className="w-4 h-4 mx-auto text-[#D3121A] mb-1" />
                    <span className="font-mono text-xs font-bold block">{item.time}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bebas text-xl sm:text-2xl text-neutral-900 tracking-wide">
                        {item.className}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-700">
                        {item.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1">
                      <span className="flex items-center gap-1 font-medium text-neutral-700">
                        <User className="w-3.5 h-3.5 text-[#D3121A]" />
                        Coach {item.coach}
                      </span>
                      <span>·</span>
                      <span className="text-neutral-500">55 min duration</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Spots Left & Book Button */}
                <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-200">
                  <div className="text-right">
                    <div className="text-xs font-bold text-neutral-800">
                      <span className="text-[#D3121A]">{item.spotsLeft}</span> / {item.totalSpots} spots left
                    </div>
                    <div className="w-24 bg-neutral-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#D3121A] h-full rounded-full"
                        style={{ width: `${((item.totalSpots - item.spotsLeft) / item.totalSpots) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onBookClass(item)}
                    className="py-2.5 px-5 bg-[#111111] hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 shrink-0"
                  >
                    <span>Book Spot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300 text-neutral-500 text-sm">
              No classes match the "{levelFilter}" filter on this day. Try selecting "All Skill Levels".
            </div>
          )}
        </div>

        {/* Timetable trust footer */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All sessions include complimentary sanitizer, hand wrap tutorials, and loaner gloves.</span>
          </div>
          <span className="font-semibold text-neutral-700">Open Gym Access: Mon-Sun 5:30 AM – 10:00 PM</span>
        </div>
      </div>
    </section>
  );
};
