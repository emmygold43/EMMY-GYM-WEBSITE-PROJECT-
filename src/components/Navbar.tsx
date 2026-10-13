import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, Mic } from 'lucide-react';
import { EmmyLogo } from './EmmyLogo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenSearch: () => void;
  onOpenVoice?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenSearch,
  onOpenVoice,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'membership', label: 'Membership' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileDrawerOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs py-3'
            : 'bg-white border-b border-neutral-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Official Brand Logo */}
          <div className="shrink-0 flex items-center">
            <EmmyLogo variant="header" onClick={() => handleLinkClick('home')} />
          </div>

          {/* Zone 2: Center Navigation Links (Hidden on <1024px) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#D3121A]'
                      : 'text-[#6B7280] hover:text-[#111111]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#D3121A] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Right Utilities (Search + Primary CTA) */}
          <div className="flex items-center gap-4">
            {/* EMMY AI Voice Assistant */}
            {onOpenVoice && (
              <button
                onClick={onOpenVoice}
                className="p-2 text-[#6B7280] hover:text-[#D3121A] hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                title="Talk to EMMY AI"
                aria-label="Talk to EMMY AI"
              >
                <Mic className="w-5 h-5 text-[#D3121A]" />
              </button>
            )}

            {/* Minimal search icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#6B7280] hover:text-[#111111] hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              title="Search programs, schedule & coaches"
              aria-label="Search gym schedule and programs"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Primary Header CTA: Rounded full pill button in solid crimson red */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 bg-[#D3121A] hover:bg-[#b00e15] text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Book a Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger toggle (under 1024px) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 text-[#111111] hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <EmmyLogo variant="drawer" onClick={() => handleLinkClick('home')} />
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col space-y-4 pt-6">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left text-lg font-bold py-2 transition-colors flex items-center justify-between ${
                        isActive ? 'text-[#D3121A]' : 'text-neutral-800 hover:text-[#D3121A]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#D3121A]" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              {onOpenVoice && (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onOpenVoice();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white hover:bg-black rounded-xl text-sm font-semibold transition-colors"
                >
                  <Mic className="w-4 h-4 text-[#D3121A]" />
                  <span>Talk to EMMY AI</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-sm font-semibold transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search Classes & Programs</span>
              </button>

              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#D3121A] hover:bg-[#b00e15] text-white rounded-full text-sm font-bold shadow-md transition-colors"
              >
                <span>Book a Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-neutral-400 pt-2">
                500+ Active Fighters · Downtown District
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
