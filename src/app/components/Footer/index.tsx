'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const PastelB2BFooter: React.FC = () => {
  const menuLinks = [
    { name: 'Collections', href: '/products' },
    { name: 'Materials & Safety', href: '/about' },
    { name: 'Sustainability', href: '/whoweare' },
    { name: 'Exhibition', href: '/exhibition' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'B2B Portal', href: '/about' },
    { name: 'Contact Us', href: '/whoweare' },
  ];
  const socialLinks = ['Instagram', 'Pinterest', 'LinkedIn', 'Facebook'];

  return (
    <footer className="relative w-full bg-[#FAFAF5] text-slate-800 px-6 py-10 md:px-12 md:py-16 font-sans overflow-hidden">
      
      {/* 1. Large Top Headline */}
      <div className="group flex justify-between items-center border-b border-orange-200/60 pb-6 mb-4 sm:mb-6 cursor-pointer">
        <h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight text-slate-800 uppercase leading-none inline-block origin-left group-hover:text-[#A5C4B4] transition-colors duration-300"
          style={{ transform: 'scaleY(1.1)', transformOrigin: 'left' }}
        >
          TOYPARK
        </h1>
        <span className="text-5xl md:text-7xl text-slate-300 font-light group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-[#A5C4B4] transition-all duration-300">
          ↗
        </span>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-12">
        
        {/* Sprout Brand Block - Rounded Soft Peach Card */}
        <div className="lg:col-span-3 bg-[#FFDBCC] text-orange-950 p-6 rounded-[2.5rem] flex flex-col justify-between shadow-sm">
          <div>
            {/* Toy Park Brand Logo */}
            <img
              src="/assets/ToyPark_logo.png"
              alt="Toy Park Logo"
              className="h-16 sm:h-20 w-auto object-contain object-left -ml-1 -mt-2 mb-2"
            />
            <p className="text-sm font-semibold leading-relaxed text-orange-950 pr-2">
              Premium wholesale children's furniture designed in Stockholm.
            </p>
          </div>
          <p className="mt-4 text-[10px] text-orange-900/60 font-medium uppercase tracking-widest">
            © 2026 Toy Park. All rights reserved.
          </p>
        </div>

        {/* Menu Navigation Column */}
        <div className="lg:col-span-2 flex flex-col justify-start lg:border-r border-orange-200/60 lg:pr-8">
          <ul className="flex flex-col w-full border-t border-orange-200/60">
            {menuLinks.map((link) => (
              <li 
                key={link.name} 
                className="border-b border-orange-200/60"
              >
                <a
                  href={link.href}
                  className="flex items-center justify-between py-4 text-lg font-semibold text-slate-600 hover:text-[#E79482] cursor-pointer group transition-colors duration-200"
                >
                  <span>{link.name}</span>
                  <span className="text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-[#E79482]">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links Column */}
        <div className="lg:col-span-2 flex flex-col justify-start lg:border-r border-orange-200/60 lg:pr-8 pt-2 lg:pt-0">
          <h3 className="font-serif italic text-[#A5C4B4] text-xl mb-5 lowercase tracking-wide">
            follow us
          </h3>
          <ul className="space-y-4">
            {socialLinks.map((social) => (
              <li 
                key={social} 
                className="text-base font-medium text-slate-500 hover:text-slate-800 cursor-pointer transition-colors duration-200"
              >
                {social}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Wholesale Access Section */}
        <div className="lg:col-span-5 flex flex-col justify-between relative pl-0 lg:pl-10 pt-4 lg:pt-0 min-h-[300px]">
          {/* Infinite Marquee in the background */}
          <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none z-0">
            <motion.div
              animate={{ x: [0, -320] }}
              transition={{
                ease: "linear",
                duration: 15,
                repeat: Infinity,
              }}
              className="flex whitespace-nowrap gap-10 text-[5rem] lg:text-[6rem] font-black text-slate-200/40 uppercase tracking-tighter"
            >
              <span className="mr-8">SAFE • PLAYFUL •</span>
              <span className="mr-8">SAFE • PLAYFUL •</span>
              <span className="mr-8">SAFE • PLAYFUL •</span>
            </motion.div>
          </div>



          {/* Top Content */}
          <div className="relative z-10 max-w-[70%] mt-2">
            <h3 className="font-serif italic text-[#A5C4B4] text-xl mb-3 lowercase tracking-wide">
              b2b newsletter
            </h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Sign up for wholesale updates, new collections, and sustainable material reports.
            </p>
          </div>

          {/* Bottom Input Area separated by a horizontal border */}
          <div className="relative z-30 border-t border-orange-200/60 pt-6 mt-6">
            <div className="flex flex-col sm:flex-row gap-0 max-w-[90%] relative z-30 shadow-sm rounded-xl">
              <input 
                type="email" 
                placeholder="Retailer Email Address" 
                className="flex-1 px-5 py-4 bg-white border border-slate-200 rounded-xl sm:rounded-r-none text-sm font-medium focus:outline-none focus:border-[#E79482] text-slate-700 placeholder-slate-400 transition-colors z-30"
              />
              <button className="px-8 py-4 bg-[#A5C4B4] hover:bg-[#8FB09F] text-white font-bold rounded-xl sm:rounded-l-none text-sm transition-colors duration-200 z-30 sm:-ml-[1px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Reach Out Footer Bar */}
      <div className="pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <span className="font-serif italic text-[#E79482] text-xl lowercase block mb-1">
            wholesale inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-800 tracking-tight leading-none hover:text-[#E79482] cursor-pointer transition-colors duration-200 mt-2">
            sales@toypark.in
          </h2>
        </div>
        <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
          CRAFTED WITH CARE
        </div>
      </div>
    </footer>
  );
};

export default PastelB2BFooter;