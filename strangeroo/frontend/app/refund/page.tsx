import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Strangeroo refund and cancellation policy for premium subscriptions.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">

      <h1 className="font-display text-4xl font-bold mb-2">Refund Policy</h1>
      <p className="text-gray-500 mb-10">Last updated: October 2026</p>

      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Overview</h2>
          <p>
            We want you to be happy with your Strangeroo Premium purchase. This policy explains
            when and how refunds are issued.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Eligible refunds</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Technical failure:</strong> If you were charged but premium was not activated
              due to a platform error, you will receive a full refund within 5–7 business days.
            </li>
            <li>
              <strong>Duplicate charge:</strong> If you were charged more than once for the same
              plan in error, we will refund the duplicate charge.
            </li>
            <li>
              <strong>Within 24 hours of purchase</strong> (day passes only): If you have not used
              any premium features, you may request a refund.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Non-refundable</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Passes that have been partially or fully used</li>
            <li>Weekly or monthly passes after 24 hours of activation</li>
            <li>Accounts banned for terms of service violations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">How to request a refund</h2>
          <p>
            Email <strong>support@strangeroo.app</strong> with your order ID (visible in your
            account page) and reason. We will respond within 2 business days.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-white mb-3">GST and pricing</h2>
          <p>
            All prices are displayed in Indian Rupees (INR) and include applicable GST.
            A GST invoice can be requested by emailing us with your GSTIN.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
  );
}
