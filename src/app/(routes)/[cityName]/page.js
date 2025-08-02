// src/app/[cityName]/page.js - SERVER COMPONENT (NO "use client")
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

// Enhanced SEO metadata generation with comprehensive keywords for all 14 cities
export async function generateMetadata({ params }) {
  const { cityName } = params;
  
  // Comprehensive keyword sets for all 14 cities
  const citySpecificKeywords = {
    Delhi: [
      'Delhi NCR taxi', 'Gurgaon cab service', 'Noida taxi booking', 'Delhi airport cab', 'Delhi metro taxi',
      'Red Fort taxi tour', 'India Gate cab service', 'Connaught Place taxi', 'Delhi railway station cab',
      'IGI airport taxi Delhi', 'Delhi Uber alternative', 'Delhi Ola competitor', 'government taxi Delhi',
      'corporate cab Delhi', 'wedding car rental Delhi', 'Delhi outstation cab', 'interstate taxi Delhi'
    ],
    Agra: [
      'Taj Mahal cab booking', 'Agra Fort taxi tour', 'Fatehpur Sikri cab service', 'golden triangle taxi',
      'same day Agra tour', 'Agra heritage cab', 'Mathura Vrindavan taxi', 'Agra airport cab',
      'Agra railway station taxi', 'sunrise Taj Mahal cab', 'Agra sightseeing package', 'UNESCO site taxi Agra'
    ],
    Jaipur: [
      'Pink City cab service', 'Amber Fort taxi tour', 'Hawa Mahal cab booking', 'City Palace taxi',
      'Jaipur heritage tour', 'Rajasthan royal taxi', 'Jaipur airport cab', 'desert safari cab Jaipur',
      'Pushkar taxi from Jaipur', 'Ajmer cab service', 'Shekhawati tour taxi', 'palace on wheels alternative'
    ],
    Haridwar: [
      'Ganga Aarti taxi Haridwar', 'Har Ki Pauri cab', 'Chardham yatra taxi', 'Mansa Devi temple cab',
      'spiritual tour Haridwar', 'Kumbh Mela taxi', 'Haridwar pilgrimage cab', 'holy dip taxi Haridwar',
      'Uttarakhand tour taxi', 'Gangotri cab from Haridwar', 'Yamunotri taxi booking'
    ],
    Chandigarh: [
      'City Beautiful taxi', 'Rock Garden cab tour', 'Sukhna Lake taxi', 'Chandigarh airport cab',
      'Mohali taxi service', 'Panchkula cab booking', 'Punjab taxi from Chandigarh', 'Shimla cab Chandigarh',
      'Kasauli taxi booking', 'Chandigarh sightseeing cab', 'UT taxi service'
    ],
    Shimla: [
      'Queen of Hills taxi', 'Mall Road cab Shimla', 'Kufri taxi booking', 'Shimla toy train cab',
      'hill station taxi Shimla', 'summer capital cab', 'Mashobra taxi service', 'Chail cab booking',
      'Shimla heritage taxi', 'colonial architecture tour cab', 'snow taxi Shimla', 'honeymoon cab Shimla'
    ],
    Manali: [
      'Rohtang Pass taxi', 'Solang Valley cab', 'adventure sports taxi Manali', 'snow point cab',
      'Kullu Manali taxi', 'Kasol cab from Manali', 'Spiti Valley taxi', 'Leh Ladakh cab Manali',
      'river rafting taxi Manali', 'paragliding cab booking', 'Himachal tour taxi', 'honeymoon taxi Manali'
    ],
    Amritsar: [
      'Golden Temple taxi', 'Wagah Border cab', 'Jallianwala Bagh taxi tour', 'Punjab heritage cab',
      'Sikh pilgrimage taxi', 'Amritsar airport cab', 'Durgiana Temple taxi', 'Ram Tirath cab',
      'Khalsa College taxi', 'Amritsar food tour cab', 'Punjab cultural taxi', 'langar taxi Amritsar'
    ],
    Dehradun: [
      'Doon Valley taxi', 'Forest Research Institute cab', 'Robber Cave taxi tour', 'Dehradun airport cab',
      'Mussoorie cab from Dehradun', 'Rajaji National Park taxi', 'Sahastradhara cab booking',
      'educational hub taxi Dehradun', 'Uttarakhand capital cab', 'valley taxi service Dehradun'
    ],
    Rishikesh: [
      'Yoga Capital taxi', 'Ganga rafting cab Rishikesh', 'Laxman Jhula taxi', 'Ram Jhula cab',
      'Beatles Ashram taxi tour', 'adventure sports cab Rishikesh', 'spiritual retreat taxi',
      'yoga teacher training cab', 'Triveni Ghat taxi', 'white water rafting cab', 'meditation taxi Rishikesh'
    ],
    Jodhpur: [
      'Blue City taxi Jodhpur', 'Mehrangarh Fort cab', 'Umaid Bhawan taxi', 'desert safari Jodhpur',
      'Rajasthan blue taxi', 'camel safari cab Jodhpur', 'Mandore taxi tour', 'Osian temple cab',
      'royal heritage taxi Jodhpur', 'Thar desert cab', 'Jodhpur sightseeing taxi'
    ],
    Udaipur: [
      'City of Lakes taxi', 'Lake Pichola cab tour', 'City Palace taxi Udaipur', 'Venice of East cab',
      'royal heritage taxi Udaipur', 'Fateh Sagar taxi', 'Jagdish Temple cab', 'Saheliyon ki Bari taxi',
      'romantic city cab Udaipur', 'palace hotel taxi', 'sunset taxi Udaipur', 'wedding destination cab'
    ],
    Ayodhya: [
      'Ram Janmabhoomi taxi', 'Ayodhya Dham cab', 'spiritual tour Ayodhya', 'Ram Mandir taxi booking',
      'Hanuman Garhi cab', 'Kanak Bhawan taxi', 'holy city cab Ayodhya', 'pilgrimage taxi Ayodhya',
      'religious tour cab Ayodhya', 'Ramayana circuit taxi', 'devotional tour Ayodhya'
    ],
    Ahmedabad: [
      'Gujarat commercial taxi', 'Sabarmati Ashram cab', 'Adalaj Stepwell taxi', 'Gandhinagar cab service',
      'Gujarat heritage taxi', 'Akshardham taxi Ahmedabad', 'textile city cab', 'business hub taxi Gujarat',
      'Rann of Kutch cab Ahmedabad', 'Somnath taxi from Ahmedabad', 'Dwarka cab booking'
    ]
  };

  // Route-specific keyword combinations
  const routeKeywords = {
    'Delhi-Agra': ['Golden Triangle tour', 'UNESCO heritage trip', 'Mughal circuit taxi', 'same day Delhi Agra'],
    'Delhi-Jaipur': ['Pink City tour', 'Rajasthan royal trip', 'heritage triangle cab', 'palace tour taxi'],
    'Delhi-Manali': ['Himachal trip taxi', 'hill station cab Delhi', 'adventure tour booking', 'mountain taxi Delhi'],
    'Delhi-Shimla': ['hill queen taxi', 'colonial tour cab', 'summer escape taxi', 'toy train connection cab'],
    'Delhi-Haridwar': ['spiritual journey taxi', 'Ganga darshan cab', 'holy trip Delhi', 'pilgrimage taxi booking'],
    'Delhi-Rishikesh': ['yoga retreat taxi', 'adventure camp cab', 'spiritual adventure taxi', 'river sports cab'],
    'Delhi-Chandigarh': ['city beautiful taxi', 'planned city cab', 'Punjab gateway taxi', 'modern city tour'],
    'Delhi-Amritsar': ['Golden Temple trip', 'Punjab heritage taxi', 'Sikh pilgrimage cab', 'border ceremony taxi'],
    'Delhi-Dehradun': ['valley capital taxi', 'Doon trip cab', 'education hub taxi', 'mountain gateway cab'],
    'Agra-Jaipur': ['heritage circuit taxi', 'royal triangle tour', 'UNESCO twin city cab', 'Mughal Rajput tour'],
    'Jaipur-Udaipur': ['royal Rajasthan taxi', 'palace circuit cab', 'lake city tour', 'heritage hotel taxi'],
    'Chandigarh-Manali': ['hill station express', 'mountain adventure taxi', 'Himachal tour cab', 'scenic route taxi']
  };
  
  // Check if it's a route (contains '-to-')
  const routeData = parseRouteSlug(cityName);
  
  if (routeData) {
    // Route page metadata - Enhanced with comprehensive keywords
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
    
    // Build comprehensive keywords array
    const baseKeywords = [
      `${formattedCityName} to ${formattedDestination} cab`,
      `${formattedCityName} to ${formattedDestination} taxi`,
      `${formattedCityName} to ${formattedDestination} car rental`,
      `${formattedCityName} to ${formattedDestination} outstation cab`,
      `${formattedCityName} ${formattedDestination} taxi service`,
      `cab booking ${formattedCityName} to ${formattedDestination}`,
      `one way taxi ${formattedCityName} ${formattedDestination}`,
      `round trip cab ${formattedCityName} ${formattedDestination}`,
      `AC cab ${formattedCityName} to ${formattedDestination}`,
      `sedan taxi ${formattedCityName} ${formattedDestination}`,
      `SUV rental ${formattedCityName} to ${formattedDestination}`,
      `tempo traveller ${formattedCityName} ${formattedDestination}`,
      `intercity cab ${formattedCityName}`,
      `outstation taxi from ${formattedCityName}`,
      `${formattedCityName} to ${formattedDestination} distance taxi`,
      `cheap cab ${formattedCityName} to ${formattedDestination}`,
      `best taxi service ${formattedCityName} ${formattedDestination}`,
      `online cab booking ${formattedCityName}`,
      `24x7 taxi ${formattedCityName}`,
      `reliable cab service ${formattedCityName}`,
      `professional driver ${formattedCityName}`,
      `safe taxi ${formattedCityName} to ${formattedDestination}`,
      `transparent pricing cab ${formattedCityName}`,
      `GPS enabled taxi ${formattedCityName}`,
      `doorstep pickup ${formattedCityName}`,
      `airport drop ${formattedDestination}`,
      `railway station pickup ${formattedCityName}`,
      `highway taxi ${formattedCityName} ${formattedDestination}`,
      `expressway cab service`,
      `interstate taxi booking`,
      `tourism cab ${formattedCityName}`,
      `sightseeing taxi ${formattedDestination}`,
      `family cab ${formattedCityName} to ${formattedDestination}`,
      `group taxi booking ${formattedCityName}`,
      `corporate cab service ${formattedCityName}`,
      `wedding car rental ${formattedCityName}`,
      `event transportation ${formattedCityName}`,
      `luxury cab ${formattedCityName} to ${formattedDestination}`,
      `economy taxi ${formattedCityName}`,
      `budget cab service ${formattedCityName}`,
      `premium taxi ${formattedCityName} ${formattedDestination}`,
      `comfortable cab ${formattedCityName}`,
      `spacious taxi ${formattedCityName} to ${formattedDestination}`,
      `luggage friendly cab ${formattedCityName}`,
      `elderly friendly taxi ${formattedCityName}`,
      `child friendly cab ${formattedCityName}`,
      `pet friendly taxi ${formattedCityName}`,
      `medical emergency cab ${formattedCityName}`,
      `urgent taxi ${formattedCityName} to ${formattedDestination}`,
      `instant cab booking ${formattedCityName}`,
      `advance taxi booking ${formattedCityName}`,
      `scheduled cab ${formattedCityName}`,
      `return taxi ${formattedDestination} to ${formattedCityName}`,
      `same day return cab ${formattedCityName}`,
      `overnight stay taxi ${formattedCityName}`,
      `multi-stop cab ${formattedCityName}`,
      `custom route taxi ${formattedCityName}`,
      `direct cab ${formattedCityName} to ${formattedDestination}`,
      `non-stop taxi ${formattedCityName}`,
      `express cab service ${formattedCityName}`,
      `fast taxi ${formattedCityName} to ${formattedDestination}`,
      `quick cab booking ${formattedCityName}`,
      `immediate taxi ${formattedCityName}`,
      `emergency cab service ${formattedCityName}`,
      `late night taxi ${formattedCityName}`,
      `early morning cab ${formattedCityName}`,
      `weekend taxi ${formattedCityName} to ${formattedDestination}`,
      `holiday cab service ${formattedCityName}`,
      `festival taxi ${formattedCityName}`,
      `monsoon cab ${formattedCityName}`,
      `winter taxi ${formattedCityName} to ${formattedDestination}`,
      `summer cab service ${formattedCityName}`
    ];

    // Add city-specific keywords
    const originKeywords = citySpecificKeywords[formattedCityName] || [];
    const destKeywords = citySpecificKeywords[formattedDestination] || [];
    
    // Add route-specific keywords
    const routeKey = `${formattedCityName}-${formattedDestination}`;
    const specificRouteKeywords = routeKeywords[routeKey] || [];
    
    // Combine all keywords
    const allKeywords = [...baseKeywords, ...originKeywords, ...destKeywords, ...specificRouteKeywords];
    
    return {
      title: `${formattedCityName} to ${formattedDestination} Cab Service | Book Online at ${startingPrice} - Triveni Cabs`,
      description: `Book reliable cab service from ${formattedCityName} to ${formattedDestination}. ✓ AC vehicles ✓ Professional drivers ✓ 24/7 availability ✓ Transparent pricing starting ${startingPrice}. One-way & round trip options available.`,
      keywords: allKeywords.join(', '),
      openGraph: {
        title: `${formattedCityName} to ${formattedDestination} Cab Service - Book at ${startingPrice}`,
        description: `Professional cab service from ${formattedCityName} to ${formattedDestination}. AC vehicles, verified drivers, transparent pricing. Book now!`,
        type: 'website',
        locale: 'en_IN',
        url: `/${cityName}`,
        siteName: 'Triveni Cabs',
        images: [
          {
            url: '/images/car/car1.png',
            width: 1200,
            height: 630,
            alt: `${formattedCityName} to ${formattedDestination} cab service`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${formattedCityName} to ${formattedDestination} Cab - ${startingPrice}`,
        description: `Book reliable cab service from ${formattedCityName} to ${formattedDestination}. Professional drivers, AC vehicles.`,
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
      other: {
        'geo.region': 'IN',
        'geo.placename': formattedCityName,
        'og:locality': formattedCityName,
        'business:contact_data:locality': formattedCityName,
        'business:contact_data:region': 'India',
      }
    };
  } else {
    // City page metadata - Enhanced with comprehensive location-specific keywords
    const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    // Build comprehensive keywords for city pages
    const baseCityKeywords = [
      `taxi service ${formattedCityName}`,
      `cab booking ${formattedCityName}`,
      `car rental ${formattedCityName}`,
      `outstation taxi ${formattedCityName}`,
      `local cab service ${formattedCityName}`,
      `airport taxi ${formattedCityName}`,
      `railway station cab ${formattedCityName}`,
      `wedding car rental ${formattedCityName}`,
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
      title: `Best Taxi Service in ${formattedCityName} | Car Rental & Cab Booking - Triveni Cabs`,
      description: `#1 taxi service in ${formattedCityName} for outstation trips, local tours, airport transfers & wedding car rentals. ✓ Professional drivers ✓ AC vehicles ✓ 24/7 availability ✓ Best rates. Book now!`,
      keywords: allCityKeywords.join(', '),
      openGraph: {
        title: `Best Taxi Service in ${formattedCityName} - Triveni Cabs`,
        description: `Reliable taxi service in ${formattedCityName}. Book cabs for outstation, local trips, and special occasions. Professional drivers, transparent pricing.`,
        type: 'website',
        locale: 'en_IN',
        url: `/${cityName}`,
        siteName: 'Triveni Cabs',
        images: [
          {
            url: '/images/car/car2.png',
            width: 1200,
            height: 630,
            alt: `Taxi service in ${formattedCityName}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Best Taxi Service in ${formattedCityName}`,
        description: `Professional taxi service in ${formattedCityName}. Outstation trips, local tours, airport transfers.`,
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