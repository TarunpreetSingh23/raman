'use client';

import React from 'react';

export default function ShippingAndReturnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white pt-[100px] pb-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4 tracking-tight">
          Shipping & Return Policy
        </h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: August 5, 2025</p>

        <div className="divide-y divide-gray-200 space-y-10">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">1. Shipping Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We at <strong>Shop On</strong> are committed to delivering your order as quickly and safely as possible. Below are the shipping details:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
              <li><strong>Shipping Time:</strong> Orders are usually processed within 1–2 business days.</li>
              <li><strong>Delivery Estimates:</strong> Delivery typically takes 3–7 business days depending on your location.</li>
              <li><strong>Shipping Partners:</strong> We use reliable logistics providers for domestic shipping.</li>
              <li><strong>Tracking:</strong> You will receive a tracking number via email after your order is dispatched.</li>
            </ul>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">2. Delivery Charges</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Standard Shipping:</strong> Delivery Charges of $40.<br />
              {/* <strong>Below $50:</strong> A flat shipping fee of $4.99 may apply depending on your location. */}
            </p>
          </section>

          <section className="pt-10 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">3. Return Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Currently, <strong>Shop On does not support returns or exchanges</strong>. We are working toward building a customer-friendly return process in the near future.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you receive a damaged or incorrect product, please contact us immediately, and we will investigate the issue and offer a resolution.
            </p>
            <p className="text-blue-700 font-medium">
              For any concerns, email us at <a href="mailto:support@shopon.com" className="underline">support@shopon.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
