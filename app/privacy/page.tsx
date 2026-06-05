import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy practices for ${SITE_NAME}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-bg-main text-brand-text-main py-16 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-lg">
        <h1 className="font-serif text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-brand-text-main/80 mb-6">Last updated: June 1, 2026</p>

        <p className="mb-4">Buffalo Stays (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or contact us about bookings.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Contact information you provide when inquiring (name, email, phone number).</li>
          <li>Booking-related details such as requested dates and property of interest.</li>
          <li>Technical data collected automatically (IP address, browser type, device info).</li>
        </ul>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <p className="mb-4">We use information to respond to inquiries, process bookings, provide support via WhatsApp, and improve our services. We may also use aggregated data for analytics.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Sharing & Disclosure</h2>
        <p className="mb-4">We do not sell personal information. We may share information with service providers who assist with bookings, payments, or messaging, always under strict confidentiality agreements.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Security</h2>
        <p className="mb-4">We implement reasonable technical and organizational measures to protect personal data, but no method of transmission over the internet is 100% secure.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Your Rights</h2>
        <p className="mb-4">Depending on your jurisdiction, you may request access to, correction, or deletion of your personal information. Contact us using the details below.</p>

        <h2 className="font-serif text-xl font-semibold mt-6 mb-2">Contact</h2>
        <p className="mb-6">For privacy-related requests, email us at privacy@buffalostays.example or message us on WhatsApp.</p>

        <div className="mt-8 flex justify-between">
          <Link href="/" className="text-sm text-brand-text-main/70 hover:underline">Back home</Link>
          <Link href="/terms" className="text-sm text-brand-primary font-bold">Read Terms of Service</Link>
        </div>
      </div>
    </main>
  );
}
