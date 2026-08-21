'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      title: 'Money Return',
      subtitle: 'Back guarantee under 7 days',
      badge: '7-Day Guarantee',
      bgColor: 'bg-white',
      iconBg: 'bg-teal-50',
      borderColor: 'border-slate-100 hover:border-slate-200',
      textColor: 'text-slate-500',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-[-10deg] group-hover:scale-110">
          <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28" stroke="#00C4B5" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4" stroke="#00C4B5" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 6"/>
          <path d="M4 12L4 16L8 16" stroke="#00C4B5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M28 20L28 16L24 16" stroke="#00C4B5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 9C14.3431 9 13 10.3431 13 12V13C11.3431 13 10 14.3431 10 16V20C10 21.6569 11.3431 23 13 23H19C20.6569 23 22 21.6569 22 20V16C22 14.3431 20.6569 13 19 13V12C19 10.3431 17.6569 9 16 9Z" fill="#00C4B5"/>
          <path d="M13 12H19" stroke="#00C4B5" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 9L18 9" stroke="#00C4B5" strokeWidth="3" strokeLinecap="round"/>
          <text x="16" y="19.5" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">$</text>
        </svg>
      )
    },
    {
      title: 'Member Discount',
      subtitle: 'On orders over $2000',
      badge: 'Save Big',
      bgColor: 'bg-white',
      iconBg: 'bg-rose-50',
      borderColor: 'border-slate-100 hover:border-slate-200',
      textColor: 'text-slate-500',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <path d="M16 3C16 3 8 10.5 8 18.5C8 23.1944 11.5817 27 16 27C20.4183 27 24 23.1944 24 18.5C24 10.5 16 3 16 3Z" fill="#FF6B6B"/>
          <text x="16" y="21.5" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">%</text>
        </svg>
      )
    },
    {
      title: 'Home Delivery',
      subtitle: 'Free delivery to your door',
      badge: 'Free Shipping',
      bgColor: 'bg-white',
      iconBg: 'bg-teal-50',
      borderColor: 'border-slate-100 hover:border-slate-200',
      textColor: 'text-slate-500',
      icon: (
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-110">
          <path d="M5 12C5 10.8954 5.89543 10 7 10H17V20H7C5.89543 20 5 19.1046 5 18V12Z" fill="#00C4B5"/>
          <path d="M17 12H21.5L24 15.5V20H17V12Z" fill="#0D1E3E"/>
          <path d="M2 13H5" stroke="#00C4B5" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 16H4" stroke="#00C4B5" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 19H5" stroke="#00C4B5" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="10" cy="21" r="2.5" fill="#0D1E3E"/>
          <circle cx="20" cy="21" r="2.5" fill="#0D1E3E"/>
          <circle cx="10" cy="21" r="1" fill="white"/>
          <circle cx="20" cy="21" r="1" fill="white"/>
        </svg>
      )
    },
    {
      title: '24/7 Support',
      subtitle: 'Dedicated support in 24hrs',
      badge: 'Fast Support',
      bgColor: 'bg-white',
      iconBg: 'bg-rose-50',
      borderColor: 'border-slate-100 hover:border-slate-200',
      textColor: 'text-slate-500',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110">
          <path d="M16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 6"/>
          <path d="M25 7L28 4L29 8" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.2792 10.3802C11.5177 9.14173 12.8711 9.4796 13.9234 10.5319L14.733 11.3415C15.8239 12.4324 15.6983 13.8055 14.5126 14.9912L13.7828 15.721C14.7211 17.5186 16.2759 18.9959 18.1504 19.8524L18.8471 19.1557C20.0329 17.97 21.4059 17.8444 22.4969 18.9353L23.3065 19.7449C24.3588 20.7972 24.6966 22.1506 23.4582 23.3891C22.5034 24.3439 20.8933 24.8143 19.0601 24.3298C15.7483 23.4545 11.528 20.2157 9.69976 17.1517C8.68536 15.4516 8.56708 13.6844 9.13524 12.4172C9.44439 11.7278 9.84365 11.2332 10.2792 10.3802Z" fill="#FF6B6B"/>
          <text x="12" y="15" fill="#0D1E3E" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">24H</text>
        </svg>
      )
    }
  ];

  // Group features into pairs of 2 for mobile slides
  const mobileFeaturePairs = [
    [features[0], features[1]],
    [features[2], features[3]],
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#E0F8F8] to-[#D2F2F2] px-3 sm:px-6 lg:px-12 pt-5 pb-2 sm:py-6 font-quicksand overflow-hidden select-none">
      
      {/* Floating Umbrella Accent */}
      <div className="absolute top-2 sm:top-3 right-3 sm:right-10 z-20 pointer-events-none opacity-90">
        <div className="relative animate-bounce duration-1000">
          <svg width="38" height="38" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-6 sm:w-12 sm:h-12 transition-transform duration-300 drop-shadow-md">
            <path d="M32 8C16.536 8 4 20.536 4 36H18C18 32.686 24.284 30 32 30C39.716 30 46 32.686 46 36H60C60 20.536 47.464 8 32 8Z" fill="#FF6B6B" />
            <path d="M18 36C18 20.536 24.284 8 32 8C24.284 8 18 20.536 18 36Z" fill="#4ECDC4" />
            <path d="M46 36C46 20.536 39.716 8 32 8C39.716 8 46 20.536 46 36Z" fill="#FFE66D" />
            <path d="M32 4V8" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <path d="M32 36V50C32 53.3137 29.3137 56 26 56C22.6863 56 20 53.3137 20 50" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="46" r="1.8" fill="#38BDF8" />
            <circle cx="56" cy="44" r="2" fill="#38BDF8" />
          </svg>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 📱 MOBILE VIEW: AUTO-SWIPE TWO CARDS AT A TIME (< sm) */}
        <div className="block sm:hidden w-full relative pb-5">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={12}
            loop={true}
            autoplay={false}
            pagination={{
              clickable: true,
            }}
            className="w-full features-grid-swiper !pb-5"
          >
            {mobileFeaturePairs.map((pair, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-2 gap-3">
                  {pair.map((feature, fIdx) => (
                    <FeatureCard key={fIdx} feature={feature} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🖥️ DESKTOP VIEW: 4-COLUMN GRID (>= sm) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

      </div>

      {/* Custom Swiper Pagination Styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .features-grid-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #F97316;
          opacity: 0.35;
          transition: all 0.3s ease;
        }
        .features-grid-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #F97316;
          opacity: 1;
        }
        .features-grid-swiper .swiper-pagination {
          bottom: -4px !important;
        }
      ` }} />
    </section>
  );
};

// Reusable Feature Card Component
const FeatureCard: React.FC<{ feature: any }> = ({ feature }) => {
  return (
    <div
      className={`group relative flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-5 rounded-2xl p-3.5 sm:p-6 border-2 ${feature.borderColor} ${feature.bgColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer shadow-sm h-full`}
    >
      {/* Icon Circle Box */}
      <div className={`flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${feature.iconBg} shadow-sm border border-white/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
        {feature.icon}
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center sm:items-start">
        <span className={`text-[9px] sm:text-[11px] font-black uppercase tracking-wider ${feature.textColor} mb-0.5 hidden sm:inline-block`}>
          {feature.badge}
        </span>
        <h3 className="text-xs sm:text-[17.5px] font-black text-[#1E293B] tracking-tight group-hover:text-[#F97316] transition-colors leading-snug">
          {feature.title}
        </h3>
        <p className="mt-0.5 text-[10px] sm:text-[13.5px] font-bold text-slate-500 leading-snug line-clamp-2">
          {feature.subtitle}
        </p>
      </div>
    </div>
  );
};

export default FeaturesGrid;