"use client";

import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-50 font-sans min-h-screen py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-lg">
        <header className="border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center">Terms and Conditions</h1>
          <p className="text-center text-sm text-gray-500 mt-2">Last Updated: October 14, 2025</p>
        </header>

        <main className="space-y-8 text-gray-700">
          <p>
            Welcome to Sparky. (“Company”, “we”, “our”, or “us”). These Terms and Conditions (“Terms”) govern the use of our platform, website, and services (“Services”) by customers (“you”, “your”). By accessing or using the Services, you agree to these Terms. If you do not agree with these Terms, please do not use our Services.
          </p>

          {/* Clause Sections */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. OWNERSHIP OF CONTENT</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
              <p>(a) All content available on the Platform, including but not limited to text, graphics, logos, images, videos, software, and trademarks (“Content”), is the sole property of the Company or its licensors.</p>
              <p>(b) You are permitted to use the Content only for personal and non-commercial purposes. Any reproduction, distribution, modification, or use of the Content without prior written consent from the Company is strictly prohibited.</p>
              <p>(c) Unauthorized use of the Content may result in suspension or termination of your access to the Services, and may also attract legal action under applicable laws.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. ACCOUNT CREATION</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) To avail the Services, you are required to create an account on the Platform (“Account”). To create an Account, you must be at least 18 years of age.</p>
                <p>(b) You warrant that all information furnished in connection with your Account is and shall remain accurate and true. You agree to promptly update your details on the Platform in the event of any change to this information.</p>
                <p>(c) You are solely responsible for maintaining the confidentiality of your Account credentials. Any activity carried out through your Account shall be deemed to be undertaken by you.</p>
                <p>(d) You agree to immediately notify us in case of any unauthorized use of your Account. The Company shall not be liable for any losses arising due to such unauthorized use.</p>
                <p>(e) By creating an Account, you agree to receive communications from us regarding (i) payments, (ii) information about the Services, (iii) promotional offers, and (iv) updates relating to your bookings.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. USER RESPONSIBILITIES</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
              <p>(a) You agree to use the Services only for lawful purposes and in compliance with these Terms.</p>
              <p>(b) You may share or repost our Content (such as images or videos) only for personal and non-commercial use, provided proper credit is given to the Company. Commercial use of Content without written consent is prohibited.</p>
              <p>(c) You shall not attempt to copy, resell, reverse engineer, or otherwise misuse the Services or Content, as further stated in Clause 1(b).</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. BOOKING POLICY</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) Services can be booked through the Platform by selecting the required service and confirming the booking details.</p>
                <p>(b) A booking shall be considered confirmed only after you receive a confirmation notification from the Company.</p>
                <p>(c) In case the technician cancels or fails to attend, you are entitled to a full refund or rescheduling of the service.</p>
            </div>
          </section>

           <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. PRICE AND FEES</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) All prices displayed on the Platform are fixed and can be negotiable only according to company rules. Bargaining or attempts to alter the service fee are not permitted.</p>
                <p>(b) Service categories: Prepaid Services: Payment must be made in advance to confirm booking. Postpaid Services: Payment may be made immediately after the completion of service.</p>
                <p>(c) Payments can only be made directly to technicians only in case of some services with the consent of company. As mentioned in Clause 6(b), the Company bears no responsibility for any dispute arising from such payments if there is no such consent of company.</p>
            </div>
          </section>
          
           <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. PAYMENT METHODS</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) Payments may be made via the official payment methods offered on the Platform, including online payments (UPI, cards, wallets, net banking) and, where allowed, cash-on-delivery (“COD”).</p>
                <p>(b) Payments made outside the Platform, including cash payments directly to technicians without any prior consent and information, shall not be the responsibility of the Company. As per Clause 5(c), any disputes or losses in such cases shall be solely borne by the customer.</p>
                <p>(c) The Company reserves the right to modify available payment methods from time to time.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. CUSTOMER BEHAVIOR TOWARDS WORKERS</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) You agree to treat all technicians with dignity and respect. Discrimination, harassment, verbal or physical abuse, or unsafe working conditions will not be tolerated.</p>
                <p>(b) The Company reserves the right to refuse or terminate Services to any customer found engaging in such prohibited conduct.</p>
                <p>(c) Customers are also responsible for ensuring that the technician has safe and reasonable access to the premises.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. SERVICE WARRANTY AND MATERIAL USAGE</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) Unless expressly stated otherwise, the Company does not provide any warranty or guarantee for services once completed.</p>
                <p>(b) If any issue arises after completion, the refund will be only given after proper investigation and according to company refund policy.</p>
                <p>(c) Where third-party materials, tools, or spare parts are used by technicians during service, provided by the customer itself, the Company shall not be held responsible for the quality, performance, or consequences of such materials, as already highlighted under Clause 5(b).</p>
                <p>(d) However, company is fully responsible for materials provided by its own wherever applicable.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. TECHNICIAN VERIFICATION</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) All technicians undergo a two-level verification process before being listed on the Platform: (i) Identity verification via DigiLocker (government-verified ID). (ii) Police verification for background checks.</p>
                <p>(b) While we make reasonable efforts to verify technicians, we do not guarantee their behaviour, or suitability for a particular task.</p>
                <p>(c) The Company acts solely as a facilitator and is not responsible for the technician’s independent actions, as clarified in Clause 10(a).</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">10. LIMITATION OF LIABILITY</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) Technicians are independent contractors and not employees of the Company. The Company’s role is limited to connecting customers with technicians.</p>
                <p>(b) The Company shall not be liable for: Any damage, theft, or loss caused during the service. Any injury, misconduct, or negligence of the technician.</p>
                <p>(c) Our total liability under any claim shall not exceed the amount paid by you for the specific booking in dispute.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">11. NO DIRECT HIRING</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) You agree not to engage or employ technicians directly outside the Platform for future work.</p>
                <p>(b) Any such direct engagement will be considered a breach of these Terms and may result in permanent suspension of your Account.</p>
                <p>(c) The Company reserves the right to claim damages or losses caused by such unauthorized hiring.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">12. DISPUTE RESOLUTION</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>(a) Any complaint or dispute must be reported to the Company within 24 hours of service completion.</p>
                <p>(b) The Company will attempt to mediate between you and the technician to resolve the issue.</p>
                <p>(c) However, ultimate responsibility for service delivery remains with the technician as an independent contractor, as referenced in Clause 10(a).</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">13. PHOTOS, RECORDINGS & MARKETING CONSENT</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>For quality assurance and dispute handling, the Technician or Company may take photos or short videos of the work. By accepting service, Customer consents to such recordings. The Company may use anonymized images for quality control and marketing unless Customer explicitly opts out.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">14. SERVICE AVAILABILITY & GEOGRAPHIC LIMITS</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>Service Area & Availability. Services are available only in selected geographic areas. Availability depends on Technician supply; the Company may decline bookings in areas where no Technician is available.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">15. CUSTOMER RATING, FEEDBACK & PUBLIC REVIEWS</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>Reviews & Feedback. Customers may rate Technicians. The Company may remove reviews that are abusive, false, or unrelated. Customers cannot use ratings to extort refunds.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">16. GOVERNING LAW</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <p>These Terms shall be governed by and construed in accordance with the laws of India without regard to its conflict of law principles.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">17. CHANGES TO TERMS</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
              <p>The Company reserves the right to update these Terms at any time. Updates shall be effective once posted on the Platform. Continued use of the Services after updates constitutes acceptance of the revised Terms. Any Cases, claims, or situations that were considered invalid or false under previous versions of these terms and conditions may now be valid or true following the recent updates. We recommend all users to carefully review the latest terms to understand the current rules and policies.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">18. CONTACT US</h2>
            <div className="space-y-2 pl-4 border-l-2 border-gray-200">
              <p>For any queries, complaints, or clarifications, you may contact us at our official support channels.</p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}