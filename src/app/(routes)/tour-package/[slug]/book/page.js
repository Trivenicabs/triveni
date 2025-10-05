// This is the Server Component for Booking Page
import { tourDetails } from "@/utilis/data";
import BookingForm from "@/components/BookingForm";

// SEO Content for booking pages
const bookingSeoContent = {
  "manali-tour-from-mumbai": {
    title: "Book Manali Tour Package from Mumbai Online",
    h1: "Book Your Manali Tour from Mumbai - Instant Confirmation",
    intro: "Book your Manali tour package from Mumbai online and get instant confirmation. Best rates at ₹9,999 for 5 days. Secure payment, easy cancellation, 24/7 customer support.",
    whyBook: "Booking your Manali tour from Mumbai is now easier than ever. Fill out our simple booking form and receive instant confirmation via email and SMS. Our secure online booking system ensures your data is protected.",
    benefits: [
      "Instant booking confirmation for your Manali tour",
      "Best price guarantee - ₹9,999 for 5 days 4 nights",
      "Secure online payment options",
      "Easy cancellation policy up to 7 days before departure",
      "24/7 customer support via phone and WhatsApp"
    ],
    destinations: "This Manali tour package from Mumbai includes visits to Rohtang Pass, Solang Valley, Hadimba Temple, and Mall Road with comfortable accommodation and guided tours."
  },
  "chardham-yatra-package": {
    title: "Book Chardham Yatra Package from Delhi Online",
    h1: "Book Complete Chardham Yatra Package - Sacred Pilgrimage Tour",
    intro: "Book your complete Chardham Yatra package from Delhi online at ₹24,999 for 12 days. Visit Yamunotri, Gangotri, Kedarnath, and Badrinath with instant booking confirmation.",
    whyBook: "Our Chardham Yatra booking system makes it easy to secure your spiritual journey. Book online with complete transparency - no hidden charges, instant confirmation, and dedicated support throughout your pilgrimage.",
    benefits: [
      "Complete Char Dham darshan booking - all four temples",
      "Instant confirmation with detailed itinerary",
      "Experienced guides for spiritual guidance",
      "Comfortable deluxe hotel accommodations",
      "Special darshan arrangements at all temples"
    ],
    destinations: "This Chardham Yatra package covers Yamunotri Temple, Gangotri Temple, Kedarnath Temple, Badrinath Temple, plus visits to Haridwar and Rishikesh."
  },
  "shimla-from-mumbai": {
    title: "Book Shimla Tour Package from Mumbai Online",
    h1: "Book Your Shimla Tour from Mumbai - Queen of Hills Package",
    intro: "Book Shimla tour package from Mumbai online at ₹14,999 for 6 days. Experience colonial charm, scenic beauty, and hill station activities with instant confirmation.",
    whyBook: "Secure your Shimla holiday from Mumbai with our easy online booking. Get instant confirmation, best rates, and complete transparency. Book now and enjoy hassle-free hill station vacation.",
    benefits: [
      "Best rate for 6 days Shimla tour - ₹14,999",
      "Instant online booking confirmation",
      "Comfortable 3-star hotel in Shimla",
      "Visit Mall Road, Kufri, and other attractions",
      "Professional local guide included"
    ],
    destinations: "Visit Shimla's Mall Road, The Ridge, Christ Church, Jakhu Temple, Kufri, and Naldehra during this comprehensive 6-day hill station tour."
  },
  "rajasthan-tour": {
    title: "Book Rajasthan Tour Package Online - Royal Heritage Tour",
    h1: "Book Complete Rajasthan Heritage Tour - 7 Days Royal Package",
    intro: "Book your Rajasthan tour package online at ₹19,999 for 7 days. Explore Jaipur, Jodhpur, Udaipur palaces and forts with instant booking confirmation.",
    whyBook: "Experience the royal heritage of Rajasthan with our comprehensive tour package. Easy online booking, instant confirmation, and best rates for palace tours, desert safaris, and cultural experiences.",
    benefits: [
      "Complete Rajasthan heritage tour - 7 days",
      "Visit Jaipur, Jodhpur, Udaipur, and Pushkar",
      "4-star heritage hotel accommodations",
      "Palace tours and cultural performances included",
      "Instant booking with secure payment"
    ],
    destinations: "Explore Amber Fort, Mehrangarh Fort, City Palace Udaipur, Lake Pichola, Dilwara Temples, and more during this royal Rajasthan tour."
  },
  "kashmir-tour": {
    title: "Book Kashmir Tour Package Online - Paradise Valley Tour",
    h1: "Book Your Kashmir Tour Package - Dal Lake & Valley Tours",
    intro: "Book Kashmir tour package online at ₹16,999 for 5 days. Experience Srinagar's Dal Lake, Gulmarg, Pahalgam with flights included and instant confirmation.",
    whyBook: "Secure your Kashmir paradise tour with our hassle-free online booking. Includes flights from Delhi, Shikara rides, hotel accommodations, and all sightseeing. Instant confirmation guaranteed.",
    benefits: [
      "Flights from Delhi to Srinagar included",
      "Shikara ride on famous Dal Lake",
      "Day trips to Gulmarg and Pahalgam",
      "Deluxe hotel with mountain views",
      "Complete Kashmir valley tour in 5 days"
    ],
    destinations: "Visit Srinagar's Dal Lake and Mughal Gardens, Gulmarg for cable car rides, Pahalgam's Betaab Valley, and experience houseboat culture."
  },
  "punjab-tour": {
    title: "Book Punjab Tour Package Online - Golden Temple Amritsar",
    h1: "Book Punjab Cultural Tour - Golden Temple & Wagah Border",
    intro: "Book Punjab tour package from Delhi online at ₹10,999 for 3 days. Visit Golden Temple, Wagah Border, Jallianwala Bagh with instant booking confirmation.",
    whyBook: "Experience Punjab's rich culture and heritage with our easy online booking. Visit sacred Golden Temple, witness Wagah Border ceremony, and explore Sikh heritage sites with confirmed reservations.",
    benefits: [
      "Visit sacred Golden Temple (Harmandir Sahib)",
      "Witness Wagah Border flag ceremony",
      "3-star hotel in Amritsar city center",
      "Experience authentic Punjabi cuisine",
      "Instant booking confirmation"
    ],
    destinations: "Visit Golden Temple, Jallianwala Bagh memorial, Wagah Border, Gobindgarh Fort, and local Amritsar markets during this 3-day Punjab cultural tour."
  }
};

// Generate static params for all tour packages
export async function generateStaticParams() {
  return Object.keys(tourDetails).map((slug) => ({
    slug: slug,
  }));
}

// Enhanced metadata generation for booking pages
export async function generateMetadata({ params }) {
  const { slug } = params;
  const packageInfo = tourDetails[slug];
  const content = bookingSeoContent[slug];
  
  if (!packageInfo || !content) {
    return {
      title: "Booking Not Found | Triveni Cabs",
      description: "The requested booking page could not be found",
    };
  }

  // Create comprehensive meta description for booking page
  const metaDescription = `${content.intro} Fill the booking form for ${packageInfo.title}. Best rates, instant confirmation, secure payment, 24/7 support. Call 7668570551 to book now.`;

  return {
    title: `${content.title} | ${packageInfo.price} | Triveni Cabs`,
    description: metaDescription,
    openGraph: {
      title: `${content.title} - Instant Confirmation`,
      description: metaDescription,
      images: [
        {
          url: packageInfo.image,
          width: 1200,
          height: 630,
          alt: `Book ${packageInfo.title} online - Booking form`
        }
      ],
      type: 'website',
      locale: 'en_IN',
      siteName: 'Triveni Cabs'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${content.title}`,
      description: metaDescription,
      images: [packageInfo.image],
    },
    alternates: {
      canonical: `https://trivenicabs.com/tour-packages/${slug}/book`
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

// Client-side tracking functions with enhanced events
const trackingScript = `
  // Function to track WhatsApp booking clicks
  window.trackTourBookingClick = function(tourSlug, packageTitle, bookingType = 'whatsapp') {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'tour_booking_click', {
        'event_category': 'tour_booking',
        'event_label': tourSlug,
        'tour_package': packageTitle,
        'booking_type': bookingType,
        'page_type': 'booking_form',
        'value': 1
      });
      
      // Facebook Pixel tracking
      if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
          content_name: packageTitle,
          content_category: 'Tour Package',
          content_ids: [tourSlug],
          value: 1,
          currency: 'INR'
        });
      }
    }
  };

  // Function to track form submissions
  window.trackTourFormSubmission = function(tourSlug, packageTitle, formData = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'tour_form_submit', {
        'event_category': 'tour_booking',
        'event_label': tourSlug,
        'tour_package': packageTitle,
        'page_type': 'booking_form',
        'form_type': 'booking_inquiry',
        'value': 1
      });
      
      // Enhanced conversion tracking
      gtag('event', 'generate_lead', {
        'event_category': 'tour_conversion',
        'event_label': tourSlug,
        'tour_package': packageTitle,
        'value': 1,
        'currency': 'INR'
      });
      
      // Facebook Pixel conversion
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: packageTitle,
          content_category: 'Tour Package',
          content_ids: [tourSlug],
          value: 1,
          currency: 'INR'
        });
      }
    }
  };

  // Function to track page views
  window.trackTourBookingPageView = function(tourSlug, packageTitle) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'tour_booking_page_view', {
        'event_category': 'tour_engagement',
        'event_label': tourSlug,
        'tour_package': packageTitle,
        'page_type': 'booking_form',
        'value': 1
      });
      
      // Enhanced page view tracking
      gtag('event', 'page_view', {
        'page_title': 'Book ' + packageTitle,
        'page_location': window.location.href,
        'content_group1': 'Booking Pages',
        'content_group2': 'Tour Packages'
      });
    }
  };
`;

// Server component for the booking page
export default function BookingPage({ params }) {
  const { slug } = params;
  const packageInfo = tourDetails[slug];
  const content = bookingSeoContent[slug];
  
  if (!packageInfo || !content) {
    return <div className="text-center py-16">Package not found</div>;
  }

  // Generate JSON-LD structured data for booking page
  const bookingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Book ${packageInfo.title}`,
    "description": content.intro,
    "url": `https://trivenicabs.com/tour-packages/${slug}/book`,
    "mainEntity": {
      "@type": "TourPackage",
      "name": packageInfo.title,
      "description": packageInfo.overview,
      "provider": {
        "@type": "TravelAgency",
        "name": "Triveni Cabs",
        "url": "https://trivenicabs.com",
        "telephone": "7668570551",
        "email": "info@trivenicabs.com"
      },
      "offers": {
        "@type": "Offer",
        "price": packageInfo.price.replace('₹', '').replace(',', ''),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString(),
        "url": `https://trivenicabs.com/tour-packages/${slug}/book`
      }
    },
    "breadcrumb": {
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
          "name": "Tour Packages",
          "item": "https://trivenicabs.com/tour-packages"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": packageInfo.title,
          "item": `https://trivenicabs.com/tour-packages/${slug}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Book Now",
          "item": `https://trivenicabs.com/tour-packages/${slug}/book`
        }
      ]
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://trivenicabs.com/tour-packages/${slug}/book`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": `${packageInfo.title} Booking`
      }
    }
  };

  // FAQ structured data for booking page
  const bookingFAQData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How do I book ${packageInfo.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can book ${packageInfo.title} by filling out our online booking form or calling us at 7668570551. We provide instant confirmation and secure payment options.`
        }
      },
      {
        "@type": "Question", 
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept all major payment methods including credit cards, debit cards, UPI, net banking, and digital wallets for secure online booking."
        }
      },
      {
        "@type": "Question",
        "name": "Is my booking confirmed immediately?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you will receive instant booking confirmation via email and SMS with all tour details and contact information."
        }
      },
      {
        "@type": "Question",
        "name": `What is included in ${packageInfo.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${packageInfo.title} includes ${packageInfo.inclusions?.slice(0,3).join(', ')} and many more services. Check the complete inclusions list on our package page.`
        }
      }
    ]
  };
  
  return (
    <>
      {/* JSON-LD Structured Data for Booking Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookingStructuredData)
        }}
      />
      
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookingFAQData)
        }}
      />

      {/* Enhanced Analytics tracking script */}
      <script
        dangerouslySetInnerHTML={{
          __html: trackingScript
        }}
      />
      
      {/* Page view tracking with enhanced data */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              if (window.trackTourBookingPageView) {
                window.trackTourBookingPageView('${slug}', '${packageInfo.title}');
              }
              
              // Enhanced ecommerce tracking
              if (typeof gtag !== 'undefined') {
                gtag('event', 'begin_checkout', {
                  'currency': 'INR',
                  'value': ${packageInfo.price.replace('₹', '').replace(',', '')},
                  'items': [{
                    'item_id': '${slug}',
                    'item_name': '${packageInfo.title}',
                    'item_category': 'Tour Package',
                    'price': ${packageInfo.price.replace('₹', '').replace(',', '')},
                    'quantity': 1
                  }]
                });
              }
            });
          `
        }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center text-sm text-gray-600">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>Tour Packages</span>
              <span className="mx-2">/</span>
              <span>{packageInfo.title}</span>
              <span className="mx-2">/</span>
              <span className="font-semibold text-gray-900">Book Now</span>
            </nav>
          </div>
        </div>

        {/* Main Booking Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* SEO-Optimized Header Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.h1}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {content.intro}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {content.whyBook}
            </p>
          </div>

          {/* Booking Benefits Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Book {packageInfo.destination} Tour Package Online with Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destinations Covered */}
          <div className="bg-yellow-50 rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Places Covered in This {packageInfo.destination} Tour Package
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {content.destinations}
            </p>
          </div>

          {/* Package Summary Box */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {packageInfo.price}
              </div>
              <div className="text-sm text-gray-600">per person</div>
              <div className="text-xs text-green-600 font-medium mt-1">Best Price Guaranteed</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {packageInfo.duration}
              </div>
              <div className="text-sm text-gray-600">Tour Duration</div>
              <div className="text-xs text-blue-600 font-medium mt-1">Complete Itinerary Included</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Instant
              </div>
              <div className="text-sm text-gray-600">Confirmation</div>
              <div className="text-xs text-purple-600 font-medium mt-1">Email & SMS Alert</div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Booking Form Component */}
      <BookingForm slug={slug} packageInfo={packageInfo} />
    </>
  );
}