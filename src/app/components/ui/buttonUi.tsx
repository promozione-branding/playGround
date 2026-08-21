'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// --- TYPES & COLOR DEFINITIONS ---
type ColorKey =
  | 'color1'
  | 'color2'
  | 'color3'
  | 'color4'
  | 'color5'
  | 'color6'
  | 'color7'
  | 'color8'
  | 'color9'
  | 'color10'
  | 'color11'
  | 'color12'
  | 'color13'
  | 'color14'
  | 'color15'
  | 'color16'
  | 'color17';

export type Colors = Record<ColorKey, string>;

// ToyPark Shades of Blue & Sea Green Liquid Palette (Strictly Blues + Sea Green)
export const defaultColors: Colors = {
  color1: '#00C4B5', // Sea Green
  color2: '#38BDF8', // Bright Sky Blue
  color3: '#0284C7', // Ocean Blue
  color4: '#62C4D2', // Brand Cyan
  color5: '#2DD4BF', // Bright Teal
  color6: '#0EA5E9', // Electric Blue
  color7: '#7DD3FC', // Light Ice Blue
  color8: '#2563EB', // Vibrant Royal Blue
  color9: '#00C4B5', // Sea Green
  color10: '#0369A1', // Deep Ocean Blue
  color11: '#62C4D2', // Brand Cyan
  color12: '#38BDF8', // Sky Blue
  color13: '#2DD4BF', // Teal
  color14: '#00C4B5', // Sea Green
  color15: '#0284C7', // Ocean Blue
  color16: '#A7F3D0', // Mint Sea Green
  color17: '#0EA5E9', // Electric Blue
};

const svgOrder = ['svg1', 'svg2', 'svg3', 'svg4', 'svg3', 'svg2', 'svg1'] as const;
type SvgKey = (typeof svgOrder)[number];

type Stop = {
  offset: number;
  stopColor: string;
};

type SvgState = {
  gradientTransform: string;
  stops: Stop[];
};

type SvgStates = Record<SvgKey, SvgState>;

const createStopsArray = (
  svgStates: SvgStates,
  svgOrder: readonly SvgKey[],
  maxStops: number
): Stop[][] => {
  const stopsArray: Stop[][] = [];
  for (let i = 0; i < maxStops; i++) {
    const stopConfigurations = svgOrder.map((svgKey) => {
      const svg = svgStates[svgKey];
      return svg.stops[i] || svg.stops[svg.stops.length - 1];
    });
    stopsArray.push(stopConfigurations);
  }
  return stopsArray;
};

type GradientSvgProps = {
  className: string;
  isHovered: boolean;
  colors: Colors;
};

const GradientSvg: React.FC<GradientSvgProps> = ({ className, isHovered, colors }) => {
  const svgStates: SvgStates = {
    svg1: {
      gradientTransform: 'translate(287.5 280) rotate(-29.0546) scale(689.807 1000)',
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color3 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.537556, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color8 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg2: {
      gradientTransform: 'translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)',
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.104167, stopColor: colors.color12 },
        { offset: 0.182292, stopColor: colors.color13 },
        { offset: 0.28125, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.453125, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.75, stopColor: colors.color14 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color1 },
      ],
    },
    svg3: {
      gradientTransform: 'translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)',
      stops: [
        { offset: 0, stopColor: colors.color1 },
        { offset: 0.188423, stopColor: colors.color2 },
        { offset: 0.307292, stopColor: colors.color1 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.442708, stopColor: colors.color15 },
        { offset: 0.537556, stopColor: colors.color16 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.725645, stopColor: colors.color17 },
        { offset: 0.817779, stopColor: colors.color9 },
        { offset: 0.84375, stopColor: colors.color10 },
        { offset: 0.90569, stopColor: colors.color1 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
    svg4: {
      gradientTransform: 'translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)',
      stops: [
        { offset: 0.109375, stopColor: colors.color11 },
        { offset: 0.171875, stopColor: colors.color2 },
        { offset: 0.260417, stopColor: colors.color13 },
        { offset: 0.328792, stopColor: colors.color4 },
        { offset: 0.328892, stopColor: colors.color5 },
        { offset: 0.328992, stopColor: colors.color1 },
        { offset: 0.442708, stopColor: colors.color6 },
        { offset: 0.515625, stopColor: colors.color7 },
        { offset: 0.631738, stopColor: colors.color1 },
        { offset: 0.692708, stopColor: colors.color8 },
        { offset: 0.817708, stopColor: colors.color9 },
        { offset: 0.869792, stopColor: colors.color10 },
        { offset: 1, stopColor: colors.color11 },
      ],
    },
  };

  const maxStops = Math.max(...Object.values(svgStates).map((svg) => svg.stops.length));
  const stopsAnimationArray = createStopsArray(svgStates, svgOrder, maxStops);
  const gradientTransform = svgOrder.map((svgKey) => svgStates[svgKey].gradientTransform);

  const variants = {
    hovered: {
      gradientTransform: gradientTransform,
      transition: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'linear' as const },
    },
    notHovered: {
      gradientTransform: gradientTransform,
      transition: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: 'linear' as const },
    },
  };

  return (
    <svg
      className={className}
      width="1030"
      height="280"
      viewBox="0 0 1030 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1030" height="280" rx="140" fill="url(#paint0_radial_905_231)" />
      <defs>
        <motion.radialGradient
          id="paint0_radial_905_231"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          animate={isHovered ? variants.hovered : variants.notHovered}
        >
          {stopsAnimationArray.map((stopConfigs, index) => (
            <AnimatePresence key={index}>
              <motion.stop
                initial={{
                  offset: stopConfigs[0].offset,
                  stopColor: stopConfigs[0].stopColor,
                }}
                animate={{
                  offset: stopConfigs.map((config) => config.offset),
                  stopColor: stopConfigs.map((config) => config.stopColor),
                }}
                transition={{
                  duration: isHovered ? 15 : 30,
                  ease: 'linear',
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </AnimatePresence>
          ))}
        </motion.radialGradient>
      </defs>
    </svg>
  );
};

type LiquidProps = {
  isHovered: boolean;
  colors: Colors;
  buttonType?: boolean;
};

export const Liquid: React.FC<LiquidProps> = ({ isHovered, colors }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full bg-gradient-to-r from-[#0284C7] via-[#00C4B5] to-[#62C4D2]">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className={`absolute ${index < 3 ? 'w-[443px] h-[121px]' : 'w-[756px] h-[207px]'} opacity-90 ${
            index === 0
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-normal'
              : index === 1
                ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg] mix-blend-screen'
                : index === 2
                  ? 'top-1/2 left-1/2 -translate-x-[53%] -translate-y-[53%] rotate-[-11.61deg] mix-blend-lighten'
                  : index === 3
                    ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg] mix-blend-normal'
                    : index === 4
                      ? 'top-1/2 left-1/2 -translate-x-[57%] -translate-y-1/2 rotate-[-29.722deg] mix-blend-screen'
                      : index === 5
                        ? 'top-1/2 left-1/2 -translate-x-[62%] -translate-y-[24%] rotate-[160.227deg] mix-blend-lighten'
                        : 'top-1/2 left-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180 mix-blend-normal'
          }`}
        >
          <GradientSvg className="w-full h-full" isHovered={isHovered} colors={colors} />
        </div>
      ))}
    </div>
  );
};

// --- INTERACTIVE BUTTON COMPONENT ---
export const LiquidButton: React.FC<{
  text?: string;
  colors?: Colors;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}> = ({ text = 'Explore Magic ✨', colors = defaultColors, onClick, className = '', children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-full overflow-hidden shadow-xl transition-all duration-300 active:scale-95 hover:scale-105 border-2 border-white/60 cursor-pointer group flex items-center justify-center gap-2 ${
        className || 'px-10 py-5'
      }`}
    >
      {/* Liquid Animation Layer */}
      <Liquid isHovered={isHovered} colors={colors} />

      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 text-white font-extrabold tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] flex items-center gap-2">
        {children || text}
      </span>
    </button>
  );
};

// --- DEMO SHOWCASE ---
export default function LiquidShowcase() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-extrabold text-white tracking-tight">
        Liquid Gradient Animation
      </h1>
      
      <LiquidButton />
    </div>
  );
}