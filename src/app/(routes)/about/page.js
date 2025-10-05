'use client';

import React, { memo, useCallback, useMemo } from "react";
import { MapPin, Car, Clock, Phone, ChevronRight, Shield, Users, Award, Star, CheckCircle, TrendingUp, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { features, phoneNumber, officeLocations } from "@/utilis/data";

// SEO Keywords Strategy:
// Easy Volume: "cab service", "taxi booking", "car rental" (high volume, high competition)
// Medium Volume: "outstation cab", "airport taxi", "Delhi cab service" (medium volume, medium competition)
// Long-tail: "book cab Delhi to Agra", "24/7 taxi service India", "affordable outstation cab booking" (low volume, low competition - EASIER TO RANK)

// Memoized components
const FeatureCard = memo(({ feature, index }) => (
  <div
    className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
    role="article"
    aria-labelledby={`feature-${index}`}
  >
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
        <feature.icon className="w-8 h-8 text-yellow-600" aria-hidden="true" />
      </div>
      <h3 id={`feature-${index}`} className="text-xl font-bold text-gray-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

const ServiceCard = memo(({ icon: Icon, title, description, keywordTag }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    <Icon className="w-12 h-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center flex-grow">{description}</p>
    {keywordTag && (
      <span className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full mt-3 text-center font-medium">
        {keywordTag}
      </span>
    )}
  </div>
));

ServiceCard.displayName = 'ServiceCard';

const ValueItem = memo(({ icon: Icon, title, description }) => (
  <div className="flex items-start">
    <Icon className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
));

ValueItem.displayName = 'ValueItem';

export default function AboutPage() {
  const router = useRouter();

  const whatsappUrls = useMemo(() => {
    const bookingMessage = encodeURIComponent("Hi! I would like to book a cab. Can you please help me with the booking process?");
    const quoteMessage = encodeURIComponent("Hi! I would like to get a quote for cab services. Can you please provide me with pricing details?");
    
    return {
      booking: `https://wa.me/91${phoneNumber}?text=${bookingMessage}`,
      quote: `https://wa.me/91${phoneNumber}?text=${quoteMessage}`
    };
  }, []);

  const handleBookNow = useCallback(() => {
    window.open(whatsappUrls.booking, '_blank', 'noopener,noreferrer');
  }, [whatsappUrls.booking]);

  const handleGetQuote = useCallback(() => {
    window.open(whatsappUrls.quote, '_blank', 'noopener,noreferrer');
  }, [whatsappUrls.quote]);

  // Service data with SEO keywords
  const serviceData = useMemo(() => [
    {
      icon: MapPin,
      title: "Local Cab Service & Airport Transfers",
      description: "City taxi booking, airport cab service, railway station pickups, and local sightseeing across India",
      keywordTag: "Local taxi • Airport cabs • City rides"
    },
    {
      icon: Car,
      title: "Outstation Cab Booking & Tour Packages",
      description: "Affordable outstation taxi rental, one-way cab booking, round-trip tours, and multi-city travel packages",
      keywordTag: "Outstation cabs • Tour packages • Long distance"
    },
    {
      icon: Users,
      title: "Corporate & Group Travel Solutions",
      description: "Business cab service, corporate event transportation, wedding car rental, and group tour bookings",
      keywordTag: "Corporate cabs • Group travel • Event transport"
    }
  ], []);

  const valuesData = useMemo(() => [
    {
      icon: Shield,
      title: "Safe & Verified Drivers",
      description: "All drivers are background verified with valid licenses, ensuring your safety on every ride."
    },
    {
      icon: Clock,
      title: "24/7 Cab Booking Service",
      description: "Round-the-clock taxi service with instant booking confirmation and on-time pickup guarantee."
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description: "Transparent pricing with no hidden charges. Compare and book the most affordable cab service online."
    }
  ], []);

  // Get office locations for display
  const officeCount = Object.keys(officeLocations || {}).length;

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Triveni Cabs",
    "description": "Professional cab service provider offering online taxi booking, outstation tours, airport transfers, and car rental across India. Book affordable cabs with 24/7 service.",
    "url": "https://trivenicabs.com",
    "logo": "https://trivenicabs.com/logo.png",
    "telephone": "+917668570551",
    "email": "info@trivenicabs.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Site 2, Industrial, S-65, Loni Rd, Block 9, Mohan Nagar",
      "addressLocality": "Sahibabad, Ghaziabad",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201007",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "850",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": [
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Agra" },
      { "@type": "City", "name": "Jaipur" },
      { "@type": "City", "name": "Chandigarh" },
      { "@type": "City", "name": "Shimla" },
      { "@type": "City", "name": "Manali" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cab Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local Cab Service",
            "description": "City taxi and airport transfer services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Outstation Cab Booking",
            "description": "Long distance taxi rental and tour packages"
          }
        }
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://trivenicabs.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://trivenicabs.com/about"
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />

      <div className="bg-gradient-to-b from-yellow-100 to-white min-h-screen">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat py-28"
          aria-labelledby="hero-heading"
          style={{
            backgroundImage: "url('/images/about/about_banner.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="inline-flex items-center space-x-1 md:space-x-3" role="list">
                <li role="listitem" className="inline-flex items-center">
                  <Link 
                    href="/" 
                    className="text-white hover:text-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  >
                    Home
                  </Link>
                </li>
                <li role="listitem">
                  <div className="flex items-center font-semibold">
                    <ChevronRight className="w-4 h-4 mx-2 text-white" aria-hidden="true" />
                    <span className="text-yellow-400 text-xl" aria-current="page">About Us</span>
                  </div>
                </li>
              </ol>
            </nav>
            
            <header>
              <h1 id="hero-heading" className="text-4xl tracking-wide md:text-5xl font-bold text-white mb-4">
                Best Cab Service in India - Triveni Cabs
              </h1>
              <p className="text-lg text-gray-200 max-w-3xl leading-relaxed">
                <strong>Professional taxi booking service</strong> offering <strong>online cab booking</strong>, 
                <strong> outstation tours</strong>, <strong>airport transfers</strong>, and <strong>affordable car rental</strong> across 
                India. Book your cab online with instant confirmation, 24/7 service, and transparent pricing.
              </p>
            </header>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 py-16">
          {/* About Section with Primary Keywords */}
          <section className="grid md:grid-cols-2 gap-12 mb-20" aria-labelledby="about-heading">
            <div className="space-y-8">
              <div>
                <h2 id="about-heading" className="text-4xl font-bold text-gray-900 mb-6">
                  About Triveni Cabs - India's Trusted Cab Service Provider
                </h2>
                
                {/* Paragraph 1: Primary Keywords (Easy to rank - high volume) */}
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <strong>Triveni Cabs</strong> is a leading <strong>cab service company in India</strong> providing 
                  reliable <strong>taxi booking services</strong> for <strong>local rides</strong>, <strong>outstation travel</strong>, 
                  <strong> airport transfers</strong>, and <strong>car rental</strong>. With years of experience in the 
                  <strong> transportation industry</strong>, we offer <strong>online cab booking</strong> with instant confirmation, 
                  professional drivers, and well-maintained vehicles.
                </p>

                {/* Paragraph 2: Medium Keywords (Moderate competition) */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  Whether you need a <strong>local taxi for city rides</strong>, <strong>airport cab service</strong> for 
                  hassle-free transfers, or <strong>outstation cab booking</strong> for weekend getaways, we provide 
                  <strong> affordable taxi services</strong> across major Indian cities including Delhi, Mumbai, Bangalore, 
                  Agra, Jaipur, Chandigarh, and 50+ destinations. Our <strong>24/7 cab service</strong> ensures you can 
                  book a taxi anytime, anywhere.
                </p>

                {/* Paragraph 3: Long-tail Keywords (Easy to rank - low competition) */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  <strong>Book cab online</strong> through our website or call us for <strong>instant cab booking</strong>. 
                  We offer <strong>one-way taxi service</strong>, <strong>round-trip cab rental</strong>, 
                  <strong> multi-city tour packages</strong>, and <strong>corporate cab services</strong>. Experience the 
                  best <strong>online taxi booking platform</strong> with GPS tracking, verified drivers, transparent 
                  pricing, and no hidden charges. Rated as the <strong>best cab service near me</strong> by thousands 
                  of satisfied customers.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookNow}
                  className="bg-yellow-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center font-semibold"
                >
                  Book Cab Online Now
                  <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </button>
                <button
                  onClick={handleGetQuote}
                  className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-md hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center font-semibold"
                >
                  Get Cab Quote
                  <Phone className="w-5 h-5 ml-2" aria-hidden="true" />
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/about/about_banner.jpg"
                alt="Triveni Cabs - Best cab service in India with professional drivers and modern fleet for online taxi booking"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority={false}
                loading="lazy"
              />
            </div>
          </section>

          {/* Stats Section with Keywords */}
          <section className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-12 mb-20 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <TrendingUp className="w-12 h-12 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-sm opacity-90">Successful Cab Bookings</div>
              </div>
              <div>
                <Users className="w-12 h-12 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">8,500+</div>
                <div className="text-sm opacity-90">Happy Customers</div>
              </div>
              <div>
                <MapPin className="w-12 h-12 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">{officeCount}+</div>
                <div className="text-sm opacity-90">Service Locations</div>
              </div>
              <div>
                <ThumbsUp className="w-12 h-12 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">4.8/5</div>
                <div className="text-sm opacity-90">Customer Rating</div>
              </div>
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="mb-20" aria-labelledby="features-heading">
            <header className="text-center mb-12">
              <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Triveni Cabs for Online Taxi Booking?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                India's most trusted <strong>cab booking service</strong> with professional drivers, GPS-tracked vehicles, 
                and customer-first approach. Book the <strong>best cab service near you</strong> with instant confirmation.
              </p>
            </header>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
              {features?.map((feature, index) => (
                <div key={`feature-${index}`} role="listitem">
                  <FeatureCard feature={feature} index={index} />
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12">
            <header className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Cab Services - Local, Outstation & Airport Taxi
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6">
                <strong>Triveni Cabs</strong> offers comprehensive <strong>taxi services in India</strong> including 
                <strong> local cab booking</strong>, <strong>outstation taxi rental</strong>, <strong>airport transfer service</strong>, 
                <strong> corporate car hire</strong>, and <strong>tour package bookings</strong>. We provide <strong>affordable cab service</strong> in 
                Delhi, Mumbai, Bangalore, Agra, Jaipur, Chandigarh, Shimla, Manali, Amritsar, and 50+ cities.
              </p>
              <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                <strong>Book online taxi</strong> for city rides, airport pickups, railway station transfers, 
                <strong> one-way cab service</strong>, <strong>round-trip tours</strong>, and <strong>multi-city packages</strong>. 
                Get <strong>instant cab booking</strong> with no hidden charges, GPS tracking, and 24/7 customer support. 
                Experience the <strong>best online cab booking platform</strong> with transparent pricing and professional service.
              </p>
            </header>
            
            <div className="grid md:grid-cols-3 gap-8 items-stretch" role="list">
              {serviceData.map((service, index) => (
                <div key={`service-${index}`} role="listitem">
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </section>

          {/* Mission & Values */}
          <section className="bg-gray-50 rounded-2xl p-12 mb-20" aria-labelledby="mission-heading">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 id="mission-heading" className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission - Best Cab Booking Experience
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  At <strong>Triveni Cabs</strong>, our mission is to provide the <strong>best cab service in India</strong> by 
                  offering safe, reliable, and <strong>affordable taxi booking</strong>. We aim to make <strong>online cab booking</strong> simple 
                  and convenient through instant confirmation, transparent pricing, and professional service.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe every journey should be comfortable and stress-free. That's why we invest in modern vehicles, 
                  professional driver training, GPS technology, and 24/7 customer support to deliver exceptional 
                  <strong> cab rental service</strong> across India.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why We're India's Trusted Taxi Service
                </h3>
                <div className="space-y-4" role="list">
                  {valuesData.map(({ icon, title, description }, index) => (
                    <div key={`value-${index}`} role="listitem">
                      <ValueItem icon={icon} title={title} description={description} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Fleet Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Cab Fleet - Choose Your Perfect Ride
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <Car className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Sedan Cabs</h3>
                <p className="text-sm text-gray-600">Dzire, Etios for 4 passengers</p>
                <p className="text-xs text-yellow-700 mt-2 font-medium">Economy taxi</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <Car className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">SUV Cabs</h3>
                <p className="text-sm text-gray-600">Innova, Ertiga for 6-7 passengers</p>
                <p className="text-xs text-yellow-700 mt-2 font-medium">Family car rental</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Tempo Traveller</h3>
                <p className="text-sm text-gray-600">12-17 seater for groups</p>
                <p className="text-xs text-yellow-700 mt-2 font-medium">Group taxi booking</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <Car className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Luxury Cars</h3>
                <p className="text-sm text-gray-600">Premium sedans & SUVs</p>
                <p className="text-xs text-yellow-700 mt-2 font-medium">Corporate cab service</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-yellow-600 rounded-2xl p-12 text-center text-white" aria-labelledby="cta-heading">
            <header className="mb-8">
              <h2 id="cta-heading" className="text-3xl font-bold mb-4">
                Ready to Book Your Cab Online?
              </h2>
              <p className="text-xl opacity-90">
                Experience India's best cab booking service. Get instant confirmation, affordable rates, and 24/7 support!
              </p>
            </header>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookNow}
                className="bg-white text-yellow-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-600 transition-all duration-300 flex items-center justify-center"
              >
                Book Cab Now
                <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </button>
              <button
                onClick={handleGetQuote}
                className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-600 transition-all duration-300 flex items-center justify-center"
              >
                Get Fare Quote
                <Phone className="w-5 h-5 ml-2" aria-hidden="true" />
              </button>
            </div>
            
            <p className="mt-6 text-sm opacity-90">
              Call us: <a href="tel:7668570551" className="font-bold underline hover:text-gray-200">7668570551</a> | 
              Available 24/7 for instant cab booking
            </p>
          </section>
        </main>
      </div>
    </>
  );
}