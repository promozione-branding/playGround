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
    title: 'Wholesale Supply',
    subtitle: 'Order in bulk with flexible quantities.',
    badge: 'Bulk Ready',
    bgColor: 'bg-white',
    iconBg: 'bg-teal-50',
    borderColor: 'border-slate-100 hover:border-slate-200',
    textColor: 'text-slate-500',
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        {/* Box 1 */}
        <path
          d="M4 10.5L11 7L18 10.5V18.5L11 22L4 18.5V10.5Z"
          fill="#00C4B5"
        />
        <path
          d="M11 7V14L18 10.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Box 2 */}
        <path
          d="M16 15.5L23 12L30 15.5V23.5L23 27L16 23.5V15.5Z"
          fill="#0D1E3E"
        />
        <path
          d="M23 12V19L30 15.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Plus */}
        <path
          d="M8 25.5H13"
          stroke="#00C4B5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10.5 23V28"
          stroke="#00C4B5"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  },

  {
    title: 'Business Support',
    subtitle: 'Quick help from enquiry to delivery.',
    badge: '24/7',
    bgColor: 'bg-white',
    iconBg: 'bg-rose-50',
    borderColor: 'border-slate-100 hover:border-slate-200',
    textColor: 'text-slate-500',
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
      >
        {/* Headset */}
        <path
          d="M7 18V16C7 10.4772 11.4772 6 17 6C22.5228 6 27 10.4772 27 16V18"
          stroke="#FF6B6B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Left Ear */}
        <path
          d="M7 17H6C4.89543 17 4 17.8954 4 19V22C4 23.1046 4.89543 24 6 24H8V17H7Z"
          fill="#FF6B6B"
        />

        {/* Right Ear */}
        <path
          d="M27 17H28C29.1046 17 30 17.8954 30 19V22C30 23.1046 29.1046 24 28 24H26V17H27Z"
          fill="#FF6B6B"
        />

        {/* Microphone */}
        <path
          d="M26 23C25.2 27 21.8 29 17 29H14"
          stroke="#0D1E3E"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle
          cx="13"
          cy="29"
          r="2"
          fill="#0D1E3E"
        />

        {/* 24/7 */}
        <text
          x="17"
          y="20"
          fill="#0D1E3E"
          fontSize="7"
          fontWeight="800"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          24/7
        </text>
      </svg>
    )
  },

  {
    title: 'Manufacturing Experience',
    subtitle: 'Built on experience. Made for scale.',
    badge: '20+ Years',
    bgColor: 'bg-white',
    iconBg: 'bg-teal-50',
    borderColor: 'border-slate-100 hover:border-slate-200',
    textColor: 'text-slate-500',
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        {/* Factory */}
        <path
          d="M4 28V13L12 17V13L20 17V9H28V28H4Z"
          fill="#00C4B5"
        />

        {/* Factory roof/details */}
        <path
          d="M20 9H28V13H20V9Z"
          fill="#0D1E3E"
        />

        {/* Windows */}
        <rect
          x="22"
          y="16"
          width="3"
          height="3"
          rx="0.5"
          fill="white"
        />

        <rect
          x="22"
          y="21"
          width="3"
          height="3"
          rx="0.5"
          fill="white"
        />

        {/* Door */}
        <rect
          x="8"
          y="22"
          width="4"
          height="6"
          fill="#0D1E3E"
        />

        {/* 20+ */}
        <text
          x="16"
          y="12"
          fill="#0D1E3E"
          fontSize="7"
          fontWeight="800"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          20+
        </text>
      </svg>
    )
  },

  {
    title: 'Packed. Protected. Ready.',
    subtitle: 'Packed carefully for safe transit',
    badge: 'Secure Packaging',
    bgColor: 'bg-white',
    iconBg: 'bg-rose-50',
    borderColor: 'border-slate-100 hover:border-slate-200',
    textColor: 'text-slate-500',
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
      >
        {/* Package */}
        <path
          d="M5 10L17 5L29 10V24L17 30L5 24V10Z"
          fill="#FF6B6B"
        />

        {/* Package top */}
        <path
          d="M5 10L17 16L29 10"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Center line */}
        <path
          d="M17 16V30"
          stroke="white"
          strokeWidth="1.8"
        />

        {/* Tape */}
        <path
          d="M14 7L20 10"
          stroke="#0D1E3E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Shield */}
        <path
          d="M17 17L22 19V22C22 25 20 26.5 17 28C14 26.5 12 25 12 22V19L17 17Z"
          fill="#0D1E3E"
        />

        {/* Check */}
        <path
          d="M14.5 22L16.2 23.7L19.5 20.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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