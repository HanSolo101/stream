import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/80 bg-gray-950/80 backdrop-blur-md py-10 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            🎲
          </div>
          <div>
            <span className="font-semibold text-gray-300">Strangeroo</span>
            <span className="ml-2 text-xs text-gray-500">© {new Date().getFullYear()} Strangeroo. All rights reserved.</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
          <Link href="/chat" className="hover:text-white transition-colors">Text Chat</Link>
          <Link href="/video" className="hover:text-white transition-colors">Video Chat</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Premium</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          <Link href="/grievance" className="hover:text-white transition-colors">Grievance Officer</Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 border border-gray-800 px-3 py-1.5 rounded-full bg-gray-900/60">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>18+ Adults Only • IT Rules 2021 Compliant</span>
        </div>
      </div>
    </footer>
  );
}
