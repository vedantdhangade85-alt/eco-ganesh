import React, { useState } from 'react';
import { Idol } from '../types';
import { Ruler, ShoppingBag, Eye, Star, CheckCircle, ArrowRight } from 'lucide-react';

interface CategoriesViewProps {
  idols: Idol[];
  onSelectIdol: (idol: Idol) => void;
  onAddToCart: (idol: Idol, quantity: number) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  idols,
  onSelectIdol,
  onAddToCart,
}) => {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('all');

  const categories = [
    {
      id: 'all',
      name: 'All Categories',
      subtitle: 'Browse all varieties of sustainable Ganpati idols',
      desc: 'Discover our complete collection of natural clay, small desk-friendly, regal premium, and tree seed Ganpatis.',
      icon: '🕉️',
      highlights: ['Shadu Mati', 'Tulsi Seeds', 'Lightweight Pulp', 'Hand-Painted']
    },
    {
      id: 'clay',
      name: 'Clay Idols (Shadu Mati)',
      subtitle: 'Traditional riverbed mud sculpts',
      desc: 'Crafted using fine-silt river clay according to traditional Vedic tenets. Melts gently into river sediment upon immersion, nourishing aquatic flora.',
      icon: '🏺',
      highlights: ['100% Water Soluble', 'Zero PoP / Chemicals', 'Natural Geru Finish', '45 min Dissolution']
    },
    {
      id: 'small',
      name: 'Small Ganpati',
      subtitle: 'Compact 8 to 12 inches for apartments & desks',
      desc: 'Specially scaled for modern high-rise apartments, individual home mandirs, office workstations, and society flats.',
      icon: '✨',
      highlights: ['Lightweight & Compact', 'Fits standard puja thalis', 'Bucket immersion ready', 'Safe for children to hold']
    },
    {
      id: 'premium',
      name: 'Premium Ganpati',
      subtitle: 'Majestic 18 to 24 inch sculptures with ornate jewelry',
      desc: 'Sculpted by master state-awardee artisans with high-relief Mukut (crowns), intricate dhoti embroidery, and edible turmeric gold mica.',
      icon: '👑',
      highlights: ['High-relief ornamentation', 'Ideal for joint families', 'Includes ceremonial aarti set', 'Wooden crate shipping']
    },
    {
      id: 'seed',
      name: 'Plantable Seed Ganpati',
      subtitle: 'Tree Ganpati embedded with Holy Tulsi & Marigold seeds',
      desc: 'Do visarjan at home inside an earthen pot. Bappa dissolves into compost-rich soil and continues to live with your family as a sacred green plant.',
      icon: '🌱',
      highlights: ['Certified Heirloom Seeds', 'Includes Pot & Potting Mix', 'Living blessing all year', 'Zero waste festival']
    },
    {
      id: 'paper',
      name: 'Biodegradable Paper Mache',
      subtitle: 'Ultra-lightweight recycled pulp idols',
      desc: 'Made from upcycled post-consumer paper pulp and plant starch adhesive. Extremely durable against transit shocks and fully biodegradable.',
      icon: '📜',
      highlights: ['Weighs only 1 to 2 kg', 'Shock & shatter resistant', 'Quick biodegradability', 'Safe for long distance parcel']
    },
  ];

  const filteredIdols = activeCategorySlug === 'all'
    ? idols
    : idols.filter(i => i.category === activeCategorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C16A3D]">
          Curated Eco-Friendly Types
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D3518]">
          Eco Ganpati Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#6B705C]">
          Select an idol archetype crafted specifically for your home space, celebration scale, and ecological preferences.
        </p>
      </div>

      {/* Category Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.filter(c => c.id !== 'all').map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActiveCategorySlug(cat.id)}
            className={`cursor-pointer rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between ${
              activeCategorySlug === cat.id
                ? 'bg-[#E9EDC9]/30 border-[#5D6D31] ring-1 ring-[#5D6D31] shadow-sm'
                : 'bg-white border-[#E5E1D8] hover:border-[#5D6D31] hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#F5F1E8] text-[#5D6D31]">
                  {idols.filter(i => i.category === cat.id).length} Idols
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2D3518]">{cat.name}</h3>
              <p className="text-xs font-semibold text-[#C16A3D] mt-0.5">{cat.subtitle}</p>
              <p className="text-xs text-[#6B705C] mt-2 leading-relaxed">{cat.desc}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E5E1D8] space-y-2">
              <div className="grid grid-cols-2 gap-1 text-[11px] text-[#6B705C]">
                {cat.highlights.map((h, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#5D6D31] shrink-0" />
                    <span className="truncate">{h}</span>
                  </span>
                ))}
              </div>

              <button
                className={`w-full py-2 text-xs font-bold rounded transition-colors mt-2 flex items-center justify-center gap-1 ${
                  activeCategorySlug === cat.id
                    ? 'bg-[#5D6D31] text-white'
                    : 'bg-[#F5F1E8] text-[#3D3D3D] hover:bg-[#E9EDC9]'
                }`}
              >
                <span>{activeCategorySlug === cat.id ? 'Viewing Category' : 'Explore Category'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Filtered Idols Section */}
      <div className="pt-6 border-t border-[#E5E1D8]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#2D3518]">
              {activeCategorySlug === 'all' 
                ? 'All Eco Idols' 
                : categories.find(c => c.id === activeCategorySlug)?.name}
            </h2>
            <p className="text-xs text-[#6B705C]">
              Showing {filteredIdols.length} idols ready for festival ordering
            </p>
          </div>

          {activeCategorySlug !== 'all' && (
            <button
              onClick={() => setActiveCategorySlug('all')}
              className="text-xs font-bold text-[#C16A3D] hover:underline"
            >
              Show all categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredIdols.map((idol) => (
            <div
              key={idol.id}
              className="bg-white rounded-xl overflow-hidden border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col group"
            >
              <div 
                onClick={() => onSelectIdol(idol)}
                className="relative aspect-square overflow-hidden bg-[#F5F1E8] cursor-pointer"
              >
                <img
                  src={idol.images[0]}
                  alt={idol.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-3 right-3 bg-[#E9EDC9] text-[#5D6D31] text-xs font-bold px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1 border border-[#5D6D31]/20">
                  <Ruler className="w-3 h-3 text-[#5D6D31]" />
                  {idol.size}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 
                    onClick={() => onSelectIdol(idol)}
                    className="font-serif font-bold text-base text-[#2D3518] hover:text-[#C16A3D] cursor-pointer transition-colors"
                  >
                    {idol.name}
                  </h3>
                  <p className="text-[11px] text-[#6B705C] mt-1 line-clamp-2">
                    {idol.material}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between">
                  <span className="text-lg font-bold text-[#C16A3D]">
                    ₹{idol.price.toLocaleString('en-IN')}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectIdol(idol)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-[#3D3D3D] hover:text-[#5D6D31] hover:bg-[#F5F1E8] rounded border border-[#E5E1D8]"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(idol, 1)}
                      className="p-2 rounded bg-[#5D6D31] hover:bg-[#4F5E29] text-white shadow-xs"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
