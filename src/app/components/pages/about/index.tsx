'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ============================================================================
// 1. CUSTOM HOOK: The "Brain" for our scroll animations
// ============================================================================
function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop watching once it appears to save memory
        }
      },
      { threshold }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect(); // Cleanup on unmount
  }, [threshold]);

  return { isVisible, domRef };
}

// ============================================================================
// 2. HELPER COMPONENTS: The Animators (Optimized)
// ============================================================================

// A wrapper that animates whole blocks of content (images, divs, etc.)
const ScrollReveal = ({ children, baseClass, activeClass, className = '' }: any) => {
  const { isVisible, domRef } = useIntersectionObserver();

  return (
    <div
      ref={domRef}
      className={`transition-[transform,opacity] duration-1000 ease-out ${
        isVisible ? activeClass : baseClass
      } ${className}`}
    >
      {children}
    </div>
  );
};

// A specialized text animator that reveals a sentence word-by-word
const StaggeredTextReveal = ({ text, className = '' }: { text: string; className?: string }) => {
  const { isVisible, domRef } = useIntersectionObserver();
  const words = text.split(' '); 

  return (
    <p ref={domRef} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-[transform,opacity] duration-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }} 
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
};

// ============================================================================
// 3. MAIN PAGE COMPONENT
// ============================================================================
export default function AboutUsScrollAnimation() {
  return (
    <div className="bg-[#E0F7F6] text-[#2D3436] overflow-hidden font-quicksand">
      
      {/* --- SECTION 1: TOP HERO BANNER --- */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-8 pb-4">
          <div className="rounded-3xl overflow-hidden border-4 border-white">
            <Image
              src="/assets/aboutus/aboutus_banner.jpeg"
              alt="About Us Banner"
              width={1200}
              height={400}
              priority
              className="w-full h-auto max-h-[400px] object-cover scale-[1.08] block"
            />
          </div>
      </section>

      {/* --- SECTION 2: INTRO BADGE --- */}
      <div className="py-10 flex items-center justify-center bg-[#E0F7F6]">
        <div className="flex items-center gap-4 bg-white/80 px-8 py-3.5 rounded-full border-2 border-[#00C4B5]/40">
          <h2 className="text-4xl md:text-5xl font-black text-[#00A89B] tracking-wider uppercase">
            Our Story
          </h2>
          <img
            src="/assets/clouds/giraffe-svgrepo-com.svg"
            alt="Giraffe Icon"
            className="w-12 h-12 inline-block hover:rotate-6 transition-transform duration-300"
          />
        </div>
      </div>

      {/* --- SECTION 3: WHO WE ARE --- */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Animated Image */}
        <ScrollReveal
          baseClass="opacity-0 -translate-x-12"
          activeClass="opacity-100 translate-x-0"
        >
          <div className="rounded-3xl overflow-hidden bg-white">
            <Image
              src="/assets/aboutus/who_We_are.jpeg"
              alt="Who We Are"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover object-[center_35%] scale-[1.08]"
            />
          </div>
        </ScrollReveal>

        {/* Right Side: Animated Text */}
        <ScrollReveal
          baseClass="opacity-0 translate-y-8"
          activeClass="opacity-100 translate-y-0"
        >
          <div className="space-y-6 text-left font-quicksand">
            <span className="text-[#00C4B5] font-extrabold uppercase tracking-widest text-sm">
              SINCE 2002
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0D1C3A] leading-tight">
              We’ve Been in the <span className="bg-gradient-to-r from-[#FF5A5F] via-[#FF8E53] to-[#f97316] bg-clip-text text-transparent">Play Game</span> for a While.
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold">
              Toys, playgrounds, trampolines, and kids’ furniture—we’ve been making and supplying them since 1992. With decades of hands-on experience, we know what makes a product fun for kids, practical for businesses, and built to last.
            </p>
            <p className="text-[#00C4B5] text-lg font-black tracking-wide">
              Good design. Solid quality. Zero compromise on play.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* --- SECTION 4: TEAM VIBE BANNER --- */}
      <section className="py-16 px-6 md:px-16 bg-[#E0F7F6] flex justify-center">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#00C4B5]/20 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1 text-left">
            <StaggeredTextReveal
              text="We’re dreamers. We’re makers. We make play happen. ✨"
              className="text-3xl md:text-5xl font-extrabold text-[#00A89B] leading-tight"
            />
          </div>

          <ScrollReveal
            baseClass="opacity-0 translate-x-8"
            activeClass="opacity-100 translate-x-0"
            className="flex items-center gap-6 flex-shrink-0"
          >
            <img
              src="/assets/clouds/cat-halloween-kitty-svgrepo-com.svg"
              alt="Playful Kitty"
              className="w-16 h-16 md:w-20 md:h-20 object-contain hover:scale-110 -rotate-6 transition-transform duration-300"
            />
            <img
              src="/assets/clean_logo_toypark.webp"
              alt="Toy Park Logo"
              className="w-36 md:w-48 h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* --- SECTION 5: ADVANCED INFRASTRUCTURE --- */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollReveal
          baseClass="opacity-0 translate-x-12"
          activeClass="opacity-100 translate-x-0"
          className="order-1 md:order-2"
        >
          <div className="rounded-3xl overflow-hidden bg-white">
            <Image
              src="/assets/aboutus/what_makes_us different_aboutus.jpeg"
              alt="Warehouse"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover object-[center_35%] scale-[1.08]"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal
          baseClass="opacity-0 -translate-x-12"
          activeClass="opacity-100 translate-x-0"
          className="order-2 md:order-1 text-left"
        >
          <div className="space-y-6">
            <span className="text-[#00C4B5] font-extrabold uppercase tracking-widest text-sm">
              State-of-the-Art Infrastructure
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0D1C3A] leading-tight">
              Where <span className="bg-gradient-to-r from-[#00C4B5] to-[#0284C7] bg-clip-text text-transparent">Good Products</span> Get Their Start.
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold">
              Our spacious, modern facility is built for efficient production, organized storage, and smooth order handling. With advanced machinery, climate-safe spaces, and dedicated storage areas, we keep every product protected, every process on track, and every order ready to move.
            </p>
            <p className="text-[#00C4B5] text-lg font-black tracking-wide">
              Smart infrastructure. Better efficiency. Built to scale.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* --- SECTION 6: LEADERSHIP --- */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollReveal
          baseClass="opacity-0 -translate-y-12"
          activeClass="opacity-100 translate-y-0"
        >
          <div className="rounded-3xl overflow-hidden bg-white">
            <Image
              src="/assets/aboutus/why_choose_us.jpeg"
              alt="Leadership"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover object-[center_35%] scale-[1.08]"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal
          baseClass="opacity-0 translate-y-12"
          activeClass="opacity-100 translate-y-0"
          className="text-left space-y-6"
        >
          <span className="text-[#00C4B5] font-extrabold uppercase tracking-widest text-sm">
            VISIONARY LEADERSHIP
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0D1C3A] leading-tight">
            The Mind Behind <span className="bg-gradient-to-r from-[#FF5A5F] via-[#FF8E53] to-[#f97316] bg-clip-text text-transparent">the Mission.</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold">
            <strong className="text-[#0D1C3A]">Mr. Pulkit Singal</strong> brings a fresh perspective to an industry built on experience. His approach blends market insight, creative thinking, and strong relationships to keep ToyPark moving forward—one smart idea at a time.
          </p>
        </ScrollReveal>
      </section>

    </div>
  );
}