"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const concepts = [
  {
    title: "playful spaces",
    desc: "By merging ergonomic safety with vibrant imaginative designs, ToyPark creates playrooms and kids' spaces that welcome, inspire, and nurture young minds. Years of dedicated craft guide every furniture piece we build.",
    image: "/assets/WHOWEARE/Empty_children_playroom_with_toys_202608081653.jpeg",
  },
  {
    title: "modular furniture",
    desc: "ToyPark's innovative modular kids furniture redefines children's spaces—combining multi-functional storage, active play elements, and Scandinavian minimalism tailored for growing families.",
    image: "/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg",
  },
  {
    title: "eco-friendly craft",
    desc: "Child safety is at the heart of our design. Crafted using sustainably sourced non-toxic wood, smooth rounded edges, and certified eco-paints, our furniture offers durability you can trust.",
    image: "/assets/WHOWEARE/Playroom_with_castle_and_toys_202608081652.jpeg",
  },
  {
    title: "active play design",
    desc: "Encouraging movement, creativity, and exploration. From indoor play castles to climbing frames and reading nooks, ToyPark turns everyday rooms into magical playgrounds.",
    image: "/assets/WHOWEARE/Playroom_with_toys_and_furniture_202608081652.jpeg",
  }
];

const projects = [
  { title: "Nordic Play Haven", category: "Kids Furniture", img: "/assets/WHOWEARE/Playroom_with_toys_and_rug_202608081617.jpeg" },
  { title: "Montessori Study Nook", category: "Kids Study Sets", img: "/assets/WHOWEARE/Organized_playroom_with_toys_2K_202608081617.jpeg" },
  { title: "Explorer Play Castle", category: "Active Play", img: "/assets/WHOWEARE/Kids_play_area_with_toys_202608081617.jpeg" },
  { title: "Pastel Dream Bedroom", category: "Kids Bedroom", img: "/assets/WHOWEARE/Children's_playroom_showcase_2K_202608081617.jpeg" },
];

const pressNews = [
  { title: "ToyPark Unveils Eco-Friendly Kids Furniture Line", date: "Oct 2025", img: "/assets/WHOWEARE/Playroom_with_toys_and_rug_202608081617.jpeg" },
  { title: "Best Children's Room Design Award 2025", date: "Sep 2025", img: "/assets/WHOWEARE/Organized_playroom_with_toys_2K_202608081617.jpeg" },
  { title: "The Future of Active Indoor Play Spaces", date: "Aug 2025", img: "/assets/WHOWEARE/Kids_play_area_with_toys_202608081617.jpeg" },
  { title: "Crafting Safe, Sustainable Furniture for Growing Kids", date: "Jul 2025", img: "/assets/WHOWEARE/Children's_playroom_showcase_2K_202608081617.jpeg" },
];

export default function WhoWeArePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. GSAP Animations Context
    const ctx = gsap.context(() => {
      
      // Hero Image Deep Parallax (Reliable Math: height 120%, top -10%, travel 20%)
      gsap.to(".hero-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero Text Reveal
      gsap.from(".hero-text-line", {
        y: 120,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      // Marquee Infinite Loop
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });

      // Concepts Deep Parallax & Text Reveal
      const conceptBlocks = gsap.utils.toArray(".concept-block") as HTMLElement[];
      conceptBlocks.forEach((block) => {
        // Animating the wrapper avoids fighting with Next.js absolute 'fill' properties
        const imgWrapper = block.querySelector(".concept-parallax-wrapper");
        const text = block.querySelector(".concept-text");
        
        if (imgWrapper) {
          gsap.to(imgWrapper, {
            yPercent: 38,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        }

        if (text) {
          gsap.from(text, {
            y: 80,
            opacity: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 75%",
            }
          });
        }
      });

      // Horizontal Pinned Section (Press & News) - Only on desktop
      const pinContainer = horizontalRef.current;
      if (pinContainer && window.innerWidth >= 768) {
        const pinScroll = pinContainer.querySelector(".horizontal-scroll-content") as HTMLElement;
        if (pinScroll) {
          const getScrollAmount = () => -(pinScroll.scrollWidth - window.innerWidth);
          
          gsap.to(pinScroll, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: pinContainer,
              start: "top top",
              end: () => `+=${pinScroll.scrollWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Ensure ScrollTrigger gets accurate measurements after render
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-[#f0f8fa] text-[#0c2333] min-h-screen font-quicksand antialiased overflow-x-hidden selection:bg-[#0284c7] selection:text-white cursor-auto">

      {/* 1. HERO SECTION */}
      <section className="hero-section relative h-[65vh] sm:h-[80vh] md:h-screen w-full overflow-hidden flex items-center md:items-start justify-start pt-12 md:pt-28 px-5 sm:px-8 md:px-16 bg-[#0f172a]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Parallax Hero Image Container */}
          <div className="hero-bg relative w-full h-[120%] -top-[10%]">
            <Image src="/assets/WHOWEARE/Minimalist_presentation_slide_te…_2K_202608081543.jpeg" alt="Hero Banner" fill priority className="object-cover object-center" />
          </div>
        </div>
        <div className="relative z-10 max-w-5xl md:mt-8">
          <div className="overflow-hidden mb-2 sm:mb-6">
            <h1 className="hero-text-line text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold leading-[0.95] sm:leading-[0.9] tracking-tight sm:tracking-wide text-white lowercase drop-shadow-md">
              who we are
            </h1>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE */}
      <div className="py-6 md:py-10 border-y border-cyan-900/10 bg-[#e3f2f7] overflow-hidden flex items-center cursor-default max-w-full">
        <div className="marquee-inner flex whitespace-nowrap text-2xl sm:text-4xl md:text-6xl font-medium uppercase tracking-widest text-[#0284c7]/30">
          <span className="shrink-0 pr-4">SAFE • PLAYFUL • SUSTAINABLE KIDS FURNITURE • CREATIVE PLAYROOM DESIGN • </span>
          <span className="shrink-0 pr-4">SAFE • PLAYFUL • SUSTAINABLE KIDS FURNITURE • CREATIVE PLAYROOM DESIGN • </span>
        </div>
      </div>

      {/* 3. CONCEPTS EDITORIAL WITH DEEP PARALLAX */}
      <section className="py-12 sm:py-24 md:py-32 flex flex-col gap-16 sm:gap-28 md:gap-40 max-w-full overflow-hidden">
        {concepts.map((concept, idx) => (
          <div key={idx} className={`concept-block flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 sm:gap-12 md:gap-24 px-5 sm:px-8 md:px-16 items-center`}>
            
            <div className="w-full md:w-[60%] h-[38vh] sm:h-[60vh] md:h-[88vh] relative overflow-hidden group rounded-2xl md:rounded-md shadow-md cursor-pointer">
              {/* Enhanced Parallax wrapper */}
              <div className="concept-parallax-wrapper absolute inset-0 w-full h-[145%] -top-[22.5%]">
                <Image src={concept.image} alt={concept.title} fill className="object-cover object-top brightness-[0.95] group-hover:scale-102 group-hover:brightness-100 transition-all duration-1000" />
              </div>
            </div>
            
            <div className="concept-text w-full md:w-[45%] space-y-3 sm:space-y-6 md:space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#0284c7] font-bold">Expertise {idx + 1}</span>
              <h3 className="text-3xl sm:text-5xl md:text-7xl font-bold lowercase text-[#0a192f] leading-tight">{concept.title}</h3>
              <p className="text-[#3b596d] font-semibold leading-relaxed text-sm sm:text-base md:text-lg">{concept.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. PRESS & REVIEWS (Horizontal on desktop, vertical stack on mobile) */}
      <section ref={horizontalRef} className="md:h-screen w-full bg-[#e3f2f7] border-t border-cyan-900/10 overflow-hidden relative py-12 md:py-0">
        <div className="px-5 sm:px-8 md:absolute md:top-12 md:left-16 z-10 mb-6 md:mb-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold lowercase text-[#0a192f]">Press & Review</h2>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#0284c7] font-bold block mt-1 md:mt-2">Latest feature highlights</span>
        </div>
        
        {/* Inner flex wrapper */}
        <div className="h-full w-full flex flex-col justify-center">
          <div className="horizontal-scroll-content flex flex-col md:flex-row px-5 sm:px-8 md:pl-16 md:pr-32 pt-4 md:pt-20 pb-4 md:pb-8 items-stretch md:items-center gap-6 md:gap-12 w-full md:w-max">
            {pressNews.map((news, idx) => (
              <div key={idx} className="w-full md:w-[32vw] flex flex-col justify-center shrink-0 group bg-white/50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border border-cyan-900/10 md:border-none shadow-xs md:shadow-none">
                <div className="w-full aspect-video relative overflow-hidden mb-4 md:mb-6 rounded-xl md:rounded-md shadow-xs bg-white/40">
                  <Image src={news.img} alt={news.title} fill className="object-cover brightness-95 group-hover:scale-105 transition-transform duration-[1.2s]" />
                </div>
                <div className="flex justify-between items-start border-t border-cyan-900/20 pt-3 md:pt-4">
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#0a192f] max-w-[80%] leading-snug">{news.title}</h4>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#0284c7] font-bold pt-1">{news.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECTS GRID */}
      <section className="py-12 sm:py-24 md:pt-32 md:pb-16 px-5 sm:px-8 md:px-16">
        <div className="flex justify-between items-end mb-10 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold lowercase text-[#0a192f]">Selected <br className="hidden sm:block"/> flagships</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-24">
          {projects.map((proj, idx) => (
            <div key={idx} className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}>
              <div className="relative h-[40vh] sm:h-[60vh] md:h-[70vh] overflow-hidden mb-4 sm:mb-6 rounded-2xl md:rounded-sm shadow-xs">
                <Image src={proj.img} alt={proj.title} fill className="object-cover brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-[1.5s]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#0284c7] font-bold block mb-1.5 sm:mb-2">{proj.category}</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a192f]">{proj.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MASSIVE CALL TO ACTION (CTA) */}
      <section className="h-[50vh] sm:h-[65vh] md:h-[80vh] flex flex-col justify-center items-center text-center px-5 bg-[#0f172a] border-t border-cyan-900/10 relative group overflow-hidden cursor-pointer">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
          <Image src="/assets/WHOWEARE/Minimalist_presentation_slide_te…_2K_202608081543.jpeg" alt="Banner background" fill className="object-cover object-center" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-cyan-300 font-bold mb-4 sm:mb-8 relative z-10">Start a conversation</span>
        <h2 className="text-5xl sm:text-7xl md:text-[10vw] font-bold lowercase leading-none text-white relative z-10 group-hover:text-cyan-300 transition-colors duration-700 drop-shadow-lg">
          get in touch
        </h2>
      </section>
    </div>
  );
}
  