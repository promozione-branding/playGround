import React from 'react';
import { Award, PackageCheck, Building2, ShieldCheck, Rocket, Sparkles, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const stats = [
  { id: 1, value: "15+", label: "Years B2B Excellence", icon: Award },
  { id: 2, value: "500+", label: "Toy & Furniture Models", icon: PackageCheck },
  { id: 3, value: "1,200+", label: "Wholesale Clients", icon: Building2 },
  { id: 4, value: "100%", label: "Safety Certified Products", icon: ShieldCheck },
];

const b2bSchedules = [
  { 
    id: 1, 
    name: "Start Small, Scale Smart", 
    time: "Wholesale orders from just 50 units",
    icon: Rocket,
    bgColor: "bg-amber-50 text-amber-500",
  },
  { 
    id: 2, 
    name: "Make It Yours", 
    time: "OEM & private-label branding available",
    icon: Sparkles,
    bgColor: "bg-pink-50 text-rose-500",
  },
  { 
    id: 3, 
    name: "Real People. Real Support.", 
    time: "Mon – Sat | 9 AM – 7 PM",
    icon: Headphones,
    bgColor: "bg-teal-50 text-teal-500",
  },
];
 
const BusinessStats = () => {
  return (
    <section className="w-full relative bg-white pt-2 pb-4 sm:py-16 font-quicksand overflow-hidden">
      {/* CYAN BLUE SECTION */}
      <div className="relative max-w-7xl mx-auto bg-[#00C4B5] rounded-3xl sm:rounded-[3rem] px-4 sm:px-12 pt-8 pb-16 sm:py-16 lg:py-24 mb-1 sm:mb-20 lg:mb-32 shadow-xl">
        
        {/* Animated Floating Sun Icon */}
        <motion.div 
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 6, -6, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-10 right-10 sm:right-20 text-yellow-400 pointer-events-none z-10 hidden sm:block drop-shadow-md"
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="22" />
            <path d="M50 15 L50 5 M85 50 L95 50 M50 85 L50 95 M15 50 L5 50 M75 25 L82 18 M75 75 L82 82 M25 75 L18 82 M25 25 L18 18" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <circle cx="43" cy="45" r="3" fill="#1e1e1e" />
            <circle cx="57" cy="45" r="3" fill="#1e1e1e" />
            <path d="M43 55 Q50 63 57 55" stroke="#1e1e1e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
 
        {/* Mobile & Tablet Slider (2 Stats Auto-Swipe) */}
        <div className="block lg:hidden w-full relative z-20">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            autoplay={false}
            loop={true}
            modules={[Autoplay]}
            className="w-full pb-2"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <SwiperSlide key={stat.id} className="flex justify-center">
                  <div className="flex flex-col items-center text-center text-white px-2 py-1 w-full">
                    <div className="mb-2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-black mb-0.5 tracking-tight drop-shadow-xs">{stat.value}</h3>
                    <p className="text-[11px] font-bold text-white/95 tracking-wide leading-tight">{stat.label}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Desktop View (Static Row of 4 Stats) */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative z-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className={`flex flex-col items-center text-center text-white relative px-2 py-1 ${
                  index !== stats.length - 1 ? 'border-r border-white/30 border-dashed' : ''
                }`}
              >
                <div className="mb-4 w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-4xl lg:text-5xl font-black mb-1 tracking-tight drop-shadow-xs">{stat.value}</h3>
                <p className="text-base font-bold text-white/95 tracking-wide leading-tight">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
 
      {/* YELLOW SECTION */}
      <div className="relative z-30 max-w-6xl mx-auto -mt-12 sm:-mt-28 lg:-mt-48 px-3 sm:px-6">
        <div className="bg-[#FFD400] rounded-3xl p-5 sm:p-12 lg:p-16 shadow-lg flex flex-col lg:flex-row gap-6 sm:gap-12 lg:gap-16 relative overflow-hidden border-2 border-white/60">
          
          {/* Arrow up circle (bottom right) */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-105 transition-transform z-20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
 
          {/* Left: Text */}
          <div className="flex-1 lg:border-r lg:border-black/10 lg:border-dashed lg:pr-12">
            <div className="inline-flex items-center gap-1.5 bg-[#00C4B5] text-white px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-sm font-extrabold tracking-wide mb-3 sm:mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
              B2B Trade &amp; Wholesale
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1A30] leading-tight mb-3 sm:mb-6 relative inline-block">
              Stock What Kids Love.
              {/* Squiggly red underline */}
              <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#FF6B6B]" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20, 100 10 T 200 10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </h2>

            <p className="hidden sm:block text-[#0B1A30]/85 font-semibold leading-relaxed text-xs sm:text-base mt-3 max-w-md">
              Why settle for ordinary products when you can stock toys and kids’ furniture designed to catch attention, deliver quality, and keep customers coming back? Get direct wholesale access, flexible order quantities, and customization options.
            </p>
          </div>
 
          {/* Right: B2B Schedule Cards */}
          <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-4 pb-6 sm:pb-0">
            {b2bSchedules.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:px-6 sm:py-4.5 flex items-center gap-3.5 sm:gap-5 shadow-sm hover:shadow-md transition-all border border-black/5"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${item.bgColor} flex-shrink-0 flex items-center justify-center shadow-xs`}>
                    <ItemIcon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-[#0B1A30] text-sm sm:text-base leading-snug">{item.name}</span>
                    <span className="font-semibold text-gray-500 text-xs sm:text-sm mt-0.5 leading-snug">{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusinessStats;
