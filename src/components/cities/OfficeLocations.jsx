'use client';

import React, { useCallback } from 'react';
import { MapPin, Phone, Clock, Navigation, Mail } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';

const OfficeCard = ({ office, cityName, isOrigin = false }) => {
  // Optimized handlers with useCallback
  const handleCall = useCallback(() => {
    window.open(`tel:+91${office.contact.phone}`, '_blank');
  }, [office.contact.phone]);

  const handleWhatsApp = useCallback(() => {
    const message = `Hi, I'm interested in your taxi services at ${office.name}, ${cityName}. Please share more details about cab booking and rates.`;
    window.open(`https://wa.me/${office.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  }, [office.contact.whatsapp, office.name, cityName]);

  const handleGetDirections = useCallback(() => {
    const address = encodeURIComponent(office.fullAddress);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  }, [office.fullAddress]);

  // Generate structured data for each office
  const generateOfficeStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": office.name,
    "description": `Taxi service office in ${cityName} for cab booking, outstation trips and local tours. Professional drivers and verified vehicles available.`,
    "telephone": `+91${office.contact.phone}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": office.address,
      "addressLocality": cityName,
      "postalCode": office.pincode,
      "addressCountry": "IN"
    },
    "openingHours": office.timings === "24/7 Open" ? "Mo-Su 00:00-23:59" : office.timings,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": office.coordinates?.lat,
      "longitude": office.coordinates?.lng
    }
  });

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOfficeStructuredData()) }}
      />
      <article 
        className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
        itemScope 
        itemType="https://schema.org/LocalBusiness"
      >
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight" itemProp="name">
              {office.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                isOrigin 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}>
                {isOrigin ? '📍 Pickup Office - Taxi Booking' : '🎯 Drop Office - Taxi Service'}
              </span>
            </div>
          </div>
          
          {/* Contact Info - Mobile Optimized */}
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-gray-500">Contact for Cab Booking</div>
            <div className="font-semibold text-sm md:text-base" itemProp="telephone">
              +91-{office.contact.phone}
            </div>
          </div>
        </header>

        {/* Address Section - Flexible Layout */}
        <div className="mb-4 flex-1" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed" itemProp="streetAddress">
                {office.address}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span itemProp="addressLocality">{cityName}</span>, <span itemProp="postalCode">{office.pincode}</span>
                <meta itemProp="addressCountry" content="IN" />
              </p>
            </div>
          </div>
          
          {office.landmark && (
            <div className="ml-7 mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Landmark:</span> {office.landmark}
              </p>
            </div>
          )}

          {/* Operating Hours */}
          <div className="flex items-center gap-2 text-sm text-gray-600 ml-7" itemProp="openingHours">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-green-600">{office.timings}</span>
          </div>
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <footer className="space-y-2">
          {/* Primary Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCall}
              className="bg-green-600 text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              aria-label={`Call taxi office at ${office.contact.phone} for cab booking in ${cityName}`}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </button>
            
            <button
              onClick={handleWhatsApp}
              className="bg-black text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              aria-label={`WhatsApp taxi office for instant cab booking in ${cityName}`}
            >
              <BsWhatsapp className="w-4 h-4" />
              WhatsApp
            </button>
          </div>

          {/* Secondary Action */}
          <button
            onClick={handleGetDirections}
            className="w-full bg-gray-100 text-gray-700 py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            aria-label={`Get directions to taxi office in ${cityName}`}
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </button>
        </footer>
      </article>
    </>
  );
};

const OfficeLocations = ({ originCity, destinationCity, offices }) => {
  // Don't render if no offices found
  if (!offices || (!offices.origin && !offices.destination)) {
    return null;
  }

  const benefits = [
    {
      icon: "🤝",
      text: "Personal taxi booking assistance",
      color: "text-blue-600"
    },
    {
      icon: "💰", 
      text: "Transparent cab fare discussion",
      color: "text-green-600"
    },
    {
      icon: "🚗",
      text: "Vehicle inspection available", 
      color: "text-yellow-600"
    },
    {
      icon: "🗺️",
      text: "Custom outstation tour planning",
      color: "text-purple-600"
    },
    {
      icon: "🚨",
      text: "24/7 emergency taxi support",
      color: "text-red-600"
    },
    {
      icon: "📍",
      text: "Local area taxi expertise",
      color: "text-indigo-600"
    }
  ];

  // Generate structured data for office locations section
  const generateOfficeListStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Taxi Service Offices - ${originCity} to ${destinationCity}`,
    "description": `Visit our taxi booking offices for professional cab service between ${originCity} and ${destinationCity}`,
    "numberOfItems": [offices.origin, offices.destination].filter(Boolean).length,
    "itemListElement": [
      offices.origin && {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "LocalBusiness",
          "name": offices.origin.name,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": originCity
          }
        }
      },
      offices.destination && {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "LocalBusiness",
          "name": offices.destination.name,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": destinationCity
          }
        }
      }
    ].filter(Boolean)
  });

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOfficeListStructuredData()) }}
      />
      <section className="space-y-6" aria-labelledby="office-locations-heading">
        {/* Header */}
        <header>
          <h2 id="office-locations-heading" className="text-xl md:text-2xl font-semibold mb-2">
            Our Taxi Booking Offices - {originCity} & {destinationCity}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Visit our offices for hassle-free taxi booking, transparent cab fares and reliable service. 
            Our experienced team is ready to assist you with personalized travel solutions for {originCity} to {destinationCity} trips.
          </p>
        </header>
        
        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Origin Office */}
          {offices.origin && (
            <OfficeCard 
              office={offices.origin} 
              cityName={originCity}
              isOrigin={true}
            />
          )}
          
          {/* Destination Office */}
          {offices.destination && (
            <OfficeCard 
              office={offices.destination} 
              cityName={destinationCity}
              isOrigin={false}
            />
          )}
        </div>
        
        {/* Benefits Section - Enhanced */}
        <aside className="bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-xl p-4 md:p-6 border border-gray-200">
          <header className="mb-4">
            <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-2">
              Why Visit Our Taxi Booking Offices?
            </h3>
            <p className="text-sm text-gray-600">
              Get personalized cab service and expert guidance for your {originCity} to {destinationCity} travel needs
            </p>
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-lg border border-white/50 hover:bg-white/90 transition-all duration-200"
              >
                <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">
                  {benefit.icon}
                </span>
                <span className={`text-sm font-medium ${benefit.color} leading-tight`}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              💡 <strong>Pro Tip:</strong> Visit our offices to get exclusive taxi deals, best cab fares and 
              personalized travel recommendations from our local experts for {originCity} to {destinationCity} trips
            </p>
          </div>
        </aside>
      </section>
    </>
  );
};

export default OfficeLocations;