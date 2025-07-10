// Sample data for the CityServe application
export const featuredServices = [
  {
    id: 1,
    name: "Plumbing",
    description: "Professional plumbing services",
    icon: "🔧",
    category: "maintenance"
  },
  {
    id: 2,
    name: "Electrical",
    description: "Licensed electrical work",
    icon: "⚡",
    category: "maintenance"
  },
  {
    id: 3,
    name: "Tutoring",
    description: "Academic tutoring services",
    icon: "📚",
    category: "education"
  },
  {
    id: 4,
    name: "Cooking",
    description: "Professional cooking services",
    icon: "👩‍🍳",
    category: "food"
  },
  {
    id: 5,
    name: "Cleaning",
    description: "House cleaning services",
    icon: "🧹",
    category: "maintenance"
  },
  {
    id: 6,
    name: "Gardening",
    description: "Garden maintenance and landscaping",
    icon: "🌱",
    category: "outdoor"
  }
]

export const serviceCategories = [
  { 
    id: "maintenance", 
    name: "Home Maintenance", 
    icon: "🏠",
    color: "cityserve-teal",
    services: ["Plumbing", "Electrical Work", "Appliance Repair", "HVAC Service", "Carpentry", "Painting"]
  },
  { 
    id: "education", 
    name: "Education", 
    icon: "📖",
    color: "cityserve-blue",
    services: ["Tutoring", "Music Lessons", "Language Teaching", "Test Preparation", "Academic Coaching"]
  },
  { 
    id: "food", 
    name: "Food & Catering", 
    icon: "🍽️",
    color: "cityserve-green",
    services: ["Personal Chef", "Catering", "Baking", "Meal Prep", "Cooking Classes", "Special Diets"]
  },
  { 
    id: "outdoor", 
    name: "Outdoor Services", 
    icon: "🌳",
    color: "cityserve-green",
    services: ["Gardening", "Landscaping", "Lawn Care", "Pool Maintenance", "Patio Cleaning"]
  },
  { 
    id: "technology", 
    name: "Technology", 
    icon: "💻",
    color: "cityserve-blue",
    services: ["Computer Repair", "IT Support", "Web Development", "Software Training", "Smart Home Setup"]
  },
  { 
    id: "health", 
    name: "Health & Wellness", 
    icon: "🏥",
    color: "cityserve-pink",
    services: ["Fitness Training", "Yoga Instruction", "Nutrition Coaching", "Massage Therapy", "Mental Health"]
  }
]

export const sampleProviders = [
  {
    id: 1,
    name: "Ramesh Sharma",
    service: "Plumbing",
    rating: 4.8,
    reviewCount: 124,
    hourlyRate: 1200,
    location: "Baluwatar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    availability: "Available Now",
    description: "Professional plumber with over 10 years of experience in residential and commercial plumbing.",
    skills: ["Pipe Repair", "Fixture Installation", "Water Heaters", "Drain Cleaning"]
  },
  {
    id: 2,
    name: "Sushila Shrestha",
    service: "Tutoring",
    rating: 4.9,
    reviewCount: 87,
    hourlyRate: 800,
    location: "Lazimpat",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
    availability: "Available Tomorrow",
    description: "Certified teacher offering tutoring in mathematics, science, and English for grades 1-12 students.",
    skills: ["Mathematics", "Science", "English", "Test Prep"]
  },
  {
    id: 3,
    name: "Bijay Tamang",
    service: "Electrical",
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 1500,
    location: "Patan",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    verified: true,
    availability: "Available This Week",
    description: "Licensed electrician specializing in residential wiring, lighting, and electrical panel upgrades.",
    skills: ["Wiring", "Lighting", "Panel Upgrades", "Safety Inspections"]
  },
  {
    id: 4,
    name: "Anita Gurung",
    service: "Cooking",
    rating: 5.0,
    reviewCount: 93,
    hourlyRate: 1100,
    location: "Boudha",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    verified: true,
    availability: "Available Weekends",
    description: "Professional chef offering personal cooking services, meal prep, and cooking classes for Nepali and international cuisine.",
    skills: ["Meal Prep", "Nepali Cuisine", "Dietary Restrictions", "Catering"]
  },
  {
    id: 5,
    name: "Dipesh Maharjan",
    service: "Web Development",
    rating: 4.8,
    reviewCount: 112,
    hourlyRate: 1800,
    location: "Thamel",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    verified: true,
    availability: "Available Next Week",
    description: "Full-stack developer specialized in creating responsive websites and web applications.",
    skills: ["React", "Node.js", "UI/UX Design", "E-commerce"]
  },
  {
    id: 6,
    name: "Priya Rai",
    service: "Yoga Instruction",
    rating: 4.9,
    reviewCount: 78,
    hourlyRate: 900,
    location: "Budhanilkantha",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    verified: true,
    availability: "Available Mornings",
    description: "Certified yoga instructor offering private and group sessions for all experience levels.",
    skills: ["Hatha Yoga", "Vinyasa", "Meditation", "Prenatal Yoga"]
  }
]
