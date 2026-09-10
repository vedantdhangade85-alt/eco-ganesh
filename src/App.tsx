import React, { useState, useEffect } from 'react';
import { PageView, Idol, CartItem, CustomerOrder, CustomerUser, PaymentRecord } from './types';
import { 
  INITIAL_IDOLS, 
  CUSTOMER_REVIEWS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_PAYMENTS 
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProductsView } from './components/ProductsView';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CategoriesView } from './components/CategoriesView';
import { AboutUsView } from './components/AboutUsView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { ContactView } from './components/ContactView';
import { AuthView } from './components/AuthView';
import { AdminPanelView } from './components/AdminPanelView';
import { PhpXamppModal } from './components/PhpXamppModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  
  // Persistent state for idols with automatic image migration
  const [idols, setIdols] = useState<Idol[]>(() => {
    const saved = localStorage.getItem('ecoganesh_idols');
    if (saved) {
      try {
        const parsed: Idol[] = JSON.parse(saved);
        const hasOldUnsplash = parsed.some(i => i.images?.some(img => img.includes('unsplash.com')));
        if (!hasOldUnsplash && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // fallback to INITIAL_IDOLS
      }
    }
    return INITIAL_IDOLS;
  });

  // Persistent cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ecoganesh_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistent orders state
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('ecoganesh_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Customers & Payments state
  const [customers, setCustomers] = useState<CustomerUser[]>(() => {
    const saved = localStorage.getItem('ecoganesh_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('ecoganesh_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  // Active user session
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role?: string } | null>(() => {
    const saved = localStorage.getItem('ecoganesh_user');
    return saved ? JSON.parse(saved) : { name: 'Pooja Sharma', email: 'pooja.sharma@example.com', role: 'customer' };
  });

  // Product Details Modal state
  const [selectedIdolForModal, setSelectedIdolForModal] = useState<Idol | null>(null);

  // PHP/XAMPP Code Modal state
  const [isPhpModalOpen, setIsPhpModalOpen] = useState(false);

  // Category filter state for cross-page navigation
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // URL Sync for direct admin links (e.g. http://localhost:3000/#admin or ?page=admin)
  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page')?.toLowerCase();
      const path = window.location.pathname.toLowerCase().replace(/^\//, '');

      if (hash === 'admin' || pageParam === 'admin' || path === 'admin') {
        setCurrentPage('admin');
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  // Keep URL in sync when navigating to admin
  useEffect(() => {
    if (currentPage === 'admin') {
      if (window.location.hash !== '#admin') {
        window.location.hash = 'admin';
      }
    } else if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [currentPage]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ecoganesh_idols', JSON.stringify(idols));
  }, [idols]);

  // Real-time synchronization across multiple browser tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === 'ecoganesh_orders') {
          const newOrders = JSON.parse(e.newValue);
          setOrders(newOrders);
          showToast('🔔 New Order received and updated in Admin Dashboard!');
        } else if (e.key === 'ecoganesh_customers') {
          setCustomers(JSON.parse(e.newValue));
        } else if (e.key === 'ecoganesh_payments') {
          setPayments(JSON.parse(e.newValue));
        } else if (e.key === 'ecoganesh_idols') {
          setIdols(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('ecoganesh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ecoganesh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ecoganesh_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('ecoganesh_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ecoganesh_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ecoganesh_user');
    }
  }, [currentUser]);

  // Cart operations
  const handleAddToCart = (idol: Idol, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.idol.id === idol.id);
      if (existing) {
        return prev.map((item) =>
          item.idol.id === idol.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { idol, quantity }];
      }
    });
    showToast(`Added "${idol.name}" (${idol.size}) to your cart.`);
  };

  const handleBuyNow = (idol: Idol, quantity: number = 1) => {
    handleAddToCart(idol, quantity);
    setSelectedIdolForModal(null);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCartQuantity = (idolId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.idol.id === idolId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (idolId: string) => {
    setCart((prev) => prev.filter((item) => item.idol.id !== idolId));
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Placement
  const handlePlaceOrder = (newOrder: CustomerOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    handleClearCart();

    // Record payment
    const newPayment: PaymentRecord = {
      transactionId: `TXN-${Date.now().toString().slice(-6)}`,
      orderNumber: newOrder.orderNumber,
      customerName: newOrder.customerName,
      paymentMethod: newOrder.paymentMethod,
      amount: newOrder.total,
      status: newOrder.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Completed',
      date: newOrder.createdAt
    };
    setPayments((prev) => [newPayment, ...prev]);

    // Update or add customer record
    setCustomers((prev) => {
      const existingIndex = prev.findIndex(c => c.name.toLowerCase() === newOrder.customerName.toLowerCase());
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          ordersCount: updated[existingIndex].ordersCount + 1,
          totalSpent: updated[existingIndex].totalSpent + newOrder.total
        };
        return updated;
      } else {
        const newCust: CustomerUser = {
          id: `cust-${Date.now()}`,
          name: newOrder.customerName,
          email: `${newOrder.customerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          phone: newOrder.customerPhone,
          city: newOrder.city,
          joinedDate: new Date().toISOString().split('T')[0],
          ordersCount: 1,
          totalSpent: newOrder.total
        };
        return [newCust, ...prev];
      }
    });

    // Reduce stock
    setIdols((prev) =>
      prev.map((idol) => {
        const orderedItem = newOrder.items.find((it) => it.idolId === idol.id);
        if (orderedItem) {
          return { ...idol, stock: Math.max(0, idol.stock - orderedItem.quantity) };
        }
        return idol;
      })
    );

    showToast(`Order ${newOrder.orderNumber} placed successfully!`);
  };

  // Admin operations
  const handleAddIdol = (newIdol: Idol) => {
    setIdols((prev) => [newIdol, ...prev]);
    showToast(`Added new idol "${newIdol.name}" to the store.`);
  };

  const handleUpdateIdol = (updatedIdol: Idol) => {
    setIdols((prev) =>
      prev.map((i) => (i.id === updatedIdol.id ? updatedIdol : i))
    );
    showToast(`Updated details for "${updatedIdol.name}".`);
  };

  const handleDeleteIdol = (idolId: string) => {
    setIdols((prev) => prev.filter((i) => i.id !== idolId));
    showToast('Idol removed from catalog.');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: CustomerOrder['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    showToast(`Order status updated to ${newStatus}.`);
  };

  // Auth
  const handleLoginSuccess = (user: { name: string; email: string; role?: string }) => {
    setCurrentUser(user);
    showToast(`Signed in as ${user.name}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully');
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-orange-200 selection:text-orange-900">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItemsCount}
        openPhpModal={() => setIsPhpModalOpen(true)}
        isLoggedIn={Boolean(currentUser)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            idols={idols}
            reviews={CUSTOMER_REVIEWS}
            setCurrentPage={setCurrentPage}
            onSelectIdol={(idol) => setSelectedIdolForModal(idol)}
            onAddToCart={(idol, qty) => handleAddToCart(idol, qty)}
            setSelectedCategoryFilter={(cat) => {
              setCategoryFilter(cat);
              setCurrentPage('products');
            }}
          />
        )}

        {currentPage === 'products' && (
          <ProductsView
            idols={idols}
            onSelectIdol={(idol) => setSelectedIdolForModal(idol)}
            onAddToCart={(idol, qty) => handleAddToCart(idol, qty)}
            initialCategoryFilter={categoryFilter}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesView
            idols={idols}
            onSelectIdol={(idol) => setSelectedIdolForModal(idol)}
            onAddToCart={(idol, qty) => handleAddToCart(idol, qty)}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsView setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutView
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'contact' && <ContactView />}

        {(currentPage === 'login' || currentPage === 'register') && (
          <AuthView
            initialMode={currentPage}
            onLoginSuccess={handleLoginSuccess}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPanelView
            idols={idols}
            orders={orders}
            customers={customers}
            payments={payments}
            onAddIdol={handleAddIdol}
            onUpdateIdol={handleUpdateIdol}
            onDeleteIdol={handleDeleteIdol}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            openPhpModal={() => setIsPhpModalOpen(true)}
          />
        )}
      </main>

      {/* Product Details Modal (Large Image, Multiple Images, Details, Dimensions, Add to Cart) */}
      <ProductDetailsModal
        idol={selectedIdolForModal}
        onClose={() => setSelectedIdolForModal(null)}
        onAddToCart={(idol, qty) => {
          handleAddToCart(idol, qty);
        }}
        onBuyNow={(idol, qty) => handleBuyNow(idol, qty)}
      />

      {/* PHP 8, MySQL & XAMPP Code Modal */}
      <PhpXamppModal
        isOpen={isPhpModalOpen}
        onClose={() => setIsPhpModalOpen(false)}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-stone-700 text-xs font-semibold flex items-center gap-2 animate-slideUp">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        openPhpModal={() => setIsPhpModalOpen(true)}
      />
    </div>
  );
}
