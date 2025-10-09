import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Windshield Advisor | ADAS Calibration & Safety Guide',
    template: '%s | Windshield Advisor',
  },
  description: 'Research-backed windshield safety guidance and ADAS calibration information. Connect with certified installers for safe windshield replacement.',
  keywords: ['windshield replacement', 'ADAS calibration', 'auto glass', 'windshield safety', 'OEM glass', 'certified installer'],
  authors: [{ name: 'Windshield Advisor' }],
  creator: 'Windshield Advisor',
  publisher: 'Windshield Advisor',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Windshield Advisor',
    title: 'Windshield Advisor | ADAS Calibration & Safety Guide',
    description: 'Research-backed windshield safety guidance and ADAS calibration information.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Windshield Advisor | ADAS Calibration & Safety Guide',
    description: 'Research-backed windshield safety guidance and ADAS calibration information.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script defer data-domain="windshieldadvisor.info" src="http://5.78.156.118:8001/js/script.js"></script>
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
