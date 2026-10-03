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
    title: "Playground Equipment",
    desc: "From slides and swings to climbers and multiplay systems, we create playground solutions that bring movement, adventure, and everyday excitement to kids’ spaces.",
    image: "/about/5.webp",
    alt:"Outdoor Play Area Equipment"
  },
  {
    title: "Play School Furniture",
    desc: "Tables, chairs, storage, and learning furniture designed to make educational spaces comfortable, practical, playful, and ready for busy little learners.",
    image: "/about/6.webp",
    alt:" Play School Furniture Manufacturers"
  },
  {
    title: "Eco-Friendly Craft",
    desc: "Child safety is at the heart of our design. Crafted using sustainably sourced non-toxic wood, smooth rounded edges, and certified eco-paints, our furniture offers durability you can trust.",
      image: "/about/7.webp",
      alt:"Indoor Play Area Equipment",

  },
  {
    title: "Active & Creative Play",
    desc: "From ride-ons and activity products to games and sensory play, our range keeps children moving, exploring, creating, and discovering through play.",
      image: "/about/8.webp",
      alt:"Play School Equipment Wholesaler"
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
            <Image alt='Play School Equipment Wholesale' src="/assets/WHOWEARE/Minimalist_presentation_slide_te…_2K_202608081543.jpeg"  fill priority className="object-cover object-center" />
          </div>
        </div>
        <div className="relative z-10 max-w-5xl md:mt-8">
          <div className="overflow-hidden mb-2 sm:mb-6">
            <h1 className="hero-text-line text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold leading-[0.95] sm:leading-[0.9] tracking-tight sm:tracking-wide text-white  drop-shadow-md">
              Who we are
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
                <Image src={concept.image} alt={concept.alt} fill className="object-cover object-top brightness-[0.95] group-hover:scale-102 group-hover:brightness-100 transition-all duration-1000" />
              </div>
            </div>
            
            <div className="concept-text w-full md:w-[45%] space-y-3 sm:space-y-6 md:space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#0284c7] font-bold">Expertise {idx + 1}</span>
              <h3 className="text-3xl sm:text-5xl md:text-7xl font-bold  text-[#0a192f] leading-tight">{concept.title}</h3>
              <p className="text-[#3b596d] font-semibold leading-relaxed text-sm sm:text-base md:text-lg">{concept.desc}</p>
            </div>
          </div>
        ))}
      </section>

      

      {/* 5. PROJECTS GRID */}
      

      {/* 6. MASSIVE CALL TO ACTION (CTA) */}
      <section className="h-[50vh] sm:h-[65vh] md:h-[80vh] flex flex-col justify-center items-center text-center px-5 bg-[#0f172a] border-t border-cyan-900/10 relative group overflow-hidden cursor-pointer">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
          <Image alt="Playgroup School Furniture" src="/assets/WHOWEARE/Minimalist_presentation_slide_te…_2K_202608081543.jpeg"  fill className="object-cover object-center" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-cyan-300 font-bold mb-4 sm:mb-8 relative z-10">Start a conversation</span>
        <h2 className="text-5xl sm:text-7xl md:text-[10vw] font-bold  leading-none text-white relative z-10 group-hover:text-cyan-300 transition-colors duration-700 drop-shadow-lg">
          get in touch
        </h2>
      </section>
    </div>
  );
}
  