'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import CountUp from 'react-countup';

export const ParallaxStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(statsRef, { once: false, margin: '-15% 0px -15% 0px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Light, responsive spring for an effortless momentum feeling
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 22,
    mass: 0.08,
    stiffness: 80,
  });

  // ═══ CONTINUOUS PARALLAX MAPPING (NO FLAT LOCK ZONES) ═══
  
  // Slide 1: Moves smoothly up and out as soon as you scroll
  const leftTextY = useTransform(smoothProgress, [0, 0.6], ['0vh', '-110vh']); 
  const rightImageY = useTransform(smoothProgress, [0, 0.6], ['0vh', '-80vh']);
  const slide1Opacity = useTransform(smoothProgress, [0.15, 0.45], [1, 0]);

  // Slide 2: Continuous sweep from bottom -> through center -> out the top
  // - Starts off-screen at 105vh
  // - Crosses center (0vh) around ~0.5 progress
  // - Exits top (-105vh) at 1.0 progress smoothly
  const leftImageY = useTransform(smoothProgress, [0.1, 0.5, 1], ['105vh', '0vh', '-105vh']); 
  const rightStatsY = useTransform(smoothProgress, [0.15, 0.55, 1], ['120vh', '0vh', '-115vh']); 
  
  const slide2Opacity = useTransform(smoothProgress, [0.15, 0.35, 0.8, 0.95], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white text-neutral-900 selection:bg-[#E3A813]/20 selection:text-[#a87a00]"
      style={{ height: '220vh' }} // Optimal height so it doesn't drag on too long
    >
      {/* Background Accent Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#E3A813]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-amber-200/20 blur-[160px] pointer-events-none rounded-full" />

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full h-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="relative w-full h-full">
            
            {/* SLIDE 1 TEXT */}
            <motion.div 
              style={{ y: leftTextY, opacity: slide1Opacity }} 
              className="absolute inset-0 flex flex-col justify-center z-20 pointer-events-none"
            >
              <div className="w-full max-w-md space-y-6 pointer-events-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E3A813]/30 bg-[#E3A813]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3A813]" />
                  <span className="font-mono text-[#a87a00] text-[10px] font-bold uppercase tracking-widest">
                    Why Us
                  </span>
                </div>
                <h2 className="text-neutral-900 text-4xl sm:text-5xl md:text-[50px] font-bold leading-[1.1] tracking-tight">
                  With a decade of expertise, we craft bold brands and high-impact digital experiences that get results.
                </h2>
              </div>
            </motion.div>

            {/* SLIDE 2 TALL CAP CARD (Takes ~85% Viewport Height) */}
            <motion.div 
              style={{ y: leftImageY, opacity: slide2Opacity }}
              className="absolute inset-0 flex flex-col justify-center z-30"
            >
              <div className="w-full h-[82vh] rounded-[2rem] overflow-hidden shadow-2xl relative group bg-neutral-100 border border-neutral-200/80">
                <img
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80"
                  alt="RAMA Yellow Cap Backdrop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-black/5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#E3A813]" />
                  <span className="text-neutral-700 text-[11px] uppercase font-mono tracking-widest font-bold">
                    RAMA Studio Design System
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="relative w-full h-full">
            
            {/* SLIDE 1 GRADIENT IMAGE */}
            <motion.div 
              style={{ y: rightImageY, opacity: slide1Opacity }}
              className="absolute inset-0 flex flex-col justify-center z-10 pointer-events-none"
            >
              <div className="w-full rounded-[2rem] overflow-hidden shadow-xl h-[450px] border border-neutral-200/60 pointer-events-auto">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                  alt="Abstract gradient"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* SLIDE 2 STATS COUNTER */}
            <motion.div
              ref={statsRef}
              style={{ y: rightStatsY, opacity: slide2Opacity }}
              className="absolute inset-0 flex flex-col justify-center z-40"
            >
              <div className="w-full max-w-[520px]">
                <div className="flex flex-col divide-y divide-neutral-200/80">
                  
                  {/* Stat 1 */}
                  <div className="flex justify-between items-center py-8">
                    <div className="flex items-baseline gap-1 font-extrabold tracking-tighter">
                      <span className="text-6xl sm:text-7xl md:text-8xl text-neutral-900">
                        {isInView ? <CountUp end={90} duration={2} /> : 0}
                      </span>
                      <span className="text-5xl sm:text-6xl text-[#E3A813]">+</span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-500 text-right leading-tight font-medium max-w-[160px]">
                      Projects completed to date.
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex justify-between items-center py-8">
                    <div className="flex items-baseline gap-1 font-extrabold tracking-tighter">
                      <span className="text-6xl sm:text-7xl md:text-8xl text-neutral-900">
                        {isInView ? <CountUp end={100} duration={2.5} /> : 0}
                      </span>
                      <span className="text-5xl sm:text-6xl text-[#E3A813]">%</span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-500 text-right leading-tight font-medium max-w-[160px]">
                      Client satisfaction rate.
                    </p>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex justify-between items-center py-8">
                    <div className="flex items-baseline gap-1 font-extrabold tracking-tighter">
                      <span className="text-5xl sm:text-6xl text-[#E3A813]">$</span>
                      <span className="text-6xl sm:text-7xl md:text-8xl text-neutral-900">
                        {isInView ? <CountUp end={14} duration={3} /> : 0}
                      </span>
                      <span className="text-5xl sm:text-6xl text-[#E3A813]">M+</span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-500 text-right leading-tight font-medium max-w-[160px]">
                      Client successful fund raise.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ParallaxStats;