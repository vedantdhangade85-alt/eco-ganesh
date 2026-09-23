import React, { useState } from 'react';
import { CustomerOrder } from '../types';
import { 
  CheckCircle2, 
  Printer, 
  CreditCard, 
  Smartphone, 
  Building, 
  ShieldCheck, 
  X, 
  Receipt, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Clock, 
  Sparkles,
  ArrowRight,
  Leaf,
  Info
} from 'lucide-react';

interface BillInvoiceModalProps {
  order: CustomerOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onPayPending: (orderId: string, paymentMethod: string) => void;
}

export const BillInvoiceModal: React.FC<BillInvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
  onPayPending,
}) => {
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Net Banking' | 'Credit/Debit Card'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [justSettled, setJustSettled] = useState(false);

  if (!isOpen || !order) return null;

  const billNo = order.billNumber || `BILL-2026-${order.orderNumber.replace(/[^0-9]/g, '').slice(-4) || '1001'}`;
  const total = order.total;
  const advance = order.advancePayment ?? (order.paymentStatus === 'Paid' || order.paymentStatus === 'Fully Paid' ? total : 0);
  const pending = Math.max(0, order.pendingPayment ?? (total - advance));
  const isFullyPaid = pending === 0 || order.paymentStatus === 'Fully Paid' || order.paymentStatus === 'Paid';

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onPayPending(order.id, selectedMethod);
      setIsProcessing(false);
      setIsPaying(false);
      setJustSettled(true);
      setTimeout(() => setJustSettled(false), 4000);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl bg-[#FCFAF7] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-4 sm:my-8 text-stone-800 print:shadow-none print:border-none print:m-0 print:max-w-none print:rounded-none">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-[#2D3518] text-[#E9EDC9] px-6 py-3.5 flex items-center justify-between border-b border-[#3D4722] print:hidden">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#C16A3D]" />
            <span className="font-serif font-bold text-sm tracking-wide text-white">
              Official Tax Invoice & Auspicious Bill
            </span>
            <span className="text-[11px] bg-[#C16A3D] text-white px-2 py-0.5 rounded font-mono font-bold">
              {billNo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="print-invoice-btn"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              id="close-invoice-modal-btn"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Celebration Banner when payment just settled */}
        {justSettled && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-center text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn print:hidden">
            <Sparkles className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Pending payment received successfully! Your order is now Fully Paid. Ganpati Bappa Morya!</span>
          </div>
        )}

        {/* PRINTABLE BILL CONTAINER */}
        <div id="printable-bill" className="p-6 sm:p-10 space-y-8 print:p-6">
          
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5D6D31] text-white flex items-center justify-center shadow-md text-2xl font-serif">
                🕉️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-serif font-black text-amber-950 tracking-tight">
                    Eco Ganesh
                  </h2>
                  <span className="bg-[#5D6D31] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Leaf className="w-2.5 h-2.5" /> 100% Bio
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  Handcrafted Shadu Mati & Tree Seed Idols Guild
                </p>
                <p className="text-[11px] text-stone-400">
                  Artisan Studio, Pen, Raigad, Maharashtra 402107 • GSTIN: 27AABCE9821F1Z2
                </p>
              </div>
            </div>

            {/* Bill Meta Badge */}
            <div className="text-left sm:text-right space-y-1 bg-amber-50/60 p-3 sm:p-0 rounded-xl sm:bg-transparent border border-amber-200/60 sm:border-none w-full sm:w-auto">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#C16A3D]">
                Devotee Tax Invoice
              </span>
              <div className="font-mono font-black text-lg text-amber-950">
                {billNo}
              </div>
              <div className="text-xs text-stone-500 flex sm:justify-end items-center gap-1">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>Date: {order.createdAt}</span>
              </div>
              <div className="text-xs text-stone-500 flex sm:justify-end items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Order Ref: <strong className="font-mono text-stone-800">{order.orderNumber}</strong></span>
              </div>
            </div>
          </div>

          {/* Customer & Billing Address Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                <User className="w-3 h-3 text-[#5D6D31]" /> Billed To (Devotee Customer)
              </span>
              <p className="font-serif font-black text-sm text-stone-900">{order.customerName}</p>
              <p className="text-stone-600 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                <span>{order.customerPhone}</span>
              </p>
              {order.customerEmail && (
                <p className="text-stone-500">{order.customerEmail}</p>
              )}
            </div>

            <div className="space-y-1.5 text-xs sm:border-l sm:border-stone-100 sm:pl-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C16A3D]" /> Sacred Delivery Address
              </span>
              <p className="font-medium text-stone-800 leading-relaxed">
                {order.address}
              </p>
              <p className="font-bold text-stone-700">
                {order.city} - {order.pincode}, Maharashtra
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Shockproof Wooden Crate Shipping
              </p>
            </div>
          </div>

          {/* Ordered Items Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-3.5 bg-stone-100 border-b border-stone-200 flex justify-between items-center text-xs font-bold text-stone-700">
              <span>Sacred Murti Description</span>
              <span>Amount (INR)</span>
            </div>

            <div className="divide-y divide-stone-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.idolImage}
                      alt={item.idolName}
                      className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-amber-950">
                        {item.idolName}
                      </h4>
                      <p className="text-stone-500 text-[11px]">
                        Size: <strong className="text-stone-700">{item.size}</strong> • 100% Shadu Clay • Qty: <strong className="text-stone-800">{item.quantity}</strong>
                      </p>
                      <p className="text-[10px] text-stone-400">
                        Rate: ₹{item.price.toLocaleString('en-IN')} per idol
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono font-bold text-stone-900 text-sm">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown & Totals with Payment Status & Stamp */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Payment Status Badge & Digital Stamp */}
            <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block mb-1">
                  Current Billing Status
                </span>

                <div className="flex items-center gap-2">
                  {isFullyPaid ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Fully Paid</span>
                    </span>
                  ) : pending > 0 && advance > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-full border border-amber-300">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Partially Paid (Advance Received)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-900 font-extrabold text-xs rounded-full border border-orange-300">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>Payment Pending</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Digital Seal / Stamp */}
              <div className="relative py-2 flex items-center justify-center">
                {isFullyPaid ? (
                  <div className="border-4 border-emerald-600/80 rounded-xl px-5 py-2 -rotate-3 text-center shadow-xs bg-emerald-50/50">
                    <span className="block font-serif font-black text-emerald-800 text-sm tracking-widest uppercase">
                      PAID IN FULL
                    </span>
                    <span className="block text-[9px] font-mono text-emerald-700 font-bold uppercase tracking-wider">
                      Verified • Eco Ganesh
                    </span>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-amber-500/80 rounded-xl px-4 py-2 text-center bg-amber-50/50 w-full">
                    <span className="block font-serif font-bold text-amber-900 text-xs uppercase tracking-wider">
                      Advance Received
                    </span>
                    <span className="block text-[10px] text-amber-700 font-semibold">
                      Pending balance of ₹{pending.toLocaleString('en-IN')} due before dispatch
                    </span>
                  </div>
                )}
              </div>

              {/* Payment History Log */}
              <div className="pt-2 border-t border-stone-100 space-y-1 text-[11px]">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Payment History:
                </span>
                {order.paymentHistory && order.paymentHistory.length > 0 ? (
                  order.paymentHistory.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-stone-600 py-0.5">
                      <span className="truncate pr-2">
                        {item.note || item.paymentMethod} ({item.date.split(' ')[0]})
                      </span>
                      <strong className="font-mono text-stone-800 shrink-0">
                        +₹{item.amount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  ))
                ) : advance > 0 ? (
                  <div className="flex items-center justify-between text-stone-600 py-0.5">
                    <span>Advance Payment ({order.paymentMethod})</span>
                    <strong className="font-mono text-stone-800">
                      +₹{advance.toLocaleString('en-IN')}
                    </strong>
                  </div>
                ) : (
                  <p className="text-stone-400 italic">No payments recorded yet.</p>
                )}
              </div>
            </div>

            {/* Right: Bill Calculation Breakdown */}
            <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal</span>
                <span className="font-mono font-semibold">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-emerald-700 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Protective Wooden Crate & Eco-Straw</span>
                </span>
                <span className="font-bold">FREE</span>
              </div>

              {/* TOTAL AMOUNT */}
              <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-sm font-black text-amber-950">
                <span>Total Bill Amount:</span>
                <span className="font-mono text-base text-stone-900">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              {/* ADVANCE PAYMENT */}
              <div className="flex justify-between items-center py-2 px-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 text-emerald-900">
                <div>
                  <span className="font-bold block">Advance Payment Received:</span>
                  <span className="text-[10px] text-emerald-700">
                    Mode: {order.paymentMethod}
                  </span>
                </div>
                <span className="font-mono font-bold text-sm text-emerald-800">
                  ₹{advance.toLocaleString('en-IN')}
                </span>
              </div>

              {/* PENDING PAYMENT */}
              <div className={`flex justify-between items-center py-2 px-3 rounded-xl border ${
                pending > 0 
                  ? 'bg-amber-50 border-amber-300 text-amber-950' 
                  : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}>
                <div>
                  <span className="font-bold block">
                    {pending > 0 ? 'Pending Payment Balance:' : 'Pending Balance:'}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    {pending > 0 ? 'Due prior to idol visarjan/delivery' : 'All dues fully settled'}
                  </span>
                </div>
                <span className={`font-mono font-black text-base ${
                  pending > 0 ? 'text-[#C16A3D]' : 'text-emerald-700'
                }`}>
                  ₹{pending.toLocaleString('en-IN')}
                </span>
              </div>

              {/* PAY PENDING AMOUNT BUTTON (When pending > 0) */}
              {pending > 0 && !isPaying && (
                <div className="pt-2 print:hidden">
                  <button
                    onClick={() => setIsPaying(true)}
                    id="trigger-pay-pending-btn"
                    className="w-full py-3 bg-gradient-to-r from-[#C16A3D] to-amber-600 hover:brightness-105 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Pending Amount (₹{pending.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-stone-500 text-center mt-1.5">
                    Pay securely via UPI (GPay/PhonePe), Card, or Net Banking to mark bill Fully Paid.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Drawer for settling Pending Amount */}
          {isPaying && pending > 0 && (
            <div className="bg-amber-50/90 border-2 border-amber-400 p-5 rounded-2xl space-y-4 animate-fadeIn print:hidden">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-amber-950 text-sm">
                      Settle Pending Balance: ₹{pending.toLocaleString('en-IN')}
                    </h4>
                    <p className="text-[11px] text-amber-800">
                      Clear remaining balance for Order {order.orderNumber}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPaying(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* UPI */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('UPI')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedMethod === 'UPI'
                      ? 'border-orange-600 bg-white shadow-xs ring-2 ring-orange-200'
                      : 'border-amber-200 bg-amber-100/50 hover:bg-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">UPI / QR</span>
                    <span className="text-[10px] text-stone-500">GPay, PhonePe, Paytm</span>
                  </div>
                </button>

                {/* Net Banking */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('Net Banking')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedMethod === 'Net Banking'
                      ? 'border-orange-600 bg-white shadow-xs ring-2 ring-orange-200'
                      : 'border-amber-200 bg-amber-100/50 hover:bg-white'
                  }`}
                >
                  <Building className="w-4 h-4 text-blue-700" />
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">Net Banking</span>
                    <span className="text-[10px] text-stone-500">HDFC, ICICI, SBI</span>
                  </div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('Credit/Debit Card')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedMethod === 'Credit/Debit Card'
                      ? 'border-orange-600 bg-white shadow-xs ring-2 ring-orange-200'
                      : 'border-amber-200 bg-amber-100/50 hover:bg-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-700" />
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">Card</span>
                    <span className="text-[10px] text-stone-500">Visa, RuPay, Master</span>
                  </div>
                </button>
              </div>

              {selectedMethod === 'UPI' && (
                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                  <span className="text-[11px] font-bold text-stone-700 block">
                    Enter UPI ID or Mobile (Simulated Instant Approval)
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. yourname@okhdfcbank or 9820012345@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPaying(false)}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  id="confirm-pay-pending-btn"
                  onClick={handleProcessPayment}
                  className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Pay ₹{pending.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Footer Terms & Guidelines */}
          <div className="pt-4 border-t border-stone-200 text-[10px] text-stone-400 space-y-1">
            <p className="flex items-center gap-1 font-semibold text-stone-500">
              <Info className="w-3 h-3" /> Terms & Conditions:
            </p>
            <p>
              1. 100% natural clay & organic colors ensure safe home visarjan in a bucket or pot.
            </p>
            <p>
              2. Advance payments are officially credited to order {order.orderNumber}. All pending dues must be settled prior to delivery dispatch.
            </p>
            <p>
              3. For any invoice queries or mandal tax receipts, contact care@ecoganesh.in or WhatsApp +91 98200 54321.
            </p>
          </div>
        </div>

        {/* Bottom Modal Actions (Hidden on print) */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-stone-500">
            Invoice automatically saved in Eco Ganesh devotee database.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Bill</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
