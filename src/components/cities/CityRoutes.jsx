'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Eye, Car, Users, Info, ArrowRight, Phone } from 'lucide-react';
import { cityRoutesData, defaultRoutes } from "@/utilis/cityRoutesData";
import { phoneNumber } from "@/utilis/data";

// Helper function to create route slug
function createRouteSlug(cityName, destination) {
  return `${cityName.toLowerCase()}-to-${destination.toLowerCase().replace(/\s+/g, '-')}`;
}

const CityRoutes = ({ cityName }) => {
  const [activeTab, setActiveTab] = useState('oneWay');
  const [expandedRoutes, setExpandedRoutes] = useState({});
  const [showAllRoutes, setShowAllRoutes] = useState(false);

  // Memoize routes data
  const routes = useMemo(() => 
    cityRoutesData[cityName] || defaultRoutes[cityName] || [], 
    [cityName]
  );

  // Memoize vehicle image mapping
  const getVehicleImage = useCallback((vehicleType) => {
    const vehicleImageMap = {
      'Sedan': '/images/car/car1.png',
      'SUV Ertiga': '/images/car/car2.png', 
      'SUV Innova': '/images/car/car2.png',
      'Tempo Traveller': '/images/car/tempo_traveller.jpeg',
      'Bus': '/images/car/luxury_bus.jpeg'
    };
    return vehicleImageMap[vehicleType] || '/images/car/car1.png';
  }, []);

  // Optimized WhatsApp handler
  const handleBookNow = useCallback((destination = '') => {
    const message = destination 
      ? `Hi, I want to book a cab from ${cityName} to ${destination}. Please share pricing and availability.`
      : `Hi, I want to book a cab from ${cityName}. Please share pricing and availability.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }, [cityName]);

  // Memoized vehicle filtering functions
  const getFilteredVehicles = useCallback((prices) => {
    if (!prices) return [];
    
    if (activeTab === 'oneWay') {
      return prices.filter(price => 
        !price.vehicle.toLowerCase().includes('bus') && 
        !price.vehicle.toLowerCase().includes('tempo')
      );
    }
    return prices;
  }, [activeTab]);

  const getRoundTripOnlyVehicles = useCallback((prices) => {
    if (!prices) return [];
    return prices.filter(price => 
      price.vehicle.toLowerCase().includes('bus') || 
      price.vehicle.toLowerCase().includes('tempo')
    );
  }, []);

  // Memoized starting price calculation
  const getStartingPrice = useCallback((route) => {
    const filteredPrices = getFilteredVehicles(route.prices);
    if (!filteredPrices || filteredPrices.length === 0) return "₹2760";
    
    const lowestPrice = Math.min(...filteredPrices.map(p => {
      const price = activeTab === 'oneWay' ? p.price : p.roundTrip;
      return parseInt(price.replace('₹', '').replace(',', ''));
    }));
    return `₹${lowestPrice.toLocaleString()}`;
  }, [activeTab, getFilteredVehicles]);

  // Optimized toggle functions
  const toggleVehicleOptions = useCallback((index) => {
    setExpandedRoutes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  const toggleShowAllRoutes = useCallback(() => {
    setShowAllRoutes(prev => !prev);
  }, []);

  // Memoized route heading generator
  const getRouteHeading = useCallback((cityName, destination, index) => {
    const headingVariations = [
      `${cityName} to ${destination}`,
      `${cityName} → ${destination}`,
      `${cityName}-${destination} Route`,
      `Journey to ${destination}`
    ];
    return headingVariations[index % headingVariations.length];
  }, []);

  // Memoized routes to display
  const routesToDisplay = useMemo(() => {
    const maxRoutes = showAllRoutes ? routes.length : 6;
    return routes.slice(0, maxRoutes);
  }, [routes, showAllRoutes]);

  // Empty state component
  const EmptyState = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 text-center">
      <div className="mb-4">
        <Car className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No routes available for {cityName}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Contact us for custom routes and competitive pricing for your travel needs.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => handleBookNow()}
          className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call {phoneNumber}
        </button>
        <Link
          href="/contact"
          className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          Contact Us
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );

  // Vehicle list component
  const VehicleList = ({ vehicles, isExpanded, routeIndex, destination }) => (
    <div className="space-y-2">
      {vehicles.map((price, priceIndex) => (
        <div key={priceIndex} className="flex justify-between items-center py-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Car className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{price.vehicle}</span>
            {price.capacity && (
              <span className="text-xs text-gray-500 hidden sm:inline">
                ({price.capacity})
              </span>
            )}
          </div>
          <div className="font-semibold text-sm md:text-base">
            {activeTab === 'oneWay' ? price.price : price.roundTrip}
          </div>
        </div>
      ))}
      
      {vehicles.length > 2 && (
        <button
          className="w-full text-center text-xs md:text-sm text-gray-500 hover:text-gray-700 transition-colors py-1"
          onClick={() => toggleVehicleOptions(routeIndex)}
        >
          {isExpanded ? 'Show less ˄' : `Show ${vehicles.length - 2} more ˅`}
        </button>
      )}
    </div>
  );

  // Round trip only vehicles info
  const RoundTripInfo = ({ vehicles, destination }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-blue-700 font-medium mb-2">
            Additional vehicles for round trips:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vehicles.slice(0, 2).map((vehicle, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="relative w-6 h-4 rounded overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src={getVehicleImage(vehicle.vehicle)}
                    alt={vehicle.vehicle}
                    fill
                    className="object-contain"
                    sizes="24px"
                  />
                </div>
                <span className="font-medium text-blue-800 truncate">
                  {vehicle.vehicle}
                </span>
                <span className="text-blue-600 text-xs">
                  {vehicle.roundTrip}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-2">
            💡 Switch to "Round Trip" to book these options!
          </p>
        </div>
      </div>
    </div>
  );

  if (!routes || routes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold">
            Popular Routes from {cityName}
          </h2>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold">
          Popular Routes from {cityName}
        </h2>
        
        {/* Tab Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('oneWay')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'oneWay'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setActiveTab('roundTrip')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'roundTrip'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Round Trip
          </button>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {routesToDisplay.map((route, index) => {
          const filteredVehicles = getFilteredVehicles(route.prices);
          const roundTripOnlyVehicles = getRoundTripOnlyVehicles(route.prices);
          const isExpanded = expandedRoutes[index];
          const vehiclesToShow = isExpanded ? filteredVehicles : filteredVehicles.slice(0, 2);

          return (
            <article key={index} className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300">
              {/* Route Header */}
              <header className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight">
                    {getRouteHeading(cityName, route.destination, index)}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span>{route.distance}</span>
                    </div>
                    {route.time && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span>{route.time}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right ml-4 flex-shrink-0">
                  <div className="text-xs md:text-sm text-gray-500">Starting from</div>
                  <div className="text-lg md:text-2xl font-bold text-green-600">
                    {getStartingPrice(route)}
                  </div>
                </div>
              </header>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {route.description}
              </p>

              {/* Tags */}
              {route.tags && (
                <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                  {route.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {route.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{route.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Vehicle Options */}
              {filteredVehicles.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Available Vehicles
                  </h4>
                  <VehicleList 
                    vehicles={vehiclesToShow}
                    isExpanded={isExpanded}
                    routeIndex={index}
                    destination={route.destination}
                  />
                </div>
              )}

              {/* Round Trip Only Vehicles */}
              {activeTab === 'oneWay' && roundTripOnlyVehicles.length > 0 && (
                <div className="mb-4">
                  <RoundTripInfo 
                    vehicles={roundTripOnlyVehicles}
                    destination={route.destination}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <Link
                  href={`/${createRouteSlug(cityName, route.destination)}`}
                  className="flex-1 bg-black text-white py-2 md:py-3 px-4 rounded-lg text-center text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
                <button
                  onClick={() => handleBookNow(route.destination)}
                  className="flex-1 bg-green-600 text-white py-2 md:py-3 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Book Now
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {routes.length > 6 && (
        <div className="text-center">
          <button
            onClick={toggleShowAllRoutes}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
          >
            {showAllRoutes ? 'Show Less Routes' : `Show ${routes.length - 6} More Routes`}
            <ArrowRight className={`w-4 h-4 transition-transform ${showAllRoutes ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CityRoutes;