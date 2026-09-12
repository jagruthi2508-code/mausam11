import { Language } from './types';
import { t } from './translations';

const speechLanguages: Record<Language, string> = {
  en: 'en-US',
  te: 'te-IN',
  hi: 'hi-IN'
};

export interface VoiceAssistantCallbacks {
  onStart: () => void;
  onListening: () => void;
  onProcessing: () => void;
  onResult: (spokenText: string, reply: string) => void;
  onError: (errorMessage: string) => void;
  onEnd: () => void;
}

let activeRecognition: any = null;

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function startVoiceAssistant(lang: Language, callbacks: VoiceAssistantCallbacks) {
  if (typeof window === 'undefined') return;

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    callbacks.onError(t('Voice assistant is not supported in this browser.', lang));
    return;
  }

  if (activeRecognition) {
    try {
      activeRecognition.stop();
    } catch {
      // ignore
    }
    activeRecognition = null;
    callbacks.onEnd();
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = speechLanguages[lang] || 'en-US';

    recognition.onstart = () => {
      callbacks.onStart();
      callbacks.onListening();
    };

    recognition.onresult = (event: any) => {
      callbacks.onProcessing();
      const spoken = event.results[0]?.[0]?.transcript || '';

      setTimeout(() => {
        const responseText = t('I heard you. Live weather data will be connected by the backend.', lang);
        speakResponse(responseText, lang);
        callbacks.onResult(spoken, responseText);
      }, 400);
    };

    recognition.onerror = () => {
      callbacks.onError(t('Voice assistant could not access the microphone.', lang));
      activeRecognition = null;
      callbacks.onEnd();
    };

    recognition.onend = () => {
      activeRecognition = null;
      callbacks.onEnd();
    };

    activeRecognition = recognition;
    recognition.start();
  } catch {
    callbacks.onError(t('Voice assistant could not access the microphone.', lang));
    activeRecognition = null;
    callbacks.onEnd();
  }
}

export function stopVoiceAssistant() {
  if (activeRecognition) {
    try {
      activeRecognition.stop();
    } catch {
      // ignore
    }
    activeRecognition = null;
  }
}

export function speakResponse(text: string, lang: Language) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechLanguages[lang] || 'en-US';
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}
