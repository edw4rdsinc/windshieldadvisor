'use client';

import { useEffect, useState } from 'react';

export interface GeolocationData {
  hasPartner: boolean;
  state: string;
  city?: string;
  regionName?: string;
  name?: string;
  phone?: string;
  serviceArea?: string;
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('/api/geolocation');
        if (response.ok) {
          const data = await response.json();
          setLocation(data);
        } else {
          setLocation({ hasPartner: false, state: 'UNKNOWN' });
        }
      } catch (error) {
        console.error('Failed to fetch geolocation:', error);
        setLocation({ hasPartner: false, state: 'UNKNOWN' });
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocation();
  }, []);

  return { location, isLoading };
}
