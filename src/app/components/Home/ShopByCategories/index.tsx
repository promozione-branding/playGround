'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Cloud } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { title: 'Table & Board Games' ,href:"/products?cat=table-board-games" ,image: '/cat/board-games.webp', bg: 'bg-[#FFE66D]' },
  { title: 'Trampoline & Spares', href:"/products?cat=trampoline-spares", image: '/cat/tampoline.webp', bg: 'bg-[#FF6B6B]' },
  { title: 'Soft Play & Equipments', href:"products?cat=soft-play-exercising-equipment", image: '/cat/softplay.webp', bg: 'bg-[#4ECDC4]' },
  { title: 'Educational Ais', href:"/products?cat=educational-aids" ,image: '/cat/education.webp', bg: 'bg-[#9B59B6]' },
  { title: 'Playschool Furniture', href:"/products?cat=playschool-furniture" ,image: '/cat/furniture.webp', bg: 'bg-[#FF6B6B]' },
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

  useEffect(() => {
  if (isPaused || categories.length <= 2) return;

  const totalSlides = Math.ceil(categories.length / 2);

  const interval = setInterval(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next >= totalSlides ? 0 : next;
    });
  }, 3000);

  return () => clearInterval(interval);
}, [categories.length, isPaused]);

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
  <div className="w-full overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="grid grid-cols-2 gap-3 w-full px-3"
      >
        {categories
          .slice(currentIndex * 2, currentIndex * 2 + 2)
          .map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="w-full"
            >
              <div className="w-full bg-white rounded-[1.5rem] py-5 px-3 flex flex-col items-center justify-center shadow-md">
                
                <div className="w-full flex items-center justify-center mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] object-cover rounded-3xl"
                  />
                </div>

                <h3 className="text-base font-bold text-[#0D1C3A] text-center line-clamp-2">
                  {cat.title}
                </h3>

              </div>
            </Link>
          ))}
      </motion.div>
    </AnimatePresence>
  </div>

  {/* Dots */}
  <div className="flex justify-center items-center gap-2 mt-4">
    {Array.from({
      length: Math.ceil(categories.length / 2),
    }).map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`h-2 rounded-full transition-all duration-300 ${
          currentIndex === index
            ? "w-6 bg-white"
            : "w-2 bg-white/40"
        }`}
      />
    ))}
  </div>
</div>

        {/* Desktop View: Pure GPU Grid (Eliminated JS Stagger Overheads) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link href={cat.href}>
            <div
              key={index}
              className="group bg-white rounded-[1.75rem] p-5 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-[95px] h-[95px] md:w-[130px] md:h-[110px] rounded-full flex items-center justify-center mb-3.5  group-hover:scale-105 transition-transform duration-300`}>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={100}
                  height={100}
                  className="object-cover w-full rounded-3xl drop-shadow-sm"
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