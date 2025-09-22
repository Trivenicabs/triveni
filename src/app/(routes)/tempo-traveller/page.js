// src/app/tempo-traveller/page.js

import { tempoFleet, tempoRoutes } from '@/utilis/tempoTravellerData';
import TempoMainClient from '@/components/TempoMainClient';

export const metadata = {
  title: 'Tempo Traveller Service | Premium Group Travel',
  description: 'Book premium tempo travellers for comfortable group travel across India. Professional drivers, AC vehicles, competitive rates.',
  keywords: 'tempo traveller, group travel, India tour, AC vehicles, professional drivers'
};

export default function TempoTravellerPage() {
  // Prepare data on server side for SEO
  const getAllRoutes = () => {
    const routes = [];
    Object.entries(tempoRoutes).forEach(([origin, destinations]) => {
      destinations.forEach(dest => {
        routes.push({
          origin,
          destination: dest.name,
          type: dest.type,
          slug: `${origin.toLowerCase().replace(/\s+/g, '-')}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}`
        });
      });
    });
    return routes;
  };

  const getPopularRoutes = () => {
    const routes = getAllRoutes();
    // Return first 8 routes as popular
    return routes.slice(0, 8);
  };

  const pageData = {
    popularRoutes: getPopularRoutes(),
    allRoutes: getAllRoutes(),
    fleet: tempoFleet,
    cities: Object.keys(tempoRoutes)
  };

  return <TempoMainClient data={pageData} />;
}