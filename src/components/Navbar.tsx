import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Code2, 
  User, 
  ChevronRight,
  Leaf
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  cartCount: number;
  openPhpModal: () => void;
  isLoggedIn: boolean;
  currentUser: { name: string; email: string; role?: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openPhpModal,
  isLoggedIn,
  currentUser,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'Categories', page: 'categories' },
    { label: 'Bills & Invoices', page: 'billing' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#5D6D31] text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
      {/* Auspicious Announcement Bar */}
      <div className="bg-[#2D3518] text-[#E9EDC9] px-4 py-1.5 text-xs font-medium tracking-wide border-b border-[#3D4722]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1 bg-[#C16A3D] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
              <Leaf className="w-3 h-3 text-white" /> 100% Eco-Friendly
            </span>
            <span className="hidden sm:inline text-[#E5E1D8]">
              Handcrafted in Pure Shadu Mati & Tree Seed Clay • Zero Chemical Dyes • Safe Home Visarjan
            </span>
            <span className="sm:hidden text-[#E5E1D8] truncate">
              Pure Shadu Mati & Seed Ganpati Idols
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            {/* PHP/XAMPP Code button */}
            <button
              id="php-code-button"
              onClick={openPhpModal}
              className="flex items-center gap-1 bg-[#C16A3D] hover:bg-[#AC5C32] text-white px-2.5 py-0.5 rounded font-mono font-semibold text-[11px] transition-colors shadow-xs"
            >
              <Code2 className="w-3 h-3" />
              <span>PHP 8 & MySQL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#C16A3D] flex items-center justify-center text-white shadow-md font-serif font-bold text-xl group-hover:scale-105 transition-transform duration-200">
              🕉️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-serif">
                  Eco Ganesh
                </span>
                <span className="bg-[#E9EDC9] text-[#5D6D31] text-[10px] font-bold px-1.5 py-0.5 rounded">
                  100% Bio
                </span>
              </div>
              <p className="text-[11px] text-[#E9EDC9]/85 font-medium tracking-wide">
                Eco-Friendly Ganpati Idol Store
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-${link.page}`}
                  onClick={() => handleNav(link.page)}
                  className={`relative py-1.5 transition-all text-xs font-semibold tracking-wider ${
                    isActive 
                      ? 'text-white border-b-2 border-[#C16A3D] font-bold opacity-100' 
                      : 'text-white/85 hover:text-white hover:opacity-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">

            {/* Login / Customer Portal */}
            {isLoggedIn && currentUser ? (
              <div className="flex items-center gap-2 bg-[#2D3518]/60 border border-[#3D4722] px-3 py-1.5 rounded text-xs text-white">
                <User className="w-3.5 h-3.5 text-[#E9EDC9]" />
                <span className="font-semibold text-white max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[#E9EDC9] hover:text-[#C16A3D] text-[11px] underline ml-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                id="nav-login"
                onClick={() => handleNav('login')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded border transition-colors ${
                  currentPage === 'login' || currentPage === 'register'
                    ? 'bg-[#C16A3D] text-white border-[#C16A3D]'
                    : 'text-white hover:bg-white/10 border-white/60'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={() => handleNav('cart')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded font-bold text-sm transition-all ${
                currentPage === 'cart'
                  ? 'bg-[#C16A3D] text-white'
                  : 'bg-[#C16A3D] hover:bg-[#AC5C32] text-white shadow-xs'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-[#C16A3D] text-xs font-black px-2 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              id="mobile-cart-icon"
              onClick={() => handleNav('cart')}
              className="relative p-2 text-white"
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C16A3D] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#5D6D31] border-t border-[#4F5E29] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded text-sm font-semibold text-left uppercase tracking-wider ${
                  currentPage === link.page
                    ? 'bg-[#2D3518] text-[#E9EDC9] font-bold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#E9EDC9]" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#4F5E29]">
            <button
              onClick={() => handleNav('login')}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isLoggedIn ? 'My Account' : 'Login / Register'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
