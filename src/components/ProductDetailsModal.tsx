import React, { useState } from 'react';
import { Idol } from '../types';
import { 
  X, 
  Check, 
  ShoppingBag, 
  ShieldCheck, 
  Droplets, 
  Sparkles, 
  Ruler, 
  Weight, 
  Layers, 
  Star,
  Sprout
} from 'lucide-react';

interface ProductDetailsModalProps {
  idol: Idol | null;
  onClose: () => void;
  onAddToCart: (idol: Idol, quantity: number) => void;
  onBuyNow: (idol: Idol, quantity: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  idol,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!idol) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'visarjan' | 'packaging'>('details');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(idol, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(idol, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-300 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="close-product-details-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="p-6 sm:p-8 bg-stone-100/70 border-r border-stone-200 flex flex-col justify-between">
            <div>
              {/* Large Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner border border-stone-200/80 flex items-center justify-center">
                <img
                  src={idol.images[selectedImageIndex] || idol.images[0]}
                  alt={idol.name}
                  className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-emerald-700/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>100% Shadu Clay</span>
                </div>
                {idol.plantType && (
                  <div className="absolute bottom-3 left-3 bg-amber-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>Tree Ganpati</span>
                  </div>
                )}
              </div>

              {/* Thumbnails (Multiple Images) */}
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {idol.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`thumbnail-${idx}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-orange-600 ring-2 ring-orange-200'
                        : 'border-stone-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${idol.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Guarantees Badge */}
            <div className="mt-6 pt-4 border-t border-stone-200 grid grid-cols-2 gap-2 text-[11px] text-stone-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dissolves in {idol.visarjanTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Zero Plaster of Paris</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
                  {idol.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-stone-700">{idol.rating}</span>
                  <span className="text-stone-400">({idol.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Idol Name */}
              <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif mt-2">
                {idol.name}
              </h2>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-extrabold text-orange-700">
                  ₹{idol.price.toLocaleString('en-IN')}
                </span>
                {idol.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ₹{idol.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  In Stock ({idol.stock} units left)
                </span>
              </div>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5 p-3.5 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5" /> Size
                  </span>
                  <p className="font-bold text-stone-800 mt-0.5">{idol.size}</p>
                </div>
                <div>
                  <span className="text-stone-400 flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5" /> Height
                  </span>
                  <p className="font-bold text-stone-800 mt-0.5">{idol.height}</p>
                </div>
                <div>
                  <span className="text-stone-400 flex items-center gap-1">
                    <Weight className="w-3.5 h-3.5" /> Weight
                  </span>
                  <p className="font-bold text-stone-800 mt-0.5">{idol.weight}</p>
                </div>
                <div className="col-span-2 sm:col-span-3 pt-2 border-t border-stone-200">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> Material
                  </span>
                  <p className="font-bold text-stone-800 mt-0.5">{idol.material}</p>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-stone-200 flex gap-6 text-xs font-bold">
                <button
                  id="tab-details"
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-orange-600 text-orange-800'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Description
                </button>
                <button
                  id="tab-visarjan"
                  onClick={() => setActiveTab('visarjan')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'visarjan'
                      ? 'border-orange-600 text-orange-800'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Home Visarjan Guide
                </button>
                <button
                  id="tab-packaging"
                  onClick={() => setActiveTab('packaging')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'packaging'
                      ? 'border-orange-600 text-orange-800'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Safe Packaging
                </button>
              </div>

              {/* Tab Contents */}
              <div className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed min-h-[90px]">
                {activeTab === 'details' && (
                  <div>
                    <p>{idol.description}</p>
                    <ul className="mt-2 space-y-1 text-xs text-stone-700">
                      {idol.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'visarjan' && (
                  <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 text-emerald-950 text-xs space-y-1.5">
                    <p className="font-bold flex items-center gap-1 text-emerald-900">
                      <Droplets className="w-4 h-4 text-emerald-700" /> How to do Home Visarjan:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-stone-700">
                      <li>Place Bappa in a bucket, tub, or earthen planter filled with clean tap water.</li>
                      <li>In 45 to 60 minutes, the clay softens and dissolves into smooth river mud.</li>
                      <li>{idol.plantType ? `Water your planter pot. The embedded ${idol.plantType} seeds will sprout in 7 to 10 days!` : 'Pour the pure, enriched mud-water into your home potted plants or garden.'}</li>
                    </ol>
                  </div>
                )}
                {activeTab === 'packaging' && (
                  <div className="text-xs text-stone-600 space-y-1.5">
                    <p>Each idol is individually cushioned with biodegradable honeycomb paper and encased inside an engineered 5-ply shockproof wooden reinforced box.</p>
                    <p className="text-emerald-700 font-semibold">100% Transit Safe Guarantee: In the rare event of transit damage, we offer instant doorstep replacement or full refund.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity + Add to Cart & Buy Now */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">Quantity</span>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    id="decrease-qty"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-bold text-stone-800 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    id="increase-qty"
                    onClick={() => setQuantity((prev) => Math.min(idol.stock, prev + 1))}
                    className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  id="btn-add-to-cart-modal"
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  id="btn-buy-now-modal"
                  onClick={handleBuy}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:brightness-105 shadow-md shadow-orange-900/20 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
