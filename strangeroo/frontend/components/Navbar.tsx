'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(3,7,18,0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg transition-transform duration-200 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6366f1, #f97316)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
          >
            🎲
          </div>
          <span
            className="font-display text-lg font-bold tracking-tight"
            style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}
          >
            strangeroo
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href="/chat" className="hover:text-white transition-colors">Text Chat</Link>
          <Link href="/video" className="hover:text-white transition-colors">Video Chat</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Premium</Link>
          <Link
            href="/account"
            className="px-4 py-2 rounded-lg text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}
          >
            Account
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="sm:hidden border-t px-4 py-4 space-y-3 text-sm font-medium"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(3,7,18,0.95)' }}
        >
          <Link href="/chat" className="block text-gray-400 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Text Chat</Link>
          <Link href="/video" className="block text-gray-400 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Video Chat</Link>
          <Link href="/pricing" className="block text-gray-400 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Premium</Link>
          <Link href="/account" className="block text-gray-400 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Account</Link>
        </div>
      )}
    </header>
  );
}
