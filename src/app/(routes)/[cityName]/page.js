// src/app/[cityName]/page.js - OPTIMIZED SERVER COMPONENT
import { notFound } from 'next/navigation';
import { cities, vehiclesServices, cityDetails, touristSpots } from "@/utilis/data";
import { cityRoutesData, basicCityRoutes, defaultRoutes } from "@/utilis/cityRoutesData";
import CityServiceClient from "@/components/cities/CityServiceClient";
import RouteClientContent from "./RouteClientContent";

// Combine main routes and basic routes
const allCityRoutes = {
  ...cityRoutesData,
  ...basicCityRoutes
};

// Helper functions
function parseRouteSlug(slug) {
  const parts = slug.split('-to-');
  if (parts.length !== 2) return null;
  
  const cityName = parts[0];
  const destination = parts[1].replace(/-/g, ' ');
  
  return { cityName, destination };
}

export function createRouteSlug(cityName, destination) {
  return `${cityName.toLowerCase()}-to-${destination.toLowerCase().replace(/\s+/g, '-')}`;
}

export async function generateStaticParams() {
  const params = [];

  if (!Array.isArray(cities)) {
    console.error("Cities is not an array:", cities);
    return params;
  }

  cities.forEach(city => {
    if (!city || !city.name) {
      console.error("Invalid city object:", city);
      return;
    }

    const cityName = city.name.toLowerCase();
    
    // Add city page
    params.push({
      cityName: cityName
    });
    
    // Get formatted city name for cityRoutesData lookup
    const formattedCityName = city.name.charAt(0).toUpperCase() + city.name.slice(1);
    
    // Add route pages with proper error handling
    const routes = allCityRoutes[formattedCityName] || [];
    
    if (Array.isArray(routes)) {
      routes.forEach(route => {
        if (route && route.destination) {
          params.push({
            cityName: createRouteSlug(cityName, route.destination)
          });
        }
      });
    }
  });

  console.log(`Generated ${params.length} static params`);
  return params;
}

// COMPLETELY REWRITTEN metadata generation with focused SEO optimization
export async function generateMetadata({ params }) {
  const { cityName } = params;
  
  // Focused, high-intent keyword sets (quality over quantity)
  const primaryKeywords = {
    Delhi: {
      primary: ['Delhi taxi service', 'cab booking Delhi', 'Delhi to Agra taxi', 'Delhi to Jaipur cab'],
      location: ['Delhi NCR taxi', 'Delhi airport cab', 'India Gate taxi', 'Connaught Place cab'],
      commercial: ['Delhi outstation taxi', 'corporate cab Delhi', 'wedding car rental Delhi']
    },
    Agra: {
      primary: ['Agra taxi service', 'Taj Mahal cab booking', 'Agra Fort taxi tour', 'golden triangle taxi'],
      location: ['same day Agra tour', 'Agra heritage cab', 'Mathura Vrindavan taxi'],
      commercial: ['Agra airport cab', 'sunrise Taj Mahal cab', 'Agra sightseeing package']
    },
    Jaipur: {
      primary: ['Jaipur taxi service', 'Pink City cab service', 'Amber Fort taxi tour', 'Hawa Mahal cab'],
      location: ['City Palace taxi', 'Jaipur heritage tour', 'Rajasthan royal taxi'],
      commercial: ['Jaipur airport cab', 'desert safari cab Jaipur', 'palace on wheels alternative']
    },
    Haridwar: {
      primary: ['Haridwar taxi service', 'Ganga Aarti taxi', 'Har Ki Pauri cab', 'Chardham yatra taxi'],
      location: ['Mansa Devi temple cab', 'spiritual tour Haridwar', 'Kumbh Mela taxi'],
      commercial: ['Haridwar pilgrimage cab', 'Uttarakhand tour taxi', 'Gangotri cab from Haridwar']
    },
    Chandigarh: {
      primary: ['Chandigarh taxi service', 'City Beautiful taxi', 'Rock Garden cab tour', 'Sukhna Lake taxi'],
      location: ['Chandigarh airport cab', 'Mohali taxi service', 'Panchkula cab'],
      commercial: ['Punjab taxi Chandigarh', 'Shimla cab Chandigarh', 'Kasauli taxi booking']
    },
    Shimla: {
      primary: ['Shimla taxi service', 'Queen of Hills taxi', 'Mall Road cab Shimla', 'Kufri taxi booking'],
      location: ['hill station taxi Shimla', 'summer capital cab', 'Mashobra taxi service'],
      commercial: ['honeymoon cab Shimla', 'snow taxi Shimla', 'colonial architecture tour']
    },
    Manali: {
      primary: ['Manali taxi service', 'Rohtang Pass taxi', 'Solang Valley cab', 'adventure sports taxi'],
      location: ['snow point cab', 'Kullu Manali taxi', 'Kasol cab from Manali'],
      commercial: ['honeymoon taxi Manali', 'Spiti Valley taxi', 'river rafting taxi Manali']
    },
    Amritsar: {
      primary: ['Amritsar taxi service', 'Golden Temple taxi', 'Wagah Border cab', 'Jallianwala Bagh taxi'],
      location: ['Punjab heritage cab', 'Sikh pilgrimage taxi', 'Amritsar airport cab'],
      commercial: ['Durgiana Temple taxi', 'Amritsar food tour cab', 'langar taxi Amritsar']
    },
    Dehradun: {
      primary: ['Dehradun taxi service', 'Doon Valley taxi', 'Forest Research Institute cab', 'Robber Cave taxi'],
      location: ['Dehradun airport cab', 'Mussoorie cab Dehradun', 'Rajaji National Park taxi'],
      commercial: ['educational hub taxi Dehradun', 'valley taxi service', 'Sahastradhara cab']
    },
    Rishikesh: {
      primary: ['Rishikesh taxi service', 'Yoga Capital taxi', 'Ganga rafting cab', 'Laxman Jhula taxi'],
      location: ['Ram Jhula cab', 'Beatles Ashram taxi', 'Triveni Ghat taxi'],
      commercial: ['spiritual retreat taxi', 'yoga teacher training cab', 'meditation taxi']
    },
    Jodhpur: {
      primary: ['Jodhpur taxi service', 'Blue City taxi', 'Mehrangarh Fort cab', 'Umaid Bhawan taxi'],
      location: ['desert safari Jodhpur', 'camel safari cab', 'Mandore taxi tour'],
      commercial: ['royal heritage taxi Jodhpur', 'Thar desert cab', 'Jodhpur sightseeing taxi']
    },
    Udaipur: {
      primary: ['Udaipur taxi service', 'City of Lakes taxi', 'Lake Pichola cab', 'City Palace taxi'],
      location: ['Venice of East cab', 'Fateh Sagar taxi', 'Jagdish Temple cab'],
      commercial: ['romantic city cab Udaipur', 'wedding destination cab', 'sunset taxi Udaipur']
    },
    Ayodhya: {
      primary: ['Ayodhya taxi service', 'Ram Janmabhoomi taxi', 'Ayodhya Dham cab', 'spiritual tour Ayodhya'],
      location: ['Ram Mandir taxi booking', 'Hanuman Garhi cab', 'Kanak Bhawan taxi'],
      commercial: ['pilgrimage taxi Ayodhya', 'religious tour cab', 'Ramayana circuit taxi']
    },
    Ahmedabad: {
      primary: ['Ahmedabad taxi service', 'Gujarat commercial taxi', 'Sabarmati Ashram cab', 'Adalaj Stepwell taxi'],
      location: ['Gandhinagar cab service', 'Gujarat heritage taxi', 'Akshardham taxi'],
      commercial: ['textile city cab', 'Rann of Kutch cab', 'Somnath taxi Ahmedabad']
    }
  };

  // High-converting route combinations for better targeting
  const routeKeywords = {
    'Delhi-Agra': ['same day Agra tour from Delhi', 'Delhi to Taj Mahal taxi', 'Golden Triangle tour cab'],
    'Delhi-Jaipur': ['Delhi to Pink City taxi', 'heritage triangle cab', 'Rajasthan tour from Delhi'],
    'Delhi-Manali': ['Delhi to hill station cab', 'Himachal trip taxi', 'adventure tour booking Delhi'],
    'Delhi-Shimla': ['Delhi to Queen of Hills', 'colonial tour cab', 'summer escape taxi Delhi'],
    'Delhi-Haridwar': ['Delhi to holy city taxi', 'spiritual journey cab', 'Ganga darshan from Delhi'],
    'Delhi-Rishikesh': ['Delhi to yoga capital', 'adventure camp cab', 'spiritual adventure taxi'],
    'Delhi-Chandigarh': ['Delhi to city beautiful', 'planned city cab', 'Punjab gateway taxi'],
    'Delhi-Amritsar': ['Delhi to Golden Temple', 'Punjab heritage taxi', 'Sikh pilgrimage cab'],
    'Delhi-Dehradun': ['Delhi to valley capital', 'Doon trip cab', 'mountain gateway taxi'],
    'Agra-Jaipur': ['Agra to Pink City taxi', 'heritage circuit cab', 'royal triangle tour'],
    'Jaipur-Udaipur': ['Jaipur to Lake City', 'royal Rajasthan taxi', 'palace circuit cab'],
    'Chandigarh-Manali': ['hill station express', 'mountain adventure taxi', 'Himachal tour cab']
  };
  
  // Check if it's a route (contains '-to-')
  const routeData = parseRouteSlug(cityName);
  
  if (routeData) {
    // ROUTE PAGE METADATA - HIGHLY OPTIMIZED
    const { cityName: originCity, destination } = routeData;
    const formattedCityName = originCity.charAt(0).toUpperCase() + originCity.slice(1);
    const formattedDestination = destination
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Get route data for pricing
    const routes = allCityRoutes[formattedCityName] || [];
    const route = Array.isArray(routes) ? routes.find(r => 
      r && r.destination && r.destination.toLowerCase() === formattedDestination.toLowerCase()
    ) : null;
    
    const startingPrice = route?.prices?.[0]?.price || "₹2760";
    const estimatedDistance = route?.distance || "150-300 km";
    const estimatedTime = route?.time || "3-5 hours";
    
    // Build focused keyword array (limit to 50-75 high-intent keywords)
    const routeKey = `${formattedCityName}-${formattedDestination}`;
    const specificRouteKeywords = routeKeywords[routeKey] || [];
    
    // Get city-specific keywords (limited sets)
    const originKeywords = primaryKeywords[formattedCityName]?.primary || [];
    const destKeywords = primaryKeywords[formattedDestination]?.primary || [];
    
    // Core high-converting keywords only
    const coreKeywords = [
      `${formattedCityName} to ${formattedDestination} cab`,
      `${formattedCityName} to ${formattedDestination} taxi`,
      `${formattedCityName} to ${formattedDestination} taxi service`,
      `cab booking ${formattedCityName} to ${formattedDestination}`,
      `one way taxi ${formattedCityName} ${formattedDestination}`,
      `round trip cab ${formattedCityName} ${formattedDestination}`,
      `AC cab ${formattedCityName} to ${formattedDestination}`,
      `outstation taxi ${formattedCityName}`,
      `cheap cab ${formattedCityName} to ${formattedDestination}`,
      `best taxi service ${formattedCityName}`,
      `24x7 taxi ${formattedCityName}`,
      `professional driver ${formattedCityName}`,
      `safe taxi ${formattedCityName} to ${formattedDestination}`,
      `online cab booking ${formattedCityName}`,
      `airport drop ${formattedDestination}`,
      `highway taxi ${formattedCityName} ${formattedDestination}`,
      `tourism cab ${formattedCityName}`,
      `family cab ${formattedCityName} to ${formattedDestination}`,
      `corporate cab service ${formattedCityName}`,
      `wedding car rental ${formattedCityName}`,
      `luxury cab ${formattedCityName} to ${formattedDestination}`,
      `economy taxi ${formattedCityName}`,
      `same day return cab ${formattedCityName}`,
      `instant cab booking ${formattedCityName}`,
      `advance taxi booking ${formattedCityName}`
    ];
    
    // Combine focused keywords (max 75)
    const allKeywords = [
      ...coreKeywords,
      ...specificRouteKeywords,
      ...originKeywords.slice(0, 10),
      ...destKeywords.slice(0, 10)
    ].slice(0, 75);
    
    // Optimized title with primary keyword first
    const optimizedTitle = `${formattedCityName} to ${formattedDestination} Cab | ${startingPrice} - Triveni Taxi Service`;
    
    // Enhanced description with semantic keywords
    const optimizedDescription = `Book ${formattedCityName} to ${formattedDestination} cab service online. Professional drivers, AC vehicles, ${estimatedDistance}, ${estimatedTime}. Starting ${startingPrice}. 24/7 availability, safe travel, instant booking.`;
    
    return {
      title: optimizedTitle,
      description: optimizedDescription,
      keywords: allKeywords.join(', '),
      openGraph: {
        title: `${formattedCityName} to ${formattedDestination} Cab Service - Book at ${startingPrice}`,
        description: `Professional taxi service from ${formattedCityName} to ${formattedDestination}. AC vehicles, verified drivers, transparent pricing. Book online!`,
        type: 'website',
        locale: 'en_IN',
        url: `/${cityName}`,
        siteName: 'Triveni Cabs - Premier Taxi Service',
        images: [
          {
            url: '/images/car/car1.png',
            width: 1200,
            height: 630,
            alt: `${formattedCityName} to ${formattedDestination} taxi service - Professional cab booking`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${formattedCityName} to ${formattedDestination} Cab - ${startingPrice}`,
        description: `Book reliable taxi service from ${formattedCityName} to ${formattedDestination}. Professional drivers, AC vehicles, ${estimatedTime} journey.`,
        images: ['/images/car/car1.png'],
      },
      alternates: {
        canonical: `/${cityName}`
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
      // Enhanced structured data signals
      other: {
        'geo.region': 'IN',
        'geo.placename': formattedCityName,
        'og:locality': formattedCityName,
        'business:contact_data:locality': formattedCityName,
        'business:contact_data:region': 'India',
        'business:contact_data:phone_number': '+917668570551',
        'og:type': 'website',
        'og:image:type': 'image/png',
        'article:author': 'Triveni Cabs',
        'article:publisher': 'https://trivenican.com',
      }
    };
  } else {
    // CITY PAGE METADATA - HIGHLY OPTIMIZED
    const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    // Get city-specific focused keywords
    const cityKeywords = primaryKeywords[formattedCityName] || primaryKeywords.Delhi;
    
    // Core city-level keywords (focused on local intent)
    const baseCityKeywords = [
      `taxi service ${formattedCityName}`,
      `cab booking ${formattedCityName}`,
      `${formattedCityName} taxi service`,
      `${formattedCityName} cab booking`,
      `outstation taxi ${formattedCityName}`,
      `local cab service ${formattedCityName}`,
      `airport taxi ${formattedCityName}`,
      `railway station cab ${formattedCityName}`,
      `AC cab ${formattedCityName}`,
      `cheap taxi ${formattedCityName}`,
      `online cab booking ${formattedCityName}`,
      `sedan rental ${formattedCityName}`,
      `SUV rental ${formattedCityName}`,
      `tempo traveller ${formattedCityName}`,
      `bus rental ${formattedCityName}`,
      `intercity cab service ${formattedCityName}`,
      `${formattedCityName} to Delhi cab`,
      `${formattedCityName} to Mumbai taxi`,
      `${formattedCityName} to Bangalore cab`,
      `${formattedCityName} to Pune taxi`,
      `${formattedCityName} to Kolkata cab`,
      `${formattedCityName} to Chennai taxi`,
      `${formattedCityName} to Hyderabad cab`,
      `best cab service ${formattedCityName}`,
      `reliable taxi ${formattedCityName}`,
      `24x7 cab service ${formattedCityName}`,
      `professional driver ${formattedCityName}`,
      `safe taxi service ${formattedCityName}`,
      `GPS enabled cab ${formattedCityName}`,
      `doorstep pickup ${formattedCityName}`,
      `transparent pricing taxi ${formattedCityName}`,
      `corporate cab service ${formattedCityName}`,
      `family taxi ${formattedCityName}`,
      `group cab booking ${formattedCityName}`,
      `event transportation ${formattedCityName}`,
      `luxury car rental ${formattedCityName}`,
      `economy cab service ${formattedCityName}`,
      `premium taxi ${formattedCityName}`,
      `budget cab booking ${formattedCityName}`,
      `comfortable taxi ${formattedCityName}`,
      `spacious cab ${formattedCityName}`,
      `luggage friendly taxi ${formattedCityName}`,
      `elderly friendly cab ${formattedCityName}`,
      `child friendly taxi ${formattedCityName}`,
      `pet friendly cab ${formattedCityName}`,
      `medical emergency taxi ${formattedCityName}`,
      `urgent cab service ${formattedCityName}`,
      `instant taxi booking ${formattedCityName}`,
      `advance cab booking ${formattedCityName}`,
      `scheduled taxi ${formattedCityName}`,
      `round trip cab ${formattedCityName}`,
      `one way taxi ${formattedCityName}`,
      `same day return cab ${formattedCityName}`,
      `overnight taxi ${formattedCityName}`,
      `multi-stop cab ${formattedCityName}`,
      `custom route taxi ${formattedCityName}`,
      `direct cab service ${formattedCityName}`,
      `non-stop taxi ${formattedCityName}`,
      `express cab ${formattedCityName}`,
      `fast taxi service ${formattedCityName}`,
      `quick cab booking ${formattedCityName}`,
      `immediate taxi ${formattedCityName}`,
      `emergency cab ${formattedCityName}`,
      `late night taxi ${formattedCityName}`,
      `early morning cab ${formattedCityName}`,
      `weekend taxi service ${formattedCityName}`,
      `holiday cab ${formattedCityName}`,
      `festival taxi ${formattedCityName}`,
      `monsoon cab service ${formattedCityName}`,
      `winter taxi ${formattedCityName}`,
      `summer cab service ${formattedCityName}`,
      `tourist taxi ${formattedCityName}`,
      `sightseeing cab ${formattedCityName}`,
      `local tour taxi ${formattedCityName}`,
      `heritage tour cab ${formattedCityName}`,
      `shopping mall taxi ${formattedCityName}`,
      `hospital cab service ${formattedCityName}`,
      `office taxi ${formattedCityName}`,
      `school cab service ${formattedCityName}`,
      `college taxi ${formattedCityName}`,
      `university cab ${formattedCityName}`,
      `hotel taxi service ${formattedCityName}`,
      `resort cab ${formattedCityName}`,
      `guest house taxi ${formattedCityName}`,
      `conference cab ${formattedCityName}`,
      `meeting taxi ${formattedCityName}`,
      `business cab service ${formattedCityName}`,
      `commercial taxi ${formattedCityName}`,
      `industrial cab ${formattedCityName}`,
      `IT park taxi ${formattedCityName}`,
      `tech hub cab ${formattedCityName}`,
      `startup taxi ${formattedCityName}`,
      `coworking cab ${formattedCityName}`,
      `freelancer taxi ${formattedCityName}`,
      `student cab service ${formattedCityName}`,
      `senior citizen taxi ${formattedCityName}`,
      `women safe cab ${formattedCityName}`,
      `ladies taxi service ${formattedCityName}`,
      `solo travel cab ${formattedCityName}`,
      `couple taxi ${formattedCityName}`,
      `honeymoon cab ${formattedCityName}`,
      `anniversary taxi ${formattedCityName}`,
      `birthday cab service ${formattedCityName}`,
      `celebration taxi ${formattedCityName}`,
      `party cab ${formattedCityName}`,
      `club taxi ${formattedCityName}`,
      `pub cab service ${formattedCityName}`,
      `restaurant taxi ${formattedCityName}`,
      `movie cab ${formattedCityName}`,
      `theater taxi ${formattedCityName}`,
      `mall cab service ${formattedCityName}`,
      `market taxi ${formattedCityName}`,
      `bazaar cab ${formattedCityName}`,
      `temple taxi ${formattedCityName}`,
      `church cab service ${formattedCityName}`,
      `mosque taxi ${formattedCityName}`,
      `gurudwara cab ${formattedCityName}`,
      `pilgrimage taxi ${formattedCityName}`,
      `religious tour cab ${formattedCityName}`,
      `spiritual taxi ${formattedCityName}`,
      `meditation cab ${formattedCityName}`,
      `yoga taxi ${formattedCityName}`,
      `wellness cab service ${formattedCityName}`,
      `spa taxi ${formattedCityName}`,
      `salon cab ${formattedCityName}`,
      `beauty parlor taxi ${formattedCityName}`,
      `gym cab service ${formattedCityName}`,
      `fitness taxi ${formattedCityName}`,
      `sports cab ${formattedCityName}`,
      `stadium taxi ${formattedCityName}`,
      `ground cab service ${formattedCityName}`,
      `park taxi ${formattedCityName}`,
      `garden cab ${formattedCityName}`,
      `zoo taxi ${formattedCityName}`,
      `museum cab service ${formattedCityName}`,
      `gallery taxi ${formattedCityName}`,
      `exhibition cab ${formattedCityName}`,
      `fair taxi ${formattedCityName}`,
      `mela cab service ${formattedCityName}`,
      `carnival taxi ${formattedCityName}`,
      `concert cab ${formattedCityName}`,
      `show taxi ${formattedCityName}`,
      `event cab service ${formattedCityName}`,
      `function taxi ${formattedCityName}`,
      `ceremony cab ${formattedCityName}`,
      `ritual taxi ${formattedCityName}`,
      `tradition cab service ${formattedCityName}`
    ];

    // Add city-specific keywords
    const specificKeywords = citySpecificKeywords[formattedCityName] || [];
    
    // Combine all keywords
    const allCityKeywords = [...baseCityKeywords, ...specificKeywords];
    
    return {
      title: optimizedCityTitle,
      description: optimizedCityDescription,
      keywords: allCityKeywords.join(', '),
      openGraph: {
        title: `Best Taxi Service in ${formattedCityName} - Triveni Cabs`,
        description: `Reliable taxi service in ${formattedCityName}. Professional drivers, AC vehicles, transparent pricing. Book cabs for local & outstation trips.`,
        type: 'website',
        locale: 'en_IN',
        url: `/${cityName}`,
        siteName: 'Triveni Cabs - Premier Taxi Service',
        images: [
          {
            url: '/images/car/car2.png',
            width: 1200,
            height: 630,
            alt: `Professional taxi service in ${formattedCityName} - Book AC cabs online`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Best Taxi Service in ${formattedCityName}`,
        description: `Professional taxi service in ${formattedCityName}. Outstation trips, local tours, airport transfers. Book AC cabs online.`,
        images: ['/images/car/car2.png'],
      },
      alternates: {
        canonical: `/${cityName}`
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
      other: {
        'geo.region': 'IN',
        'geo.placename': formattedCityName,
        'og:locality': formattedCityName,
        'business:contact_data:locality': formattedCityName,
        'business:contact_data:region': 'India',
        'business:contact_data:phone_number': '+917830003009',
        'og:type': 'website',
        'og:image:type': 'image/png',
        'article:author': 'Triveni Cabs',
        'article:publisher': 'https://trivenican.com',
      }
    };
  }
}

export default function CityNamePage({ params }) {
  const { cityName } = params;
  
  // Check if it's a route (contains '-to-')
  const routeData = parseRouteSlug(cityName);
  
  if (routeData) {
    // Handle route page (e.g., delhi-to-agra)
    const { cityName: originCity, destination } = routeData;
    
    const formattedCityName = originCity.charAt(0).toUpperCase() + originCity.slice(1);
    const formattedDestination = destination
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Check if city exists
    const cityExists = cities.some(city => city.name.toLowerCase() === originCity.toLowerCase());
    if (!cityExists) {
      notFound();
    }
    
    // Get routes for this city with error handling
    const routes = allCityRoutes[formattedCityName] || defaultRoutes || [];
    
    // Find the specific route
    const route = Array.isArray(routes) ? routes.find(r => 
      r && r.destination && r.destination.toLowerCase() === formattedDestination.toLowerCase()
    ) : null;
    
    if (!route) {
      notFound();
    }

    // Get realistic distance and time estimates
    const estimatedDistance = route.distance || `${Math.floor(Math.random() * 200) + 150} km`;
    const estimatedTime = route.time || `${Math.floor(Math.random() * 4) + 3} hours`;

    return (
      <RouteClientContent 
        cityName={originCity}
        formattedCityName={formattedCityName}
        destination={destination.replace(/\s+/g, '-')}
        formattedDestination={formattedDestination}
        estimatedDistance={estimatedDistance}
        estimatedTime={estimatedTime}
        route={route}
        routes={routes}
        vehiclesServices={vehiclesServices}
      />
    );
  } else {
    // Handle city page (e.g., delhi)
    const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    // Check if city exists
    const cityExists = cities.some(city => city.name.toLowerCase() === cityName.toLowerCase());
    if (!cityExists) {
      notFound();
    }
    
    // Get data for city page
    const citySpots = touristSpots[formattedCityName] || [];
    
    // Enhanced error handling and fallback structure
    let details = {};
    try {
      details = cityDetails[formattedCityName] || cityDetails.Delhi || {
        coverage: {
          fullCoverage: [
            `${formattedCityName} City Center`,
            `${formattedCityName} Railway Station`,
            `${formattedCityName} Airport`,
            "Major Shopping Areas",
            "Business Districts"
          ],
          limitedCoverage: [
            "Remote Suburbs",
            "Industrial Areas",
            "Outer Ring Areas"
          ],
          restricted: [
            "Military Zones",
            "Restricted Government Areas"
          ]
        },
        peakHours: {
          morning: "7:00 AM - 10:00 AM",
          evening: "5:00 PM - 8:00 PM",
          surcharge: "15-25% extra during peak hours"
        },
        safetyFeatures: [
          "Real-time GPS Tracking",
          "Verified Professional Drivers",
          "24/7 Customer Support",
          "Regular Vehicle Maintenance",
          "Emergency SOS Button",
          "Sanitized Vehicles",
          "Driver Background Verification",
          "Live Trip Sharing"
        ],
        popularRoutes: [
          `${formattedCityName} to Delhi`,
          `${formattedCityName} Airport Transfer`,
          `${formattedCityName} Local Sightseeing`,
          `${formattedCityName} Outstation Tours`
        ]
      };
    } catch (error) {
      console.error("Error accessing city details:", error);
      // Enhanced fallback with city-specific data
      details = {
        coverage: {
          fullCoverage: [
            `${formattedCityName} City Center`,
            `${formattedCityName} Railway Station`,
            `${formattedCityName} Airport`,
            "Major Commercial Areas",
            "Tourist Attractions"
          ],
          limitedCoverage: [
            "Outer City Areas",
            "Remote Localities"
          ],
          restricted: [
            "Restricted Security Zones"
          ]
        },
        peakHours: {
          morning: "8:00 AM - 10:00 AM",
          evening: "5:00 PM - 8:00 PM",
          surcharge: "10-25% extra during peak hours"
        },
        safetyFeatures: [
          "Professional Verified Drivers",
          "GPS Vehicle Tracking",
          "24/7 Customer Support",
          "Emergency Assistance",
          "Clean Sanitized Vehicles"
        ],
        popularRoutes: [
          `${formattedCityName} Local Tours`,
          `${formattedCityName} Airport Transfer`,
          `${formattedCityName} to Major Cities`
        ]
      };
    }

    return (
      <CityServiceClient 
        formattedCityName={formattedCityName}
        citySpots={citySpots}
        details={details}
        vehiclesServices={vehiclesServices}
      />
    );
  }
}