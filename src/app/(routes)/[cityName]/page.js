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
  
  // Comprehensive keyword sets for all 14 cities with semantic variations
  const citySpecificKeywords = {
    Delhi: [
      'Delhi NCR taxi service', 'Gurgaon cab booking online', 'Noida taxi rental service', 'Delhi airport cab service',
      'Delhi metro taxi connection', 'Red Fort taxi tour package', 'India Gate cab service booking', 'Connaught Place taxi service',
      'Delhi railway station cab pickup', 'IGI airport taxi Delhi booking', 'Delhi Uber alternative cab', 'Delhi Ola competitor service',
      'government taxi Delhi booking', 'corporate cab Delhi service', 'wedding car rental Delhi package', 'Delhi outstation cab service',
      'interstate taxi Delhi booking', 'Delhi to Agra cab service', 'Delhi to Jaipur taxi booking', 'Delhi to Manali cab rental',
      'Delhi to Shimla taxi service', 'Delhi to Haridwar cab booking', 'Delhi to Rishikesh taxi rental', 'Delhi to Chandigarh cab service',
      'Delhi to Amritsar taxi booking', 'Delhi to Dehradun cab rental', 'New Delhi taxi service', 'Old Delhi cab booking',
      'South Delhi taxi rental', 'North Delhi cab service', 'East Delhi taxi booking', 'West Delhi cab rental',
      'Central Delhi taxi service', 'Dwarka cab booking Delhi', 'Rohini taxi service Delhi', 'Lajpat Nagar cab booking',
      'Karol Bagh taxi service', 'Rajouri Garden cab booking', 'Janakpuri taxi rental', 'Vasant Kunj cab service',
      'Greater Kailash taxi booking', 'Defence Colony cab rental', 'Saket taxi service Delhi', 'Nehru Place cab booking',
      'CP taxi service Delhi', 'Khan Market cab rental', 'INA market taxi booking', 'Dilli Haat cab service',
      'Lotus Temple taxi Delhi', 'Qutub Minar cab booking', 'Humayun Tomb taxi service', 'Akshardham cab rental Delhi',
      'Parliament House taxi booking', 'Rashtrapati Bhavan cab service', 'Chandni Chowk taxi rental', 'Raj Ghat cab booking',
      'Jama Masjid taxi service', 'Purana Qila cab rental', 'National Museum taxi Delhi', 'Teen Murti cab booking',
      'Lodhi Garden taxi service', 'Pragati Maidan cab rental', 'AIIMS taxi booking Delhi', 'IIT Delhi cab service',
      'JNU taxi booking Delhi', 'DU cab service booking', 'Jamia taxi rental Delhi', 'IGNOU cab booking service'
    ],
    Agra: [
      'Taj Mahal cab booking service', 'Agra Fort taxi tour package', 'Fatehpur Sikri cab service booking', 'golden triangle taxi tour',
      'same day Agra tour cab', 'Agra heritage cab service', 'Mathura Vrindavan taxi booking', 'Agra airport cab service',
      'Agra railway station taxi pickup', 'sunrise Taj Mahal cab tour', 'Agra sightseeing package cab', 'UNESCO site taxi Agra tour',
      'Agra to Delhi cab service', 'Agra to Jaipur taxi booking', 'Agra local taxi service', 'Agra outstation cab rental',
      'Mehtab Bagh taxi booking', 'Itmad-ud-Daulah cab service', 'Agra Bear Rescue taxi tour', 'Sikandra tomb cab booking',
      'Agra Fort railway station taxi', 'Agra Cantt taxi service', 'Dayal Bagh cab booking Agra', 'Taj Mahal night view cab',
      'Agra one day tour taxi', 'Agra two day tour cab', 'Agra three day tour taxi', 'Agra weekend tour cab',
      'Agra family tour taxi', 'Agra couple tour cab', 'Agra honeymoon taxi service', 'Agra solo travel cab',
      'Agra group tour taxi', 'Agra corporate tour cab', 'Agra school tour taxi', 'Agra college tour cab',
      'Agra photography tour taxi', 'Agra heritage walk cab', 'Agra food tour taxi', 'Agra shopping tour cab',
      'Agra cultural tour taxi', 'Agra spiritual tour cab', 'Agra adventure tour taxi', 'Agra luxury tour cab',
      'Agra budget tour taxi', 'Agra premium tour cab', 'Agra VIP tour taxi', 'Agra executive tour cab'
    ],
    Jaipur: [
      'Pink City cab service booking', 'Amber Fort taxi tour package', 'Hawa Mahal cab booking service', 'City Palace taxi tour',
      'Jaipur heritage tour cab', 'Rajasthan royal taxi service', 'Jaipur airport cab booking', 'desert safari cab Jaipur tour',
      'Pushkar taxi from Jaipur', 'Ajmer cab service Jaipur', 'Shekhawati tour taxi service', 'palace on wheels alternative cab',
      'Jaipur to Delhi cab service', 'Jaipur to Agra taxi booking', 'Jaipur to Udaipur cab rental', 'Jaipur to Jodhpur taxi service',
      'Nahargarh Fort taxi booking', 'Jaigarh Fort cab service', 'Jantar Mantar taxi tour', 'Albert Hall cab booking',
      'Birla Temple taxi Jaipur', 'Galtaji Temple cab service', 'Sisodia Rani Garden taxi', 'Rambagh Palace cab booking',
      'Jal Mahal taxi service', 'Sanganer taxi booking Jaipur', 'Bagru cab service Jaipur', 'Samode taxi from Jaipur',
      'Chokhi Dhani cab booking', 'Jaipur Literature Festival taxi', 'Jaipur local taxi service', 'Jaipur outstation cab rental',
      'Jaipur sightseeing taxi tour', 'Jaipur full day cab package', 'Jaipur half day taxi tour', 'Jaipur night tour cab',
      'Jaipur shopping tour taxi', 'Jaipur food tour cab', 'Jaipur cultural tour taxi', 'Jaipur heritage walk cab',
      'Jaipur photography tour taxi', 'Jaipur palace tour cab', 'Jaipur fort tour taxi', 'Jaipur temple tour cab',
      'Jaipur garden tour taxi', 'Jaipur museum tour cab', 'Jaipur market tour taxi', 'Jaipur bazaar tour cab'
    ],
    Haridwar: [
      'Ganga Aarti taxi Haridwar booking', 'Har Ki Pauri cab service', 'Chardham yatra taxi from Haridwar', 'Mansa Devi temple cab booking',
      'spiritual tour Haridwar taxi', 'Kumbh Mela taxi service', 'Haridwar pilgrimage cab booking', 'holy dip taxi Haridwar service',
      'Uttarakhand tour taxi Haridwar', 'Gangotri cab from Haridwar', 'Yamunotri taxi booking Haridwar', 'Kedarnath cab Haridwar',
      'Badrinath taxi from Haridwar', 'Haridwar to Rishikesh cab', 'Haridwar to Dehradun taxi', 'Haridwar to Delhi cab service',
      'Chandi Devi taxi Haridwar', 'Maya Devi Temple cab', 'Daksh Mahadev taxi booking', 'Sapt Rishi Ashram cab',
      'Bharat Mata Mandir taxi', 'Pawan Dham cab Haridwar', 'Vaishno Devi taxi Haridwar', 'Shanti Kunj cab booking',
      'Patanjali Yogpeeth taxi', 'Haridwar railway station cab', 'Haridwar bus stand taxi', 'Haridwar local tour cab',
      'Haridwar sightseeing taxi', 'Haridwar temple tour cab', 'Haridwar ashram tour taxi', 'Haridwar ghat tour cab',
      'Haridwar spiritual tour taxi', 'Haridwar pilgrimage tour cab', 'Haridwar religious tour taxi', 'Haridwar devotional tour cab',
      'Haridwar family tour taxi', 'Haridwar group tour cab', 'Haridwar senior citizen taxi', 'Haridwar couple tour cab',
      'Haridwar solo travel taxi', 'Haridwar budget tour cab', 'Haridwar luxury tour taxi', 'Haridwar premium tour cab'
    ],
    Chandigarh: [
      'City Beautiful taxi service', 'Rock Garden cab tour Chandigarh', 'Sukhna Lake taxi booking', 'Chandigarh airport cab service',
      'Mohali taxi service booking', 'Panchkula cab booking service', 'Punjab taxi from Chandigarh', 'Shimla cab Chandigarh booking',
      'Kasauli taxi booking Chandigarh', 'Chandigarh sightseeing cab tour', 'UT taxi service Chandigarh', 'Chandigarh to Delhi cab',
      'Chandigarh to Manali taxi', 'Chandigarh to Amritsar cab', 'Rose Garden taxi Chandigarh', 'Zakir Hussain Rose Garden cab',
      'Leisure Valley taxi booking', 'Sector 17 cab Chandigarh', 'Elante Mall taxi service', 'PGI Chandigarh cab booking',
      'Chandigarh University taxi', 'Punjab University cab service', 'Capitol Complex taxi Chandigarh', 'Government Museum cab',
      'International Dolls Museum taxi', 'Chandigarh Golf Club cab', 'Chandigarh Cricket Stadium taxi', 'Fun City cab booking',
      'Thunder Zone taxi Chandigarh', 'Chattbir Zoo cab service', 'Morni Hills taxi Chandigarh', 'Pinjore Garden cab booking',
      'Chandigarh local taxi service', 'Chandigarh outstation cab', 'Chandigarh sightseeing taxi', 'Chandigarh city tour cab',
      'Chandigarh full day taxi', 'Chandigarh half day cab', 'Chandigarh night tour taxi', 'Chandigarh shopping tour cab',
      'Chandigarh food tour taxi', 'Chandigarh cultural tour cab', 'Chandigarh heritage tour taxi', 'Chandigarh modern tour cab'
    ],
    Shimla: [
      'Queen of Hills taxi service', 'Mall Road cab Shimla booking', 'Kufri taxi booking service', 'Shimla toy train cab connection',
      'hill station taxi Shimla tour', 'summer capital cab service', 'Mashobra taxi service booking', 'Chail cab booking service',
      'Shimla heritage taxi tour', 'colonial architecture tour cab', 'snow taxi Shimla booking', 'honeymoon cab Shimla package',
      'Shimla to Delhi cab service', 'Shimla to Chandigarh taxi', 'Shimla to Manali cab booking', 'Ridge Road taxi Shimla',
      'Christ Church cab Shimla', 'Jakhu Temple taxi booking', 'Scandal Point cab service', 'Shimla State Museum taxi',
      'Viceregal Lodge cab booking', 'Summer Hill taxi Shimla', 'Annandale cab service', 'Chadwick Falls taxi booking',
      'Shimla local taxi service', 'Shimla outstation cab rental', 'Shimla sightseeing taxi tour', 'Shimla hill station cab',
      'Shimla snow point taxi', 'Shimla adventure tour cab', 'Shimla nature tour taxi', 'Shimla photography tour cab',
      'Shimla family tour taxi', 'Shimla couple tour cab', 'Shimla honeymoon taxi', 'Shimla solo travel cab',
      'Shimla group tour taxi', 'Shimla corporate tour cab', 'Shimla luxury tour taxi', 'Shimla budget tour cab',
      'Shimla premium tour taxi', 'Shimla VIP tour cab', 'Shimla executive tour taxi', 'Shimla weekend tour cab'
    ],
    Manali: [
      'Rohtang Pass taxi booking', 'Solang Valley cab service', 'adventure sports taxi Manali', 'snow point cab booking',
      'Kullu Manali taxi service', 'Kasol cab from Manali', 'Spiti Valley taxi booking', 'Leh Ladakh cab Manali route',
      'river rafting taxi Manali', 'paragliding cab booking Manali', 'Himachal tour taxi service', 'honeymoon taxi Manali package',
      'Manali to Delhi cab service', 'Manali to Chandigarh taxi', 'Manali to Shimla cab booking', 'Hidimba Temple taxi Manali',
      'Vashisht Temple cab booking', 'Manu Temple taxi service', 'Old Manali cab booking', 'Mall Road taxi Manali',
      'Beas River taxi tour', 'Jogini Falls cab booking', 'Rahala Falls taxi service', 'Gulaba cab booking Manali',
      'Marhi taxi service Manali', 'Keylong cab from Manali', 'Lahaul taxi booking', 'Spiti taxi from Manali',
      'Manali local taxi service', 'Manali outstation cab rental', 'Manali sightseeing taxi tour', 'Manali adventure cab',
      'Manali snow taxi booking', 'Manali trekking cab service', 'Manali camping taxi tour', 'Manali skiing cab booking',
      'Manali family tour taxi', 'Manali couple tour cab', 'Manali honeymoon taxi', 'Manali solo travel cab',
      'Manali group tour taxi', 'Manali corporate tour cab', 'Manali luxury tour taxi', 'Manali budget tour cab'
    ],
    Amritsar: [
      'Golden Temple taxi booking', 'Wagah Border cab service', 'Jallianwala Bagh taxi tour', 'Punjab heritage cab service',
      'Sikh pilgrimage taxi booking', 'Amritsar airport cab service', 'Durgiana Temple taxi booking', 'Ram Tirath cab service',
      'Khalsa College taxi booking', 'Amritsar food tour cab', 'Punjab cultural taxi tour', 'langar taxi Amritsar service',
      'Amritsar to Delhi cab service', 'Amritsar to Chandigarh taxi', 'Amritsar railway station cab', 'Harmandir Sahib taxi',
      'Akal Takht cab booking', 'Guru Nanak Dev University taxi', 'Mata Lal Devi Temple cab', 'Gobindgarh Fort taxi',
      'Central Sikh Museum cab', 'Maharaja Ranjit Singh Museum taxi', 'Summer Palace cab Amritsar', 'Company Bagh taxi',
      'Hall Gate cab booking', 'Gandhi Gate taxi service', 'Katra Jaimal Singh cab', 'Lawrence Road taxi Amritsar',
      'Amritsar local taxi service', 'Amritsar outstation cab rental', 'Amritsar sightseeing taxi tour', 'Amritsar heritage cab',
      'Amritsar spiritual tour taxi', 'Amritsar religious tour cab', 'Amritsar pilgrimage taxi', 'Amritsar cultural tour cab',
      'Amritsar family tour taxi', 'Amritsar group tour cab', 'Amritsar solo travel taxi', 'Amritsar couple tour cab',
      'Amritsar budget tour taxi', 'Amritsar luxury tour cab', 'Amritsar premium tour taxi', 'Amritsar VIP tour cab'
    ],
    Dehradun: [
      'Doon Valley taxi service', 'Forest Research Institute cab', 'Robber Cave taxi tour', 'Dehradun airport cab service',
      'Mussoorie cab from Dehradun', 'Rajaji National Park taxi', 'Sahastradhara cab booking', 'educational hub taxi Dehradun',
      'Uttarakhand capital cab service', 'valley taxi service Dehradun', 'Dehradun to Delhi cab service', 'Dehradun to Haridwar taxi',
      'Dehradun to Rishikesh cab', 'Tapkeshwar Temple taxi', 'Mindrolling Monastery cab', 'Buddha Temple taxi Dehradun',
      'Clock Tower cab booking', 'Paltan Bazaar taxi service', 'Rajpur Road cab booking', 'Dehradun railway station taxi',
      'Jolly Grant Airport cab', 'ISBT Dehradun taxi service', 'Dehradun local taxi service', 'Dehradun outstation cab',
      'Dehradun sightseeing taxi tour', 'Dehradun valley tour cab', 'Dehradun nature tour taxi', 'Dehradun adventure cab',
      'Dehradun family tour taxi', 'Dehradun couple tour cab', 'Dehradun solo travel taxi', 'Dehradun group tour cab',
      'Dehradun corporate tour taxi', 'Dehradun educational tour cab', 'Dehradun budget tour taxi', 'Dehradun luxury tour cab',
      'Dehradun premium tour taxi', 'Dehradun VIP tour cab', 'Dehradun executive tour taxi', 'Dehradun weekend tour cab'
    ],
    Rishikesh: [
      'Yoga Capital taxi service', 'Ganga rafting cab Rishikesh', 'Laxman Jhula taxi booking', 'Ram Jhula cab service',
      'Beatles Ashram taxi tour', 'adventure sports cab Rishikesh', 'spiritual retreat taxi booking', 'yoga teacher training cab',
      'Triveni Ghat taxi service', 'white water rafting cab', 'meditation taxi Rishikesh', 'Rishikesh to Delhi cab service',
      'Rishikesh to Haridwar taxi', 'Rishikesh to Dehradun cab', 'Parmarth Niketan taxi', 'Sivananda Ashram cab',
      'Gita Bhavan taxi booking', 'Neelkanth Mahadev cab', 'Kunjapuri Temple taxi', 'Vashishta Cave cab booking',
      'Swarg Ashram taxi service', 'Geeta Bhawan cab booking', 'Rishikesh local taxi service', 'Rishikesh outstation cab',
      'Rishikesh sightseeing taxi tour', 'Rishikesh adventure cab', 'Rishikesh spiritual tour taxi', 'Rishikesh yoga tour cab',
      'Rishikesh meditation tour taxi', 'Rishikesh ashram tour cab', 'Rishikesh temple tour taxi', 'Rishikesh ghat tour cab',
      'Rishikesh family tour taxi', 'Rishikesh couple tour cab', 'Rishikesh solo travel taxi', 'Rishikesh group tour cab',
      'Rishikesh budget tour taxi', 'Rishikesh luxury tour cab', 'Rishikesh premium tour taxi', 'Rishikesh VIP tour cab'
    ],
    Jodhpur: [
      'Blue City taxi Jodhpur booking', 'Mehrangarh Fort cab service', 'Umaid Bhawan taxi booking', 'desert safari Jodhpur cab',
      'Rajasthan blue taxi service', 'camel safari cab Jodhpur', 'Mandore taxi tour service', 'Osian temple cab booking',
      'royal heritage taxi Jodhpur', 'Thar desert cab service', 'Jodhpur sightseeing taxi tour', 'Jodhpur to Udaipur cab',
      'Jodhpur to Jaipur taxi', 'Jodhpur to Delhi cab service', 'Jaswant Thada taxi booking', 'Clock Tower cab Jodhpur',
      'Sardar Market taxi service', 'Balsamand Lake cab booking', 'Kaylana Lake taxi service', 'Rao Jodha Desert Rock Park cab',
      'Machia Safari Park taxi', 'Jodhpur airport cab service', 'Jodhpur railway station taxi', 'Jodhpur local taxi service',
      'Jodhpur outstation cab rental', 'Jodhpur heritage tour taxi', 'Jodhpur royal tour cab', 'Jodhpur fort tour taxi',
      'Jodhpur palace tour cab', 'Jodhpur desert tour taxi', 'Jodhpur cultural tour cab', 'Jodhpur family tour taxi',
      'Jodhpur couple tour cab', 'Jodhpur honeymoon taxi', 'Jodhpur solo travel cab', 'Jodhpur group tour taxi',
      'Jodhpur luxury tour cab', 'Jodhpur budget tour taxi', 'Jodhpur premium tour cab', 'Jodhpur VIP tour taxi'
    ],
    Udaipur: [
      'City of Lakes taxi service', 'Lake Pichola cab tour', 'City Palace taxi Udaipur', 'Venice of East cab service',
      'royal heritage taxi Udaipur', 'Fateh Sagar taxi booking', 'Jagdish Temple cab service', 'Saheliyon ki Bari taxi',
      'romantic city cab Udaipur', 'palace hotel taxi service', 'sunset taxi Udaipur booking', 'wedding destination cab',
      'Udaipur to Jodhpur taxi', 'Udaipur to Jaipur cab', 'Udaipur to Delhi taxi service', 'Jag Mandir taxi tour',
      'Jag Niwas cab booking', 'Lake Palace taxi service', 'Monsoon Palace cab booking', 'Bagore ki Haveli taxi',
      'Shilpgram cab service', 'Eklingji Temple taxi', 'Nathdwara cab from Udaipur', 'Ranakpur taxi booking',
      'Kumbhalgarh cab from Udaipur', 'Udaipur airport taxi service', 'Udaipur railway station cab', 'Udaipur local taxi',
      'Udaipur outstation cab rental', 'Udaipur sightseeing taxi tour', 'Udaipur lake tour cab', 'Udaipur palace tour taxi',
      'Udaipur heritage tour cab', 'Udaipur royal tour taxi', 'Udaipur romantic tour cab', 'Udaipur family tour taxi',
      'Udaipur couple tour cab', 'Udaipur honeymoon taxi', 'Udaipur luxury tour cab', 'Udaipur budget tour taxi'
    ],
    Ayodhya: [
      'Ram Janmabhoomi taxi booking', 'Ayodhya Dham cab service', 'spiritual tour Ayodhya taxi', 'Ram Mandir taxi booking',
      'Hanuman Garhi cab service', 'Kanak Bhawan taxi booking', 'holy city cab Ayodhya', 'pilgrimage taxi Ayodhya service',
      'religious tour cab Ayodhya', 'Ramayana circuit taxi', 'devotional tour Ayodhya cab', 'Ayodhya to Delhi taxi service',
      'Ayodhya to Varanasi cab', 'Ayodhya to Lucknow taxi', 'Dashrath Mahal cab booking', 'Sita ki Rasoi taxi service',
      'Ramkot cab Ayodhya', 'Treta ke Thakur taxi', 'Nageshwarnath Temple cab', 'Mani Parvat taxi booking',
      'Sugriv Parvat cab service', 'Ayodhya railway station taxi', 'Ayodhya airport cab service', 'Ayodhya local taxi service',
      'Ayodhya outstation cab rental', 'Ayodhya sightseeing taxi tour', 'Ayodhya spiritual tour cab', 'Ayodhya religious tour taxi',
      'Ayodhya pilgrimage tour cab', 'Ayodhya temple tour taxi', 'Ayodhya heritage tour cab', 'Ayodhya cultural tour taxi',
      'Ayodhya family tour cab', 'Ayodhya group tour taxi', 'Ayodhya solo travel cab', 'Ayodhya couple tour taxi',
      'Ayodhya budget tour cab', 'Ayodhya luxury tour taxi', 'Ayodhya premium tour cab', 'Ayodhya VIP tour taxi'
    ],
    Ahmedabad: [
      'Gujarat commercial taxi service', 'Sabarmati Ashram cab booking', 'Adalaj Stepwell taxi service', 'Gandhinagar cab service',
      'Gujarat heritage taxi tour', 'Akshardham taxi Ahmedabad', 'textile city cab service', 'business hub taxi Gujarat',
      'Rann of Kutch cab Ahmedabad', 'Somnath taxi from Ahmedabad', 'Dwarka cab booking Ahmedabad', 'Ahmedabad to Mumbai taxi',
      'Ahmedabad to Delhi cab', 'Ahmedabad to Rajkot taxi', 'Sidi Saiyyed Mosque cab', 'Jama Masjid taxi Ahmedabad',
      'Bhadra Fort cab booking', 'Teen Darwaza taxi service', 'Calico Museum cab booking', 'Auto World Vintage Museum taxi',
      'Kankaria Lake cab service', 'Law Garden taxi booking', 'Manek Chowk cab service', 'Sarkhej Roza taxi booking',
      'ISKCON Temple cab Ahmedabad', 'Ahmedabad airport taxi service', 'Ahmedabad railway station cab', 'Ahmedabad local taxi',
      'Ahmedabad outstation cab rental', 'Ahmedabad sightseeing taxi tour', 'Ahmedabad heritage tour cab', 'Ahmedabad cultural tour taxi',
      'Ahmedabad business tour cab', 'Ahmedabad textile tour taxi', 'Ahmedabad family tour cab', 'Ahmedabad group tour taxi',
      'Ahmedabad solo travel cab', 'Ahmedabad couple tour taxi', 'Ahmedabad luxury tour cab', 'Ahmedabad budget tour taxi'
    ]
  };

  // Enhanced route-specific keyword combinations with semantic variations
  const routeKeywords = {
    'Delhi-Agra': [
      'Golden Triangle tour package', 'UNESCO heritage trip Delhi Agra', 'Mughal circuit taxi service', 'same day Delhi Agra tour',
      'Taj Mahal tour from Delhi', 'Delhi Agra expressway cab', 'Delhi Agra highway taxi', 'Delhi to Agra one day trip',
      'Delhi Agra round trip cab', 'Delhi Agra Yamuna expressway taxi', 'Agra Fort tour from Delhi', 'Fatehpur Sikri cab Delhi',
      'Delhi Agra tourist taxi', 'Delhi Agra heritage tour', 'Delhi Agra sightseeing cab', 'Delhi Agra family tour',
      'Delhi Agra couple tour', 'Delhi Agra group tour', 'Delhi Agra luxury tour', 'Delhi Agra budget tour'
    ],
    'Delhi-Jaipur': [
      'Pink City tour from Delhi', 'Rajasthan royal trip Delhi', 'heritage triangle cab service', 'palace tour taxi Delhi Jaipur',
      'Delhi Jaipur highway cab', 'Delhi Jaipur expressway taxi', 'Delhi to Jaipur one day tour', 'Delhi Jaipur round trip',
      'Amber Fort tour from Delhi', 'Hawa Mahal cab Delhi', 'City Palace taxi Delhi', 'Delhi Jaipur heritage tour',
      'Delhi Jaipur royal tour', 'Delhi Jaipur sightseeing cab', 'Delhi Jaipur family tour', 'Delhi Jaipur couple tour',
      'Delhi Jaipur group tour', 'Delhi Jaipur luxury tour', 'Delhi Jaipur budget tour', 'Delhi Jaipur weekend tour'
    ],
    'Delhi-Manali': [
      'Himachal trip taxi Delhi', 'hill station cab Delhi Manali', 'adventure tour booking Delhi', 'mountain taxi Delhi Manali',
      'Delhi to Manali hill tour', 'Delhi Manali highway cab', 'Delhi Manali expressway taxi', 'Rohtang Pass tour Delhi',
      'Solang Valley cab Delhi',       'Delhi Manali adventure tour', 'Delhi Manali honeymoon trip', 'Delhi Manali family tour',
      'Delhi Manali group tour', 'Delhi Manali luxury tour', 'Delhi Manali budget tour', 'Delhi Manali weekend tour'
    ],
    'Delhi-Shimla': [
      'hill queen taxi Delhi', 'colonial tour cab Delhi Shimla', 'summer escape taxi Delhi', 'toy train connection cab Delhi',
      'Delhi to Shimla hill tour', 'Delhi Shimla highway cab', 'Delhi Shimla mountain taxi', 'Mall Road tour Delhi',
      'Kufri tour from Delhi', 'Delhi Shimla heritage tour', 'Delhi Shimla colonial tour', 'Delhi Shimla family tour',
      'Delhi Shimla couple tour', 'Delhi Shimla honeymoon trip', 'Delhi Shimla group tour', 'Delhi Shimla luxury tour',
      'Delhi Shimla budget tour', 'Delhi Shimla weekend tour', 'Delhi Shimla snow tour', 'Delhi Shimla adventure tour'
    ],
    'Delhi-Haridwar': [
      'spiritual journey taxi Delhi', 'Ganga darshan cab Delhi', 'holy trip Delhi Haridwar', 'pilgrimage taxi booking Delhi',
      'Delhi to Haridwar spiritual tour', 'Delhi Haridwar highway cab', 'Har Ki Pauri tour Delhi', 'Chardham tour Delhi',
      'Delhi Haridwar religious tour', 'Delhi Haridwar pilgrimage trip', 'Delhi Haridwar spiritual journey', 'Delhi Haridwar family tour',
      'Delhi Haridwar group tour', 'Delhi Haridwar devotional tour', 'Delhi Haridwar holy trip', 'Delhi Haridwar temple tour'
    ],
    'Delhi-Rishikesh': [
      'yoga retreat taxi Delhi', 'adventure camp cab Delhi', 'spiritual adventure taxi Delhi', 'river sports cab Delhi',
      'Delhi to Rishikesh yoga tour', 'Delhi Rishikesh highway cab', 'rafting tour from Delhi', 'yoga capital tour Delhi',
      'Delhi Rishikesh adventure tour', 'Delhi Rishikesh spiritual tour', 'Delhi Rishikesh meditation tour', 'Delhi Rishikesh family tour',
      'Delhi Rishikesh couple tour', 'Delhi Rishikesh group tour', 'Delhi Rishikesh luxury tour', 'Delhi Rishikesh budget tour'
    ],
    'Delhi-Chandigarh': [
      'city beautiful taxi Delhi', 'planned city cab Delhi', 'Punjab gateway taxi Delhi', 'modern city tour Delhi',
      'Delhi to Chandigarh highway cab', 'Delhi Chandigarh expressway taxi', 'Rock Garden tour Delhi', 'Sukhna Lake cab Delhi',
      'Delhi Chandigarh city tour', 'Delhi Chandigarh sightseeing trip', 'Delhi Chandigarh family tour', 'Delhi Chandigarh couple tour',
      'Delhi Chandigarh group tour', 'Delhi Chandigarh business tour', 'Delhi Chandigarh weekend tour', 'Delhi Chandigarh luxury tour'
    ],
    'Delhi-Amritsar': [
      'Golden Temple trip Delhi', 'Punjab heritage taxi Delhi', 'Sikh pilgrimage cab Delhi', 'border ceremony taxi Delhi',
      'Delhi to Amritsar spiritual tour', 'Delhi Amritsar highway cab', 'Wagah Border tour Delhi', 'Delhi Amritsar heritage tour',
      'Delhi Amritsar religious tour', 'Delhi Amritsar pilgrimage trip', 'Delhi Amritsar cultural tour', 'Delhi Amritsar family tour',
      'Delhi Amritsar group tour', 'Delhi Amritsar devotional tour', 'Delhi Amritsar weekend tour', 'Delhi Amritsar luxury tour'
    ],
    'Delhi-Dehradun': [
      'valley capital taxi Delhi', 'Doon trip cab Delhi', 'education hub taxi Delhi', 'mountain gateway cab Delhi',
      'Delhi to Dehradun valley tour', 'Delhi Dehradun highway cab', 'Delhi Dehradun expressway taxi', 'Forest Research Institute Delhi',
      'Delhi Dehradun educational tour', 'Delhi Dehradun nature tour', 'Delhi Dehradun family tour', 'Delhi Dehradun couple tour',
      'Delhi Dehradun group tour', 'Delhi Dehradun weekend tour', 'Delhi Dehradun luxury tour', 'Delhi Dehradun budget tour'
    ],
    'Agra-Jaipur': [
      'heritage circuit taxi Agra', 'royal triangle tour Agra', 'UNESCO twin city cab Agra', 'Mughal Rajput tour Agra',
      'Agra to Jaipur heritage tour', 'Agra Jaipur highway cab', 'Agra Jaipur royal tour', 'Agra Jaipur palace tour',
      'Agra Jaipur fort tour', 'Agra Jaipur cultural tour', 'Agra Jaipur family tour', 'Agra Jaipur couple tour',
      'Agra Jaipur group tour', 'Agra Jaipur luxury tour', 'Agra Jaipur budget tour', 'Agra Jaipur weekend tour'
    ],
    'Jaipur-Udaipur': [
      'royal Rajasthan taxi Jaipur', 'palace circuit cab Jaipur', 'lake city tour Jaipur', 'heritage hotel taxi Jaipur',
      'Jaipur to Udaipur royal tour', 'Jaipur Udaipur highway cab', 'Jaipur Udaipur palace tour', 'Jaipur Udaipur heritage tour',
      'Jaipur Udaipur lake tour', 'Jaipur Udaipur cultural tour', 'Jaipur Udaipur family tour', 'Jaipur Udaipur couple tour',
      'Jaipur Udaipur honeymoon tour', 'Jaipur Udaipur luxury tour', 'Jaipur Udaipur budget tour', 'Jaipur Udaipur weekend tour'
    ],
    'Chandigarh-Manali': [
      'hill station express Chandigarh', 'mountain adventure taxi Chandigarh', 'Himachal tour cab Chandigarh', 'scenic route taxi Chandigarh',
      'Chandigarh to Manali hill tour', 'Chandigarh Manali highway cab', 'Chandigarh Manali mountain taxi', 'Chandigarh Manali adventure tour',
      'Chandigarh Manali family tour', 'Chandigarh Manali couple tour', 'Chandigarh Manali honeymoon tour', 'Chandigarh Manali group tour',
      'Chandigarh Manali luxury tour', 'Chandigarh Manali budget tour', 'Chandigarh Manali weekend tour', 'Chandigarh Manali snow tour'
    ]
  };

  // Long-tail and semantic keywords for better ranking
  const semanticKeywords = [
    'professional taxi service', 'reliable cab booking', 'verified driver service', 'transparent pricing taxi',
    'GPS enabled cab service', 'doorstep pickup taxi', '24x7 cab availability', 'clean sanitized vehicles',
    'affordable taxi rates', 'premium cab service', 'luxury car rental', 'economy taxi booking',
    'instant cab booking', 'advance taxi reservation', 'corporate cab service', 'wedding car rental',
    'airport transfer service', 'railway station pickup', 'outstation taxi booking', 'intercity cab service',
    'one way taxi service', 'round trip cab booking', 'multi city tour taxi', 'customized taxi package',
    'group travel cab service', 'family taxi booking', 'senior citizen cab service', 'women safe taxi',
    'student discount taxi', 'tourist cab service', 'sightseeing taxi tour', 'heritage tour cab',
    'adventure tour taxi', 'pilgrimage cab service', 'business travel taxi', 'executive cab service',
    'emergency taxi service', 'medical emergency cab', 'late night taxi service', 'early morning cab',
    'weekend taxi booking', 'holiday cab service', 'festival taxi service', 'monsoon cab booking',
    'winter taxi service', 'summer cab booking', 'AC taxi service', 'non AC cab booking',
    'sedan taxi rental', 'SUV cab booking', 'hatchback taxi service', 'luxury sedan rental',
    'premium SUV booking', 'tempo traveller rental', 'mini bus booking', 'coach rental service',
    'self drive cab rental', 'chauffeur driven taxi', 'English speaking driver', 'local language driver',
    'tourist guide cab service', 'photography tour taxi', 'food tour cab booking', 'shopping tour taxi',
    'cultural tour cab service', 'religious tour taxi', 'spiritual tour cab booking', 'nature tour taxi',
    'wildlife tour cab service', 'bird watching taxi tour', 'trekking base camp cab', 'camping site taxi',
    'resort transfer service', 'hotel pickup taxi', 'guest house cab service', 'homestay taxi booking'
  ];

  // Vehicle type specific keywords
  const vehicleTypeKeywords = [
    'hatchback car rental', 'sedan car booking', 'SUV rental service', 'luxury car rental',
    'economy car booking', 'premium car rental', 'compact car booking', 'mid size car rental',
    'full size car booking', 'executive car rental', 'business car booking', 'family car rental',
    'group car booking', 'tourist car rental', 'outstation car booking', 'intercity car rental',
    'highway car booking', 'expressway car rental', 'city car booking', 'local car rental',
    'AC car booking', 'non AC car rental', 'automatic car booking', 'manual car rental',
    'petrol car booking', 'diesel car rental', 'CNG car booking', 'hybrid car rental',
    'electric car booking', 'GPS car rental', 'music system car', 'wifi enabled car',
    'leather seat car', 'fabric seat car', 'sunroof car rental', 'power steering car',
    'power window car', 'central locking car', 'airbag equipped car', 'ABS brake car',
    'new model car rental', 'latest car booking', 'well maintained car', 'clean car rental',
    'sanitized car booking', 'smoke free car', 'pet friendly car', 'child seat car',
    'wheelchair accessible car', 'elderly friendly car', 'luggage space car', 'spacious car rental'
  ];

  // Local area keywords for better local SEO
  const localAreaKeywords = [
    'taxi near me', 'cab service near me', 'car rental near me', 'local taxi service',
    'neighborhood cab service', 'area wise taxi booking', 'locality cab service', 'district taxi booking',
    'zone wise cab service', 'sector taxi booking', 'block cab service', 'colony taxi booking',
    'residential area cab', 'commercial area taxi', 'industrial area cab', 'IT park taxi',
    'business district cab', 'shopping mall taxi', 'market area cab', 'station area taxi',
    'airport area cab', 'hospital area taxi', 'school area cab', 'college area taxi',
    'university area cab', 'office area taxi', 'hotel area cab', 'tourist area taxi',
    'heritage area cab', 'temple area taxi', 'church area cab', 'mosque area taxi',
    'gurudwara area cab', 'park area taxi', 'garden area cab', 'stadium area taxi',
    'ground area cab', 'beach area taxi', 'hill area cab', 'valley area taxi'
  ];
  
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
    
    // Build comprehensive keywords array with better density distribution
    const baseKeywords = [
      // Primary keywords
      `${formattedCityName} to ${formattedDestination} cab`,
      `${formattedCityName} to ${formattedDestination} taxi`,
      `${formattedCityName} to ${formattedDestination} car rental`,
      `${formattedCityName} to ${formattedDestination} taxi service`,
      `${formattedCityName} ${formattedDestination} cab service`,
      
      // Booking related keywords
      `cab booking ${formattedCityName} to ${formattedDestination}`,
      `taxi booking ${formattedCityName} ${formattedDestination}`,
      `book cab ${formattedCityName} to ${formattedDestination}`,
      `online cab booking ${formattedCityName} ${formattedDestination}`,
      `advance taxi booking ${formattedCityName}`,
      
      // Service type keywords
      `outstation cab ${formattedCityName} to ${formattedDestination}`,
      `intercity taxi ${formattedCityName} ${formattedDestination}`,
      `one way taxi ${formattedCityName} ${formattedDestination}`,
      `round trip cab ${formattedCityName} ${formattedDestination}`,
      `return taxi ${formattedCityName} to ${formattedDestination}`,
      
      // Vehicle type keywords
      `AC cab ${formattedCityName} to ${formattedDestination}`,
      `sedan taxi ${formattedCityName} ${formattedDestination}`,
      `SUV rental ${formattedCityName} to ${formattedDestination}`,
      `hatchback cab ${formattedCityName} ${formattedDestination}`,
      `luxury car ${formattedCityName} to ${formattedDestination}`,
      
      // Quality and service keywords
      `best taxi service ${formattedCityName} ${formattedDestination}`,
      `reliable cab service ${formattedCityName}`,
      `professional driver ${formattedCityName}`,
      `safe taxi ${formattedCityName} to ${formattedDestination}`,
      `comfortable cab ${formattedCityName}`,
      
      // Pricing keywords
      `cheap cab ${formattedCityName} to ${formattedDestination}`,
      `affordable taxi ${formattedCityName} ${formattedDestination}`,
      `budget cab service ${formattedCityName}`,
      `transparent pricing taxi ${formattedCityName}`,
      `fixed rate cab ${formattedCityName}`,
      
      // Distance and time keywords
      `${formattedCityName} to ${formattedDestination} distance taxi`,
      `highway cab ${formattedCityName} ${formattedDestination}`,
      `expressway taxi service`,
      `direct cab ${formattedCityName} to ${formattedDestination}`,
      `non stop taxi ${formattedCityName}`,
      
      // Convenience keywords
      `doorstep pickup ${formattedCityName}`,
      `GPS enabled taxi ${formattedCityName}`,
      `24x7 taxi ${formattedCityName}`,
      `instant cab booking ${formattedCityName}`,
      `same day booking taxi ${formattedCityName}`,
      
      // Transfer keywords
      `airport drop ${formattedDestination}`,
      `railway station pickup ${formattedCityName}`,
      `hotel transfer ${formattedCityName}`,
      `resort pickup ${formattedDestination}`,
      `guest house taxi ${formattedCityName}`,
      
      // Group and occasion keywords
      `family cab ${formattedCityName} to ${formattedDestination}`,
      `group taxi booking ${formattedCityName}`,
      `corporate cab service ${formattedCityName}`,
      `wedding car rental ${formattedCityName}`,
      `event transportation ${formattedCityName}`,
      
      // Premium service keywords
      `premium taxi ${formattedCityName} ${formattedDestination}`,
      `executive cab service ${formattedCityName}`,
      `VIP taxi ${formattedCityName} to ${formattedDestination}`,
      `business class cab ${formattedCityName}`,
      `first class taxi ${formattedCityName}`,
      
      // Special needs keywords
      `elderly friendly cab ${formattedCityName}`,
      `child friendly taxi ${formattedCityName}`,
      `pet friendly cab ${formattedCityName}`,
      `wheelchair accessible taxi ${formattedCityName}`,
      `medical emergency cab ${formattedCityName}`,
      
      // Timing keywords
      `late night taxi ${formattedCityName}`,
      `early morning cab ${formattedCityName}`,
      `weekend taxi ${formattedCityName} to ${formattedDestination}`,
      `holiday cab service ${formattedCityName}`,
      `festival taxi ${formattedCityName}`,
      
      // Seasonal keywords
      `monsoon cab ${formattedCityName}`,
      `winter taxi ${formattedCityName} to ${formattedDestination}`,
      `summer cab service ${formattedCityName}`,
      `all weather taxi ${formattedCityName}`,
      `climate controlled cab ${formattedCityName}`,
      
      // Technology keywords
      `app based taxi ${formattedCityName}`,
      `online platform cab ${formattedCityName}`,
      `digital booking taxi ${formattedCityName}`,
      `cashless cab payment ${formattedCityName}`,
      `QR code taxi booking ${formattedCityName}`,
      
      // Tour and travel keywords
      `tourism cab ${formattedCityName}`,
      `sightseeing taxi ${formattedDestination}`,
      `tour package cab ${formattedCityName}`,
      `custom route taxi ${formattedCityName}`,
      `multi stop cab ${formattedCityName}`,
      
      // Emergency and urgent keywords
      `urgent taxi ${formattedCityName} to ${formattedDestination}`,
      `emergency cab service ${formattedCityName}`,
      `immediate taxi ${formattedCityName}`,
      `quick cab booking ${formattedCityName}`,
      `fast taxi service ${formattedCityName}`,
      
      // Long distance keywords
      `long distance taxi ${formattedCityName}`,
      `interstate cab booking`,
      `cross state taxi service`,
      `national highway cab ${formattedCityName}`,
      `long route taxi ${formattedCityName}`
    ];

    // Add city-specific keywords
    const originKeywords = citySpecificKeywords[formattedCityName] || [];
    const destKeywords = citySpecificKeywords[formattedDestination] || [];
    
    // Add route-specific keywords
    const routeKey = `${formattedCityName}-${formattedDestination}`;
    const specificRouteKeywords = routeKeywords[routeKey] || [];
    
    // Add semantic and vehicle type keywords
    const relevantSemanticKeywords = semanticKeywords.slice(0, 30); // Limit to avoid keyword stuffing
    const relevantVehicleKeywords = vehicleTypeKeywords.slice(0, 25);
    const relevantLocalKeywords = localAreaKeywords.slice(0, 20);
    
    // Combine all keywords with proper distribution
    const allKeywords = [
      ...baseKeywords,
      ...originKeywords.slice(0, 40), // Limit city-specific keywords
      ...destKeywords.slice(0, 30),
      ...specificRouteKeywords,
      ...relevantSemanticKeywords,
      ...relevantVehicleKeywords,
      ...relevantLocalKeywords
    ];
    
    // Enhanced title with better keyword targeting
    const enhancedTitle = `Book ${formattedCityName} to ${formattedDestination} Cab Service Online | Starting ${startingPrice} | 24x7 Taxi Booking - Triveni Cabs`;
    
    // Enhanced description with better keyword density
    const enhancedDescription = `Book reliable ${formattedCityName} to ${formattedDestination} cab service online. ✅ Professional drivers ✅ AC vehicles ✅ GPS tracking ✅ 24/7 availability ✅ Transparent pricing from ${startingPrice}. One-way, round trip & outstation taxi booking available. Safe, comfortable & affordable car rental service.`;
    
    return {
      title: enhancedTitle,
      description: enhancedDescription,
      keywords: allKeywords.slice(0, 300).join(', '), // Limit to 300 keywords to avoid penalties
      openGraph: {
        title: `${formattedCityName} to ${formattedDestination} Taxi Service | Book Online at ${startingPrice} | Triveni Cabs`,
        description: `Professional cab service from ${formattedCityName} to ${formattedDestination}. AC vehicles, verified drivers, GPS tracking, transparent pricing. Book your taxi now!`,
        type: 'website',
        locale: 'en_IN',
        url: `https://trivenicabs.in/${cityName}`,
        siteName: 'Triveni Cabs - Premium Taxi Service India',
        images: [
          {
            url: 'https://trivenicabs.in/images/car/car1.png',
            width: 1200,
            height: 630,
            alt: `${formattedCityName} to ${formattedDestination} cab service - Professional taxi booking`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${formattedCityName} to ${formattedDestination} Cab Service - Starting ${startingPrice}`,
        description: `Book reliable taxi from ${formattedCityName} to ${formattedDestination}. Professional drivers, AC vehicles, 24x7 service.`,
        images: ['https://trivenicabs.in/images/car/car1.png'],
        creator: '@TriveniCabs',
        site: '@TriveniCabs'
      },
      alternates: {
        canonical: `https://trivenicabs.in/${cityName}`
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
        'geo.position': getGeoPosition(formattedCityName),
        'ICBM': getGeoPosition(formattedCityName),
        'og:locality': formattedCityName,
        'og:region': getStateFromCity(formattedCityName),
        'og:country-name': 'India',
        'business:contact_data:locality': formattedCityName,
        'business:contact_data:region': getStateFromCity(formattedCityName),
        'business:contact_data:country_name': 'India',
        'article:author': 'Triveni Cabs',
        'article:publisher': 'Triveni Cabs',
        'og:type': 'business.business',
        'fb:app_id': '123456789', // Add your Facebook App ID
        'application-name': 'Triveni Cabs',
        'msapplication-TileColor': '#2d89ef',
        'theme-color': '#2d89ef'
      },
      // Add structured data for better search results
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        'name': `${formattedCityName} to ${formattedDestination} Taxi Service`,
        'description': enhancedDescription,
        'url': `https://trivenicabs.in/${cityName}`,
        'logo': 'https://trivenicabs.in/logo.png',
        'image': 'https://trivenicabs.in/images/car/car1.png',
        'telephone': '+91-7668570551',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': formattedCityName,
          'addressRegion': getStateFromCity(formattedCityName),
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': getLatitude(formattedCityName),
          'longitude': getLongitude(formattedCityName)
        },
        'areaServed': [formattedCityName, formattedDestination],
        'serviceType': 'Taxi Service',
        'provider': {
          '@type': 'Organization',
          'name': 'Triveni Cabs',
          'url': 'https://trivenicabs.in'
        },
        'offers': {
          '@type': 'Offer',
          'price': startingPrice.replace('₹', ''),
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock'
        }
      }
    };
  } else {
    // City page metadata - Enhanced with comprehensive location-specific keywords
    const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    // Build comprehensive keywords for city pages with better structure
    const baseCityKeywords = [
      // Primary service keywords
      `taxi service ${formattedCityName}`,
      `cab booking ${formattedCityName}`,
      `car rental ${formattedCityName}`,
      `taxi booking ${formattedCityName}`,
      `cab service ${formattedCityName}`,
      
      // Local service keywords
      `${formattedCityName} taxi service`,
      `${formattedCityName} cab booking`,
      `${formattedCityName} car rental`,
      `taxi in ${formattedCityName}`,
      `cab in ${formattedCityName}`,
      
      // Service type keywords
      `outstation taxi ${formattedCityName}`,
      `local cab service ${formattedCityName}`,
      `airport taxi ${formattedCityName}`,
      `railway station cab ${formattedCityName}`,
      `intercity taxi ${formattedCityName}`,
      
      // Vehicle type keywords
      `AC cab ${formattedCityName}`,
      `sedan rental ${formattedCityName}`,
      `SUV rental ${formattedCityName}`,
      `hatchback taxi ${formattedCityName}`,
      `luxury car rental ${formattedCityName}`,
      
      // Quality keywords
      `best cab service ${formattedCityName}`,
      `reliable taxi ${formattedCityName}`,
      `professional driver ${formattedCityName}`,
      `safe taxi service ${formattedCityName}`,
      `trusted cab ${formattedCityName}`,
      
      // Convenience keywords
      `24x7 cab service ${formattedCityName}`,
      `online cab booking ${formattedCityName}`,
      `instant taxi booking ${formattedCityName}`,
      `doorstep pickup ${formattedCityName}`,
      `GPS enabled cab ${formattedCityName}`,
      
      // Pricing keywords
      `cheap taxi ${formattedCityName}`,
      `affordable cab ${formattedCityName}`,
      `budget taxi service ${formattedCityName}`,
      `transparent pricing taxi ${formattedCityName}`,
      `fixed rate cab ${formattedCityName}`,
      
      // Special services keywords
      `wedding car rental ${formattedCityName}`,
      `corporate cab service ${formattedCityName}`,
      `event transportation ${formattedCityName}`,
      `group taxi booking ${formattedCityName}`,
      `family cab service ${formattedCityName}`,
      
      // Tour and travel keywords
      `tourist taxi ${formattedCityName}`,
      `sightseeing cab ${formattedCityName}`,
      `local tour taxi ${formattedCityName}`,
      `heritage tour cab ${formattedCityName}`,
      `city tour taxi ${formattedCityName}`,
      
      // Popular destinations from city
      `${formattedCityName} to Delhi cab`,
      `${formattedCityName} to Mumbai taxi`,
      `${formattedCityName} to Bangalore cab`,
      `${formattedCityName} to Pune taxi`,
      `${formattedCityName} to Chennai cab`,
      
      // Transfer services
      `airport transfer ${formattedCityName}`,
      `railway pickup ${formattedCityName}`,
      `hotel transfer ${formattedCityName}`,
      `hospital cab ${formattedCityName}`,
      `office taxi ${formattedCityName}`,
      
      // Time-based services
      `early morning cab ${formattedCityName}`,
      `late night taxi ${formattedCityName}`,
      `weekend taxi service ${formattedCityName}`,
      `holiday cab ${formattedCityName}`,
      `emergency taxi ${formattedCityName}`,
      
      // Special needs services
      `elderly friendly cab ${formattedCityName}`,
      `women safe taxi ${formattedCityName}`,
      `child friendly cab ${formattedCityName}`,
      `pet friendly taxi ${formattedCityName}`,
      `wheelchair accessible cab ${formattedCityName}`,
      
      // Business services
      `business cab service ${formattedCityName}`,
      `executive taxi ${formattedCityName}`,
      `corporate transport ${formattedCityName}`,
      `office cab ${formattedCityName}`,
      `meeting taxi ${formattedCityName}`,
      
      // Entertainment and lifestyle
      `party cab ${formattedCityName}`,
      `club taxi ${formattedCityName}`,
      `restaurant cab ${formattedCityName}`,
      `movie taxi ${formattedCityName}`,
      `shopping mall cab ${formattedCityName}`,
      
      // Religious and cultural
      `temple taxi ${formattedCityName}`,
      `religious tour cab ${formattedCityName}`,
      `pilgrimage taxi ${formattedCityName}`,
      `spiritual tour cab ${formattedCityName}`,
      `cultural tour taxi ${formattedCityName}`,
      
      // Health and wellness
      `medical taxi ${formattedCityName}`,
      `hospital cab ${formattedCityName}`,
      `clinic taxi ${formattedCityName}`,
      `pharmacy cab ${formattedCityName}`,
      `health checkup taxi ${formattedCityName}`,
      
      // Educational services
      `school cab service ${formattedCityName}`,
      `college taxi ${formattedCityName}`,
      `university cab ${formattedCityName}`,
      `tuition taxi ${formattedCityName}`,
      `coaching class cab ${formattedCityName}`,
      
      // Seasonal and weather keywords
      `monsoon cab service ${formattedCityName}`,
      `winter taxi ${formattedCityName}`,
      `summer cab booking ${formattedCityName}`,
      `rainy season taxi ${formattedCityName}`,
      `all weather cab ${formattedCityName}`,
      
      // Technology integration
      `app based taxi ${formattedCityName}`,
      `digital cab booking ${formattedCityName}`,
      `online taxi platform ${formattedCityName}`,
      `cashless cab payment ${formattedCityName}`,
      `QR code taxi ${formattedCityName}`,
      
      // Service quality indicators
      `verified driver taxi ${formattedCityName}`,
      `licensed cab service ${formattedCityName}`,
      `insured taxi ${formattedCityName}`,
      `background checked driver ${formattedCityName}`,
      `customer rated cab ${formattedCityName}`,
      
      // Multi-stop and custom services
      `multi stop taxi ${formattedCityName}`,
      `custom route cab ${formattedCityName}`,
      `wait and return taxi ${formattedCityName}`,
      `hourly cab rental ${formattedCityName}`,
      `daily taxi service ${formattedCityName}`,
      
      // Luggage and space keywords
      `luggage friendly cab ${formattedCityName}`,
      `spacious taxi ${formattedCityName}`,
      `extra baggage cab ${formattedCityName}`,
      `cargo space taxi ${formattedCityName}`,
      `moving assistance cab ${formattedCityName}`
    ];

    // Add city-specific keywords
    const specificKeywords = citySpecificKeywords[formattedCityName] || [];
    
    // Add semantic and service keywords
    const relevantSemanticKeywords = semanticKeywords.slice(0, 40);
    const relevantVehicleKeywords = vehicleTypeKeywords.slice(0, 30);
    const relevantLocalKeywords = localAreaKeywords.slice(0, 25);
    
    // Combine all keywords with proper distribution for city pages
    const allCityKeywords = [
      ...baseCityKeywords,
      ...specificKeywords.slice(0, 50), // Limit to avoid keyword stuffing
      ...relevantSemanticKeywords,
      ...relevantVehicleKeywords,
      ...relevantLocalKeywords
    ];
    
    // Enhanced title for city pages
    const enhancedCityTitle = `#1 Taxi Service in ${formattedCityName} | 24x7 Cab Booking | Car Rental & Outstation Tours - Triveni Cabs`;
    
    // Enhanced description for city pages
    const enhancedCityDescription = `Book the best taxi service in ${formattedCityName} for outstation trips, local tours, airport transfers & wedding car rentals. ✅ Professional verified drivers ✅ AC vehicles ✅ GPS tracking ✅ 24/7 availability ✅ Transparent pricing ✅ Instant booking. Safe, reliable & affordable cab service.`;
    
    return {
      title: enhancedCityTitle,
      description: enhancedCityDescription,
      keywords: allCityKeywords.slice(0, 250).join(', '), // Limit to 250 keywords for city pages
      openGraph: {
        title: `Best Taxi Service in ${formattedCityName} | Professional Cab Booking - Triveni Cabs`,
        description: `Reliable taxi service in ${formattedCityName}. Book cabs for outstation, local trips, and special occasions. Professional drivers, transparent pricing, 24x7 service.`,
        type: 'website',
        locale: 'en_IN',
        url: `https://trivenicabs.in/${cityName}`,
        siteName: 'Triveni Cabs - Premium Taxi Service India',
        images: [
          {
            url: 'https://trivenicabs.in/images/car/car2.png',
            width: 1200,
            height: 630,
            alt: `Professional taxi service in ${formattedCityName} - Triveni Cabs`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Best Taxi Service in ${formattedCityName} | Triveni Cabs`,
        description: `Professional taxi service in ${formattedCityName}. Outstation trips, local tours, airport transfers. Book now!`,
        images: ['https://trivenicabs.in/images/car/car2.png'],
        creator: '@TriveniCabs',
        site: '@TriveniCabs'
      },
      alternates: {
        canonical: `https://trivenicabs.in/${cityName}`
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
        'geo.position': getGeoPosition(formattedCityName),
        'ICBM': getGeoPosition(formattedCityName),
        'og:locality': formattedCityName,
        'og:region': getStateFromCity(formattedCityName),
        'og:country-name': 'India',
        'business:contact_data:locality': formattedCityName,
        'business:contact_data:region': getStateFromCity(formattedCityName),
        'business:contact_data:country_name': 'India',
        'article:author': 'Triveni Cabs',
        'article:publisher': 'Triveni Cabs',
        'og:type': 'business.business',
        'fb:app_id': '123456789', // Add your Facebook App ID
        'application-name': 'Triveni Cabs',
        'msapplication-TileColor': '#2d89ef',
        'theme-color': '#2d89ef'
      },
      // Add structured data for city pages
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        'name': `Taxi Service in ${formattedCityName}`,
        'description': enhancedCityDescription,
        'url': `https://trivenicabs.in/${cityName}`,
        'logo': 'https://trivenicabs.in/logo.png',
        'image': 'https://trivenicabs.in/images/car/car2.png',
        'telephone': '+91-7668570551',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': formattedCityName,
          'addressRegion': getStateFromCity(formattedCityName),
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': getLatitude(formattedCityName),
          'longitude': getLongitude(formattedCityName)
        },
        'areaServed': formattedCityName,
        'serviceType': 'Taxi Service',
        'provider': {
          '@type': 'Organization',
          'name': 'Triveni Cabs',
          'url': 'https://trivenicabs.in',
          'logo': 'https://trivenicabs.in/logo.png',
          'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+91-7668570551',
            'contactType': 'Customer Service',
            'availableLanguage': ['English', 'Hindi']
          }
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Taxi Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Outstation Taxi',
                'description': 'Outstation cab service'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Local Taxi',
                'description': 'Local cab service'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Airport Transfer',
                'description': 'Airport taxi service'
              }
            }
          ]
        }
      }
    };
  }
}

// Helper functions for geo data
function getGeoPosition(cityName) {
  const geoData = {
    'Delhi': '28.6139;77.2090',
    'Agra': '27.1767;78.0081',
    'Jaipur': '26.9124;75.7873',
    'Haridwar': '29.9457;78.1642',
    'Chandigarh': '30.7333;76.7794',
    'Shimla': '31.1048;77.1734',
    'Manali': '32.2396;77.1887',
    'Amritsar': '31.6340;74.8723',
    'Dehradun': '30.3165;78.0322',
    'Rishikesh': '30.0869;78.2676',
    'Jodhpur': '26.2389;73.0243',
    'Udaipur': '24.5854;73.7125',
    'Ayodhya': '26.7922;82.1998',
    'Ahmedabad': '23.0225;72.5714'
  };
  return geoData[cityName] || '28.6139;77.2090';
}

function getLatitude(cityName) {
  return getGeoPosition(cityName).split(';')[0];
}

function getLongitude(cityName) {
  return getGeoPosition(cityName).split(';')[1];
}

function getStateFromCity(cityName) {
  const stateData = {
    'Delhi': 'Delhi',
    'Agra': 'Uttar Pradesh',
    'Jaipur': 'Rajasthan',
    'Haridwar': 'Uttarakhand',
    'Chandigarh': 'Chandigarh',
    'Shimla': 'Himachal Pradesh',
    'Manali': 'Himachal Pradesh',
    'Amritsar': 'Punjab',
    'Dehradun': 'Uttarakhand',
    'Rishikesh': 'Uttarakhand',
    'Jodhpur': 'Rajasthan',
    'Udaipur': 'Rajasthan',
    'Ayodhya': 'Uttar Pradesh',
    'Ahmedabad': 'Gujarat'
  };
  return stateData[cityName] || 'India';
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