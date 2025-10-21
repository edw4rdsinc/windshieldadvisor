import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Windshield Advisor',
  description: 'Terms of service for Windshield Advisor',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-500 mb-8">Last Updated: October 21, 2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Windshield Advisor ("the Site"), you agree to be bound by these Terms
            of Service. If you do not agree to these terms, do not use the Site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Service Description</h2>
          <p>
            Windshield Advisor provides educational content about windshield safety, ADAS calibration,
            and repair/replacement standards. We connect users with certified auto glass installers
            through our referral service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. No Professional Advice</h2>
          <p>
            Content on this Site is for informational purposes only and does not constitute professional
            advice. Always consult with qualified technicians for vehicle-specific recommendations. We
            are not liable for decisions made based on information from this Site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Third-Party Installers</h2>
          <p>
            We connect you with independent auto glass shops. We do not directly provide installation
            services. Each installer is an independent business, and we are not responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Quality of installation work</li>
            <li>Pricing or warranty terms</li>
            <li>Customer service issues</li>
            <li>Liability for damages</li>
          </ul>
          <p className="mt-4">
            Any disputes should be resolved directly with the installer. We recommend verifying certifications
            and reviewing shop policies before service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Accuracy of Information</h2>
          <p>
            We strive to provide accurate, research-backed content. However, industry standards and
            regulations change. We do not guarantee complete accuracy or applicability to specific situations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
          <p>
            All content on this Site (text, graphics, logos, white papers) is owned by Windshield Advisor
            or licensed to us. You may not reproduce, distribute, or create derivative works without written
            permission.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Submit false or misleading information</li>
            <li>Use automated systems to access the Site</li>
            <li>Interfere with Site functionality or security</li>
            <li>Violate applicable laws or regulations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WINDSHIELD ADVISOR IS NOT LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE
            OR SERVICES OBTAINED THROUGH INSTALLER REFERRALS.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Indemnification</h2>
          <p>
            You agree to indemnify and hold Windshield Advisor harmless from claims arising from your
            use of the Site or violation of these Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to the Site at our discretion, without
            notice, for conduct violating these Terms or harmful to other users.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. Continued use of the Site after changes constitutes
            acceptance of modified Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Oregon, United States, without regard
            to conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact</h2>
          <p>
            Questions about these Terms? Contact us at:{' '}
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
