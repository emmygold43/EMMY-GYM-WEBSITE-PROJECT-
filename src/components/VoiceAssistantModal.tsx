import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Volume2,
  VolumeX,
  X,
  RotateCcw,
  Square,
  ArrowRight,
  Send,
  AlertCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { EmmyLogo } from './EmmyLogo';
import { recognitionService, synthesisService } from '../services/voiceService';
import { sendVoiceQueryToAI, ChatTurn } from '../services/aiChatService';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

type AssistantStatus = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [status, setStatus] = useState<AssistantStatus>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>(
    'Welcome to EMMY Boxing Club. I am EMMY AI, your voice assistant. I can answer questions about our memberships, opening hours, downtown location, 6 training programs, or help you book your 100% free introductory session.'
  );
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [voiceMuted, setVoiceMuted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [showBookingPrompt, setShowBookingPrompt] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const animationFrameRef = useRef<number | null>(null);

  // Monitor audio levels when listening
  useEffect(() => {
    if (status === 'listening') {
      const updateLevel = () => {
        const level = recognitionService.getAudioLevel();
        setAudioLevel(level);
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setAudioLevel(0);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status]);

  // Clean audio on modal close
  useEffect(() => {
    if (!isOpen) {
      synthesisService.stop();
      recognitionService.releaseMicrophone();
      setStatus('idle');
      setErrorMessage(null);
    }

    return () => {
      synthesisService.stop();
      recognitionService.releaseMicrophone();
    };
  }, [isOpen]);

  const handleStartListening = async () => {
    // If speaking, interrupt speech playback
    synthesisService.stop();
    setErrorMessage(null);

    if (!recognitionService.isSupported()) {
      setErrorMessage(
        'Microphone or speech recognition is not supported in this browser. Please use the text input below.'
      );
      setStatus('idle');
      return;
    }

    setTranscript('');
    setStatus('listening');

    const started = await recognitionService.startListening(
      (interim, isFinal) => {
        setTranscript(interim);
        if (isFinal && interim.trim()) {
          recognitionService.stopListening();
          handleQuerySubmission(interim.trim());
        }
      },
      (errorType, message) => {
        if (errorType === 'permission_denied') {
          setErrorMessage(
            'Microphone access is not permitted in this browser window. Please check your browser address bar permissions or use the text box below to ask any question.'
          );
        } else if (errorType === 'no_speech') {
          setErrorMessage('No speech was detected. Tap SPEAK again and ask your question clearly.');
        } else {
          setErrorMessage(message);
        }
        setStatus('idle');
      },
      () => {
        setStatus((prev) => (prev === 'listening' ? 'idle' : prev));
      }
    );

    if (!started) {
      setStatus('idle');
    }
  };

  const handleStopListening = () => {
    recognitionService.stopListening();
    if (transcript.trim() && status === 'listening') {
      handleQuerySubmission(transcript.trim());
    } else {
      setStatus('idle');
    }
  };

  const handleQuerySubmission = async (queryText: string) => {
    if (!queryText.trim()) return;

    setStatus('processing');
    setErrorMessage(null);
    synthesisService.stop();

    const currentHistory = [...history];

    const response = await sendVoiceQueryToAI(queryText, currentHistory);

    // Update conversation context
    const updatedHistory: ChatTurn[] = [
      ...currentHistory,
      { role: 'user', text: queryText },
      { role: 'model', text: response.reply },
    ];
    setHistory(updatedHistory);
    setAiResponse(response.reply);

    if (response.triggerBooking) {
      setShowBookingPrompt(true);
    }

    // Speak aloud if voice is not muted
    if (!voiceMuted) {
      synthesisService.speak(
        response.reply,
        () => setStatus('speaking'),
        () => setStatus('idle'),
        () => setStatus('idle')
      );
    } else {
      setStatus('idle');
    }
  };

  const handleReplayResponse = () => {
    if (!aiResponse) return;
    synthesisService.speak(
      aiResponse,
      () => setStatus('speaking'),
      () => setStatus('idle'),
      () => setStatus('idle')
    );
  };

  const handleStopAudio = () => {
    synthesisService.stop();
    setStatus('idle');
  };

  const handleEndConversation = () => {
    synthesisService.stop();
    recognitionService.releaseMicrophone();
    setHistory([]);
    setTranscript('');
    setAiResponse(
      'Conversation ended and reset. Whenever you are ready to train, tap the microphone to ask another question or reserve your free introductory session!'
    );
    setStatus('idle');
    setShowBookingPrompt(false);
    setErrorMessage(null);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || status === 'processing') return;
    const msg = textInput.trim();
    setTextInput('');
    setTranscript(msg);
    handleQuerySubmission(msg);
  };

  const sampleQuestions = [
    'What are your membership prices?',
    'What are your gym opening hours?',
    'Where is EMMY Boxing Club located?',
    'What training programs do you offer?',
    'Book my free introductory session',
  ];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="EMMY AI Voice Assistant"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => {
          handleStopAudio();
          onClose();
        }}
      />

      {/* Main Voice Assistant Card */}
      <div className="relative bg-[#111111] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-neutral-800 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Subtle background red glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D3121A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D3121A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-800 relative z-10">
          <div className="flex items-center gap-3">
            <EmmyLogo variant="modal" />
            <div className="hidden sm:block">
              <span className="font-bebas tracking-wider text-xl text-white block leading-none">
                EMMY AI VOICE ASSISTANT
              </span>
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                VERIFIED BUSINESS INTELLIGENCE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mute Voice Audio Toggle */}
            <button
              onClick={() => {
                if (!voiceMuted) {
                  synthesisService.stop();
                  setVoiceMuted(true);
                  if (status === 'speaking') setStatus('idle');
                } else {
                  setVoiceMuted(false);
                }
              }}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                voiceMuted
                  ? 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-white'
                  : 'border-[#D3121A]/50 bg-red-950/30 text-[#D3121A] hover:bg-red-950/50'
              }`}
              title={voiceMuted ? 'Unmute voice responses' : 'Mute voice responses'}
              aria-label={voiceMuted ? 'Unmute voice' : 'Mute voice'}
            >
              {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                handleStopAudio();
                onClose();
              }}
              className="p-2.5 text-neutral-400 hover:text-white rounded-xl border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Close voice assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Indicator Bar */}
        <div className="mt-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                status === 'listening'
                  ? 'bg-red-500 animate-ping'
                  : status === 'speaking'
                  ? 'bg-emerald-400 animate-pulse'
                  : status === 'processing'
                  ? 'bg-amber-400 animate-bounce'
                  : 'bg-neutral-500'
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-300">
              {status === 'listening' && 'Listening... Speak naturally'}
              {status === 'processing' && 'Thinking — Checking EMMY Records...'}
              {status === 'speaking' && 'Speaking verified response'}
              {status === 'idle' && 'Ready — Click "SPEAK" to Talk'}
              {status === 'error' && 'Action Required'}
            </span>
          </div>

          <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
            Grounded in verified data
          </span>
        </div>

        {/* Interactive Center Microphone Area */}
        <div className="my-8 flex flex-col items-center justify-center relative z-10">
          
          {/* Animated concentric pulse rings when listening */}
          <div className="relative flex items-center justify-center">
            {status === 'listening' && (
              <>
                <div
                  className="absolute rounded-full border-2 border-[#D3121A]/50 animate-ping"
                  style={{
                    width: `${120 + audioLevel * 70}px`,
                    height: `${120 + audioLevel * 70}px`,
                  }}
                />
                <div
                  className="absolute rounded-full border border-[#D3121A]/30 animate-pulse"
                  style={{
                    width: `${150 + audioLevel * 80}px`,
                    height: `${150 + audioLevel * 80}px`,
                  }}
                />
              </>
            )}

            {/* Central Microphone Button */}
            <button
              onClick={status === 'listening' ? handleStopListening : handleStartListening}
              disabled={status === 'processing'}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer active:scale-95 ${
                status === 'listening'
                  ? 'bg-[#D3121A] text-white shadow-[0_0_40px_rgba(211,18,26,0.7)] scale-105'
                  : status === 'speaking'
                  ? 'bg-neutral-800 text-[#D3121A] border-2 border-[#D3121A]/80 shadow-[0_0_20px_rgba(211,18,26,0.3)]'
                  : 'bg-neutral-900 hover:bg-[#D3121A] text-white border-2 border-neutral-700 hover:border-[#D3121A]'
              }`}
              aria-label={status === 'listening' ? 'Stop listening' : 'Start speaking'}
            >
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 transition-transform" />
              <span className="text-[9px] font-bebas tracking-wider uppercase mt-1">
                {status === 'listening' ? 'DONE' : 'SPEAK'}
              </span>
            </button>
          </div>

          {/* Dynamic Audio Waves Visualization (responsive to actual volume or voice state) */}
          <div className="flex items-center gap-1.5 h-6 mt-5" aria-hidden="true">
            {[20, 50, 90, 40, 100, 70, 30, 85, 60, 95, 35, 75, 45, 90].map((baseHeight, i) => {
              const dynamicHeight =
                status === 'listening'
                  ? Math.max(6, Math.min(24, (baseHeight * (0.15 + audioLevel * 0.85))))
                  : status === 'speaking'
                  ? Math.max(6, baseHeight * 0.24)
                  : 4;

              return (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-100 ${
                    status === 'listening' || status === 'speaking'
                      ? 'bg-[#D3121A]'
                      : 'bg-neutral-800'
                  }`}
                  style={{
                    height: `${dynamicHeight}px`,
                  }}
                />
              );
            })}
          </div>

          {/* Real-time speech transcription display */}
          <div className="w-full mt-4 min-h-[32px] text-center px-4">
            {transcript ? (
              <p className="text-sm font-medium text-white italic">
                “{transcript}”
              </p>
            ) : status === 'listening' ? (
              <p className="text-xs text-neutral-400 animate-pulse">
                Listening to your microphone... speak now
              </p>
            ) : (
              <p className="text-xs text-neutral-500">
                Ask about prices, opening hours, directions, programs, or free trial
              </p>
            )}
          </div>
        </div>

        {/* Error Notification if any */}
        {errorMessage && (
          <div className="mb-4 p-3.5 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-neutral-300 flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#D3121A] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-neutral-500 hover:text-white p-0.5 shrink-0"
              aria-label="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* AI Answer Card */}
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 relative shadow-inner">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2.5">
            <span className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#D3121A]" />
              EMMY AI Grounded Response
            </span>

            {/* Audio Actions (Replay / Stop) */}
            <div className="flex items-center gap-2">
              {status === 'speaking' ? (
                <button
                  onClick={handleStopAudio}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D3121A] hover:underline cursor-pointer"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>Stop Voice</span>
                </button>
              ) : (
                <button
                  onClick={handleReplayResponse}
                  disabled={!aiResponse}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
            {aiResponse}
          </p>

          {/* Action Trigger: Book Free Session if booking was suggested */}
          {showBookingPrompt && (
            <div className="mt-4 pt-3.5 border-t border-neutral-800 flex items-center justify-between gap-3">
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                100% Free Trial Pass Available
              </span>
              <button
                onClick={() => {
                  handleStopAudio();
                  onClose();
                  onOpenBooking();
                }}
                className="px-4 py-2 bg-[#D3121A] hover:bg-[#b00e15] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Claim Free Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Text Fallback Input Bar */}
        <form onSubmit={handleTextSubmit} className="mt-5 relative">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            disabled={status === 'processing'}
            placeholder="Or type your question here (e.g. 'How much is Championship tier?')..."
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#D3121A] focus:ring-1 focus:ring-[#D3121A] rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!textInput.trim() || status === 'processing'}
            className="absolute right-2 top-2 p-1.5 bg-[#D3121A] hover:bg-[#b00e15] disabled:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample Questions */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-neutral-500 text-[11px] shrink-0 font-mono">Suggested:</span>
          {sampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setTranscript(q);
                handleQuerySubmission(q);
              }}
              className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Footer Bar with End Conversation */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <button
            onClick={handleEndConversation}
            className="hover:text-neutral-300 underline cursor-pointer"
          >
            End Conversation & Reset
          </button>

          <button
            onClick={() => {
              handleStopAudio();
              onClose();
              onOpenBooking();
            }}
            className="text-[#D3121A] font-bold hover:underline cursor-pointer"
          >
            Book Free Introductory Session →
          </button>
        </div>

      </div>
    </div>
  );
};
