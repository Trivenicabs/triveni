// src/app/tempo-traveller/[route]/page.js

import { tempoFleet, tempoRoutes, localSightseeing } from '@/utilis/tempoTravellerData';
import DynamicTempoRoutesClient from '@/components/DynamicTempoRoutes';

export async function generateStaticParams() {
  // Generate static params for popular routes
  const popularRoutes = [
    'delhi-to-shimla',
    'delhi-to-manali',
    'delhi-to-dharamshala',
    'delhi-to-amritsar',
    'delhi-to-haridwar',
    'delhi-to-rishikesh',
    'delhi-to-jaipur',
    'delhi-to-agra',
    'chandigarh-to-shimla',
    'chandigarh-to-manali',
    'chandigarh-to-dharamshala',
    'jaipur-to-delhi',
    'jaipur-to-agra',
    'jaipur-to-udaipur',
    'agra-to-delhi',
    'agra-to-jaipur'
  ];

  return popularRoutes.map((route) => ({
    route: route,
  }));
}

export async function generateMetadata({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  const { route } = resolvedParams;
  
  // Add null check
  if (!route) {
    return {
      title: 'Tempo Traveller Service | Premium Group Travel',
      description: 'Book premium tempo travellers for comfortable group travel across India.'
    };
  }
  
  const routeParts = route.split('-to-');
  if (routeParts.length !== 2) {
    return {
      title: 'Tempo Traveller Service | Premium Group Travel',
      description: 'Book premium tempo travellers for comfortable group travel across India.'
    };
  }
  
  const [origin, destination] = routeParts;
  
  const formatCityName = (city) => {
    return city.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const originFormatted = formatCityName(origin);
  const destinationFormatted = formatCityName(destination);

  return {
    title: `${originFormatted} to ${destinationFormatted} Tempo Traveller | Book Online`,
    description: `Book tempo traveller from ${originFormatted} to ${destinationFormatted}. Comfortable AC vehicles, professional drivers, competitive rates. Available 24/7 online booking.`,
    keywords: `tempo traveller ${origin} to ${destination}, ${origin} ${destination} tempo booking, group travel ${origin} ${destination}`,
    openGraph: {
      title: `${originFormatted} to ${destinationFormatted} Tempo Traveller`,
      description: `Premium tempo traveller service from ${originFormatted} to ${destinationFormatted}. Book now for comfortable group travel.`,
      url: `/tempo-traveller/${route}`,
      type: 'website',
    }
  };
}

export default async function TempoTravellerRoutePage({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  const { route } = resolvedParams;
  
  // Add null check and handle invalid routes
  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Route</h1>
          <p className="text-gray-600">The requested route was not found.</p>
        </div>
      </div>
    );
  }
  
  const routeParts = route.split('-to-');
  if (routeParts.length !== 2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Route Format</h1>
          <p className="text-gray-600">The route format should be origin-to-destination.</p>
        </div>
      </div>
    );
  }
  
  const [origin, destination] = routeParts;
  
  const formatCityName = (city) => {
    return city.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const originFormatted = formatCityName(origin);
  const destinationFormatted = formatCityName(destination);

  // Find route data on server side
  const findRouteData = (originCity, destinationCity) => {
    if (tempoRoutes[originCity]) {
      const routeInfo = tempoRoutes[originCity].find(r => 
        r.name.toLowerCase() === destinationCity.toLowerCase()
      );
      if (routeInfo) {
        return {
          ...routeInfo,
          origin: originCity,
          destination: destinationCity,
          exists: true
        };
      }
    }
    
    return {
      name: destinationCity,
      type: 'Tourism',
      origin: originCity,
      destination: destinationCity,
      exists: false
    };
  };

  // Check if tourist spots are available for the destination
  const hasTouristSpots = (city) => {
    const spotsAvailable = ['Delhi', 'Agra', 'Jaipur', 'Udaipur', 'Haridwar', 'Rishikesh', 'Shimla', 'Manali', 'Amritsar', 'Lucknow', 'Varanasi', 'Jodhpur', 'Ayodhya'];
    return spotsAvailable.includes(city);
  };

  const routeData = findRouteData(originFormatted, destinationFormatted);
  const destinationSightseeing = localSightseeing?.[destinationFormatted] || [];

  // Prepare data for client component
  const pageData = {
    routeSlug: route,
    origin: originFormatted,
    destination: destinationFormatted,
    routeData: routeData,
    hasTouristSpots: hasTouristSpots(destinationFormatted),
    localSightseeing: destinationSightseeing,
    fleet: tempoFleet
  };

  return <DynamicTempoRoutesClient data={pageData} />;
}