import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  onSuccessBooking?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [programChoice, setProgramChoice] = useState('Boxing Fundamentals');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background athletic diagonal stripes */}
      <div className="absolute -bottom-10 -left-10 w-80 h-80 opacity-10 pointer-events-none athletic-stripes-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Gym Information & Location */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D3121A]" />
                <span className="text-xs font-bold tracking-[0.25em] text-[#D3121A] uppercase">
                  DOWNTOWN GYM & HEADQUARTERS
                </span>
              </div>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.9]">
                STEP INSIDE THE DOORS.
              </h2>
              <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
                Located in the heart of the Downtown Athletic District. Free member parking, private lockers, and keyless contactless access.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-neutral-800 rounded-xl text-[#D3121A] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">
                    Facility Address
                  </span>
                  <p className="text-sm text-neutral-200 font-semibold mt-0.5">
                    450 Champions Way, Suite 100 <br />
                    Downtown Athletic District, NY 10013
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-neutral-800 rounded-xl text-[#D3121A] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">
                    Training Hours
                  </span>
                  <p className="text-sm text-neutral-200 mt-0.5">
                    <strong>Monday – Friday:</strong> 5:30 AM – 10:00 PM <br />
                    <strong>Saturday – Sunday:</strong> 7:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-neutral-800 rounded-xl text-[#D3121A] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">
                    Direct Line & Front Desk
                  </span>
                  <p className="text-sm text-neutral-200 font-semibold mt-0.5">
                    (212) 555-EMMY · (212) 555-3669
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-neutral-800 rounded-xl text-[#D3121A] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block font-mono">
                    Member Concierge
                  </span>
                  <p className="text-sm text-neutral-200 font-semibold mt-0.5">
                    frontdesk@emmyboxingclub.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Free Session Pass Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-800/90 rounded-2xl p-6 sm:p-10 border border-neutral-700 shadow-2xl relative">
              <div className="border-b border-neutral-700 pb-5 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D3121A]" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D3121A] uppercase">
                    INSTANT REGISTRATION
                  </span>
                </div>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
                  CLAIM YOUR COMPLIMENTARY TRIAL SESSION
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Zero cost. Zero sales harassment. Experience genuine coaching and bag work firsthand.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D3121A] focus:ring-1 focus:ring-[#D3121A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D3121A] focus:ring-1 focus:ring-[#D3121A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D3121A] focus:ring-1 focus:ring-[#D3121A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Preferred Program
                    </label>
                    <select
                      value={programChoice}
                      onChange={(e) => setProgramChoice(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D3121A]"
                    >
                      <option value="Boxing Fundamentals">Boxing Fundamentals (Beginner-friendly)</option>
                      <option value="Heavy Bag Conditioning">Heavy Bag Conditioning (Cardio & Power)</option>
                      <option value="Fighter's Strength & Conditioning">Fighter's Strength & Conditioning</option>
                      <option value="Championship Sparring">Championship Sparring (Intermediate+)</option>
                      <option value="Youth Gloves Academy">Youth Gloves Academy (Ages 10-17)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#D3121A] hover:bg-[#b00e15] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                    >
                      <span>Claim Free Pass & Reserve Spot</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 justify-center pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Free wrap package & 16oz loaner gloves guaranteed upon arrival.</span>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bebas text-3xl text-white">YOUR PASS IS READY, {name.split(' ')[0]}!</h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                    We’ve reserved your spot in <strong>{programChoice}</strong>. Check your inbox at <strong>{email}</strong> for your check-in barcode and locker code.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-xl text-xs font-semibold"
                  >
                    Register Another Athlete
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
