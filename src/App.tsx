import React, { useState, useEffect } from 'react';
import { PageId, Language, Theme, TemperatureUnit, PersonaId, UserProfile } from './types';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { DashboardScreen } from './components/DashboardScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { ForecastScreen } from './components/ForecastScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { NearbyScreen } from './components/NearbyScreen';
import { SavedPlacesScreen } from './components/SavedPlacesScreen';
import { PersonalizeScreen } from './components/PersonalizeScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { ChangePasswordScreen } from './components/ChangePasswordScreen';
import { t } from './translations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('splash');
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('mausamLanguage') as Language) || 'en';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('mausamTheme') as Theme) || 'dark';
  });
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem('mausamTemperatureUnit') as TemperatureUnit) || 'celsius';
  });
  const [personaId, setPersonaId] = useState<PersonaId>(() => {
    return (localStorage.getItem('mausamPersona') as PersonaId) || 'commuter';
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('mausamNotifications');
    return saved !== null ? saved === 'true' : true;
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mausamUserProfile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      name: localStorage.getItem('mausamUserName') || 'Jagruthi',
      email: localStorage.getItem('mausamUserEmail') || 'user@example.com',
      phone: localStorage.getItem('mausamUserPhone') || '+91 98765 43210',
    };
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Sync theme & language to DOM
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, language]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('mausamLanguage', newLang);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('mausamTheme', newTheme);
  };

  const handleTemperatureUnitChange = (newUnit: TemperatureUnit) => {
    setTemperatureUnit(newUnit);
    localStorage.setItem('mausamTemperatureUnit', newUnit);
  };

  const handlePersonaChange = (newPersona: PersonaId) => {
    setPersonaId(newPersona);
    localStorage.setItem('mausamPersona', newPersona);
  };

  const handleNotificationsToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    localStorage.setItem('mausamNotifications', enabled.toString());
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    localStorage.setItem('mausamUserProfile', JSON.stringify(updated));
    localStorage.setItem('mausamUserName', updated.name);
    localStorage.setItem('mausamUserEmail', updated.email);
    localStorage.setItem('mausamUserPhone', updated.phone);
  };

  const handleLoginSuccess = (email: string) => {
    setUserProfile(prev => ({
      ...prev,
      email,
      name: email.split('@')[0] || 'User'
    }));
    setCurrentPage('dashboard');
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setCurrentPage('login');
  };

  if (currentPage === 'splash') {
    return (
      <SplashScreen
        language={language}
        onFinish={() => setCurrentPage('login')}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginScreen
        language={language}
        onLanguageChange={handleLanguageChange}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#101014] text-slate-100 flex">
      {/* Fixed Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        language={language}
        onLogout={() => setShowLogoutModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pl-0 md:pl-60 min-h-screen bg-radial-at-t from-[#161a22] to-[#101014] p-4 sm:p-6 md:p-8 overflow-x-hidden">
        <Topbar
          currentPage={currentPage}
          language={language}
          onNavigate={setCurrentPage}
          onLogout={() => setShowLogoutModal(true)}
          userProfile={userProfile}
          hasUnreadAlerts={true}
        />

        {/* Content Router */}
        {currentPage === 'dashboard' && (
          <DashboardScreen
            language={language}
            personaId={personaId}
            temperatureUnit={temperatureUnit}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'journey' && (
          <JourneyScreen language={language} />
        )}

        {currentPage === 'forecast' && (
          <ForecastScreen
            language={language}
            temperatureUnit={temperatureUnit}
          />
        )}

        {currentPage === 'alerts' && (
          <AlertsScreen
            language={language}
            personaId={personaId}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'nearby' && (
          <NearbyScreen language={language} />
        )}

        {currentPage === 'saved' && (
          <SavedPlacesScreen language={language} />
        )}

        {currentPage === 'personalize' && (
          <PersonalizeScreen
            language={language}
            currentPersonaId={personaId}
            onSelectPersona={handlePersonaChange}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsScreen
            language={language}
            onLanguageChange={handleLanguageChange}
            theme={theme}
            onThemeChange={handleThemeChange}
            temperatureUnit={temperatureUnit}
            onTemperatureUnitChange={handleTemperatureUnitChange}
            notificationsEnabled={notificationsEnabled}
            onNotificationsToggle={handleNotificationsToggle}
            userEmail={userProfile.email}
          />
        )}

        {currentPage === 'edit-profile' && (
          <EditProfileScreen
            language={language}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onBack={() => setCurrentPage('settings')}
          />
        )}

        {currentPage === 'change-password' && (
          <ChangePasswordScreen
            language={language}
            userEmail={userProfile.email}
            onSuccess={() => setCurrentPage('settings')}
            onBack={() => setCurrentPage('settings')}
          />
        )}
      </main>

      {/* Logout Confirmation Dialog */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#18181e] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100">
            <h3 className="text-base font-bold text-white">{t('Logout', language)}</h3>
            <p className="text-xs text-slate-400">
              {t('Are you sure you want to logout?', language)}
            </p>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                id="cancelLogoutBtn"
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-[#202026] hover:bg-[#282830] text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirmLogoutBtn"
                onClick={handleConfirmLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                {t('Logout', language)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
