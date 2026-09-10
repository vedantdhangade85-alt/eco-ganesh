import React from 'react';
import { Idol, PageView, CustomerReview } from '../types';

import { 
  Sparkles,
  Leaf, 
  ShieldCheck, 
  Droplets, 
  ArrowRight, 
  Star, 
  ShoppingBag, 
  Ruler, 
  Layers, 
  Sprout, 
  CheckCircle2, 
  Clock,
  Heart
} from 'lucide-react';



interface HomeViewProps {
  idols: Idol[];
  reviews: CustomerReview[];
  setCurrentPage: (page: PageView) => void;
  onSelectIdol: (idol: Idol) => void;
  onAddToCart: (idol: Idol, quantity: number) => void;
  setSelectedCategoryFilter: (category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  idols,
  reviews,
  setCurrentPage,
  onSelectIdol,
  onAddToCart,
  setSelectedCategoryFilter,
}) => {
  const featuredIdols = idols.filter((i) => i.isFeatured);

  const categories = [
    {
      id: 'clay',
      name: 'Clay Idols (Shadu Mati)',
      count: idols.filter(i => i.category === 'clay').length,
      desc: '100% pure river mud, completely chemical-free & water soluble',
      icon: '🏺',
      image: '/images/ganpati-hero.jpg',
    },
    {
      id: 'small',
      name: 'Small Ganpati',
      count: idols.filter(i => i.category === 'small').length,
      desc: '8 to 12 inches, ideal for city apartments & office desks',
      icon: '🕉️',
      image: '/images/ganpati-bal.jpg',
    },
    {
      id: 'premium',
      name: 'Premium Ganpati',
      count: idols.filter(i => i.category === 'premium').length,
      desc: '18 to 24 inches with majestic mukut & regal ornamentation',
      icon: '👑',
      image: '/images/ganpati-royal.jpg',
    },
    {
      id: 'seed',
      name: 'Seed Ganpati (Plantable)',
      count: idols.filter(i => i.category === 'seed').length,
      desc: 'Embedded with Tulsi & Marigold seeds; sprouts into a plant',
      icon: '🌱',
      image: '/images/ganpati-seed.jpg',
    },
  ];

  return (
    <div className="space-y-16 pb-16 bg-[#FDFBF7]">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#FAF6EE] to-[#F5F1E8] border-b border-[#E5E1D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#E9EDC9] border border-[#5D6D31]/30 px-3.5 py-1.5 rounded text-xs font-bold text-[#5D6D31]">
                <Leaf className="w-4 h-4 text-[#5D6D31]" />
                <span className="uppercase tracking-wider">Environment Friendly • Ganpati 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#2D3518] font-serif leading-[1.15] tracking-tight">
                Celebrate Devotion, <span className="text-[#C16A3D]">Preserve Nature</span> with 100% Pure Clay
              </h1>

              <p className="text-base sm:text-lg text-[#6B705C] max-w-2xl leading-relaxed">
                Our Ganpati idols are handcrafted from 100% natural clay (Shadu Mati) and painted with organic, non-toxic colors that dissolve completely in water. Zero Plaster of Paris and safe for balcony bucket Visarjan.
              </p>

              {/* Guarantees Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3D3D3D] bg-white p-2.5 rounded border border-[#E5E1D8] shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#5D6D31] shrink-0" />
                  <span>100% Shadu Clay</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3D3D3D] bg-white p-2.5 rounded border border-[#E5E1D8] shadow-xs">
                  <Droplets className="w-4 h-4 text-[#5D6D31] shrink-0" />
                  <span>Bucket Visarjan</span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs font-semibold text-[#3D3D3D] bg-white p-2.5 rounded border border-[#E5E1D8] shadow-xs">
                  <Sprout className="w-4 h-4 text-[#C16A3D] shrink-0" />
                  <span>Sprouts into Tulsi</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  id="hero-explore-products-btn"
                  onClick={() => setCurrentPage('products')}
                  className="flex items-center gap-2 bg-[#C16A3D] hover:bg-[#AC5C32] text-white px-7 py-3.5 rounded font-bold text-base shadow-sm transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Explore Clay Idols</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  id="hero-about-process-btn"
                  onClick={() => setCurrentPage('about')}
                  className="flex items-center gap-2 bg-white text-[#5D6D31] border border-[#5D6D31] hover:bg-[#F5F1E8] px-6 py-3.5 rounded font-bold text-base shadow-xs transition-colors"
                >
                  <span>Our Eco Process</span>
                </button>
              </div>
            </div>

            {/* Right Hero Visual Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-[#E5E1D8] rounded-3xl p-3 border-8 border-white shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                {/* Hero Highlight Card */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-inner bg-[#F5F1E8]">
                  <img
                    src="/images/ganpati-hero.jpg"
                    alt="Eco-Friendly Handcrafted Shadu Mati Ganpati Bappa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D3518]/85 via-transparent to-transparent" />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 bg-[#5D6D31] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#E9EDC9]" />
                    <span>100% Pure Shadu Mati</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-white">Shadu Mati Ganpati Bappa</h3>
                        <p className="text-xs text-[#E5E1D8]">Pure River Mud • Organic Turmeric Wash</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#E5E1D8] block">Starting from</span>
                        <span className="text-2xl font-bold text-[#E9EDC9]">₹3,200</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating pill */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-[#E5E1D8] flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#E9EDC9] text-[#5D6D31] flex items-center justify-center font-bold text-lg">
                    🌱
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2D3518]">Plantable Seed Idols</p>
                    <p className="text-[11px] text-[#6B705C]">Blooms into sacred Tulsi plant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. CATEGORIES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C16A3D]">
            Handcrafted Varieties
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D3518]">
            Browse Idols by Category
          </h2>
          <p className="text-sm text-[#6B705C]">
            From traditional Shadu mud sculpts to modern plantable tree Ganpatis that green your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategoryFilter(cat.id);
                setCurrentPage('products');
              }}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#5D6D31] transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#F5F1E8]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-lg shadow-sm border border-[#E5E1D8]">
                  {cat.icon}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#2D3518] group-hover:text-[#C16A3D] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#6B705C] mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-[#E5E1D8] flex items-center justify-between text-xs font-bold text-[#C16A3D]">
                  <span>View Idols</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED ECO-FRIENDLY GANPATI IDOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#E5E1D8] pb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C16A3D]">
              Devotees Choice
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D3518] mt-1">
              Featured Collections
            </h2>
            <p className="text-sm text-[#6B705C] mt-1">
              Guaranteed pure Shadu Mati idols handcrafted by master sculptors from Pen and Konkan.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('products')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#C16A3D] hover:text-[#AC5C32] self-start sm:self-auto"
          >
            <span>View All Products →</span>
          </button>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredIdols.map((idol) => (
            <div
              key={idol.id}
              className="bg-white rounded-xl overflow-hidden border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Product Image */}
              <div 
                onClick={() => onSelectIdol(idol)}
                className="relative aspect-square overflow-hidden bg-[#F5F1E8] cursor-pointer"
              >
                <img
                  src={idol.images[0]}
                  alt={idol.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#5D6D31] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  {idol.categoryLabel}
                </span>
                <span className="absolute bottom-3 right-3 bg-[#E9EDC9] text-[#5D6D31] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Ruler className="w-3 h-3 text-[#5D6D31]" />
                  {idol.size}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5D6D31] font-semibold mb-1">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {idol.rating} ({idol.reviewsCount})
                    </span>
                    <span className="text-[11px] text-[#5D6D31] font-medium bg-[#E9EDC9]/60 px-1.5 py-0.2 rounded">
                      Stock: {idol.stock}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectIdol(idol)}
                    className="font-serif font-bold text-base text-[#2D3518] hover:text-[#C16A3D] cursor-pointer transition-colors line-clamp-1"
                  >
                    {idol.name}
                  </h3>

                  <p className="text-[11px] text-[#6B705C] mt-1 line-clamp-2 leading-relaxed">
                    {idol.material}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#C16A3D]">
                      ₹{idol.price.toLocaleString('en-IN')}
                    </span>
                    {idol.originalPrice && (
                      <span className="text-xs text-[#6B705C] line-through ml-1.5">
                        ₹{idol.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectIdol(idol)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-[#3D3D3D] hover:text-[#5D6D31] hover:bg-[#F5F1E8] rounded border border-[#E5E1D8] transition-colors"
                      title="View Details"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(idol, 1)}
                      className="px-3 py-1.5 rounded bg-[#5D6D31] hover:bg-[#4F5E29] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ECO-FRIENDLY PROCESS HIGHLIGHT */}
      <section className="bg-[#2D3518] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E9EDC9]">
              From River to River
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              The Pure Eco-Friendly Cycle
            </h2>
            <p className="text-xs sm:text-sm text-[#E5E1D8]/80 mt-2">
              Our idols are created with respect for ancient traditions and modern environmental consciousness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#39441F] border border-[#485429] rounded-xl p-5 space-y-3">
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-[#E9EDC9] font-bold flex items-center justify-center text-sm font-serif">
                1
              </span>
              <h4 className="text-base font-bold text-white font-serif">Natural River Clay</h4>
              <p className="text-xs text-[#E5E1D8]/80 leading-relaxed">
                We source fine natural Shadu clay silt from clean riverbeds without synthetic binders.
              </p>
            </div>

            <div className="bg-[#39441F] border border-[#485429] rounded-xl p-5 space-y-3">
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-[#E9EDC9] font-bold flex items-center justify-center text-sm font-serif">
                2
              </span>
              <h4 className="text-base font-bold text-white font-serif">Organic Colors</h4>
              <p className="text-xs text-[#E5E1D8]/80 leading-relaxed">
                Hand-painted using turmeric, multani mitti, geru ochre, and edible mica powders.
              </p>
            </div>

            <div className="bg-[#39441F] border border-[#485429] rounded-xl p-5 space-y-3">
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-[#E9EDC9] font-bold flex items-center justify-center text-sm font-serif">
                3
              </span>
              <h4 className="text-base font-bold text-white font-serif">Safe Home Visarjan</h4>
              <p className="text-xs text-[#E5E1D8]/80 leading-relaxed">
                Dissolves completely within 45 to 60 minutes in a regular water bucket or tub at home.
              </p>
            </div>

            <div className="bg-[#39441F] border border-[#485429] rounded-xl p-5 space-y-3">
              <span className="w-8 h-8 rounded bg-[#5D6D31] text-[#E9EDC9] font-bold flex items-center justify-center text-sm font-serif">
                4
              </span>
              <h4 className="text-base font-bold text-white font-serif">Life Blooms Anew</h4>
              <p className="text-xs text-[#E5E1D8]/80 leading-relaxed">
                Water is returned safely to mother earth or sprouts into blessed Tulsi & Marigold plants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C16A3D]">
            Devotee Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D3518]">
            What Our Devotees Say
          </h2>
          <p className="text-sm text-[#6B705C]">
            Real stories from families across Mumbai, Pune, and India celebrating eco-conscious Ganesh Utsav.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-[#3D3D3D] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E1D8] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E1D8]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#2D3518] font-serif">{rev.customerName}</h4>
                  <p className="text-[10px] text-[#6B705C]">{rev.city}</p>
                  <span className="text-[10px] text-[#5D6D31] font-semibold block">
                    Verified Buyer • {rev.idolName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
