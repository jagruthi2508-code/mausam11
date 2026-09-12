import React, { useState } from 'react';
import { Bookmark, Plus, Trash2, MapPin, Sparkles } from 'lucide-react';
import { Language, SavedPlace } from '../types';
import { t } from '../translations';

interface SavedPlacesScreenProps {
  language: Language;
}

export const SavedPlacesScreen: React.FC<SavedPlacesScreenProps> = ({ language }) => {
  const [places, setPlaces] = useState<SavedPlace[]>([
    { id: '1', name: 'Home', location: 'Hyderabad', tag: 'HOME', distance: '2.4 km' },
    { id: '2', name: 'Work', location: 'Hyderabad', tag: 'WORK', distance: '5.8 km' },
    { id: '3', name: 'College', location: 'Hyderabad', tag: 'COLLEGE', distance: '7.1 km' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('Hyderabad');
  const [newTag, setNewTag] = useState('FAVORITE');

  const handleRemove = (id: string) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newPlace: SavedPlace = {
      id: Date.now().toString(),
      name: newName.trim(),
      location: newCity.trim(),
      tag: newTag.toUpperCase(),
      distance: `${(Math.random() * 8 + 1).toFixed(1)} km`,
    };

    setPlaces((prev) => [newPlace, ...prev]);
    setNewName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Heading */}
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('SAVED PLACES', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Your places', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Save locations you frequently visit for quick access to weather information.', language)}
        </p>
      </section>

      {/* Add Place Card */}
      <section className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('NEW SAVED PLACE', language)}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">{t('Add a location', language)}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('Save a place to quickly check its weather and conditions later.', language)}
          </p>
        </div>

        <button
          type="button"
          id="addPlaceBtn"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('Add Place', language)}</span>
        </button>
      </section>

      {/* Saved Place List or Empty State */}
      <section className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('YOUR LOCATIONS', language)}
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">{t('Saved places', language)}</h2>
        </div>

        {places.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[#18181e] border border-dashed border-white/15 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto text-xl font-bold">
              +
            </div>
            <h3 className="text-base font-bold text-white">{t('No saved places', language)}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Add locations that matter to you for faster weather access.
            </p>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl"
            >
              {t('Add your first place', language)}
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {places.map((place) => (
              <article
                key={place.id}
                className="p-4 rounded-xl bg-[#18181e] border border-white/10 flex items-center justify-between gap-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#202026] text-sky-400 font-bold flex items-center justify-center shrink-0 border border-white/5">
                    {place.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      {place.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{place.name}</h4>
                    <p className="text-xs text-slate-400">{place.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <strong className="text-xs font-semibold text-sky-400">{place.distance}</strong>
                  <button
                    type="button"
                    onClick={() => handleRemove(place.id)}
                    className="p-2 bg-[#202026] hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                    title="Remove place"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Information Benefit Card */}
      <section className="p-5 rounded-2xl bg-[#18181e] border border-white/10 flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('SAVED LOCATION BENEFIT', language)}
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            {t('Get weather information faster', language)}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {t(
              'Saved places can later be connected to live weather data, maps and personalized alerts.',
              language
            )}
          </p>
        </div>
      </section>

      {/* Add Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#18181e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100">
            <h3 className="text-base font-bold text-white">Add New Location</h3>

            <form onSubmit={handleAddPlace} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Place Label</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Gym, Library, Parents"
                  required
                  className="w-full bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  required
                  className="w-full bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none"
                >
                  <option value="FAVORITE">Favorite</option>
                  <option value="HOME">Home</option>
                  <option value="WORK">Work</option>
                  <option value="COLLEGE">College</option>
                  <option value="FITNESS">Fitness</option>
                  <option value="COMMUTE">Commute</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#202026] hover:bg-[#282830] text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl"
                >
                  Save Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
