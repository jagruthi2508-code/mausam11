import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Bell, User, Edit3, Image as ImageIcon, Key, LogOut, Check } from 'lucide-react';
import { PageId, Language, UserProfile } from '../types';
import { t } from '../translations';
import { startVoiceAssistant, stopVoiceAssistant } from '../voiceAssistant';

interface TopbarProps {
  currentPage: PageId;
  language: Language;
  onNavigate: (page: PageId) => void;
  onLogout: () => void;
  userProfile: UserProfile;
  hasUnreadAlerts: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentPage,
  language,
  onNavigate,
  onLogout,
  userProfile,
  hasUnreadAlerts,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [voiceMessage, setVoiceMessage] = useState<string>('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleToggleVoice = () => {
    if (voiceState === 'listening') {
      stopVoiceAssistant();
      setVoiceState('idle');
      setVoiceMessage('Stopping listening...');
      setTimeout(() => setVoiceMessage(''), 2000);
      return;
    }

    startVoiceAssistant(language, {
      onStart: () => {
        setVoiceState('listening');
        setVoiceMessage(t('Listening...', language));
      },
      onListening: () => {
        setVoiceState('listening');
      },
      onProcessing: () => {
        setVoiceState('processing');
        setVoiceMessage(t('Processing...', language));
      },
      onResult: (spoken, reply) => {
        setVoiceState('speaking');
        setVoiceMessage(`"${spoken}" → ${reply}`);
        setTimeout(() => {
          setVoiceState('idle');
        }, 3500);
      },
      onError: (err) => {
        setVoiceState('idle');
        setVoiceMessage(err);
        setTimeout(() => setVoiceMessage(''), 3000);
      },
      onEnd: () => {
        if (voiceState !== 'speaking') {
          setVoiceState('idle');
        }
      }
    });
  };

  return (
    <header className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
      <div>
        {currentPage === 'dashboard' ? (
          <div>
            <p className="text-xs text-slate-400 font-medium">{t('Good afternoon', language)}</p>
            <h2 className="text-2xl font-bold tracking-tight text-white">{t('Your weather overview', language)}</h2>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">MAUSAM</span>
            <h2 className="text-2xl font-bold tracking-tight text-white capitalize">{t(currentPage, language)}</h2>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Voice Assistant Message Bubble */}
        {voiceMessage && (
          <div
            className={`text-xs px-3 py-1.5 rounded-xl border max-w-xs truncate animate-in fade-in transition-all ${
              voiceState === 'listening'
                ? 'bg-sky-950/80 border-sky-500/30 text-sky-300'
                : voiceState === 'processing'
                ? 'bg-amber-950/80 border-amber-500/30 text-amber-300'
                : voiceState === 'speaking'
                ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
                : 'bg-[#18181e] border-white/10 text-slate-300'
            }`}
          >
            {voiceMessage}
          </div>
        )}

        {/* Voice Assistant Button */}
        <button
          type="button"
          id="voiceAssistantBtn"
          onClick={handleToggleVoice}
          title="Voice assistant"
          className={`relative w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
            voiceState === 'listening'
              ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/50 animate-pulse'
              : voiceState === 'processing'
              ? 'bg-amber-500 text-white border-amber-400 animate-spin'
              : voiceState === 'speaking'
              ? 'bg-emerald-500 text-white border-emerald-400'
              : 'bg-[#18181e] hover:bg-[#202026] text-slate-300 border-white/10'
          }`}
        >
          {voiceState === 'listening' ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Notifications Button */}
        <button
          type="button"
          id="notificationTopBtn"
          onClick={() => onNavigate('alerts')}
          title="Notifications"
          className="relative w-11 h-11 rounded-full bg-[#18181e] hover:bg-[#202026] border border-white/10 text-slate-300 flex items-center justify-center transition-colors"
        >
          <Bell className="w-5 h-5" />
          {hasUnreadAlerts && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#18181e]" />
          )}
        </button>

        {/* Profile Avatar Button & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            id="profileAvatarBtn"
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-600 to-blue-600 text-white font-bold flex items-center justify-center border border-sky-400/30 shadow-md hover:scale-105 transition-transform overflow-hidden"
          >
            {userProfile.avatarUrl ? (
              <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              userProfile.name.charAt(0).toUpperCase() || 'U'
            )}
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-[#18181e] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              {/* Profile Card Header */}
              <div className="flex items-center gap-3 p-3 bg-[#202026] rounded-xl mb-2">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base overflow-hidden">
                  {userProfile.avatarUrl ? (
                    <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    userProfile.name.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{userProfile.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{userProfile.email}</p>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-0.5 text-xs">
                <button
                  type="button"
                  id="menuEditProfile"
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('edit-profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-sky-400" />
                  <span>{t('Edit Profile', language)}</span>
                </button>

                <button
                  type="button"
                  id="menuProfilePhoto"
                  onClick={() => {
                    setProfileOpen(false);
                    setShowPhotoModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-sky-400" />
                  <span>{t('Profile photo', language)}</span>
                </button>

                <button
                  type="button"
                  id="menuChangePassword"
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('change-password');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Key className="w-4 h-4 text-sky-400" />
                  <span>{t('Change Password', language)}</span>
                </button>

                <div className="border-t border-white/5 my-1" />

                <button
                  type="button"
                  id="menuSignOut"
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('Logout', language)}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Photo Upload Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#18181e] border border-white/10 rounded-2xl p-6 shadow-2xl text-slate-100">
            <h3 className="text-base font-bold text-white mb-2">{t('Profile photo', language)}</h3>
            <p className="text-xs text-slate-400 mb-4">{t('Add a photo to personalize your profile.', language)}</p>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-sky-400/40 flex items-center justify-center bg-[#202026] text-sky-400 font-black text-3xl overflow-hidden">
                {userProfile.avatarUrl ? (
                  <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  userProfile.name.charAt(0).toUpperCase()
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onNavigate('edit-profile');
                  setShowPhotoModal(false);
                }}
                className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                {t('Choose Photo', language)}
              </button>
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2.5 bg-[#202026] hover:bg-[#282830] text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
