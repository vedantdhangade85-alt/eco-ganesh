import React, { useState } from 'react';
import { Idol, CustomerOrder, CustomerUser, PaymentRecord } from '../types';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  X, 
  TrendingUp, 
  Layers, 
  Ruler,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

interface AdminPanelViewProps {
  idols: Idol[];
  orders: CustomerOrder[];
  customers: CustomerUser[];
  payments: PaymentRecord[];
  onAddIdol: (idol: Idol) => void;
  onUpdateIdol: (idol: Idol) => void;
  onDeleteIdol: (idolId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: CustomerOrder['orderStatus']) => void;
  openPhpModal: () => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  idols,
  orders,
  customers,
  payments,
  onAddIdol,
  onUpdateIdol,
  onDeleteIdol,
  onUpdateOrderStatus,
  openPhpModal,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'idols' | 'orders' | 'customers' | 'payments'>('dashboard');

  // Modal states for Add/Update Idol
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIdol, setEditingIdol] = useState<Idol | null>(null);

  // Form fields for Idol
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Idol['category']>('clay');
  const [size, setSize] = useState('12 Inch');
  const [height, setHeight] = useState('30 cm');
  const [weight, setWeight] = useState('3.5 kg');
  const [price, setPrice] = useState<number>(8000);
  const [material, setMaterial] = useState('100% Pure Shadu Clay');
  const [stock, setStock] = useState<number>(10);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Orders filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculations for dashboard
  const totalSales = orders.reduce((acc, o) => acc + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const totalStockCount = idols.reduce((acc, i) => acc + i.stock, 0);
  const totalCustomersCount = customers.length;

  const openAddModal = () => {
    setEditingIdol(null);
    setName('');
    setCategory('clay');
    setSize('12 Inch');
    setHeight('30 cm');
    setWeight('3.5 kg');
    setPrice(8000);
    setMaterial('100% Pure Shadu Clay');
    setStock(10);
    setDescription('Handcrafted eco-friendly idol sculpted in riverbed clay silt with herbal colors.');
    setImageUrl('/images/ganpati-hero.jpg');
    setIsModalOpen(true);
  };

  const openEditModal = (idol: Idol) => {
    setEditingIdol(idol);
    setName(idol.name);
    setCategory(idol.category);
    setSize(idol.size);
    setHeight(idol.height);
    setWeight(idol.weight);
    setPrice(idol.price);
    setMaterial(idol.material);
    setStock(idol.stock);
    setDescription(idol.description);
    setImageUrl(idol.images[0]);
    setIsModalOpen(true);
  };

  const handleSaveIdol = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabels: Record<string, string> = {
      clay: 'Clay Idols',
      small: 'Small Ganpati',
      premium: 'Premium Ganpati',
      seed: 'Seed Ganpati',
      paper: 'Paper Mache',
    };

    if (editingIdol) {
      const updated: Idol = {
        ...editingIdol,
        name,
        category,
        categoryLabel: categoryLabels[category] || 'Eco Idol',
        size,
        height,
        weight,
        price,
        material,
        stock,
        description,
        images: [imageUrl, ...(editingIdol.images.slice(1))],
      };
      onUpdateIdol(updated);
    } else {
      const newIdol: Idol = {
        id: `idol-${Date.now()}`,
        name,
        category,
        categoryLabel: categoryLabels[category] || 'Eco Idol',
        size,
        height,
        weight,
        price,
        material,
        stock,
        rating: 5.0,
        reviewsCount: 1,
        description,
        images: [imageUrl],
        features: [
          '100% Water Soluble River Mud',
          'Zero Plaster of Paris & chemicals',
          'Dissolves in 45 minutes in home bucket'
        ],
        visarjanTime: '45 mins in water bucket',
        isFeatured: false,
      };
      onAddIdol(newIdol);
    }

    setIsModalOpen(false);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Live Store Backend
            </span>
            <span className="text-stone-400 text-xs font-mono">PHP 8 & MySQL Compatible</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-200 mt-1">
            Eco Ganesh Admin Panel
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Manage idols inventory, fulfill customer orders, verify payments, and oversee customer accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={openPhpModal}
            className="px-3 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-mono font-bold rounded-xl border border-emerald-700 flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>XAMPP PHP & SQL Schema</span>
          </button>
          <button
            id="admin-add-idol-top-btn"
            onClick={openAddModal}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Idol</span>
          </button>
        </div>
      </div>

      {/* Live Order Activity Banner */}
      {orders.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 text-white p-4 rounded-2xl border border-emerald-700/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <div>
              <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span>Live Order Feed</span>
                <span className="text-[10px] bg-emerald-800/80 text-emerald-100 px-2 py-0.5 rounded-full">
                  {orders.length} Total Orders Received
                </span>
              </p>
              <p className="text-xs text-stone-300 mt-0.5">
                Latest: <strong className="text-amber-200 font-mono">{orders[0].orderNumber}</strong> by <strong className="text-white">{orders[0].customerName}</strong> ({orders[0].city}) • <span className="text-emerald-400 font-bold">₹{orders[0].total.toLocaleString('en-IN')}</span> • {orders[0].items.map(it => `${it.idolName} (${it.quantity})`).join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl border border-emerald-500 shrink-0 transition-all shadow-xs"
          >
            Manage Orders ({orders.length}) &rarr;
          </button>
        </div>
      )}

      {/* 1. DASHBOARD METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Sales</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif">
            ₹{totalSales.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            Across {orders.length} puja orders
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif">
            {totalOrdersCount}
          </p>
          <span className="text-[11px] text-stone-500 block">
            {orders.filter(o => o.orderStatus === 'Pending').length} pending dispatch
          </span>
        </div>

        {/* Idols in Stock */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Idols in Stock</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif">
            {totalStockCount} Units
          </p>
          <span className="text-[11px] text-stone-500 block">
            {idols.length} active idol models
          </span>
        </div>

        {/* Active Customers */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Devotees</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif">
            {totalCustomersCount}
          </p>
          <span className="text-[11px] text-stone-500 block">
            Registered accounts
          </span>
        </div>
      </div>

      {/* Navigation Tabs for Admin Sections */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 text-xs font-bold">
        <button
          id="admin-tab-dashboard"
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'dashboard'
              ? 'bg-amber-100 text-amber-950 font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          id="admin-tab-idols"
          onClick={() => setActiveTab('idols')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'idols'
              ? 'bg-amber-100 text-amber-950 font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Manage Idols ({idols.length})</span>
        </button>

        <button
          id="admin-tab-orders"
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'orders'
              ? 'bg-amber-100 text-amber-950 font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Manage Orders ({orders.length})</span>
        </button>

        <button
          id="admin-tab-customers"
          onClick={() => setActiveTab('customers')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'customers'
              ? 'bg-amber-100 text-amber-950 font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Manage Customers ({customers.length})</span>
        </button>

        <button
          id="admin-tab-payments"
          onClick={() => setActiveTab('payments')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
            activeTab === 'payments'
              ? 'bg-amber-100 text-amber-950 font-bold'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>View Payments ({payments.length})</span>
        </button>
      </div>

      {/* 2. TAB CONTENT: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders List */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-amber-950 text-base">
                Recent Customer Orders
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold text-orange-700 hover:underline"
              >
                View all orders
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {orders.slice(0, 5).map((order, idx) => (
                <div 
                  key={order.id} 
                  className={`py-3.5 flex items-center justify-between text-xs px-2 rounded-xl transition-colors ${
                    idx === 0 ? 'bg-amber-50/80 border border-amber-200' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-950">{order.orderNumber}</span>
                      {idx === 0 && (
                        <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-extrabold rounded uppercase tracking-wider animate-pulse">
                          Latest
                        </span>
                      )}
                    </div>
                    <span className="text-stone-500 block text-[11px] mt-0.5">
                      {order.customerName} • {order.city} • {order.items.map(it => `${it.idolName} x${it.quantity}`).join(', ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-stone-900 block">₹{order.total.toLocaleString('en-IN')}</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      order.orderStatus === 'Dispatched' ? 'bg-blue-100 text-blue-800' :
                      order.orderStatus === 'Confirmed' ? 'bg-amber-100 text-amber-800' :
                      'bg-stone-100 text-stone-700'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Inventory Alert */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-amber-950 text-base">
                Low Stock Alerts
              </h3>
              <div className="space-y-3">
                {idols.filter(i => i.stock < 10).map(idol => (
                  <div key={idol.id} className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-amber-950 block">{idol.name}</span>
                      <span className="text-stone-500 text-[11px]">{idol.size}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold rounded text-[11px]">
                      {idol.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200 space-y-3">
              <h4 className="font-bold text-sm text-orange-950">Sculptor Workshop Actions</h4>
              <p className="text-xs text-stone-600">
                Quickly add newly completed unbaked idols or update sizes for the upcoming Ganesh festival.
              </p>
              <button
                onClick={openAddModal}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Idol to Catalog</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT: MANAGE IDOLS (Add, Update, Delete) */}
      {activeTab === 'idols' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="font-serif font-bold text-base text-amber-950">
              Idol Catalog Management ({idols.length} Products)
            </h3>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Idol</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <th className="p-3.5">Idol</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Size / Dimensions</th>
                    <th className="p-3.5">Material</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {idols.map((idol) => (
                    <tr key={idol.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={idol.images[0]}
                          alt={idol.name}
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-stone-900 block">{idol.name}</span>
                          <span className="text-[10px] text-stone-400">ID: {idol.id}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {idol.categoryLabel}
                        </span>
                      </td>
                      <td className="p-3.5 text-stone-700">
                        {idol.size} ({idol.height}, {idol.weight})
                      </td>
                      <td className="p-3.5 text-stone-600 max-w-[160px] truncate">
                        {idol.material}
                      </td>
                      <td className="p-3.5 font-bold text-orange-700">
                        ₹{idol.price.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          idol.stock > 10 
                            ? 'bg-emerald-50 text-emerald-800' 
                            : 'bg-red-50 text-red-800'
                        }`}>
                          {idol.stock} units
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            id={`edit-idol-${idol.id}`}
                            onClick={() => openEditModal(idol)}
                            className="p-1.5 text-stone-600 hover:text-orange-700 hover:bg-stone-100 rounded-lg"
                            title="Update Idol"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            id={`delete-idol-${idol.id}`}
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${idol.name}?`)) {
                                onDeleteIdol(idol.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Idol"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: MANAGE ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-600">Filter Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-700"
              >
                <option value="all">All Orders ({orders.length})</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <th className="p-3.5">Order #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Delivery Address</th>
                    <th className="p-3.5">Idols</th>
                    <th className="p-3.5">Total & Payment</th>
                    <th className="p-3.5">Status Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredOrders.map((order, idx) => (
                    <tr 
                      key={order.id} 
                      className={`transition-colors ${
                        idx === 0 
                          ? 'bg-amber-50/70 hover:bg-amber-100/70 border-l-4 border-l-orange-600' 
                          : 'hover:bg-stone-50/80'
                      }`}
                    >
                      <td className="p-3.5 font-mono font-bold text-amber-950">
                        <div className="flex items-center gap-2">
                          <span>{order.orderNumber}</span>
                          {idx === 0 && (
                            <span className="px-2 py-0.5 bg-orange-600 text-white text-[9px] font-extrabold rounded-full uppercase tracking-wider animate-pulse">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-stone-500 whitespace-nowrap">
                        {order.createdAt}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-stone-900 block">{order.customerName}</span>
                        <span className="text-[10px] text-stone-500">{order.customerPhone}</span>
                      </td>
                      <td className="p-3.5 text-stone-700 max-w-[200px]">
                        <p className="truncate">{order.address}</p>
                        <p className="text-[10px] text-stone-400">{order.city} - {order.pincode}</p>
                      </td>
                      <td className="p-3.5">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="text-[11px] text-stone-700">
                            {it.idolName} ({it.size}) x {it.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-stone-900 block">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium">
                          {order.paymentMethod} • {order.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                          className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-stone-800"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: MANAGE CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-amber-950">
              Registered Devotee Customers ({customers.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">City</th>
                  <th className="p-3.5">Joined Date</th>
                  <th className="p-3.5">Orders</th>
                  <th className="p-3.5 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-stone-900">{cust.name}</td>
                    <td className="p-3.5 text-stone-600">{cust.email}</td>
                    <td className="p-3.5 text-stone-600">{cust.phone}</td>
                    <td className="p-3.5 text-stone-600">{cust.city}</td>
                    <td className="p-3.5 text-stone-400">{cust.joinedDate}</td>
                    <td className="p-3.5 font-semibold text-stone-800">{cust.ordersCount} orders</td>
                    <td className="p-3.5 text-right font-bold text-orange-700">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB CONTENT: VIEW PAYMENTS */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-amber-950">
              Payments & Transactions Registry ({payments.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                  <th className="p-3.5">Transaction ID</th>
                  <th className="p-3.5">Order Number</th>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Payment Method</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {payments.map((p, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3.5 font-mono text-stone-800 font-bold">{p.transactionId}</td>
                    <td className="p-3.5 font-mono text-amber-900">{p.orderNumber}</td>
                    <td className="p-3.5 text-stone-900 font-semibold">{p.customerName}</td>
                    <td className="p-3.5 text-stone-600">{p.paymentMethod}</td>
                    <td className="p-3.5 font-black text-orange-700">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right text-stone-400">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / UPDATE IDOL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg">
                  {editingIdol ? 'Update Idol Details' : 'Add New Eco Ganpati Idol'}
                </h3>
                <p className="text-xs text-amber-100">
                  {editingIdol ? `Editing ${editingIdol.name}` : 'Enter specifications for new hand-sculpted idol'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveIdol} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Idol Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bal Ganesh, Royal Ganpati"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="clay">Clay Idols (Shadu Mati)</option>
                    <option value="small">Small Ganpati</option>
                    <option value="premium">Premium Ganpati</option>
                    <option value="seed">Seed Ganpati (Plantable)</option>
                    <option value="paper">Paper Mache</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Size (Inch) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12 Inch"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Height *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 30 cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Weight *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3.5 kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Material Composition *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% Pure Shadu Mati & Turmeric Gold"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="/images/ganpati-hero.jpg or image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow-xs"
                >
                  {editingIdol ? 'Save Changes' : 'Add Idol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
