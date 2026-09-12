import React, { useState } from 'react';
import { KeyRound, Eye, EyeOff, ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { t } from '../translations';

interface ChangePasswordScreenProps {
  language: Language;
  userEmail: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  language,
  userEmail,
  onSuccess,
  onBack,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword.length < 8) {
      setErrorMsg(t('Password must contain at least 8 characters.', language));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(t('Passwords do not match.', language));
      return;
    }

    // Save verified password
    const storedUsersRaw = localStorage.getItem('mausamRegisteredUsers');
    const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : {};
    storedUsers[userEmail.toLowerCase()] = newPassword;
    localStorage.setItem('mausamRegisteredUsers', JSON.stringify(storedUsers));

    setSuccessMsg(t('Password changed successfully.', language));
    setTimeout(() => {
      onSuccess();
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <section>
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase">
          {t('SECURITY', language)}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">{t('Change Password', language)}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('Create a new password to keep your Mausam account secure.', language)}
        </p>
      </section>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-[#18181e] border border-white/10 shadow-xl space-y-5">
        <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-xs text-sky-300 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-white">Password Security Verification</strong>
            <span>Use a unique password with at least 8 characters including letters and numbers.</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="cpNewPassword">
            {t('New Password', language)}
          </label>
          <div className="relative">
            <input
              id="cpNewPassword"
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t('Enter new password', language)}
              required
              minLength={8}
              className="w-full bg-[#202026] border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-sm text-white outline-none focus:border-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{t('Use at least 8 characters.', language)}</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="cpConfirmPassword">
            {t('Re-enter New Password', language)}
          </label>
          <div className="relative">
            <input
              id="cpConfirmPassword"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('Re-enter new password', language)}
              required
              minLength={8}
              className="w-full bg-[#202026] border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-sm text-white outline-none focus:border-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {confirmPassword.length > 0 && (
            <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${newPassword === confirmPassword ? 'text-emerald-400' : 'text-red-400'}`}>
              {newPassword === confirmPassword ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Passwords match.
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" /> Passwords do not match yet.
                </>
              )}
            </p>
          )}
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
            id="changePasswordSubmitBtn"
            className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl shadow-md shadow-sky-500/20"
          >
            {t('Change Password', language)}
          </button>
        </div>
      </form>
    </div>
  );
};
