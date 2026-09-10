import React, { useState } from 'react';
import { CartItem, PageView } from '../types';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  Layers, 
  PackageCheck,
  ChevronLeft
} from 'lucide-react';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (idolId: string, delta: number) => void;
  onRemoveItem: (idolId: string) => void;
  onClearCart: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setCurrentPage,
}) => {
  const [includePujaKit, setIncludePujaKit] = useState(true);

  const subtotal = cart.reduce((acc, item) => acc + item.idol.price * item.quantity, 0);
  const packagingFee = 0; // Free Wooden Crate
  const pujaKitPrice = includePujaKit ? 250 : 0;
  const totalPrice = subtotal + pujaKitPrice;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10 text-orange-700" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-950">
          Your Sacred Cart is Empty
        </h2>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Explore our handcrafted 100% Shadu Mati clay idols and plantable seed Ganpatis to bring Bappa home.
        </p>
        <button
          onClick={() => setCurrentPage('products')}
          className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-md hover:brightness-105 transition-all"
        >
          <span>Explore Eco Idols</span>
          <ArrowRight className="w-4 h-4" />
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
            Shopping Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Free protective wooden crate and door delivery across India
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('products')}
          className="text-xs font-bold text-orange-700 hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
            {cart.map(({ idol, quantity }) => (
              <div key={idol.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={idol.images[0]}
                    alt={idol.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {idol.categoryLabel}
                    </span>
                    <h3 className="text-base font-serif font-bold text-amber-950">
                      {idol.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5 text-stone-400" /> {idol.size}
                      </span>
                      <span>•</span>
                      <span>{idol.weight}</span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      Material: {idol.material}
                    </p>
                  </div>
                </div>

                {/* Right controls: Qty, Unit Price, Total & Delete */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 gap-4">
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-orange-700">
                      ₹{(idol.price * quantity).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      ₹{idol.price.toLocaleString('en-IN')} each
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                      <button
                        id={`cart-decrease-${idol.id}`}
                        onClick={() => onUpdateQuantity(idol.id, -1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-stone-900 min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        id={`cart-increase-${idol.id}`}
                        onClick={() => onUpdateQuantity(idol.id, 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove product */}
                    <button
                      id={`cart-remove-${idol.id}`}
                      onClick={() => onRemoveItem(idol.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Eco Puja Kit Addon Checkbox */}
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
            <input
              type="checkbox"
              id="puja-kit-check"
              checked={includePujaKit}
              onChange={(e) => setIncludePujaKit(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-amber-400 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="puja-kit-check" className="text-xs cursor-pointer flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950">Add Eco Puja Samagri Kit (+₹250)</span>
                <span className="text-emerald-700 font-semibold text-[11px]">Certified Organic</span>
              </div>
              <p className="text-stone-600 text-[11px] mt-0.5">
                Includes cow dung dhoop cups, organic haldi-kumkum, sacred Janeu thread, cotton wicks, and auspicious marigold garland.
              </p>
            </label>
          </div>
        </div>

        {/* Right: Order Summary & Checkout Trigger */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5 sticky top-28">
            <h3 className="text-lg font-serif font-bold text-amber-950 pb-3 border-b border-stone-100">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cart.length} idols)</span>
                <span className="font-semibold text-stone-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {includePujaKit && (
                <div className="flex justify-between text-stone-600">
                  <span>Eco Puja Samagri Kit</span>
                  <span className="font-semibold text-stone-800">₹{pujaKitPrice}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-700">
                <span className="flex items-center gap-1">
                  <PackageCheck className="w-4 h-4" /> Wooden Crate Packaging
                </span>
                <span className="font-bold">FREE</span>
              </div>

              <div className="flex justify-between text-emerald-700">
                <span>Safe Doorstep Delivery</span>
                <span className="font-bold">FREE</span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between text-base sm:text-lg font-black text-amber-950">
                <span>Total Price</span>
                <span className="text-orange-700">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              id="proceed-to-checkout-btn"
              onClick={() => setCurrentPage('checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-105 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-900/15 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
              <div className="flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Transit Damage Guaranteed</span>
              </div>
              <p>
                In the rare case of transit crack, instant free replacement is dispatched within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
