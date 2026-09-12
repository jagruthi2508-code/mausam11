import React, { useEffect } from 'react';
import { Language } from '../types';
import { t } from '../translations';

interface SplashScreenProps {
  language: Language;
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ language, onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      onClick={onFinish}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0e1620] via-[#101014] to-[#12141a] text-white cursor-pointer select-none animate-in fade-in duration-700"
    >
      {/* Floating Brand Logo */}
      <div className="w-28 h-28 flex items-center justify-center animate-bounce drop-shadow-[0_20px_25px_rgba(2,132,199,0.35)]">
        <img
          src="/assets/mausam-logo.png"
          alt="Mausam Logo"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      <h1 className="mt-6 text-4xl font-extrabold tracking-widest text-white">MAUSAM</h1>
      <p className="mt-2 text-sm text-slate-400 font-medium tracking-wide">
        {t('Your weather. Your journey. Your way.', language)}
      </p>

      {/* Loading Dots */}
      <div className="flex items-center gap-2 mt-8">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse [animation-delay:200ms]" />
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse [animation-delay:400ms]" />
      </div>

      <span className="mt-6 text-[11px] text-slate-500 hover:text-slate-400 transition-colors">
        Click anywhere to continue
      </span>
    </div>
  );
};
