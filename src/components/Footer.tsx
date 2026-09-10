import React from 'react';
import { PageView } from '../types';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Leaf, Server } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  openPhpModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openPhpModal }) => {
  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D3518] text-[#A9AF8E] border-t border-[#3D4722] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Banners */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-[#3D4722]">
          <div className="flex items-center gap-3.5 p-3 rounded bg-[#39441F] border border-[#485429]">
            <div className="w-10 h-10 rounded bg-[#5D6D31]/50 text-[#E9EDC9] flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-[#E9EDC9]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">100% River Mud (Shadu)</h4>
              <p className="text-xs text-[#E5E1D8]/80">Zero Plaster of Paris & zero toxic chemical paints</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded bg-[#39441F] border border-[#485429]">
            <div className="w-10 h-10 rounded bg-[#5D6D31]/50 text-[#E9EDC9] flex items-center justify-center shrink-0">
              <span className="text-lg">🌱</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">Plantable Tree Ganpati</h4>
              <p className="text-xs text-[#E5E1D8]/80">Embedded with holy Tulsi & Marigold seeds</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded bg-[#39441F] border border-[#485429]">
            <div className="w-10 h-10 rounded bg-[#C16A3D]/30 text-[#E5E1D8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C16A3D]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">Shockproof Wooden Crate</h4>
              <p className="text-xs text-[#E5E1D8]/80">Safe doorstep delivery with breakage replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded bg-[#39441F] border border-[#485429]">
            <div className="w-10 h-10 rounded bg-[#5D6D31]/50 text-[#E9EDC9] flex items-center justify-center shrink-0">
              <Server className="w-5 h-5 text-[#E9EDC9]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-serif">PHP 8 & MySQL Backend</h4>
              <p className="text-xs text-[#E5E1D8]/80">Production ready for local XAMPP & live hosting</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-[#3D4722]">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C16A3D] flex items-center justify-center text-white text-base">
                🕉️
              </div>
              <span className="text-xl font-bold text-white font-serif tracking-tight">
                Eco Ganesh
              </span>
            </div>
            <p className="text-sm text-[#E5E1D8]/80 leading-relaxed">
              Preserving our sacred marine ecosystems and rivers with 100% biodegradable, water-soluble Shadu clay and plantable seed idols. Celebrating Lord Ganesha with pure devotion and environmental reverence.
            </p>
            <div className="pt-2">
              <button
                onClick={openPhpModal}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#39441F] text-[#E9EDC9] border border-[#5D6D31] text-xs font-mono font-medium hover:bg-[#485429] transition-colors"
              >
                <Server className="w-3.5 h-3.5 text-[#C16A3D]" />
                <span>View PHP 8 / MySQL XAMPP Source</span>
              </button>
            </div>
          </div>

          {/* Quick Pages */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-serif">
              Website Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-white transition-colors">
                  All Eco Idols (Products)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('categories')} className="hover:text-white transition-colors">
                  Idol Categories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Us & Eco Process
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact Us & Workshop Map
                </button>
              </li>
              <li>
                <a
                  href="#admin"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('admin');
                  }}
                  className="text-[#E9EDC9]/70 hover:text-white transition-colors text-xs flex items-center gap-1"
                >
                  <span>🔐 Admin Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-serif">
              Studio & Workshop
            </h3>
            <div className="flex items-start gap-3 text-sm text-[#E5E1D8]/80">
              <MapPin className="w-4 h-4 text-[#C16A3D] shrink-0 mt-1" />
              <span>Plot 42, Artisan Lane, Near Sena Bhavan, Dadar West, Mumbai, Maharashtra 400028</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#E5E1D8]/80">
              <Phone className="w-4 h-4 text-[#A9AF8E] shrink-0" />
              <span>+91 98200 12345 / +91 22 2430 9876</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#E5E1D8]/80">
              <Mail className="w-4 h-4 text-[#C16A3D] shrink-0" />
              <span>support@ecoganpati.in</span>
            </div>
            <div className="text-xs text-[#A9AF8E] pt-2 border-t border-[#3D4722]">
              Workshop timings: Monday to Sunday: 9:00 AM – 8:00 PM
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9AF8E] gap-4">
          <p>© {new Date().getFullYear()} Eco Ganesh Store. Crafted with devotion for an eco-friendly festival.</p>
          <div className="flex items-center gap-2">
            <span>Stack: HTML5 • CSS3 • JavaScript • PHP 8 • MySQL • XAMPP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
