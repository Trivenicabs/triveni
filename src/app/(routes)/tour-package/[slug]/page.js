import React from "react";
import Image from "next/image";
import Link from "next/link";
import { tourDetails } from "@/utilis/data";
import ItinerarySection from "@/components/ItinerarySection";
import { Calendar, MapPin, Clock, Users, Car, Star, Coffee, BedDouble, CheckCircle, Phone } from "lucide-react";

// Import the client components
import { TrackingProvider, ItineraryWrapper, AccommodationWrapper, BookNowButton } from "./client-components";

// SEO Content for each package - This will be visible on the page
const seoContent = {
  "manali-tour-from-mumbai": {
    title: "Manali Tour Package from Mumbai",
    h1: "Best Manali Tour Packages from Mumbai | Book Himachal Pradesh Tours",
    intro: "Discover the beauty of Manali with our specially curated tour packages from Mumbai. Experience snow-capped mountains, adventure activities at Solang Valley, and the breathtaking Rohtang Pass.",
    whyChoose: "Our Manali tour packages from Mumbai offer the perfect blend of adventure and relaxation. Whether you're looking for honeymoon packages in Manali, family vacation tours, or adventure sports activities, we have the ideal package for you.",
    features: [
      "Direct AC bus travel from Mumbai to Manali",
      "Best rates for Himachal Pradesh tour packages",
      "Visit Rohtang Pass and Solang Valley with guided tours",
      "Comfortable 3-star accommodations in Manali",
      "Adventure activities including paragliding and skiing"
    ],
    destinations: "Visit popular attractions including Hadimba Temple, Mall Road, Vashisht Hot Springs, Rohtang Pass, and Solang Valley during this 5-day Manali adventure tour.",
    breadcrumb: ["Home", "Tour Packages", "Himachal Pradesh Tours", "Manali Tour from Mumbai"]
  },
  "chardham-yatra-package": {
    title: "Chardham Yatra Package",
    h1: "Complete Chardham Yatra Package | Char Dham Tour from Delhi",
    intro: "Embark on a spiritual journey to the four sacred shrines of Uttarakhand with our complete Chardham Yatra package. Visit Yamunotri, Gangotri, Kedarnath, and Badrinath with comfortable travel and accommodation.",
    whyChoose: "Our Chardham Yatra package from Delhi is designed for pilgrims seeking a comfortable and spiritually fulfilling journey. We provide experienced guides, comfortable transportation, and premium accommodations throughout your pilgrimage tour.",
    features: [
      "Complete Char Dham darshan - Yamunotri, Gangotri, Kedarnath, Badrinath",
      "Comfortable AC bus travel from Delhi",
      "Experienced spiritual guides and local assistance",
      "Deluxe hotel accommodations near temples",
      "Special darshan arrangements at all four dhams"
    ],
    destinations: "Visit all four sacred temples: Yamunotri Temple, Gangotri Temple, Kedarnath Temple, and Badrinath Temple. Experience Ganga Aarti at Haridwar and explore Rishikesh during this 12-day spiritual pilgrimage tour.",
    breadcrumb: ["Home", "Tour Packages", "Pilgrimage Tours", "Chardham Yatra Package"]
  },
  "shimla-from-mumbai": {
    title: "Shimla Tour Package from Mumbai",
    h1: "Shimla Tour Packages from Mumbai | Queen of Hills Vacation",
    intro: "Escape to the colonial charm of Shimla with our exclusive tour packages from Mumbai. Experience the Queen of Hills, explore Mall Road, visit Kufri, and enjoy the scenic beauty of Himachal Pradesh.",
    whyChoose: "Our Shimla tour packages from Mumbai offer a perfect hill station getaway. Enjoy colonial architecture, scenic mountain views, and pleasant weather in this 6-day vacation package to Shimla.",
    features: [
      "6 days of hill station exploration from Mumbai",
      "Visit Mall Road, The Ridge, and Christ Church",
      "Day trip to Kufri for adventure activities",
      "Comfortable 3-star hotel in Shimla",
      "Professional local guide for sightseeing"
    ],
    destinations: "Explore Shimla's top attractions including Mall Road, The Ridge, Jakhu Temple, Christ Church, Kufri, and Naldehra. Experience colonial heritage and natural beauty in this comprehensive Shimla tour.",
    breadcrumb: ["Home", "Tour Packages", "Hill Station Tours", "Shimla from Mumbai"]
  },
  "rajasthan-tour": {
    title: "Royal Rajasthan Tour Package",
    h1: "Rajasthan Tour Packages | Royal Heritage Tours of Rajasthan",
    intro: "Explore the royal heritage of Rajasthan with our comprehensive tour package. Visit magnificent palaces in Jaipur, majestic forts in Jodhpur, romantic lakes in Udaipur, and sacred sites in Pushkar.",
    whyChoose: "Our Rajasthan tour packages offer an immersive experience of India's royal heritage. Discover palace tours, desert safaris, cultural performances, and authentic Rajasthani cuisine during this 7-day cultural journey.",
    features: [
      "Complete Rajasthan heritage tour covering major cities",
      "Visit Amber Fort, Mehrangarh Fort, and City Palaces",
      "Experience Lake Pichola boat ride in Udaipur",
      "Traditional Rajasthani cuisine and cultural shows",
      "4-star heritage hotel accommodations"
    ],
    destinations: "Visit Jaipur (Pink City), Jodhpur (Blue City), Udaipur (City of Lakes), Pushkar (Sacred City), and Mount Abu. Experience forts, palaces, temples, and desert landscapes in this royal Rajasthan tour.",
    breadcrumb: ["Home", "Tour Packages", "Cultural Tours", "Rajasthan Heritage Tour"]
  },
  "kashmir-tour": {
    title: "Kashmir Tour Package",
    h1: "Kashmir Tour Packages | Paradise on Earth Kashmir Valley Tours",
    intro: "Experience the breathtaking beauty of Kashmir with our exclusive tour packages. Explore Srinagar's Dal Lake, adventure in Gulmarg, and the serene valleys of Pahalgam in this paradise on earth.",
    whyChoose: "Our Kashmir tour packages offer the perfect blend of natural beauty and cultural experiences. Enjoy Shikara rides on Dal Lake, cable car rides in Gulmarg, and houseboat stays in Srinagar during this 5-day Kashmir valley tour.",
    features: [
      "Flight tickets from Delhi to Srinagar included",
      "Shikara ride on famous Dal Lake",
      "Day trip to Gulmarg with cable car option",
      "Visit to Pahalgam - Valley of Shepherds",
      "Deluxe hotel with scenic mountain views"
    ],
    destinations: "Explore Srinagar's Mughal Gardens, Dal Lake, and local markets. Visit Gulmarg for snow activities and scenic beauty. Experience Pahalgam's Lidder River and Betaab Valley in this complete Kashmir tour.",
    breadcrumb: ["Home", "Tour Packages", "Nature Tours", "Kashmir Valley Tour"]
  },
  "punjab-tour": {
    title: "Punjab Cultural Tour Package",
    h1: "Punjab Tour Packages | Golden Temple Amritsar Cultural Tours",
    intro: "Discover the rich culture and heritage of Punjab with our cultural tour package. Visit the Golden Temple in Amritsar, witness the Wagah Border ceremony, and explore Jallianwala Bagh.",
    whyChoose: "Our Punjab tour packages from Delhi offer an authentic Punjabi experience. Explore Sikh heritage sites, enjoy traditional Punjabi cuisine, and witness the famous Wagah Border ceremony in this 3-day cultural tour.",
    features: [
      "Visit to the sacred Golden Temple (Harmandir Sahib)",
      "Witness Wagah Border flag ceremony",
      "Explore Jallianwala Bagh memorial",
      "Experience authentic Punjabi cuisine",
      "Comfortable 3-star accommodation in Amritsar"
    ],
    destinations: "Visit Golden Temple, Jallianwala Bagh, Wagah Border, Gobindgarh Fort, and local Amritsar markets. Experience Punjabi culture, cuisine, and hospitality in this comprehensive Punjab tour.",
    breadcrumb: ["Home", "Tour Packages", "Cultural Tours", "Punjab Heritage Tour"]
  }
};

// Enhanced metadata generation with focus on description and OpenGraph
export async function generateMetadata({ params }) {
  const { slug } = params;
  const packageInfo = tourDetails[slug];
  const content = seoContent[slug];
  
  if (!packageInfo || !content) {
    return {
      title: "Package Not Found | Triveni Cabs",
      description: "The requested tour package could not be found",
    };
  }

  const metaDescription = `${content.intro} Book ${packageInfo.title} at ${packageInfo.price} for ${packageInfo.duration}. Best rates, comfortable stay, guided tours. Call 7668570551.`;

  return {
    title: `${content.title} | ${packageInfo.price} | ${packageInfo.duration} | Triveni Cabs`,
    description: metaDescription,
    openGraph: {
      title: `${content.title} - Book Now at ${packageInfo.price}`,
      description: metaDescription,
      images: [
        {
          url: packageInfo.image,
          width: 1200,
          height: 630,
          alt: `${packageInfo.title} - ${packageInfo.destination} tour package`
        }
      ],
      type: 'website',
      locale: 'en_IN',
      siteName: 'Triveni Cabs'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${content.title} | ${packageInfo.price}`,
      description: metaDescription,
      images: [packageInfo.image],
    },
    alternates: {
      canonical: `https://trivenicabs.com/tour-packages/${slug}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(tourDetails).map((slug) => ({
    slug: slug,
  }));
}

export default function TourPackagePage({ params }) {
  const { slug } = params;
  const packageInfo = tourDetails[slug];
  const content = seoContent[slug];

  if (!packageInfo || !content) {
    return <div className="text-center py-16">Package not found</div>;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TourPackage",
    "name": packageInfo.title,
    "description": content.intro,
    "image": packageInfo.image,
    "provider": {
      "@type": "TravelAgency",
      "name": "Triveni Cabs",
      "url": "https://trivenicabs.com",
      "telephone": "7668570551",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": packageInfo.price.replace('₹', '').replace(',', ''),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "url": `https://trivenicabs.com/tour-packages/${slug}`
    },
    "duration": packageInfo.duration,
    "startLocation": {
      "@type": "Place",
      "name": packageInfo.startingPoint
    },
    "endLocation": {
      "@type": "Place", 
      "name": packageInfo.destination
    },
    "itinerary": packageInfo.itinerary.map((item, index) => ({
      "@type": "Event",
      "name": item.title,
      "description": item.details,
      "position": index + 1
    })),
    "includesObject": packageInfo.inclusions.map(inclusion => ({
      "@type": "Thing",
      "name": inclusion
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": content.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item,
      "item": index === content.breadcrumb.length - 1 
        ? `https://trivenicabs.com/tour-packages/${slug}`
        : `https://trivenicabs.com/${item.toLowerCase().replace(/ /g, '-')}`
    }))
  };

  return (
    <TrackingProvider slug={slug} packageTitle={packageInfo.title}>
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
      
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[60vh]">
          <Image
            src={packageInfo.image}
            alt={content.h1}
            className="w-full h-full object-cover"
            fill
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70">
            <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-16 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                {packageInfo.title}
              </h1>
              
              <p className="text-lg md:text-xl mb-6 max-w-3xl leading-relaxed">
                {content.intro}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{packageInfo.duration}</span>
                </div>
                <div className="flex items-center bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{packageInfo.startingPoint} to {packageInfo.destination}</span>
                </div>
                <div className="flex items-center bg-[#FACF2D] text-black px-6 py-2 rounded-full font-bold text-lg">
                  {packageInfo.price}
                  <span className="text-sm font-normal ml-2">per person</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center text-sm text-gray-600">
              {content.breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="mx-2">/</span>}
                  <span className={index === content.breadcrumb.length - 1 ? "font-semibold text-gray-900" : ""}>
                    {item}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-12">
              
              {/* Main Introduction */}
              <section>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  {content.title} - Complete Travel Guide
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {content.whyChoose}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {content.destinations}
                  </p>
                </div>
              </section>

              {/* Key Features */}
              <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  What is Included in This {packageInfo.destination} Tour Package
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {content.features.map((feature, index) => (
                    <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Package Overview */}
              <section className="bg-blue-50 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  About {packageInfo.title}
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>{packageInfo.overview}</p>
                  <p>
                    <strong>Tour Duration:</strong> {packageInfo.duration} | 
                    <strong className="ml-2">Starting Point:</strong> {packageInfo.startingPoint} | 
                    <strong className="ml-2">Destination:</strong> {packageInfo.destination}
                  </p>
                  <p>
                    <strong>Best Time to Book:</strong> Book this {packageInfo.destination} tour package 
                    at least 2 weeks in advance for best rates and availability. We offer flexible 
                    payment options and instant booking confirmation.
                  </p>
                </div>
              </section>

              {/* Highlights */}
              {packageInfo.highlights && (
                <section>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Top Attractions & Highlights in {packageInfo.destination}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {packageInfo.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center bg-gradient-to-r from-yellow-50 to-white p-5 rounded-lg shadow-sm border border-yellow-200">
                        <Star className="w-6 h-6 text-[#FACF2D] mr-3 flex-shrink-0" fill="#FACF2D" />
                        <span className="font-medium text-gray-800">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Itinerary */}
              <ItineraryWrapper slug={slug}>
                <section>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Complete {packageInfo.duration} Itinerary - Day by Day Plan
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Here is the detailed day-wise itinerary for your {packageInfo.destination} tour. 
                    Each day is carefully planned to ensure you experience the best of {packageInfo.destination}.
                  </p>
                  <ItinerarySection itinerary={packageInfo.itinerary} />
                </section>
              </ItineraryWrapper>

              {/* Accommodation */}
              <AccommodationWrapper slug={slug} accommodationName={packageInfo.accommodation.name}>
                <section className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Where You will Stay - {packageInfo.accommodation.name}
                  </h2>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {packageInfo.accommodation.name}
                    </h3>
                    <div className="flex items-center mb-6">
                      {[...Array(parseInt(packageInfo.accommodation.rating) || 3)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#FACF2D] mr-1" fill="#FACF2D" />
                      ))}
                      <span className="ml-2 text-gray-600 font-medium">
                        {packageInfo.accommodation.rating} Star Hotel in {packageInfo.destination}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Stay in comfortable and well-appointed rooms with modern amenities. 
                      Our selected hotels ensure your comfort throughout the {packageInfo.destination} tour.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {packageInfo.accommodation.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </AccommodationWrapper>

              {/* Package Inclusions */}
              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  What is Included in Your {packageInfo.destination} Tour Package
                </h2>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <ul className="space-y-3">
                    {packageInfo.inclusions.map((inclusion, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Why Book With Us */}
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Why Book {packageInfo.title} with Triveni Cabs?
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4 flex-shrink-0">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Best Price Guarantee</h3>
                      <p className="text-sm text-gray-600">Competitive rates for all {packageInfo.destination} tour packages</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Instant Confirmation</h3>
                      <p className="text-sm text-gray-600">Book online and get immediate confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Experienced Guides</h3>
                      <p className="text-sm text-gray-600">Local expert guides for authentic experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center mr-4 flex-shrink-0">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Comfortable Travel</h3>
                      <p className="text-sm text-gray-600">AC vehicles with experienced drivers</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-4 space-y-6">
                
                {/* Main Booking Card */}
                <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {packageInfo.price}
                    </div>
                    <div className="text-sm text-gray-600">per person</div>
                    <div className="text-xs text-green-600 font-medium mt-1">
                      Best Price Guaranteed
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{packageInfo.duration}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Starting Point:</span>
                      <span className="font-semibold">{packageInfo.startingPoint}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Destination:</span>
                      <span className="font-semibold">{packageInfo.destination}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">{packageInfo.category}</span>
                    </div>
                  </div>

                  <BookNowButton slug={slug} packageTitle={packageInfo.title} />
                  
                  <div className="mt-4 text-center text-xs text-gray-500">
                    Instant confirmation • Secure booking
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="font-bold text-lg mb-3">Need Help Planning?</h3>
                  <p className="text-sm mb-4 text-blue-100">
                    Speak with our travel experts for personalized recommendations
                  </p>
                  <a 
                    href="tel:7668570551" 
                    className="flex items-center justify-center bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    7668570551
                  </a>
                  <div className="mt-3 text-center text-xs text-blue-200">
                    Available 24/7 for your queries
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-semibold mb-4 text-gray-900">Why Trust Us?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span>10,000+ Happy Travelers</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span>4.8/5 Average Rating</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span>Verified Tour Operator</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span>Safe & Secure Payments</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </TrackingProvider>
  );
}