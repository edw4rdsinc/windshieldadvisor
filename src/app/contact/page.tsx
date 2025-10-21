import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Windshield Advisor',
  description: 'Get in touch with Windshield Advisor',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Have questions about windshield safety or need help finding a certified installer?
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">General Inquiries</h3>
                  <p className="text-gray-700">
                    For questions about our content, the Vero Verified Network, or partnership
                    opportunities.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Shop Certification</h3>
                  <p className="text-gray-700">
                    Auto glass shops interested in joining the Vero Verified Network should verify
                    they meet all certification requirements before inquiring.
                  </p>
                  <Link
                    href="/about/certifications"
                    className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold inline-block mt-2"
                  >
                    View Certification Requirements →
                  </Link>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy Requests</h3>
                  <p className="text-gray-700">
                    To exercise your privacy rights (access, correction, deletion), please review
                    our Privacy Policy.
                  </p>
                  <Link
                    href="/privacy"
                    className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold inline-block mt-2"
                  >
                    View Privacy Policy →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Links */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h3>

              <div className="space-y-4">
                <Link
                  href="/quizzes"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-gray-900 mb-1">Take a Safety Quiz</h4>
                  <p className="text-sm text-gray-600">Get personalized guidance in 2 minutes</p>
                </Link>

                <Link
                  href="/safety-guides"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-gray-900 mb-1">Read Safety Guides</h4>
                  <p className="text-sm text-gray-600">Research-backed white papers</p>
                </Link>

                <Link
                  href="/find-installers"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-gray-900 mb-1">Find Certified Installers</h4>
                  <p className="text-sm text-gray-600">Connect with Vero Verified shops</p>
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Business Hours</h4>
                <p className="text-gray-700 text-sm">
                  Monday - Friday: 9:00 AM - 5:00 PM PST<br />
                  Saturday - Sunday: Closed
                </p>
                <p className="text-gray-600 text-sm mt-4">
                  We typically respond to inquiries within 1-2 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Note About Installer Services */}
          <div className="mt-12 bg-blue-50 border-l-4 border-safety-blue-500 p-6 rounded-r-lg">
            <h3 className="font-bold text-gray-900 mb-2">Looking for Windshield Service?</h3>
            <p className="text-gray-700 mb-4">
              We are an educational resource and do not directly provide installation services.
              To find certified installers in your area:
            </p>
            <Link
              href="/find-installers"
              className="inline-flex items-center px-6 py-3 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Find Local Installers →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
