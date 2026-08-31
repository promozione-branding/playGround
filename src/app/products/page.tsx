'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Star, Heart, ShoppingBag, Sparkles, Cloud } from 'lucide-react';
import PlayfulHeader from '../components/Navbar';
import Footer2 from '../components/Footer2';

const CATEGORIES = ['All', 'Toys', 'Kids Furniture'];

const PRODUCTS = [
  {
    id: '1',
    slug: 'the-pathfinder-adventure-box',
    title: 'The Pathfinder Adventure Box',
    category: 'Toys',
    price: '$45.00',
    rating: 4.8,
    reviews: 124,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
    badge: 'Best Seller',
    color: 'bg-[#FFE66D]',
  },
  {
    id: '2',
    slug: 'ergonomic-art-studio-desk',
    title: 'Ergonomic Art Studio Desk',
    category: 'Kids Furniture',
    price: '$120.00',
    rating: 5.0,
    reviews: 89,
    image: '/assets/split_vantage_images/Kids_Furniture.png',
    color: 'bg-[#4ECDC4]',
  },
  {
    id: '3',
    slug: 'active-bounce-trampoline',
    title: 'Active Bounce Trampoline',
    category: 'Toys',
    price: '$180.00',
    originalPrice: '$210.00',
    rating: 4.9,
    reviews: 215,
    image: '/assets/split_vantage_images/Kids_Trampoline.png',
    badge: '-15% OFF',
    color: 'bg-[#FF6B6B]',
  },
  {
    id: '4',
    slug: 'wondear-dolls-dreamhouse',
    title: 'Wondear Dolls Dreamhouse',
    category: 'Toys',
    price: '$85.00',
    rating: 4.7,
    reviews: 56,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
    color: 'bg-[#9B59B6]',
  },
];

export default function ProductListing() {
  const [activeTab, setActiveTab] = useState('All');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  const filteredProducts = activeTab === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#EAF8F9] font-quicksand text-[#2D3436] flex flex-col justify-between overflow-hidden">
      <PlayfulHeader />

      {/* Playful Floating Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 text-[#00C4B5]/20"
        >
          <Cloud className="w-24 h-24 fill-current" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute top-40 right-20 text-[#FFE66D]/40"
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-16">
        {/* Header Section */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 bg-[#FF6B6B] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md border border-white/40 mb-4">
            Explore Universes
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#2D3436]">
            Magical Toys & Kids Furniture
          </h1>
          <p className="text-[#636E72] font-semibold max-w-xl mx-auto text-lg">
            Discover our curated collection of safe, ergonomic, and purely fun equipment for your little ones.
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide mb-12 pt-4 pb-4 px-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm sm:text-base font-black transition-all cursor-pointer ${activeTab === cat
                ? 'bg-[#00C4B5] text-white shadow-md scale-105'
                : 'bg-white text-[#636E72] hover:bg-gray-50 border border-gray-200/80'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden group hover:-translate-y-1.5 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col cursor-pointer relative h-full"
              >
                {/* Badges & Actions */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-[#FF6B6B] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </div>
                )}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full border border-gray-100 flex items-center justify-center text-[#2D3436] hover:bg-[#FF6B6B] hover:text-white transition-colors shadow-sm"
                >
                  <Heart className="w-5 h-5" />
                </button>

                {/* Image Area */}
                <div className="w-full h-56 bg-white flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1 bg-white">
                  <span className="text-[#00C4B5] text-xs font-black uppercase tracking-wider mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-black text-lg text-[#2D3436] leading-tight mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-[#FFE66D]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 fill-transparent'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400 ml-1">({product.reviews})</span>
                  </div>

                  {/* Price & Enquiry Now */}
                  <div className="mt-auto flex items-center justify-between pt-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-[#2D3436]">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs font-bold text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = "tel:+919811117654";
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = "tel:+919811117654";
                        }
                      }}
                      className="px-4 py-2 bg-[#00C4B5] rounded-full text-white font-black text-xs uppercase tracking-wider hover:bg-[#FFE66D] hover:text-[#2D3436] shadow-md transition-all cursor-pointer"
                    >
                      Enquire Now
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="mt-20">
        <Footer2 />
      </div>
    </div>
  );
}