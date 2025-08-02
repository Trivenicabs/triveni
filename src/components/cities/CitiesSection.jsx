"use client";

import { useState, useMemo, useCallback } from "react";
import { MapPin, Car, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { cities } from "../../utilis/data";
import Link from "next/link";

const CitiesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Increased for better mobile experience

  // Memoize filtered cities (only by search now)
  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      return city.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Memoize pagination data
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedCities = filteredCities.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    
    return { totalPages, startIndex, displayedCities };
  }, [filteredCities, currentPage, itemsPerPage]);

  // Optimized page change handler
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Smooth scroll to top of cities section
    document.getElementById('cities-heading')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, []);

  // Optimized search handler with debouncing effect
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  // Helper function to create unique headings
  const getCityHeading = useCallback((cityName, index) => {
    const headingVariations = [
      `Book Cab in ${cityName}`,
      `${cityName} Car Rental`,
      `Taxi Booking ${cityName}`,
      `${cityName} Cab Service`
    ];
    return headingVariations[index % headingVariations.length];
  }, []);

  // Mobile-optimized pagination component
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
          className="p-2 md:p-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-transparent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Mobile: Show only current page and total */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-2 bg-yellow-400 text-black font-bold rounded-lg min-w-[44px] text-center">
            {currentPage}
          </span>
          <span className="text-gray-500 text-sm">of {totalPages}</span>
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 md:p-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-transparent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Go to next page"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </nav>
    );
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50" aria-labelledby="cities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="text-center mb-8 md:mb-12">
          <span className="text-yellow-500 font-semibold mb-2 block text-sm md:text-base">
            Our Taxi Service Coverage
          </span>
          <h2 id="cities-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Cab Booking Available in<br className="md:hidden" /> Major Indian Cities
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Experience reliable 24/7 taxi services in {cities.length}+ cities across India 
            with professional drivers and well-maintained vehicles
          </p>
        </header>

        {/* Search Only - Mobile Optimized */}
        <div className="mb-8 md:mb-12">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <div className="flex justify-center">
              {/* Search Input */}
              <div className="relative w-full max-w-md">
                <label htmlFor="city-search" className="sr-only">
                  Search for a city where we provide taxi service
                </label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="city-search"
                  type="text"
                  placeholder="Search cities..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 text-sm md:text-base"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary - Mobile Optimized */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
          <p className="text-gray-600">
            Showing {paginationData.startIndex + 1}-
            {Math.min(paginationData.startIndex + itemsPerPage, filteredCities.length)} of{" "}
            {filteredCities.length} cities
          </p>
          <p className="text-gray-600">
            Page {currentPage} of {paginationData.totalPages || 1}
          </p>
        </div>

        {/* City Grid - Responsive */}
        <main>
          {paginationData.displayedCities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {paginationData.displayedCities.map((city, index) => (
                <article key={city.name} className="group h-full">
                  <Link
                    href={`/${city.name.toLowerCase()}`}
                    className="block h-full"
                    aria-label={`Book taxi service in ${city.name}, ${city.coverage}`}
                  >
                    <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400 overflow-hidden h-full flex flex-col">
                      {/* Popular Badge */}
                      {city.popularity === "high" && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full z-10">
                          Popular
                        </div>
                      )}
                      
                      {/* Header */}
                      <header className="px-4 md:px-6 py-4 border-b flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-2 leading-tight">
                          {getCityHeading(city.name, index)}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{city.coverage}</span>
                        </div>
                      </header>
                      
                      {/* Card Content */}
                      <div className="px-4 md:px-6 py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <Car className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">24/7 Available</span>
                        </div>
                        <div className="flex items-center text-black group-hover:text-yellow-600 transition-colors font-medium text-sm">
                          <span className="mr-1">Book Cab</span>
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
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </main>

        {/* Pagination */}
        <PaginationControls />

        {/* Call to Action */}
        <aside className="mt-12 md:mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Don't see your city?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're expanding our services across India. Contact us to check availability 
              in your area or to request service in a new location.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-black text-white px-6 md:px-8 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 gap-2 font-medium"
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CitiesSection;