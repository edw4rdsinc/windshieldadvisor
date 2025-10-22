'use client';

import Link from 'next/link';
import { useGeolocation } from '@/hooks/useGeolocation';

interface GeolocationCTAProps {
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
  children?: React.ReactNode;
}

export default function GeolocationCTA({
  variant = 'text',
  className = '',
  children
}: GeolocationCTAProps) {
  const { location, isLoading } = useGeolocation();

  // Default styles for each variant
  const variantStyles = {
    primary: 'inline-flex items-center justify-center px-8 py-4 bg-accent-orange-500 hover:bg-accent-orange-600 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl',
    secondary: 'inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-safety-blue-600 border-2 border-safety-blue-600 font-semibold rounded-lg transition-colors',
    text: 'inline-flex items-center justify-center px-8 py-4 text-blue-100 hover:text-white font-medium transition-colors text-lg underline'
  };

  const baseStyles = variantStyles[variant];
  const combinedStyles = `${baseStyles} ${className}`;

  // Show loading state
  if (isLoading) {
    return (
      <Link href="/find-installers" className={combinedStyles}>
        {children || 'Find certified installers'}
      </Link>
    );
  }

  // If user is in a partner service area, show phone number
  if (location?.hasPartner && location.phone) {
    const phoneClean = location.phone.replace(/\D/g, ''); // Remove non-digits for tel: link

    return (
      <a
        href={`tel:${phoneClean}`}
        className={combinedStyles}
      >
        {children || (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {location.phone}
          </>
        )}
      </a>
    );
  }

  // Default: show find installers link
  return (
    <Link href="/find-installers" className={combinedStyles}>
      {children || 'Find certified installers'}
    </Link>
  );
}
