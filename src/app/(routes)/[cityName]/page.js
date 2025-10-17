// src/app/[cityName]/page.js - COMPLETE ENHANCED VERSION

import { notFound } from 'next/navigation';
import { cities, vehiclesServices, cityDetails, touristSpots } from "@/utilis/data";
import { cityRoutesData, basicCityRoutes, defaultRoutes } from "@/utilis/cityRoutesData";
import { getAllKeywordsForPage } from "@/utilis/enhancedKeywords";
import CityServiceClient from "@/components/cities/CityServiceClient";
import RouteClientContent from "./RouteClientContent";

const allCityRoutes = {
  ...cityRoutesData,
  ...basicCityRoutes
};

function parseRouteSlug(slug) {
  const parts = slug.split('-to-');
  if (parts.length !== 2) return null;
  const cityName = parts[0];
  const destination = parts[1].replace(/-/g, ' ');
  return { cityName, destination };
}

export function createRouteSlug(cityName, destination) {
  return `${cityName.toLowerCase()}-to-${destination.toLowerCase().replace(/\s+/g, '-')}`;
}

export async function generateStaticParams() {
  const params = [];
  if (!Array.isArray(cities)) {
    console.error("Cities is not an array:", cities);
    return params;
  }
  cities.forEach(city => {
    if (!city || !city.name) {
      console.error("Invalid city object:", city);
      return;
    }
    const cityName = city.name.toLowerCase();
    params.push({ cityName: cityName });
    const formattedCityName = city.name.charAt(0).toUpperCase() + city.name.slice(1);
    const routes = allCityRoutes[formattedCityName] || [];
    if (Array.isArray(routes)) {
      routes.forEach(route => {
        if (route && route.destination) {
          params.push({ cityName: createRouteSlug(cityName, route.destination) });
        }
      });
    }
  });
  console.log(`Generated ${params.length} static params`);
  return params;
}

export async function generateMetadata({ params }) {
  const { cityName } = params;
  const routeData = parseRouteSlug(cityName);

  if (routeData) {
    // ROUTE PAGE METADATA
    const { cityName: originCity, destination } = routeData;
    const formattedCityName = originCity.charAt(0).toUpperCase() + originCity.slice(1);
    const formattedDestination = destination.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const routes = allCityRoutes[formattedCityName] || [];
    const route = Array.isArray(routes) ? routes.find(r => r && r.destination && r.destination.toLowerCase() === formattedDestination.toLowerCase()) : null;
    const startingPrice = route?.prices?.[0]?.price || "₹2760";

    // Get ALL keywords for this route
    const allKeywords = getAllKeywordsForPage(formattedCityName, formattedDestination);

    const enhancedTitle = `Book ${formattedCityName} to ${formattedDestination} Cab Service Online | Starting ${startingPrice} | 24x7 Taxi Booking - Triveni Cabs`;
    const enhancedDescription = `Book reliable ${formattedCityName} to ${formattedDestination} cab service online. ✅ Professional drivers ✅ AC vehicles ✅ GPS tracking ✅ 24/7 availability ✅ Transparent pricing from ${startingPrice}. One-way, round trip & outstation taxi booking available. Safe, comfortable & affordable car rental service.`;

    return {
      title: enhancedTitle,
      description: enhancedDescription,
      keywords: allKeywords.join(', '),
      authors: [{ name: 'Triveni Cabs' }],
      creator: 'Triveni Cabs',
      publisher: 'Triveni Cabs',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://trivenicabs.in'),
      openGraph: {
        title: `${formattedCityName} to ${formattedDestination} Taxi Service | Book Online at ${startingPrice} | Triveni Cabs`,
        description: `Professional cab service from ${formattedCityName} to ${formattedDestination}. AC vehicles, verified drivers, GPS tracking, transparent pricing. Book your taxi now!`,
        type: 'website',
        locale: 'en_IN',
        url: `https://trivenicabs.in/${cityName}`,
        siteName: 'Triveni Cabs - Premium Taxi Service India',
        images: [{
          url: 'https://trivenicabs.in/images/car/car1.png',
          width: 1200,
          height: 630,
          alt: `${formattedCityName} to ${formattedDestination} cab service - Professional taxi booking`
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${formattedCityName} to ${formattedDestination} Cab Service - Starting ${startingPrice}`,
        description: `Book reliable taxi from ${formattedCityName} to ${formattedDestination}. Professional drivers, AC vehicles, 24x7 service.`,
        images: ['https://trivenicabs.in/images/car/car1.png'],
        creator: '@TriveniCabs',
        site: '@TriveniCabs',
      },
      alternates: {
        canonical: `https://trivenicabs.in/${cityName}`,
        languages: {
          'en-IN': `https://trivenicabs.in/${cityName}`,
          'hi-IN': `https://trivenicabs.in/${cityName}`,
        },
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      category: 'Transportation',
      classification: 'Taxi Service',
      other: {
        'geo.region': 'IN',
        'geo.placename': `${formattedCityName}, ${formattedDestination}`,
        'price:currency': 'INR',
        'price:amount': startingPrice.replace('₹', ''),
        'availability': 'in stock',
        'rating': '4.8',
        'review_count': '1250',
      }
    };
  } else {
    // CITY PAGE METADATA
    const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

    // Get ALL keywords for this city
    const allKeywords = getAllKeywordsForPage(formattedCityName);

    const enhancedCityTitle = `#1 Taxi Service in ${formattedCityName} | 24x7 Cab Booking | Car Rental & Outstation Tours - Triveni Cabs`;
    const enhancedCityDescription = `Book the best taxi service in ${formattedCityName} for outstation trips, local tours, airport transfers & wedding car rentals. ✅ Professional verified drivers ✅ AC vehicles ✅ GPS tracking ✅ 24/7 availability ✅ Transparent pricing ✅ Instant booking. Safe, reliable & affordable cab service.`;

    return {
      title: enhancedCityTitle,
      description: enhancedCityDescription,
      keywords: allKeywords.join(', '),
      authors: [{ name: 'Triveni Cabs' }],
      creator: 'Triveni Cabs',
      publisher: 'Triveni Cabs',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL('https://trivenicabs.in'),
      openGraph: {
        title: `Best Taxi Service in ${formattedCityName} | Professional Cab Booking - Triveni Cabs`,
        description: `Reliable taxi service in ${formattedCityName}. Book cabs for outstation, local trips, and special occasions. Professional drivers, transparent pricing, 24x7 service.`,
        type: 'website',
        locale: 'en_IN',
        url: `https://trivenicabs.in/${cityName}`,
        siteName: 'Triveni Cabs - Premium Taxi Service India',
        images: [{
          url: 'https://trivenicabs.in/images/car/car2.png',
          width: 1200,
          height: 630,
          alt: `Professional taxi service in ${formattedCityName} - Triveni Cabs`
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: `Best Taxi Service in ${formattedCityName} | Triveni Cabs`,
        description: `Professional taxi service in ${formattedCityName}. Outstation trips, local tours, airport transfers. Book now!`,
        images: ['https://trivenicabs.in/images/car/car2.png'],
        creator: '@TriveniCabs',
        site: '@TriveniCabs',
      },
      alternates: {
        canonical: `https://trivenicabs.in/${cityName}`,
        languages: {
          'en-IN': `https://trivenicabs.in/${cityName}`,
          'hi-IN': `https://trivenicabs.in/${cityName}`,
        },
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      category: 'Transportation',
      classification: 'Taxi Service',
      other: {
        'geo.region': 'IN',
        'geo.placename': formattedCityName,
        'availability': 'in stock',
        'rating': '4.8',
        'review_count': '1250',
      }
    };
  }
}

export default function CityNamePage({ params }) {
  const { cityName } = params;
  const routeData = parseRouteSlug(cityName);

  if (routeData) {
    const { cityName: originCity, destination} = routeData;
    const formattedCityName = originCity.charAt(0).toUpperCase() + originCity.slice(1);
    const formattedDestination = destination.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    const cityExists = cities.some(city => city.name.toLowerCase() === originCity.toLowerCase());
    if (!cityExists) { notFound(); }
    
    const routes = allCityRoutes[formattedCityName] || defaultRoutes || [];
    const route = Array.isArray(routes) ? routes.find(r => r && r.destination && r.destination.toLowerCase() === formattedDestination.toLowerCase()) : null;
    
    if (!route) { notFound(); }
    
    const estimatedDistance = route.distance || `${Math.floor(Math.random() * 200) + 150} km`;
    const estimatedTime = route.time || `${Math.floor(Math.random() * 4) + 3} hours`;

    return (
      <RouteClientContent
        cityName={originCity}
        formattedCityName={formattedCityName}
        destination={destination.replace(/\s+/g, '-')}
        formattedDestination={formattedDestination}
        estimatedDistance={estimatedDistance}
        estimatedTime={estimatedTime}
        route={route}
        routes={routes}
        vehiclesServices={vehiclesServices}
      />
    );
  } else {
    const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    const cityExists = cities.some(city => city.name.toLowerCase() === cityName.toLowerCase());
    if (!cityExists) { notFound(); }
    
    const citySpots = touristSpots[formattedCityName] || [];
    let details = {};
    
    try {
      details = cityDetails[formattedCityName] || cityDetails.Delhi || {
        coverage: {
          fullCoverage: [`${formattedCityName} City Center`, `${formattedCityName} Railway Station`, `${formattedCityName} Airport`, "Major Shopping Areas", "Business Districts"],
          limitedCoverage: ["Remote Suburbs", "Industrial Areas", "Outer Ring Areas"],
          restricted: ["Military Zones", "Restricted Government Areas"]
        },
        peakHours: {
          morning: "7:00 AM - 10:00 AM",
          evening: "5:00 PM - 8:00 PM",
          surcharge: "15-25% extra during peak hours"
        },
        safetyFeatures: ["Real-time GPS Tracking", "Verified Professional Drivers", "24/7 Customer Support", "Regular Vehicle Maintenance", "Emergency SOS Button", "Sanitized Vehicles", "Driver Background Verification", "Live Trip Sharing"],
        popularRoutes: [`${formattedCityName} to Delhi`, `${formattedCityName} Airport Transfer`, `${formattedCityName} Local Sightseeing`, `${formattedCityName} Outstation Tours`]
      };
    } catch (error) {
      console.error("Error accessing city details:", error);
      details = {
        coverage: {
          fullCoverage: [`${formattedCityName} City Center`, `${formattedCityName} Railway Station`, `${formattedCityName} Airport`, "Major Commercial Areas", "Tourist Attractions"],
          limitedCoverage: ["Outer City Areas", "Remote Localities"],
          restricted: ["Restricted Security Zones"]
        },
        peakHours: {
          morning: "8:00 AM - 10:00 AM",
          evening: "5:00 PM - 8:00 PM",
          surcharge: "10-25% extra during peak hours"
        },
        safetyFeatures: ["Professional Verified Drivers", "GPS Vehicle Tracking", "24/7 Customer Support", "Emergency Assistance", "Clean Sanitized Vehicles"],
        popularRoutes: [`${formattedCityName} Local Tours`, `${formattedCityName} Airport Transfer`, `${formattedCityName} to Major Cities`]
      };
    }

    return (
      <CityServiceClient
        formattedCityName={formattedCityName}
        citySpots={citySpots}
        details={details}
        vehiclesServices={vehiclesServices}
      />
    );
  }
}