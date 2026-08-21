'use client';

import React from 'react';

export const WhyUs: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0d0d] text-white px-6 py-20 md:px-12 md:py-28 font-sans border-b border-[#222]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Text Content */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="font-kalam text-[#E3A813] text-xl font-normal lowercase mb-4 tracking-wide block">
            why us
          </span>
          <h2 className="text-white text-2xl sm:text-3xl md:text-[34px] font-bold leading-snug tracking-tight">
            With a decade of expertise, We crafts bold brands and high-impact digital experience that get results.
          </h2>
        </div>

        {/* Right Column - Premium 3D Render Image */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-[2rem] overflow-hidden border border-[#222] shadow-2xl h-[400px] md:h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
              alt="glowing artistic render representing why us"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            {/* Soft gradient overlay for visual excellence */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
