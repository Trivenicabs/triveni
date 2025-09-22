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

// SEO-Enhanced Hero Banner Component
const HeroBanner = ({ formattedCityName }) => {
  const generateHeroStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Triveni Cabs ${formattedCityName}`,
    "description": `Professional taxi service in ${formattedCityName} for outstation trips, airport transfers, local tours and wedding car rentals. 24/7 service with GPS tracking.`,
    "telephone": `+91${phoneNumber}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": formattedCityName,
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "₹₹",
    "image": "/images/about/about_banner.jpg"
  });

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHeroStructuredData()) }}
      />
      <section
        className="relative bg-cover bg-center bg-no-repeat py-16 md:py-32"
        style={{
          backgroundImage: "url('/images/about/about_banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO-Enhanced Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" className="text-white hover:text-yellow-400 transition-colors" itemProp="item">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <ChevronRight className="w-4 h-4 mx-2 text-white" />
              <li className="text-yellow-400 font-medium" aria-current="page" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">Taxi Service {formattedCityName}</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          {/* SEO-Optimized Hero Content */}
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Best Taxi Service in <span className="text-yellow-400">{formattedCityName}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
              Professional outstation taxi booking in {formattedCityName} with 24/7 service, GPS tracking, 
              verified drivers. Book online taxi for airport transfers, local tours, wedding car rentals at best rates.
            </p>
            
            {/* Key Features for SEO */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
              <div className="text-center text-white">
                <Clock className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                <span>24/7 Service</span>
              </div>
              <div className="text-center text-white">
                <Shield className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                <span>GPS Tracking</span>
              </div>
              <div className="text-center text-white">
                <Car className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                <span>Clean Vehicles</span>
              </div>
              <div className="text-center text-white">
                <Star className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                <span>Expert Drivers</span>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:+91${phoneNumber}`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label={`Call taxi service in ${formattedCityName}`}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: {phoneNumber}
              </a>
              <a
                href={`https://wa.me/${phoneNumber}?text=Hi, I need taxi service in ${formattedCityName}. Please share rates and availability.`}
                className="bg-black hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black"
                aria-label={`WhatsApp taxi booking in ${formattedCityName}`}
              >
                <BsWhatsapp className="w-5 h-5 mr-2" />
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// SEO-Enhanced Vehicle Card Component
const VehicleCard = ({ vehicle, onBookNow, index, cityName }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const generateVehicleStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${vehicle.type} Taxi Service ${cityName}`,
    "description": `Book ${vehicle.type} taxi in ${cityName}. ${vehicle.seating} seater vehicle with AC, GPS tracking and professional driver.`,
    "image": vehicle.image || "/images/car/car1.png",
    "brand": {
      "@type": "Brand",
      "name": "Triveni Cabs"
    },
    "offers": {
      "@type": "Offer",
      "price": vehicle.perKm?.replace('₹', '') || "12",
      "priceCurrency": "INR",
      "priceSpecification": "Per Kilometer"
    }
  });

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVehicleStructuredData()) }}
      />
      <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col" itemScope itemType="https://schema.org/Product">
        {/* Enhanced Vehicle Image */}
        <div className="relative h-40 md:h-48 bg-gray-100">
          <Image
            src={vehicle.image || "/images/car/car1.png"}
            alt={`${vehicle.type} taxi available for booking in ${cityName} - ${vehicle.seating} seater vehicle`}
            fill
            className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "/images/car/car1.png";
            }}
            itemProp="image"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Car className="w-8 h-8 text-gray-400 animate-pulse" />
            </div>
          )}
          
          {/* Enhanced Rating Badge */}
          <div className="absolute bottom-3 left-3 bg-black/80 rounded-full py-1 px-3 text-white flex items-center text-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
            {vehicle.rating || "4.5"}
            <span className="text-xs ml-1 hidden sm:inline">({vehicle.reviews || "500+"})</span>
          </div>
        </div>

        {/* Enhanced Card Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* SEO-Optimized Header */}
          <header className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg leading-tight" itemProp="name">
              {vehicle.type} Taxi {cityName}
            </h3>
            <div className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center ml-2">
              <Users className="w-3 h-3 mr-1" />
              <span className="text-xs">{vehicle.seating}</span>
            </div>
          </header>

          {/* Enhanced Pricing Grid with Schema */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-500 text-xs">Per KM Rate</p>
              <p className="font-semibold" itemProp="price">{vehicle.perKm || "₹12/km"}</p>
              <meta itemProp="priceCurrency" content="INR" />
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-500 text-xs">Driver Charges</p>
              <p className="font-semibold text-xs">{vehicle.driverCharges || "₹500/day"}</p>
            </div>
          </div>

          {/* Enhanced Features Section */}
          <div className="mb-4 flex-1">
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <ShieldCheck className="w-3 h-3 text-yellow-500 mr-1" />
              Vehicle Features
            </h4>
            <div className="flex flex-wrap gap-1">
              {(vehicle.facilities || ['AC', 'GPS Tracking', 'Music System', 'Clean Interior']).slice(0, 4).map((feature, i) => (
                <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Book Button */}
          <button
            onClick={onBookNow}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            aria-label={`Book ${vehicle.type} taxi in ${cityName}`}
          >
            Book {vehicle.type} Now
          </button>
        </div>
      </article>
    </>
  );
};

// Enhanced Coverage Section with Better SEO
const CoverageSection = ({ details, cityName }) => {
  const coverageAreas = useMemo(() => [
    {
      title: "Full Service Areas",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      data: details.coverage?.fullCoverage || [`${cityName} City Center`, `${cityName} Airport`, `${cityName} Railway Station`]
    },
    {
      title: "Pickup Locations", 
      icon: AlertTriangle,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      data: details.coverage?.limitedCoverage || [`${cityName} Hotels`, `${cityName} Mall`, `${cityName} Bus Stand`]
    },
    {
      title: "Tourist Destinations",
      icon: MapPin,
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      data: details.coverage?.restricted || [`${cityName} Temples`, `${cityName} Museums`, `${cityName} Parks`]
    }
  ], [details.coverage, cityName]);

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 mb-2">
          <MapIcon className="w-5 h-5 text-yellow-500" />
          Taxi Service Coverage in {cityName}
        </h2>
        <p className="text-gray-600 text-sm">
          We provide comprehensive taxi service coverage across {cityName} with pickup from all major locations
        </p>
      </header>
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
                    +{area.data.length - 4} more locations
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Available on request</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Enhanced Tourist Spots Section
const TouristSpotsSection = ({ citySpots, formattedCityName }) => {
  const defaultSpots = useMemo(() => [
    {
      name: `${formattedCityName} City Tour`,
      image: "/images/about/about_banner.jpg",
      description: `Full day sightseeing tour of ${formattedCityName} covering major attractions, historical sites and cultural landmarks with comfortable taxi service`
    },
    {
      name: `${formattedCityName} Airport Transfer`,
      image: "/images/about/about_banner.jpg", 
      description: `Reliable airport pickup and drop service in ${formattedCityName} with on-time guarantee and professional drivers`
    },
    {
      name: `${formattedCityName} Shopping Tour`,
      image: "/images/about/about_banner.jpg",
      description: `Visit popular markets and shopping centers in ${formattedCityName} with convenient taxi service and local guidance`
    }
  ], [formattedCityName]);

  const spotsToDisplay = citySpots.length > 0 ? citySpots.slice(0, 6) : defaultSpots;

  const generateTouristSpotsStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": `Tourist Places in ${formattedCityName}`,
    "description": `Popular tourist destinations and attractions in ${formattedCityName} accessible by taxi service`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": formattedCityName,
      "addressCountry": "IN"
    }
  });

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateTouristSpotsStructuredData()) }}
      />
      <section className="space-y-4">
        <header>
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 mb-2">
            <LocateIcon className="w-5 h-5 text-yellow-500" />
            Tourist Places to Visit in {formattedCityName}
          </h2>
          <p className="text-gray-600 text-sm">
            Book taxi service to explore popular tourist destinations and attractions in {formattedCityName}
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {spotsToDisplay.map((spot, index) => (
            <article
              key={spot.name || index}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              itemScope 
              itemType="https://schema.org/TouristAttraction"
            >
              <div className="relative w-full h-40 md:h-48 bg-gray-100">
                <Image
                  src={spot.image || "/images/about/about_banner.jpg"}
                  alt={`${spot.name} - Tourist attraction in ${formattedCityName} accessible by taxi service`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/images/about/about_banner.jpg";
                  }}
                  itemProp="image"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 leading-tight" itemProp="name">
                  {spot.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed" itemProp="description">
                  {spot.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

// Enhanced Quick Info Section
const QuickInfoSection = ({ formattedCityName, details }) => {
  const infoCards = useMemo(() => [
    {
      icon: Clock,
      title: "24/7 Service",
      value: "Always Available",
      description: `Round-the-clock taxi booking in ${formattedCityName}`
    },
    {
      icon: Shield,
      title: "Safe & Secure", 
      value: "GPS Tracking",
      description: "Live tracking and verified drivers"
    },
    {
      icon: Car,
      title: "Multi Vehicle",
      value: "5+ Options",
      description: "Sedan to luxury buses available"
    },
    {
      icon: Star,
      title: "Top Rated",
      value: "4.8/5 Rating",
      description: "Excellent customer satisfaction"
    }
  ], [formattedCityName]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Service highlights">
      {infoCards.map((card, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
          <card.icon className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
          <div className="font-bold text-lg mb-1 text-gray-900">{card.value}</div>
          <div className="text-sm font-medium text-gray-700 mb-1">{card.title}</div>
          <div className="text-xs text-gray-500">{card.description}</div>
        </div>
      ))}
    </section>
  );
};

// Main Enhanced Component
export default function CityServiceClient({
  formattedCityName,
  citySpots,
  details,
  vehiclesServices
}) {
  // Optimized handlers with better tracking
  const handleCallNow = useCallback(() => {
    // Add analytics tracking here if needed
    window.open(`tel:+91${phoneNumber}`, '_blank');
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    const message = `Hi, I'm looking for reliable taxi service in ${formattedCityName}. Please share your best rates, vehicle options and availability for outstation trips.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }, [formattedCityName]);

  // Enhanced SEO structured data for the main page
  const generateMainStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": `Triveni Cabs ${formattedCityName}`,
    "description": `Professional taxi service in ${formattedCityName} offering outstation cabs, airport transfers, local taxi booking with 24/7 availability and GPS tracking`,
    "url": `https://triveni-cabs.com/${formattedCityName.toLowerCase()}`,
    "telephone": `+91${phoneNumber}`,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": formattedCityName,
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "serviceArea": {
      "@type": "City",
      "name": formattedCityName
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Taxi Services in ${formattedCityName}`,
      "itemListElement": vehiclesServices.slice(0, 5).map((vehicle, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `${vehicle.type} Taxi Service`,
          "description": `${vehicle.type} taxi booking in ${formattedCityName}`
        }
      }))
    }
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateMainStructuredData()) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Enhanced Hero Banner */}
        <HeroBanner formattedCityName={formattedCityName} />

        {/* Main Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 lg:p-8 space-y-8 md:space-y-12">
              
              {/* Enhanced Quick Info Cards */}
              <QuickInfoSection formattedCityName={formattedCityName} details={details} />

              {/* City Routes Section */}
              <CityRoutes cityName={formattedCityName} />

              {/* Enhanced Vehicle Services Section */}
              <section className="space-y-6">
                <header>
                  <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 mb-2">
                    <Car className="w-5 h-5 text-yellow-500" />
                    Best Taxi Fleet in {formattedCityName}
                  </h2>
                  <p className="text-gray-600">
                    Choose from our premium collection of well-maintained vehicles with professional drivers for your {formattedCityName} taxi booking
                  </p>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {vehiclesServices.slice(0, 6).map((vehicle, index) => (
                    <VehicleCard
                      key={`${vehicle.type}-${index}`}
                      vehicle={vehicle}
                      index={index}
                      cityName={formattedCityName}
                      onBookNow={handleWhatsAppClick}
                    />
                  ))}
                </div>

                {/* Additional vehicle info */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">All vehicles include:</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-700">
                    <div>✓ GPS Tracking</div>
                    <div>✓ AC & Music</div>
                    <div>✓ First Aid Kit</div>
                    <div>✓ Clean Interior</div>
                  </div>
                </div>
              </section>

              {/* Enhanced Coverage Areas */}
              <CoverageSection details={details} cityName={formattedCityName} />

              {/* Enhanced Tourist Spots */}
              <TouristSpotsSection
                citySpots={citySpots}
                formattedCityName={formattedCityName}
              />

              {/* Enhanced FAQ Section */}
              <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Frequently Asked Questions - Taxi Service {formattedCityName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">How to book taxi in {formattedCityName}?</h3>
                    <p className="text-sm text-gray-600">
                      Call us at {phoneNumber} or WhatsApp for instant taxi booking in {formattedCityName}. 
                      We provide 24/7 service with immediate confirmation.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">What are taxi rates in {formattedCityName}?</h3>
                    <p className="text-sm text-gray-600">
                      Our taxi rates start from ₹12/km with transparent pricing. 
                      No hidden charges for outstation trips from {formattedCityName}.
                    </p>
                  </div>
                </div>
              </section>

              {/* Enhanced Contact CTA Section */}
              <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 md:p-8 text-center border">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Book Your {formattedCityName} Taxi Now - Best Rates Guaranteed
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get instant taxi booking confirmation in {formattedCityName} with professional drivers, 
                  GPS tracking, and 24/7 customer support. Call now for best outstation taxi rates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleCallNow}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label={`Call for taxi booking in ${formattedCityName}`}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call {phoneNumber}
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label={`WhatsApp taxi booking in ${formattedCityName}`}
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
    </>
  );
}