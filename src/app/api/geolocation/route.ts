import { NextRequest, NextResponse } from 'next/server';

// Partner shop data for specific service areas
const PARTNER_SHOPS = {
  // Portland Metro Area (OR: Washington, Clackamas, Multnomah counties)
  portland: {
    name: 'Windshield Advisor Portland',
    phone: '(971) 317-8376',
    city: 'Portland Metro',
    serviceArea: 'Serving Washington, Clackamas, and Multnomah Counties'
  },
  // Las Vegas Metro (NV: Clark County)
  lasVegas: {
    name: 'Vero Auto Glass',
    phone: '(725) 234-6955',
    city: 'Las Vegas Metro',
    serviceArea: 'Serving Clark County'
  },
  // Salt Lake Area (UT: Salt Lake County)
  saltLake: {
    name: 'Windshield Advisor Salt Lake',
    phone: '(801) 555-0100',
    city: 'Salt Lake Metro',
    serviceArea: 'Serving Salt Lake County'
  }
};

// Oregon cities in service counties
const PORTLAND_METRO_CITIES = [
  // Multnomah County
  'portland', 'gresham', 'troutdale', 'wood village', 'fairview', 'maywood park',
  // Washington County
  'beaverton', 'hillsboro', 'tigard', 'tualatin', 'lake oswego', 'west linn', 'wilsonville',
  'sherwood', 'cornelius', 'forest grove', 'banks', 'north plains', 'gaston', 'durham', 'king city',
  // Clackamas County
  'oregon city', 'milwaukie', 'happy valley', 'west linn', 'lake oswego', 'gladstone',
  'canby', 'sandy', 'estacada', 'molalla', 'barlow', 'johnson city', 'rivergrove'
];

// Nevada cities in Clark County
const LAS_VEGAS_METRO_CITIES = [
  'las vegas', 'north las vegas', 'henderson', 'boulder city', 'mesquite',
  'paradise', 'spring valley', 'sunrise manor', 'enterprise', 'summerlin'
];

// Utah cities in Salt Lake County
const SALT_LAKE_METRO_CITIES = [
  'salt lake city', 'west valley city', 'west jordan', 'sandy', 'south jordan',
  'murray', 'draper', 'riverton', 'midvale', 'cottonwood heights', 'holladay',
  'herriman', 'taylorsville', 'south salt lake', 'millcreek', 'magna', 'kearns',
  'bluffdale', 'alta', 'brighton'
];

function isInServiceArea(city: string, region: string): string | null {
  const cityLower = city.toLowerCase();

  // Check Portland Metro (Oregon)
  if (region === 'OR' && PORTLAND_METRO_CITIES.some(c => cityLower.includes(c) || c.includes(cityLower))) {
    return 'portland';
  }

  // Check Las Vegas Metro (Nevada, Clark County)
  if (region === 'NV' && LAS_VEGAS_METRO_CITIES.some(c => cityLower.includes(c) || c.includes(cityLower))) {
    return 'lasVegas';
  }

  // Check Salt Lake Metro (Utah, Salt Lake County)
  if (region === 'UT' && SALT_LAKE_METRO_CITIES.some(c => cityLower.includes(c) || c.includes(cityLower))) {
    return 'saltLake';
  }

  return null;
}

export async function GET(request: NextRequest) {
  try {
    // Get IP address from request
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '127.0.0.1';

    // For development/localhost, return no partner (will show lead capture)
    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return NextResponse.json({
        hasPartner: false,
        state: 'LOCAL',
        city: 'Development',
        regionName: 'Local Development'
      });
    }

    // Use ip-api.com for geolocation (free, no API key needed)
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,region,regionName,city`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!geoResponse.ok) {
      throw new Error('Geolocation service unavailable');
    }

    const geoData = await geoResponse.json();

    // Only process US locations
    if (geoData.status !== 'success' || geoData.countryCode !== 'US') {
      return NextResponse.json({
        hasPartner: false,
        state: geoData.countryCode || 'UNKNOWN',
        city: geoData.city || 'Unknown',
        regionName: geoData.regionName || 'Unknown'
      });
    }

    // Check if user is in a service area
    const serviceArea = isInServiceArea(geoData.city, geoData.region);

    if (serviceArea) {
      const partner = PARTNER_SHOPS[serviceArea as keyof typeof PARTNER_SHOPS];
      return NextResponse.json({
        hasPartner: true,
        state: geoData.region,
        regionName: geoData.regionName,
        ...partner
      });
    }

    // Not in service area - return location info for lead tracking
    return NextResponse.json({
      hasPartner: false,
      state: geoData.region,
      city: geoData.city,
      regionName: geoData.regionName
    });

  } catch (error) {
    console.error('Geolocation error:', error);

    // Fallback - no partner available
    return NextResponse.json({
      hasPartner: false,
      state: 'UNKNOWN',
      city: 'Unknown',
      regionName: 'Unknown'
    });
  }
}
