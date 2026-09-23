import React, { useState } from 'react';
import { CustomerOrder, PageView } from '../types';
import { 
  Receipt, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Printer, 
  ArrowRight, 
  Package, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface BillingViewProps {
  orders: CustomerOrder[];
  onOpenBillModal: (order: CustomerOrder) => void;
  setCurrentPage: (page: PageView) => void;
}

export const BillingView: React.FC<BillingViewProps> = ({
  orders,
  onOpenBillModal,
  setCurrentPage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'fully-paid'>('all');

  // Compute overall billing metrics
  const totalBilled = orders.reduce((sum, o) => sum + o.total, 0);
  const totalAdvance = orders.reduce((sum, o) => {
    const adv = o.advancePayment ?? (o.paymentStatus === 'Paid' || o.paymentStatus === 'Fully Paid' ? o.total : 0);
    return sum + adv;
  }, 0);
  const totalPending = orders.reduce((sum, o) => {
    const adv = o.advancePayment ?? (o.paymentStatus === 'Paid' || o.paymentStatus === 'Fully Paid' ? o.total : 0);
    return sum + Math.max(0, o.pendingPayment ?? (o.total - adv));
  }, 0);

  const filteredOrders = orders.filter((order) => {
    const billNo = order.billNumber || `BILL-2026-${order.orderNumber.replace(/[^0-9]/g, '').slice(-4) || '1001'}`;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.toLowerCase().includes(searchTerm.toLowerCase());

    const adv = order.advancePayment ?? (order.paymentStatus === 'Paid' || order.paymentStatus === 'Fully Paid' ? order.total : 0);
    const pend = Math.max(0, order.pendingPayment ?? (order.total - adv));
    const isFullyPaid = pend === 0 || order.paymentStatus === 'Fully Paid' || order.paymentStatus === 'Paid';

    if (filterStatus === 'pending') {
      return matchesSearch && !isFullyPaid;
    }
    if (filterStatus === 'fully-paid') {
      return matchesSearch && isFullyPaid;
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#5D6D31] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Devotee Billing Portal
            </span>
            <span className="text-xs text-stone-400 font-medium">• Instant Tax Invoices</span>
          </div>
          <h1 className="text-3xl font-serif font-black text-amber-950">
            Billing & Invoices Registry
          </h1>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl">
            Track official bills for your eco-friendly Ganpati bookings. Review total amounts, verify advance booking tokens, and pay pending balances seamlessly.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('products')}
          className="self-start md:self-auto px-4 py-2.5 bg-[#5D6D31] hover:bg-[#4A5726] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Book More Idols</span>
        </button>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Billed */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Total Invoiced
            </span>
            <span className="text-2xl font-serif font-black text-stone-900 mt-1 block">
              ₹{totalBilled.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-stone-500 font-medium">
              {orders.length} auspicious orders placed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-lg">
            🧾
          </div>
        </div>

        {/* Advance Received */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between bg-gradient-to-br from-white to-emerald-50/40">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Advance Payments Paid
            </span>
            <span className="text-2xl font-serif font-black text-emerald-900 mt-1 block">
              ₹{totalAdvance.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">
              Token deposits received & confirmed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Pending Receivables */}
        <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-xs flex items-center justify-between bg-gradient-to-br from-white to-amber-50/40">
          <div>
            <span className="text-[11px] font-bold text-[#C16A3D] uppercase tracking-wider block">
              Pending Balance Due
            </span>
            <span className="text-2xl font-serif font-black text-[#C16A3D] mt-1 block">
              ₹{totalPending.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-amber-800 font-medium">
              Settlable via online UPI / Net Banking
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#C16A3D] flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#C16A3D]" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Bill #, Order #, Phone, Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            All Bills ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterStatus === 'pending'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            Has Pending Dues
          </button>
          <button
            onClick={() => setFilterStatus('fully-paid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterStatus === 'fully-paid'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
            }`}
          >
            Fully Paid
          </button>
        </div>
      </div>

      {/* Invoices List / Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="font-serif font-bold text-base text-stone-800">
            No Invoices Match Your Search
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try searching with a different order reference or clear the search query.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => {
            const billNo = order.billNumber || `BILL-2026-${order.orderNumber.replace(/[^0-9]/g, '').slice(-4) || '1001'}`;
            const total = order.total;
            const advance = order.advancePayment ?? (order.paymentStatus === 'Paid' || order.paymentStatus === 'Fully Paid' ? total : 0);
            const pending = Math.max(0, order.pendingPayment ?? (total - advance));
            const isFullyPaid = pending === 0 || order.paymentStatus === 'Fully Paid' || order.paymentStatus === 'Paid';

            return (
              <div 
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Header with Bill # and Status */}
                  <div className="p-4 bg-stone-50/80 border-b border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-amber-950 block">
                        {billNo}
                      </span>
                      <span className="text-[10px] text-stone-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        <span>{order.createdAt}</span>
                      </span>
                    </div>

                    <div>
                      {isFullyPaid ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Fully Paid</span>
                        </span>
                      ) : advance > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[11px] font-bold rounded-full border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Partially Paid</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-orange-100 text-orange-900 text-[11px] font-bold rounded-full border border-orange-300">
                          <Clock className="w-3 h-3 text-orange-600" />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Customer and Order Summary */}
                  <div className="p-4 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Billed Devotee
                      </span>
                      <h4 className="font-serif font-bold text-sm text-stone-900">
                        {order.customerName}
                      </h4>
                      <p className="text-stone-500 text-[11px]">
                        {order.city} • Ref: {order.orderNumber}
                      </p>
                    </div>

                    {/* Items Thumbnails */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-stone-700">
                          <img
                            src={item.idolImage}
                            alt={item.idolName}
                            className="w-7 h-7 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold block truncate">{item.idolName}</span>
                            <span className="text-[10px] text-stone-400">{item.size} • Qty {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Financial Pill Box */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-600">Total Bill:</span>
                        <strong className="font-mono text-stone-900">₹{total.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-emerald-700 font-medium">Advance Paid:</span>
                        <strong className="font-mono text-emerald-800">₹{advance.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="pt-1.5 border-t border-stone-200 flex justify-between items-center text-xs">
                        <span className={pending > 0 ? 'text-[#C16A3D] font-bold' : 'text-stone-400'}>
                          Pending Balance:
                        </span>
                        <strong className={`font-mono text-sm font-black ${
                          pending > 0 ? 'text-[#C16A3D]' : 'text-emerald-700'
                        }`}>
                          ₹{pending.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 pt-0 space-y-2">
                  {pending > 0 && (
                    <button
                      onClick={() => onOpenBillModal(order)}
                      id={`pay-pending-card-btn-${order.id}`}
                      className="w-full py-2.5 bg-[#C16A3D] hover:bg-[#AC5C32] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Pending ₹{pending.toLocaleString('en-IN')}</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenBillModal(order)}
                    id={`view-bill-btn-${order.id}`}
                    className={`w-full py-2 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      pending === 0
                        ? 'bg-[#5D6D31] hover:bg-[#4A5726] text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>View & Print Official Bill</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
