'use client';

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Car, ChevronRight, Users, ArrowRight, Clock, Info, Star, Shield, CheckCircle } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { phoneNumber } from "@/utilis/data";
import { getRouteOffices } from "@/utilis/officeLocations";
import OfficeLocations from "@/components/cities/OfficeLocations";

// Helper function to create route slug
function createRouteSlug(cityName, destination) {
  return `${cityName.toLowerCase()}-to-${destination.toLowerCase().replace(/\s+/g, '-')}`;
}

export default function RouteClientContent({
  cityName,
  formattedCityName,
  destination, 
  formattedDestination,
  estimatedDistance,
  estimatedTime,
  route,
  routes,
  vehiclesServices
}) {
  const [activeTab, setActiveTab] = useState('oneWay');
  const [vehiclePricingType, setVehiclePricingType] = useState({});

  // Memoize office locations
  const routeOffices = useMemo(() => 
    getRouteOffices(formattedCityName, formattedDestination), 
    [formattedCityName, formattedDestination]
  );

  // Optimized handlers
  const handleCallNow = useCallback(() => {
    window.open(`tel:+91${phoneNumber}`, '_blank');
  }, []);
  
  const handleWhatsApp = useCallback(() => {
    const message = `Hi, I want to book a cab from ${formattedCityName} to ${formattedDestination}. Please share pricing and availability.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }, [formattedCityName, formattedDestination]);

  // Memoized vehicle filtering
  const { filteredVehicles, roundTripOnlyVehicles } = useMemo(() => {
    if (!route.prices) return { filteredVehicles: [], roundTripOnlyVehicles: [] };
    
    const filtered = activeTab === 'oneWay' 
      ? route.prices.filter(price => 
          !price.vehicle.toLowerCase().includes('bus') && 
          !price.vehicle.toLowerCase().includes('tempo')
        )
      : route.prices;
    
    const roundTripOnly = route.prices.filter(price => 
      price.vehicle.toLowerCase().includes('bus') || 
      price.vehicle.toLowerCase().includes('tempo')
    );
    
    return { filteredVehicles: filtered, roundTripOnlyVehicles: roundTripOnly };
  }, [route.prices, activeTab]);

  // Memoized starting price
  const startingPrice = useMemo(() => {
    if (!filteredVehicles.length) return "₹2760";
    
    const prices = filteredVehicles.map(p => {
      const price = activeTab === 'oneWay' ? p.price : p.roundTrip;
      return parseInt(price.replace('₹', '').replace(',', ''));
    });
    return `₹${Math.min(...prices).toLocaleString()}`;
  }, [filteredVehicles, activeTab]);

  // Optimized vehicle image mapping
  const getVehicleImage = useCallback((vehicleType) => {
    const imageMap = {
      'Sedan': '/images/car/car1.png',
      'SUV Ertiga': '/images/car/car2.png', 
      'SUV Innova': '/images/car/car2.png',
      'Tempo Traveller': '/images/car/tempo_traveller.jpeg',
      'Bus': '/images/car/luxury_bus.jpeg'
    };
    return imageMap[vehicleType] || '/images/car/car1.png';
  }, []);

  // Get vehicle capacity
  const getVehicleCapacity = useCallback((vehicleType) => {
    const capacityMap = {
      'Sedan': '4 passengers',
      'SUV Ertiga': '6 passengers',
      'SUV Innova': '7 passengers', 
      'Tempo Traveller': '25 passengers',
      'Bus': '35 passengers'
    };
    return capacityMap[vehicleType] || '4-6 passengers';
  }, []);

  const toggleVehiclePricing = useCallback((vehicleIndex) => {
    setVehiclePricingType(prev => ({
      ...prev,
      [vehicleIndex]: prev[vehicleIndex] === 'roundTrip' ? 'oneWay' : 'roundTrip'
    }));
  }, []);

  const getVehiclePricingType = useCallback((vehicleIndex) => {
    return vehiclePricingType[vehicleIndex] || activeTab;
  }, [vehiclePricingType, activeTab]);

  const handleTabChange = useCallback((newTab) => {
    setActiveTab(newTab);
    setVehiclePricingType({});
  }, []);

  // SEO-optimized structured data
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${formattedCityName} to ${formattedDestination} Cab Service`,
    "description": `Reliable taxi service from ${formattedCityName} to ${formattedDestination}. Book AC cabs, SUVs, and buses with professional drivers.`,
    "provider": {
      "@type": "Organization",
      "name": "Triveni Cabs",
      "telephone": `+91${phoneNumber}`
    },
    "areaServed": [formattedCityName, formattedDestination],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": startingPrice.replace('₹', ''),
      "description": `Starting price for cab service from ${formattedCityName} to ${formattedDestination}`
    }
  }), [formattedCityName, formattedDestination, startingPrice]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section - Optimized for Core Web Vitals */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32"
          style={{
            backgroundImage: "url('/images/about/about_banner.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
                <li>
                  <Link 
                    href="/" 
                    className="text-white hover:text-yellow-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 mx-1 text-white" />
                <li>
                  <Link 
                    href={`/${cityName}`}
                    className="text-white hover:text-yellow-400 transition-colors"
                  >
                    {formattedCityName} Cabs
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 mx-1 text-white" />
                <li className="text-yellow-400 font-medium">
                  {formattedDestination}
                </li>
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {formattedCityName} to {formattedDestination} <span className="text-yellow-400">Cab Service</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white mb-6 max-w-3xl leading-relaxed">
                Book reliable and affordable taxi service from {formattedCityName} to {formattedDestination}. 
                Professional drivers, clean AC vehicles, transparent pricing. Starting from {startingPrice}.
              </p>
              
              {/* Key Info Pills */}
              <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-white text-sm md:text-base">
                  <Car className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
                  ~{route.distance || estimatedDistance}
                </div>
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-white text-sm md:text-base">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
                  ~{route.time || estimatedTime}
                </div>
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-white text-sm md:text-base">
                  <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
                  4.8★ Rated Service
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleCallNow}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all transform hover:scale-105 font-medium"
                  aria-label={`Call ${phoneNumber} to book cab from ${formattedCityName} to ${formattedDestination}`}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now - {phoneNumber}
                </button>
                
                <button 
                  onClick={handleWhatsApp}
                  className="bg-black hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all transform hover:scale-105 font-medium"
                >
                  <BsWhatsapp className="w-5 h-5 mr-2" />
                  WhatsApp Booking
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Service Highlights */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Our {formattedCityName} to {formattedDestination} Taxi Service?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Safe & Reliable</h3>
                <p className="text-gray-600 text-sm">Verified drivers, GPS tracking, 24/7 support</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Transparent Pricing</h3>
                <p className="text-gray-600 text-sm">No hidden charges, fixed rates</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Comfortable Fleet</h3>
                <p className="text-gray-600 text-sm">AC vehicles, clean interiors</p>
              </div>
            </div>
          </section>

          {/* Vehicle Pricing Section */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Vehicle Options & Pricing
              </h2>
              
              {/* Trip Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1" role="tablist">
                <button
                  onClick={() => handleTabChange('oneWay')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'oneWay'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  role="tab"
                  aria-selected={activeTab === 'oneWay'}
                >
                  One Way
                </button>
                <button
                  onClick={() => handleTabChange('roundTrip')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'roundTrip'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  role="tab"
                  aria-selected={activeTab === 'roundTrip'}
                >
                  Round Trip
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Vehicle Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredVehicles.length > 0 ? filteredVehicles.map((price, index) => {
                  const currentPricingType = getVehiclePricingType(index);
                  const isRoundTrip = currentPricingType === 'roundTrip';
                  
                  return (
                    <article key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      {/* Vehicle Image */}
                      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={getVehicleImage(price.vehicle)}
                          alt={`${price.vehicle} for ${formattedCityName} to ${formattedDestination}`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />
                      </div>
                      
                      {/* Vehicle Info */}
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-2">{price.vehicle}</h3>
                        
                        <div className="text-gray-600 text-sm flex items-center justify-center mb-4">
                          <Users className="w-4 h-4 mr-1" />
                          {price.capacity || getVehicleCapacity(price.vehicle)}
                        </div>
                        
                        {/* Round Trip Toggle */}
                        <div className="flex items-center justify-center mb-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isRoundTrip}
                              onChange={() => toggleVehiclePricing(index)}
                              className="sr-only"
                            />
                            <div className="relative">
                              <div className={`block w-10 h-6 rounded-full transition-colors ${isRoundTrip ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isRoundTrip ? 'translate-x-4' : ''}`}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">Round Trip</span>
                          </label>
                        </div>
                        
                        {/* Price */}
                        <div className="mb-6">
                          <div className={`text-2xl md:text-3xl font-bold ${isRoundTrip ? 'text-blue-600' : 'text-green-600'}`}>
                            {isRoundTrip ? price.roundTrip : price.price}
                          </div>
                          <div className="text-sm text-gray-500">
                            {isRoundTrip ? 'Round Trip' : 'One Way'}
                          </div>
                        </div>
                        
                        {/* Book Button */}
                        <button
                          onClick={handleWhatsApp}
                          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                        >
                          Book {price.vehicle}
                        </button>
                      </div>
                    </article>
                  );
                }) : (
                  // Fallback vehicles
                  <>
                    <article className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-white">
                        <Image
                          src="/images/car/car1.png"
                          alt="Sedan cab service"
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-2">Sedan</h3>
                        <div className="text-gray-600 text-sm flex items-center justify-center mb-4">
                          <Users className="w-4 h-4 mr-1" />
                          4 passengers
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-6">₹12/km</div>
                        <button
                          onClick={handleWhatsApp}
                          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                        >
                          Book Sedan
                        </button>
                      </div>
                    </article>
                    
                    <article className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-white">
                        <Image
                          src="/images/car/car2.png"
                          alt="SUV cab service"
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-2">SUV</h3>
                        <div className="text-gray-600 text-sm flex items-center justify-center mb-4">
                          <Users className="w-4 h-4 mr-1" />
                          6-7 passengers
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-6">₹16/km</div>
                        <button
                          onClick={handleWhatsApp}
                          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                        >
                          Book SUV
                        </button>
                      </div>
                    </article>
                  </>
                )}
              </div>

              {/* Round Trip Only Vehicles Info */}
              {activeTab === 'oneWay' && roundTripOnlyVehicles.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Larger Vehicles Available for Round Trips
                      </h3>
                      <p className="text-blue-700 mb-4 text-sm">
                        For group travel and better value, we offer Tempo Travellers and Buses exclusively for round-trip bookings.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roundTripOnlyVehicles.slice(0, 2).map((vehicle, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-8 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                                <Image
                                  src={getVehicleImage(vehicle.vehicle)}
                                  alt={vehicle.vehicle}
                                  fill
                                  className="object-contain"
                                  sizes="48px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 text-sm truncate">{vehicle.vehicle}</h4>
                                <div className="text-xs text-gray-600 flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {vehicle.capacity || getVehicleCapacity(vehicle.vehicle)}
                                </div>
                                <div className="text-sm font-medium text-blue-600">
                                  {vehicle.roundTrip}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-sm text-blue-600 font-medium mt-3">
                        💡 Switch to Round Trip to see all options!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Office Locations */}
          <OfficeLocations 
            originCity={formattedCityName}
            destinationCity={formattedDestination}
            offices={routeOffices}
          />
          
          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg overflow-hidden">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  How much does a taxi cost from {formattedCityName} to {formattedDestination}?
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed">
                  Taxi fare from {formattedCityName} to {formattedDestination} starts from {startingPrice} for one-way trips. 
                  The exact cost depends on vehicle type (Sedan, SUV, Tempo Traveller) and trip type (one-way or round-trip). 
                  All prices include fuel, driver allowance, and taxes.
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg overflow-hidden">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  How long does it take to travel from {formattedCityName} to {formattedDestination}?
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed">
                  The journey from {formattedCityName} to {formattedDestination} typically takes {route.time || estimatedTime} 
                  {' '}covering approximately {route.distance || estimatedDistance}. Travel time may vary based on traffic conditions, 
                  weather, and route taken by the driver.
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg overflow-hidden">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  Can I book a one-way cab from {formattedCityName} to {formattedDestination}?
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed">
                  Yes, we provide one-way taxi service from {formattedCityName} to {formattedDestination}. 
                  You only pay for the distance traveled without any return charges. Sedans and SUVs are available 
                  for one-way bookings. For better value on longer trips, consider our round-trip packages.
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg overflow-hidden">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  What safety measures do you follow for {formattedCityName} to {formattedDestination} trips?
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed">
                  We ensure passenger safety through verified drivers with valid licenses, GPS-enabled vehicles 
                  for real-time tracking, regular vehicle maintenance, 24/7 customer support, emergency assistance, 
                  and sanitized vehicles. All drivers follow traffic safety guidelines and COVID-19 protocols.
                </div>
              </details>
            </div>
          </section>
          
          {/* Related Routes */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Other Popular Routes from {formattedCityName}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {routes
                .filter(r => r.destination !== formattedDestination)
                .slice(0, 8)
                .map((routeItem, index) => (
                <Link 
                  key={index}
                  href={`/${createRouteSlug(cityName, routeItem.destination)}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium group-hover:text-yellow-700 text-sm truncate">
                      {formattedCityName} to {routeItem.destination}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {routeItem.distance} • {routeItem.time}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-yellow-500 flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}