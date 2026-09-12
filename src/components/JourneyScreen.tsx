import React, { useState, useEffect } from 'react';
import { Compass, Car, Bus, Bike, Footprints, AlertTriangle, MapPin, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { t } from '../translations';

interface JourneyScreenProps {
  language: Language;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({ language }) => {
  const [startLocation, setStartLocation] = useState('Hyderabad');
  const [destination, setDestination] = useState('Shadnagar');
  const [transport, setTransport] = useState<'car' | 'bus' | 'bike' | 'bicycle' | 'walking'>('car');

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isJourneyActive, setIsJourneyActive] = useState(false);

  // GPS tracking state
  const [gpsStatus, setGpsStatus] = useState<string>('GPS ready');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [currentSpeed, setCurrentSpeed] = useState<string>('--');

  useEffect(() => {
    let watchId: number | null = null;
    if (isJourneyActive && typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      setGpsStatus('GPS active');
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          if (pos.coords.speed !== null && pos.coords.speed > 0) {
            setCurrentSpeed(`${Math.round(pos.coords.speed * 3.6)} km/h`);
          } else {
            setCurrentSpeed('38 km/h'); // Simulated speed
          }
        },
        () => {
          setGpsStatus('GPS permission needed');
          // Simulated fallback location
          setCoords({ lat: 17.385, lng: 78.4867 });
          setCurrentSpeed('42 km/h');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
    return () => {
      if (watchId !== null && typeof navigator !== 'undefined') {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isJourneyActive]);

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startLocation.trim() || !destination.trim()) {
      alert(t('Please enter both your start location and destination.', language));
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmAndBegin = () => {
    setShowConfirmModal(false);
    setIsJourneyActive(true);
  };

  const getTravelModeParam = () => {
    switch (transport) {
      case 'car':
        return 'driving';
      case 'bus':
        return 'transit';
      case 'bike':
      case 'bicycle':
        return 'bicycling';
      case 'walking':
        return 'walking';
      default:
        return 'driving';
    }
  };

  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    startLocation
  )}&destination=${encodeURIComponent(destination)}&travelmode=${getTravelModeParam()}`;

  const googleMapsCurrentUrl = coords
    ? `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(startLocation)}`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Heading */}
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('PLAN YOUR JOURNEY', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Weather-aware travel', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Check weather conditions along your route before you start travelling.', language)}
        </p>
      </section>

      {/* Input Route Form Card */}
      <section className="p-6 rounded-2xl bg-[#18181e] border border-white/10 shadow-xl space-y-5">
        <form onSubmit={handleStartJourney} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="journeyStart">
                {t('Start location', language)}
              </label>
              <input
                id="journeyStart"
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder={t('Enter starting place', language)}
                required
                className="w-full bg-[#202026] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
              />
            </div>

            <div className="hidden md:flex justify-center pt-6 text-slate-500 font-bold text-lg">→</div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="journeyDestination">
                {t('Destination', language)}
              </label>
              <input
                id="journeyDestination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t('Enter destination', language)}
                required
                className="w-full bg-[#202026] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
              />
            </div>
          </div>

          {/* Transport mode selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {t('Mode of transport', language)}
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'car', label: t('Car', language), icon: <Car className="w-4 h-4" /> },
                { id: 'bus', label: t('Bus', language), icon: <Bus className="w-4 h-4" /> },
                { id: 'bike', label: t('Bike', language), icon: <Bike className="w-4 h-4" /> },
                { id: 'bicycle', label: t('Bicycle', language), icon: <Bike className="w-4 h-4" /> },
                { id: 'walking', label: t('On foot', language), icon: <Footprints className="w-4 h-4" /> },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  id={`transport-${m.id}`}
                  onClick={() => setTransport(m.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    transport === m.id
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm'
                      : 'bg-[#202026] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            id="startJourneyBtn"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>{t('Start Journey', language)}</span>
          </button>
        </form>
      </section>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#18181e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100">
            <div>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">CONFIRM LOCATIONS</span>
              <h3 className="text-xl font-bold text-white mt-1">Is this your route?</h3>
              <p className="text-xs text-slate-400 mt-0.5">Confirm these locations before tracking your journey.</p>
            </div>

            <div className="space-y-2 bg-[#202026] p-3.5 rounded-xl border border-white/5">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">START</span>
                <p className="text-sm font-semibold text-white">{startLocation}</p>
              </div>
              <div className="border-t border-white/5 pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase">DESTINATION</span>
                <p className="text-sm font-semibold text-white">{destination}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                id="cancelConfirmJourneyBtn"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-[#202026] hover:bg-[#282830] text-slate-300 text-xs font-semibold rounded-xl"
              >
                Edit locations
              </button>
              <button
                type="button"
                id="confirmAndStartJourneyBtn"
                onClick={confirmAndBegin}
                className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl"
              >
                Confirm and start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Journey Results (Visible after Start Journey) */}
      {isJourneyActive && (
        <section id="journeyResultSection" className="space-y-5 animate-in fade-in duration-300">
          {/* Journey Summary Bar */}
          <div className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">YOUR JOURNEY</span>
              <h2 className="text-xl font-black text-white mt-0.5">
                {startLocation} → {destination}
              </h2>
              <p className="text-xs text-slate-400 capitalize">{transport} journey</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {gpsStatus}
              </span>
              <button
                type="button"
                onClick={() => setIsJourneyActive(false)}
                className="text-xs bg-[#202026] hover:bg-[#282830] text-slate-300 px-3 py-1.5 rounded-xl border border-white/5 transition-colors"
              >
                Edit locations
              </button>
            </div>
          </div>

          {/* Interactive Map Visualizer & Google Maps Links */}
          <div className="p-5 rounded-2xl bg-[#18181e] border border-white/10 space-y-3">
            <div className="relative h-64 rounded-xl overflow-hidden bg-[#1a1c22] border border-white/5 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Route line */}
              <div className="absolute w-[60%] h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-red-400 rotate-[-12deg] rounded-full shadow-lg shadow-sky-500/30" />

              {/* Start Pin A */}
              <div className="absolute top-[60%] left-[18%] flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-lg">
                  A
                </div>
                <span className="text-[10px] font-bold text-white bg-black/70 px-2 py-0.5 rounded mt-1">Start</span>
              </div>

              {/* Destination Pin B */}
              <div className="absolute top-[35%] right-[18%] flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white font-black text-xs flex items-center justify-center shadow-lg">
                  B
                </div>
                <span className="text-[10px] font-bold text-white bg-black/70 px-2 py-0.5 rounded mt-1">Destination</span>
              </div>

              {/* Live Location Marker */}
              <div className="absolute top-[50%] left-[45%] flex items-center gap-1.5 bg-sky-950/90 border border-sky-400/40 text-sky-200 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                <Navigation className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                <span>On Route</span>
              </div>
            </div>

            {/* External Google Maps Route button */}
            <div className="flex justify-end">
              <a
                href={googleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold bg-[#202026] hover:bg-[#252530] px-4 py-2 rounded-xl border border-white/10 transition-colors"
              >
                <span>Open route in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Metric Grid: Distance, Time, Expected Speed, Current Speed */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-[#18181e] border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DISTANCE</span>
              <strong className="text-2xl font-black text-white mt-1 block">45 km</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#18181e] border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EXPECTED TIME</span>
              <strong className="text-2xl font-black text-white mt-1 block">1 hr</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#18181e] border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EXPECTED SPEED</span>
              <strong className="text-2xl font-black text-white mt-1 block">40 km/h</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#18181e] border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CURRENT SPEED</span>
              <strong className="text-2xl font-black text-sky-400 mt-1 block">{currentSpeed}</strong>
            </div>
          </div>

          {/* ETA Card */}
          <div className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ESTIMATED ARRIVAL</span>
              <h2 className="text-3xl font-black text-white mt-1">5:45 PM</h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GPS LIVE COORDINATES</span>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : '17.3850, 78.4867'}
              </p>
              <a
                href={googleMapsCurrentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:underline mt-1"
              >
                <span>View current location in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Route Weather Timeline */}
          <div className="p-5 rounded-2xl bg-[#18181e] border border-white/10 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WEATHER ALONG ROUTE</span>
            <h3 className="text-base font-bold text-white">Journey weather timeline</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border-l-4 border-emerald-500 text-emerald-300">
                <span className="text-xs text-slate-400 block">4:45 PM</span>
                <strong className="text-sm font-bold text-white block mt-0.5">Partly Cloudy</strong>
                <p className="text-xs text-emerald-400 mt-1">Good conditions</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border-l-4 border-emerald-500 text-emerald-300">
                <span className="text-xs text-slate-400 block">5:00 PM</span>
                <strong className="text-sm font-bold text-white block mt-0.5">Partly Cloudy</strong>
                <p className="text-xs text-emerald-400 mt-1">Good conditions</p>
              </div>

              <div className="p-3.5 rounded-xl bg-red-950/20 border-l-4 border-red-500 text-red-300">
                <span className="text-xs text-slate-400 block">6:00 PM</span>
                <strong className="text-sm font-bold text-white block mt-0.5">Rain expected</strong>
                <p className="text-xs text-red-400 mt-1">Take precautions</p>
              </div>
            </div>
          </div>

          {/* Sudden Rain Warning */}
          <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 flex items-start gap-3 text-red-300">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">WEATHER ALERT</span>
              <h4 className="text-sm font-bold text-white mt-0.5">Rain may affect your journey</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                If rain starts while you are travelling, Mausam can suggest nearby places to stop and wait safely.
              </p>
            </div>
          </div>

          {/* Nearby Safe Places to Stop */}
          <div className="p-5 rounded-2xl bg-[#18181e] border border-white/10 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NEARBY SAFE PLACES</span>
            <h3 className="text-base font-bold text-white">Places to stop and wait safely</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              {[
                { title: 'Hotel', desc: 'Nearby hotel', dist: '0.8 km' },
                { title: 'Bus Shelter', desc: 'Covered waiting area', dist: '1.1 km' },
                { title: 'Waiting Hall', desc: 'Safe waiting location', dist: '1.4 km' },
                { title: 'Park', desc: 'Nearby public place', dist: '1.7 km' },
              ].map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#202026] border border-white/5 space-y-1">
                  <strong className="text-sm font-bold text-white block">{s.title}</strong>
                  <p className="text-xs text-slate-400">{s.desc}</p>
                  <span className="text-xs font-bold text-sky-400 block pt-1">{s.dist}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
