'use client';

import React, { memo, useCallback, useMemo } from "react";
import { MapPin, Car, Clock, Phone, ChevronRight, Shield, Users, Award, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { features, phoneNumber } from "@/utilis/data";

// Memoized feature card component
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

// Memoized service card component
const ServiceCard = memo(({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    <Icon className="w-12 h-12 text-yellow-600 mx-auto mb-4" aria-hidden="true" />
    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center flex-grow flex items-center justify-center">{description}</p>
  </div>
));

ServiceCard.displayName = 'ServiceCard';

// Memoized value item component
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

  // Memoized WhatsApp URLs to prevent recreation on every render
  const whatsappUrls = useMemo(() => {
    const bookingMessage = encodeURIComponent("Hi! I would like to book a cab. Can you please help me with the booking process?");
    const quoteMessage = encodeURIComponent("Hi! I would like to get a quote for cab services. Can you please provide me with pricing details?");
    
    return {
      booking: `https://wa.me/91${phoneNumber}?text=${bookingMessage}`,
      quote: `https://wa.me/91${phoneNumber}?text=${quoteMessage}`
    };
  }, []);

  // Memoized event handlers
  const handleBookNow = useCallback(() => {
    window.open(whatsappUrls.booking, '_blank', 'noopener,noreferrer');
  }, [whatsappUrls.booking]);

  const handleGetQuote = useCallback(() => {
    window.open(whatsappUrls.quote, '_blank', 'noopener,noreferrer');
  }, [whatsappUrls.quote]);

  // Memoized service data with balanced content
  const serviceData = useMemo(() => [
    {
      icon: MapPin,
      title: "Local Transportation",
      description: "City rides, airport transfers, and local sightseeing services"
    },
    {
      icon: Car,
      title: "Outstation Tours",
      description: "Multi-city tours and long-distance travel packages"
    },
    {
      icon: Users,
      title: "Group Travel",
      description: "Corporate events, weddings, and large group transportation"
    }
  ], []);

  // Memoized values data
  const valuesData = useMemo(() => [
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety is our top priority in every journey."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "On-time service you can always count on."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Continuous improvement in all our services."
    }
  ], []);

  return (
    <div className="bg-gradient-to-b from-yellow-100 to-white min-h-screen">
      {/* Breadcrumb Section with optimized background */}
      <nav
        className="relative bg-cover bg-center bg-no-repeat text-sm text-gray-600 py-28"
        aria-label="Breadcrumb"
        style={{
          backgroundImage: "url('/images/about/about_banner.jpg')",
        }}
      >
        {/* Overlay with better opacity */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Breadcrumb with proper semantic structure */}
          <ol className="inline-flex items-center space-x-1 md:space-x-3" role="list">
            <li role="listitem" className="inline-flex items-center">
              <Link 
                href="/" 
                className="text-white hover:text-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded"
                aria-label="Go to homepage"
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
          
          <header className="mt-8">
            <h1 className="text-4xl tracking-wide md:text-5xl font-bold text-white mb-4">
              Connecting Dreams with Destinations
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl">
              Your trusted travel partner for seamless, reliable, and comfortable transportation solutions across India.
            </p>
          </header>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Main About Section with better image optimization */}
        <section className="grid md:grid-cols-2 gap-12 mb-20" aria-labelledby="about-heading">
          <div className="space-y-8">
            <div>
              <h2 id="about-heading" className="text-4xl font-bold text-gray-900 mb-6">
                About Triveni Cabs
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Welcome to Triveni Cabs, your trusted travel partner dedicated to providing seamless, reliable, and comfortable transportation solutions. Whether you are planning a quick ride across the city, an outstation journey, or an airport transfer, we are here to ensure your travel is smooth, affordable, and enjoyable.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With years of experience in the transportation industry, we have built a reputation for excellence, safety, and customer satisfaction. Our modern fleet of vehicles and professional drivers ensure that every journey with us is memorable for all the right reasons.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBookNow}
                className="bg-yellow-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center font-semibold"
                aria-label="Get started with booking a cab"
              >
                Get Started Today
                <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </button>
              <button
                onClick={handleGetQuote}
                className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-md hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center font-semibold"
                aria-label="Contact our team for more information"
              >
                Contact Our Team
                <Phone className="w-5 h-5 ml-2" aria-hidden="true" />
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/about/about_banner.jpg"
              alt="Triveni Cabs professional transportation services - modern fleet of vehicles"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </section>

        {/* Why Choose Us Section with memoized components */}
        <section className="mb-20" aria-labelledby="features-heading">
          <header className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Triveni Cabs?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We stand out in the transportation industry with our commitment to quality, safety, and customer satisfaction.
            </p>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {features?.map((feature, index) => (
              <div key={`feature-${index}`} role="listitem">
                <FeatureCard feature={feature} index={index} />
              </div>
            )) || (
              <div className="col-span-full text-center text-gray-500">
                Features data not available
              </div>
            )}
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="bg-gray-50 rounded-2xl p-12 mb-20" aria-labelledby="mission-heading">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 id="mission-heading" className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At Triveni Cabs, our mission is to redefine travel by offering unparalleled convenience, safety, and affordability. We aim to connect people and places with reliability and excellence, making every journey memorable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that transportation should be stress-free, comfortable, and accessible to everyone. Thats why we continuously invest in our fleet, technology, and training to deliver the best possible experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Core Values
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

        {/* Service Coverage Section */}
        <section className="mb-20" aria-labelledby="services-heading">
          <header className="text-center mb-8">
            <h2 id="services-heading" className="text-3xl font-bold text-gray-900 mb-6">
              Extensive Service Coverage
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
              From local city rides to outstation tours, airport transfers to corporate travel, we provide comprehensive transportation solutions across major Indian cities including Delhi, Mumbai, Agra, Jaipur, Manali, Shimla, and many more destinations.
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

        {/* Call to Action */}
        <section className="bg-yellow-600 rounded-2xl p-12 text-center text-white" aria-labelledby="cta-heading">
          <header className="mb-8">
            <h2 id="cta-heading" className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90">
              Experience the difference with Triveni Cabs. Book your ride today!
            </p>
          </header>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBookNow}
              className="bg-white text-yellow-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-600 transition-all duration-300 flex items-center justify-center"
              aria-label="Book a cab now"
            >
              Book Now
              <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </button>
            <button
              onClick={handleGetQuote}
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-600 transition-all duration-300 flex items-center justify-center"
              aria-label="Get a price quote"
            >
              Get Quote
              <Phone className="w-5 h-5 ml-2" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}