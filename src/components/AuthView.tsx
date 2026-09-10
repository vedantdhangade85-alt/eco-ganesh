import React, { useState } from 'react';
import { PageView } from '../types';
import { User, Lock, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { firebaseLoginUser, firebaseRegisterUser, firebaseGoogleSignIn } from '../firebase';

interface AuthViewProps {
  initialMode: 'login' | 'register';
  onLoginSuccess: (user: { name: string; email: string; role?: string }) => void;
  setCurrentPage: (page: PageView) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode,
  onLoginSuccess,
  setCurrentPage,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatFirebaseError = (err: any) => {
    const code = err?.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return 'Invalid email or password. Please check your credentials.';
    }
    if (code === 'auth/email-already-in-use') {
      return 'An account with this email already exists. Try logging in.';
    }
    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters long.';
    }
    if (code === 'auth/invalid-email') {
      return 'Please provide a valid email address.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Google sign-in popup was closed.';
    }
    return err?.message || 'Authentication error. Please try again.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setIsLoading(true);
    setErrorMessage(null);
    setMessage(null);

    try {
      const user = await firebaseLoginUser(loginEmail, loginPassword);
      const customerName = user.displayName || loginEmail.split('@')[0] || 'Devoted Customer';
      
      onLoginSuccess({
        name: customerName,
        email: user.email || loginEmail,
        role: 'customer',
      });

      setMessage('Welcome back! Firebase authentication successful.');
      setTimeout(() => {
        setCurrentPage('home');
      }, 600);
    } catch (err: any) {
      console.error('Firebase Login Error:', err);
      setErrorMessage(formatFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) return;

    setIsLoading(true);
    setErrorMessage(null);
    setMessage(null);

    try {
      const user = await firebaseRegisterUser(regName, regEmail, regPassword, regPhone, regCity);
      
      onLoginSuccess({
        name: regName,
        email: regEmail,
        role: 'customer',
      });

      setMessage(`Registration successful! Account created in Firebase for ${regName}.`);
      setTimeout(() => {
        setCurrentPage('home');
      }, 600);
    } catch (err: any) {
      console.error('Firebase Register Error:', err);
      setErrorMessage(formatFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setMessage(null);

    try {
      const user = await firebaseGoogleSignIn();
      const customerName = user.displayName || user.email?.split('@')[0] || 'Devoted Customer';

      onLoginSuccess({
        name: customerName,
        email: user.email || '',
        role: 'customer',
      });

      setMessage(`Signed in with Google as ${customerName}!`);
      setTimeout(() => {
        setCurrentPage('home');
      }, 600);
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setErrorMessage(formatFirebaseError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Quick 1-click test helper
  const handleQuickCustomer = () => {
    onLoginSuccess({
      name: 'Pooja Sharma',
      email: 'pooja.sharma@example.com',
      role: 'customer'
    });
    setCurrentPage('home');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-6 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center mx-auto text-2xl mb-2">
            🕉️
          </div>
          <div className="inline-flex items-center gap-1.5 bg-amber-950/40 text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1 border border-amber-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Firebase Auth Active
          </div>
          <h2 className="text-2xl font-serif font-black">
            {mode === 'login' ? 'Customer Login' : 'Customer Registration'}
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            {mode === 'login' 
              ? 'Sign in securely with your Firebase account' 
              : 'Create your account to order 100% clay Ganpati idols'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-stone-200 text-xs font-bold">
          <button
            id="tab-login-mode"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`py-3 transition-colors ${
              mode === 'login'
                ? 'text-orange-700 border-b-2 border-orange-600 bg-orange-50/50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Customer Login
          </button>
          <button
            id="tab-register-mode"
            onClick={() => { setMode('register'); setErrorMessage(null); }}
            className={`py-3 transition-colors ${
              mode === 'register'
                ? 'text-orange-700 border-b-2 border-orange-600 bg-orange-50/50'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Customer Registration
          </button>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="m-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Forms */}
        <div className="p-6 space-y-4">
          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl border border-stone-300 shadow-xs flex items-center justify-center gap-2.5 transition-all hover:border-stone-400 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-stone-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-stone-400 font-semibold uppercase">or with email</span>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="customer@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-stone-300 text-orange-600" />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                id="btn-login-submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-105 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In with Firebase</span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Joshi"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="anand@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200XXXXX"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Mumbai / Pune"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-register-submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-105 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account in Firebase</span>
                )}
              </button>
            </form>
          )}

          {/* 1-Click Fast Demo Button */}
          <div className="pt-4 border-t border-stone-200 text-center space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Quick 1-Click Preview Login:
            </span>
            <button
              type="button"
              id="quick-demo-customer"
              onClick={handleQuickCustomer}
              className="w-full px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold border border-stone-300 flex items-center justify-center gap-2 transition-colors"
            >
              <User className="w-4 h-4 text-[#5D6D31]" />
              <span>Sign in as Devotee (Pooja Sharma)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
