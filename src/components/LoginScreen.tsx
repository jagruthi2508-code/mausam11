import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, XCircle, ShieldCheck, KeyRound, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { t } from '../translations';

interface LoginScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLoginSuccess: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  language,
  onLanguageChange,
  onLoginSuccess,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Verification state
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Forgot password verification modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<1 | 2 | 3>(1);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // Password verification rules
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const criteriaCount = [hasMinLength, hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
  const strength = criteriaCount <= 1 ? 'Weak' : criteriaCount === 2 ? 'Fair' : criteriaCount === 3 ? 'Good' : 'Strong';
  const strengthColor =
    criteriaCount <= 1 ? 'bg-red-500 text-red-400' : criteriaCount === 2 ? 'bg-amber-500 text-amber-400' : criteriaCount === 3 ? 'bg-blue-500 text-blue-400' : 'bg-emerald-500 text-emerald-400';

  // Demo pre-verified credential
  const DEMO_EMAIL = 'user@example.com';
  const DEMO_PASSWORD = 'Mausam@2026';

  const handleFillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setVerificationError(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError(null);
    setVerificationSuccess(null);

    // 1. Password Verification Check: Minimum requirements
    if (password.length < 8) {
      setVerificationError('Password verification failed: Password must contain at least 8 characters.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);

      // Check registered accounts in localStorage
      const storedUsersRaw = localStorage.getItem('mausamRegisteredUsers');
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : {};
      const savedUserPassword = storedUsers[email.toLowerCase()] || (email.toLowerCase() === DEMO_EMAIL ? DEMO_PASSWORD : null);

      if (isRegisterMode) {
        // Registration password confirmation verification
        if (password !== confirmPassword) {
          setVerificationError('Password verification error: Passwords do not match.');
          return;
        }

        // Save new user credentials
        storedUsers[email.toLowerCase()] = password;
        localStorage.setItem('mausamRegisteredUsers', JSON.stringify(storedUsers));
        localStorage.setItem('mausamUserEmail', email);

        setVerificationSuccess('Account created and password verified successfully!');
        setTimeout(() => {
          onLoginSuccess(email);
        }, 800);
        return;
      }

      // Login password verification
      // If user is demo account or matches registered password
      if (savedUserPassword) {
        if (savedUserPassword !== password) {
          setAttempts(prev => prev + 1);
          setVerificationError(`Password verification failed: Incorrect password for ${email}. (Attempt ${attempts + 1})`);
          return;
        }
      } else {
        // For standard first-time testing, allow standard valid 8+ char password and record it
        storedUsers[email.toLowerCase()] = password;
        localStorage.setItem('mausamRegisteredUsers', JSON.stringify(storedUsers));
      }

      setVerificationSuccess('Password verified successfully! Access granted.');
      localStorage.setItem('mausamUserEmail', email);
      if (rememberMe) {
        localStorage.setItem('mausamRememberMe', 'true');
      }

      setTimeout(() => {
        onLoginSuccess(email);
      }, 700);
    }, 650);
  };

  const handleSendResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    setResetStep(2);
    setResetMessage(`Verification security code generated: ${code}`);
  };

  const handleVerifyResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode === generatedCode) {
      setResetStep(3);
      setResetMessage(null);
    } else {
      setResetMessage('Invalid verification code. Please check and re-enter.');
    }
  };

  const handleFinalizeReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetNewPassword.length < 8) {
      setResetMessage('New password must contain at least 8 characters.');
      return;
    }

    const storedUsersRaw = localStorage.getItem('mausamRegisteredUsers');
    const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : {};
    storedUsers[forgotEmail.toLowerCase()] = resetNewPassword;
    localStorage.setItem('mausamRegisteredUsers', JSON.stringify(storedUsers));

    setEmail(forgotEmail);
    setPassword(resetNewPassword);
    setShowForgotModal(false);
    setResetStep(1);
    setVerificationSuccess('Password reset and verified successfully! You can now log in.');
  };

  return (
    <div id="loginPage" className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-b from-[#0d131a] via-[#101014] to-[#12141a] text-slate-100 font-sans">
      {/* Top right language switch */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-[#18181e] border border-white/10 px-3 py-1.5 rounded-xl shadow-lg">
        <span className="text-xs font-bold text-sky-400">文A</span>
        <select
          id="loginLanguageSelect"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer border-none"
        >
          <option value="en" className="bg-[#18181e] text-white">English</option>
          <option value="te" className="bg-[#18181e] text-white">తెలుగు</option>
          <option value="hi" className="bg-[#18181e] text-white">हिन्दी</option>
        </select>
      </div>

      <div className="w-full max-w-[440px] bg-[#18181e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-7 md:p-8 shadow-2xl relative">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/assets/mausam-logo.png"
            alt="Mausam Logo"
            className="w-16 h-16 object-contain drop-shadow-md mb-3"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-2xl font-bold tracking-tight text-white">{t('Welcome to Mausam', language)}</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">{t('Weather that understands your needs.', language)}</p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex bg-[#202026] p-1 rounded-xl mb-5 border border-white/5">
          <button
            type="button"
            id="tabSignIn"
            onClick={() => { setIsRegisterMode(false); setVerificationError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${!isRegisterMode ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            {t('Login', language)}
          </button>
          <button
            type="button"
            id="tabSignUp"
            onClick={() => { setIsRegisterMode(true); setVerificationError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${isRegisterMode ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Pre-Fill helper */}
        {!isRegisterMode && (
          <div className="mb-4 bg-sky-950/40 border border-sky-500/20 rounded-xl p-2.5 flex items-center justify-between text-xs text-sky-200">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Verified Demo: <code className="bg-sky-900/50 px-1 py-0.5 rounded text-[11px] font-mono">user@example.com</code></span>
            </div>
            <button
              type="button"
              id="quickFillDemoBtn"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-sky-300 hover:text-white bg-sky-600/30 hover:bg-sky-600/60 px-2 py-1 rounded transition-colors"
            >
              Fill Demo
            </button>
          </div>
        )}

        {/* Verification Alert Banners */}
        {verificationError && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{verificationError}</div>
          </div>
        )}

        {verificationSuccess && (
          <div className="mb-4 p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{verificationSuccess}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="loginEmail">
              {t('Email', language)}
            </label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-[#202026] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/15 transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300" htmlFor="loginPassword">
                {t('Password', language)}
              </label>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                Password Verification
              </span>
            </div>
            <div className="relative">
              <input
                id="loginPassword"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('Enter your password', language)}
                required
                className="w-full bg-[#202026] border border-white/10 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/15 transition-all"
              />
              <button
                type="button"
                id="togglePasswordVisibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Real-time Password Verification Checklist & Strength Meter */}
            {password.length > 0 && (
              <div className="mt-2.5 p-2.5 bg-[#202026]/90 border border-white/5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Password Strength:</span>
                  <span className={`font-semibold ${strengthColor.split(' ')[1]}`}>{strength}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthColor.split(' ')[0]}`}
                    style={{ width: `${(criteriaCount / 4) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {hasMinLength ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>Min. 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${hasLetter ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {hasLetter ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>Letters (a-z, A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {hasNumber ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>Numbers (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {hasSpecial ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>Special symbol (@, #, $)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password in Register Mode */}
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="confirmPassword">
                Re-enter Password Verification
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className="w-full bg-[#202026] border border-white/10 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/15 transition-all"
                />
                <button
                  type="button"
                  id="toggleConfirmPasswordVisibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${password === confirmPassword ? 'text-emerald-400' : 'text-red-400'}`}>
                  {password === confirmPassword ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match perfectly.
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Passwords do not match yet.
                    </>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-[#202026] text-sky-500 focus:ring-0 w-3.5 h-3.5"
              />
              <span>{t('Remember me', language)}</span>
            </label>

            {!isRegisterMode && (
              <button
                type="button"
                id="forgotPasswordBtn"
                onClick={() => {
                  setForgotEmail(email || DEMO_EMAIL);
                  setShowForgotModal(true);
                  setResetStep(1);
                  setResetMessage(null);
                }}
                className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
              >
                {t('Forgot password?', language)}
              </button>
            )}
          </div>

          {/* Submit Button with Verification indicator */}
          <button
            type="submit"
            id="loginSubmitBtn"
            disabled={isVerifying}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{isRegisterMode ? 'Verify & Create Account' : 'Verify Password & Login'}</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-[#18181e] text-[11px] text-slate-500 uppercase tracking-wider">
            OR
          </span>
        </div>

        {/* Google Continue */}
        <button
          type="button"
          id="googleSignInBtn"
          onClick={() => {
            setEmail(DEMO_EMAIL);
            setPassword(DEMO_PASSWORD);
            onLoginSuccess(DEMO_EMAIL);
          }}
          className="w-full py-2.5 bg-[#202026] hover:bg-[#282830] border border-white/10 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.43 7.37 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.57 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
            />
          </svg>
          <span>{t('Continue with Google', language)}</span>
        </button>
      </div>

      {/* Forgot Password / Password Reset Verification Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#18181e] border border-white/10 rounded-2xl p-6 shadow-2xl relative text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Password Recovery & Verification</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {resetMessage && (
              <div className="mb-4 p-3 bg-sky-950/60 border border-sky-500/30 rounded-xl text-sky-300 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-sky-400" />
                <span>{resetMessage}</span>
              </div>
            )}

            {resetStep === 1 && (
              <form onSubmit={handleSendResetCode} className="space-y-4">
                <p className="text-xs text-slate-400">
                  Step 1: Enter your account email to receive a 4-digit verification code.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email address</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="w-full bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Generate Verification Code
                </button>
              </form>
            )}

            {resetStep === 2 && (
              <form onSubmit={handleVerifyResetCode} className="space-y-4">
                <p className="text-xs text-slate-400">
                  Step 2: Enter the 4-digit verification code generated for your account.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">4-Digit Verification Code</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    placeholder="e.g. 4829"
                    required
                    className="w-full bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-lg text-center tracking-widest font-mono text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Verify Code
                </button>
              </form>
            )}

            {resetStep === 3 && (
              <form onSubmit={handleFinalizeReset} className="space-y-4">
                <p className="text-xs text-slate-400">
                  Step 3: Enter your new verified password (minimum 8 characters).
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New Verified Password</label>
                  <input
                    type="password"
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    minLength={8}
                    required
                    className="w-full bg-[#202026] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Set & Verify New Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
