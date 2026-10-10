'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AgeGateModalProps {
  onVerified?: () => void;
  forceOpen?: boolean;
}

export default function AgeGateModal({ onVerified, forceOpen = false }: AgeGateModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }
    const verified = localStorage.getItem('strangeroo_age_verified');
    if (!verified) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleAccept = () => {
    localStorage.setItem('strangeroo_age_verified', 'true');
    setIsOpen(false);
    if (onVerified) onVerified();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-red-500/20 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto mb-5 shadow-inner">
          🔞
        </div>

        <h2 className="text-2xl font-bold font-display text-white mb-2">Age Verification</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Strangeroo connects adults (18+) for anonymous conversations. Video and text chats are unmoderated peer-to-peer connections.
        </p>

        <div className="bg-gray-950/70 border border-gray-800/80 rounded-xl p-4 text-xs text-gray-400 text-left space-y-2 mb-6">
          <p className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">1.</span>
            <span>You must be at least <strong>18 years old</strong> to use this service.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">2.</span>
            <span>Zero tolerance for harassment, hate speech, or non-consensual sexual content. Violators are permanently banned.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">3.</span>
            <span>Compliant with Indian IT Rules 2021 & Grievance redressal standards.</span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-orange-500 hover:from-indigo-500 hover:to-orange-400 shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98]"
          >
            I am 18 or older — Enter Strangeroo
          </button>
          <a
            href="https://www.google.com"
            className="w-full py-2.5 px-4 rounded-xl text-xs text-gray-400 hover:text-gray-200 bg-gray-800/50 hover:bg-gray-800 transition-colors"
          >
            I am under 18 — Exit
          </a>
        </div>

        <p className="mt-5 text-[11px] text-gray-500">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-indigo-400 hover:underline">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
