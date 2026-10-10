'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AccountPage() {
  const [anonId, setAnonId] = useState('stranger_loading...');
  const [copied, setCopied] = useState(false);
  const [premiumTier, setPremiumTier] = useState<string>('free');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoNext, setAutoNext] = useState(false);

  useEffect(() => {
    let savedId = localStorage.getItem('strangeroo_anon_id');
    if (!savedId) {
      savedId = 'stranger_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('strangeroo_anon_id', savedId);
    }
    setAnonId(savedId);

    const tier = localStorage.getItem('strangeroo_premium_tier') || 'free';
    setPremiumTier(tier);
  }, []);

  const copyId = () => {
    navigator.clipboard.writeText(anonId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetSession = () => {
    if (confirm('Are you sure you want to reset your anonymous identity? This generates a fresh token and resets saved preferences.')) {
      const freshId = 'stranger_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('strangeroo_anon_id', freshId);
      localStorage.removeItem('strangeroo_premium_tier');
      setAnonId(freshId);
      setPremiumTier('free');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold font-display text-white mb-2">Anonymous Account</h1>
          <p className="text-sm text-gray-400">
            Strangeroo doesn't require email or phone sign-up. Your membership and settings are tied to your browser session.
          </p>
        </div>

        {/* Identity & Membership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Anon ID Card */}
          <div className="md:col-span-2 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400">ANONYMOUS IDENTIFIER</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Active Session
              </span>
            </div>

            <div className="flex items-center gap-3 bg-gray-950 border border-gray-800 rounded-2xl p-3 mb-4">
              <span className="font-mono text-sm text-indigo-300 font-semibold flex-1 truncate">
                {anonId}
              </span>
              <button
                onClick={copyId}
                className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <p className="text-xs text-gray-500">
              This token is used by our matching engine to remember your block list and active passes without exposing your personal information.
            </p>
          </div>

          {/* Membership Tier Card */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-400 block mb-2">MEMBERSHIP</span>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold font-display text-white capitalize">
                  {premiumTier === 'free' ? 'Free Explorer' : premiumTier.replace('_', ' ')}
                </span>
                {premiumTier !== 'free' && <span>⭐</span>}
              </div>
              <p className="text-xs text-gray-400 mb-4">
                {premiumTier === 'free'
                  ? 'Standard queues & basic matching.'
                  : 'Active VIP Pass with priority queue enabled.'}
              </p>
            </div>

            {premiumTier === 'free' ? (
              <Link
                href="/pricing"
                className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-orange-500 hover:from-indigo-500 hover:to-orange-400 shadow-md shadow-indigo-600/20 transition-all"
              >
                Upgrade (from ₹49) ➔
              </Link>
            ) : (
              <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl text-center">
                ✓ VIP Status Active
              </div>
            )}
          </div>
        </div>

        {/* Safety & Trust Score */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 mb-8">
          <h3 className="text-base font-bold text-white mb-4">Trust & Safety Rating</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl text-emerald-400 font-bold">
                100%
              </div>
              <div>
                <div className="text-sm font-bold text-white">Good Standing</div>
                <div className="text-xs text-gray-400">0 reports filed against this session. Fast matchmaking is enabled.</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Community guidelines compliant
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 mb-8 space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Preferences</h3>

          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-200">Audio Alerts</div>
              <div className="text-xs text-gray-500">Play notification sound when matched with a partner</div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-indigo-600' : 'bg-gray-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-gray-200">Auto-skip on Disconnect</div>
              <div className="text-xs text-gray-500">Automatically search for next partner if stranger disconnects</div>
            </div>
            <button
              onClick={() => setAutoNext(!autoNext)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                autoNext ? 'bg-indigo-600' : 'bg-gray-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  autoNext ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-950/20 border border-red-900/40 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-red-400">Reset Session Identity</h4>
            <p className="text-xs text-gray-400">
              Clear your current anonymous ID, block history, and pass status on this device.
            </p>
          </div>
          <button
            onClick={resetSession}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-red-300 bg-red-900/40 border border-red-800 hover:bg-red-800/50 transition-colors whitespace-nowrap"
          >
            Reset Identity
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
