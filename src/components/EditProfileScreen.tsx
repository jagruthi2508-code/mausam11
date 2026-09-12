import React, { useState } from 'react';
import { User, Camera, Check, Save } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { t } from '../translations';

interface EditProfileScreenProps {
  language: Language;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onBack: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  language,
  userProfile,
  onUpdateProfile,
  onBack,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatarUrl: avatarUrl || undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onBack();
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('ACCOUNT', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Edit Profile', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Manage your Mausam profile information.', language)}
        </p>
      </section>

      <form onSubmit={handleSave} className="p-6 md:p-8 rounded-2xl bg-[#18181e] border border-white/10 shadow-xl space-y-5">
        {savedSuccess && (
          <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('Profile updated successfully.', language)}</span>
          </div>
        )}

        {/* Profile Photo Section */}
        <div className="flex items-center gap-4 pb-5 border-b border-white/5">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-sky-600 to-blue-600 text-white text-2xl font-black flex items-center justify-center overflow-hidden border-2 border-sky-400/30">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              name.charAt(0).toUpperCase() || 'U'
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">{t('Profile photo', language)}</h4>
            <p className="text-xs text-slate-400 mt-0.5 mb-2">
              {t('Add a photo to personalize your profile.', language)}
            </p>
            <label
              htmlFor="photoUploadInput"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202026] hover:bg-[#282830] text-xs font-semibold text-sky-300 hover:text-white border border-white/10 cursor-pointer transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t('Choose Photo', language)}</span>
            </label>
            <input
              id="photoUploadInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="profileFullName">
            {t('Full name', language)}
          </label>
          <input
            id="profileFullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Enter your full name', language)}
            required
            className="w-full bg-[#202026] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-sky-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="profileEmail">
            {t('Email address', language)}
          </label>
          <input
            id="profileEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Enter your email address', language)}
            required
            className="w-full bg-[#202026] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-sky-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="profilePhone">
            {t('Phone number', language)}
          </label>
          <input
            id="profilePhone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('Enter your phone number', language)}
            className="w-full bg-[#202026] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 bg-[#202026] hover:bg-[#282830] text-slate-300 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="saveProfileBtn"
            className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20"
          >
            <Save className="w-4 h-4" />
            <span>{t('Save Changes', language)}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
