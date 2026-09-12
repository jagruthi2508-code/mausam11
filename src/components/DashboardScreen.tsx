import React, { useState } from 'react';
import { Check, AlertTriangle, ArrowUpRight, Sun, Cloud, CloudRain, Wind, Droplets, ZoomIn, ZoomOut, ChevronRight } from 'lucide-react';
import { PageId, Language, PersonaId, TemperatureUnit } from '../types';
import { t } from '../translations';
import { personas } from '../personaData';

interface DashboardScreenProps {
  language: Language;
  personaId: PersonaId;
  temperatureUnit: TemperatureUnit;
  onNavigate: (page: PageId) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  language,
  personaId,
  temperatureUnit,
  onNavigate,
}) => {
  const [forecastTab, setForecastTab] = useState<'today' | 'tomorrow' | 'week'>('today');
  const [forecastMode, setForecastMode] = useState<'forecast' | 'air'>('forecast');
  const [mapZoomed, setMapZoomed] = useState(false);

  const persona = personas[personaId] || personas.commuter;

  // Temperature unit conversion helper
  const displayTemp = (celsius: number) => {
    if (temperatureUnit === 'fahrenheit') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <section className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {t('CURRENT LOCATION', language)}
          </span>
          <h3 className="text-3xl font-extrabold text-white mt-1">Hyderabad</h3>
          <p className="text-xs text-slate-400 mt-0.5">{t('Today, Saturday, September 5', language)}</p>
        </div>
      </section>

      {/* Main Weather Card */}
      <section className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#1d2f3d] via-[#16232d] to-[#121a22] border border-white/10 shadow-xl flex items-center justify-between">
        <div className="z-10">
          <span className="text-[10px] font-bold tracking-widest text-sky-300 uppercase">
            {t('CURRENT WEATHER', language)}
          </span>
          <h1 className="text-7xl md:text-8xl font-black text-white tracking-tight my-2">
            {temperatureUnit === 'fahrenheit' ? '82°' : '28°'}
          </h1>
          <h3 className="text-xl font-bold text-sky-100">{t('Partly Cloudy', language)}</h3>
          <p className="text-xs text-slate-300 mt-1">{t('Feels like 30°', language)}</p>
        </div>

        {/* Dynamic Weather Animation */}
        <div className="relative w-44 h-36 hidden sm:block">
          <div className="absolute top-2 right-4 w-20 h-20 rounded-full bg-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.5)] animate-pulse" />
          <div className="absolute bottom-4 left-2 w-32 h-14 bg-white/95 rounded-full shadow-[20px_-15px_0_-4px_rgba(255,255,255,0.95),45px_-8px_0_-10px_rgba(255,255,255,0.95)]" />
        </div>
      </section>

      {/* Forecast Panel & Rain Probability */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setForecastTab('today')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                forecastTab === 'today' ? 'bg-[#202026] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setForecastTab('tomorrow')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                forecastTab === 'tomorrow' ? 'bg-[#202026] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => setForecastTab('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                forecastTab === 'week' ? 'bg-[#202026] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Next 7 days
            </button>
          </div>

          <div className="flex items-center bg-[#18181e] p-1 rounded-xl border border-white/5 text-[11px]">
            <button
              type="button"
              onClick={() => setForecastMode('forecast')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                forecastMode === 'forecast' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Forecast
            </button>
            <button
              type="button"
              onClick={() => setForecastMode('air')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                forecastMode === 'air' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Air quality
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3.5">
          {/* 7 Days Strip */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {[
              { day: 'Mon', time: '11:42 PM', temp: 16, feel: 'Real feel 18°', sub: 'Wind NE 5.8 km/h', active: true },
              { day: 'Tue', temp: 10, feel: 'Partly cloudy', icon: '🌤' },
              { day: 'Wed', temp: 15, feel: 'Partly cloudy', icon: '🌤' },
              { day: 'Thu', temp: 11, feel: 'Cloudy', icon: '☁' },
              { day: 'Fri', temp: 18, feel: 'Mostly clear', icon: '☀' },
              { day: 'Sat', temp: 12, feel: 'Light rain', icon: '🌧' },
              { day: 'Sun', temp: 10, feel: 'Rain expected', icon: '🌧' },
            ].map((f, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  f.active
                    ? 'bg-sky-400 text-slate-900 border-sky-300 shadow-lg'
                    : 'bg-[#18181e] text-slate-100 border-white/5 hover:border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${f.active ? 'text-slate-900' : 'text-slate-300'}`}>{f.day}</span>
                    {f.time && <span className="text-[10px] text-slate-800 font-medium">{f.time}</span>}
                  </div>
                  <strong className="text-2xl font-black block mt-3">{displayTemp(f.temp)}</strong>
                </div>

                <div className="mt-4 pt-2 border-t border-black/10">
                  <span className={`text-[11px] block leading-tight ${f.active ? 'text-slate-800' : 'text-slate-400'}`}>
                    {f.feel}
                  </span>
                  {f.sub && <span className="text-[10px] text-slate-800 block mt-0.5">{f.sub}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Chance of Rain */}
          <div className="p-4 rounded-2xl bg-[#18181e] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Chance of rain</span>
              <strong className="text-lg font-bold text-white">35%</strong>
            </div>

            <div className="relative h-28 my-2 flex items-end justify-between px-1 border-b border-white/10">
              {[
                { h: '35%', label: '10AM' },
                { h: '55%', label: '11AM' },
                { h: '80%', label: '12PM' },
                { h: '45%', label: '01PM' },
                { h: '70%', label: '02PM' },
                { h: '30%', label: '03PM' },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-3 rounded-t-md bg-gradient-to-t from-sky-600 to-sky-400 transition-all"
                    style={{ height: bar.h }}
                  />
                  <span className="text-[9px] text-slate-400">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weather Status / Risk Indicator */}
      <section
        id="riskCard"
        className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
          persona.statusType === 'good'
            ? 'bg-emerald-950/25 border-emerald-500/30 text-emerald-300'
            : 'bg-red-950/25 border-red-500/30 text-red-300'
        }`}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
            persona.statusType === 'good' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}
        >
          {persona.statusType === 'good' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-75">{t('WEATHER STATUS', language)}</span>
          <h4 className="text-sm font-bold text-white mt-0.5">{t(persona.status, language)}</h4>
          <p className="text-xs text-slate-300 mt-0.5">{t(persona.message, language)}</p>
        </div>
      </section>

      {/* Global Map & World Watch */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Global Map Panel */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#18181e] border border-white/10 relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GLOBAL MAP</span>
              <h3 className="text-base font-bold text-white mt-0.5">Weather around the world</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('nearby')}
              className="text-xs text-sky-400 hover:text-white flex items-center gap-1 bg-[#202026] px-3 py-1.5 rounded-xl border border-white/5 transition-colors"
            >
              <span>View wide</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Styled World Map Canvas */}
          <div
            className={`relative w-full h-64 rounded-xl overflow-hidden bg-[#1a1c22] border border-white/5 transition-all ${
              mapZoomed ? 'scale-105 shadow-2xl' : ''
            }`}
          >
            {/* Ambient Map Grids & Continents representation */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Pins */}
            <div className="absolute top-[28%] left-[28%] w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-amber-400 shadow-md">
              ☀
            </div>
            <div className="absolute top-[35%] left-[54%] w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-sky-300 shadow-md">
              ☁
            </div>
            <div className="absolute top-[58%] left-[68%] w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-amber-400 shadow-md">
              ☀
            </div>

            {/* Current City Highlight */}
            <div className="absolute top-[48%] left-[64%] flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
              </span>
              <span className="text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                Hyderabad
              </span>
            </div>

            {/* Map Zoom Controls */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
              <button
                type="button"
                onClick={() => setMapZoomed(true)}
                className="w-8 h-8 rounded-lg bg-[#25252c] text-white hover:bg-sky-500 flex items-center justify-center shadow-lg transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setMapZoomed(false)}
                className="w-8 h-8 rounded-lg bg-[#25252c] text-white hover:bg-sky-500 flex items-center justify-center shadow-lg transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Map Callout Banner */}
            <div className="absolute bottom-3 left-3 bg-white/95 text-slate-900 p-3 rounded-xl max-w-[210px] shadow-lg">
              <h5 className="text-xs font-bold">Explore the global map</h5>
              <p className="text-[10px] text-slate-600 mt-0.5">Wind, weather and ocean conditions.</p>
              <button
                type="button"
                onClick={() => onNavigate('nearby')}
                className="mt-2 w-full py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold hover:bg-purple-700 transition-colors"
              >
                Get started
              </button>
            </div>
          </div>
        </div>

        {/* World Watch */}
        <div className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OTHER LARGE CITIES</span>
                <h3 className="text-base font-bold text-white mt-0.5">World watch</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('saved')}
                className="text-xs text-sky-400 hover:text-white flex items-center gap-0.5 transition-colors"
              >
                <span>Show all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { country: 'India', city: 'Hyderabad', condition: 'Mostly sunny', icon: '🌤', temp: 28 },
                { country: 'United Kingdom', city: 'London', condition: 'Cloudy', icon: '☁', temp: 18 },
                { country: 'Australia', city: 'Melbourne', condition: 'Sunny', icon: '☀', temp: 22 },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-[#202026] rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400">{c.country}</span>
                    <h5 className="text-xs font-bold text-white mt-0.5">{c.city}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{c.condition}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg">{c.icon}</span>
                    <strong className="text-base font-bold text-white block mt-0.5">{displayTemp(c.temp)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personalized for You section */}
      <section className="p-6 rounded-2xl bg-[#18181e] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {persona.image ? (
              <div className="w-14 h-14 rounded-2xl bg-white/95 p-2 flex items-center justify-center border border-white/20 shadow-md shrink-0">
                <img
                  src={persona.image}
                  alt={persona.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-[#202026] text-sky-400 text-2xl flex items-center justify-center font-bold border border-white/5 shrink-0">
                {persona.iconName}
              </div>
            )}
            <div>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                {t('PERSONALIZED FOR YOU', language)}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{t(persona.name, language)}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{t(persona.subtitle, language)}</p>
            </div>
          </div>
          <button
            type="button"
            id="changeUserTypeBtn"
            onClick={() => onNavigate('personalize')}
            className="px-3.5 py-2 rounded-xl bg-[#202026] hover:bg-[#282830] border border-white/10 text-xs font-semibold text-sky-300 hover:text-white transition-colors self-start sm:self-auto"
          >
            {t('Change user type', language)}
          </button>
        </div>

        {/* 4 Persona Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {persona.cards.map((card, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#202026] border border-white/5 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t(card[0], language)}
              </span>
              <strong className="text-2xl font-black text-white block tracking-tight">{card[1]}</strong>
              <p className="text-[11px] text-slate-400 leading-snug">{t(card[2], language)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
