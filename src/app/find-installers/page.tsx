'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FindInstallersPage() {
  const [zipCode, setZipCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // TODO: Implement actual installer search/lead gen
    console.log('Searching for installers in:', zipCode);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find ADAS-Certified Installers
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Connect with shops in the Vero Verified Network—certified installers
            meeting the highest standards for windshield safety and ADAS calibration
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {!isSubmitted ? (
            <>
              {/* Search Form */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Enter Your Location
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP Code"
                    pattern="[0-9]{5}"
                    required
                    className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-safety-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-accent-orange-500 hover:bg-accent-orange-600 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
                  >
                    Find Installers →
                  </button>
                </form>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Vero Verified Network</h3>
                  <p className="text-gray-600">Only shops meeting strict certification standards</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">AGSC Certified Technicians</h3>
                  <p className="text-gray-600">Trained professionals with proven expertise</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">In-House ADAS Equipment</h3>
                  <p className="text-gray-600">Professional calibration, not outsourced</p>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-blue-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="flex gap-3">
                    <span className="text-safety-blue-600 font-bold">1.</span>
                    <p>We'll connect you with 2-3 certified installers in your area</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-safety-blue-600 font-bold">2.</span>
                    <p>Each shop will contact you directly with a free quote</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-safety-blue-600 font-bold">3.</span>
                    <p>Compare quotes, certifications, and availability</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-safety-blue-600 font-bold">4.</span>
                    <p>Choose the installer that best meets your needs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-6 border-t border-blue-200 pt-4">
                  <strong>No obligation.</strong> Receive quotes, ask questions, and decide when you're ready.
                </p>
              </div>
            </>
          ) : (
            /* Thank You Message */
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full text-green-600 mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h2>
              <p className="text-lg text-gray-700 mb-6">
                We're connecting you with certified installers in your area. You'll receive
                quotes via email within 1-2 business days.
              </p>
              <div className="bg-white rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  While you wait, learn more about what makes a quality installation:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/safety-guides/mandatory-adas-calibration-windshield-replacement"
                    className="px-6 py-3 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    ADAS Calibration Guide
                  </Link>
                  <Link
                    href="/about/certifications"
                    className="px-6 py-3 bg-white hover:bg-gray-50 text-safety-blue-600 border-2 border-safety-blue-600 font-semibold rounded-lg transition-colors"
                  >
                    Certification Requirements
                  </Link>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold underline"
              >
                ← Search another location
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Certification Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">60%</div>
              <div className="text-gray-700">of shops lack ADAS calibration equipment</div>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">73%</div>
              <div className="text-gray-700">of technicians never received ADAS training</div>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">$1M+</div>
              <div className="text-gray-700">settlements from miscalibration accidents</div>
            </div>
          </div>

          <p className="text-center text-gray-700 text-lg">
            The Vero Verified Network ensures every installer meets strict standards for
            equipment, training, and facility quality—protecting your safety and your investment.
          </p>
        </div>
      </section>
    </div>
  );
}
