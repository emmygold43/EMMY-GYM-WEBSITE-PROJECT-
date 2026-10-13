import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProgramsSection } from './components/ProgramsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { TrainersSection } from './components/TrainersSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { MembershipSection } from './components/MembershipSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { StoryVideoModal } from './components/StoryVideoModal';
import { SearchModal } from './components/SearchModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { ClassScheduleItem, MembershipPlan } from './types';
import { Mic } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProgramId, setBookingProgramId] = useState('prog-fundamentals');
  const [isStoryVideoOpen, setIsStoryVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Monitor scroll to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'programs', 'schedule', 'about', 'membership', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartJourney = () => {
    setBookingProgramId('prog-fundamentals');
    setIsBookingOpen(true);
  };

  const handleSelectProgram = (programId: string) => {
    setBookingProgramId(programId);
    setIsBookingOpen(true);
  };

  const handleBookClass = (item: ClassScheduleItem) => {
    // Map class to corresponding program
    if (item.className.toLowerCase().includes('bag')) {
      setBookingProgramId('prog-heavy-bag');
    } else if (item.className.toLowerCase().includes('sparring')) {
      setBookingProgramId('prog-sparring');
    } else if (item.className.toLowerCase().includes('strength')) {
      setBookingProgramId('prog-strength');
    } else {
      setBookingProgramId('prog-fundamentals');
    }
    setIsBookingOpen(true);
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    if (plan.id === 'plan-trial') {
      setBookingProgramId('prog-fundamentals');
    }
    setIsBookingOpen(true);
  };

  const handleBookPrivate = (_coachName: string) => {
    setBookingProgramId('prog-fundamentals');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#D3121A] selection:text-white">
      {/* 1. Header & Navigation (Fixed/Sticky) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenVoice={() => setIsVoiceOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Split Asymmetric Design) */}
        <Hero
          onStartJourney={handleStartJourney}
          onOpenVoice={() => setIsVoiceOpen(true)}
          onExplorePrograms={() => scrollToSection('programs')}
        />

        {/* 3. 5 Training Programs */}
        <ProgramsSection onSelectProgram={handleSelectProgram} />

        {/* 4. Weekly Class Timetable */}
        <ScheduleSection onBookClass={handleBookClass} />

        {/* 5. Expert Trainers & Coaching Staff */}
        <TrainersSection onBookPrivate={handleBookPrivate} />

        {/* 6. Gym Amenities & Facilities */}
        <AmenitiesSection onScheduleTour={() => setIsBookingOpen(true)} />

        {/* 7. Membership & Passes */}
        <MembershipSection onSelectPlan={handleSelectPlan} />

        {/* 8. Athlete Testimonials */}
        <TestimonialsSection />

        {/* 9. Downtown Gym Location & Free Trial Lead Registration */}
        <ContactSection onSuccessBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Floating EMMY AI Voice Assistant Launcher */}
      <button
        onClick={() => setIsVoiceOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-[#111111] hover:bg-[#D3121A] text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-200 border border-neutral-700 hover:border-[#D3121A] group cursor-pointer active:scale-95"
        title="Talk to EMMY AI"
        aria-label="Talk to EMMY AI"
      >
        <div className="relative">
          <Mic className="w-5 h-5 text-[#D3121A] group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D3121A] animate-ping" />
        </div>
        <span className="hidden sm:inline font-bebas tracking-wider text-sm text-neutral-200 group-hover:text-white">
          TALK TO EMMY AI
        </span>
      </button>

      {/* 10. Brand Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialProgramId={bookingProgramId}
      />

      <StoryVideoModal
        isOpen={isStoryVideoOpen}
        onClose={() => setIsStoryVideoOpen(false)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProgram={handleSelectProgram}
        onNavigateSection={scrollToSection}
      />

      {/* Official EMMY AI Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />
    </div>
  );
}
