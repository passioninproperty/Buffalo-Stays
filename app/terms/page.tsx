import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${SITE_NAME}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-bg-main text-brand-text-main py-16 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-lg">
        <h1 className="font-serif text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-brand-text-main/80 mb-6">Last updated: June 1, 2026</p>

        <p className="mb-4">These Terms of Service govern your use of Buffalo Stays' website and booking services. By accessing or using our site, you agree to these Terms.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Bookings & Payments</h2>
        <p className="mb-4">Bookings are subject to availability. Payment terms, deposits, and cancellation policies will be provided at the time of booking. Please review booking details carefully.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Cancellations & Refunds</h2>
        <p className="mb-4">Cancellation and refund policies vary by property and booking. We will communicate any applicable fees at booking confirmation.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Liability</h2>
        <p className="mb-4">To the fullest extent permitted by law, Buffalo Stays is not liable for indirect, incidental, or consequential damages arising from your use of the site or stays booked through the site.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Governing Law</h2>
        <p className="mb-4">These terms are governed by the laws of the jurisdiction where Buffalo Stays operates.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Contact</h2>
        <p className="mb-6">Questions about these Terms? Contact us at legal@buffalostays.example.</p>

        <div className="mt-8 flex justify-between">
          <Link href="/" className="text-sm text-brand-text-main/70 hover:underline">Back home</Link>
          <Link href="/privacy" className="text-sm text-brand-primary font-bold">Read Privacy Policy</Link>
        </div>
      </div>
    </main>
  );
}
