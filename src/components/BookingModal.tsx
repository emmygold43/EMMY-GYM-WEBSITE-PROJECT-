import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Phone, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { PROGRAMS_DATA } from '../data/gymData';
import { EmmyLogo } from './EmmyLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgramId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialProgramId = 'prog-fundamentals',
}) => {
  const [selectedProgram, setSelectedProgram] = useState(initialProgramId);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('06:00 PM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('First Time / Beginner');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  const dates = [
    { label: 'Today', day: 'Today, Oct 11' },
    { label: 'Tomorrow', day: 'Tomorrow, Oct 12' },
    { label: 'Monday', day: 'Mon, Oct 13' },
    { label: 'Tuesday', day: 'Tue, Oct 14' },
  ];

  const times = ['06:30 AM', '08:00 AM', '12:00 PM', '05:30 PM', '06:30 PM', '07:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const code = 'EMMY-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  const currentProgram = PROGRAMS_DATA.find((p) => p.id === selectedProgram) || PROGRAMS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden border border-neutral-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#D3121A] uppercase">
                {isSuccess ? 'PASS CONFIRMED' : 'RESERVE YOUR MAT & GLOVES'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bebas tracking-wide text-[#111111] mt-0.5">
              {isSuccess ? 'YOUR EMMY TRIAL PASS' : 'BOOK YOUR FIRST SESSION'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* 1. Select Program */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                1. Choose Class / Program
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROGRAMS_DATA.map((prog) => (
                  <button
                    key={prog.id}
                    type="button"
                    onClick={() => setSelectedProgram(prog.id)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      selectedProgram === prog.id
                        ? 'border-[#D3121A] bg-red-50/60 ring-1 ring-[#D3121A]'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-neutral-900">{prog.name}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{prog.durationMinutes} min · {prog.level}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D3121A]" />
                  <span>2. Select Day</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {dates.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setSelectedDate(d.day)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedDate === d.day
                          ? 'border-[#D3121A] bg-[#D3121A] text-white'
                          : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D3121A]" />
                  <span>3. Session Time</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#D3121A]"
                >
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t} (Open Spots Available)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Athlete Details */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                4. Athlete Details
              </label>

              <div>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D3121A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D3121A]"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="Phone Number (SMS pass)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D3121A]"
                  />
                </div>
              </div>

              <div>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-xs font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#D3121A]"
                >
                  <option value="First Time / Beginner">Experience: First Time / Never Boxed</option>
                  <option value="Recreational (1-6 months)">Experience: Recreational (1-6 months)</option>
                  <option value="Experienced (1+ years)">Experience: Experienced Fighter / Heavy Bag user</option>
                </select>
              </div>
            </div>

            {/* Trial Perks Note */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D3121A] shrink-0 mt-0.5" />
              <span>
                <strong>100% Free Trial</strong>: We supply sanitized 16oz training gloves and quick-wrap liners. Just arrive 10 minutes prior in standard athletic shoes & gym attire.
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-[#D3121A] hover:bg-[#b00e15] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Confirm & Issue Free Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Confirmation State with Digital Pass */
          <div className="mt-6 space-y-6">
            <div className="bg-neutral-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-xl border border-neutral-800">
              {/* Diagonal accent stripes */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none athletic-stripes-pattern" />

              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <EmmyLogo variant="modal" />
                </div>
                <span className="font-mono text-xs text-[#D3121A] font-bold bg-neutral-800 px-2 py-1 rounded">
                  {confirmationCode}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Fighter</span>
                  <span className="text-base font-bold text-white block mt-0.5">{fullName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Class</span>
                  <span className="text-base font-bold text-[#D3121A] block mt-0.5">{currentProgram.name}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Scheduled Slot</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">{selectedDate} @ {selectedTime}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block uppercase tracking-wider text-[10px]">Location</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">Ring 1 · Downtown Gym</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span>Free Glove & Wrap Rental Included</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Check-in
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs space-y-1">
              <p className="font-bold">Confirmation sent to {email}!</p>
              <p className="text-emerald-700">Please arrive 10 minutes early at 450 Champions Way. Our front desk staff will have your sanitized 16oz gloves ready.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-[#111111] hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors text-center"
              >
                Done
              </button>
              <button
                onClick={() => {
                  alert(`Pass ${confirmationCode} downloaded to your device!`);
                }}
                className="px-4 py-3 border border-neutral-300 hover:bg-neutral-50 rounded-xl text-xs font-bold text-neutral-700 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-neutral-500" />
                <span>Save Pass</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
