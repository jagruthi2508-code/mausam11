import React from 'react';
import { Bell, AlertTriangle, Info, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { PageId, Language, PersonaId } from '../types';
import { t } from '../translations';

interface AlertsScreenProps {
  language: Language;
  personaId: PersonaId;
  onNavigate: (page: PageId) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  language,
  personaId,
  onNavigate,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Heading */}
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('WEATHER ALERTS', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Stay informed', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Important weather conditions and changes that may affect your plans.', language)}
        </p>
      </section>

      {/* Alert Summary Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[#18181e] border border-white/10">
          <strong className="text-3xl font-black text-white block">2</strong>
          <span className="text-xs text-slate-400 mt-0.5 block">{t('Active alerts', language)}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#18181e] border border-white/10">
          <strong className="text-3xl font-black text-red-400 block">1</strong>
          <span className="text-xs text-slate-400 mt-0.5 block">{t('High priority', language)}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#18181e] border border-white/10">
          <strong className="text-3xl font-black text-amber-400 block">1</strong>
          <span className="text-xs text-slate-400 mt-0.5 block">{t('Advisory', language)}</span>
        </div>
      </section>

      {/* Active Alerts List */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('ACTIVE ALERTS', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">{t('Current weather warnings', language)}</h2>
        </div>

        {/* High Priority Card */}
        <article className="p-5 rounded-2xl bg-red-950/25 border border-red-500/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-500 text-white font-black text-lg flex items-center justify-center shrink-0">
            !
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                {t('HIGH PRIORITY', language)}
              </span>
              <span className="text-[11px] text-slate-400">{t('Updated 10 min ago', language)}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">{t('Heavy rain expected', language)}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {t(
                'Rain may become intense in your area during the evening. Travel carefully and avoid waterlogged roads.',
                language
              )}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-red-500/20 text-xs text-slate-300">
              <span>Rain probability: <strong className="text-white">70%</strong></span>
              <span>Expected: <strong className="text-white">6 PM – 8 PM</strong></span>
            </div>
          </div>
        </article>

        {/* Advisory Card */}
        <article className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-black text-lg flex items-center justify-center shrink-0">
            i
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {t('ADVISORY', language)}
              </span>
              <span className="text-[11px] text-slate-400">{t('Updated 25 min ago', language)}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">{t('High humidity', language)}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {t(
                'Humidity is expected to remain high. Outdoor activities may feel more uncomfortable than usual.',
                language
              )}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-amber-500/20 text-xs text-slate-300">
              <span>Humidity: <strong className="text-white">78%</strong></span>
              <span>Valid: <strong className="text-white">Today</strong></span>
            </div>
          </div>
        </article>
      </section>

      {/* Personalized Alerts */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('PERSONALIZED ALERTS', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">
            {t('Relevant to your selected user type', language)}
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
              {personaId.toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              {t('Rain may affect your evening journey', language)}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t('Consider starting earlier or keeping an alternate route available.', language)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('journey')}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>{t('View Journey', language)}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Notification History */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('NOTIFICATION HISTORY', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">{t('Recent updates', language)}</h2>
        </div>

        <div className="p-4 rounded-2xl bg-[#18181e] border border-white/10 divide-y divide-white/5 space-y-3">
          {[
            {
              title: t('Rain probability increased', language),
              desc: t('Rain probability changed from 40% to 70%.', language),
              time: '10 minutes ago',
            },
            {
              title: t('Weather conditions updated', language),
              desc: t('Evening forecast has been updated.', language),
              time: '25 minutes ago',
            },
            {
              title: t('Humidity increased', language),
              desc: t('Humidity increased to 78%.', language),
              time: '1 hour ago',
            },
          ].map((item, idx) => (
            <div key={idx} className="pt-3 first:pt-0 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-xs font-bold text-white block">{item.title}</strong>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                <small className="text-[10px] text-slate-500 block mt-1">{item.time}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('NOTIFICATION PREFERENCES', language)}
          </span>
          <h3 className="text-base font-bold text-white mt-1">
            {t('Keep receiving important updates', language)}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('Weather changes, journey risks and important alerts will be shown here.', language)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('settings')}
          className="px-4 py-2 bg-[#202026] hover:bg-[#282830] border border-white/10 text-xs font-semibold text-sky-400 hover:text-white rounded-xl transition-colors"
        >
          {t('Manage Notifications', language)}
        </button>
      </section>
    </div>
  );
};
