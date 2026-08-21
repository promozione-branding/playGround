'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ages = ['0-1 Y', '1-2 Y', '2-3 Y', '3-4 Y', '4-15 Y'];

const products = [
  {
    id: 1,
    title: 'The Brave One Box',
    ageGroup: '11 Months+',
    toysCount: 6,
    price: '2,999',
    originalPrice: '3,330',
    reviews: 149,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
  },
  {
    id: 2,
    title: 'The Go-Getter Box',
    ageGroup: '13 Months+',
    toysCount: 7,
    price: '2,999',
    originalPrice: '3,330',
    reviews: 173,
    image: '/assets/split_vantage_images/Kids_Furniture.png',
  },
  {
    id: 3,
    title: 'The Imitator Box',
    ageGroup: '16 Months+',
    toysCount: 7,
    price: '2,999',
    originalPrice: '3,330',
    reviews: 168,
    image: '/assets/split_vantage_images/Kids_Trampoline.png',
  },
  {
    id: 4,
    title: 'The Pathfinder Box',
    ageGroup: '18 Months+',
    toysCount: 8,
    price: '3,299',
    originalPrice: '3,650',
    reviews: 215,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
  },
];

export default function AgeBestsellersShowcase() {
  const [activeTab, setActiveTab] = useState('1-2 Y');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#FFFFFF] py-16 flex items-center justify-center overflow-hidden font-quicksand select-none">
      
      {/* ═══ OUT-OF-THIS-WORLD MAGICAL BACKGROUND DOODLES ═══ */}
      
      {/* 1. Floating Saturn Planet (Top Left) */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-[4%] pointer-events-none hidden xl:block opacity-75"
      >
        <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="16" fill="#FDE047" opacity="0.8" />
          <ellipse cx="32" cy="32" rx="28" ry="8" stroke="#38BDF8" strokeWidth="3" transform="rotate(-20 32 32)" />
          <circle cx="42" cy="20" r="2" fill="#F43F5E" />
        </svg>
      </motion.div>

      {/* 2. Floating Origami Crane (Top Right) */}
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 right-[5%] pointer-events-none hidden xl:block opacity-70"
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00C4B5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12l10-9 10 9-10 9L2 12z" />
          <path d="M12 3v18" />
          <path d="M12 12l8-5" />
        </svg>
      </motion.div>

      {/* 3. Cosmic Dust Sparkle Cluster (Bottom Left) */}
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-[6%] pointer-events-none hidden xl:block"
      >
        <svg width="50" height="50" viewBox="0 0 24 24" fill="#F472B6">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" opacity="0.7"/>
        </svg>
      </motion.div>

      {/* 4. Whimsical Magic Portal Ring (Bottom Right) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 right-[4%] pointer-events-none hidden xl:block opacity-40"
      >
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#34D399]" />
      </motion.div>


      {/* ═══ MAIN CONTAINER: EXACTLY 80% SCREEN WIDTH ═══ */}
      <div className="w-[92vw] lg:w-[80vw] max-w-[1320px] mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C3A3E] tracking-tight">
              Bestsellers
            </h2>
            
            {/* Animated Magnifying Glass / Scope Doodle */}
            <motion.div
              animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#649B95] mt-1"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
                <circle cx="11" cy="11" r="3" strokeDasharray="2 2" />
              </svg>
            </motion.div>
          </div>

          <p className="text-[#FF7052] font-extrabold text-sm sm:text-base mt-1 tracking-wide">
            As per your child's exact age
          </p>
        </div>

        {/* NAVIGATION TABS & EXPLORE ALL LINK */}
        <div className="flex items-center justify-between border-b border-gray-200/90 pb-2 mb-8 gap-4">
          
          {/* Age Filters */}
          <div className="flex gap-8 sm:gap-12 overflow-x-auto scrollbar-hide py-1">
            {ages.map((age) => {
              const isActive = activeTab === age;
              return (
                <button
                  key={age}
                  onClick={() => setActiveTab(age)}
                  className={`relative pb-3 text-base sm:text-lg font-black tracking-wide transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#1C3A3E]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {age}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-[-2px] left-0 right-0 h-[3.5px] bg-[#1C3A3E] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explore All Action */}
          <a
            href="#"
            className="text-[#00C4B5] font-bold text-xs sm:text-sm border-b-2 border-[#00C4B5] pb-0.5 hover:text-[#00A396] hover:border-[#00A396] transition-colors shrink-0 uppercase tracking-wider"
          >
            Explore All
          </a>
        </div>

        {/* CAROUSEL CARDS SECTION */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 lg:-left-6 top-[42%] -translate-y-1/2 w-11 h-11 rounded-full bg-[#1C3A3E] text-white flex items-center justify-center shadow-lg z-20 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#12272a] hover:scale-105 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 mr-0.5 stroke-[2.5]" />
          </button>

          {/* Cards Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-3 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-white rounded-[1.8rem] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100/80 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
              >
                <div>
                  {/* Card Image Container */}
                  <div className="h-[230px] sm:h-[250px] bg-gray-50 flex items-center justify-center relative overflow-hidden rounded-t-[1.8rem]">
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Card Details */}
                  <div className="p-5 sm:p-6">
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex text-[#FBBF24]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-gray-400">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Title & Age Tag */}
                    <h3 className="font-extrabold text-[#1C3A3E] text-base sm:text-lg leading-tight mb-1">
                      {product.title} <span className="font-bold text-gray-800 text-xs sm:text-sm ml-1">| {product.ageGroup}</span>
                    </h3>

                    {/* Toy Set Count */}
                    <p className="text-xs font-bold text-gray-400 mb-4">
                      ( Set Of {product.toysCount} Toys )
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-[#1C3A3E] text-lg sm:text-xl">
                        Rs. {product.price}
                      </span>
                      <span className="text-xs font-bold text-gray-400 line-through">
                        Rs. {product.originalPrice}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Tactile Button Footer */}
                <div className="px-5 sm:px-6 pb-6 pt-0">
                  <button className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-[#00C4B5] hover:bg-[#00A396] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider shadow-[0_4px_0_#00867B] transition-all active:shadow-none active:translate-y-[4px]">
                    Explore now
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 lg:-right-6 top-[42%] -translate-y-1/2 w-11 h-11 rounded-full bg-[#1C3A3E] text-white flex items-center justify-center shadow-lg z-20 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#12272a] hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 ml-0.5 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </section>
  );
}