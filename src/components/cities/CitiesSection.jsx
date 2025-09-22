"use client";

import { useState, useMemo, useCallback } from "react";
import { MapPin, Car, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { cities } from "../../utilis/data";
import Link from "next/link";

const CitiesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Increased for better UX

  // Memoize filtered cities
  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      return city.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Memoize pagination data
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedCities = filteredCities.slice(startIndex, startIndex + itemsPerPage);
    
    return { totalPages, startIndex, displayedCities };
  }, [filteredCities, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    document.getElementById('cities-heading')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  // SEO-optimized heading variations
  const getCityHeading = useCallback((cityName, index) => {
    const headingVariations = [
      `Taxi Service in ${cityName}`,
      `${cityName} Cab Booking Online`,
      `Book Car Rental ${cityName}`,
      `${cityName} Outstation Taxi`,
      `Airport Taxi ${cityName}`,
      `${cityName} to Outstation Cab`,
    ];
    return headingVariations[index % headingVariations.length];
  }, []);

  // Structured data for cities
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Taxi Service Coverage",
      "description": `24/7 taxi booking services available in ${cities.length}+ cities across India`,
      "provider": {
        "@type": "Organization",
        "name": "Triveni Cabs"
      },
      "areaServed": cities.map(city => ({
        "@type": "City",
        "name": city.name,
        "addressRegion": city.coverage
      }))
    };
  };

  const PaginationControls = () => {
    const { totalPages } = paginationData;
    
    if (totalPages <= 1) return null;

    return (
      <nav 
        className="flex justify-center items-center gap-2 mt-8" 
        role="navigation" 
        aria-label="Cities pagination"
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 md:p-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-transparent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-2 bg-yellow-400 text-black font-bold rounded-lg min-w-[44px] text-center">
            {currentPage}
          </span>
          <span className="text-gray-500 text-sm">of {totalPages}</span>
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 md:p-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-transparent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Go to next page"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </nav>
    );
  };

  return (
    <>
      {/* Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50" aria-labelledby="cities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO-Optimized Hero Section */}
          <header className="text-center mb-8 md:mb-12">
            <span className="text-yellow-500 font-semibold mb-2 block text-sm md:text-base">
              India's Leading Taxi Service Network
            </span>
            <h1 id="cities-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Book Online Taxi in {cities.length}+ Cities Across India
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Reliable 24/7 outstation taxi booking with professional drivers, GPS tracking, 
              and competitive rates. Available in major cities including Delhi, Mumbai, Bangalore, Chennai and more.
            </p>
          </header>

          {/* Enhanced Search Section */}
          <div className="mb-8 md:mb-12">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border">
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <label htmlFor="city-search" className="sr-only">
                    Search taxi service cities in India
                  </label>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="city-search"
                    type="text"
                    placeholder="Search cities (e.g., Delhi, Mumbai, Bangalore)..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 text-sm md:text-base"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
            <p className="text-gray-600">
              Showing {paginationData.startIndex + 1}-
              {Math.min(paginationData.startIndex + itemsPerPage, filteredCities.length)} of{" "}
              {filteredCities.length} cities with taxi service
            </p>
            <p className="text-gray-600">
              Page {currentPage} of {paginationData.totalPages || 1}
            </p>
          </div>

          {/* SEO-Enhanced City Grid */}
          <main>
            {paginationData.displayedCities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {paginationData.displayedCities.map((city, index) => (
                  <article key={city.name} className="group h-full">
                    <Link
                      href={`/${city.name.toLowerCase()}-taxi-service`}
                      className="block h-full"
                      aria-label={`Book taxi service in ${city.name} - ${city.coverage}. 24/7 available with professional drivers`}
                      title={`${city.name} taxi booking - Outstation cabs, airport transfers, local taxi service`}
                    >
                      <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400 overflow-hidden h-full flex flex-col">
                        
                        {/* Enhanced Popular Badge */}
                        {city.popularity === "high" && (
                          <div className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                            Popular
                          </div>
                        )}
                        
                        {/* SEO-Optimized Header */}
                        <header className="px-4 md:px-6 py-4 border-b flex-1">
                          <h2 className="text-lg md:text-xl font-bold mb-2 leading-tight text-gray-900">
                            {getCityHeading(city.name, index)}
                          </h2>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{city.coverage}</span>
                          </div>
                          
                          {/* Added service features for SEO */}
                          <div className="text-xs text-gray-500">
                            Outstation • Airport Transfer • Local Taxi
                          </div>
                        </header>
                        
                        {/* Enhanced Card Content */}
                        <div className="px-4 md:px-6 py-3 flex justify-between items-center bg-gray-50">
                          <div className="flex items-center">
                            <Car className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600 text-sm font-medium">24/7 Service</span>
                          </div>
                          <div className="flex items-center text-black group-hover:text-yellow-600 transition-colors font-medium text-sm">
                            <span className="mr-1">Book Now</span>
                            <ChevronRight className="w-4 h-4 flex-shrink-0" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No cities found</h3>
                  <p className="text-sm">Try searching for popular cities like Delhi, Mumbai, Bangalore</p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Show All Cities
                </button>
              </div>
            )}
          </main>

          <PaginationControls />

          {/* Enhanced CTA Section */}
          <aside className="mt-12 md:mt-16">
            <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-6 md:p-8 text-center border">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                Don't See Your City? We're Expanding!
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Our taxi service network is growing rapidly across India. Contact us to check 
                availability in your area or request service in a new location. We provide 
                outstation cabs, airport transfers, and local taxi services nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-black text-white px-6 md:px-8 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Request Service
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/routes" 
                  className="inline-flex items-center border-2 border-black text-black px-6 md:px-8 py-3 rounded-xl hover:bg-black hover:text-white transition-all duration-300 gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                >
                  View All Routes
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CitiesSection;