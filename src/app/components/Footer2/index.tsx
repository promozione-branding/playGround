'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Printer, ArrowRight, Cloud, Send } from 'lucide-react';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.66 1.94 2.89 2.89 0 0 1 5.66-1.94V9.4a6.84 6.84 0 0 0-5.66 5.63 6.81 6.81 0 0 0 13.6 0 58.3 58.3 0 0 0 5.25-5.63z" />
  </svg>
);

const Footer2 = () => {
  return (
    <footer className="relative bg-white pt-4 sm:pt-16 pb-[160px] sm:pb-48 md:pb-60 lg:pb-72 font-quicksand text-gray-600 overflow-hidden">
      
      {/* ═══ TOP SCALLOPED FLUFFY CLOUD WAVE DIVIDER ═══ */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none -translate-y-[98%] text-white">
        <svg 
          className="relative block w-full h-10 sm:h-16 md:h-20 lg:h-24" 
          viewBox="0 0 283.5 25" 
          preserveAspectRatio="none" 
        >
          <path 
            className="fill-white" 
            d="M265.8 3.5c-10.9 0-15.9 6.2-15.9 6.2s-3.6-3.5-9.2-.9c-9.1 4.1-4.4 13.4-4.4 13.4s-1.2.2-1.9.9c-.6.7-.5 1.9-.5 1.9s-1-.5-2.3-.2c-1.3.3-1.6 1.4-1.6 1.4s.4-3.4-1.5-5c-3.9-3.4-8.3-.2-8.3-.2s-.6-.7-.9-.9c-.4-.2-1.2-.2-1.2-.2s-4.4-3.6-11.5-2.6-10.4 7.9-10.4 7.9-.5-3.3-3.9-4.9c-4.8-2.4-7.4 0-7.4 0s2.4-4.1-1.9-6.4-6.2 1.2-6.2 1.2-.9-.5-2.1-.5-2.3 1.1-2.3 1.1.1-.7-1.1-1.1c-1.2-.4-2 0-2 0s3.6-6.8-3.5-8.9c-6-1.8-7.9 2.6-8.4 4-.1-.3-.4-.7-.9-1.1-1-.7-1.3-.5-1.3-.5s1-4-1.7-5.2c-2.7-1.2-4.2 1.1-4.2 1.1s-3.1-1-5.7 1.4-2.1 5.5-2.1 5.5-.9 0-2.1.7-1.4 1.7-1.4 1.7-1.7-1.2-4.3-1.2c-2.6 0-4.5 1.2-4.5 1.2s-.7-1.5-2.8-2.4c-2.1-.9-4 0-4 0s2.6-5.9-4.7-9c-7.3-3.1-12.6 3.3-12.6 3.3s-.9 0-1.9.2c-.9.2-1.5.9-1.5.9S99.4 3 94.9 3.9c-4.5.9-5.7 5.7-5.7 5.7s-2.8-5-12.3-3.9-11.1 6-11.1 6-1.2-1.4-4-.7c-.8.2-1.3.5-1.8.9-.9-2.1-2.7-4.9-6.2-4.4-3.2.4-4 2.2-4 2.2s-.5-.7-1.2-.7h-1.4s-.5-.9-1.7-1.4-2.4 0-2.4 0-2.4-1.2-4.7 0-3.1 4.1-3.1 4.1-1.7-1.4-3.6-.7c-1.9.7-1.9 2.8-1.9 2.8s-.5-.5-1.7-.2c-1.2.2-1.4.7-1.4.7s-.7-2.3-2.8-2.8c-2.1-.5-4.3.2-4.3.2s-1.7-5-11.1-6c-3.8-.4-6.6.2-8.5 1v21.2h283.5V11.1c-.9.2-1.6.4-1.6.4s-5.2-8-16.1-8z"
          />
        </svg>
      </div>

      {/* ═══ FLOATING BACKGROUND CLOUDS (MOBILE + DESKTOP) ═══ */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <motion.div
          animate={{ x: ['-30vw', '115vw'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-6 sm:top-10 left-0 text-[#38BDF8]/20"
        >
          <Cloud className="w-12 h-12 sm:w-20 sm:h-20 stroke-[1.8] fill-[#38BDF8]/5" />
        </motion.div>

        <motion.div
          animate={{ x: ['-35vw', '115vw'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear', delay: 8 }}
          className="absolute top-20 sm:top-28 left-0 text-[#00C4B5]/15"
        >
          <Cloud className="w-16 h-16 sm:w-28 sm:h-28 stroke-[1.8] fill-[#00C4B5]/5" />
        </motion.div>
      </div>

      {/* --- Top Content Section --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-4">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-1 sm:space-y-4 lg:col-span-3">
            {/* Logo */}
            <Link href="/" className="inline-block -mt-2 sm:-mt-5 mb-0 sm:mb-1">
              <Image 
                src="/assets/clean_logo_toypark.webp" 
                alt="ToyPark Logo" 
                width={320}
                height={120}
                className="h-20 sm:h-28 md:h-34 w-auto max-w-[260px] sm:max-w-[320px] object-contain transform hover:scale-105 transition-transform" 
              />
            </Link>

            {/* Contact Info List */}
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-3 text-gray-700 hover:text-[#00C4B5] transition-colors">
                <div className="w-7 h-7 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 text-[#00C4B5] mt-0.5">
                  <MapPin size={15} />
                </div>
                <span className="font-semibold leading-snug">6391 Elgin St. Celina, Delaware 10299</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 hover:text-[#00C4B5] transition-colors">
                <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-500">
                  <Phone size={15} />
                </div>
                <span className="font-semibold">+000-1234-456789</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 hover:text-[#00C4B5] transition-colors">
                <div className="w-7 h-7 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0 text-[#FF6B6B]">
                  <Mail size={15} />
                </div>
                <span className="font-semibold">toypark@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 hover:text-[#00C4B5] transition-colors">
                <div className="w-7 h-7 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-500">
                  <Printer size={15} />
                </div>
                <span className="font-semibold">+000-1234-55000</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Group Container */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:col-span-6 gap-6 sm:gap-4 lg:grid-cols-6">
            {/* Column 2: About Us */}
            <div className="lg:col-span-2">
              <h3 className="text-lg sm:text-[20px] font-black text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2">
                <span>About Us</span>
              </h3>
              <div className="w-8 sm:w-10 h-1 bg-[#FF6B6B] mb-3 sm:mb-6 rounded-full"></div>
              <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Our Story', href: '/ourstory' },
                  { name: 'Who We Are', href: '/whoweare' },
                  { name: 'Why Choose Us', href: '/why-choose-us' },
                  { name: 'Careers', href: '/careers' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-600 hover:text-[#FF6B6B] font-extrabold transition-colors duration-200 inline-block hover:translate-x-1 transform">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: News & Events */}
            <div className="lg:col-span-2">
              <h3 className="text-lg sm:text-[20px] font-black text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2">
                <span>News &amp; Events</span>
              </h3>
              <div className="w-8 sm:w-10 h-1 bg-amber-400 mb-3 sm:mb-6 rounded-full"></div>
              <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base">
                {[
                  { name: 'Exhibition', href: '/exhibition' },
                  { name: 'Blogs & Journal', href: '/blogs' },
                  { name: 'Gallery Showcase', href: '/gallery' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-600 hover:text-amber-400 font-extrabold transition-colors duration-200 inline-block hover:translate-x-1 transform">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Customer Support */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2 pt-2 sm:pt-0">
              <h3 className="text-lg sm:text-[20px] font-black text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-2">
                <span>Customer Support</span>
              </h3>
              <div className="w-8 sm:w-10 h-1 bg-[#00C4B5] mb-3 sm:mb-6 rounded-full"></div>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-3 text-sm sm:text-base">
                {['Contact Us', 'Store List', 'Opening Hours', 'Returns & Exchanges', 'Refund & Returns', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 hover:text-[#00C4B5] font-bold transition-colors duration-200 inline-block hover:translate-x-1 transform">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 5: Newsletter Card */}
          <div className="lg:col-span-3 flex flex-col lg:mb-4 bg-[#BDECF0] px-4 pt-4 pb-6 sm:px-5 sm:pt-5 sm:pb-8 rounded-2xl sm:rounded-3xl text-[#0F2942] shadow-sm relative overflow-hidden border border-[#00C4B5]/20">
            <div className="relative z-10 flex-1 flex flex-col">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#00C4B5] text-white px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
                  <Send className="w-3 h-3 text-white" />
                  Stay Updated
                </div>

                <h3 className="text-lg sm:text-[20px] font-black text-[#0F2942] mb-1 leading-tight">
                  Subscribe Our Newsletter
                </h3>
                
                <p className="text-sm sm:text-base mb-3 text-[#0F2942]/80 leading-relaxed font-semibold">
                  Never miss our latest toy releases, deals, and play guides.
                </p>
                
                {/* Input Form */}
                <div className="relative flex items-center w-full mb-3">
                  <div className="absolute left-3 text-gray-400">
                    <Mail size={15} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full py-2.5 pl-9 pr-11 rounded-xl border border-white/60 focus:outline-none focus:bg-white bg-white text-slate-800 text-sm sm:text-base shadow-xs transition-all font-semibold placeholder:text-gray-400"
                  />
                  <button className="absolute right-1 top-1 bottom-1 bg-[#00C4B5] hover:bg-[#00b0a2] text-white px-3 rounded-lg transition-all flex items-center justify-center shadow-sm hover:scale-105 active:scale-95">
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2 mt-auto pt-4">
                {[FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, TiktokIcon].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-8 h-8 rounded-xl bg-white hover:bg-[#00C4B5] text-[#0F2942] hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Animated Grass & Children Section --- */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
        
        {/* Animated Child 1 */}
        <motion.div 
          className="absolute z-20 left-[2%] sm:left-[5%] lg:left-[5%] bottom-[15px] sm:bottom-[60px] md:bottom-[70px] lg:bottom-[83px] w-20 sm:w-32 md:w-36 lg:w-[177px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image 
            src="/assets/Footer_images/Child1.svg" 
            alt=""
            width={177}
            height={200}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Animated Child 2 */}
        <motion.div 
          className="absolute z-20 right-[2%] sm:right-[5%] lg:right-[6%] bottom-[20px] sm:bottom-[70px] md:bottom-[85px] lg:bottom-[100px] w-20 sm:w-32 md:w-36 lg:w-[147px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image 
            src="/assets/Footer_images/child2.svg" 
            alt=""
            width={147}
            height={180}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Static Grass Image */}
        <Image 
          src="/assets/Footer_images/greengrass.png" 
          alt=""
          width={1920}
          height={435}
          className="w-full object-cover object-top h-[140px] sm:h-[220px] md:h-[300px] lg:h-[435px]"
        />

        {/* Copyright Bar */}
        <div className="absolute bottom-2 sm:bottom-3 w-full text-center z-30 pointer-events-auto text-white/90 text-[10px] sm:text-sm font-medium px-4">
          © 2024 toyup. All Rights Reserved by RadiusTheme
        </div>
      </div>

    </footer>
  );
};

export default Footer2;