import React, { useState } from 'react';
import { ShieldCheck, Check, KeyRound, Eye, EyeOff, Save } from 'lucide-react';
import { Language, Theme, TemperatureUnit } from '../types';
import { t } from '../translations';

interface SettingsScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  temperatureUnit: TemperatureUnit;
  onTemperatureUnitChange: (unit: TemperatureUnit) => void;
  notificationsEnabled: boolean;
  onNotificationsToggle: (enabled: boolean) => void;
  userEmail: string;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  temperatureUnit,
  onTemperatureUnitChange,
  notificationsEnabled,
  onNotificationsToggle,
  userEmail,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (newPassword || confirmPassword) {
      if (newPassword.length < 8) {
        setPasswordFeedback(t('Password must contain at least 8 characters.', language));
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordFeedback(t('Passwords do not match.', language));
        return;
      }

      // Save verified password to registered users
      const storedUsersRaw = localStorage.getItem('mausamRegisteredUsers');
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : {};
      storedUsers[userEmail.toLowerCase()] = newPassword;
      localStorage.setItem('mausamRegisteredUsers', JSON.stringify(storedUsers));

      setPasswordFeedback('Password changed & verified successfully for your account.');
      setNewPassword('');
      setConfirmPassword('');
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Heading */}
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('SETTINGS', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Preferences', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Manage your Mausam language and application preferences.', language)}
        </p>
      </section>

      {/* Settings Card */}
      <form onSubmit={handleSaveSettings} className="p-6 md:p-8 rounded-2xl bg-[#18181e] border border-white/10 shadow-xl space-y-6">
        {saveSuccess && (
          <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('Settings saved successfully.', language)}</span>
          </div>
        )}

        {/* Language Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/5">
          <div>
            <h3 className="text-sm font-bold text-white">{t('Language', language)}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{t('Choose the language used throughout Mausam.', language)}</p>
          </div>
          <select
            id="settingsLanguageSelect"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="w-44 bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="en">{t('English', language)}</option>
            <option value="te">{t('Telugu', language)}</option>
            <option value="hi">{t('Hindi', language)}</option>
          </select>
        </div>

        {/* Theme Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/5">
          <div>
            <h3 className="text-sm font-bold text-white">{t('Theme', language)}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Choose between dark and light appearance.</p>
          </div>
          <select
            id="settingsThemeSelect"
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as Theme)}
            className="w-44 bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="dark">{t('Dark', language)}</option>
            <option value="light">{t('Light', language)}</option>
          </select>
        </div>

        {/* Temperature Unit Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/5">
          <div>
            <h3 className="text-sm font-bold text-white">{t('Temperature Unit', language)}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{t('Choose how temperature is displayed.', language)}</p>
          </div>
          <select
            id="settingsTempSelect"
            value={temperatureUnit}
            onChange={(e) => onTemperatureUnitChange(e.target.value as TemperatureUnit)}
            className="w-44 bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="celsius">{t('Celsius (°C)', language)}</option>
            <option value="fahrenheit">{t('Fahrenheit (°F)', language)}</option>
          </select>
        </div>

        {/* Notifications Toggle Row */}
        <div className="flex items-center justify-between gap-3 pb-6 border-b border-white/5">
          <div>
            <h3 className="text-sm font-bold text-white">{t('Notifications', language)}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{t('Receive weather, journey and risk updates.', language)}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="settingsNotificationsToggle"
              checked={notificationsEnabled}
              onChange={(e) => onNotificationsToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#202026] border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500" />
          </label>
        </div>

        {/* Change Password / Password Verification Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-sm font-bold text-white">{t('Change Password', language)}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('Create a new password for your Mausam account.', language)}
              </p>
            </div>
          </div>

          <div className="space-y-3 bg-[#202026] p-4 rounded-xl border border-white/5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="settingsNewPassword">
                {t('Enter New Password', language)}
              </label>
              <div className="relative">
                <input
                  id="settingsNewPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t('Enter new password', language)}
                  minLength={8}
                  className="w-full bg-[#18181e] border border-white/10 rounded-xl pl-3 pr-10 py-2 text-sm text-white outline-none focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="settingsConfirmPassword">
                {t('Re-enter New Password', language)}
              </label>
              <div className="relative">
                <input
                  id="settingsConfirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('Re-enter new password', language)}
                  minLength={8}
                  className="w-full bg-[#18181e] border border-white/10 rounded-xl pl-3 pr-10 py-2 text-sm text-white outline-none focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {passwordFeedback && (
              <p
                className={`text-xs flex items-center gap-1.5 ${
                  passwordFeedback.includes('successfully') ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{passwordFeedback}</span>
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="saveSettingsBtn"
          className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{t('Save Settings', language)}</span>
        </button>
      </form>
    </div>
  );
};
