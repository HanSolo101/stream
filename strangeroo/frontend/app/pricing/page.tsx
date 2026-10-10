'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free Explorer',
    price: '₹0',
    period: 'forever',
    description: 'Basic random text & video chat with standard matching.',
    features: [
      'Unlimited 1-on-1 text chat',
      'Standard 720p video chat',
      'Basic interest tag matching',
      'Community moderation & reporting',
    ],
    cta: 'Start Free Chat',
  },
  {
    id: 'day_pass',
    name: 'Day Pass',
    price: '₹49',
    period: '24 hours',
    description: 'Quick instant upgrade for an evening of focused conversations.',
    features: [
      '⚡ VIP fast matching queue',
      '🎯 Priority interest matching',
      '🚻 Gender filter option',
      '🚫 Ad-free experience',
      '⏩ Unlimited instant skips',
    ],
    cta: 'Get 24h Pass (₹49)',
  },
  {
    id: 'weekly_pass',
    name: 'Weekly VIP',
    price: '₹149',
    period: '7 days',
    popular: true,
    description: 'Our most popular choice for frequent chatters and creators.',
    features: [
      'All Day Pass perks included',
      '📹 1080p Full HD video quality',
      '🚀 Dedicated Indian TURN server routing (Lowest latency)',
      '⭐ Verified Premium badge in chat',
      '🌍 Region preference filter',
      '🛡️ 24/7 Priority support',
    ],
    cta: 'Upgrade to Weekly (₹149)',
  },
  {
    id: 'monthly_pass',
    name: 'Monthly Pro',
    price: '₹399',
    period: '30 days',
    description: 'Best value for daily regulars. Maximum speed and features.',
    features: [
      'Save over 60% compared to daily',
      'All Weekly VIP perks included',
      '👑 Exclusive Gold crown badge',
      '⚡ Zero queue time guarantee',
      '🔒 High-bandwidth dedicated video relay',
      '🔄 Instant auto-reconnect if dropped',
    ],
    cta: 'Get Monthly Pro (₹399)',
  },
];

const FAQS = [
  {
    q: 'How does payment work with UPI and Razorpay?',
    a: 'We support all major Indian UPI apps (Google Pay, PhonePe, Paytm, BHIM, CRED), NetBanking, and credit/debit cards via secure Razorpay checkout. Activation takes under 3 seconds.',
  },
  {
    q: 'Do I need to create an account or provide my real name?',
    a: 'No! Strangeroo is anonymous. Your premium status is securely tied to your anonymous session token in your browser. You can also generate an anonymous recovery code.',
  },
  {
    q: 'Can I get a refund if I am dissatisfied?',
    a: 'Yes, we have a clear refund policy. If technical server issues prevented you from using your pass, submit a ticket within 24 hours under our Refund Policy.',
  },
  {
    q: 'Are premium calls recorded?',
    a: 'Never. All video and text chats remain peer-to-peer (WebRTC) and are never recorded or stored on any server.',
  },
];

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      window.location.href = '/chat';
      return;
    }
    setSelectedPlan(planId);
    setCheckoutModalOpen(true);
    setPaymentSuccess(false);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      localStorage.setItem('strangeroo_premium_tier', selectedPlan || 'weekly_pass');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-orange-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4">
            <span>⚡ Powered by Razorpay & Fast UPI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white mb-4">
            Upgrade your chats with <span className="gradient-text">Premium</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Skip queues, filter by gender and interest, and unlock dedicated high-speed video routing starting at just ₹49.
          </p>

          {/* Payment method logos / badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-gray-400">
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 font-semibold">GPay</span>
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 font-semibold">PhonePe</span>
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 font-semibold">Paytm</span>
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 font-semibold">BHIM UPI</span>
            <span className="px-3 py-1 rounded-lg bg-gray-900 border border-gray-800 font-semibold">Cards & NetBanking</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-indigo-950/40 via-gray-900 to-gray-950 border-indigo-500/50 shadow-2xl shadow-indigo-600/20 scale-105 z-10'
                  : 'bg-gray-900/60 border-gray-800/80 hover:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-orange-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold font-display text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-400 mb-4 min-h-[32px]">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-gray-500 font-medium">/{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8 border-t border-gray-800/80 pt-5">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-indigo-400 font-bold shrink-0">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-orange-500 hover:from-indigo-500 hover:to-orange-400 text-white shadow-lg shadow-indigo-600/25'
                    : plan.id === 'free'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                    : 'bg-indigo-600/80 hover:bg-indigo-500 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 sm:p-10 mb-20">
          <h2 className="text-2xl font-bold font-display text-white text-center mb-8">
            Why Upgrade to Strangeroo Premium?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-gray-950/60 border border-gray-800/80">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="text-base font-bold text-white mb-1">Zero Wait Matching</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Skip standard queue throttles. Get paired within seconds using our priority WebSocket routing engine.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-950/60 border border-gray-800/80">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-base font-bold text-white mb-1">Gender & Interest Filters</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Looking to talk to someone specific? Target by gender and strict keyword interests instead of purely random dice rolls.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-950/60 border border-gray-800/80">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-base font-bold text-white mb-1">Ultra-Low Ping TURN Relay</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Native co-turn relay servers situated in Mumbai and Bengaluru for crystal-clear 1080p video with under 40ms latency.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold font-display text-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-800 bg-gray-900/40 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-gray-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <span className="text-indigo-400 ml-4 font-bold">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-gray-400 leading-relaxed border-t border-gray-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Razorpay UPI Checkout Simulation Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-md w-full bg-gray-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>

            {paymentSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Payment Successful!</h3>
                <p className="text-sm text-gray-300">
                  Your <strong className="text-indigo-400 uppercase">{selectedPlan?.replace('_', ' ')}</strong> is now active.
                </p>
                <div className="bg-gray-950 p-3 rounded-xl text-xs font-mono text-gray-400 border border-gray-800">
                  Receipt ID: rzp_test_{Math.random().toString(36).substring(7)}
                </div>
                <div className="flex gap-3 pt-3">
                  <Link
                    href="/chat"
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 text-center"
                  >
                    Start Chatting
                  </Link>
                  <Link
                    href="/account"
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 text-center"
                  >
                    View Account
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xl">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Razorpay Secure Checkout</h3>
                    <p className="text-xs text-gray-400">Instant UPI & Card Settlement</p>
                  </div>
                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-400">Plan:</span>
                    <span className="font-bold text-white uppercase">{selectedPlan?.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Amount Due:</span>
                    <span className="font-bold text-emerald-400 text-base">
                      {PLANS.find((p) => p.id === selectedPlan)?.price} INR
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-xs font-semibold text-gray-400">Choose Payment Method:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button className="p-3 rounded-xl border border-indigo-500/50 bg-indigo-500/10 text-white font-medium flex items-center justify-center gap-2">
                      <span>📱</span> UPI / QR Code
                    </button>
                    <button className="p-3 rounded-xl border border-gray-800 bg-gray-950 text-gray-300 font-medium flex items-center justify-center gap-2">
                      <span>💳</span> Card
                    </button>
                    <button className="p-3 rounded-xl border border-gray-800 bg-gray-950 text-gray-300 font-medium flex items-center justify-center gap-2">
                      <span>🏦</span> NetBanking
                    </button>
                    <button className="p-3 rounded-xl border border-gray-800 bg-gray-950 text-gray-300 font-medium flex items-center justify-center gap-2">
                      <span>👛</span> Wallets
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-orange-500 hover:from-indigo-500 hover:to-orange-400 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing UPI Intent...</span>
                    </>
                  ) : (
                    <span>Pay {PLANS.find((p) => p.id === selectedPlan)?.price} Securely ➔</span>
                  )}
                </button>

                <p className="mt-4 text-center text-[10px] text-gray-500">
                  256-bit SSL Encrypted • Fastify backend webhook verified
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
