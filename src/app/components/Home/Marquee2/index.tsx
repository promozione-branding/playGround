'use client';

import React from 'react';
import { Flame } from 'lucide-react';

export default function Marquee2() {
  const marqueeText = "Toy Park Kids Toys & Furniture";

  const items = [
    { text: marqueeText },
    { text: marqueeText },
    { text: marqueeText },
    { text: marqueeText },
    { text: marqueeText },
    { text: marqueeText },
  ];

  return (
    <section className="relative w-full bg-[#00BFA6] text-white py-4 sm:py-5 overflow-hidden font-quicksand select-none border-y border-[#00A38D] shadow-sm">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .animate-marquee-fast {
          animation: marqueeScroll 20s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="flex whitespace-nowrap min-w-full">
        <div className="flex gap-16 items-center pr-16 animate-marquee-fast">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-5 text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white animate-pulse" />
              <span>{item.text}</span>
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-5 text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white animate-pulse" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
