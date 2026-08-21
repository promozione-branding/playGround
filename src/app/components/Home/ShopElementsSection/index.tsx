'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * ----------------------------------------------------------------------
 * MOBILE POSITIONING CONFIGURATION (Applies strictly to screens < 640px)
 * ----------------------------------------------------------------------
 * You can manually tweak position and size for each element on mobile view.
 * Values can be percentage strings ('45%') or pixel strings ('20px').
 * 
 * - bottom: Controls Up / Down positioning
 * - left / right: Controls Left / Right positioning
 * - width / height: Controls element size on mobile
 */
export const DEFAULT_MOBILE_CONFIG = {
  cat: {
    bottom: '63%',   // Up/Down (increase to move UP, decrease to move DOWN)
    left: '4%',      // Left/Right position
    width: '48px',   // Size on mobile
  },
  zebra: {
    bottom: '45%',   // Up/Down (increase to move UP, decrease to move DOWN)
    left: '26%',     // Left/Right position
    width: '50px',   // Size on mobile
  },
  mouse: {
    bottom: '53%',   // Up/Down (increase to move UP, decrease to move DOWN)
    left: '70%',     // Left/Right position
    width: '54px',   // Size on mobile
  },
  giraffe: {
    bottom: '60%',   // Up/Down (increase to move UP, decrease to move DOWN)
    right: '6%',     // Left/Right position
    width: '58px',   // Size on mobile
  },
  foregroundCloud: {
    bottom: '10px',   // Up/Down offset (increase to move UP)
    height: '160px', // Cloud height on mobile
  },
};

export type MobileConfigType = Partial<typeof DEFAULT_MOBILE_CONFIG>;

const MouseSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
    <circle cx="30" cy="35" r="20" fill="#E2B4B4"/>
    <circle cx="70" cy="35" r="20" fill="#E2B4B4"/>
    <circle cx="30" cy="35" r="12" fill="#F4D3D3"/>
    <circle cx="70" cy="35" r="12" fill="#F4D3D3"/>
    <path d="M 20 100 Q 20 45 50 45 Q 80 45 80 100 Z" fill="#D2E0E0"/>
    <circle cx="40" cy="65" r="4" fill="#333"/>
    <circle cx="60" cy="65" r="4" fill="#333"/>
    <circle cx="50" cy="75" r="5" fill="#333"/>
    <path d="M 35 75 L 20 70 M 35 78 L 20 80" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M 65 75 L 80 70 M 65 78 L 80 80" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

interface ShopElementsProps {
  bgColor?: string;
  mobileConfig?: MobileConfigType;
}

export default function ShopElementsSection({ 
  bgColor = "bg-white",
  mobileConfig = {}
}: ShopElementsProps) {
  // Merge user custom config with defaults
  const config = {
    cat: { ...DEFAULT_MOBILE_CONFIG.cat, ...mobileConfig.cat },
    zebra: { ...DEFAULT_MOBILE_CONFIG.zebra, ...mobileConfig.zebra },
    mouse: { ...DEFAULT_MOBILE_CONFIG.mouse, ...mobileConfig.mouse },
    giraffe: { ...DEFAULT_MOBILE_CONFIG.giraffe, ...mobileConfig.giraffe },
    foregroundCloud: { ...DEFAULT_MOBILE_CONFIG.foregroundCloud, ...mobileConfig.foregroundCloud },
  };

  return (
    <section className={`relative w-full ${bgColor} pt-12 pb-0 overflow-hidden`}>
      {/* Clouds and Characters Area */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] flex items-end justify-center">
        
        {/* Background Cloud (Cloud 3) */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
        >
          <img 
            src="/assets/clouds/cloud3.png" 
            alt="Background Cloud" 
            className="w-full h-full object-cover object-top opacity-70"
          />
        </motion.div>

        {/* Characters between clouds */}
        {/* Cat */}
        <motion.div 
          className="absolute bottom-[var(--mob-bottom)] sm:bottom-[35%] left-[var(--mob-left)] sm:left-[5%] z-[5] w-[var(--mob-width)] sm:w-26 cursor-pointer pointer-events-auto"
          style={{
            '--mob-bottom': config.cat.bottom,
            '--mob-left': config.cat.left,
            '--mob-width': config.cat.width,
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            whileHover={{ y: -20, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img 
              src="/assets/clouds/cat-halloween-kitty-svgrepo-com.svg" 
              alt="Cat"
              className="w-full h-auto drop-shadow-md"
            />
          </motion.div>
        </motion.div>

        {/* Zebra */}
        <motion.div 
          className="absolute bottom-[var(--mob-bottom)] sm:bottom-[38%] left-[var(--mob-left)] sm:left-[25%] z-[5] w-[var(--mob-width)] sm:w-30 cursor-pointer pointer-events-auto"
          style={{
            '--mob-bottom': config.zebra.bottom,
            '--mob-left': config.zebra.left,
            '--mob-width': config.zebra.width,
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            whileHover={{ y: -20, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img 
              src="/assets/clouds/zebra-svgrepo-com.svg" 
              alt="Zebra"
              className="w-full h-auto drop-shadow-md"
            />
          </motion.div>
        </motion.div>

        {/* Mouse */}
        <motion.div 
          className="absolute bottom-[var(--mob-bottom)] sm:bottom-[40%] left-[var(--mob-left)] sm:left-[60%] -translate-x-1/2 z-[5] w-[var(--mob-width)] sm:w-32 cursor-pointer pointer-events-auto"
          style={{
            '--mob-bottom': config.mouse.bottom,
            '--mob-left': config.mouse.left,
            '--mob-width': config.mouse.width,
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          whileInView={{ opacity: 1, y: 0, x: "-50%" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            whileHover={{ y: -20, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <MouseSVG />
          </motion.div>
        </motion.div>

        {/* Giraffe */}
        <motion.div 
          className="absolute bottom-[var(--mob-bottom)] sm:bottom-[28%] right-[var(--mob-right)] sm:right-[15%] z-[5] w-[var(--mob-width)] sm:w-32 cursor-pointer pointer-events-auto"
          style={{
            '--mob-bottom': config.giraffe.bottom,
            '--mob-right': config.giraffe.right,
            '--mob-width': config.giraffe.width,
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            whileHover={{ y: -20, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img 
              src="/assets/clouds/giraffe-svgrepo-com.svg" 
              alt="Giraffe"
              className="w-full h-auto drop-shadow-md"
            />
          </motion.div>
        </motion.div>

        {/* Foreground Cloud (Cloud 2) */}
        <motion.div 
          className="absolute bottom-[var(--mob-bottom)] sm:bottom-0 left-0 w-full h-[var(--mob-height)] sm:h-[180px] md:h-[230px] z-10 pointer-events-none"
          style={{
            '--mob-bottom': config.foregroundCloud.bottom,
            '--mob-height': config.foregroundCloud.height,
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
        >
          <motion.div
            className="w-full h-full pointer-events-none"
            animate={{
              x: [12, -12, 12],
              y: [3, -3, 3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img 
              src="/assets/clouds/cloud2.png" 
              alt="Foreground Cloud" 
              className="w-full h-full object-cover object-bottom pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
