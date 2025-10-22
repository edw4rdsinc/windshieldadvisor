'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function FindInstallersPage() {
  const [zipCode, setZipCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [zipOverride, setZipOverride] = useState('');
  const [showZipOverride, setShowZipOverride] = useState(false);
  const { location, isLoading } = useGeolocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // TODO: Implement actual installer search/lead gen
    console.log('Searching for installers in:', zipCode);
  };

  const handleZipOverride = (e: React.FormEvent) => {
    e.preventDefault();
    setZipOverride(zipCode);
    // TODO: Look up ZIP code and determine service area
    console.log('ZIP override:', zipCode);
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
          {/* Partner Service Area - Show Phone Number */}
          {!isLoading && location?.hasPartner && location.phone ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 mb-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full text-green-600 mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We're in Your Area!
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                {location.name}
              </p>
              <p className="text-gray-600 mb-6">
                {location.serviceArea}
              </p>
              <a
                href={`tel:${location.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center px-12 py-6 bg-accent-orange-500 hover:bg-accent-orange-600 text-white font-bold rounded-lg transition-colors text-2xl shadow-lg hover:shadow-xl mb-4"
              >
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {location.phone}
              </a>
              <p className="text-sm text-gray-600 mb-6">
                Call now for a free quote and same-day service availability
              </p>

              {/* ZIP Override Option */}
              <div className="border-t border-green-200 pt-6 mt-6">
                <button
                  onClick={() => setShowZipOverride(!showZipOverride)}
                  className="text-gray-600 hover:text-gray-800 text-sm underline mb-4"
                >
                  Looking for service in a different area? Enter ZIP code
                </button>

                {showZipOverride && (
                  <form onSubmit={handleZipOverride} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Enter ZIP Code"
                      pattern="[0-9]{5}"
                      required
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-safety-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Check Area
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : !isSubmitted ? (
            <>
              {/* Search Form */}
              <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Find Certified Installers in Your Area
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  If you'd like information on shops in a different area, enter your ZIP code below
                </p>
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
