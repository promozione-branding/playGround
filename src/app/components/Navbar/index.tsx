'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronDown, Mail, Phone, Search, Heart, ArrowRight,
  LayoutGrid, Shapes, Armchair, X, Home, Info, CalendarDays,
  PhoneCall, Handshake, Package, MapPin, Sparkles, Image as ImageIcon,
} from 'lucide-react';
import { LiquidButton } from '../ui/buttonUi';

/* ─────────────────────────────────────────────
   ANNOUNCEMENT BAR DATA
───────────────────────────────────────────── */
const announcements = [
  { text: '🎉 Free shipping on orders above ₹999!', cta: 'Shop Now', href: '/products' },
  { text: '🌟 New arrivals just landed — explore now', cta: 'Explore', href: '/products' },
  { text: '🎨 Kindergarten is an early childhood educational environment', cta: 'Learn More', href: '#learn-more' },
];

/* ─────────────────────────────────────────────
   NAV LINK DATA
───────────────────────────────────────────── */
const desktopNav = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/ourstory' },
      { label: 'Who We Are', href: '/whoweare' },
      { label: 'Why Choose Us', href: '/why-choose-us' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    label: 'News & Events',
    href: '/exhibition',
    children: [
      { label: 'Exhibition', href: '/exhibition' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'Certification', href: '/certification' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Partner With Us', href: '/partner' },
    ],
  },
];

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Home, color: 'bg-[#62C4D2]/15 text-[#62C4D2]', glow: '#62C4D2' },
  { href: '/about', label: 'About Us', icon: Info, color: 'bg-[#FF6B6B]/15 text-[#FF6B6B]', glow: '#FF6B6B' },
  { href: '/exhibition', label: 'News & Events', icon: CalendarDays, color: 'bg-[#f97316]/15 text-[#f97316]', glow: '#f97316' },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon, color: 'bg-[#8BC34A]/15 text-[#8BC34A]', glow: '#8BC34A' },
  { href: '/contact', label: 'Contact Us', icon: PhoneCall, color: 'bg-[#62C4D2]/15 text-[#62C4D2]', glow: '#62C4D2' },
  { href: '/partner', label: 'Partner With Us', icon: Handshake, color: 'bg-[#FFD400]/20 text-[#c9a800]', glow: '#c9a800' },
];

/* ─────────────────────────────────────────────
   SEARCH MODAL
───────────────────────────────────────────── */
function SearchModal({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'searchSlideIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-black/20 border border-gray-100 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
            <Search className="w-5 h-5 text-[#62C4D2] shrink-0" strokeWidth={2.5} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search toys, furniture, brands…"
              className="flex-1 text-lg font-semibold text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
            />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Links */}
          <div className="px-6 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Wooden Toys', 'Educational Kits', 'Baby Furniture', 'Building Blocks', 'Art & Craft'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-full bg-[#62C4D2]/10 text-[#62C4D2] text-sm font-bold hover:bg-[#62C4D2]/20 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes searchSlideIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────── */
export default function KidzaNavbar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [isAnnouncementIn, setIsAnnouncementIn] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Rotating announcements */
  useEffect(() => {
    const id = setInterval(() => {
      setIsAnnouncementIn(false);
      setTimeout(() => {
        setAnnouncementIdx((i) => (i + 1) % announcements.length);
        setIsAnnouncementIn(true);
      }, 400);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* Close categories dropdown on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const ann = announcements[announcementIdx];

  return (
    <>
      {/* Search Modal */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}

      <header className="w-full font-quicksand relative z-50">

        {/* ═══ 1. ANNOUNCEMENT BAR ═══ */}
        {announcementVisible && (
          <div 
            className="relative bg-gradient-to-r from-[#00C4B5] via-[#62C4D2] to-[#0284C7] text-white text-xs sm:text-sm overflow-hidden"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_linear_infinite]" />

            <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-2.5 flex items-center justify-between gap-4 relative z-10">

              {/* Animated text */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span
                  className="font-semibold truncate transition-all duration-400"
                  style={{
                    opacity: isAnnouncementIn ? 1 : 0,
                    transform: isAnnouncementIn ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                  }}
                >
                  {ann.text}
                </span>
                <a
                  href={ann.href}
                  className="shrink-0 underline font-black hover:text-yellow-200 transition-colors"
                >
                  {ann.cta}
                </a>
              </div>

              {/* Right: contact info */}
              <div className="hidden md:flex items-center gap-5 text-white/90 font-medium shrink-0">
                <a href="mailto:info@toyparkindia.com" className="flex items-center gap-1 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span className="text-xs">info@toyparkindia.com</span>
                </a>
                <a href="tel:+919811117654" className="flex items-center gap-1 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span className="text-xs">+919811117654</span>
                </a>
                <span className="hidden lg:flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span className="text-xs">Karol Bagh New Delhi - 110005, India</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 2. MAIN NAVBAR ═══ */}
        <nav
          className={`px-4 sm:px-6 lg:px-12 py-1 flex items-center justify-between sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
            scrolled
              ? 'bg-white shadow-md border-b border-gray-100'
              : 'bg-white shadow-sm'
          }`}
        >
          <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between gap-4">

            {/* ── LEFT: Logo + Categories ── */}
            <div className="flex items-center gap-4 lg:gap-6 relative">

              {/* Logo */}
              <a href="/" className="flex items-center gap-2 cursor-pointer shrink-0 group">
                <div className="relative">
                  <Image
                    src="/assets/ToyPark_logo.png"
                    alt="ToyPark Logo"
                    width={220}
                    height={56}
                    priority
                    className="h-14 sm:h-14 w-auto object-contain max-w-[200px] sm:max-w-[220px] transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                  />
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-[#62C4D2]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </a>

              {/* Categories Button (Desktop) */}
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className={`flex items-center gap-2 border-2 rounded-full px-4 py-2 font-bold text-sm transition-all duration-200 focus:outline-none ${
                    isCategoriesOpen
                      ? 'border-[#62C4D2] bg-[#62C4D2]/5 text-[#0284C7]'
                      : 'border-[#94A3B8]/50 text-[#334155] hover:border-[#62C4D2]/60 hover:bg-[#62C4D2]/5'
                  }`}
                >
                  <LayoutGrid className={`w-4 h-4 transition-colors ${isCategoriesOpen ? 'text-[#62C4D2]' : 'text-[#f97316]'}`} />
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180 text-[#62C4D2]' : ''}`} />
                </button>

                {/* Categories Dropdown */}
                {isCategoriesOpen && (
                  <div
                    className="absolute left-0 mt-3 w-60 z-50"
                    style={{ animation: 'dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both' }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl shadow-black/12 border border-gray-100/80 py-2 overflow-hidden">
                      {/* Top accent */}
                      <div className="h-0.5 mx-3 mb-2 rounded-full bg-gradient-to-r from-[#62C4D2] via-[#f97316] to-[#FFD400]" />

                      {[
                        { href: '#toys', icon: Shapes, label: '1. Toys', color: 'bg-[#f97316]/10 text-[#f97316]' },
                        { href: '#furniture', icon: Armchair, label: '2. Furniture', color: 'bg-[#62C4D2]/15 text-[#62C4D2]' },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsCategoriesOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 mx-1.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#0284C7] transition-all rounded-xl group/item"
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.color} transition-transform group-hover/item:scale-110`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span>{item.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity text-[#62C4D2]" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── CENTER: Desktop Nav Links ── */}
            <div className="hidden xl:flex items-center gap-6">
              {desktopNav.map((item) => (
                <div key={item.label} className="relative group py-2 px-2">
                  <a
                    href={item.href}
                    className="flex items-center gap-1.5 font-extrabold text-[#334155] hover:text-[#0284C7] transition-colors text-lg leading-none relative"
                  >
                    <span className="relative">
                      {item.label}
                      {/* Animated underline */}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#62C4D2] to-[#0284C7] rounded-full transition-all duration-300" />
                    </span>
                    {item.children && (
                      <ChevronDown className="w-4 h-4 text-[#62C4D2] transition-transform duration-300 group-hover:rotate-180 shrink-0" />
                    )}
                  </a>

                  {/* Dropdown */}
                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      style={{ transitionProperty: 'opacity, visibility, transform' }}
                    >
                      <div
                        className="bg-white rounded-2xl shadow-xl shadow-black/12 border border-gray-100 overflow-hidden"
                        style={{ animation: 'dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both' }}
                      >
                        <div className="h-0.5 bg-gradient-to-r from-[#62C4D2] via-[#00C4B5] to-[#0284C7]" />
                        <div className="p-2 space-y-0.5">
                          {item.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className="flex items-center justify-between px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-[#62C4D2]/8 hover:text-[#0284C7] transition-all rounded-xl group/child"
                            >
                              <span>{child.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/child:opacity-100 transition-opacity text-[#62C4D2] -translate-x-1 group-hover/child:translate-x-0 duration-200" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── RIGHT: Actions ── */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#94A3B8]/50 flex items-center justify-center text-[#334155] hover:border-[#62C4D2] hover:text-[#0284C7] hover:bg-[#62C4D2]/5 transition-all duration-200 group"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2] transition-transform group-hover:scale-110" />
              </button>

              {/* Wishlist */}
              <button
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#94A3B8]/50 flex items-center justify-center text-[#334155] hover:border-[#FF6B6B] hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/5 transition-all duration-200 group"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2] transition-transform group-hover:scale-110 group-hover:fill-[#FF6B6B]/20" />
                {/* Badge */}
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B6B] text-white text-[9px] font-black flex items-center justify-center shadow-sm">
                  3
                </span>
              </button>

              {/* All Products CTA */}
              <a href="/products" className="hidden sm:block">
                <LiquidButton className="px-5 py-2.5 text-sm">
                  <span>All Products</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </LiquidButton>
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden relative flex items-center justify-center w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-[#F56B00]/30 active:scale-95 transition-all focus:outline-none group hover:shadow-[#008B74]/40"
                aria-label="Toggle Navigation Menu"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#62C4D2] to-[#0284C7] transition-all duration-300 group-hover:from-[#00C4B5] group-hover:to-[#62C4D2]" />
                <div className="relative z-10">
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-white stroke-[2.5]" style={{ animation: 'spinIn 0.25s ease both' }} />
                  ) : (
                    <span className="flex flex-col gap-[5px] items-center" style={{ animation: 'spinIn 0.25s ease both' }}>
                      <span className="block w-[18px] h-[2px] bg-white rounded-full" />
                      <span className="block w-[13px] h-[2px] bg-white/80 rounded-full self-start" />
                      <span className="block w-[18px] h-[2px] bg-white rounded-full" />
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* ═══ MOBILE DRAWER ═══ */}
          {isMobileMenuOpen && (
            <div
              className="xl:hidden absolute top-full left-0 right-0 z-50 overflow-hidden"
              style={{ animation: 'drawerSlideIn 0.3s cubic-bezier(0.34,1.2,0.64,1) both' }}
            >
              {/* Glassmorphism panel */}
              <div className="bg-white border-t border-[#62C4D2]/20 shadow-xl shadow-black/15">

                {/* Gradient top stripe */}
                <div className="h-[3px] bg-gradient-to-r from-[#FF6B6B] via-[#FFD400] via-[#62C4D2] to-[#0284C7]" />

                <div className="px-4 sm:px-5 pt-5 pb-6 space-y-4">

                  {/* Nav Link Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {mobileNavLinks.map((link, i) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gray-50/80 hover:bg-gray-100 active:scale-95 transition-all border border-gray-100 group/link"
                          style={{ animation: `fadeSlideUp 0.3s ${i * 0.04}s ease both` }}
                        >
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${link.color} transition-transform group-hover/link:scale-110`}
                            style={{ boxShadow: `0 0 12px ${link.glow}30` }}
                          >
                            <Icon className="w-4 h-4" strokeWidth={2.2} />
                          </div>
                          <span className="font-extrabold text-[#1a2744] text-sm leading-tight">{link.label}</span>
                        </a>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3" style={{ animation: 'fadeSlideUp 0.3s 0.24s ease both' }}>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Quick Access</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                  </div>

                  {/* All Products CTA */}
                  <a
                    href="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#00C4B5] to-[#62C4D2] text-white shadow-xl shadow-[#0284C7]/25 active:scale-[0.98] transition-all group/cta overflow-hidden relative"
                    style={{ animation: 'fadeSlideUp 0.3s 0.28s ease both' }}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Package className="w-5 h-5" strokeWidth={2.2} />
                      </div>
                      <div>
                        <p className="font-black text-[15px] leading-none">All Products</p>
                        <p className="text-white/80 text-[11px] font-semibold mt-0.5">Browse our full catalogue</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative z-10">
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </div>
                  </a>

                  {/* Contact Strip */}
                  <div
                    className="flex items-center justify-center gap-4 sm:gap-6 py-1"
                    style={{ animation: 'fadeSlideUp 0.3s 0.32s ease both' }}
                  >
                    <a href="mailto:kidza@gmail.com" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#62C4D2] transition-colors">
                      <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                      <span>kidza@gmail.com</span>
                    </a>
                    <div className="w-px h-4 bg-gray-200" />
                    <a href="tel:+004793948888" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#62C4D2] transition-colors">
                      <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
                      <span>+00 (47) 939 4888</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          )}
        </nav>

      </header>

      {/* ═══ GLOBAL KEYFRAMES ═══ */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes drawerSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinIn {
          from { opacity: 0; transform: rotate(-45deg) scale(0.8); }
          to   { opacity: 1; transform: rotate(0) scale(1); }
        }
      `}</style>
    </>
  );
}
