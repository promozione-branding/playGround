'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const word = "with framer-motion";

interface AnimatedLetterProps {
  letter: string;
  scrollYProgress: MotionValue<number>;
}

const AnimatedLetter = ({ letter, scrollYProgress }: AnimatedLetterProps) => {
  const [randomOffset, setRandomOffset] = useState(0);
  
  useEffect(() => {
    // Generates a random offset on the client side to avoid hydration mismatches
    setRandomOffset(Math.floor(Math.random() * -75) - 25);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, randomOffset]);
  
  return (
    <motion.span 
      style={{ top: y, position: 'relative', display: 'inline-block' }}
      className="inline-block"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
};

export default function Parralex() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });
  
  // Transform values for different parallax scroll speeds
  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const images = [
    { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', y: 0 },
    { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', y: lg },
    { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80', y: md }
  ];

  return (
    <div ref={container} className="relative mt-[10vh] min-h-screen overflow-hidden bg-black py-20 text-white font-sans">
      <div className="ml-[10vw] mb-12 relative z-10">
        <motion.h1 
          style={{ y: sm }} 
          className="m-0 mt-2.5 text-[8vw] md:text-[6vw] leading-none uppercase font-black tracking-tighter text-white"
        >
          Parallax
        </motion.h1>
        <h1 className="m-0 text-[8vw] md:text-[6vw] leading-none uppercase font-black tracking-tighter text-zinc-700">
          Scroll
        </h1>
        <div className="mt-4">
          <p className="text-[#E3A813] m-0 text-[3vw] md:text-[2vw] uppercase tracking-widest font-mono">
            {word.split("").map((letter, i) => (
              <AnimatedLetter 
                key={`l_${i}`} 
                letter={letter} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </p>
        </div>
      </div>
      
      {/* Parallax Images Canvas */}
      <div className="flex w-full justify-center relative mt-[5vh] h-[80vh]">
        {images.map(({src, y}, i) => (
          <motion.div 
            style={{ y }} 
            key={`i_${i}`} 
            className={`absolute overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl transition-shadow duration-300 hover:shadow-amber-500/5 ${
              i === 0 
                ? 'left-[15vw] top-[5vh] h-[55vh] w-[40vh] md:h-[60vh] md:w-[48vh] z-10' 
                : i === 1 
                  ? 'left-[55vw] top-[15vh] h-[35vh] w-[26vh] md:h-[40vh] md:w-[32vh] z-20' 
                  : 'left-[35vw] top-[38vh] h-[22vh] w-[18vh] md:h-[26vh] md:w-[22vh] z-30'
            }`}
          >
            <img 
              src={src}
              alt={`parallax image ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}