export const mockProperties = [
  {
    id: 1,
    title: "Luxury 2BHK Apartment in Bandra",
    location: "Bandra West, Mumbai",
    price: 45000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: [
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Parking", "Gym", "Swimming Pool", "Security", "Lift"],
    description: "Beautiful 2BHK apartment with modern amenities in prime Bandra location. Fully furnished with all necessary appliances and furniture.",
    owner: {
      name: "Rajesh Sharma",
      phone: "+91 9876543210",
      email: "rajesh@email.com"
    },
    available: true,
    furnishing: "Fully Furnished",
    createdAt: "2024-01-15T00:00:00Z",
    status: "active"
  },
  {
    id: 2,
    title: "Spacious 3BHK House in Koramangala",
    location: "Koramangala, Bangalore",
    price: 35000,
    type: "house",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Parking", "Garden", "Security", "Power Backup"],
    description: "Independent house with garden and parking. Perfect for families looking for a quiet neighborhood with good connectivity.",
    owner: {
      name: "Priya Reddy",
      phone: "+91 9876543211",
      email: "priya@email.com"
    },
    available: true,
    furnishing: "Semi Furnished",
    createdAt: "2024-01-14T00:00:00Z",
    status: "active"
  },
  {
    id: 3,
    title: "Modern 1BHK Studio in Gurgaon",
    location: "Cyber City, Gurgaon",
    price: 28000,
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    images: [
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Parking", "Gym", "Lift", "Security", "Power Backup"],
    description: "Modern studio apartment perfect for young professionals. Located in the heart of Cyber City with excellent connectivity.",
    owner: {
      name: "Amit Kumar",
      phone: "+91 9876543212",
      email: "amit@email.com"
    },
    available: true,
    furnishing: "Fully Furnished",
    createdAt: "2024-01-13T00:00:00Z",
    status: "active"
  },
  {
    id: 4,
    title: "Cozy 2BHK Flat in Pune",
    location: "Hinjewadi, Pune",
    price: 22000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    images: [
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Parking", "Gym", "Swimming Pool", "Security"],
    description: "Well-maintained 2BHK flat in a gated community. Close to IT parks and shopping centers.",
    owner: {
      name: "Sneha Patil",
      phone: "+91 9876543213",
      email: "sneha@email.com"
    },
    available: true,
    furnishing: "Semi Furnished",
    createdAt: "2024-01-12T00:00:00Z",
    status: "active"
  }
];

export const mockChats = [
  {
    id: 1,
    propertyId: 1,
    ownerName: "Rajesh Sharma",
    messages: [
      {
        id: 1,
        text: "Hi, I'm interested in your 2BHK apartment in Bandra",
        sender: "user",
        timestamp: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        text: "Hello! Thank you for your interest. Would you like to schedule a visit?",
        sender: "owner",
        timestamp: "2024-01-15T10:35:00Z"
      },
      {
        id: 3,
        text: "Yes, I would love to visit. When would be a good time?",
        sender: "user",
        timestamp: "2024-01-15T10:40:00Z"
      }
    ],
    lastMessage: "Yes, I would love to visit. When would be a good time?",
    lastActivity: "2024-01-15T10:40:00Z",
    unreadCount: 0
  },
  {
    id: 2,
    propertyId: 2,
    ownerName: "Priya Reddy",
    messages: [
      {
        id: 1,
        text: "Is the house still available?",
        sender: "user",
        timestamp: "2024-01-14T14:20:00Z"
      },
      {
        id: 2,
        text: "Yes, it's still available. Would you like to know more details?",
        sender: "owner",
        timestamp: "2024-01-14T14:25:00Z"
      }
    ],
    lastMessage: "Yes, it's still available. Would you like to know more details?",
    lastActivity: "2024-01-14T14:25:00Z",
    unreadCount: 1
  }
];

export const mockServices = [
  {
    id: 1,
    name: "Packers & Movers",
    description: "Professional moving services for hassle-free relocation",
    icon: "🚚",
    price: "Starting from ₹5,000",
    rating: 4.8,
    providers: ["XYZ Packers", "ABC Movers", "Quick Move"]
  },
  {
    id: 2,
    name: "Home Cleaning",
    description: "Deep cleaning services for your new home",
    icon: "🧹",
    price: "Starting from ₹2,000",
    rating: 4.6,
    providers: ["CleanPro", "Sparkle Clean", "Fresh Home"]
  },
  {
    id: 3,
    name: "Painting Services",
    description: "Professional painting and renovation services",
    icon: "🎨",
    price: "Starting from ₹15,000",
    rating: 4.7,
    providers: ["Paint Masters", "Color Craft", "Perfect Paint"]
  },
  {
    id: 4,
    name: "Electrician",
    description: "Electrical installation and repair services",
    icon: "⚡",
    price: "Starting from ₹500",
    rating: 4.5,
    providers: ["Power Fix", "Bright Electric", "Spark Solutions"]
  },
  {
    id: 5,
    name: "Plumbing Services",
    description: "Plumbing installation and repair services",
    icon: "🔧",
    price: "Starting from ₹800",
    rating: 4.4,
    providers: ["Pipe Pro", "Flow Fix", "Aqua Solutions"]
  },
  {
    id: 6,
    name: "Furniture Assembly",
    description: "Professional furniture assembly and installation",
    icon: "🪑",
    price: "Starting from ₹1,500",
    rating: 4.6,
    providers: ["Furniture Fix", "Assembly Pro", "Setup Solutions"]
  }
];