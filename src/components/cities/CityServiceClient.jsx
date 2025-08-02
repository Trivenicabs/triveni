'use client';

import { useEffect, useMemo, useCallback, useState } from "react";
import {
  MapPin, Phone, Car, X, Clock, Shield, AlertTriangle, CheckCircle, 
  MapIcon, Users, ChevronRight, LocateIcon, Star, ShieldCheck, 
  Menu, Wifi, Coffee, Navigation
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BsWhatsapp } from 'react-icons/bs';
import { phoneNumber } from "@/utilis/data";
import CityRoutes from "@/components/cities/CityRoutes";

// Hero Banner Component - Optimized
const HeroBanner = ({ formattedCityName }) => (
  <section
    className="relative bg-cover bg-center bg-no-repeat py-16 md:py-32"
    style={{
      backgroundImage: "url('/images/about/about_banner.jpg')",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
          <li>
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 mx-2 text-white" />
          <li className="text-yellow-400 font-medium" aria-current="page">
            {formattedCityName}
          </li>
        </ol>
      </nav>

      {/* Hero Content */}
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Triveni Cabs <span className="text-yellow-400">{formattedCityName}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
          Best taxi service in {formattedCityName} for outstation trips, local tours, 
          airport transfers & wedding car rentals
        </p>
        
        {/* Key Features */}
      

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`tel:+91${phoneNumber}`}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call {phoneNumber}
          </a>
          <a
            href={`https://wa.me/${phoneNumber}`}
            className="bg-black hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105"
          >
            <BsWhatsapp className="w-5 h-5 mr-2" />
            WhatsApp Booking
          </a>
        </div>
      </div>
    </div>
  </section>
);

// Optimized Vehicle Card Component
const VehicleCard = ({ vehicle, onBookNow, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Vehicle Image */}
      <div className="relative h-40 md:h-48 bg-gray-100">
        <Image
          src={vehicle.image || "/images/car/car1.png"}
          alt={`${vehicle.type} available for booking in the city`}
          fill
          className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = "/images/car/car1.png";
          }}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Car className="w-8 h-8 text-gray-400 animate-pulse" />
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 rounded-full py-1 px-3 text-white flex items-center text-sm">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
          {vehicle.rating}
          <span className="text-xs ml-1 hidden sm:inline">({vehicle.reviews})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg leading-tight">{vehicle.type}</h3>
          <div className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center ml-2">
            <Users className="w-3 h-3 mr-1" />
            <span className="text-xs">{vehicle.seating}</span>
          </div>
        </header>

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-500 text-xs">Per KM</p>
            <p className="font-semibold">{vehicle.perKm}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-500 text-xs">Driver</p>
            <p className="font-semibold text-xs">{vehicle.driverCharges || "₹500/day"}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 flex-1">
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <ShieldCheck className="w-3 h-3 text-yellow-500 mr-1" />
            Features
          </h4>
          <div className="flex flex-wrap gap-1">
            {(vehicle.facilities || ['AC', 'GPS', 'Music']).slice(0, 3).map((feature, i) => (
              <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={onBookNow}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
        >
          Book {vehicle.type}
        </button>
      </div>
    </article>
  );
};

// Optimized Coverage Section
const CoverageSection = ({ details }) => {
  const coverageAreas = useMemo(() => [
    {
      title: "Full Coverage",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      data: details.coverage?.fullCoverage || []
    },
    {
      title: "Limited Coverage", 
      icon: AlertTriangle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
      data: details.coverage?.limitedCoverage || []
    },
    {
      title: "Restricted Areas",
      icon: X,
      bgColor: "bg-red-50", 
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      data: details.coverage?.restricted || []
    }
  ], [details.coverage]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
        <MapIcon className="w-5 h-5 text-yellow-500" />
        Service Coverage Areas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coverageAreas.map((area, index) => (
          <div key={index} className={`${area.bgColor} border ${area.borderColor} p-4 rounded-lg`}>
            <div className="font-medium flex items-center gap-2 mb-3">
              <area.icon className={`w-4 h-4 ${area.iconColor}`} />
              {area.title}
            </div>
            {area.data.length > 0 ? (
              <ul className="space-y-1">
                {area.data.slice(0, 4).map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                    {item}
                  </li>
                ))}
                {area.data.length > 4 && (
                  <li className="text-xs text-gray-500 italic">
                    +{area.data.length - 4} more areas
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Information not available</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Optimized Tourist Spots Section
const TouristSpotsSection = ({ citySpots, formattedCityName }) => {
  const defaultSpots = useMemo(() => [
    {
      name: `${formattedCityName} City Center`,
      image: "/images/about/about_banner.jpg",
      description: `Explore the heart of ${formattedCityName} with its bustling markets and cultural landmarks`
    },
    {
      name: `${formattedCityName} Heritage Sites`,
      image: "/images/about/about_banner.jpg", 
      description: `Discover historical monuments and architectural marvels in ${formattedCityName}`
    },
    {
      name: `${formattedCityName} Local Markets`,
      image: "/images/about/about_banner.jpg",
      description: `Experience local culture and shopping in traditional markets of ${formattedCityName}`
    }
  ], [formattedCityName]);

  const spotsToDisplay = citySpots.length > 0 ? citySpots.slice(0, 6) : defaultSpots;

  return (
    <section className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
        <LocateIcon className="w-5 h-5 text-yellow-500" />
        Popular Tourist Spots in {formattedCityName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {spotsToDisplay.map((spot, index) => (
          <article
            key={spot.name || index}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
          >
            <div className="relative w-full h-40 md:h-48 bg-gray-100">
              <Image
                src={spot.image || "/images/about/about_banner.jpg"}
                alt={`${spot.name} - Popular tourist destination in ${formattedCityName}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/images/about/about_banner.jpg";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 leading-tight">{spot.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {spot.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

// Quick Info Cards Component
const QuickInfoSection = ({ formattedCityName, details }) => {
  const infoCards = useMemo(() => [
    {
      icon: Clock,
      title: "Service Hours",
      value: "24/7 Available",
      description: "Round-the-clock taxi service"
    },
    {
      icon: Shield,
      title: "Safety Features", 
      value: `${details.safetyFeatures?.length || 5}+ Features`,
      description: "GPS tracking, verified drivers"
    },
    {
      icon: Car,
      title: "Vehicle Types",
      value: "5+ Options",
      description: "Sedan to luxury buses"
    },
    
  ], [details.safetyFeatures]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {infoCards.map((card, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4 text-center">
          <card.icon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="font-bold text-lg mb-1">{card.value}</div>
          <div className="text-sm font-medium text-gray-700 mb-1">{card.title}</div>
          <div className="text-xs text-gray-500">{card.description}</div>
        </div>
      ))}
    </section>
  );
};

// Main Component
export default function CityServiceClient({
  formattedCityName,
  citySpots,
  details,
  vehiclesServices
}) {
  // Optimized handlers
  const handleCallNow = useCallback(() => {
    window.open(`tel:+91${phoneNumber}`, '_blank');
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    const message = `Hi, I'm looking for taxi service in ${formattedCityName}. Please share your rates and availability.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }, [formattedCityName]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Banner */}
      <HeroBanner formattedCityName={formattedCityName} />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8 space-y-8 md:space-y-12">
            
            {/* Quick Info Cards */}
            <QuickInfoSection formattedCityName={formattedCityName} details={details} />

            {/* City Routes Section */}
            <CityRoutes cityName={formattedCityName} />

            {/* Vehicle Services Section */}
            <section className="space-y-6">
              <header>
                <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 mb-2">
                  <Car className="w-5 h-5 text-yellow-500" />
                  Our Premium Fleet in {formattedCityName}
                </h2>
                <p className="text-gray-600">
                  Choose from our selection of well-maintained vehicles, perfect for any journey
                </p>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {vehiclesServices.slice(0, 6).map((vehicle, index) => (
                  <VehicleCard
                    key={index}
                    vehicle={vehicle}
                    index={index}
                    onBookNow={handleWhatsAppClick}
                  />
                ))}
              </div>
            </section>

            {/* Coverage Areas */}
            <CoverageSection details={details} />

            {/* Tourist Spots */}
            <TouristSpotsSection
              citySpots={citySpots}
              formattedCityName={formattedCityName}
            />

            {/* Contact CTA Section */}
            <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 md:p-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Ready to Book Your Ride in {formattedCityName}?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get instant quotes, professional drivers, and reliable service. 
                Our customer support team is available 24/7 to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCallNow}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call {phoneNumber}
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105"
                >
                  <BsWhatsapp className="w-5 h-5 mr-2" />
                  WhatsApp Booking
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}