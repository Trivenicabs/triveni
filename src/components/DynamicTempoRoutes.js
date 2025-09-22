'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Clock, Star, Shield, Phone, MessageCircle, Car, CheckCircle, ArrowRight, Route, Navigation, Calendar, Info, ChevronLeft, MapIcon, Compass, Camera } from 'lucide-react';

export default function DynamicTempoRoutesClient({ data }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const { routeSlug, origin, destination, routeData, hasTouristSpots, localSightseeing, fleet } = data;

  const getTypeColor = (type) => {
    const colors = {
      'Hill Station': 'bg-green-100 text-green-800',
      'Adventure': 'bg-orange-100 text-orange-800',
      'Spiritual': 'bg-purple-100 text-purple-800',
      'Heritage': 'bg-yellow-100 text-yellow-800',
      'Royal': 'bg-red-100 text-red-800',
      'Metro': 'bg-blue-100 text-blue-800',
      'Lakes': 'bg-cyan-100 text-cyan-800',
      'Desert': 'bg-amber-100 text-amber-800',
      'Blue City': 'bg-indigo-100 text-indigo-800',
      'Char Dham': 'bg-pink-100 text-pink-800',
      'Tourism': 'bg-gray-100 text-gray-800',
      'Commercial': 'bg-slate-100 text-slate-800',
      'Modern City': 'bg-teal-100 text-teal-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/tempo-hero.jpg"
            alt="Tempo Traveller Route Hero"
            fill
            className="object-cover opacity-30"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/tempo-traveller"
              className="inline-flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to All Routes
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(routeData.type)}`}>
                {routeData.type}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-yellow-400">{origin}</span> to <span className="text-yellow-400">{destination}</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Premium tempo traveller service from {origin} to {destination}. 
              Comfortable AC vehicles, professional drivers, competitive rates.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                Safe & Sanitized
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Professional Drivers
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                24/7 Available
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        
        {/* Route Info Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Route Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Route className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Route</h3>
                    <p className="text-gray-600">{origin} → {destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapIcon className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Destination Type</h3>
                    <p className="text-gray-600">{routeData.type}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Availability</h3>
                    <p className="text-gray-600">Available all year round</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Info className="w-6 h-6 text-orange-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Service Status</h3>
                    <p className={`font-medium ${routeData.exists ? 'text-green-600' : 'text-blue-600'}`}>
                      {routeData.exists ? 'Popular Route' : 'Available on Request'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Booking</h2>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Instant Quote</h3>
                <p className="text-gray-600 mb-6">Call or WhatsApp for immediate booking and best rates</p>
                
                <div className="space-y-4">
                  <a
                    href="tel:+917668570551"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Call: +91-7668570551
                  </a>
                  <a
                    href={`https://wa.me/917668570551?text=Hi, I need tempo traveller from ${origin} to ${destination}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp Booking
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Destination Highlights Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore {destination}</h2>
              <p className="text-gray-600">Discover amazing attractions and experiences in this {routeData.type?.toLowerCase() || 'destination'}</p>
            </div>
            <button
              onClick={() => window.open(`/tourist-attractions/${destination.toLowerCase()}`, '_blank')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-all"
            >
              <Camera className="w-5 h-5 mr-2" />
              View Attractions
            </button>
          </div>
          
          {hasTouristSpots ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center text-blue-700 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-medium">Popular tourist destination with rich cultural heritage</span>
              </div>
              <p className="text-blue-600 text-sm">
                {destination} offers numerous historical monuments, spiritual sites, and cultural experiences. 
                Explore detailed information about each attraction to plan your perfect itinerary.
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <div className="flex items-center text-green-700 mb-2">
                <Star className="w-5 h-5 mr-2" />
                <span className="font-medium">Beautiful {routeData.type?.toLowerCase() || 'destination'} perfect for group travel</span>
              </div>
              <p className="text-green-600 text-sm">
                Enjoy the scenic journey and natural beauty that {destination} has to offer.
              </p>
            </div>
          )}
        </div>

        {/* Available Fleet */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available <span className="text-yellow-500">Vehicles</span>
            </h2>
            <p className="text-lg text-gray-600">
              Choose the perfect tempo traveller for your group
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleet.map((vehicle) => (
              <div
                key={vehicle.id}
                className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {vehicle.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </span>
                  </div>
                )}
                
                {vehicle.premium && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      PREMIUM
                    </span>
                  </div>
                )}

                {/* Vehicle Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Hide the broken image
                      e.target.style.display = 'none';
                      // Show the gradient fallback
                      const parent = e.target.parentElement;
                      parent.className = parent.className.replace('bg-gray-100', `bg-gradient-to-r ${vehicle.color}`);
                      
                      // Add car icon if not already present
                      if (!parent.querySelector('.fallback-icon')) {
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'fallback-icon absolute inset-0 flex items-center justify-center';
                        fallbackDiv.innerHTML = '<svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5a1 1 0 100 2h4a1 1 0 100-2H8zM3 7a1 1 0 011-1h1.05L5.5 4.5A2.5 2.5 0 018 2h4a2.5 2.5 0 012.5 2.5L15 6h1a1 1 0 011 1v8a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"/></svg>';
                        parent.appendChild(fallbackDiv);
                      }
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${vehicle.color} opacity-20`}></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Car className="w-8 h-8 text-gray-600" />
                    <div className="flex items-center text-gray-500">
                      <Users className="w-5 h-5 mr-1" />
                      <span className="text-sm">{vehicle.capacity}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{vehicle.name}</h3>
                  <p className="text-gray-600 mb-4">{vehicle.capacity}</p>

                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Outstation Rate</span>
                        <span className="font-bold text-gray-900">{vehicle.outstationRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Local Rate</span>
                        <span className="text-sm font-medium text-gray-900">{vehicle.localRate}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-yellow-400 hover:to-yellow-500 hover:text-black text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Book This Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-yellow-500">Our Service</span>
            </h2>
            <p className="text-lg text-gray-600">
              Experience the difference with our premium tempo traveller service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-sm text-gray-600">Well-maintained vehicles with safety features and insurance coverage</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Drivers</h3>
              <p className="text-sm text-gray-600">Experienced, licensed drivers with local route knowledge</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Service</h3>
              <p className="text-sm text-gray-600">Round-the-clock booking and customer support for your convenience</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Rates</h3>
              <p className="text-sm text-gray-600">Competitive pricing with no hidden charges and transparent billing</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 md:p-12 text-center text-white mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Travel from <span className="text-yellow-400">{origin}</span> to <span className="text-yellow-400">{destination}</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Book now for the best rates and professional service. Available 24/7 for your convenience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+917668570551"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-3" />
              Call Now: +91-7668570551
            </a>
            <a
              href={`https://wa.me/917668570551?text=Hi, I want to book tempo traveller from ${origin} to ${destination}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              WhatsApp Booking
            </a>
          </div>
        </div>
      </div>

      {/* Vehicle Selection Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book {selectedVehicle.name}</h3>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Vehicle Image in Modal */}
            <div className="relative h-32 bg-gray-100 rounded-lg mb-6 overflow-hidden">
              <Image
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  parent.className = parent.className.replace('bg-gray-100', `bg-gradient-to-r ${selectedVehicle.color}`);
                  
                  if (!parent.querySelector('.modal-fallback-icon')) {
                    const fallbackDiv = document.createElement('div');
                    fallbackDiv.className = 'modal-fallback-icon absolute inset-0 flex items-center justify-center';
                    fallbackDiv.innerHTML = '<svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5a1 1 0 100 2h4a1 1 0 100-2H8zM3 7a1 1 0 011-1h1.05L5.5 4.5A2.5 2.5 0 018 2h4a2.5 2.5 0 012.5 2.5L15 6h1a1 1 0 011 1v8a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"/></svg>';
                    parent.appendChild(fallbackDiv);
                  }
                }}
              />
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-sm text-gray-600">Route:</span>
                <p className="font-medium">{origin} to {destination}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Vehicle:</span>
                <p className="font-medium">{selectedVehicle.name} ({selectedVehicle.capacity})</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Outstation Rate:</span>
                <p className="font-bold text-lg text-green-600">{selectedVehicle.outstationRate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Local Rate:</span>
                <p className="font-bold text-lg text-blue-600">{selectedVehicle.localRate}</p>
              </div>
              
              <div className="border-t pt-4">
                <span className="text-sm text-gray-600 block mb-2">Features:</span>
                <div className="grid grid-cols-1 gap-1">
                  {selectedVehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={`tel:+917668570551`}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all"
              >
                <Phone className="w-5 h-5 mr-3" />
                Call to Book
              </a>
              <a
                href={`https://wa.me/917668570551?text=Hi, I want to book ${selectedVehicle.name} from ${origin} to ${destination}. Please share the quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                WhatsApp to Book
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}