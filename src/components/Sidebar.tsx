import React from 'react';
import { Home, Compass, CalendarDays, Bell, MapPin, Bookmark, Settings, UserCheck, LogOut } from 'lucide-react';
import { PageId, Language } from '../types';
import { t } from '../translations';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  language,
  onLogout
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t('Home', language), icon: <Home className="w-5 h-5" /> },
    { id: 'journey', label: t('Journey', language), icon: <Compass className="w-5 h-5" /> },
    { id: 'forecast', label: t('Forecast', language), icon: <CalendarDays className="w-5 h-5" /> },
    { id: 'alerts', label: t('Alerts', language), icon: <Bell className="w-5 h-5" /> },
    { id: 'nearby', label: t('Nearby', language), icon: <MapPin className="w-5 h-5" /> },
    { id: 'saved', label: t('Saved Places', language), icon: <Bookmark className="w-5 h-5" /> },
  ];

  const bottomItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'settings', label: t('Settings', language), icon: <Settings className="w-5 h-5" /> },
    { id: 'personalize', label: t('Personalize', language), icon: <UserCheck className="w-5 h-5" /> },
  ];

  return (
    <aside
      id="appSidebar"
      className="w-60 min-h-screen bg-[#0d0d11] text-slate-300 border-r border-white/10 flex flex-col justify-between p-4 fixed left-0 top-0 bottom-0 z-40"
    >
      <div>
        {/* Brand */}
        <div
          id="brandLogoHeader"
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 px-3 py-3 mb-4 cursor-pointer group"
        >
          <img
            src="/assets/mausam-logo.png"
            alt="Mausam Logo"
            className="w-10 h-10 object-contain drop-shadow group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <span className="font-extrabold text-lg tracking-wider text-white">MAUSAM</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#25252c] text-sky-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#18181e]'
                }`}
              >
                <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Nav */}
      <div className="pt-4 border-t border-white/10 space-y-1">
        {bottomItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#25252c] text-sky-400 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#18181e]'
              }`}
            >
              <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          id="logoutButton"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          <span>{t('Logout', language)}</span>
        </button>
      </div>
    </aside>
  );
};
