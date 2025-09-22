'use client';

import React, { useState } from 'react';
import { ArrowRight, MapPin, Clock, Camera, Star, Building, Mountain, Waves, TreePine, Coffee, Eye, Phone, MessageCircle, Car, Users, Route as RouteIcon, ExternalLink, ArrowLeft, CheckCircle } from 'lucide-react';

const TouristAttractionsClient = ({ data }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);

  const { city, citySlug, attractions } = data;

  const getTypeColor = (type) => {
    const colors = {
      'Heritage': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Spiritual': 'bg-purple-100 text-purple-800 border-purple-200',
      'Royal': 'bg-red-100 text-red-800 border-red-200',
      'Architecture': 'bg-blue-100 text-blue-800 border-blue-200',
      'Lakes': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Fort': 'bg-orange-100 text-orange-800 border-orange-200',
      'Memorial': 'bg-gray-100 text-gray-800 border-gray-200',
      'Palace': 'bg-pink-100 text-pink-800 border-pink-200',
      'Adventure': 'bg-green-100 text-green-800 border-green-200',
      'Shopping': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Scenic': 'bg-teal-100 text-teal-800 border-teal-200',
      'Patriotic': 'bg-orange-100 text-orange-800 border-orange-200',
      'Wellness': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Heritage': Building,
      'Spiritual': Building,
      'Royal': Building,
      'Architecture': Building,
      'Lakes': Waves,
      'Fort': Building,
      'Memorial': Building,
      'Palace': Building,
      'Adventure': Mountain,
      'Shopping': Building,
      'Scenic': Mountain,
      'Patriotic': Building,
      'Wellness': TreePine
    };
    return icons[type] || Building;
  };

  const getUniqueTypes = () => {
    const types = [...new Set(attractions.map(attraction => attraction.type))];
    return types;
  };

  const getFilteredAttractions = () => {
    if (selectedType === 'all') return attractions;
    return attractions.filter(attraction => attraction.type === selectedType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('/images/tourist-bg.jpg')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Camera className="w-12 h-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Tourist Attractions in <span className="text-yellow-400">{city}</span>
              </h1>
            </div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Discover the most beautiful and historic places to visit in {city}. From ancient monuments to spiritual sites, 
              explore the rich heritage and culture of this amazing destination.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                {attractions.length} Attractions
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                Complete Guide
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Must Visit Places
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-gray-700">Filter by type:</span>
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({attractions.length})
            </button>
            {getUniqueTypes().map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type} ({attractions.filter(a => a.type === type).length})
              </button>
            ))}
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {getFilteredAttractions().map((attraction, index) => {
            const IconComponent = getTypeIcon(attraction.type);
            
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <IconComponent className="w-full h-full" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="w-8 h-8" />
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(attraction.type)}`}>
                        {attraction.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 leading-tight">{attraction.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {expandedCard === index ? attraction.description : `${attraction.description.slice(0, 150)}...`}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {attraction.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {expandedCard === index ? 'Show Less' : 'Read More'}
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      View Location
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Book Tempo CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-center text-white mb-16">
          <div className="flex items-center justify-center mb-6">
            <Car className="w-12 h-12 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Visit <span className="text-yellow-300">{city}?</span>
            </h2>
          </div>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Book a comfortable tempo traveller to explore all these amazing attractions in {city}. 
            Professional drivers, AC vehicles, and competitive rates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => window.open(`/tempo-traveller/delhi-to-${citySlug}`, '_blank')}
              className="bg-white hover:bg-gray-100 text-green-600 font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
            >
              <RouteIcon className="w-5 h-5 mr-3" />
              Book Tempo to {city}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center transition-all transform hover:scale-105">
              <Phone className="w-5 h-5 mr-3" />
              Call: +91-7668570551
            </button>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Planning Your Trip?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our travel experts can help you create a customized itinerary for visiting {city}  attractions. 
            Get personalized recommendations and book the perfect tempo traveller for your group.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Chat
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all">
              <Phone className="w-5 h-5 mr-2" />
              Request Callback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristAttractionsClient;