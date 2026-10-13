import React, { useState } from 'react';
import { EmmyLogo } from './EmmyLogo';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-neutral-800">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block">
              <EmmyLogo variant="footer" onClick={() => onNavigate('home')} />
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mt-4">
              At EMMY Boxing Club, we forge physical power, razor-sharp focus, and unbreakable resilience. Home to contenders, amateurs, and dedicated fitness athletes.
            </p>

            <div className="pt-2 text-xs text-neutral-400 font-mono">
              REAL PEOPLE · REAL PROGRESS · EMMY.
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bebas text-lg text-white tracking-wider uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  5 Training Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Weekly Class Timetable
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Coaching Roster
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Membership Passes
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Facility (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bebas text-lg text-white tracking-wider uppercase">
              HEADQUARTERS
            </h4>
            <div className="text-xs text-neutral-400 space-y-2 leading-relaxed">
              <p>450 Champions Way, Downtown Athletic District, NY 10013</p>
              <p>Phone: (212) 555-8658</p>
              <div className="pt-1 text-[11px] text-neutral-500 font-mono">
                <div>MON–FRI: 5:30 AM – 10:00 PM</div>
                <div>SAT–SUN: 7:00 AM – 6:00 PM</div>
              </div>
            </div>
          </div>

          {/* Newsletter / Fight Brief (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bebas text-lg text-white tracking-wider uppercase">
              THE FIGHT BRIEF
            </h4>
            <p className="text-xs text-neutral-400">
              Weekly striking breakdowns, technique breakdowns from Coach Marcus, and schedule updates.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D3121A]"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#D3121A] hover:bg-[#b00e15] text-white rounded-lg transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                <Check className="w-4 h-4" />
                <span>Subscribed to The Fight Brief!</span>
              </div>
            )}

            <button
              onClick={onOpenBooking}
              className="w-full mt-3 py-2.5 bg-neutral-800 hover:bg-[#D3121A] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Book First Session Free
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} EMMY Boxing Club LLC. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Waiver & Safety Rules</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
