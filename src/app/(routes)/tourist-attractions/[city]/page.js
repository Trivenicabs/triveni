// // src/app/tourist-attractions/[city]/page.js

// import TouristAttractionsClient from '@/components/TouristAttractionsClient';

// // Tourist attractions data based on the PDF
// const touristAttractions = {
//   delhi: [
//     {
//       name: "Old Delhi – Chandni Chowk & Red Fort",
//       type: "Heritage",
//       description: "A vibrant maze of history, culture, and flavors. The bustling lanes of Chandni Chowk are famous for traditional bazaars, centuries-old spice shops, and delicious street food like jalebis, parathas, and kebabs. At the heart stands the magnificent Red Fort, a UNESCO World Heritage Site built by Emperor Shah Jahan.",
//       highlights: ["Traditional Bazaars", "Street Food", "UNESCO Heritage Site", "Mughal Architecture"]
//     },
//     {
//       name: "Akshardham Temple",
//       type: "Spiritual",
//       description: "One of the largest Hindu temple complexes in the world and a modern wonder of architecture. Adorned with intricate carvings, it showcases India's spiritual traditions and timeless art. Visitors can enjoy cultural exhibitions, lush gardens, and the evening musical fountain show.",
//       highlights: ["Intricate Carvings", "Cultural Exhibitions", "Musical Fountain", "Spiritual Experience"]
//     },
//     {
//       name: "India Gate",
//       type: "Memorial",
//       description: "Located in the heart of New Delhi, India Gate is a 42-meter-high war memorial dedicated to Indian soldiers who lost their lives in World War I. Surrounded by manicured lawns and fountains, it looks spectacular when illuminated at night.",
//       highlights: ["War Memorial", "Night Illumination", "Manicured Lawns", "Photography Spot"]
//     },
//     {
//       name: "Lotus Temple",
//       type: "Spiritual",
//       description: "The Lotus Temple, designed in the shape of a blooming lotus, is a Bahá'í House of Worship and a global symbol of peace and harmony. Open to people of all faiths, it welcomes visitors to meditate in silence and soak in its spiritual atmosphere.",
//       highlights: ["Lotus Design", "All Faiths Welcome", "Meditation Space", "Peaceful Atmosphere"]
//     },
//     {
//       name: "Qutub Minar",
//       type: "Heritage",
//       description: "Qutub Minar, rising 73 meters high, is the tallest brick minaret in the world and a UNESCO World Heritage Site. Built in the 12th century by Qutb-ud-din Aibak, it is surrounded by historic ruins, including the famous Iron Pillar.",
//       highlights: ["Tallest Brick Minaret", "UNESCO Heritage", "Iron Pillar", "Indo-Islamic Architecture"]
//     }
//   ],
//   agra: [
//     {
//       name: "Taj Mahal",
//       type: "Heritage",
//       description: "The crown jewel of Agra and one of the Seven Wonders of the World. This white marble mausoleum was built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. The monument is world-renowned for its flawless symmetry and delicate carvings.",
//       highlights: ["Seven Wonders", "White Marble", "Perfect Symmetry", "Love Symbol"]
//     },
//     {
//       name: "Agra Fort",
//       type: "Heritage",
//       description: "Another UNESCO World Heritage Site, Agra Fort is a massive red sandstone fortress built by Emperor Akbar in 1565. Within its walls lie exquisite palaces, mosques, and courtyards. From certain points, visitors can enjoy stunning views of the Taj Mahal.",
//       highlights: ["Red Sandstone", "Mughal Palaces", "Taj Mahal Views", "UNESCO Heritage"]
//     },
//     {
//       name: "Fatehpur Sikri",
//       type: "Heritage",
//       description: "About 40 kilometers from Agra lies Fatehpur Sikri, the once-thriving capital city of Emperor Akbar. Built in the 16th century, this city is famous for its monumental gateways, royal palaces, and the tallest gateway in the world, Buland Darwaza.",
//       highlights: ["Akbar's Capital", "Buland Darwaza", "Royal Palaces", "Architectural Masterpiece"]
//     }
//   ],
//   jaipur: [
//     {
//       name: "Amer Fort",
//       type: "Heritage",
//       description: "Amer Fort, perched on a hilltop overlooking Maota Lake, is a majestic fortress that blends Rajput and Mughal architecture. Its sprawling courtyards, ornate palaces, and the shimmering Sheesh Mahal (Mirror Palace) make it one of Jaipur's most iconic landmarks.",
//       highlights: ["Hilltop Location", "Sheesh Mahal", "Elephant Rides", "Light & Sound Show"]
//     },
//     {
//       name: "City Palace",
//       type: "Royal",
//       description: "At the heart of Jaipur lies the City Palace, a living palace complex that still serves as the residence of the royal family. The palace showcases a harmonious mix of Mughal and Rajput design and houses museums filled with royal costumes and artifacts.",
//       highlights: ["Living Palace", "Royal Museums", "Peacock Gate", "Royal Artifacts"]
//     },
//     {
//       name: "Hawa Mahal",
//       type: "Architecture",
//       description: "The Hawa Mahal, or 'Palace of Winds,' is Jaipur's most photographed attraction. Built in 1799, this five-story pink sandstone structure is decorated with 953 small windows, designed for royal women to observe street life.",
//       highlights: ["Palace of Winds", "953 Windows", "Pink Sandstone", "Honeycomb Design"]
//     },
//     {
//       name: "Jal Mahal",
//       type: "Palace",
//       description: "Floating serenely in the middle of Man Sagar Lake, Jal Mahal is a palace that seems to rise out of the water. While entry inside is restricted, the palace offers breathtaking views from the lakeside, especially during sunrise and sunset.",
//       highlights: ["Floating Palace", "Man Sagar Lake", "Sunset Views", "Photography Spot"]
//     }
//   ],
//   shimla: [
//     {
//       name: "Mall Road",
//       type: "Shopping",
//       description: "Mall Road is the vibrant hub of Shimla, lined with shops, cafes, and colonial-style buildings. A leisurely stroll here allows visitors to soak in the charm of this hill station, shop for souvenirs, and enjoy the cool mountain air.",
//       highlights: ["Colonial Architecture", "Shopping", "Cafes & Restaurants", "Mountain Views"]
//     },
//     {
//       name: "Kufri",
//       type: "Adventure",
//       description: "Just a short drive from Shimla, Kufri is a popular destination for snow lovers and adventure seekers. Known for skiing in winter and horse riding in summer, it also offers panoramic views of the Himalayan ranges.",
//       highlights: ["Winter Skiing", "Horse Riding", "Himalayan Views", "Adventure Sports"]
//     },
//     {
//       name: "Jakhoo Temple",
//       type: "Spiritual",
//       description: "Dedicated to Lord Hanuman, Jakhoo Temple is located atop the highest peak in Shimla. The temple is marked by a towering statue of Hanuman, visible from many parts of the town, offering sweeping views of Shimla.",
//       highlights: ["Highest Peak", "Hanuman Statue", "Panoramic Views", "Hill Station Views"]
//     }
//   ],
//   manali: [
//     {
//       name: "Solang Valley",
//       type: "Adventure",
//       description: "Solang Valley is Manali's adventure playground, offering activities like skiing, paragliding, zorbing, and ATV rides. In winter, it becomes a snowy paradise, while in summer it transforms into a lush valley for adventure sports.",
//       highlights: ["Adventure Playground", "Winter Sports", "Paragliding", "Scenic Valley"]
//     },
//     {
//       name: "Rohtang Pass",
//       type: "Scenic",
//       description: "Rohtang Pass, located at an altitude of 3,978 meters, is one of the most dramatic high-altitude mountain passes in India. Covered in snow for most of the year, it serves as the gateway to Lahaul and Spiti Valley.",
//       highlights: ["High Altitude Pass", "Snow Covered", "Gateway to Spiti", "Dramatic Landscapes"]
//     },
//     {
//       name: "Hidimba Temple",
//       type: "Spiritual",
//       description: "Surrounded by tall deodar forests, Hidimba Temple is a unique wooden shrine dedicated to Goddess Hidimba. Built in 1553, its distinctive architecture and tranquil setting make it one of Manali's most cherished attractions.",
//       highlights: ["Wooden Architecture", "Deodar Forest", "Unique Design", "Tranquil Setting"]
//     }
//   ],
//   amritsar: [
//     {
//       name: "Golden Temple (Harmandir Sahib)",
//       type: "Spiritual",
//       description: "The Golden Temple is the holiest shrine of Sikhism and the spiritual soul of Amritsar. Its golden dome, surrounded by the sacred Amrit Sarovar lake, creates a mesmerizing sight. The community kitchen serves free meals to thousands daily.",
//       highlights: ["Holiest Sikh Shrine", "Golden Dome", "Community Kitchen", "Sacred Lake"]
//     },
//     {
//       name: "Wagah Border",
//       type: "Patriotic",
//       description: "The Wagah Border, located between India and Pakistan, is famous for its daily retreat ceremony. Soldiers from both nations perform a synchronized parade with energy, patriotic songs, and flag-lowering rituals.",
//       highlights: ["Border Ceremony", "Patriotic Atmosphere", "Synchronized Parade", "Flag Lowering"]
//     },
//     {
//       name: "Jallianwala Bagh",
//       type: "Memorial",
//       description: "Jallianwala Bagh is a solemn memorial that commemorates the 1919 massacre. The preserved bullet marks, martyrs' well, and the eternal flame serve as reminders of India's struggle for independence.",
//       highlights: ["Historical Memorial", "Independence Struggle", "Bullet Marks", "Eternal Flame"]
//     }
//   ]
// };

// export async function generateStaticParams() {
//   // Generate static params for cities with tourist attractions
//   const cities = Object.keys(touristAttractions);
  
//   return cities.map((city) => ({
//     city: city,
//   }));
// }

// export async function generateMetadata({ params }) {
//   const { city } = params;
//   const cityName = city.charAt(0).toUpperCase() + city.slice(1);
//   const attractions = touristAttractions[city.toLowerCase()] || [];

//   return {
//     title: `Tourist Attractions in ${cityName} | Must-Visit Places & Monuments`,
//     description: `Discover ${attractions.length} amazing tourist attractions in ${cityName}. From historical monuments to spiritual sites, explore the best places to visit with detailed guides.`,
//     keywords: `${cityName} tourist attractions, ${cityName} monuments, places to visit in ${cityName}, ${cityName} sightseeing, ${cityName} travel guide`,
//     openGraph: {
//       title: `Tourist Attractions in ${cityName} | Complete Travel Guide`,
//       description: `Complete guide to ${attractions.length} must-visit attractions in ${cityName}. Historical sites, temples, forts and more.`,
//       url: `/tourist-attractions/${city}`,
//       type: 'website',
//     }
//   };
// }

// export default function TouristAttractionsPage({ params }) {
//   const { city } = params;
//   const cityName = city.charAt(0).toUpperCase() + city.slice(1);
//   const attractions = touristAttractions[city.toLowerCase()] || [];

//   // If no attractions found, show a message
//   if (attractions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Tourist Attractions</h1>
//           <p className="text-gray-600">No attractions data available for {cityName} yet.</p>
//         </div>
//       </div>
//     );
//   }

//   const pageData = {
//     city: cityName,
//     citySlug: city,
//     attractions: attractions
//   };

//   return <TouristAttractionsClient data={pageData} />;
// }