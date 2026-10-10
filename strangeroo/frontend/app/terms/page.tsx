import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Strangeroo terms of service — rules for using the platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">

      <h1 className="font-display text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-10">Last updated: October 2026</p>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">1. Eligibility</h2>
          <p>
            You must be <strong>18 years or older</strong> to use Strangeroo. By entering the
            platform, you confirm that you meet this requirement. We may implement stronger
            age-assurance mechanisms in future.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">2. Acceptable use</h2>
          <p>You agree <strong>not</strong> to:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Share, solicit, or distribute sexually explicit content involving minors (CSAM)</li>
            <li>Harass, threaten, or harm other users</li>
            <li>Spam or flood chats with automated messages</li>
            <li>Attempt to circumvent bans, rate limits, or moderation</li>
            <li>Record, capture, or redistribute sessions without consent</li>
            <li>Use the platform for any unlawful purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">3. Moderation and bans</h2>
          <p>
            We may suspend or permanently ban accounts and sessions that violate these terms.
            Credible threats and illegal content (including CSAM) will be reported to the relevant
            law enforcement authorities.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">4. Premium subscriptions</h2>
          <p>
            Premium access is provided on a time-limited basis (day / week / month passes).
            Payments are processed by Razorpay. See our{' '}
            <Link href="/refund" className="text-brand-400 hover:underline">Refund Policy</Link>{' '}
            for cancellation terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">5. Disclaimer</h2>
          <p>
            Strangeroo is provided &ldquo;as is&rdquo;. We are not responsible for the content or
            conduct of any user on the platform. Use at your own risk.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">6. Governing law</h2>
          <p>
            These terms are governed by the laws of India. Disputes shall be subject to the
            exclusive jurisdiction of the courts in [your city], India.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">7. Changes</h2>
          <p>
            We may update these terms at any time. Continued use of the platform after changes
            constitutes acceptance.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
  );
}
