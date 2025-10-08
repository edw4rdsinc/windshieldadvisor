import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Windshield Safety and ADAS Calibration Guide | Windshield Advisor',
  description: 'Your vehicle\'s windshield provides up to 60% of roof strength, supports airbag deployment, and houses the camera required for Advanced Driver Assistance Systems. After replacement, ADAS recalibration is mandatory—not optional.',
  keywords: 'ADAS calibration, windshield replacement, windshield safety, auto glass, OEM glass, aftermarket glass, certified installer, lane keeping assist, automatic emergency braking',
  openGraph: {
    title: 'Windshield Safety and ADAS Calibration Guide',
    description: 'Research-backed windshield safety guidance and ADAS calibration information. Connect with certified installers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windshield Safety and ADAS Calibration Guide',
    description: 'Research-backed windshield safety guidance and ADAS calibration information.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: Hero & AI-Optimized Introduction */}
      <section className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-16 md:py-24 animate-fade-in-down">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Windshield Safety and ADAS Calibration Guide
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed animate-fade-in-up animation-delay-100">
            Your vehicle's windshield provides up to 60% of roof strength, supports
            airbag deployment, and houses the camera required for Advanced Driver
            Assistance Systems. After replacement, ADAS recalibration is mandatory—
            not optional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up animation-delay-200">
            <Link
              href="/quizzes"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-orange-500 hover:bg-accent-orange-600 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Take the Safety Quiz →
            </Link>
            <Link
              href="/find-installers"
              className="inline-flex items-center justify-center px-8 py-4 text-blue-100 hover:text-white font-medium transition-colors text-lg underline"
            >
              Find certified installers
            </Link>
          </div>
        </div>
      </section>

      {/* AI-Optimized Content Block */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              A modern automotive windshield is a structural safety component that
              provides up to 60% of a vehicle's roof strength in rollover accidents
              (FMVSS 216), serves as a backstop for passenger airbag deployment
              (FMVSS 208), and houses the forward-facing camera required for Advanced
              Driver Assistance Systems (ADAS).
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              ADAS calibration after windshield replacement is mandatory for vehicles
              equipped with automatic emergency braking, lane keeping assist, or adaptive
              cruise control. Research from the Insurance Institute for Highway Safety
              (IIHS) shows that a camera misaligned by just 1 degree will have its focal
              point shifted by 8 feet at a distance of 100 feet. This misalignment causes
              safety system failures without triggering dashboard warning lights.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              Safe windshield replacement requires: (1) proper urethane adhesive curing
              at correct temperature (SDAT compliance), (2) OEM or OEM-equivalent glass
              meeting vehicle manufacturer optical specifications, and (3) ADAS
              recalibration by AGSC-certified technicians using manufacturer-specified
              procedures.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 mb-8">
              This guide provides research-backed information on windshield safety
              standards, ADAS calibration requirements, repair vs. replacement criteria,
              OEM vs. aftermarket glass comparison, and certified installer selection.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-gray-900 mb-3">Jump to:</h3>
            <ul className="space-y-2 text-safety-blue-700">
              <li><a href="#adas-calibration" className="hover:underline">• ADAS Calibration Requirements</a></li>
              <li><a href="#repair-vs-replace" className="hover:underline">• When to Repair vs. Replace</a></li>
              <li><a href="#oem-vs-aftermarket" className="hover:underline">• OEM vs. Aftermarket Glass</a></li>
              <li><a href="#certified-installers" className="hover:underline">• Certified Installer Standards</a></li>
              <li><a href="#find-installers" className="hover:underline">• Find ADAS-Certified Installers</a></li>
            </ul>
          </div>

          {/* What is ADAS Calibration */}
          <div id="adas-calibration" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What is ADAS Calibration and Why Is It Required?
            </h2>

            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              ADAS (Advanced Driver Assistance Systems) calibration is the process of
              electronically adjusting a vehicle's forward-facing camera after windshield
              replacement to ensure precise alignment required for safety system
              functionality.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Calibration Types:</h3>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Static Calibration:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Performed in controlled shop environment</li>
                  <li>• Requires perfectly level floor (variance &lt;1.5 degrees)</li>
                  <li>• Uses manufacturer-specific targets at exact distances</li>
                  <li>• Duration: 30-90 minutes</li>
                </ul>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Dynamic Calibration:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Performed while driving on marked roads</li>
                  <li>• Requires specific speeds (25-65 mph)</li>
                  <li>• Duration: 15-30 minutes</li>
                  <li>• System recalibrates using lane markings</li>
                </ul>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Hybrid Calibration:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Many 2020+ vehicles require both methods</li>
                  <li>• Total time: 45-120 minutes</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehicles Requiring Calibration:</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• 2018+ vehicles: ~90% have ADAS</li>
              <li>• 2015-2017: ~60% have ADAS</li>
              <li>• 2010-2014: ~20% have ADAS</li>
            </ul>

            <p className="text-lg font-semibold text-gray-900 mb-3">Required for vehicles with:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• Automatic Emergency Braking (AEB)</li>
              <li>• Lane Departure Warning (LDW)</li>
              <li>• Lane Keeping Assist (LKA)</li>
              <li>• Adaptive Cruise Control (ACC)</li>
              <li>• Traffic Sign Recognition</li>
            </ul>
          </div>

          {/* What Happens Without Calibration */}
          <div className="mb-12 bg-red-50 border-l-4 border-red-500 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What Happens Without Proper Calibration?
            </h2>

            <p className="text-lg leading-relaxed text-gray-800 mb-6">
              Uncalibrated ADAS systems create "silent failures"—systems appear
              to function but operate with dangerously inaccurate data:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">Failure Modes:</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Automatic braking fails to detect stopped vehicles</li>
              <li>• False "phantom braking" from misidentified objects</li>
              <li>• Lane keeping provides incorrect steering input</li>
              <li>• System may steer toward oncoming traffic</li>
            </ul>

            <div className="bg-white border border-red-300 rounded-lg p-6 mb-6">
              <p className="font-bold text-red-700 mb-2">CRITICAL ISSUE:</p>
              <p className="text-gray-800">
                Miscalibrated systems typically do NOT trigger dashboard warning
                lights. Drivers remain unaware of malfunction.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-900 mb-2">IIHS RESEARCH:</p>
                <p className="text-gray-800">
                  0.6-degree camera misalignment reduces automatic braking reaction
                  time by 60%—from 1.5 seconds to 0.6 seconds.
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-900 mb-2">LEGAL LIABILITY:</p>
                <p className="text-gray-800">
                  Shops failing to perform manufacturer-mandated calibration face
                  potential liability exceeding $1 million in accident settlements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Featured Quizzes */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Take a 2-Minute Safety Assessment
            </h2>
            <p className="text-xl text-gray-600">
              Get personalized guidance based on your vehicle and situation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Quiz Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow relative">
              <div className="absolute top-4 right-4">
                <span className="bg-accent-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ⭐ MOST POPULAR
                </span>
              </div>

              <div className="text-safety-blue-600 mb-6">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Is My Windshield Safe?
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Get instant assessment of existing damage and safety risks. Find out if you need
                repair, replacement, or can safely wait.
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>2-3 minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📝</span>
                  <span>7 questions</span>
                </div>
              </div>

              <Link
                href="/quizzes/windshield-safety"
                className="block w-full text-center px-6 py-3 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Start Assessment →
              </Link>
            </div>

            {/* Quiz Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-safety-blue-600 mb-6">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Does My Car Need ADAS Calibration?
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Find out if your safety systems are working properly after windshield replacement.
                Learn miscalibration signs.
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>3-4 minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📝</span>
                  <span>8 questions</span>
                </div>
              </div>

              <Link
                href="/quizzes/adas-calibration"
                className="block w-full text-center px-6 py-3 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Start Quiz →
              </Link>
            </div>

            {/* Quiz Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-safety-blue-600 mb-6">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Should I Repair or Replace?
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Understand safety and cost implications. Learn which damage can be safely repaired
                and when replacement is needed.
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>2 minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📝</span>
                  <span>5 questions</span>
                </div>
              </div>

              <Link
                href="/quizzes/repair-replace"
                className="block w-full text-center px-6 py-3 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Start Quiz →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How We Help You Make Safe Decisions
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Column 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full text-safety-blue-600 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Learn the Standards</h3>
              <p className="text-gray-600 leading-relaxed">
                Access research-backed information on windshield safety, ADAS
                calibration, and industry standards. Understand what makes a quality
                installation.
              </p>
            </div>

            {/* Column 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full text-safety-blue-600 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Assess Your Needs</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized guidance based on your vehicle, damage type, and
                safety system requirements. Know exactly what to ask for.
              </p>
            </div>

            {/* Column 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full text-safety-blue-600 mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Find Certified Shops</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with installers in the Vero Verified Network—shops
                meeting strict standards for ADAS calibration and technician
                certification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Lead Gen Section */}
      <section id="find-installers" className="py-20 bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Windshield Replacement?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get free quotes from ADAS-certified installers who meet the
            highest safety standards—no obligation, no pressure.
          </p>

          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-xl mx-auto mb-8">
            <h3 className="text-gray-900 font-semibold mb-4 text-lg">
              WHERE DO YOU NEED SERVICE?
            </h3>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter ZIP Code"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-safety-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-accent-orange-500 hover:bg-accent-orange-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Get Free Quotes →
              </button>
            </form>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-blue-100">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Vero Verified Network</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>AGSC Certified Technicians</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>In-House ADAS Equipment</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>OEM Glass Standards</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:col-span-2 md:col-span-1">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Climate-Controlled Facilities</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Featured White Papers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Complete Windshield Safety Library
            </h2>
            <p className="text-xl text-gray-600">
              Research-backed guides covering every aspect of windshield safety,
              from ADAS calibration to choosing certified installers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* White Paper Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-safety-blue-100 text-safety-blue-700 text-xs font-bold px-3 py-1 rounded">
                  WHITE PAPER
                </span>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded">
                  ⭐ CRITICAL
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ADAS Calibration After Windshield Replacement
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Why recalibration is mandatory, not optional. The "one degree =
                8 feet off target" principle and how to verify proper calibration.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📖 15 min read</span>
                <Link
                  href="/safety-guides/adas-calibration-mandatory"
                  className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold"
                >
                  Read Full Guide →
                </Link>
              </div>
            </div>

            {/* White Paper Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-safety-blue-100 text-safety-blue-700 text-xs font-bold px-3 py-1 rounded">
                  WHITE PAPER
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3" id="oem-vs-aftermarket">
                OEM vs. Aftermarket Windshields: A Safety Analysis
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Material and manufacturing differences impacting ADAS. Why
                23% of aftermarket glass fails calibration.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📖 18 min read</span>
                <Link
                  href="/safety-guides/oem-vs-aftermarket"
                  className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold"
                >
                  Read Full Guide →
                </Link>
              </div>
            </div>

            {/* White Paper Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-safety-blue-100 text-safety-blue-700 text-xs font-bold px-3 py-1 rounded">
                  WHITE PAPER
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3" id="repair-vs-replace">
                When to Repair vs. Replace Your Windshield
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                ROLAGS™ repairability standards, why repair preserves factory seal,
                and DIY repair kit dangers.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📖 12 min read</span>
                <Link
                  href="/safety-guides/repair-vs-replace"
                  className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold"
                >
                  Read Full Guide →
                </Link>
              </div>
            </div>

            {/* White Paper Card 4 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-safety-blue-100 text-safety-blue-700 text-xs font-bold px-3 py-1 rounded">
                  WHITE PAPER
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3" id="certified-installers">
                How to Choose a Windshield Replacement Company
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                The 7 certifications every shop must have, red flags indicating
                unsafe practices, and critical questions to ask.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📖 14 min read</span>
                <Link
                  href="/safety-guides/choosing-installer"
                  className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold"
                >
                  Read Full Guide →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/safety-guides"
              className="inline-flex items-center text-safety-blue-600 hover:text-safety-blue-700 font-semibold text-lg"
            >
              VIEW ALL 10 SAFETY GUIDES →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: Trust/Authority Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            Why Certification Matters
          </h2>

          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Safe windshield replacement requires specialized knowledge and equipment
            that most shops don't have. Unlike licensed trades, auto glass technicians
            face no mandatory certification requirements.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Stat Box 1 */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">60%</div>
              <div className="text-gray-700 font-medium">of shops</div>
              <div className="text-gray-600 mt-2">lack ADAS calibration equipment</div>
            </div>

            {/* Stat Box 2 */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">73%</div>
              <div className="text-gray-700 font-medium">of technicians</div>
              <div className="text-gray-600 mt-2">never received ADAS training</div>
            </div>

            {/* Stat Box 3 */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">$1M+</div>
              <div className="text-gray-700 font-medium">settlements</div>
              <div className="text-gray-600 mt-2">from miscalibration accidents</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              This is why AGSC certification matters. Certified technicians pass
              comprehensive exams on installation procedures, adhesive chemistry,
              and ADAS requirements. They're subject to random third-party audits.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              The Vero Verified Network requires in-house ADAS equipment,
              climate-controlled facilities, and adherence to OEM specifications
              for every installation.
            </p>

            <Link
              href="/find-installers"
              className="inline-flex items-center px-8 py-4 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              FIND CERTIFIED INSTALLERS →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: All White Papers Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Explore the Complete Research Library
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cards 1-4 are featured above, cards 5-10 here */}

            {/* Card 5 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-safety-blue-600 mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                The Science Behind Windshield Lamination
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                How PVB interlayer technology creates structural integrity and prevents ejection.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">📖 10 min read</span>
                <Link href="/safety-guides/lamination-science" className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold">
                  Read →
                </Link>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-safety-blue-600 mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Temperature's Impact on Windshield Installation
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Why SDAT compliance matters and how temperature affects adhesive curing time.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">📖 11 min read</span>
                <Link href="/safety-guides/temperature-impact" className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold">
                  Read →
                </Link>
              </div>
            </div>

            {/* Card 7 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-safety-blue-600 mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Understanding Windshield Insurance & Warranties
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Coverage differences, zero-deductible states, and what warranties actually cover.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">📖 13 min read</span>
                <Link href="/safety-guides/insurance-warranties" className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold">
                  Read →
                </Link>
              </div>
            </div>

            {/* Card 8 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-safety-blue-600 mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                The Windshield's Role in Vehicle Safety Systems
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Roof strength, airbag deployment, and how windshields integrate with safety systems.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">📖 16 min read</span>
                <Link href="/safety-guides/safety-systems-role" className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold">
                  Read →
                </Link>
              </div>
            </div>

            {/* Card 9 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-safety-blue-600 mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                The Future of Windshield Technology
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Heads-up displays, acoustic interlayers, heated glass, and emerging innovations.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">📖 12 min read</span>
                <Link href="/safety-guides/future-technology" className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold">
                  Read →
                </Link>
              </div>
            </div>

            {/* Card 10 */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="text-safety-blue-600 mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Environmental Benefits of Windshield Recycling
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Glass recycling processes, environmental impact, and sustainable disposal practices.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">📖 9 min read</span>
                <Link href="/safety-guides/recycling-environmental" className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold">
                  Read →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Do all cars need ADAS calibration after windshield replacement?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Only vehicles with ADAS features (automatic emergency braking,
                lane keeping assist, adaptive cruise control) require calibration.
                Approximately 90% of 2018+ vehicles, 60% of 2015-2017 vehicles,
                and 20% of 2010-2014 vehicles have ADAS.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                What's the difference between OEM and aftermarket glass?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                OEM glass is made by the original supplier using exact
                specifications. Aftermarket is made by third parties with
                looser tolerances. OEM has 23% fewer calibration failures
                according to 2023 research. Both meet federal minimums,
                but OEM meets vehicle-specific engineering requirements.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Can windshield damage be repaired or does it need replacement?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Repairable if: chip &lt;1", crack &lt;14", outside driver view
                and ADAS zone, not at edge. Requires replacement if: in ADAS
                camera area, driver's sight line, at edge, or 3+ damage points.
                Take our quiz for personalized assessment.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                How much does replacement with ADAS calibration cost?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Total costs: $450-$1,600 depending on vehicle, glass type
                (OEM vs aftermarket), and calibration complexity. Many
                comprehensive policies cover with zero/low deductible.
                Three states (FL, KY, SC) mandate $0 deductible by law.
              </p>
            </details>

            {/* FAQ Item 5 */}
            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                How do I find a qualified shop?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Look for: AGSC-certified technicians, in-house ADAS
                equipment (not outsourced), climate-controlled facility,
                OEM/premium glass, written warranty. Our Find Installers
                tool connects you only with shops meeting all criteria.
              </p>
            </details>

            {/* FAQ Item 6 */}
            <details className="bg-gray-50 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Is mobile windshield replacement safe?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Mobile service adds risk: temperature-sensitive adhesive
                curing, calibration requires level surface, uncontrolled
                outdoor conditions, no climate control. In-shop installation
                recommended for ADAS-equipped vehicles.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA */}
      <section className="py-20 bg-gradient-to-r from-safety-blue-800 to-safety-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Protect Your Vehicle's Safety Systems
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't trust your car's safety features to just anyone. Connect
            with ADAS-certified installers who meet the highest standards
            for windshield replacement and calibration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/find-installers"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-orange-500 hover:bg-accent-orange-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Find Certified Installers →
            </Link>
            <Link
              href="/quizzes"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-safety-blue-900 font-semibold rounded-lg transition-colors text-lg"
            >
              Take Safety Quiz →
            </Link>
          </div>

          <p className="text-sm text-blue-200">
            Free quotes • No obligation • Privacy protected
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">WINDSHIELD ADVISOR</h3>
              <p className="text-sm text-gray-400">
                Research-backed windshield safety information
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-white font-semibold mb-4">Safety Quizzes</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/quizzes/windshield-safety" className="hover:text-white">Is My Windshield Safe?</Link></li>
                <li><Link href="/quizzes/adas-calibration" className="hover:text-white">ADAS Calibration</Link></li>
                <li><Link href="/quizzes/repair-replace" className="hover:text-white">Repair or Replace?</Link></li>
                <li><Link href="/quizzes/installer-qualified" className="hover:text-white">Installer Check</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/resources/glossary" className="hover:text-white">Glossary</Link></li>
                <li><Link href="/resources/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/resources/state-laws" className="hover:text-white">State Insurance Laws</Link></li>
                <li><Link href="/resources/certifications" className="hover:text-white">Certification Directory</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">Our Mission</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/about/certifications" className="hover:text-white">Shop Certification</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p className="mb-2">© 2025 Windshield Advisor</p>
            <p className="text-gray-500">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              {' | '}
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </p>
            <p className="text-gray-500 mt-2">
              Not affiliated with any glass shop or insurance company
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
