import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Grievance Officer',
  description: 'Strangeroo Grievance Officer contact information as required by Indian IT rules.',
};

export default function GrievancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">

      <h1 className="font-display text-4xl font-bold mb-2">Grievance Officer</h1>
      <p className="text-gray-500 mb-10">
        As required by Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital
        Media Ethics Code) Rules, 2021, and Section 13 of the Digital Personal Data Protection
        Act 2023.
      </p>

      <div className="card mb-8">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Contact Details</h2>
        <dl className="space-y-3 text-gray-300">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-400 sm:w-32 shrink-0">Name</dt>
            <dd>[Grievance Officer Name — to be filled before launch]</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-400 sm:w-32 shrink-0">Designation</dt>
            <dd>Grievance Officer, Strangeroo</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-400 sm:w-32 shrink-0">Email</dt>
            <dd>
              <a href="mailto:grievance@strangeroo.app" className="text-brand-400 hover:underline">
                grievance@strangeroo.app
              </a>
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-400 sm:w-32 shrink-0">Address</dt>
            <dd>[Registered address — required before launch]</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="font-medium text-gray-400 sm:w-32 shrink-0">Response SLA</dt>
            <dd>Within 24 hours of receipt; resolved within 15 days.</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">When to contact the Grievance Officer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To report harmful, illegal, or objectionable content</li>
            <li>To exercise your data rights (access, correction, erasure)</li>
            <li>To raise concerns about privacy violations</li>
            <li>To appeal a moderation decision</li>
            <li>For any other complaints regarding the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Emergency escalation</h2>
          <p>
            If you observe content that depicts the sexual exploitation of children (CSAM) or a
            credible threat of imminent violence, please also report it to:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              <strong>NCMEC CyberTipline:</strong>{' '}
              <a href="https://www.missingkids.org/gethelpnow/cybertipline" className="text-brand-400 hover:underline" target="_blank" rel="noopener noreferrer">
                missingkids.org
              </a>
            </li>
            <li>
              <strong>CYBERCRIME.GOV.IN:</strong>{' '}
              <a href="https://cybercrime.gov.in" className="text-brand-400 hover:underline" target="_blank" rel="noopener noreferrer">
                cybercrime.gov.in
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <Footer />
  </div>
  );
}
