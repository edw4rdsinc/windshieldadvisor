import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop Certification Requirements | Windshield Advisor',
  description: 'Learn about the certification requirements for joining the Vero Verified Network',
};

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-safety-blue-900 to-safety-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Vero Verified Network: Certification Requirements
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            The standards that separate certified professionals from basic installers
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mandatory Requirements</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              All shops in the Vero Verified Network must meet the following requirements:
            </p>

            <div className="space-y-6 mb-12">
              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  1. AGSC-Certified Technicians
                </h3>
                <p className="text-gray-700">
                  At least one technician must hold current Auto Glass Safety Council (AGSC)
                  certification, demonstrating comprehensive knowledge of:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Proper installation procedures</li>
                  <li>Adhesive chemistry and SDAT compliance</li>
                  <li>ADAS system requirements</li>
                  <li>Federal safety standards (FMVSS 216, 208)</li>
                </ul>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  2. In-House ADAS Calibration Equipment
                </h3>
                <p className="text-gray-700">
                  Shop must own or lease professional-grade ADAS calibration equipment. Shops that
                  outsource calibration to third parties do not qualify.
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>OEM-specific calibration targets and tools</li>
                  <li>Diagnostic scan tools for all major vehicle brands</li>
                  <li>Level floor with variance &lt;1.5 degrees for static calibration</li>
                </ul>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  3. Climate-Controlled Facility
                </h3>
                <p className="text-gray-700">
                  Installation bay must maintain consistent temperature (60-100°F) for proper
                  adhesive curing. Mobile-only services do not qualify.
                </p>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  4. OEM or OEM-Equivalent Glass Standards
                </h3>
                <p className="text-gray-700">
                  Shop must stock or source OEM glass or certified OEM-equivalent glass meeting
                  vehicle manufacturer optical specifications.
                </p>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  5. Proper Insurance Coverage
                </h3>
                <p className="text-gray-700">
                  Current general liability and garage liability insurance with minimum $1M coverage.
                </p>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  6. SDAT Compliance
                </h3>
                <p className="text-gray-700">
                  Shop must follow Safe Drive Away Time (SDAT) protocols, ensuring vehicles are not
                  released before adhesive reaches minimum bond strength.
                </p>
              </div>

              <div className="border-l-4 border-safety-blue-500 pl-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  7. Customer Transparency
                </h3>
                <p className="text-gray-700">
                  Written estimates disclosing glass type (OEM vs. aftermarket), warranty terms,
                  and calibration requirements before service.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Application Process</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Interested shops must submit documentation demonstrating compliance with all requirements:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>AGSC certification credentials (current, unexpired)</li>
              <li>Proof of ADAS equipment ownership or lease agreement</li>
              <li>Photos of climate-controlled facility</li>
              <li>Insurance certificates of liability coverage</li>
              <li>Sample customer estimate showing transparency requirements</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Ongoing Compliance</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Network members are subject to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
              <li>Annual renewal of AGSC certifications</li>
              <li>Random third-party quality audits</li>
              <li>Customer satisfaction monitoring</li>
              <li>Immediate suspension for safety violations</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-safety-blue-500 p-6 rounded-r-lg mt-12">
              <h3 className="font-bold text-gray-900 mb-2">Why These Standards?</h3>
              <p className="text-gray-700">
                Unlike most trades, auto glass technicians face no mandatory state licensing. Anyone
                can start a glass business with minimal training. These certification requirements
                ensure vehicle owners connect with shops that prioritize safety over speed and cost-cutting.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-safety-blue-600 hover:bg-safety-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Contact Us About Certification
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
