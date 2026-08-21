"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Ticket,
  Rocket,
  Gamepad2,
  Puzzle,
  Smile,
  Sparkles,
  Shapes,
  Star,
} from "lucide-react";

// ============================================================================
// 1. DATA (Static Information)
// ============================================================================
const HIGHLIGHTS_DATA = [
  { title: "Interactive Play Zones", desc: "Hands-on areas where kids can build, race, and create with the newest toys on the market." },
  { title: "Meet the Characters", desc: "Daily meet-and-greets with beloved cartoon characters and superhero mascots." },
  { title: "Educational Workshops", desc: "Fun, STEM-focused building sessions led by professional toy designers and educators." },
  { title: "Safe & Accessible", desc: "Wide, stroller-friendly aisles, soft-play floors, and dedicated quiet zones for sensory breaks." },
  { title: "Exclusive Toy Launches", desc: "Be the first to see and play with unreleased toys from top global brands." },
  { title: "Live Magic & Shows", desc: "A central stage featuring daily magic acts, puppet shows, and interactive storytelling." },
  { title: "Giant Brick Pits", desc: "Dive into massive pools filled with building blocks for endless creative construction." },
  { title: "Family Rest Areas", desc: "Comfortable seating, cafes, and family facilities located throughout the exhibition floor." },
];

const EXHIBITION_ZONES_DATA = [
  { name: "The Big Brick Build", size: "2,000 sq.m", desc: "A massive arena dedicated entirely to interlocking bricks and endless imagination." },
  { name: "Sci-Fi Space Station", size: "1,500 sq.m", desc: "Glow-in-the-dark galaxy featuring laser toys, robots, and spaceship models." },
  { name: "Dollhouse Village", size: "1,200 sq.m", desc: "Life-sized dollhouses, fashion dressing rooms, and miniature worlds." },
  { name: "Arcade & Tech Alley", size: "1,800 sq.m", desc: "The latest in kid-friendly video games, AR experiences, and coding robots." },
  { name: "Toddler Soft Play", size: "800 sq.m", desc: "A safe, padded wonderland designed specifically for children ages 0-3." },
  { name: "Board Game Cafe", size: "500 sq.m", desc: "Sit down as a family and test out the newest tabletop and board games." },
];

const DAILY_ACTIVITIES_DATA = [
  { title: "The Great Toy Unboxing", img: "/assets/WHOWEARE/Empty_children_playroom_with_toys_202608081653.jpeg" },
  { title: "Indoor Adventure Forts", img: "/assets/WHOWEARE/Playroom_with_castle_and_toys_202608081652.jpeg" },
  { title: "Sustainable Crafts Workshop", img: "/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg" },
  { title: "Teddy Bear & Play House Party", img: "/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg" },
];

const HIGHLIGHT_ICONS = [Gamepad2, Sparkles, Rocket, Smile, Puzzle, Star, Shapes, Ticket];

// ============================================================================
// 2. SUB-COMPONENTS
// ============================================================================

// Desktop-only Floating Background (Completely unrendered on mobile to free GPU/CPU)
function FloatingBackgroundIcons() {
  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <Rocket className="floating-icon absolute top-[15%] left-[10%] w-12 h-12 text-[#0284c7]" />
      <Puzzle className="floating-icon absolute top-[30%] right-[15%] w-16 h-16 text-[#0ea5e9]" />
      <Shapes className="floating-icon absolute top-[60%] left-[20%] w-10 h-10 text-[#0369a1]" />
      <Gamepad2 className="floating-icon absolute top-[80%] right-[10%] w-14 h-14 text-[#0284c7]" />
    </div>
  );
}

// 1. Hero Section
function HeroSection() {
  return (
    <section className="relative h-[60svh] md:h-screen w-full overflow-hidden flex flex-col justify-end pb-8 md:pb-12 px-4 md:px-12 z-10">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-b-2xl md:rounded-b-[5rem] m-2 md:m-8">
        <div className="absolute inset-0 w-full h-full md:h-[120%] md:-top-[10%] md:parallax-target">
          <Image
            src="/assets/WHOWEARE/Empty_children_playroom_with_toys_202608081653.jpeg"
            alt="ToyPark Exhibition Hall"
            fill
            priority
            quality={70}
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#082f49] via-[#082f49]/40 to-transparent opacity-85" />
      </div>

      <div className="relative z-10 max-w-7xl reveal-up pb-4 md:pb-10 px-2 md:px-8">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-6">
          <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-cyan-300" />
          <span className="block text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-cyan-200 font-bold">
            The Ultimate Kids Toy Exhibition
          </span>
        </div>
        <h1 className="text-[11vw] md:text-[9vw] font-black leading-[0.9] md:leading-[0.85] tracking-tight text-white uppercase">
          Wonder <br /> Play Expo
        </h1>
      </div>
    </section>
  );
}

// 2. Welcome Section
function WelcomeSection() {
  return (
    <section className="py-8 md:py-16 px-4 md:px-12 relative z-10 cv-auto">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-center">
        <div className="w-full md:w-1/2 reveal-up">
          <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#0ea5e9] mb-2 md:mb-4">
            Welcome to the Magic
          </h2>
          <h3 className="text-2xl md:text-5xl font-extrabold leading-[1.2] mb-4 md:mb-6 text-[#082f49]">
            The biggest playground your family has ever seen.
          </h3>
          <p className="text-[#0369a1] text-sm md:text-lg leading-relaxed mb-3 md:mb-4 font-medium">
            Join us for three days of endless fun, creativity, and play. The Wonder Play Expo brings together the world's most exciting toy brands, educational games, and interactive zones all under one massive roof.
          </p>
          <p className="text-[#0369a1] text-sm md:text-lg leading-relaxed font-medium mb-6">
            Whether your child loves building complex robots, diving into giant brick pits, or hugging their favorite cartoon characters, there's a magical corner waiting for them here.
          </p>
          <button className="flex items-center justify-center gap-3 md:gap-4 bg-[#0ea5e9] text-white w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold md:hover:bg-[#0284c7] md:hover:scale-105 transition-[transform,background-color] duration-200 text-sm md:text-base">
            <Ticket className="w-5 h-5" /> Get Tickets Now
          </button>
        </div>

        <div className="w-full md:w-5/12 h-[260px] md:h-[50vh] relative overflow-hidden group rounded-2xl md:rounded-3xl border border-cyan-100">
          <div className="absolute inset-0 w-full h-full md:h-[120%] md:-top-[10%] md:parallax-target">
            <Image
              src="/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg"
              alt="ToyPark Exhibition Playroom"
              fill
              loading="lazy"
              quality={65}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <Smile className="hidden md:block floating-icon absolute bottom-6 right-6 w-16 h-16 text-white" />
        </div>
      </div>
    </section>
  );
}

// 3. Highlights Section (Native Touch CSS Carousel on Mobile = 0ms JS Latency)
function HighlightsSection() {
  return (
    <section className="py-8 md:py-16 px-4 md:px-12 bg-[#cffafe] border-y border-[#a5f3fc] relative z-10 cv-auto">
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10 reveal-up">
        <div className="p-2.5 md:p-3 bg-[#0284c7] text-white rounded-xl md:rounded-2xl">
          <Star className="w-5 h-5 md:w-6 md:h-6 fill-white" />
        </div>
        <div>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#0284c7] block">
            Wonder Play World
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#082f49] uppercase tracking-tight">
            Expo Highlights
          </h2>
        </div>
      </div>

      {/* Native Momentum Scroll Snap Grid (Fastest possible mobile performance) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible scrollbar-none">
        {HIGHLIGHTS_DATA.map((item, idx) => {
          const CardIcon = HIGHLIGHT_ICONS[idx % HIGHLIGHT_ICONS.length];
          return (
            <div
              key={idx}
              className="snap-center shrink-0 w-[85vw] sm:w-[320px] md:w-auto group relative bg-white p-5 md:p-7 rounded-2xl md:rounded-[2rem] border border-cyan-100 md:border-2 md:hover:border-[#0ea5e9]/50 md:hover:-translate-y-1 transition-[transform,border-color] duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4 md:mb-5">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[#e0f7fa] md:group-hover:bg-[#0ea5e9] text-[#0284c7] md:group-hover:text-white flex items-center justify-center transition-colors duration-200">
                    <CardIcon className="w-5 h-5" />
                  </div>
                  <span className="text-lg md:text-xl font-black text-[#0ea5e9]/40 md:group-hover:text-[#0ea5e9] transition-colors duration-200">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-black mb-1.5 md:mb-2 text-[#082f49] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#0369a1] text-xs md:text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cyan-100 flex items-center justify-between text-[10px] md:text-xs font-bold text-[#0ea5e9]">
                <span className="uppercase tracking-wider">Kids Favorite</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 4. Zones Section
function ZonesSection() {
  return (
    <section className="py-8 md:py-16 px-4 md:px-12 relative z-10 cv-auto">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/3 md:sticky md:top-28 h-fit reveal-up">
          <h2 className="text-3xl md:text-[5vw] font-black leading-[0.95] md:leading-[0.9] uppercase tracking-tight mb-3 md:mb-6 text-[#082f49]">
            Explore <br className="hidden md:block" /> The <br className="hidden md:block" /> Zones
          </h2>
          <p className="text-[#0369a1] text-sm md:text-lg mb-4 md:mb-6 font-medium">
            Over 10,000 square meters of pure joy. Navigate through our themed areas tailored for different age groups.
          </p>
          <button className="flex items-center justify-center gap-3 md:gap-4 bg-white text-[#082f49] border-2 border-[#0ea5e9] w-full sm:w-auto px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold md:hover:bg-[#0ea5e9] md:hover:text-white transition-colors duration-200 text-sm md:text-base">
            Download Map <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full md:w-2/3 flex flex-col bg-white rounded-2xl md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 border border-cyan-100">
          {EXHIBITION_ZONES_DATA.map((zone, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row justify-between items-start md:items-center py-3.5 md:py-5 border-b border-cyan-100 last:border-0"
            >
              <div className="w-full md:w-1/3">
                <h3 className="text-base md:text-xl font-bold text-[#082f49]">{zone.name}</h3>
              </div>
              <div className="w-full md:w-1/4 my-1 md:my-0">
                <span className="text-[11px] md:text-xs font-bold bg-[#e0f7fa] text-[#0284c7] px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full border border-cyan-200">
                  {zone.size}
                </span>
              </div>
              <div className="w-full md:w-5/12">
                <p className="text-xs md:text-sm text-[#0369a1] font-medium">{zone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. Daily Schedule Section
function DailyActivitiesSection({
  activeImage,
  onSelectImage,
}: {
  activeImage: string;
  onSelectImage: (img: string) => void;
}) {
  return (
    <section className="pt-8 md:pt-12 pb-8 md:pb-10 bg-[#082f49] text-white flex flex-col md:flex-row items-center border-t border-[#0ea5e9]/30 relative z-10 cv-auto">
      {/* Dynamic Image Display */}
      <div className="w-full md:w-1/2 h-[220px] md:h-[55vh] relative overflow-hidden order-2 md:order-1 px-4 md:px-0 md:pl-12 mt-4 md:mt-0">
        <div className="relative w-full h-full rounded-xl md:rounded-[2.5rem] overflow-hidden border-2 md:border-4 border-[#0ea5e9]">
          <Image
            src={activeImage}
            alt="Exhibition Event"
            fill
            loading="lazy"
            quality={65}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Interactive List Items */}
      <div className="w-full md:w-1/2 px-4 md:px-16 order-1 md:order-2">
        <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#38bdf8] mb-3 md:mb-6">
          Daily Schedule
        </h2>
        <div className="flex flex-col gap-2.5 md:gap-4">
          {DAILY_ACTIVITIES_DATA.map((event, idx) => (
            <button
              key={idx}
              type="button"
              className="w-full text-left flex justify-between items-center bg-white/5 md:hover:bg-[#0ea5e9] p-3.5 md:p-6 rounded-xl md:rounded-2xl border border-white/10 md:hover:border-white transition-colors duration-200"
              onClick={() => onSelectImage(event.img)}
            >
              <h3 className="text-sm md:text-lg font-bold text-[#e0f7fa] md:group-hover:text-white">
                {event.title}
              </h3>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 opacity-80" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Plan Your Visit (CTA)
function PlanYourVisitSection() {
  return (
    <section className="py-8 md:py-16 px-4 md:px-12 relative z-10 cv-auto">
      <div className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-14 border border-cyan-100 flex flex-col items-center text-center relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-2xl md:text-5xl font-black leading-[1.05] uppercase tracking-tight text-[#082f49] mb-3 md:mb-5">
            Ready to <span className="text-[#0ea5e9]">Play?</span>
          </h2>
          <p className="text-[#0369a1] text-xs md:text-base mb-6 md:mb-8 font-medium">
            Don't miss out on the toy event of the year. Grab your family passes today for a weekend of unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="bg-[#0ea5e9] text-white w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold md:hover:bg-[#0284c7] md:hover:scale-105 transition-[transform,background-color] duration-200 text-sm md:text-base flex items-center justify-center gap-2">
              <Ticket className="w-5 h-5" /> Buy Family Pass
            </button>
            <button className="bg-transparent text-[#082f49] border-2 border-[#082f49] w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold md:hover:bg-[#082f49] md:hover:text-white transition-colors duration-200 text-sm md:text-base">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. MAIN COMPONENT (Lazy Desktop Animation Initializer)
// ============================================================================
export default function ToyExhibition() {
  const [activeEventImage, setActiveEventImage] = useState(DAILY_ACTIVITIES_DATA[0].img);

  return (
    <div className="bg-[#e0f7fa] text-[#082f49] min-h-screen font-sans antialiased overflow-x-hidden selection:bg-[#0ea5e9] selection:text-white relative">
      <FloatingBackgroundIcons />
      <HeroSection />
      <WelcomeSection />
      <HighlightsSection />
      <ZonesSection />
      <DailyActivitiesSection
        activeImage={activeEventImage}
        onSelectImage={setActiveEventImage}
      />
      <PlanYourVisitSection />

      {/* GPU & Scroll Performance Optimizations */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}