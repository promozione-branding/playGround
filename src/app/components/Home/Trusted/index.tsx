'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlurTextEffect } from '../../ui/BlurTextEffect';

export const TrustBannerSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FFFFFF] pt-8 pb-14 px-6 sm:px-12 md:pt-10 md:pb-20 overflow-hidden select-none">
      
      {/* ═══ PLAYFUL PASTEL AMBIENT BLOBS ═══ */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* ═══ FLOATING CORNER ILLUSTRATIONS (Moved Closer to Text) ═══ */}

      {/* Top Left Icon - Cloud */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 left-8 sm:left-20 md:left-32 lg:left-44 w-16 sm:w-20 md:w-24 pointer-events-none z-10"
      >
        <Image
          src="/assets/icons/icon1.avif"
          alt="Cloud Illustration"
          width={100}
          height={100}
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* Top Right Icon - Jumping Mascot */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [3, -5, 3] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="absolute top-6 right-8 sm:right-20 md:right-32 lg:right-44 w-20 sm:w-24 md:w-28 pointer-events-none z-10"
      >
        <Image
          src="/assets/icons/icon_mastcoff.avif"
          alt="Jumping Mascot Illustration"
          width={120}
          height={120}
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* Bottom Left Icon - Mascot */}
      <motion.div
        animate={{ scale: [0.98, 1.08, 0.98], rotate: [-6, 6, -6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-8 sm:left-20 md:left-32 lg:left-44 w-20 sm:w-24 md:w-28 pointer-events-none z-10"
      >
        <Image
          src="/assets/icons/icon_mastcoff2.avif"
          alt="Mascot Illustration"
          width={120}
          height={120}
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* Bottom Right Icon - Saturn Planet */}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute bottom-6 right-8 sm:right-20 md:right-32 lg:right-44 w-18 sm:w-22 md:w-26 pointer-events-none z-10"
      >
        <Image
          src="/assets/icons/icon3.avif"
          alt="Saturn Planet Illustration"
          width={140}
          height={140}
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>


      {/* ═══ MAIN CENTER CONTENT ═══ */}
      <div className="max-w-4xl mx-auto text-center relative z-20 flex flex-col items-center pt-2 sm:pt-4">

        {/* Main Headline with Straight Highlight Pill */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-slate-800 tracking-tight leading-snug sm:leading-tight mb-8 max-w-3xl">
          <BlurTextEffect>Why Is Toy Park The </BlurTextEffect>{' '}
          <span className="inline-block relative my-1 sm:my-0 px-4 py-1.5 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] shadow-sm">
            <BlurTextEffect className="text-[#0284C7]">
              Most Trusted Kids Equipment
            </BlurTextEffect>
          </span>{' '}
          <BlurTextEffect>Manufacturer In India?</BlurTextEffect>
        </h2>

        {/* Descriptive Body Paragraphs in a Soft Creamy Card */}
        <div className="space-y-4 text-slate-700 font-medium text-base sm:text-lg leading-relaxed max-w-2xl bg-white/70 p-6 sm:p-8 rounded-3xl border border-amber-200/60 shadow-sm">
          <p>
            <BlurTextEffect>
              Here at Toy Park, we aim to provide high-quality manufacturing with our toys, setups, Playground equipment, etc. This equipment helps in shaping young minds with motor skills, cognition, and creativity while having fun!
            </BlurTextEffect>
          </p>

          <p>
            <BlurTextEffect>
              Our collection provides the Best indoor as well as outdoor Playground equipment in India. Our designs are safe, innovative, and diverse to suit the requirements of every age group.
            </BlurTextEffect>
          </p>
        </div>

      </div>

    </section>
  );
};

export default TrustBannerSection;