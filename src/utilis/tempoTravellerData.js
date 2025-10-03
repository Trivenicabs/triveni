export const tempoFleet = [
  {
    id: 1,
    name: "12 Seater Tempo Traveller",
    capacity: "11-12 Passengers",
    outstationRate: "₹23/km",
    localRate: "₹6,000-7,500/Day",
    features: ["Comfortable Pushback Seats", "AC", "Music System", "Charging Points"],
    image: "/images/tempo/12-seater.png",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    name: "16 Seater Tempo Traveller",
    capacity: "15-16 Passengers",
    outstationRate: "₹25/km",
    localRate: "₹7,500-8,500/Day",
    features: ["Spacious Seating", "Air-conditioned", "Ample Luggage Space", "GPS Tracking"],
    image: "/images/tempo/16-seater.png",
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    name: "17 Seater Tempo Traveller",
    capacity: "14-17 Passengers",
    outstationRate: "₹26/km",
    localRate: "₹9,000-10,500/Day",
    features: ["Luxury Pushback Seats", "Music System", "Charging Points", "Premium Interiors"],
    image: "/images/tempo/17-seater.png",
    color: "from-purple-500 to-purple-600",
    popular: true
  },
  {
    id: 4,
    name: "20 Seater Luxury Tempo Traveller",
    capacity: "18-20 Passengers",
    outstationRate: "₹27/km",
    localRate: "₹9,000-10,000/Day",
    features: ["LED TV", "Music System", "AC", "Ample Luggage Space"],
    image: "/images/tempo/20-seater.png",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    name: "26 Seater Maharaja Edition",
    capacity: "22-26 Passengers",
    outstationRate: "₹26/km",
    localRate: "₹10,000-11,000/Day",
    features: ["Super Luxury Interiors", "Recliner Seats", "Premium Comfort", "Entertainment System"],
    image: "/images/tempo/26-seater.png",
    color: "from-yellow-500 to-yellow-600",
    premium: true
  }
];

export const tempoRoutes = {
  Delhi: [
    { name: "Shimla", type: "Hill Station" },
    { name: "Manali", type: "Adventure" },
    { name: "Dharamshala", type: "Spiritual" },
    { name: "Amritsar", type: "Heritage" },
    { name: "Haridwar", type: "Spiritual" },
    { name: "Rishikesh", type: "Spiritual" },
    { name: "Jaipur", type: "Royal" },
    { name: "Agra", type: "Heritage" },
    { name: "Mathura", type: "Spiritual" },
    { name: "Vrindavan", type: "Spiritual" }
  ],
  Chandigarh: [
    { name: "Shimla", type: "Hill Station" },
    { name: "Manali", type: "Adventure" },
    { name: "Dharamshala", type: "Spiritual" },
    { name: "Dalhousie", type: "Hill Station" },
    { name: "Amritsar", type: "Heritage" },
    { name: "Delhi", type: "Metro" },
    { name: "Jaipur", type: "Royal" }
  ],
  Jaipur: [
    { name: "Delhi", type: "Metro" },
    { name: "Agra", type: "Heritage" },
    { name: "Udaipur", type: "Lakes" },
    { name: "Jodhpur", type: "Blue City" },
    { name: "Jaisalmer", type: "Desert" },
    { name: "Ajmer", type: "Spiritual" },
    { name: "Pushkar", type: "Spiritual" }
  ],
  Agra: [
    { name: "Delhi", type: "Metro" },
    { name: "Jaipur", type: "Royal" },
    { name: "Mathura", type: "Spiritual" },
    { name: "Vrindavan", type: "Spiritual" },
    { name: "Gwalior", type: "Heritage" }
  ],
  Haridwar: [
    { name: "Badrinath", type: "Char Dham" },
    { name: "Kedarnath", type: "Char Dham" },
    { name: "Yamunotri", type: "Char Dham" },
    { name: "Gangotri", type: "Char Dham" },
    { name: "Rishikesh", type: "Spiritual" }
  ],
  Rishikesh: [
    { name: "Auli", type: "Adventure" },
    { name: "Chopta", type: "Adventure" },
    { name: "Haridwar", type: "Spiritual" },
    { name: "Badrinath", type: "Char Dham" },
    { name: "Kedarnath", type: "Char Dham" }
  ],
  Dehradun: [
    { name: "Mussoorie", type: "Hill Station" },
    { name: "Badrinath", type: "Char Dham" },
    { name: "Kedarnath", type: "Char Dham" },
    { name: "Yamunotri", type: "Char Dham" },
    { name: "Gangotri", type: "Char Dham" }
  ],
  Amritsar: [
    { name: "Vaishno Devi Katra", type: "Spiritual" },
    { name: "Delhi", type: "Metro" },
    { name: "Chandigarh", type: "Modern City" }
  ],
  Lucknow: [
    { name: "Varanasi", type: "Spiritual" },
    { name: "Ayodhya", type: "Spiritual" },
    { name: "Delhi", type: "Metro" },
    { name: "Agra", type: "Heritage" }
  ],
//   Varanasi: [
//     { name: "Prayagraj", type: "Spiritual" },
//     { name: "Ayodhya", type: "Spiritual" },
//     { name: "Lucknow", type: "Heritage" }
//   ],
//   Udaipur: [
//     { name: "Mount Abu", type: "Hill Station" },
//     { name: "Ahmedabad", type: "Commercial" },
//     { name: "Jodhpur", type: "Blue City" },
//     { name: "Jaipur", type: "Royal" }
//   ],
//   Jodhpur: [
//     { name: "Jaisalmer", type: "Desert" },
//     { name: "Udaipur", type: "Lakes" },
//     { name: "Jaipur", type: "Royal" }
//   ],
//   Ajmer: [
//     { name: "Pushkar", type: "Spiritual" },
//     { name: "Jaipur", type: "Royal" },
//     { name: "Udaipur", type: "Lakes" }
//   ],
//   Pushkar: [
//     { name: "Ajmer", type: "Spiritual" },
//     { name: "Udaipur", type: "Lakes" },
//     { name: "Jaipur", type: "Royal" }
//   ]
// };

// // Local sightseeing data for each destination city
// export const localSightseeing = {
//   Shimla: [
//     "Mall Road", "Ridge Road", "Christ Church", "Jakhu Temple", 
//     "Kufri", "Chail", "Naldehra", "Mashobra"
//   ],
//   Manali: [
//     "Hadimba Temple", "Solang Valley", "Rohtang Pass", "Old Manali", 
//     "Vashisht Hot Springs", "Jogini Falls", "Manu Temple"
//   ],
//   Dharamshala: [
//     "McLeod Ganj", "Dalai Lama Temple", "Bhagsu Waterfall", 
//     "Triund Trek", "Norbulingka Institute", "St. John Church"
//   ],
//   Amritsar: [
//     "Golden Temple", "Wagah Border", "Jallianwala Bagh", 
//     "Partition Museum", "Gobindgarh Fort", "Ram Tirath"
//   ],
//   Haridwar: [
//     "Har Ki Pauri", "Mansa Devi Temple", "Chandi Devi Temple", 
//     "Maya Devi Temple", "Bharat Mata Mandir", "Patanjali Yogpeeth"
//   ],
//   Rishikesh: [
//     "Laxman Jhula", "Ram Jhula", "Beatles Ashram", "Triveni Ghat", 
//     "Parmarth Niketan", "Neelkanth Mahadev", "Kunjapuri Temple"
//   ],
//   Jaipur: [
//     "Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", 
//     "Nahargarh Fort", "Jaigarh Fort", "Albert Hall Museum"
//   ],
//   Agra: [
//     "Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh", 
//     "Itmad-ud-Daulah", "Sikandra", "Agra Bear Rescue"
//   ],
//   Delhi: [
//     "Red Fort", "India Gate", "Qutub Minar", "Lotus Temple", 
//     "Akshardham", "Humayun's Tomb", "Connaught Place"
//   ],
//   Udaipur: [
//     "City Palace", "Lake Pichola", "Jag Mandir", "Fateh Sagar Lake", 
//     "Saheliyon Ki Bari", "Jagdish Temple", "Monsoon Palace"
//   ],
//   Jodhpur: [
//     "Mehrangarh Fort", "Umaid Bhawan Palace", "Jaswant Thada", 
//     "Clock Tower", "Mandore Gardens", "Rao Jodha Desert Rock Park"
//   ],
//   Varanasi: [
//     "Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath", 
//     "Assi Ghat", "Manikarnika Ghat", "BHU Campus", "Ramnagar Fort"
//   ],
//   Lucknow: [
//     "Bara Imambara", "Chota Imambara", "Rumi Darwaza", 
//     "British Residency", "Hazratganj", "Ambedkar Park"
//   ],
//   Ayodhya: [
//     "Ram Janmabhoomi", "Hanuman Garhi", "Kanak Bhawan", 
//     "Dashrath Mahal", "Sita ki Rasoi", "Ramkot"
//   ]
};