import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Windshield Advisor',
  description: 'Privacy policy for Windshield Advisor',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-500 mb-8">Last Updated: October 21, 2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p>
            Windshield Advisor ("we," "our," or "us") collects information to provide you with
            educational content and connect you with certified windshield installation services.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact information (name, email, phone number, ZIP code) when requesting quotes</li>
            <li>Vehicle information provided during quiz assessments</li>
            <li>Damage details and service preferences</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser type, device information, and IP address</li>
            <li>Pages visited and time spent on the site</li>
            <li>Referral sources and search terms</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Connect you with certified windshield installation shops</li>
            <li>Send quiz results and personalized recommendations via email</li>
            <li>Improve our content and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing</h2>
          <p>We share your information only with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Certified Installers:</strong> When you request quotes, we share your contact information
            and service details with shops in our Vero Verified Network</li>
            <li><strong>Service Providers:</strong> Email delivery services (Resend) and analytics providers</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
          <p className="mt-4">
            <strong>We do not sell your personal information to third parties.</strong>
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to improve site functionality and analyze usage patterns.
            You can control cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no internet
            transmission is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect information
            from children.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update this privacy policy periodically. Changes will be posted on this page with an
            updated "Last Updated" date.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p>
            For privacy-related questions or to exercise your rights, contact us at:{' '}
            <Link href="/contact" className="text-safety-blue-600 hover:text-safety-blue-700 underline">
              Contact Page
            </Link>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            href="/"
            className="text-safety-blue-600 hover:text-safety-blue-700 font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
