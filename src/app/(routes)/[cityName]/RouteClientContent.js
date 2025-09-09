'use client';

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Phone, MapPin, Car, ChevronRight, Users, ArrowRight, Clock, Info, Star, Shield, CheckCircle, Navigation, CreditCard, Headphones, Award } from "lucide-react";
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

  // Enhanced SEO structured data with multiple schemas
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://trivenicabs.in/${createRouteSlug(cityName, destination)}#service`,
        "name": `${formattedCityName} to ${formattedDestination} Cab Service`,
        "description": `Book reliable taxi service from ${formattedCityName} to ${formattedDestination}. Professional drivers, AC vehicles, transparent pricing starting from ${startingPrice}. 24/7 booking available.`,
        "provider": {
          "@type": "Organization",
          "@id": "https://trivenicabs.in",
          "name": "Triveni Cabs",
          "url": "https://trivenicabs.in",
          "telephone": `+91${phoneNumber}`,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          }
        },
        "areaServed": [
          {
            "@type": "Place",
            "name": formattedCityName
          },
          {
            "@type": "Place", 
            "name": formattedDestination
          }
        ],
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": startingPrice.replace('₹', '').replace(',', ''),
          "description": `Cab fare from ${formattedCityName} to ${formattedDestination}`,
          "availability": "https://schema.org/InStock",
          "validFrom": new Date().toISOString()
        },
        "serviceType": "Transportation",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Vehicle Types",
          "itemListElement": filteredVehicles.map((vehicle, index) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": `${vehicle.vehicle} - ${formattedCityName} to ${formattedDestination}`,
              "description": `${vehicle.vehicle} cab service with ${getVehicleCapacity(vehicle.vehicle)}`
            },
            "price": vehicle.price?.replace('₹', '').replace(',', '') || "0",
            "priceCurrency": "INR"
          }))
        }
      },
      {
        "@type": "Organization",
        "@id": "https://trivenicabs.in",
        "name": "Triveni Cabs",
        "url": "https://trivenicabs.in",
        "telephone": `+91${phoneNumber}`,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": `+91${phoneNumber}`,
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi"]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://trivenicabs.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `${formattedCityName} Cabs`,
            "item": `https://trivenicabs.in/${cityName}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${formattedCityName} to ${formattedDestination}`,
            "item": `https://trivenicabs.in/${createRouteSlug(cityName, destination)}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much does a taxi cost from ${formattedCityName} to ${formattedDestination}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Taxi fare from ${formattedCityName} to ${formattedDestination} starts from ${startingPrice} for one-way trips. The exact cost depends on vehicle type and trip duration. All prices include fuel, driver charges, and applicable taxes.`
            }
          },
          {
            "@type": "Question",
            "name": `How long does it take from ${formattedCityName} to ${formattedDestination}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The journey from ${formattedCityName} to ${formattedDestination} takes approximately ${route.time || estimatedTime} covering ${route.distance || estimatedDistance}. Travel time may vary based on traffic and weather conditions.`
            }
          },
          {
            "@type": "Question", 
            "name": `Is one-way cab booking available from ${formattedCityName} to ${formattedDestination}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, we provide one-way taxi service from ${formattedCityName} to ${formattedDestination} with no return charges. Book Sedan, SUV, or larger vehicles for comfortable travel with transparent pricing.`
            }
          }
        ]
      }
    ]
  }), [formattedCityName, formattedDestination, startingPrice, filteredVehicles, route, cityName, destination]);

  return (
    <>
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section - Enhanced with more semantic HTML */}
        <header
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
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link 
                    href="/" 
                    className="text-white hover:text-yellow-400 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <ChevronRight className="w-4 h-4 mx-1 text-white" />
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link 
                    href={`/${cityName}`}
                    className="text-white hover:text-yellow-400 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{formattedCityName} Cabs</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <ChevronRight className="w-4 h-4 mx-1 text-white" />
                <li className="text-yellow-400 font-medium" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name">{formattedDestination}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Book {formattedCityName} to {formattedDestination} <span className="text-yellow-400">Cab Service</span> - Starting ₹{startingPrice.replace('₹', '')}
              </h1>
              
              <p className="text-lg md:text-xl text-white mb-6 max-w-3xl leading-relaxed">
                Reliable and affordable taxi booking from {formattedCityName} to {formattedDestination} with professional drivers, 
                clean AC vehicles, and transparent pricing. Book one-way or round-trip cabs online. 24/7 customer support available.
              </p>
              
              {/* Key Info Pills */}
              <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-white text-sm md:text-base">
                  <Car className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
                  <span itemProp="distance">~{route.distance || estimatedDistance}</span>
                </div>
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-white text-sm md:text-base">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
                  <span itemProp="duration">~{route.time || estimatedTime}</span>
                </div>
                <div className="flex items-center bg-white/15 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-white text-sm md:text-base">
                  <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" />
                  <span itemProp="aggregateRating">4.8★ Rated Service</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleCallNow}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all transform hover:scale-105 font-medium"
                  aria-label={`Call ${phoneNumber} to book taxi from ${formattedCityName} to ${formattedDestination}`}
                  itemProp="telephone"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now - {phoneNumber}
                </button>
                
                <button 
                  onClick={handleWhatsApp}
                  className="bg-black hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all transform hover:scale-105 font-medium"
                  aria-label={`WhatsApp booking for ${formattedCityName} to ${formattedDestination} cab service`}
                >
                  <BsWhatsapp className="w-5 h-5 mr-2" />
                  WhatsApp Booking
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* Enhanced Service Highlights Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8" itemScope itemType="https://schema.org/Service">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
              Why Choose Our {formattedCityName} to {formattedDestination} Taxi Service?
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-3xl mx-auto">
              Experience premium cab service with verified drivers, transparent pricing, and 24/7 customer support. 
              Book your {formattedCityName} to {formattedDestination} taxi with confidence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4" itemScope itemType="https://schema.org/ServiceFeature">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" itemProp="name">Safe & Secure Journey</h3>
                <p className="text-gray-600 text-sm" itemProp="description">Verified drivers with valid licenses, GPS tracking, 24/7 support, and emergency assistance</p>
              </div>
              
              <div className="text-center p-4" itemScope itemType="https://schema.org/ServiceFeature">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" itemProp="name">Transparent Pricing</h3>
                <p className="text-gray-600 text-sm" itemProp="description">No hidden charges, fixed rates, advance booking confirmation, multiple payment options</p>
              </div>
              
              <div className="text-center p-4" itemScope itemType="https://schema.org/ServiceFeature">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" itemProp="name">Premium Fleet</h3>
                <p className="text-gray-600 text-sm" itemProp="description">Well-maintained AC vehicles, clean interiors, comfortable seating, spacious luggage space</p>
              </div>

              <div className="text-center p-4" itemScope itemType="https://schema.org/ServiceFeature">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" itemProp="name">24/7 Customer Support</h3>
                <p className="text-gray-600 text-sm" itemProp="description">Round-the-clock booking assistance, live tracking, instant support via call/WhatsApp</p>
              </div>
            </div>
          </section>

          {/* Enhanced Key Benefits Section */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {formattedCityName} to {formattedDestination} Cab Booking Benefits
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Experience hassle-free travel with our premium taxi service. Professional drivers, competitive rates, and reliable service for your {formattedCityName} to {formattedDestination} journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Navigation className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">GPS Tracked Journey</h3>
                <p className="text-gray-600 text-sm">Real-time location sharing and route optimization for fastest and safest travel from {formattedCityName} to {formattedDestination}.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Award className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Experienced Drivers</h3>
                <p className="text-gray-600 text-sm">Professional chauffeurs with extensive knowledge of {formattedCityName}-{formattedDestination} route and traffic patterns.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Clock className="w-8 h-8 text-yellow-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Punctual Service</h3>
                <p className="text-gray-600 text-sm">On-time pickup and drop service ensuring you reach {formattedDestination} as per your schedule.</p>
              </div>
            </div>
          </section>

          {/* Enhanced Vehicle Pricing Section with better SEO structure */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8" itemScope itemType="https://schema.org/Offer">
            <header className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {formattedCityName} to {formattedDestination} Cab Fare & Vehicle Options
                </h2>
                <p className="text-gray-600 text-sm">
                  Choose from our fleet of AC cabs including Sedan, SUV, Tempo Traveller. All prices include fuel, driver, and taxes.
                </p>
              </div>
              
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
                  aria-label="One way cab booking"
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
                  aria-label="Round trip cab booking"
                >
                  Round Trip
                </button>
              </div>
            </header>
            
            <div className="p-6">
              {/* Enhanced Vehicle Cards with microdata */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredVehicles.length > 0 ? filteredVehicles.map((price, index) => {
                  const currentPricingType = getVehiclePricingType(index);
                  const isRoundTrip = currentPricingType === 'roundTrip';
                  
                  return (
                    <article 
                      key={index} 
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                      itemScope 
                      itemType="https://schema.org/Product"
                    >
                      {/* Enhanced Vehicle Image with better alt text */}
                      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={getVehicleImage(price.vehicle)}
                          alt={`${price.vehicle} taxi for ${formattedCityName} to ${formattedDestination} cab service - Book online`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                          itemProp="image"
                        />
                      </div>
                      
                      {/* Enhanced Vehicle Info */}
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-2" itemProp="name">
                          {price.vehicle} - {formattedCityName} to {formattedDestination}
                        </h3>
                        
                        <div className="text-gray-600 text-sm flex items-center justify-center mb-4" itemProp="description">
                          <Users className="w-4 h-4 mr-1" />
                          {price.capacity || getVehicleCapacity(price.vehicle)} • AC • Professional Driver
                        </div>
                        
                        {/* Enhanced Round Trip Toggle */}
                        <div className="flex items-center justify-center mb-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isRoundTrip}
                              onChange={() => toggleVehiclePricing(index)}
                              className="sr-only"
                              aria-label={`Toggle round trip for ${price.vehicle}`}
                            />
                            <div className="relative">
                              <div className={`block w-10 h-6 rounded-full transition-colors ${isRoundTrip ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isRoundTrip ? 'translate-x-4' : ''}`}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">Round Trip Booking</span>
                          </label>
                        </div>
                        
                        {/* Enhanced Price with microdata */}
                        <div className="mb-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <div className={`text-2xl md:text-3xl font-bold ${isRoundTrip ? 'text-blue-600' : 'text-green-600'}`}>
                            <span itemProp="price">{isRoundTrip ? price.roundTrip : price.price}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            <span itemProp="description">{isRoundTrip ? 'Round Trip Fare' : 'One Way Fare'}</span>
                          </div>
                          <meta itemProp="priceCurrency" content="INR" />
                          <meta itemProp="availability" content="https://schema.org/InStock" />
                        </div>
                        
                        {/* Enhanced Book Button */}
                        <button
                          onClick={handleWhatsApp}
                          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                          aria-label={`Book ${price.vehicle} cab from ${formattedCityName} to ${formattedDestination}`}
                        >
                          Book {price.vehicle} Now
                        </button>
                      </div>
                    </article>
                  );
                }) : (
                  // Fallback vehicles
                  <>
                    <article className="bg-gray-50 border border-gray-200 rounded-xl p-6" itemScope itemType="https://schema.org/Product">
                      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-white">
                        <Image
                          src="/images/car/car1.png"
                          alt={`Sedan taxi booking ${formattedCityName} to ${formattedDestination} - AC cab service`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority
                          itemProp="image"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-2" itemProp="name">Sedan Cab - {formattedCityName} to {formattedDestination}</h3>
                        <div className="text-gray-600 text-sm flex items-center justify-center mb-4" itemProp="description">
                          <Users className="w-4 h-4 mr-1" />
                          4 passengers • AC • Professional Driver
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <span itemProp="price">₹12/km</span>
                          <meta itemProp="priceCurrency" content="INR" />
                        </div>
                        <button
                          onClick={handleWhatsApp}
                          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                          aria-label={`Book Sedan cab from ${formattedCityName} to ${formattedDestination}`}
                        >
                          Book Sedan Cab
                        </button>
                      </div>
                    </article>
                    
                    <article className="bg-gray-50 border border-gray-200 rounded-xl p-6" itemScope itemType="https://schema.org/Product">
                      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-white">
                        <Image
                          src="/images/car/car2.png"
                          alt={`SUV taxi booking ${formattedCityName} to ${formattedDestination} - spacious AC cab service`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          itemProp="image"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-2" itemProp="name">SUV Cab - {formattedCityName} to {formattedDestination}</h3>
                        <div className="text-gray-600 text-sm flex items-center justify-center mb-4" itemProp="description">
                          <Users className="w-4 h-4 mr-1" />
                          6-7 passengers • AC • Professional Driver
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <span itemProp="price">₹16/km</span>
                          <meta itemProp="priceCurrency" content="INR" />
                        </div>
                        <button
                          onClick={handleWhatsApp}
                          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                          aria-label={`Book SUV cab from ${formattedCityName} to ${formattedDestination}`}
                        >
                          Book SUV Cab
                        </button>
                      </div>
                    </article>
                  </>
                )}
              </div>

              {/* Enhanced Round Trip Only Vehicles Info */}
              {activeTab === 'oneWay' && roundTripOnlyVehicles.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Group Travel Options - {formattedCityName} to {formattedDestination}
                      </h3>
                      <p className="text-blue-700 mb-4 text-sm">
                        For family groups and corporate travel, book our Tempo Travellers and Luxury Buses exclusively for round-trip journeys. 
                        Perfect for {formattedCityName} to {formattedDestination} group tours and family outings.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roundTripOnlyVehicles.slice(0, 2).map((vehicle, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-8 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                                <Image
                                  src={getVehicleImage(vehicle.vehicle)}
                                  alt={`${vehicle.vehicle} for ${formattedCityName} to ${formattedDestination} group booking`}
                                  fill
                                  className="object-contain"
                                  sizes="48px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 text-sm truncate">{vehicle.vehicle} - Round Trip</h4>
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
                        💡 Switch to Round Trip to see all vehicle options for {formattedCityName} to {formattedDestination}!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Enhanced Route Information Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {formattedCityName} to {formattedDestination} Route Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <MapPin className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Distance & Duration</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Distance:</strong> ~{route.distance || estimatedDistance}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Travel Time:</strong> ~{route.time || estimatedTime}
                </p>
                <p className="text-sm text-gray-500">
                  Actual time may vary based on traffic conditions and weather.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <Car className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Best Travel Times</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Fastest:</strong> Early morning (5-7 AM)
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Comfortable:</strong> Late morning (10 AM-12 PM)
                </p>
                <p className="text-sm text-gray-500">
                  Book advance for preferred departure times.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <Shield className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Safety Features</h3>
                <p className="text-gray-600 mb-2">
                  <strong>✓</strong> GPS tracking enabled
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>✓</strong> Verified driver details
                </p>
                <p className="text-sm text-gray-500">
                  Your safety is our top priority for {formattedCityName} to {formattedDestination} travel.
                </p>
              </div>
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
              {formattedCityName} to {formattedDestination} Cab Booking - Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <span itemProp="name">How much does a taxi cost from {formattedCityName} to {formattedDestination}?</span>
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    Taxi fare from {formattedCityName} to {formattedDestination} starts from {startingPrice} for one-way trips. 
                    The exact cost depends on vehicle type (Sedan ₹12/km, SUV ₹16/km, Tempo Traveller for groups) and trip type (one-way or round-trip). 
                    All prices include fuel, driver allowance, toll charges, and applicable taxes. Round-trip bookings often offer better value with package deals.
                  </div>
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <span itemProp="name">How long does it take to travel from {formattedCityName} to {formattedDestination}?</span>
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    The journey from {formattedCityName} to {formattedDestination} typically takes {route.time || estimatedTime} 
                    {' '}covering approximately {route.distance || estimatedDistance}. Travel time may vary based on traffic conditions, 
                    weather, route taken, and number of stops. Our drivers choose the fastest and safest route for your comfort. 
                    Early morning departures (5-7 AM) usually have the shortest travel time due to lighter traffic.
                  </div>
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <span itemProp="name">Can I book a one-way cab from {formattedCityName} to {formattedDestination}?</span>
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    Yes, we provide one-way taxi service from {formattedCityName} to {formattedDestination}. 
                    You only pay for the actual distance traveled without any return charges. Sedans, SUVs, and Innova are available 
                    for one-way bookings. For better value on longer trips, consider our round-trip packages. 
                    One-way bookings are perfect for airport transfers, business meetings, or when you have different return arrangements.
                  </div>
                </div>
              </details>
              
              <details className="border border-gray-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <span itemProp="name">What safety measures do you follow for {formattedCityName} to {formattedDestination} trips?</span>
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    We ensure passenger safety through verified drivers with valid licenses and police verification, 
                    GPS-enabled vehicles for real-time tracking, regular vehicle maintenance and fitness certificates, 
                    24/7 customer support and emergency assistance, sanitized vehicles following health protocols, 
                    and insurance coverage for all passengers. All drivers follow traffic safety guidelines and are trained for long-distance travel.
                  </div>
                </div>
              </details>

              <details className="border border-gray-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <span itemProp="name">How to book {formattedCityName} to {formattedDestination} cab online?</span>
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    Booking {formattedCityName} to {formattedDestination} cab is easy! Call us at {phoneNumber} for instant booking or 
                    WhatsApp us with your travel details. Provide pickup location, destination, date, time, and passenger count. 
                    You can also book online through our website with advance payment options. Confirmation with driver details 
                    will be shared via SMS/WhatsApp. We accept cash, UPI, card payments, and online transfers.
                  </div>
                </div>
              </details>

              <details className="border border-gray-200 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="bg-gray-50 p-4 font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                  <span itemProp="name">What is included in {formattedCityName} to {formattedDestination} cab fare?</span>
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">
                    Our {formattedCityName} to {formattedDestination} cab fare includes: fuel costs, professional driver charges, 
                    vehicle maintenance, insurance coverage, toll charges (where applicable), taxes, and 24/7 customer support. 
                    No hidden charges or extra fees. AC is complementary, and we provide water bottles for long journeys. 
                    Driver accommodation for overnight stays (if required) is included in round-trip packages.
                  </div>
                </div>
              </details>
            </div>
          </section>

          {/* Enhanced Content Section for SEO */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to {formattedCityName} to {formattedDestination} Taxi Service
            </h2>
            
            <div className="prose max-w-none text-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Choose Professional Cab Service for {formattedCityName} to {formattedDestination}?
              </h3>
              <p className="mb-4">
                Traveling from {formattedCityName} to {formattedDestination} requires reliable transportation, and our professional taxi service 
                ensures a comfortable, safe, and punctual journey. With experienced drivers familiar with the {formattedCityName}-{formattedDestination} 
                route, you can relax and enjoy the scenic journey while we handle the driving.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">
                Vehicle Options for Every Travel Need
              </h3>
              <p className="mb-4">
                Whether you're traveling solo, with family, or in a group, we have the perfect vehicle for your {formattedCityName} to {formattedDestination} 
                journey. Our fleet includes comfortable Sedans for 4 passengers, spacious SUVs (Ertiga/Innova) for 6-7 passengers, and Tempo Travellers 
                for larger groups up to 25 passengers. All vehicles are well-maintained, air-conditioned, and equipped with safety features.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">
                Transparent Pricing Policy
              </h3>
              <p className="mb-4">
                Our {formattedCityName} to {formattedDestination} cab fare is completely transparent with no hidden charges. The quoted price includes 
                fuel, driver charges, toll fees, taxes, and vehicle maintenance. We offer competitive rates starting from {startingPrice} for one-way 
                trips and special package deals for round-trip bookings. Payment can be made via cash, UPI, cards, or online transfer.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">
                Booking Process Made Simple
              </h3>
              <p className="mb-4">
                Booking your {formattedCityName} to {formattedDestination} taxi is hassle-free. Simply call {phoneNumber} or WhatsApp us with your 
                travel details including pickup location, destination, date, time, and number of passengers. We provide instant confirmation with 
                driver details, vehicle information, and contact numbers. Our customer support team is available 24/7 to assist with your booking.
              </p>
            </div>
          </section>
          
          {/* Enhanced Related Routes Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Popular Cab Routes from {formattedCityName}
            </h2>
            <p className="text-gray-600 mb-6">
              Explore other popular taxi destinations from {formattedCityName}. Book reliable cab service to these cities with professional drivers and transparent pricing.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {routes
                .filter(r => r.destination !== formattedDestination)
                .slice(0, 8)
                .map((routeItem, index) => (
                <Link 
                  key={index}
                  href={`/${createRouteSlug(cityName, routeItem.destination)}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 flex items-center justify-between group"
                  title={`Book cab from ${formattedCityName} to ${routeItem.destination} - Starting ₹${routeItem.startingPrice || '2500'}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium group-hover:text-yellow-700 text-sm truncate">
                      {formattedCityName} to {routeItem.destination} Cab
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {routeItem.distance} • {routeItem.time} • Book Online
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-yellow-500 flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* Enhanced Footer CTA */}
        <section className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Book Your {formattedCityName} to {formattedDestination} Cab?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust our reliable taxi service. 
              Book now for instant confirmation and enjoy a comfortable journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleCallNow}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-all font-medium"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {phoneNumber}
              </button>
              <button 
                onClick={handleWhatsApp}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg flex items-center justify-center transition-all font-medium"
              >
                <BsWhatsapp className="w-5 h-5 mr-2" />
                WhatsApp Booking
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}