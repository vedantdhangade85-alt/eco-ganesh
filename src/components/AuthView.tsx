import React, { useState } from 'react';
import { PageView } from '../types';
import { User, Lock, Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    const customerName = loginEmail.split('@')[0] || 'Devoted Customer';
    onLoginSuccess({
      name: customerName,
      email: loginEmail,
      role: 'customer',
    });

    setMessage('Welcome back! Successfully logged in.');
    setTimeout(() => {
      setCurrentPage('home');
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) return;

    onLoginSuccess({
      name: regName,
      email: regEmail,
      role: 'customer',
    });

    setMessage(`Registration successful! Welcome to the Eco Ganesh family, ${regName}.`);
    setTimeout(() => {
      setCurrentPage('home');
    }, 600);
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
          <h2 className="text-2xl font-serif font-black">
            {mode === 'login' ? 'Customer Login' : 'Customer Registration'}
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            {mode === 'login' 
              ? 'Access your saved idols, orders and home visarjan guides' 
              : 'Create your account to order 100% clay Ganpati idols'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-stone-200 text-xs font-bold">
          <button
            id="tab-login-mode"
            onClick={() => setMode('login')}
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
            onClick={() => setMode('register')}
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

        {/* Forms */}
        <div className="p-6">
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
                <button type="button" className="text-orange-700 hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                id="btn-login-submit"
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-105 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
              >
                Sign In to Account
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
                    required
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
                    required
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
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-105 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all mt-2"
              >
                Complete Registration
              </button>
            </form>
          )}

          {/* 1-Click Fast Demo Button */}
          <div className="pt-6 mt-6 border-t border-stone-200 text-center space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Quick 1-Click Preview Login:
            </span>
            <button
              type="button"
              id="quick-demo-customer"
              onClick={handleQuickCustomer}
              className="w-full px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold border border-stone-300 flex items-center justify-center gap-2 transition-colors"
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
