'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Cloud } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { title: 'Games and puzzle', image: '/assets/favcategories/hero6a.png', bg: 'bg-[#FFE66D]' },
  { title: 'Indoor Play', image: '/assets/favcategories/hero6b.png', bg: 'bg-[#FF6B6B]' },
  { title: 'Kids Books', image: '/assets/favcategories/hero6c.png', bg: 'bg-[#4ECDC4]' },
  { title: 'Rockers & Rides', image: '/assets/favcategories/hero6d.png', bg: 'bg-[#9B59B6]' },
];

export const ShopByCategories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || (typeof window !== "undefined" && window.innerWidth < 768)) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative w-full bg-[#00C4B5] py-4 md:py-6 px-4 md:px-8 overflow-hidden font-quicksand">
      {/* Background Decorative Layer: Pure CSS animations for zero JS thread overhead */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -10px, 0) rotate(6deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .anim-float { animation: floatSlow 6s ease-in-out infinite; will-change: transform; }
        .anim-pulse { animation: pulseGlow 4s ease-in-out infinite; will-change: transform; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="anim-float absolute top-8 right-16 hidden md:flex text-white/90">
          <Cloud className="w-7 h-7 stroke-[2.5]" />
        </div>
        <div className="anim-pulse absolute bottom-4 left-1/4 hidden lg:flex text-[#FFE66D]">
          <Star className="w-5 h-5 fill-[#FFE66D] stroke-none" />
        </div>
        <div className="anim-pulse absolute bottom-6 right-[15%] hidden md:flex text-white/90">
          <Sparkles className="w-6 h-6 stroke-[2]" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4 flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-1 tracking-tight">
            Shop by Categories
          </h2>
          <p className="text-white/90 text-xs md:text-sm max-w-lg leading-relaxed font-semibold">
            Explore our wide range of play products carefully designed for your child&apos;s growth and entertainment.
          </p>
        </div>

        {/* Mobile View: Carousel */}
        <div
          className="block sm:hidden relative w-full overflow-hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[220px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {categories.map((cat, index) => {
                if (index !== currentIndex) return null;
                return (
                  <Link href={"/products"}>
                    <motion.div
                      key={cat.title}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="w-[90%] max-w-[340px] bg-white rounded-[1.75rem] py-5 px-6 flex flex-col items-center justify-center cursor-pointer shadow-md mx-auto"
                    >
                      <div className={`w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4 relative z-10 ${cat.bg}`}>
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          width={64}
                          height={64}
                          className="object-contain drop-shadow-sm"
                          priority={index === 0}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-[#0D1C3A] text-center">
                        {cat.title}
                      </h3>
                    </motion.div>
                  </Link>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to category ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: Pure GPU Grid (Eliminated JS Stagger Overheads) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link href={"/products"}>
            <div
              key={index}
              className="group bg-white rounded-[1.75rem] p-5 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-[95px] h-[95px] md:w-[110px] md:h-[110px] rounded-full flex items-center justify-center mb-3.5 ${cat.bg} group-hover:scale-105 transition-transform duration-300`}>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={72}
                  height={72}
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#0D1C3A] text-center group-hover:text-[#FF6B6B] transition-colors duration-200">
                {cat.title}
              </h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategories;