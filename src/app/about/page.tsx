import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Windshield Advisor',
  description: 'Learn about Windshield Advisor\'s mission to provide research-backed windshield safety information',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Windshield Advisor</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            We provide research-backed information to help vehicle owners make informed decisions
            about windshield safety and ADAS calibration.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Modern windshields are safety-critical components housing ADAS cameras that require
              precise calibration after replacement. Yet most vehicle owners don't know calibration
              is necessary, and many shops lack proper equipment or training.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Windshield Advisor was created to bridge this knowledge gap. We translate complex
              technical standards (FMVSS 216, FMVSS 208, ROLAGS, SDAT) into actionable guidance
              for everyday vehicle owners.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">What We Do</h2>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Educational Content</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our white paper library covers every aspect of windshield safety, from ADAS calibration
              requirements to OEM vs. aftermarket glass comparison. All content is based on published
              research from IIHS, SAE International, and industry standards organizations.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Safety Assessments</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our interactive quizzes help you determine if existing damage is safe, whether your
              vehicle needs ADAS calibration, and if your installer meets certification standards.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Certified Installer Network</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We connect you with shops in the Vero Verified Network—installers who have:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>AGSC-certified technicians</li>
              <li>In-house ADAS calibration equipment</li>
              <li>Climate-controlled facilities for proper adhesive curing</li>
              <li>OEM or OEM-equivalent glass standards</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">What We're Not</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>We are not an auto glass shop.</strong> We don't perform installations or
              repairs. We're an independent information source.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>We are not affiliated with insurance companies.</strong> Our content is
              research-based, not influenced by insurance industry perspectives.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>We don't provide vehicle-specific advice.</strong> Always consult with
              certified technicians for recommendations based on your specific vehicle and damage.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Why This Matters</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              According to IIHS research, a camera misaligned by just 0.6 degrees reduces automatic
              braking reaction time by 60%—from 1.5 seconds to 0.6 seconds. That's the difference
              between avoiding a collision and a serious accident.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Uncalibrated ADAS systems typically don't trigger warning lights, creating "silent
              failures" where drivers remain unaware of malfunction. This is a serious safety issue
              that most consumers don't know exists.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our goal is simple: ensure every vehicle owner knows that ADAS calibration is mandatory
              after windshield replacement and has the tools to find qualified installers.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/safety-guides"
                className="inline-flex items-center justify-center px-8 py-4 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Read Our Safety Guides
              </Link>
              <Link
                href="/find-installers"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-safety-blue-600 border-2 border-safety-blue-600 font-semibold rounded-lg transition-colors"
              >
                Find Certified Installers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
