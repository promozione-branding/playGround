'use client';

// UNUSED EXPERIMENTAL COMPONENT - COMMENTED OUT
export const NovaLandingPage = () => null;
export default NovaLandingPage;

/*
import React, { useRef, useEffect } from 'react';

const HexagonIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const NovaLandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let rafId: number;
    let targetProgress = 0;
    let smoothedProgress = 0;
    
    let isReady = video.readyState >= 1; 

    const onReady = () => { isReady = true; };
    if (!isReady) {
      video.addEventListener('loadedmetadata', onReady);
    }

    let isSeeking = false;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = container.scrollHeight - window.innerHeight;
      
      if (total > 0) {
        targetProgress = Math.max(0, Math.min(1, scrolled / total));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const tick = () => {
      smoothedProgress += (targetProgress - smoothedProgress) * 0.08;

      if (isReady && video.duration && !isNaN(video.duration) && !isSeeking) {
        const seekTo = smoothedProgress * (video.duration - 0.05);
        if (Math.abs(video.currentTime - seekTo) > 0.1) {
          isSeeking = true;
          video.currentTime = seekTo;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const onSeeked = () => {
      isSeeking = false;
    };
    video.addEventListener('seeked', onSeeked);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white font-sans antialiased selection:bg-white/20" style={{ minHeight: '300vh' }}>

      <div className="fixed inset-0 z-0 bg-[#0a0a0a] overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/video/animate_onscroll_video.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      <div className="relative z-10">

        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/15 bg-black/20 px-5 sm:px-8 md:px-12 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HexagonIcon className="w-6 h-6 text-white" />
              <span className="text-lg sm:text-xl font-medium tracking-tight">novaai</span>
            </div>
            <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm text-white/85">
              <a href="#projects" className="hover:text-white transition-colors flex items-center gap-0.5">
                Projects <sup className="font-mono text-[10px] text-white/60">6</sup>
              </a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <button className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs sm:px-5 sm:text-sm hover:bg-white/25 transition-all">
              Get Free Consultation
            </button>
          </div>
        </nav>

        <section className="min-h-screen pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 flex flex-col justify-between max-w-7xl mx-auto">

          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-start pt-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">/ AI AUTOMATION</span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">/ AI INTEGRATION</span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">/ AI AGENT DEVELOPMENT</span>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md max-w-xs sm:text-right">
              We design automation that brings clarity, precision, and efficiency to the way your company operates.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between pt-16">
            <div>
              <div className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] mb-5">
                We Automate 100+ Businesses
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
                Clear. Precise.<br />
                Automated.
              </h1>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/15 p-3">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85"
                alt="Mitha, co-founder of NovaAI"
                className="h-24 w-20 rounded-lg object-cover"
              />
              <div className="flex flex-col gap-1.5 pr-2">
                <span className="text-sm font-medium text-white">Talk with Mitha</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">Co-founder of NovaAI</span>
                <button className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 transition-all">
                  Book 15-mins call
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[80vh]" aria-hidden="true" />

        <section className="min-h-screen pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 flex flex-col justify-between max-w-7xl mx-auto">

          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
            <div className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em]">
              Insight On Demand
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md max-w-sm sm:text-right">
              Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.
            </p>
          </div>

          <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-16 pt-16">

            <div className="max-w-xl">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
                Learn to see<br />brilliantly.
              </h2>
              <p className="mt-6 max-w-md text-sm sm:text-base text-white/80 drop-shadow-md leading-relaxed">
                From the first sketch to the final render, Nova turns raw intent into decisions your team can act on — quietly, precisely, at speed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 transition-all">
                  Run the demo <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
                <button className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 transition-all">
                  Free consultation
                </button>
              </div>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 sm:px-6">
              <div className="flex gap-5 py-5 border-b border-white/15 group cursor-pointer">
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">01</span>
                <div>
                  <div className="flex items-center justify-between text-base sm:text-lg font-medium text-white">
                    <span>Real-time vision</span>
                    <ChevronRightIcon className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">Reads context as it happens and surfaces what matters before you ask.</p>
                </div>
              </div>
              <div className="flex gap-5 py-5 border-b border-white/15 group cursor-pointer">
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">02</span>
                <div>
                  <div className="flex items-center justify-between text-base sm:text-lg font-medium text-white">
                    <span>Layered insight</span>
                    <ChevronRightIcon className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">Moves from rough outline to sharp output without losing the thread.</p>
                </div>
              </div>
              <div className="flex gap-5 py-5 group cursor-pointer">
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">03</span>
                <div>
                  <div className="flex items-center justify-between text-base sm:text-lg font-medium text-white">
                    <span>Adaptive speed</span>
                    <ChevronRightIcon className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">Learns your cadence and tightens every pass as you work.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};
*/