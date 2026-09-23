import React, { useState } from 'react';
import { CartItem, CustomerOrder, PageView } from '../types';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Package, 
  Truck, 
  Sparkles,
  ChevronLeft,
  Receipt,
  Clock,
  Printer
} from 'lucide-react';

interface CheckoutViewProps {
  cart: CartItem[];
  onPlaceOrder: (order: CustomerOrder) => void;
  setCurrentPage: (page: PageView) => void;
  onOpenBillModal?: (order: CustomerOrder) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  onPlaceOrder,
  setCurrentPage,
  onOpenBillModal,
}) => {
  // Customer inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Payment plan: Full payment (100%), Advance booking deposit (30%), or Pay on delivery (0%)
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'advance' | 'cod'>('advance');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cash on Delivery' | 'Net Banking' | 'Credit/Debit Card'>('UPI');
  const [upiId, setUpiId] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.idol.price * item.quantity, 0);
  const total = subtotal;

  // Calculate advance vs pending
  let advance = total;
  let pending = 0;
  if (paymentPlan === 'advance') {
    advance = Math.round(total * 0.30); // 30% advance deposit
    pending = total - advance;
  } else if (paymentPlan === 'cod') {
    advance = 0;
    pending = total;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      alert('Please fill out all delivery address fields.');
      return;
    }

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `EG-2026-${randomNum}`;
    const billNumber = `BILL-2026-${randomNum}`;
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    let status: CustomerOrder['paymentStatus'] = 'Fully Paid';
    if (paymentPlan === 'advance') {
      status = 'Partially Paid';
    } else if (paymentPlan === 'cod') {
      status = 'Pending';
    }

    const effectiveMethod = paymentPlan === 'cod' ? 'Cash on Delivery' : paymentMethod;

    const newOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      billNumber,
      createdAt: timestamp,
      customerName: name,
      customerPhone: phone,
      address,
      city,
      pincode,
      paymentMethod: effectiveMethod,
      paymentStatus: status,
      orderStatus: 'Confirmed',
      items: cart.map(item => ({
        idolId: item.idol.id,
        idolName: item.idol.name,
        idolImage: item.idol.images[0],
        size: item.idol.size,
        price: item.idol.price,
        quantity: item.quantity
      })),
      subtotal,
      shipping: 0,
      total,
      advancePayment: advance,
      pendingPayment: pending,
      paymentHistory: advance > 0 ? [
        {
          id: `pay-${Date.now()}`,
          amount: advance,
          date: timestamp,
          paymentMethod: effectiveMethod,
          note: paymentPlan === 'full' ? 'Full Order Payment' : 'Advance Murti Booking Deposit (30%)',
          transactionId: `TXN-${Date.now().toString().slice(-6)}`
        }
      ] : []
    };

    setTimeout(() => {
      onPlaceOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsSubmitting(false);
    }, 800);
  };

  // If order completed successfully, show celebratory receipt with billing summary & actions
  if (completedOrder) {
    const orderBillNo = completedOrder.billNumber || `BILL-2026-${completedOrder.orderNumber.replace(/[^0-9]/g, '').slice(-4)}`;
    const isFullyPaid = completedOrder.pendingPayment === 0 || completedOrder.paymentStatus === 'Fully Paid' || completedOrder.paymentStatus === 'Paid';

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10 text-emerald-700" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
            Ganpati Bappa Morya!
          </span>
          <h1 className="text-3xl font-serif font-black text-amber-950">
            Order & Bill Generated Successfully
          </h1>
          <p className="text-sm text-stone-600">
            Thank you, <strong className="text-stone-900">{completedOrder.customerName}</strong>! Your auspicious booking is confirmed and official tax invoice is generated.
          </p>
        </div>

        {/* Order & Bill Receipt Details Card */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-left space-y-4 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-stone-400 block text-[11px]">Invoice / Bill Number</span>
              <span className="font-mono font-bold text-amber-950 text-base">{orderBillNo}</span>
              <span className="text-[10px] text-stone-500 font-mono">Ref: {completedOrder.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-400 block text-[11px]">Payment Status</span>
              {isFullyPaid ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fully Paid
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-900 font-bold rounded-full text-xs">
                  <Clock className="w-3.5 h-3.5" /> Partially Paid
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="text-stone-400 block text-[11px] mb-1">Delivering To</span>
            <p className="font-medium text-stone-800">
              {completedOrder.address}, {completedOrder.city} - {completedOrder.pincode}
            </p>
            <p className="text-stone-500 text-xs">Phone: {completedOrder.customerPhone}</p>
          </div>

          <div className="pt-3 border-t border-stone-100 space-y-2">
            <span className="text-stone-400 block text-[11px]">Items Ordered:</span>
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-stone-700">{item.idolName} ({item.size}) x {item.quantity}</span>
                <span className="font-bold text-stone-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          {/* Billing Financial Box */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-600">Total Order Amount:</span>
              <span className="font-mono font-bold text-stone-900">₹{completedOrder.total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-700 font-medium">Advance Payment Received:</span>
              <span className="font-mono font-bold text-emerald-800">₹{completedOrder.advancePayment.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
              <span className={completedOrder.pendingPayment > 0 ? 'text-[#C16A3D] font-bold' : 'text-stone-500'}>
                Pending Payment Due:
              </span>
              <span className={`font-mono font-black text-base ${
                completedOrder.pendingPayment > 0 ? 'text-[#C16A3D]' : 'text-emerald-700'
              }`}>
                ₹{completedOrder.pendingPayment.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: View Bill, Pay Pending, Return */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {onOpenBillModal && (
              <button
                id="checkout-view-bill-btn"
                onClick={() => onOpenBillModal(completedOrder)}
                className="w-full sm:w-auto px-6 py-3 bg-[#C16A3D] hover:bg-[#AC5C32] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                <span>🧾 View Official Bill & Invoice</span>
              </button>
            )}

            {completedOrder.pendingPayment > 0 && onOpenBillModal && (
              <button
                id="checkout-pay-pending-now-btn"
                onClick={() => onOpenBillModal(completedOrder)}
                className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>💳 Pay Pending ₹{completedOrder.pendingPayment.toLocaleString('en-IN')}</span>
              </button>
            )}

            <button
              id="checkout-my-bills-btn"
              onClick={() => setCurrentPage('billing')}
              className="w-full sm:w-auto px-6 py-3 bg-[#5D6D31] hover:bg-[#4A5726] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View All Bills</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="checkout-order-more-btn"
              onClick={() => setCurrentPage('products')}
              className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Order More Idols
            </button>
            <button
              id="checkout-view-admin-btn"
              onClick={() => setCurrentPage('admin')}
              className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>🔐 View in Admin Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-sm text-stone-600 mb-4">No items in your cart to checkout.</p>
        <button
          onClick={() => setCurrentPage('products')}
          className="px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-950">
            Checkout & Sacred Delivery
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Fill in your delivery details for shockproof wooden crate shipping.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('cart')}
          className="text-xs font-bold text-orange-700 hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Customer Input Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Details Box */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-amber-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 text-xs flex items-center justify-center font-bold">1</span>
              <span>Customer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98200 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address Box */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-amber-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 text-xs flex items-center justify-center font-bold">2</span>
              <span>Delivery Address</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Street Address / Flat / Building Name <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Flat 302, Gokul Dham, Linking Road"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Pune, Thane"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 400001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Payment Options & Plan Box */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <h3 className="text-base font-serif font-bold text-amber-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 text-xs flex items-center justify-center font-bold">3</span>
              <span>Payment Plan & Method</span>
            </h3>

            {/* Plan Selector: Full vs Advance Deposit vs COD */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                Choose Payment Structure:
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Advance Booking Deposit */}
                <div
                  onClick={() => setPaymentPlan('advance')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentPlan === 'advance'
                      ? 'border-[#C16A3D] bg-orange-50/70 ring-2 ring-orange-200 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-950">Advance Deposit</span>
                    <span className="text-[10px] font-extrabold bg-orange-100 text-[#C16A3D] px-1.5 py-0.2 rounded">
                      Popular
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-stone-900">
                    Pay 30% Now (₹{Math.round(total * 0.30).toLocaleString('en-IN')})
                  </p>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Reserve your Murti now. Pay remaining ₹{(total - Math.round(total * 0.30)).toLocaleString('en-IN')} prior to delivery.
                  </p>
                </div>

                {/* Full Payment */}
                <div
                  onClick={() => setPaymentPlan('full')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentPlan === 'full'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-200 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-900">Full Payment</span>
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      100% Paid
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-stone-900">
                    Pay 100% (₹{total.toLocaleString('en-IN')})
                  </p>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Zero pending dues. Bill stamped Fully Paid instantly upon checkout.
                  </p>
                </div>

                {/* Pay on Delivery */}
                <div
                  onClick={() => {
                    setPaymentPlan('cod');
                    setPaymentMethod('Cash on Delivery');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentPlan === 'cod'
                      ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-200 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-900">Pay on Delivery</span>
                    <span className="text-[10px] font-extrabold bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded">
                      COD
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-stone-900">
                    ₹0 Now (₹{total.toLocaleString('en-IN')} Due)
                  </p>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Pay entire balance via Cash or UPI when your crate is delivered.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Channel (UPI, Net Banking, Card, COD) */}
            {paymentPlan !== 'cod' ? (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-stone-700">
                  Select Payment Method to Pay ₹{advance.toLocaleString('en-IN')}:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* UPI */}
                  <label className={`cursor-pointer p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-200'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="h-4 w-4 text-orange-600"
                    />
                    <Smartphone className="w-5 h-5 text-emerald-700" />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">UPI / QR</span>
                      <span className="text-[10px] text-stone-500">GPay, PhonePe, Paytm</span>
                    </div>
                  </label>

                  {/* Net Banking */}
                  <label className={`cursor-pointer p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    paymentMethod === 'Net Banking'
                      ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-200'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Net Banking"
                      checked={paymentMethod === 'Net Banking'}
                      onChange={() => setPaymentMethod('Net Banking')}
                      className="h-4 w-4 text-orange-600"
                    />
                    <Building className="w-5 h-5 text-blue-700" />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">Net Banking</span>
                      <span className="text-[10px] text-stone-500">HDFC, SBI, ICICI</span>
                    </div>
                  </label>

                  {/* Card */}
                  <label className={`cursor-pointer p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                    paymentMethod === 'Credit/Debit Card'
                      ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-200'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit/Debit Card"
                      checked={paymentMethod === 'Credit/Debit Card'}
                      onChange={() => setPaymentMethod('Credit/Debit Card')}
                      className="h-4 w-4 text-orange-600"
                    />
                    <CreditCard className="w-5 h-5 text-purple-700" />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block">Card</span>
                      <span className="text-[10px] text-stone-500">Visa, Mastercard, RuPay</span>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                    <span className="text-emerald-900 font-bold block">UPI ID or Phone Number</span>
                    <input
                      type="text"
                      placeholder="e.g. yourname@oksbi / 9820012345@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-xs"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-700" />
                  <span>Pay ₹{total.toLocaleString('en-IN')} on Delivery</span>
                </p>
                <p className="text-[11px] text-amber-800">
                  You can pay via Cash or UPI scan to the delivery artisan upon delivery of your wooden crate.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Review & Billing Breakdown */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5 sticky top-28">
            <h3 className="text-lg font-serif font-bold text-amber-950 pb-3 border-b border-stone-100">
              Order & Bill Review ({cart.length} idols)
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(({ idol, quantity }) => (
                <div key={idol.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={idol.images[0]}
                    alt={idol.name}
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-800 truncate">{idol.name}</p>
                    <p className="text-stone-400 text-[10px]">
                      {idol.size} • Qty: {quantity}
                    </p>
                  </div>
                  <span className="font-bold text-stone-900">
                    ₹{(idol.price * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Summary Calculations */}
            <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Wooden Crate & Delivery</span>
                <span className="font-bold">FREE</span>
              </div>
              
              <div className="pt-2 border-t border-stone-100 flex justify-between text-sm font-black text-amber-950">
                <span>Total Order Amount:</span>
                <span className="text-stone-900">₹{total.toLocaleString('en-IN')}</span>
              </div>

              {/* Advance vs Pending Pill */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Payable Now (Advance):</span>
                  <span>₹{advance.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#C16A3D] font-bold">
                  <span>Pending Balance (Pay Later):</span>
                  <span>₹{pending.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              id="place-auspicious-order-btn"
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-105 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <span>Confirming Order & Generating Bill...</span>
              ) : (
                <>
                  <span>
                    {paymentPlan === 'advance' 
                      ? `Pay Advance ₹${advance.toLocaleString('en-IN')} & Book`
                      : paymentPlan === 'full'
                      ? `Pay ₹${total.toLocaleString('en-IN')} & Confirm`
                      : `Place Order (Pay on Delivery)`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500 space-y-1">
              <p className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tax Invoice & Receipt Generated</span>
              </p>
              <p>An official GST/Artisan bill with order number will be generated immediately for your records.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
