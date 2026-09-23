import { Idol, CustomerReview, CustomerOrder, CustomerUser, PaymentRecord } from '../types';

export const DOMAIN_IDEAS = [
  { domain: 'ecoganpati.in', status: 'Available', badge: 'Recommended' },
  { domain: 'greenbappa.in', status: 'Available', badge: 'Popular' },
  { domain: 'ecobappa.com', status: 'Trending', badge: 'Global' },
  { domain: 'ecoganeshstore.com', status: 'Available', badge: 'Store Ready' },
  { domain: 'ganpatieco.in', status: 'Available', badge: 'Fast Brand' },
];

export const INITIAL_IDOLS: Idol[] = [
  {
    id: 'idol-1',
    name: 'Bal Ganesh',
    category: 'small',
    categoryLabel: 'Small Ganpati',
    size: '12 Inch',
    height: '30 cm',
    weight: '3.2 kg',
    price: 8000,
    originalPrice: 9500,
    material: '100% Pure Shadu Clay (River Mud)',
    stock: 14,
    rating: 4.9,
    reviewsCount: 48,
    description: 'Charming Bal Ganesh handcrafted by master artisans of Pen, Maharashtra. Made from pure riverbed Shadu Mati, colored with natural turmeric, geru ochre, and plant-derived pigments. Dissolves naturally in water without leaving any toxic residue.',
    images: [
      '/images/ganpati-bal.jpg',
      '/images/ganpati-hero.jpg'
    ],
    features: [
      'Dissolves completely in water in 45 minutes',
      '100% Plaster of Paris (PoP) & Chemical Free',
      'Safe for home visarjan in a bucket or balcony pot',
      'Water can be offered directly to garden plants'
    ],
    visarjanTime: '45 mins in water bucket',
    isFeatured: true
  },
  {
    id: 'idol-2',
    name: 'Royal Ganpati',
    category: 'premium',
    categoryLabel: 'Premium Ganpati',
    size: '18 Inch',
    height: '45 cm',
    weight: '6.8 kg',
    price: 12000,
    originalPrice: 14000,
    material: 'Pure Shadu Mati & Edible Gold Mica Powder',
    stock: 8,
    rating: 5.0,
    reviewsCount: 36,
    description: 'The Royal Ganpati idol sits in a majestic regal posture with ornate Mukut (crown) and delicate dhoti ornamentation. Sculpted with high-density Shadu clay and embellished with non-toxic herbal colors and eco-friendly mica accents.',
    images: [
      '/images/ganpati-royal.jpg',
      '/images/ganpati-hero.jpg'
    ],
    features: [
      'Intricate traditional jewelry hand-carved in clay',
      'Comes with cushioned 7-ply wooden crate packaging',
      'Ideal for home puja mandir or corporate setups',
      'Pure herbal color coatings that protect marine life'
    ],
    visarjanTime: '60 mins in water tub',
    isFeatured: true
  },
  {
    id: 'idol-3',
    name: 'Traditional Ganpati',
    category: 'clay',
    categoryLabel: 'Clay Idols',
    size: '24 Inch',
    height: '60 cm',
    weight: '11.5 kg',
    price: 18000,
    originalPrice: 21000,
    material: 'Riverbed Shadu Mati with Geru & Multani Mitti',
    stock: 5,
    rating: 4.8,
    reviewsCount: 29,
    description: 'A grand traditional 24-inch eco-friendly Ganpati idol sculpted in the time-honored Konkan art style. Features serene expressive eyes, traditional modak blessing hand, and natural earth-tone finish.',
    images: [
      '/images/ganpati-hero.jpg',
      '/images/ganpati-royal.jpg'
    ],
    features: [
      'Grand 2-foot majestic posture for family celebrations',
      'Handcrafted using unbaked sustainable clay',
      'Dissolves gently into fertile river silt',
      'Includes complementary eco-puja kit with certified dhoop'
    ],
    visarjanTime: '90 mins in home tub',
    isFeatured: true
  },
  {
    id: 'idol-4',
    name: 'Plantable Seed Ganpati (Tulsi & Marigold)',
    category: 'seed',
    categoryLabel: 'Seed Ganpati',
    size: '10 Inch',
    height: '25 cm',
    weight: '2.4 kg',
    price: 4500,
    originalPrice: 5500,
    material: 'Red Soil, Organic Vermicompost & Heirloom Seeds',
    stock: 22,
    rating: 4.95,
    reviewsCount: 64,
    description: 'A revolutionary tree Ganpati concept. The idol is embedded with sacred Holy Basil (Tulsi) and Marigold seeds. Do visarjan at home inside a planter pot by watering Bappa. Within 7 to 10 days, green seedlings sprout as Bappas living divine blessing.',
    images: [
      '/images/ganpati-seed.jpg',
      '/images/ganpati-hero.jpg'
    ],
    features: [
      'Embedded with certified organic Tulsi & Marigold seeds',
      'Includes terracotta pot & organic potting soil pack',
      'Grow a perennial plant right on your balcony',
      'Zero waste - full circle of life festival celebration'
    ],
    visarjanTime: 'Dissolves into planter pot in 30 mins',
    plantType: 'Holy Tulsi & Orange Marigold',
    isFeatured: true
  },
  {
    id: 'idol-5',
    name: 'Lalbaugcha Raja Clay Replica',
    category: 'premium',
    categoryLabel: 'Premium Ganpati',
    size: '18 Inch',
    height: '45 cm',
    weight: '7.2 kg',
    price: 14500,
    originalPrice: 16500,
    material: 'High-Purity Pen Clay with Geru Wash',
    stock: 7,
    rating: 4.9,
    reviewsCount: 42,
    description: 'Inspired by the world-famous Lalbaugcha Raja posture. Handcrafted with majestic royal throne backrest, intricate dhoti foldings, and serene blessing gesture. 100% soluble eco-friendly shadu mud.',
    images: [
      '/images/ganpati-royal.jpg',
      '/images/ganpati-hero.jpg'
    ],
    features: [
      'Iconic Lalbaug posture with divine countenance',
      'Colored exclusively with plant-based dyes & Geru',
      'Includes brass-toned decorative clay aarti thali',
      'Doorstep safe delivery in wooden shock-proof cage'
    ],
    visarjanTime: '60 mins in water bucket',
    isFeatured: false
  },
  {
    id: 'idol-6',
    name: 'Dagdusheth Halwai Clay Idol',
    category: 'clay',
    categoryLabel: 'Clay Idols',
    size: '15 Inch',
    height: '38 cm',
    weight: '4.8 kg',
    price: 11000,
    originalPrice: 12500,
    material: 'Natural River Silt & Herbal Pigments',
    stock: 11,
    rating: 4.85,
    reviewsCount: 31,
    description: 'Replica of the revered Shreemant Dagdusheth Halwai Ganpati of Pune. Celebrated for heavy jewelry craftsmanship and golden radiance crafted purely with turmeric and edible mica.',
    images: [
      '/images/ganpati-hero.jpg',
      '/images/ganpati-royal.jpg'
    ],
    features: [
      'Detailed replica of Dagdusheth Halwais golden crown',
      'Natural clay dissolves without any sediment or chemical odor',
      'Eco-friendly packaging with natural jute ropes',
      'Certified artisan craft from Maharashtra'
    ],
    visarjanTime: '50 mins in water bucket',
    isFeatured: false
  },
  {
    id: 'idol-7',
    name: 'Biodegradable Paper Mache Ganpati',
    category: 'paper',
    categoryLabel: 'Paper Mache',
    size: '16 Inch',
    height: '40 cm',
    weight: '1.2 kg',
    price: 6500,
    originalPrice: 7800,
    material: 'Recycled Paper Pulp & Natural Starch Gum',
    stock: 18,
    rating: 4.75,
    reviewsCount: 22,
    description: 'Ultra-lightweight yet sturdy Ganpati idol sculpted from upcycled newspaper pulp, clay, and plant starch binder. Weighs just 1.2 kg, making it easy to carry and handle for senior citizens and children.',
    images: [
      '/images/ganpati-bal.jpg',
      '/images/ganpati-seed.jpg'
    ],
    features: [
      'Extremely lightweight and crack-resistant',
      'Zero lead, mercury or synthetic acrylic paints',
      'Quick biodegradability in home compost or water tub',
      'Artistic hand-painted details with vegetable colors'
    ],
    visarjanTime: '35 mins in warm water',
    isFeatured: false
  },
  {
    id: 'idol-8',
    name: 'Compact Apartment Siddhivinayak',
    category: 'small',
    categoryLabel: 'Small Ganpati',
    size: '8 Inch',
    height: '20 cm',
    weight: '1.6 kg',
    price: 3200,
    originalPrice: 3800,
    material: 'Terracotta & Shadu Clay Hybrid',
    stock: 25,
    rating: 4.9,
    reviewsCount: 53,
    description: 'Tailored specifically for modern city apartments and compact puja setups. Elegant Right-Trunk (Dakshinabhimukhi) posture with calm blessings and natural terracotta terracotta finish.',
    images: [
      '/images/ganpati-bal.jpg',
      '/images/ganpati-hero.jpg'
    ],
    features: [
      'Perfect 8-inch size for small home mandirs & desks',
      'Quick 30-minute bucket visarjan',
      'Smooth natural clay finish with vermilion tilak',
      'Includes complimentary brass bell & puja diya'
    ],
    visarjanTime: '30 mins in bucket',
    isFeatured: false
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Anjali Deshmukh',
    city: 'Pune, Maharashtra',
    idolName: 'Bal Ganesh (12 Inch)',
    rating: 5,
    comment: 'We did home visarjan in our society balcony. The idol completely dissolved within 45 minutes into clean mud! We poured the water into our tulsi plant pot, and it felt so pure and guilt-free. Bappa brought peace to our home.',
    date: 'August 28, 2025',
    verifiedPurchase: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-2',
    customerName: 'Rohan Mehta',
    city: 'Mumbai (Dadar)',
    idolName: 'Plantable Seed Ganpati',
    rating: 5,
    comment: 'The packaging in the wooden crate was rock solid. Not a single chip or scratch. After Visarjan in the pot provided, little marigold and tulsi sprouts appeared in 8 days. Truly divine and eco-friendly!',
    date: 'September 12, 2025',
    verifiedPurchase: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-3',
    customerName: 'Pooja Kulkarni',
    city: 'Bengaluru, Karnataka',
    idolName: 'Royal Ganpati (18 Inch)',
    rating: 5,
    comment: 'Everyone in our apartment was stunned by the facial expression and natural gold finish. To know that no toxic plaster of paris or chemical paint touched our holy waters is the biggest blessing.',
    date: 'September 19, 2025',
    verifiedPurchase: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-4',
    customerName: 'Vikram Joshi',
    city: 'Nashik, Maharashtra',
    idolName: 'Traditional Ganpati (24 Inch)',
    rating: 4.8,
    comment: 'Ordered the 24-inch traditional idol for our joint family celebration. Sturdy craft, timely delivery, and authentic Shadu clay. Will order again every year from Eco Ganesh.',
    date: 'October 2, 2025',
    verifiedPurchase: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'EG-2026-8921',
    billNumber: 'BILL-2026-8921',
    createdAt: '2026-08-25 14:30',
    customerName: 'Rajesh Sharma',
    customerPhone: '+91 98201 23456',
    customerEmail: 'rajesh.sharma@example.com',
    address: 'Flat 402, Shivam Heights, MG Road',
    city: 'Mumbai',
    pincode: '400001',
    paymentMethod: 'UPI',
    paymentStatus: 'Fully Paid',
    orderStatus: 'Confirmed',
    items: [
      {
        idolId: 'idol-1',
        idolName: 'Bal Ganesh',
        idolImage: '/images/ganpati-bal.jpg',
        size: '12 Inch',
        price: 8000,
        quantity: 1
      }
    ],
    subtotal: 8000,
    shipping: 0,
    total: 8000,
    advancePayment: 8000,
    pendingPayment: 0,
    paymentHistory: [
      {
        id: 'pay-101-1',
        amount: 8000,
        date: '2026-08-25 14:30',
        paymentMethod: 'UPI',
        note: 'Full Order Payment Received',
        transactionId: 'TXN-UPI-982172'
      }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'EG-2026-8922',
    billNumber: 'BILL-2026-8922',
    createdAt: '2026-08-27 11:15',
    customerName: 'Sneha Patwardhan',
    customerPhone: '+91 99304 56789',
    customerEmail: 'sneha.p@example.com',
    address: 'B-12, Green Acres, Baner Road',
    city: 'Pune',
    pincode: '411045',
    paymentMethod: 'Net Banking',
    paymentStatus: 'Partially Paid',
    orderStatus: 'Dispatched',
    items: [
      {
        idolId: 'idol-2',
        idolName: 'Royal Ganpati',
        idolImage: '/images/ganpati-royal.jpg',
        size: '18 Inch',
        price: 12000,
        quantity: 1
      }
    ],
    subtotal: 12000,
    shipping: 0,
    total: 12000,
    advancePayment: 4000,
    pendingPayment: 8000,
    paymentHistory: [
      {
        id: 'pay-102-1',
        amount: 4000,
        date: '2026-08-27 11:15',
        paymentMethod: 'Net Banking',
        note: 'Advance Murti Booking Deposit',
        transactionId: 'TXN-NET-443912'
      }
    ]
  },
  {
    id: 'ord-103',
    orderNumber: 'EG-2026-8923',
    billNumber: 'BILL-2026-8923',
    createdAt: '2026-09-01 09:40',
    customerName: 'Kunal Verma',
    customerPhone: '+91 97112 34890',
    customerEmail: 'kunal.verma@example.com',
    address: 'Flat 101, Palm Grove Apartments',
    city: 'Thane',
    pincode: '400601',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    items: [
      {
        idolId: 'idol-4',
        idolName: 'Plantable Seed Ganpati',
        idolImage: '/images/ganpati-seed.jpg',
        size: '10 Inch',
        price: 4500,
        quantity: 2
      }
    ],
    subtotal: 9000,
    shipping: 0,
    total: 9000,
    advancePayment: 0,
    pendingPayment: 9000,
    paymentHistory: []
  }
];

export const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: 'cust-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 98201 23456',
    city: 'Mumbai',
    joinedDate: '2025-08-10',
    ordersCount: 1,
    totalSpent: 8000
  },
  {
    id: 'cust-2',
    name: 'Sneha Patwardhan',
    email: 'sneha.p@example.com',
    phone: '+91 99304 56789',
    city: 'Pune',
    joinedDate: '2025-07-22',
    ordersCount: 2,
    totalSpent: 16500
  },
  {
    id: 'cust-3',
    name: 'Kunal Verma',
    email: 'kunal.verma@example.com',
    phone: '+91 97112 34890',
    city: 'Thane',
    joinedDate: '2026-01-15',
    ordersCount: 1,
    totalSpent: 9000
  },
  {
    id: 'cust-4',
    name: 'Devoted Bhakt',
    email: 'devotee@ecoganpati.in',
    phone: '+91 98000 11223',
    city: 'Bengaluru',
    joinedDate: '2026-03-02',
    ordersCount: 0,
    totalSpent: 0
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    transactionId: 'TXN-UPI-982172',
    orderNumber: 'EG-2026-8921',
    customerName: 'Rajesh Sharma',
    paymentMethod: 'UPI / PhonePe',
    amount: 8000,
    status: 'Completed',
    date: '2026-08-25 14:32'
  },
  {
    transactionId: 'TXN-NET-443912',
    orderNumber: 'EG-2026-8922',
    customerName: 'Sneha Patwardhan',
    paymentMethod: 'HDFC Net Banking',
    amount: 12000,
    status: 'Completed',
    date: '2026-08-27 11:18'
  },
  {
    transactionId: 'TXN-COD-Pending',
    orderNumber: 'EG-2026-8923',
    customerName: 'Kunal Verma',
    paymentMethod: 'Cash on Delivery',
    amount: 9000,
    status: 'Pending',
    date: '2026-09-01 09:40'
  }
];
