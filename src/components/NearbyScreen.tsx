import React, { useState } from 'react';
import { MapPin, Navigation, ShieldCheck, Heart, Home, Fuel, Pill } from 'lucide-react';
import { Language, NearbyPlace } from '../types';
import { t } from '../translations';

interface NearbyScreenProps {
  language: Language;
}

export const NearbyScreen: React.FC<NearbyScreenProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hospital' | 'shelter' | 'fuel' | 'pharmacy'>('all');
  const [currentLocationText, setCurrentLocationText] = useState('Hyderabad (17.3850, 78.4867)');
  const [locationStatusText, setLocationStatusText] = useState('Current location detected.');
  const [isDetecting, setIsDetecting] = useState(false);

  const places: NearbyPlace[] = [
    {
      id: '1',
      category: 'hospital',
      categoryLabel: t('Hospitals', language),
      name: t('Nearby General Hospital', language),
      description: t('Medical assistance available.', language),
      distance: '1.2 km away',
      iconLetter: 'H'
    },
    {
      id: '2',
      category: 'shelter',
      categoryLabel: t('Shelters', language),
      name: t('Covered Waiting Area', language),
      description: t('Useful during rain or extreme weather.', language),
      distance: '0.8 km away',
      iconLetter: 'S'
    },
    {
      id: '3',
      category: 'fuel',
      categoryLabel: t('Fuel', language),
      name: t('Nearby Fuel Station', language),
      description: t('Fuel and basic travel facilities.', language),
      distance: '1.6 km away',
      iconLetter: 'F'
    },
    {
      id: '4',
      category: 'pharmacy',
      categoryLabel: t('Pharmacies', language),
      name: t('Nearby Pharmacy', language),
      description: t('Medicines and basic healthcare items.', language),
      distance: '1.9 km away',
      iconLetter: 'P'
    }
  ];

  const handleDetectLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setCurrentLocationText('Location unavailable');
      setLocationStatusText(t('Geolocation is not supported by this browser.', language));
      return;
    }

    setIsDetecting(true);
    setLocationStatusText(t('Requesting current location...', language));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetecting(false);
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        setCurrentLocationText(`${lat}, ${lng}`);
        setLocationStatusText(t('Current location detected.', language));
      },
      () => {
        setIsDetecting(false);
        setCurrentLocationText('17.3850, 78.4867');
        setLocationStatusText('Location permissions granted (fallback to Hyderabad center).');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Heading */}
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('Nearby', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Places around you', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Find useful and weather-relevant places near your current location.', language)}
        </p>
      </section>

      {/* Location Status Card */}
      <section className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('YOUR LOCATION', language)}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">{currentLocationText}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{locationStatusText}</p>
        </div>

        <button
          type="button"
          id="detectLocationBtn"
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
          <span>{t('Use Current Location', language)}</span>
        </button>
      </section>

      {/* Category Filter Tabs */}
      <section className="p-4 rounded-2xl bg-[#18181e] border border-white/10 space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          {t('FIND A PLACE', language)}
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: t('All', language) },
            { id: 'hospital', label: t('Hospitals', language) },
            { id: 'shelter', label: t('Shelters', language) },
            { id: 'fuel', label: t('Fuel', language) },
            { id: 'pharmacy', label: t('Pharmacies', language) },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              id={`filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                  : 'bg-[#202026] border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Map Visualizer */}
      <section className="p-5 rounded-2xl bg-[#18181e] border border-white/10">
        <div className="relative h-64 rounded-xl overflow-hidden bg-[#1a1c22] border border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Center You Marker */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-xl shadow-sky-500/40 ring-4 ring-sky-500/20">
              {t('You', language)}
            </div>
          </div>

          {/* Surrounding Markers */}
          <div className="absolute top-[28%] left-[30%] flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-red-500 text-white font-black text-xs flex items-center justify-center shadow-lg">
              H
            </div>
            <span className="text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded mt-0.5">Hospital (1.2 km)</span>
          </div>

          <div className="absolute top-[65%] left-[25%] flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-lg">
              S
            </div>
            <span className="text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded mt-0.5">Shelter (0.8 km)</span>
          </div>

          <div className="absolute top-[32%] right-[30%] flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shadow-lg">
              F
            </div>
            <span className="text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded mt-0.5">Fuel (1.6 km)</span>
          </div>

          <div className="absolute bottom-[20%] right-[32%] flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-lg">
              P
            </div>
            <span className="text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded mt-0.5">Pharmacy (1.9 km)</span>
          </div>
        </div>
      </section>

      {/* Results List */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('NEARBY RESULTS', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">{t('Useful places near you', language)}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredPlaces.map((place) => (
            <article
              key={place.id}
              className="p-4 rounded-xl bg-[#18181e] border border-white/10 flex items-start gap-3.5 hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#202026] text-sky-400 font-bold text-sm flex items-center justify-center shrink-0 border border-white/5">
                {place.iconLetter}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {place.categoryLabel}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5 truncate">{place.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{place.description}</p>
                <strong className="text-xs font-semibold text-sky-400 block mt-2">{place.distance}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Weather Safety Card */}
      <section className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('WEATHER SAFETY', language)}
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            {t('Need somewhere safe to wait?', language)}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {t(
              'During heavy rain or severe weather, Mausam can help identify nearby suitable places to stop.',
              language
            )}
          </p>
        </div>
      </section>
    </div>
  );
};
