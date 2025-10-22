export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Windshield Advisor",
    "url": "https://windshieldadvisor.info",
    "logo": "https://windshieldadvisor.info/logo.png",
    "description": "Research-backed windshield safety information and ADAS calibration guidance. Connect with certified auto glass installers.",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://windshieldadvisor.info/contact"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Windshield Safety and ADAS Calibration Guide",
    "description": "Your vehicle's windshield provides up to 60% of roof strength, supports airbag deployment, and houses the camera required for Advanced Driver Assistance Systems. After replacement, ADAS recalibration is mandatory—not optional.",
    "url": "https://windshieldadvisor.info",
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": "ADAS Calibration",
      "description": "Advanced Driver Assistance Systems calibration for windshield replacement"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do all cars need ADAS calibration after windshield replacement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Only vehicles with ADAS features (automatic emergency braking, lane keeping assist, adaptive cruise control) require calibration. Approximately 90% of 2018+ vehicles, 60% of 2015-2017 vehicles, and 20% of 2010-2014 vehicles have ADAS."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between OEM and aftermarket glass?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "OEM glass is made by the original supplier using exact specifications. Aftermarket is made by third parties with looser tolerances. OEM has 23% fewer calibration failures according to 2023 research. Both meet federal minimums, but OEM meets vehicle-specific engineering requirements."
          }
        },
        {
          "@type": "Question",
          "name": "Can windshield damage be repaired or does it need replacement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Repairable if: chip <1 inch, crack <14 inches, outside driver view and ADAS zone, not at edge. Requires replacement if: in ADAS camera area, driver's sight line, at edge, or 3+ damage points."
          }
        },
        {
          "@type": "Question",
          "name": "How much does replacement with ADAS calibration cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Total costs: $450-$1,600 depending on vehicle, glass type (OEM vs aftermarket), and calibration complexity. Many comprehensive policies cover with zero/low deductible. Three states (FL, KY, SC) mandate $0 deductible by law."
          }
        },
        {
          "@type": "Question",
          "name": "How do I find a qualified shop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Look for: AGSC-certified technicians, in-house ADAS equipment (not outsourced), climate-controlled facility, OEM/premium glass, written warranty. Our Find Installers tool connects you only with shops meeting all criteria."
          }
        },
        {
          "@type": "Question",
          "name": "Is mobile windshield replacement safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mobile service adds risk: temperature-sensitive adhesive curing, calibration requires level surface, uncontrolled outdoor conditions, no climate control. In-shop installation recommended for ADAS-equipped vehicles."
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Find ADAS-Certified Windshield Installers",
    "description": "Step-by-step guide to finding certified windshield installers who meet ADAS calibration standards",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Learn the Standards",
        "text": "Access research-backed information on windshield safety, ADAS calibration, and industry standards. Understand what makes a quality installation."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Assess Your Needs",
        "text": "Get personalized guidance based on your vehicle, damage type, and safety system requirements. Know exactly what to ask for."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Find Certified Shops",
        "text": "Connect with installers in the Vero Verified Network—shops meeting strict standards for ADAS calibration and technician certification."
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
