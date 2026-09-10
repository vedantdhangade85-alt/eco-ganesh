import React, { useState, useMemo } from 'react';
import { Idol } from '../types';
import { 
  Search, 
  Filter, 
  Ruler, 
  Layers, 
  ShoppingBag, 
  Eye, 
  Sparkles, 
  Star,
  CheckCircle2,
  X
} from 'lucide-react';

interface ProductsViewProps {
  idols: Idol[];
  onSelectIdol: (idol: Idol) => void;
  onAddToCart: (idol: Idol, quantity: number) => void;
  initialCategoryFilter?: string;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  idols,
  onSelectIdol,
  onAddToCart,
  initialCategoryFilter = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Idols' },
    { id: 'clay', label: 'Clay Idols (Shadu Mati)' },
    { id: 'small', label: 'Small Ganpati' },
    { id: 'premium', label: 'Premium Ganpati' },
    { id: 'seed', label: 'Seed Ganpati (Plantable)' },
    { id: 'paper', label: 'Paper Mache' },
  ];

  const sizes = ['all', '8 Inch', '10 Inch', '12 Inch', '15 Inch', '16 Inch', '18 Inch', '24 Inch'];

  const filteredIdols = useMemo(() => {
    return idols
      .filter((idol) => {
        // Search filter
        const matchesSearch = 
          idol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idol.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idol.size.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory = selectedCategory === 'all' || idol.category === selectedCategory;

        // Size filter
        const matchesSize = selectedSize === 'all' || idol.size === selectedSize;

        return matchesSearch && matchesCategory && matchesSize;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [idols, searchQuery, selectedCategory, selectedSize, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Quick Example Table Highlight */}
      <div className="bg-[#2D3518] text-white p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden border border-[#3D4722]">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs uppercase font-bold tracking-widest text-[#E9EDC9]">
            Certified 100% Eco-Friendly
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold mt-1 text-white">
            Eco Ganpati Idol Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#E5E1D8]/85 mt-2 leading-relaxed">
            All idols are crafted using riverbed Shadu clay, edible non-toxic colors, and biodegradable materials. Safe for home visarjan in a bucket or pot.
          </p>
        </div>

        {/* Quick Reference Mini-Table requested in prompt */}
        <div className="mt-6 pt-4 border-t border-[#485429] hidden md:block">
          <p className="text-[11px] uppercase tracking-wider text-[#E9EDC9] font-bold mb-2">
            Popular Dimensions & Pricing
          </p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-[#39441F] p-2.5 rounded-lg border border-[#485429]">
              <span className="text-[#E9EDC9] font-bold block font-serif">Bal Ganesh</span>
              <span className="text-[#E5E1D8]">12 Inch • ₹8,000</span>
            </div>
            <div className="bg-[#39441F] p-2.5 rounded-lg border border-[#485429]">
              <span className="text-[#E9EDC9] font-bold block font-serif">Royal Ganpati</span>
              <span className="text-[#E5E1D8]">18 Inch • ₹12,000</span>
            </div>
            <div className="bg-[#39441F] p-2.5 rounded-lg border border-[#485429]">
              <span className="text-[#E9EDC9] font-bold block font-serif">Traditional Ganpati</span>
              <span className="text-[#E5E1D8]">24 Inch • ₹18,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] space-y-4">
        {/* Search input & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6B705C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by idol name, size, or material (e.g. Bal Ganesh, Shadu clay, 18 Inch)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] border border-[#E5E1D8] rounded text-sm text-[#3D3D3D] focus:outline-none focus:border-[#5D6D31] focus:ring-1 focus:ring-[#5D6D31] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B705C] hover:text-[#3D3D3D]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#6B705C] shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FDFBF7] border border-[#E5E1D8] rounded px-3 py-2 text-xs font-semibold text-[#3D3D3D] focus:outline-none focus:border-[#5D6D31]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#5D6D31] text-white shadow-xs'
                  : 'bg-[#F5F1E8] text-[#3D3D3D] hover:bg-[#E9EDC9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Size Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 text-xs">
          <span className="text-[#6B705C] font-semibold shrink-0">Filter Size:</span>
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                selectedSize === s
                  ? 'bg-[#E9EDC9] text-[#5D6D31] border border-[#5D6D31]/40 font-bold'
                  : 'bg-[#FDFBF7] text-[#6B705C] border border-[#E5E1D8] hover:bg-[#F5F1E8]'
              }`}
            >
              {s === 'all' ? 'All Sizes' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#6B705C] px-1">
        <span>Showing <strong className="text-[#2D3518]">{filteredIdols.length}</strong> eco-friendly idols</span>
        {(selectedCategory !== 'all' || selectedSize !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSize('all');
              setSearchQuery('');
            }}
            className="text-[#C16A3D] hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Cards Grid: displaying Image, Name, Size, Price, Material, Stock, View Details */}
      {filteredIdols.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIdols.map((idol) => (
            <div
              key={idol.id}
              className="bg-white rounded-xl overflow-hidden border border-[#E5E1D8] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image with badges */}
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
                <span className="absolute bottom-3 right-3 bg-[#E9EDC9] text-[#5D6D31] text-xs font-bold px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1 border border-[#5D6D31]/20">
                  <Ruler className="w-3 h-3 text-[#5D6D31]" />
                  {idol.size}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  {/* Rating & Stock */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {idol.rating} <span className="text-[#6B705C] font-normal">({idol.reviewsCount})</span>
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      idol.stock > 10 
                        ? 'bg-[#E9EDC9] text-[#5D6D31] border border-[#5D6D31]/30' 
                        : 'bg-[#F5F1E8] text-[#C16A3D] border border-[#C16A3D]/30'
                    }`}>
                      ✔ Stock: {idol.stock} units
                    </span>
                  </div>

                  {/* Idol Name */}
                  <h3 
                    onClick={() => onSelectIdol(idol)}
                    className="font-serif font-bold text-lg text-[#2D3518] hover:text-[#C16A3D] cursor-pointer transition-colors"
                  >
                    {idol.name}
                  </h3>

                  {/* Material display explicitly required */}
                  <div className="text-xs text-[#6B705C] flex items-start gap-1.5 bg-[#FAF8F5] p-2 rounded border border-[#E5E1D8]">
                    <Layers className="w-3.5 h-3.5 text-[#5D6D31] shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-medium">
                      Material: <strong className="text-[#2D3518]">{idol.material}</strong>
                    </span>
                  </div>
                </div>

                {/* Price & Action: View Details + Add to Cart */}
                <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-[#C16A3D]">
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
                      id={`view-details-${idol.id}`}
                      onClick={() => onSelectIdol(idol)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#3D3D3D] hover:text-[#5D6D31] hover:bg-[#F5F1E8] rounded border border-[#E5E1D8] transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                    <button
                      id={`add-cart-${idol.id}`}
                      onClick={() => onAddToCart(idol, 1)}
                      className="p-2 rounded bg-[#5D6D31] hover:bg-[#4F5E29] text-white shadow-xs transition-colors"
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
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-[#E5E1D8] p-8">
          <div className="w-12 h-12 rounded-full bg-[#F5F1E8] text-[#6B705C] flex items-center justify-center mx-auto mb-3">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#2D3518]">No matching idols found</h3>
          <p className="text-xs text-[#6B705C] mt-1">
            Try adjusting your search criteria or reset the category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSize('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#C16A3D] hover:bg-[#AC5C32] text-white text-xs font-bold rounded"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
