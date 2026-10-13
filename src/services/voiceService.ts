// Modular speech recognition & speech synthesis service for EMMY Boxing Club AI Assistant

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    webkitAudioContext: typeof AudioContext;
  }
}

export type VoiceErrorType = 'permission_denied' | 'no_speech' | 'network' | 'unsupported' | 'unknown';

export class VoiceRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;
  private currentStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private silenceTimer: any = null;

  constructor() {
    this.initRecognition();
  }

  private initRecognition(): void {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 1;
      } catch (err) {
        console.warn('SpeechRecognition initialization error:', err);
        this.recognition = null;
      }
    }
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window.SpeechRecognition || window.webkitSpeechRecognition) ||
      (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    );
  }

  /**
   * Request microphone permission explicitly via getUserMedia to trigger the browser prompt
   * and initialize the audio analyser for visual feedback.
   */
  public async requestMicrophonePermission(): Promise<{ granted: boolean; error?: string }> {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return { granted: false, error: 'Microphone access is not supported in this browser environment.' };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Keep stream active for audio analysis
      this.currentStream = stream;
      this.setupAudioAnalyser(stream);
      return { granted: true };
    } catch (err: any) {
      const errorName = err?.name || '';
      if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
        return {
          granted: false,
          error: 'Microphone access was denied. Please allow microphone permissions in your browser address bar to talk with EMMY AI.',
        };
      }
      if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
        return {
          granted: false,
          error: 'No microphone was detected on your device. You can type your question using the keyboard.',
        };
      }
      return {
        granted: false,
        error: err?.message || 'Unable to access microphone. Please check your browser settings.',
      };
    }
  }

  private setupAudioAnalyser(stream: MediaStream): void {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.audioContext || this.audioContext.state === 'closed') {
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.5;
      source.connect(this.analyser);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    } catch (e) {
      console.warn('Could not setup audio analyser:', e);
    }
  }

  /**
   * Get current microphone input volume (0.0 to 1.0) for reactive audio wave rendering
   */
  public getAudioLevel(): number {
    if (!this.analyser || !this.dataArray || !this.isListening) return 0;
    try {
      this.analyser.getByteFrequencyData(this.dataArray as any);
      let sum = 0;
      for (let i = 0; i < this.dataArray.length; i++) {
        sum += this.dataArray[i];
      }
      const avg = sum / this.dataArray.length;
      return Math.min(1, avg / 128);
    } catch {
      return 0;
    }
  }

  /**
   * Start listening with permission check, live transcription, and clean completion callbacks.
   */
  public async startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (errorType: VoiceErrorType, message: string) => void,
    onEnd: () => void
  ): Promise<boolean> {
    if (this.isListening) {
      return true;
    }

    // Step 1: Ensure microphone access is granted by the browser
    if (!this.currentStream) {
      const permResult = await this.requestMicrophonePermission();
      if (!permResult.granted) {
        onError('permission_denied', permResult.error || 'Microphone access was denied.');
        return false;
      }
    } else {
      // Resume AudioContext if suspended
      if (this.audioContext && this.audioContext.state === 'suspended') {
        try {
          await this.audioContext.resume();
        } catch {}
      }
    }

    // If SpeechRecognition class wasn't initialized, try once more
    if (!this.recognition) {
      this.initRecognition();
    }

    if (!this.recognition) {
      onError('unsupported', 'Speech recognition is unavailable in this browser. Please use the text input below.');
      return false;
    }

    this.isListening = true;

    // Reset silence timer
    if (this.silenceTimer) clearTimeout(this.silenceTimer);

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          interim = item[0].transcript;
          isFinal = true;
        } else {
          interim += item[0].transcript;
        }
      }

      onResult(interim, isFinal);

      // Reset auto-submission silence timer when user is speaking
      if (this.silenceTimer) clearTimeout(this.silenceTimer);
      if (interim.trim() && !isFinal) {
        this.silenceTimer = setTimeout(() => {
          if (this.isListening) {
            this.stopListening();
            onResult(interim.trim(), true);
          }
        }, 2200); // 2.2s of silence after speaking triggers submission
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      if (this.silenceTimer) clearTimeout(this.silenceTimer);

      const err = event.error;
      if (err === 'not-allowed' || err === 'service-not-allowed') {
        onError(
          'permission_denied',
          'Microphone permission was denied by the browser. Please check your browser address bar permissions, or ask using text.'
        );
      } else if (err === 'no-speech') {
        onError('no_speech', 'No speech was detected. Tap the microphone and try speaking again.');
      } else if (err === 'network') {
        onError('network', 'Speech service network error. You can still ask your question using text.');
      } else if (err === 'aborted') {
        // Normal user interruption
      } else {
        onError('unknown', `Microphone recognition notice: ${err}`);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.silenceTimer) clearTimeout(this.silenceTimer);
      onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e: any) {
      // In case start was called when already started
      if (e.name === 'InvalidStateError') {
        return true;
      }
      this.isListening = false;
      onError('unknown', e.message || 'Could not start speech recognition.');
      return false;
    }
  }

  public stopListening(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
    }
    this.isListening = false;
  }

  /**
   * Release media tracks to completely turn off the browser microphone recording light
   */
  public releaseMicrophone(): void {
    this.stopListening();

    if (this.currentStream) {
      try {
        this.currentStream.getTracks().forEach((track) => track.stop());
      } catch {}
      this.currentStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
    this.analyser = null;
    this.dataArray = null;
  }
}

export class VoiceSynthesisService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  public isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices(): void {
    if (this.synth) {
      try {
        this.voices = this.synth.getVoices();
      } catch {
        this.voices = [];
      }
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ): void {
    if (!this.synth) {
      onError?.();
      return;
    }

    // Cancel any previous speech
    this.stop();

    try {
      // Clean text for speech: remove markdown asterisks, URLs, hashes
      const cleaned = text
        .replace(/[*#_`]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .trim();

      if (!cleaned) {
        onEnd?.();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.02; // Energetic, clear coaching pace
      utterance.pitch = 0.98; // Professional, grounded tone
      utterance.lang = 'en-US';

      // Pick best English voice if available
      if (this.voices.length === 0) {
        this.loadVoices();
      }

      const preferredVoice =
        this.voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google US English') ||
              v.name.includes('Samantha') ||
              v.name.includes('Alex') ||
              v.name.includes('Victoria'))
        ) || this.voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        onStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        onEnd?.();
      };

      utterance.onerror = (e) => {
        // 'interrupted' is normal when user clicks stop or starts speaking
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (e.error !== 'interrupted') {
          onError?.();
        } else {
          onEnd?.();
        }
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch {
      this.isSpeaking = false;
      onError?.();
    }
  }

  public stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }
}

export const recognitionService = new VoiceRecognitionService();
export const synthesisService = new VoiceSynthesisService();
