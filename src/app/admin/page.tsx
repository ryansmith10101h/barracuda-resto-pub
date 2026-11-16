'use client';

import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Lock, Shield, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  const [passcode, setPasscode] = useState<string>('');
  const [inputPasscode, setInputPasscode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('barracuda_admin_passcode');
    if (saved) {
      setPasscode(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'barracuda_abuja_2026';
    if (inputPasscode === expected || inputPasscode === 'barracuda_abuja_2026') {
      sessionStorage.setItem('barracuda_admin_passcode', inputPasscode);
      setPasscode(inputPasscode);
      setIsAuthenticated(true);
    } else {
      setError('Invalid admin passcode. Please enter the authorized manager code.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('barracuda_admin_passcode');
    setPasscode('');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-dark-950 px-4 py-16">
        <div className="max-w-md w-full bg-espresso-950 border border-bronze/30 rounded-3xl p-8 sm:p-10 shadow-elevated text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-bronze/10 border border-bronze/30 text-champagne flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-bronze">
              SECURE PORTAL
            </span>
            <h1 className="font-serif text-2xl font-bold text-cream-50">
              Staff & Manager Access
            </h1>
            <p className="text-cream-400 text-xs">
              Enter the manager passcode to access the Barracuda Resto Pub administration console.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
              <input
                type="password"
                required
                value={inputPasscode}
                onChange={(e) => setInputPasscode(e.target.value)}
                placeholder="Manager Passcode (e.g. barracuda_abuja_2026)"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-espresso-900 border border-white/10 text-cream-100 placeholder:text-cream-500 text-sm focus:outline-none focus:border-bronze transition-colors text-center"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-bronze hover:bg-bronze-light text-dark-950 font-black uppercase tracking-wider text-xs shadow-bronze-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>ACCESS DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-cream-500">
              Passcode for local preview: <code className="text-champagne font-mono">barracuda_abuja_2026</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminDashboard passcode={passcode} onLogout={handleLogout} />
      </div>
    </div>
  );
}
