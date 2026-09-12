import React from 'react';
import { Calendar, Droplets, Wind, Sun, AlertCircle, Sparkles, CloudRain, ShieldAlert } from 'lucide-react';
import { Language, TemperatureUnit } from '../types';
import { t } from '../translations';

interface ForecastScreenProps {
  language: Language;
  temperatureUnit: TemperatureUnit;
}

export const ForecastScreen: React.FC<ForecastScreenProps> = ({
  language,
  temperatureUnit,
}) => {
  const formatTemp = (celsius: number) => {
    if (temperatureUnit === 'fahrenheit') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Heading */}
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('WEATHER FORECAST', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Plan ahead with confidence', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('View upcoming weather conditions and understand how they may affect your plans.', language)}
        </p>
      </section>

      {/* Forecast Location Card */}
      <section className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('FORECAST LOCATION', language)}
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5">Hyderabad</h2>
          <p className="text-xs text-slate-400 mt-0.5">{t('Saturday, September 5, 2026', language)}</p>
        </div>
        <div className="p-3 rounded-xl bg-[#202026] text-sky-400">
          <Calendar className="w-6 h-6" />
        </div>
      </section>

      {/* Current Conditions Card */}
      <section className="p-6 rounded-2xl bg-[#18181e] border border-white/10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('CURRENT CONDITIONS', language)}
          </span>
          <h2 className="text-5xl font-black text-white my-1">{formatTemp(28)}</h2>
          <h3 className="text-base font-bold text-sky-200">{t('Partly Cloudy', language)}</h3>
          <p className="text-xs text-slate-400">{t('Feels like 30°C', language)}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 bg-[#202026] p-4 rounded-xl border border-white/5">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase block">{t('Humidity', language)}</span>
            <strong className="text-base font-bold text-white block mt-1">72%</strong>
          </div>
          <div className="text-center border-x border-white/10 px-4">
            <span className="text-[10px] text-slate-400 uppercase block">{t('Wind', language)}</span>
            <strong className="text-base font-bold text-white block mt-1">14 km/h</strong>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase block">{t('Rain', language)}</span>
            <strong className="text-base font-bold text-white block mt-1">20%</strong>
          </div>
        </div>
      </section>

      {/* Hourly Forecast */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('HOURLY FORECAST', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">{t('Next few hours', language)}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {[
            { hour: '5 PM', temp: 28, condition: 'Cloudy', rain: '20% rain' },
            { hour: '6 PM', temp: 27, condition: 'Rain', rain: '60% rain' },
            { hour: '7 PM', temp: 26, condition: 'Rain', rain: '70% rain' },
            { hour: '8 PM', temp: 25, condition: 'Cloudy', rain: '40% rain' },
            { hour: '9 PM', temp: 24, condition: 'Cloudy', rain: '30% rain' },
            { hour: '10 PM', temp: 24, condition: 'Clear', rain: '10% rain' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#18181e] border border-white/10 text-center space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">{item.hour}</span>
              <strong className="text-xl font-black text-white block">{formatTemp(item.temp)}</strong>
              <p className="text-xs text-slate-300">{item.condition}</p>
              <span className="text-[10px] font-bold text-sky-400 block pt-1">{item.rain}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7-Day Forecast */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('7-DAY FORECAST', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">{t('This week', language)}</h2>
        </div>

        <div className="space-y-2">
          {[
            { day: 'Sat', label: 'Today', max: 28, min: 22, rain: '40%' },
            { day: 'Sun', label: 'Sep 6', max: 29, min: 22, rain: '30%' },
            { day: 'Mon', label: 'Sep 7', max: 27, min: 21, rain: '60%' },
            { day: 'Tue', label: 'Sep 8', max: 26, min: 21, rain: '70%' },
            { day: 'Wed', label: 'Sep 9', max: 28, min: 22, rain: '40%' },
            { day: 'Thu', label: 'Sep 10', max: 29, min: 22, rain: '20%' },
            { day: 'Fri', label: 'Sep 11', max: 30, min: 23, rain: '10%' },
          ].map((dayItem, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#18181e] border border-white/10 flex items-center justify-between"
            >
              <div className="w-24">
                <span className="text-xs font-bold text-white block">{dayItem.day}</span>
                <span className="text-[11px] text-slate-400 block">{dayItem.label}</span>
              </div>

              <div className="flex items-center gap-4">
                <strong className="text-sm font-bold text-white">{formatTemp(dayItem.max)}</strong>
                <span className="text-xs text-slate-400">{formatTemp(dayItem.min)}</span>
              </div>

              <div className="w-16 text-right">
                <span className="text-xs font-bold text-sky-400">{dayItem.rain}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weather Factors Grid */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('WEATHER FACTORS', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">{t('What to keep in mind', language)}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#18181e] border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">HUMIDITY</span>
            <strong className="text-2xl font-black text-white block">72%</strong>
            <p className="text-xs text-slate-400">Moderately humid conditions.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#18181e] border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">WIND</span>
            <strong className="text-2xl font-black text-white block">14 km/h</strong>
            <p className="text-xs text-slate-400">Light breeze expected.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#18181e] border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">UV INDEX</span>
            <strong className="text-2xl font-black text-white block">6</strong>
            <p className="text-xs text-slate-400">Protection recommended during midday.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#18181e] border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AIR QUALITY</span>
            <strong className="text-2xl font-black text-white block">Moderate</strong>
            <p className="text-xs text-slate-400">Sensitive individuals should limit exposure.</p>
          </div>
        </div>
      </section>

      {/* Mausam Insight Card */}
      <section className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-4 text-amber-200">
        <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            {t('MAUSAM INSIGHT', language)}
          </span>
          <h3 className="text-sm font-bold text-white mt-0.5">
            {t('Rain is more likely during the evening.', language)}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {t(
              'Consider planning outdoor activities earlier and keep rain protection available.',
              language
            )}
          </p>
        </div>
      </section>
    </div>
  );
};
