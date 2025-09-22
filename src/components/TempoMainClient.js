'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Clock, Star, Shield, Phone, MessageCircle, Car, CheckCircle, ArrowRight, Route, Navigation, Search, Filter } from 'lucide-react';

export default function TempoMainClient({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [showAllVehicles, setShowAllVehicles] = useState(false);

  const { popularRoutes, allRoutes, fleet, cities } = data;

  // Get unique origins for filter dropdown
  const getOriginCities = () => {
    const origins = [...new Set(allRoutes.map(route => route.origin))];
    return origins.sort();
  };

  // Filter routes based on search and origin selection
  const getFilteredRoutes = () => {
    let routes = selectedOrigin 
      ? allRoutes.filter(route => route.origin === selectedOrigin)
      : allRoutes;

    if (searchTerm) {
      routes = routes.filter(route => 
        route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return routes;
  };

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
            alt="Tempo Traveller Hero"
            fill
            className="object-cover opacity-30"
            priority
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium <span className="text-yellow-400">Tempo Traveller</span> Service
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Comfortable group travel across India's most beautiful destinations. 
              Professional drivers, well-maintained vehicles, competitive rates.
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
                24/7 Booking
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none"
                  >
                    <option value="">All Origins</option>
                    {getOriginCities().map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => setShowAllRoutes(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Search Routes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Popular Routes Section */}
        {!searchTerm && !selectedOrigin && !showAllRoutes && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Popular <span className="text-yellow-500">Routes</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Most booked tempo traveller routes across India
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularRoutes.map((route, index) => (
                  <Link
                    key={index}
                    href={`/tempo-traveller/${route.slug}`}
                    className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Route className="w-8 h-8 text-blue-600" />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(route.type)}`}>
                          {route.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {route.origin}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <ArrowRight className="w-4 h-4 mx-2" />
                        <span className="font-medium">{route.destination}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Route</span>
                        </div>
                        <div className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Book Now
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllRoutes(true)}
                  className="bg-gradient-to-r from-black to-gray-800 hover:from-yellow-400 hover:to-yellow-500 hover:text-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  View All Routes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Routes or Filtered Results */}
        {(showAllRoutes || searchTerm || selectedOrigin) && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {searchTerm || selectedOrigin ? 'Search Results' : 'All Routes'}
                </h2>
                <p className="text-lg text-gray-600">
                  {getFilteredRoutes().length} routes available
                </p>
                {(searchTerm || selectedOrigin || showAllRoutes) && (
                  <button
                    onClick={() => {
                      setShowAllRoutes(false);
                      setSearchTerm('');
                      setSelectedOrigin('');
                    }}
                    className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Back to Popular Routes
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredRoutes().map((route, index) => (
                  <Link
                    key={index}
                    href={`/tempo-traveller/${route.slug}`}
                    className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Navigation className="w-8 h-8 text-green-600" />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(route.type)}`}>
                          {route.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {route.origin}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <ArrowRight className="w-4 h-4 mx-2" />
                        <span className="font-medium">{route.destination}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Available</span>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                          View Details
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {getFilteredRoutes().length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No routes found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or contact us for custom routes</p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium transition-colors">
                    Contact Us
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fleet Overview Section */}
        {!searchTerm && !selectedOrigin && !showAllRoutes && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-yellow-500">Fleet</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose from our range of comfortable and well-maintained tempo travellers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(showAllVehicles ? fleet : fleet.slice(0, 3)).map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
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
                        // Fallback to a gradient background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentElement.className += ` bg-gradient-to-r ${vehicle.color}`;
                      }}
                    />
                    {/* Fallback gradient overlay */}
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

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {vehicle.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Outstation</span>
                        <span className="font-bold text-gray-900">{vehicle.outstationRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Local</span>
                        <span className="text-sm font-medium text-gray-900">{vehicle.localRate}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-yellow-400 hover:to-yellow-500 hover:text-black text-white font-semibold py-3 rounded-lg transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              {!showAllVehicles ? (
                <button
                  onClick={() => setShowAllVehicles(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  View All Vehicles ({fleet.length})
                </button>
              ) : (
                <button
                  onClick={() => setShowAllVehicles(false)}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 md:p-12 text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your <span className="text-yellow-400">Journey?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get instant quotes for any route across India. Professional service, competitive rates, 24/7 support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+917668570551"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
            >
              <Phone className="w-5 h-5 mr-3" />
              Call: +91-7668570551
            </a>
            <a
              href="https://wa.me/917668570551"
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
    </div>
  );
}