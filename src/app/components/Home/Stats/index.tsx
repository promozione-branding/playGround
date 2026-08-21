'use client';

import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0d0d] text-white px-6 py-20 md:px-12 md:py-28 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Fashion image with RAMA logo overlay */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-[2rem] overflow-hidden border border-[#222] shadow-2xl h-[450px] md:h-[550px] bg-gradient-to-b from-[#0284c7] to-[#38bdf8]">
            {/* Sky Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1509825833088-f82f5202b4d9?auto=format&fit=crop&w=800&q=80"
              alt="blue sky backdrop"
              className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
              loading="lazy"
            />

            {/* Hand & Yellow Cap Graphics / Image overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6">
              {/* Yellow baseball cap photo */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 select-none animate-pulse duration-[3000ms]">
                <img 
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
                  alt="yellow cap"
                  className="w-full h-full object-contain mix-blend-multiply filter contrast-125"
                  loading="lazy"
                />
                
                {/* Custom black RAMA embroidered logo superimposed on the front of the cap */}
                <div className="absolute top-[48%] left-[49%] -translate-x-1/2 -translate-y-1/2 scale-[0.65] md:scale-[0.75] opacity-90 text-neutral-950 font-black">
                  <svg className="w-16 h-10" viewBox="0 0 120 80" fill="currentColor">
                    <path d="M10 10h30v12H24v23H10V10z" />
                    <path fillRule="evenodd" d="M52 10h42v35H82v-5c-2 3-5 5-9 5h-13c-5 0-8-3-8-8V23c0-5 3-8 8-8h13c4 0 7 2 9 5v-5z M66 22h8v11h-8V22z" />
                    <path d="M10 50h42v35H40V70h-6v15H22V70h-6v15H10V50z" />
                    <path fillRule="evenodd" d="M52 50h42v35H82v-5c-2 3-5 5-9 5h-13c-5 0-8-3-8-8V63c0-5 3-8 8-8h13c4 0 7 2 9 5v-5z M66 62h8v11h-8V62z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* RAMA branding watermark in bottom corner */}
            <div className="absolute bottom-6 left-8 z-20">
              <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest font-bold">
                RAMA Studio Merch
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Stats list */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="border-t border-[#222] divide-y divide-[#222]">
            
            {/* Stat 1 */}
            <div className="flex justify-between items-center py-8">
              <div className="flex items-baseline font-bold text-white tracking-tighter">
                <span className="text-6xl sm:text-7xl">90</span>
                <span className="text-6xl sm:text-7xl text-[#E3A813] ml-0.5">+</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-neutral-400 max-w-[260px] text-right leading-snug">
                Projects completed to date.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex justify-between items-center py-8">
              <div className="flex items-baseline font-bold text-white tracking-tighter">
                <span className="text-6xl sm:text-7xl">100</span>
                <span className="text-6xl sm:text-7xl text-[#E3A813] ml-0.5">%</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-neutral-400 max-w-[260px] text-right leading-snug">
                Client satisfaction rate.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex justify-between items-center py-8">
              <div className="flex items-baseline font-bold text-white tracking-tighter">
                <span className="text-6xl sm:text-7xl text-[#E3A813] mr-1">$</span>
                <span className="text-6xl sm:text-7xl">14</span>
                <span className="text-6xl sm:text-7xl text-[#E3A813] ml-1">M+</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-neutral-400 max-w-[260px] text-right leading-snug">
                Client successful fund raise.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
