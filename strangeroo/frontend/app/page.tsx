import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgeGateModal from '@/components/AgeGateModal';

export const metadata: Metadata = {
  title: 'Strangeroo — Meet Interesting Strangers',
  description:
    'Anonymous one-to-one text and video chat. Meet someone new instantly without sign-up. 100% anonymous & secure.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <AgeGateModal />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-orange-500/10 blur-[130px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto pt-4 pb-12">
          {/* Live online pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900/90 border border-gray-800 text-xs font-medium text-gray-300 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>⚡ 1,482 people chatting online right now</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-[1.1] mb-6 text-balance tracking-tight">
            Meet someone <span className="gradient-text">interesting</span> in seconds.
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto text-balance">
            Anonymous one-to-one text and video chat. No email, no phone numbers, no passwords. Just pick a mode and start talking.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/chat"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-xl shadow-indigo-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              <span>Start Text Chat</span>
            </Link>

            <Link
              href="/video"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 shadow-xl shadow-orange-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <span className="text-xl">📹</span>
              <span>Start Video Chat</span>
            </Link>
          </div>

          {/* Quick interest chips */}
          <div className="max-w-xl mx-auto mb-16">
            <div className="text-xs text-gray-500 mb-2 font-medium">Popular interest topics:</div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['#chill', '#coding', '#gaming', '#anime', '#music', '#movies', '#startup', '#dating'].map((tag) => (
                <Link
                  key={tag}
                  href="/chat"
                  className="text-xs px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mb-14">
            <div className="p-6 rounded-3xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl mb-4 text-indigo-400">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">100% Anonymous</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zero registration required. We never store chat messages, video frames, or personally identifiable data.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-2xl mb-4 text-orange-400">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Instant WebRTC P2P</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                High-definition video and low-latency audio connected directly browser-to-browser with coturn relay fallback.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl mb-4 text-emerald-400">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Safety First</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Mandatory 18+ age verification, instant report & block features, and IT Rules 2021 compliant grievance redressal.
              </p>
            </div>
          </div>

          {/* Premium callout banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-gray-900 to-orange-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">⭐</span>
                <span className="text-base font-bold text-white font-display">Need Gender Filter & VIP Queue?</span>
              </div>
              <p className="text-xs text-gray-400">
                Upgrade with instant UPI from just ₹49 for a 24-hour pass. No auto-renewal traps.
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md whitespace-nowrap transition-all"
            >
              View Passes ➔
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
