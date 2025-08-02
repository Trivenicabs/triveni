'use client';

import React from "react";
import { MapPin, Car, Clock, Phone, ChevronRight, Shield, Users, Award, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { features, phoneNumber } from "@/utilis/data";

export default function AboutPage() {
  const router = useRouter();

  // WhatsApp redirect functions
  const handleBookNow = () => {
    const message = encodeURIComponent("Hi! I would like to book a cab. Can you please help me with the booking process?");
    window.open(`https://wa.me/91${phoneNumber}?text=${message}`, '_blank');
  };

  const handleGetQuote = () => {
    const message = encodeURIComponent("Hi! I would like to get a quote for cab services. Can you please provide me with pricing details?");
    window.open(`https://wa.me/91${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-yellow-100 to-white min-h-screen">
      {/* Breadcrumb Section */}
      <nav
        className="relative bg-cover bg-center bg-no-repeat text-sm text-gray-600 py-[7rem]"
        aria-label="Breadcrumb"
        style={{
          backgroundImage: "url('/images/about/about_banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-white hover:text-yellow-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center font-semibold">
                <ChevronRight className="w-4 h-4 mx-2 text-white" />
                <span className="text-yellow-400 text-xl">About Us</span>
              </div>
            </li>
          </ol>
          <h1 className="text-4xl tracking-[0.06rem] md:text-5xl font-bold text-white mt-8">
            Connecting Dreams with Destinations
          </h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl">
            Your trusted travel partner for seamless, reliable, and comfortable transportation solutions across India.
          </p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main About Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Triveni Cabs
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Welcome to Triveni Cabs, your trusted travel partner dedicated to providing seamless, reliable, and comfortable transportation solutions. Whether you're planning a quick ride across the city, an outstation journey, or an airport transfer, we are here to ensure your travel is smooth, affordable, and enjoyable.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With years of experience in the transportation industry, we have built a reputation for excellence, safety, and customer satisfaction. Our modern fleet of vehicles and professional drivers ensure that every journey with us is memorable for all the right reasons.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBookNow}
                className="bg-yellow-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-yellow-700 transition-all duration-300 flex items-center justify-center font-semibold"
              >
                Get Started Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={handleGetQuote}
                className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-md hover:bg-yellow-600 hover:text-white transition-all duration-300 flex items-center justify-center font-semibold"
              >
                Contact Our Team
                <Phone className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500">
            <img
              src="/images/about/about_banner.jpg"
              alt="Triveni Cabs - Professional Transportation Services"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why Choose Triveni Cabs?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We stand out in the transportation industry with our commitment to quality, safety, and customer satisfaction.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                    <feature.icon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At Triveni Cabs, our mission is to redefine travel by offering unparalleled convenience, safety, and affordability. We aim to connect people and places with reliability and excellence, making every journey memorable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that transportation should be stress-free, comfortable, and accessible to everyone. That's why we continuously invest in our fleet, technology, and training to deliver the best possible experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Safety First</h4>
                    <p className="text-gray-600">Your safety is our top priority in every journey.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Reliability</h4>
                    <p className="text-gray-600">On-time service you can always count on.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Excellence</h4>
                    <p className="text-gray-600">Continuous improvement in all our services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Coverage Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Extensive Service Coverage
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
            From local city rides to outstation tours, airport transfers to corporate travel, we provide comprehensive transportation solutions across major Indian cities including Delhi, Mumbai, Agra, Jaipur, Manali, Shimla, and many more destinations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <MapPin className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Transportation</h3>
              <p className="text-gray-600">City rides, airport transfers, and local sightseeing</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Car className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Outstation Tours</h3>
              <p className="text-gray-600">Multi-city tours and long-distance travel packages</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Users className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Travel</h3>
              <p className="text-gray-600">Corporate events, weddings, and large group transportation</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-yellow-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference with Triveni Cabs. Book your ride today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBookNow}
              className="bg-white text-yellow-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
              Book Now
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={handleGetQuote}
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-yellow-600 transition-all duration-300 flex items-center justify-center"
            >
              Get Quote
              <Phone className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}