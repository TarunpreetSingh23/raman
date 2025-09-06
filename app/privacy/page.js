'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-[100px] pb-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: August 5, 2025</p>

        <div className="divide-y divide-gray-200 space-y-10">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to <strong>Shop On</strong>. We respect your privacy and are committed to protecting the personal information you share with us.
            </p>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">2. Information We Collect</h2>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
              <li><strong>Personal Info:</strong> Name, email, address, phone, payment details.</li>
              <li><strong>Device Info:</strong> IP, browser type, time zone, cookies.</li>
              <li><strong>Order Info:</strong> Viewed items, cart data, purchase history.</li>
            </ul>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
              <li>Process orders and manage accounts.</li>
              <li>Send updates and order confirmations.</li>
              <li>Improve our services and website experience.</li>
              <li>Detect fraud and secure our platform.</li>
            </ul>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">4. Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We share your information only with trusted third parties (e.g., payment providers, shipping carriers) necessary for order fulfillment. We never sell your data.
            </p>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">5. Your Rights</h2>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
              <li>Access or request a copy of your data.</li>
              <li>Update or correct your information.</li>
              <li>Request deletion of your account.</li>
              <li>Opt out of marketing emails.</li>
            </ul>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We use modern encryption and security measures to protect your personal data, but no system is 100% secure.
            </p>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">7. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies help us personalize your shopping experience. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">8. Policy Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy occasionally. Changes will be posted here with an updated date.
            </p>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              Questions? Reach out to us at: <br />
              <a href="mailto:support@shopon.com" className="text-blue-600 underline">support@shopon.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
