export interface Idol {
  id: string;
  name: string;
  category: 'clay' | 'small' | 'premium' | 'seed' | 'paper';
  categoryLabel: string;
  size: string; // e.g. "12 Inch"
  height: string; // e.g. "30 cm"
  weight: string; // e.g. "3.5 kg"
  price: number;
  originalPrice?: number;
  material: string; // e.g. "100% Pure Shadu Mati (River Clay)"
  stock: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  features: string[];
  visarjanTime: string; // e.g. "45 minutes in home bucket"
  plantType?: string; // For seed idols e.g. "Holy Tulsi & Marigold"
  isFeatured?: boolean;
}

export interface CartItem {
  idol: Idol;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'UPI' | 'Cash on Delivery' | 'Net Banking' | 'Credit/Debit Card';
  paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery';
  orderStatus: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered';
  items: {
    idolId: string;
    idolName: string;
    idolImage: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
}

export interface PaymentRecord {
  transactionId: string;
  orderNumber: string;
  customerName: string;
  paymentMethod: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  city: string;
  idolName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  avatar: string;
}

export type PageView = 
  | 'home'
  | 'about'
  | 'products'
  | 'categories'
  | 'cart'
  | 'checkout'
  | 'contact'
  | 'login'
  | 'register'
  | 'admin';
