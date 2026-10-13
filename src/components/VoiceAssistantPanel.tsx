import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Play, RotateCcw, Sparkles } from 'lucide-react';

interface VoiceAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onBookClass: (className: string) => void;
}

export const VoiceAssistantPanel: React.FC<VoiceAssistantPanelProps> = ({
  isOpen,
  onClose,
  onBookClass,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'advice' | 'combinations' | 'rounds'>('advice');
  const [lastSpokenText, setLastSpokenText] = useState(
    'Welcome to the EMMY Corner Coach. I am your AI sparring assistant. Choose a combo drill or ask for fight preparation advice!'
  );
  const [roundTimer, setRoundTimer] = useState<number | null>(null);
  const [roundSeconds, setRoundSeconds] = useState(180);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string) => {
    setLastSpokenText(text);
    if (!audioEnabled || !synthRef.current) return;

    try {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  const quickQuestions = [
    {
      q: 'What should I wear to my first EMMY session?',
      a: 'Wear comfortable athletic training clothes and flat athletic sneakers. At EMMY Boxing Club, we provide sanitized 16-ounce leather gloves and hand wraps for all first-time trial members!',
    },
    {
      q: 'How do I master the orthodox 1-2 combination?',
      a: 'Start in a balanced 45-degree stance. Step forward with your lead jab, then pivot your rear foot and drive hip rotation into the straight right hand. Keep your chin tucked behind your lead shoulder.',
    },
    {
      q: 'Which program is right for high cardio burn?',
      a: 'Heavy Bag Conditioning is our highest volume class, burning up to 950 calories across 10 structured rounds with high output intervals and core armor work.',
    },
    {
      q: 'Can beginners spar at EMMY Boxing Club?',
      a: 'We keep sparring strictly for advanced fighters who have completed our Boxing Fundamentals syllabus and received coach sign-off from Coach Marcus.',
    },
  ];

  const combinationDrills = [
    { name: 'Drill 1: Basic Jab-Cross-Hook', callout: 'One, Two, Three! Reset and circle left!' },
    { name: 'Drill 2: Slip & Counter', callout: 'Slip right, rear uppercut, lead hook, straight right!' },
    { name: 'Drill 3: Body-Head Assault', callout: 'Jab high, change levels, left hook to liver, overhand right!' },
    { name: 'Drill 4: Pressure Pivot', callout: 'Double jab, pivot ninety degrees, check hook, cross!' },
  ];

  const handleStartTimer = () => {
    if (roundTimer) {
      clearInterval(roundTimer);
      setRoundTimer(null);
      speak('Round paused.');
    } else {
      speak('Round one. Bell sounds. Work the jab!');
      const interval = window.setInterval(() => {
        setRoundSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setRoundTimer(null);
            speak('Time! Round complete. Breathe and take your stool.');
            return 180;
          }
          if (prev === 30) {
            speak('Thirty seconds left in the round! Pick up the volume!');
          }
          return prev - 1;
        });
      }, 1000);
      setRoundTimer(interval);
    }
  };

  const handleResetTimer = () => {
    if (roundTimer) clearInterval(roundTimer);
    setRoundTimer(null);
    setRoundSeconds(180);
    stopSpeaking();
  };

  if (!isOpen) return null;

  const minutes = Math.floor(roundSeconds / 60);
  const seconds = roundSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Main Panel */}
      <div className="relative bg-[#111111] text-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl z-10 border border-neutral-800 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D3121A] flex items-center justify-center text-white shadow-md">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bebas text-2xl tracking-wide text-white">EMMY CORNER AI</span>
                <span className="text-[10px] font-mono uppercase bg-neutral-800 text-[#D3121A] px-2 py-0.5 rounded font-bold border border-neutral-700">
                  Voice Coach
                </span>
              </div>
              <p className="text-xs text-neutral-400">Interactive Fight & Technique Advisor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (audioEnabled) {
                  stopSpeaking();
                  setAudioEnabled(false);
                } else {
                  setAudioEnabled(true);
                  speak('Audio speech enabled for EMMY Coach.');
                }
              }}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title={audioEnabled ? 'Mute Speech' : 'Enable Speech'}
            >
              {audioEnabled ? <Volume2 className="w-5 h-5 text-[#D3121A]" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close voice assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Speaking Feedback Card */}
        <div className="mt-5 p-4 rounded-xl bg-neutral-900 border border-neutral-800 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span className="flex items-center gap-1.5 font-mono text-[#D3121A]">
              <Sparkles className="w-3.5 h-3.5" />
              {isSpeaking ? 'COACH IS SPEAKING...' : 'CORNER AUDIO READY'}
            </span>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-[11px] text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Mute Audio
              </button>
            )}
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed italic">
            "{lastSpokenText}"
          </p>

          {/* Audio Wave Simulation */}
          {isSpeaking && (
            <div className="flex items-center gap-1 mt-3">
              {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 30, 75].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#D3121A] rounded-full animate-pulse"
                  style={{ height: `${h * 0.25}px`, animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 mt-5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
          <button
            onClick={() => setActiveTab('advice')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'advice' ? 'bg-[#D3121A] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Technique FAQ
          </button>
          <button
            onClick={() => setActiveTab('combinations')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'combinations' ? 'bg-[#D3121A] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Combination Drills
          </button>
          <button
            onClick={() => setActiveTab('rounds')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rounds' ? 'bg-[#D3121A] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Round Timer
          </button>
        </div>

        {/* Tab 1: Technique FAQ */}
        {activeTab === 'advice' && (
          <div className="mt-4 space-y-2 max-h-56 overflow-y-auto pr-1">
            {quickQuestions.map((item) => (
              <button
                key={item.q}
                onClick={() => speak(item.a)}
                className="w-full text-left p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 transition-all text-xs cursor-pointer group"
              >
                <div className="font-semibold text-white group-hover:text-[#D3121A] flex items-center justify-between">
                  <span>{item.q}</span>
                  <Volume2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0 ml-2" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Combination Drills */}
        {activeTab === 'combinations' && (
          <div className="mt-4 space-y-2">
            {combinationDrills.map((drill) => (
              <div
                key={drill.name}
                className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{drill.name}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5 font-mono">{drill.callout}</div>
                </div>
                <button
                  onClick={() => speak(drill.callout)}
                  className="px-3 py-1.5 bg-[#D3121A] hover:bg-[#b00e15] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Call It</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: 3-Minute Round Timer */}
        {activeTab === 'rounds' && (
          <div className="mt-4 p-5 rounded-xl bg-neutral-900 border border-neutral-800 text-center space-y-3">
            <span className="text-[11px] font-mono tracking-widest text-[#D3121A] uppercase block">
              CHAMPIONSHIP 3-MINUTE ROUND
            </span>
            <div className="font-bebas text-5xl text-white tracking-wider font-bold">
              {formattedTime}
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartTimer}
                className="px-5 py-2.5 bg-[#D3121A] hover:bg-[#b00e15] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{roundTimer ? 'Pause Round' : 'Start Round Bell'}</span>
              </button>
              <button
                onClick={handleResetTimer}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer with Class Booking Direct Trigger */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Ready to train with real coaches?</span>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
              onBookClass('Boxing Fundamentals');
            }}
            className="text-[#D3121A] font-bold hover:underline cursor-pointer"
          >
            Book Free First Session →
          </button>
        </div>
      </div>
    </div>
  );
};
