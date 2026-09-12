import React from 'react';
import { PageId, Language, PersonaId } from '../types';
import { t } from '../translations';
import { personas } from '../personaData';

interface PersonalizeScreenProps {
  language: Language;
  currentPersonaId: PersonaId;
  onSelectPersona: (persona: PersonaId) => void;
  onNavigate: (page: PageId) => void;
}

export const PersonalizeScreen: React.FC<PersonalizeScreenProps> = ({
  language,
  currentPersonaId,
  onSelectPersona,
  onNavigate,
}) => {
  const personaList = Object.values(personas);

  const handleSelect = (id: PersonaId) => {
    onSelectPersona(id);
    onNavigate('dashboard');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('MAUSAM', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          {t('Personalize your weather', language)}
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          {t('Choose what matters most to you.', language)}{' '}
          {t('Mausam will customize your homepage accordingly.', language)}
        </p>
      </section>

      {/* 9 Personas Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {personaList.map((p) => {
          const isSelected = currentPersonaId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              id={`persona-${p.id}`}
              onClick={() => handleSelect(p.id)}
              className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#202026] border-sky-400 shadow-xl shadow-sky-500/10 ring-2 ring-sky-400/20'
                  : 'bg-[#18181e] border-white/10 hover:border-white/20 hover:bg-[#1c1c24]'
              }`}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-sky-500 text-white px-2 py-0.5 rounded-full">
                  ACTIVE
                </span>
              )}

              <div className={`w-14 h-14 rounded-2xl p-2.5 flex items-center justify-center border mb-4 group-hover:scale-105 transition-transform overflow-hidden ${
                p.image
                  ? 'bg-white/95 border-white/20 shadow-md'
                  : 'bg-[#202026] text-sky-400 border-white/5 text-2xl'
              }`}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-bold">{p.iconName}</span>
                )}
              </div>

              <h3 className="text-base font-bold text-white mb-1.5">{t(p.name, language)}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t(p.description, language)}</p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-sky-400 font-semibold">
                <span>Select profile</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
};
