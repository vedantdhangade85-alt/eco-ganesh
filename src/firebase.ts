// Firebase Configuration & Firestore setup
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { Idol, CustomerOrder, CustomerUser, PaymentRecord } from './types';
import { INITIAL_IDOLS, INITIAL_ORDERS, INITIAL_CUSTOMERS, INITIAL_PAYMENTS } from './data/initialData';

const firebaseConfig = {
  apiKey: "AIzaSyDEcXk50-e7zhuHK_mwZhD35R1J61AFrUk",
  authDomain: "eco-ganesh.firebaseapp.com",
  projectId: "eco-ganesh",
  storageBucket: "eco-ganesh.firebasestorage.app",
  messagingSenderId: "491141984954",
  appId: "1:491141984954:web:f5b74f050a34f306194883",
  measurementId: "G-92PSPHGW0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection References
export const IDOLS_COLLECTION = 'idols';
export const ORDERS_COLLECTION = 'orders';
export const CUSTOMERS_COLLECTION = 'customers';
export const PAYMENTS_COLLECTION = 'payments';

// Initialize/Seed Firestore with initial data if collections are empty
export async function seedInitialDataIfEmpty() {
  try {
    const idolsSnapshot = await getDocs(collection(db, IDOLS_COLLECTION));
    if (idolsSnapshot.empty) {
      console.log('Seeding initial idols to Firestore...');
      for (const idol of INITIAL_IDOLS) {
        await setDoc(doc(db, IDOLS_COLLECTION, idol.id), idol);
      }
    }

    const ordersSnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
    if (ordersSnapshot.empty) {
      console.log('Seeding initial orders to Firestore...');
      for (const order of INITIAL_ORDERS) {
        await setDoc(doc(db, ORDERS_COLLECTION, order.id), order);
      }
    }

    const customersSnapshot = await getDocs(collection(db, CUSTOMERS_COLLECTION));
    if (customersSnapshot.empty) {
      console.log('Seeding initial customers to Firestore...');
      for (const customer of INITIAL_CUSTOMERS) {
        await setDoc(doc(db, CUSTOMERS_COLLECTION, customer.id), customer);
      }
    }

    const paymentsSnapshot = await getDocs(collection(db, PAYMENTS_COLLECTION));
    if (paymentsSnapshot.empty) {
      console.log('Seeding initial payments to Firestore...');
      for (const payment of INITIAL_PAYMENTS) {
        await setDoc(doc(db, PAYMENTS_COLLECTION, payment.transactionId), payment);
      }
    }
  } catch (error) {
    console.warn('Could not seed Firestore (check permissions / network):', error);
  }
}

// Database Actions
export async function dbAddOrUpdateIdol(idol: Idol) {
  try {
    await setDoc(doc(db, IDOLS_COLLECTION, idol.id), idol);
  } catch (err) {
    console.error('Error updating idol in Firestore:', err);
  }
}

export async function dbDeleteIdol(idolId: string) {
  try {
    await deleteDoc(doc(db, IDOLS_COLLECTION, idolId));
  } catch (err) {
    console.error('Error deleting idol in Firestore:', err);
  }
}

export async function dbSaveOrder(order: CustomerOrder) {
  try {
    await setDoc(doc(db, ORDERS_COLLECTION, order.id), order);
  } catch (err) {
    console.error('Error saving order to Firestore:', err);
  }
}

export async function dbUpdateOrderStatus(orderId: string, status: CustomerOrder['orderStatus']) {
  try {
    await updateDoc(doc(db, ORDERS_COLLECTION, orderId), { orderStatus: status });
  } catch (err) {
    console.error('Error updating order status in Firestore:', err);
  }
}

export async function dbSaveCustomer(customer: CustomerUser) {
  try {
    await setDoc(doc(db, CUSTOMERS_COLLECTION, customer.id), customer);
  } catch (err) {
    console.error('Error saving customer to Firestore:', err);
  }
}

export async function dbSavePayment(payment: PaymentRecord) {
  try {
    await setDoc(doc(db, PAYMENTS_COLLECTION, payment.transactionId), payment);
  } catch (err) {
    console.error('Error saving payment to Firestore:', err);
  }
}
