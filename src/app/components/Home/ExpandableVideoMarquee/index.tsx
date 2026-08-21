'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ExpandableVideoMarqueeProps {
  videoSrc?: string;
  mobileVideoSrc?: string;
  tickerText?: string;
  badgeText?: string;
}

export const ExpandableVideoMarquee: React.FC<ExpandableVideoMarqueeProps> = ({
  videoSrc = 'https://pub-eb2eff44950b4abfbe1564159bd1cbc8.r2.dev/video/Toy_park1.mp4.mp4',
  mobileVideoSrc = 'https://pub-eb2eff44950b4abfbe1564159bd1cbc8.r2.dev/video/Toy_park1.mp4.mp4',
  tickerText = 'play.Grow KIDS toys and Furniture • ',
  badgeText = 'NEW COLLECTION 2026',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver controlling video lazy loading & play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.05, rootMargin: '150px 0px' }
    );

    if (desktopVideoRef.current) observer.observe(desktopVideoRef.current);
    if (mobileVideoRef.current) observer.observe(mobileVideoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Track scroll progress through the container (Desktop Expand Effect)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Desktop transforms
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['36px', '0px']);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const repeatedText = Array(4).fill(tickerText).join('');

  return (
    <>
      {/* CSS Keyframes for Marquee & Clouds */}
      <style>
        {`
          @keyframes marquee-slide {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee-css {
            animation: marquee-slide 22s linear infinite;
            will-change: transform;
          }
          @keyframes drift-l2r {
            0% { transform: translateX(-20vw); }
            100% { transform: translateX(110vw); }
          }
          @keyframes drift-r2l {
            0% { transform: translateX(110vw); }
            100% { transform: translateX(-20vw); }
          }
          .animate-cloud-1 { animation: drift-l2r 32s linear infinite; }
          .animate-cloud-2 { animation: drift-r2l 38s linear infinite; animation-delay: -12s; }
          .animate-cloud-3 { animation: drift-r2l 48s linear infinite; animation-delay: -25s; }
          .animate-cloud-4 { animation: drift-l2r 52s linear infinite; animation-delay: -18s; }
          .animate-cloud-5 { animation: drift-l2r 44s linear infinite; animation-delay: -8s; }
          .animate-cloud-6 { animation: drift-r2l 36s linear infinite; animation-delay: -28s; }
        `}
      </style>

      {/* 
        ========================================================
        1. MOBILE VIEW (Visible on < sm screens)
        - Video playing at the top (16:9 native)
        - Marquee ticker & Badge written cleanly BELOW the video
        ========================================================
      */}
      <div className="block sm:hidden w-full bg-[#c7f3f7] text-[#2D3436] font-sans px-4 py-8 relative overflow-hidden select-none">
        {/* Sky Background Cloud Accents */}
        <div className="absolute top-4 left-0 z-0 w-16 pointer-events-none animate-cloud-1">
          <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto opacity-80" />
        </div>
        <div className="absolute bottom-6 right-0 z-0 w-14 pointer-events-none animate-cloud-2">
          <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto opacity-80" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4 max-w-md mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE66D] border-2 border-[#2D3436] text-[#2D3436] text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#2D3436]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badgeText}</span>
          </div>

          {/* UPPER VIDEO CONTAINER */}
          <div className="w-full aspect-video rounded-2xl border-3 border-[#2D3436] shadow-[5px_5px_0px_0px_#2D3436] bg-[#FFE66D] overflow-hidden relative">
            <video
              ref={mobileVideoRef}
              preload="none"
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={mobileVideoSrc} type="video/mp4" />
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>

          {/* BELOW TEXT SECTION (Clean text below video - No Marquee) */}
          <div className="w-full flex flex-col items-center justify-center gap-1.5 mt-2">
            <h3 className="text-sm font-black text-[#2D3436] uppercase tracking-wider text-center">
              PLAY.GROW KIDS TOYS AND FURNITURE
            </h3>
            <p className="text-center text-xs font-bold text-[#2D3436]/75 uppercase tracking-wide">
              Explore safe, bouncy & creative fun for little dreamers
            </p>
          </div>
        </div>
      </div>

      {/* 
        ========================================================
        2. DESKTOP VIEW (Visible on >= sm screens)
        - 100% UNTOUCHED original layout with full expanding animation
        ========================================================
      */}
      <div
        ref={containerRef}
        className="hidden sm:block relative w-full bg-[#c7f3f7] text-[#2D3436] font-sans antialiased selection:bg-[#FFE66D] selection:text-[#2D3436]"
        style={{ height: '160vh' }}
      >
        {/* INNER STICKY CONTAINER */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* INFINITE SCROLLING MARQUEE */}
          <motion.div
            style={{ opacity: marqueeOpacity }}
            className="absolute inset-0 flex items-center pointer-events-none z-6 overflow-hidden"
          >
            <div className="animate-marquee-css whitespace-nowrap flex text-[7.5vw] md:text-[6vw] font-black tracking-tighter select-none text-white/80 uppercase">
              <span className="pr-4">{repeatedText}</span>
              <span className="pr-4">{repeatedText}</span>
            </div>
          </motion.div>

          {/* Neubrutalist Accent Blobs */}
          <div className="absolute top-12 left-1/4 w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(255,107,107,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(78,205,196,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(255,230,109,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* SKY BACKGROUND LAYER (6 CLOUDS) */}
          <div className="absolute top-[10%] z-5 w-28 pointer-events-none animate-cloud-1">
            <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto object-contain opacity-85" />
          </div>
          <div className="absolute bottom-[15%] z-5 w-24 pointer-events-none animate-cloud-2">
            <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto object-contain opacity-80" />
          </div>
          <div className="absolute top-[18%] z-5 w-16 pointer-events-none animate-cloud-3">
            <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto object-contain opacity-70" />
          </div>
          <div className="absolute bottom-[25%] z-5 w-18 pointer-events-none animate-cloud-4">
            <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto object-contain opacity-75" />
          </div>
          <div className="absolute top-[8%] z-5 w-14 pointer-events-none animate-cloud-5">
            <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto object-contain opacity-75" />
          </div>
          <div className="absolute top-[14%] z-5 w-16 pointer-events-none animate-cloud-6">
            <img src="/assets/cloud.png" alt="Sky Cloud" className="w-full h-auto object-contain opacity-80" />
          </div>

          {/* ORIGINAL VIBRANT 5-COLOR RAINBOW */}
          <div className="absolute top-[94vh] left-1/2 -translate-x-1/2 -translate-y-full w-[200vh] max-w-none z-5 pointer-events-none opacity-100">
            <svg viewBox="0 0 100 50" fill="none" className="w-full h-auto">
              <path d="M5,50 A45,45 0 0,1 95,50" stroke="#FF6B6B" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M7.1,50 A42.9,42.9 0 0,1 92.9,50" stroke="#FCA311" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M9.2,50 A40.8,40.8 0 0,1 90.8,50" stroke="#FFE66D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M11.3,50 A38.7,38.7 0 0,1 88.7,50" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M13.4,50 A36.6,36.6 0 0,1 86.6,50" stroke="#6C4AB6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* EXPANDING VIDEO CONTAINER */}
          <motion.div
            style={{
              scale: videoScale,
              borderRadius: borderRadius,
            }}
            className="relative z-10 w-full h-full max-w-[100vw] max-h-[100vh] overflow-hidden border-3 border-[#2D3436] shadow-[6px_6px_0px_0px_#2D3436] bg-[#FFE66D] flex items-center justify-center transition-shadow duration-300 will-change-transform group"
          >
            <video
              ref={desktopVideoRef}
              preload="none"
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ExpandableVideoMarquee;