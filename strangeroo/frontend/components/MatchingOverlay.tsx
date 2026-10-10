'use client';

import { useState, useEffect } from 'react';

interface MatchingOverlayProps {
  onCancel: () => void;
  mode: 'text' | 'video';
  interests?: string[];
}

export default function MatchingOverlay({ onCancel, mode, interests = [] }: MatchingOverlayProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center animate-fade-in">
      {/* Radar Animation Rings */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping opacity-75"></div>
        <div className="absolute inset-4 rounded-full border border-orange-500/30 animate-pulse"></div>
        <div className="absolute inset-8 rounded-full border border-indigo-500/40"></div>
        <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-orange-500 flex items-center justify-center text-3xl shadow-xl shadow-indigo-500/30">
          {mode === 'video' ? '📹' : '💬'}
        </div>
      </div>

      <h3 className="text-2xl font-bold font-display text-white mb-2">
        Searching for a stranger...
      </h3>

      <p className="text-sm text-gray-400 mb-4 max-w-sm">
        Looking for someone online {mode === 'video' ? 'ready for video' : 'for text chat'}.
      </p>

      {interests.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-md">
          <span className="text-xs text-gray-500">Matching tags:</span>
          {interests.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 font-mono mb-8 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
        Queue time: {seconds}s • Connecting to pool...
      </div>

      <button
        onClick={onCancel}
        className="px-6 py-2.5 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 text-sm font-semibold transition-all duration-200"
      >
        Cancel Search
      </button>
    </div>
  );
}
