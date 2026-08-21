import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BANNERS = [
  {
    id: 'table-set',
    title: 'Kids Table & Play Sets',
    subtitle: 'Discover Amazing Offers!',
    buttonText: 'See Collection',
    href: '#shop',
    bgColor: 'bg-[#FFD400]',
    btnTextColor: 'text-[#FFB800]',
    image: '/assets/heroSubBanner/table.png',
    alt: 'Kids Table Set',
    imgMaxHeight: 'max-h-[170px] sm:max-h-[220px]',
  },
  {
    id: 'children-day',
    title: 'Children Day Collection 2023',
    subtitle: "15% Off on Kids' Toys and Gifts!",
    buttonText: 'See Collection',
    href: '#shop',
    bgColor: 'bg-[#F83B58]',
    btnTextColor: 'text-[#F83B58]',
    image: '/assets/heroSubBanner/kids_1.png',
    alt: 'Children Day Kids',
    imgMaxHeight: 'max-h-[180px] sm:max-h-[230px]',
  },
];

export const HeroSubBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-swipe functionality for desktop view
  useEffect(() => {
    if (isPaused || (typeof window !== "undefined" && window.innerWidth < 768)) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="w-full bg-white py-6 md:py-12 px-4 sm:px-6 lg:px-12 font-fredoka select-none">
      <div className="max-w-[1400px] mx-auto">

        {/* ═══ MOBILE VIEW: RECTANGLE CARD AUTO-SWIPE CAROUSEL (< md) ═══ */}
        <div 
          className="block md:hidden relative w-full overflow-hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[240px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {BANNERS.map((banner, index) => {
                if (index !== currentIndex) return null;
                return (
                  <motion.div
                    key={banner.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`w-full rounded-[2rem] ${banner.bgColor} p-6 sm:p-8 flex flex-row items-center justify-between min-h-[230px] shadow-sm`}
                  >
                    {/* Left Text Area */}
                    <div className="z-10 flex-1 max-w-[60%] pr-2">
                      <h2 className="text-xl sm:text-2xl font-extrabold !text-white drop-shadow-sm leading-[1.2] mb-2 tracking-tight">
                        {banner.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold !text-white/95 drop-shadow-sm mb-4">
                        {banner.subtitle}
                      </p>
                      <a
                        href={banner.href}
                        className={`inline-flex items-center gap-1.5 bg-white ${banner.btnTextColor} hover:bg-slate-50 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-95`}
                      >
                        <span>{banner.buttonText}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                      </a>
                    </div>

                    {/* Right Image Area */}
                    <div className="relative flex-1 w-[40%] h-full flex items-center justify-center">
                      <Image
                        src={banner.image}
                        alt={banner.alt}
                        width={200}
                        height={170}
                        className="w-full h-auto object-contain max-h-[170px] drop-shadow-sm"
                        priority={index === 0}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Swipe Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-6 bg-slate-800'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ═══ DESKTOP VIEW: 2-COLUMN GRID (>= md) ═══ */}
        <div className="hidden md:grid grid-cols-2 gap-6 md:gap-8">
          
          {/* LEFT BANNER */}
          <div
            className="relative group overflow-hidden rounded-[2.2rem] bg-[#FFD400] p-7 sm:p-10 flex flex-row items-center justify-between min-h-[260px] sm:min-h-[290px] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="z-10 flex-1 max-w-[280px] sm:max-w-[320px]">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold !text-white drop-shadow-sm leading-[1.15] mb-2 tracking-tight">
                Kids Table &amp; Play Sets
              </h2>
              <p className="text-sm sm:text-base font-semibold !text-white/95 drop-shadow-sm mb-6">
                Discover Amazing Offers!
              </p>
              <a
                href="#shop"
                className="inline-flex items-center gap-2 bg-white text-[#FFB800] hover:bg-slate-50 font-extrabold text-sm sm:text-base px-6 py-3 rounded-full transition-all shadow-sm group-hover:scale-105 active:scale-95"
              >
                <span>See Collection</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
            </div>

            <div className="relative mt-0 flex-1 h-full w-full max-w-[220px] sm:max-w-[260px] flex items-center justify-center">
              <Image
                src="/assets/heroSubBanner/table.png"
                alt="Kids Table Set"
                width={260}
                height={220}
                className="w-full h-auto object-contain max-h-[220px] transform group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </div>
          </div>

          {/* RIGHT BANNER */}
          <div
            className="relative group overflow-hidden rounded-[2.2rem] bg-[#F83B58] p-7 sm:p-10 flex flex-row items-center justify-between min-h-[260px] sm:min-h-[290px] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="z-10 flex-1 max-w-[280px] sm:max-w-[320px]">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-[1.15] mb-2 tracking-tight">
                Children Day Collection 2023
              </h2>
              <p className="text-sm sm:text-base font-semibold text-white/90 mb-6">
                15% Off on Kids&apos; Toys and Gifts!
              </p>
              <a
                href="#shop"
                className="inline-flex items-center gap-2 bg-white text-[#F83B58] hover:bg-slate-50 font-extrabold text-sm sm:text-base px-6 py-3 rounded-full transition-all shadow-sm group-hover:scale-105 active:scale-95"
              >
                <span>See Collection</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
            </div>

            <div className="relative mt-0 flex-1 h-full w-full max-w-[220px] sm:max-w-[280px] flex items-center justify-center">
              <Image
                src="/assets/heroSubBanner/kids_1.png"
                alt="Children Day Kids"
                width={280}
                height={230}
                className="w-full h-auto object-contain max-h-[230px] transform group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSubBanner;
