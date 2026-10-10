import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Strangeroo collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">

      <h1 className="font-display text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-10">Last updated: October 2026</p>

      <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300">
        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">1. Who we are</h2>
          <p>
            Strangeroo (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the anonymous chat platform at{' '}
            <strong>strangeroo.app</strong>. We are committed to protecting your privacy under the
            Digital Personal Data Protection Act 2023 (DPDP Act) and applicable Indian law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">2. What we collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Session data:</strong> A hashed anonymous token, selected mode, interests, and language.</li>
            <li><strong>Technical data:</strong> Hashed IP address (for safety), browser user agent.</li>
            <li><strong>Account data (premium users only):</strong> Email address.</li>
            <li><strong>Payment data:</strong> Order and payment IDs from Razorpay. We never store card numbers, UPI IDs, or CVVs.</li>
            <li><strong>Reports and blocks:</strong> Content of safety reports (required by law and for moderation).</li>
          </ul>
          <p className="mt-3">We do <strong>not</strong> store, record, or log chat messages, video, or audio.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">3. How we use your data</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To match you with other users</li>
            <li>To enforce safety rules (rate limits, bans, reports)</li>
            <li>To process payments and grant premium access</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">4. Data retention</h2>
          <p>
            Guest session tokens expire after 24 hours. Hashed IPs used for safety may be retained
            for up to 90 days. Payment records are retained as required by Indian tax law.
            You may request deletion of your account data by contacting us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">5. Third-party services</h2>
          <p>We use the following third-party services. Please review their privacy policies:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Razorpay (payments) — razorpay.com/privacy</li>
            <li>Sentry (error monitoring) — sentry.io/privacy</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">6. Your rights</h2>
          <p>
            Under the DPDP Act, you have the right to access, correct, and erase your personal data.
            Contact our Grievance Officer (see the{' '}
            <Link href="/grievance" className="text-brand-400 hover:underline">Grievance page</Link>)
            to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">7. Contact</h2>
          <p>
            For privacy questions: <strong>privacy@strangeroo.app</strong>
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
  );
}
