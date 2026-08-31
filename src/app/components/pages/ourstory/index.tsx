'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, ChevronUp, Sparkles, Award, Shapes } from 'lucide-react';
import Lenis from 'lenis';

// --- HELPER: HOT LAB STYLE ANIMATED COUNTER ---
interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  prefix = '',
  suffix = '',
  label,
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    const current = counterRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [target, hasAnimated]);

  return (
    <div ref={counterRef} className="flex items-center gap-3">
      {/* Huge Thin Number (Hot Lab Style) */}
      <span className="text-6xl sm:text-7xl md:text-8xl font-quicksand text-[#0F2228] font-extralight tracking-tight leading-none">
        {prefix}{count}{suffix}
      </span>
      {/* 2-line Label beside number */}
      <span className="text-xs sm:text-sm font-quicksand text-[#475569] font-normal max-w-[100px] leading-tight text-left">
        {label}
      </span>
    </div>
  );
};

export default function OurStoryComponent() {


  // 1st Scroll Progress logic for vertical line & text color transition
  const lineSectionRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  // 2nd Scroll Progress logic for vertical line above cards
  const cardsLineSectionRef = useRef<HTMLDivElement>(null);
  const [cardsLineProgress, setCardsLineProgress] = useState(0);

  // 3rd Scroll Progress logic for vertical line above storybook
  const storybookLineSectionRef = useRef<HTMLDivElement>(null);
  const [storybookLineProgress, setStorybookLineProgress] = useState(0);

  // Main Headline Scroll Progress
  const [headlineProgress, setHeadlineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Main Headline scroll progress calculation
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.45;
      const progress = Math.min(Math.max(scrollY / threshold, 0), 1);
      setHeadlineProgress(progress);

      // 1st Line calculation - Fast scroll mapping
      if (lineSectionRef.current) {
        const rect = lineSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Start moving when top reaches 85% of screen, finish by 45%
        const startPoint = windowHeight * 0.85;
        const distance = windowHeight * 0.4;
        const currentProgress = (startPoint - rect.top) / distance;
        setLineProgress(Math.min(Math.max(currentProgress, 0), 1));
      }

      // 2nd Cards Line calculation - Fast scroll mapping
      if (cardsLineSectionRef.current) {
        const rect = cardsLineSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Start moving when top reaches 85% of screen, finish by 45%
        const startPoint = windowHeight * 0.85;
        const distance = windowHeight * 0.4;
        const currentProgress = (startPoint - rect.top) / distance;
        setCardsLineProgress(Math.min(Math.max(currentProgress, 0), 1));
      }

      // 3rd Storybook Line calculation - Fast scroll mapping
      if (storybookLineSectionRef.current) {
        const rect = storybookLineSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Start moving when top reaches 85% of screen, finish by 45%
        const startPoint = windowHeight * 0.85;
        const distance = windowHeight * 0.4;
        const currentProgress = (startPoint - rect.top) / distance;
        setStorybookLineProgress(Math.min(Math.max(currentProgress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#FAFCFC] font-quicksand text-[#2D3436] relative overflow-hidden">
      
      {/* ═══ 1. BACKGROUND VIDEO (95vh COVER) WITH WHITE OVERLAY NAVBAR ═══ */}
      <div className="w-full aspect-square sm:aspect-auto sm:h-[85vh] md:h-[95vh] overflow-hidden bg-black relative">
        <video
          src="https://pub-eb2eff44950b4abfbe1564159bd1cbc8.r2.dev/video/Website_video_showing_playground_1080p_202608070041_202608071011.mp4.mp4"
          className="w-full h-full object-cover block absolute inset-0 z-0 brightness-[1.02] contrast-[1.04]"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay Navbar with Centered OUR STORY */}
        <header className="absolute top-0 left-0 right-0 z-40 text-white font-quicksand">
          <nav className="px-4 sm:px-6 lg:px-12 py-4 sm:py-6 flex items-center justify-between">
            <div className="max-w-[1400px] w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* LEFT: ToyPark Logo */}
              <div className="flex items-center">
                <a href="/" className="flex items-center gap-2 cursor-pointer">
                  <img 
                    src="/assets/ToyPark_logo.png" 
                    alt="ToyPark Logo" 
                    className="h-10 sm:h-14 md:h-20 w-auto object-contain max-w-[180px] sm:max-w-[260px] transform hover:scale-105 transition-transform brightness-0 invert" 
                  />
                </a>
              </div>

              {/* CENTER: OUR STORY (Clean White Overlay Text) */}
              <div className="flex items-center justify-center">
                <span className="text-sm sm:text-lg md:text-2xl font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white drop-shadow-lg bg-white/10 px-5 sm:px-8 py-1.5 sm:py-2.5 rounded-full border-2 border-white/80">
                  OUR STORY
                </span>
              </div>

              {/* RIGHT: Home Button */}
              <div className="flex items-center">
                <a href="/">
                  <button className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full border-2 border-white text-white font-extrabold text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 transition-all hover:bg-white/20">
                    <span>Home</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-white" />
                  </button>
                </a>
              </div>

            </div>
          </nav>
        </header>
      </div>

      {/* ═══ 2. INTERACTIVE SCROLL STORY SECTION (EDITORIAL LUXURY) ═══ */}
      <section className="pt-16 pb-6 px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto text-center flex flex-col items-center relative">
        
        {/* Left Floating Masked Mascot SVG */}
        <div className="hidden md:block absolute left-2 lg:left-12 top-[10%] -translate-y-1/2 animate-bounce [animation-duration:6s] z-10 select-none">
          <div 
            className="w-20 h-20 bg-[#00C4B5]/40 hover:bg-[#00C4B5] transition-colors duration-300"
            style={{
              maskImage: 'url(/assets/ourStory/animal-kiwi-bird-svgrepo-com.svg)',
              WebkitMaskImage: 'url(/assets/ourStory/animal-kiwi-bird-svgrepo-com.svg)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          />
        </div>

        {/* Right Floating Masked Mascot SVG */}
        <div className="hidden md:block absolute right-2 lg:right-12 top-[45%] -translate-y-1/2 animate-bounce [animation-duration:7s] z-10 select-none">
          <div 
            className="w-20 h-20 bg-[#00C4B5]/40 hover:bg-[#00C4B5] transition-colors duration-300"
            style={{
              maskImage: 'url(/assets/ourStory/animal-shelter-svgrepo-com.svg)',
              WebkitMaskImage: 'url(/assets/ourStory/animal-shelter-svgrepo-com.svg)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          />
        </div>

        {/* Main Headline */}
        <h1 
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-quicksand leading-tight tracking-tight max-w-5xl w-full mb-8 sm:mb-12 font-normal transition-all duration-1000 ${
            headlineProgress > 0.15 
              ? 'text-[#00A89B] opacity-100 scale-100' 
              : 'text-gray-400 opacity-40 scale-95'
          }`}
        >
          For those who make play their destination
        </h1>

        {/* 1st Story Text Paragraph */}
        <div className="max-w-4xl w-full text-center space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl leading-relaxed text-[#475569] font-medium mb-10 sm:mb-16">
          <p>
            Toy Park is a premier playground & interactive play studio based in Delhi since 2002, where ergonomic safety and vibrant aesthetics develop as one unified vision. Every line is intentional; every climb, slide, and structure is engineered to move, play, and endure.
          </p>
          <p>
            We build immersive environments using premium sustainable wood, non-toxic finishes, and weather-resistant polymers. True innovation is our tool to create distinction, delivering spaces where communities gather and children set their own standard of play.
          </p>
        </div>

        {/* Interactive Link Button */}
        <a 
          href="/about" 
          className="inline-flex items-center gap-2 text-sm sm:text-base uppercase tracking-widest font-bold text-[#0F2228] border-b-2 border-[#0F2228] pb-1 hover:text-[#00A89B] hover:border-[#00A89B] transition-colors mb-10 sm:mb-16"
        >
          <span>ABOUT US</span>
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        {/* ═══ 3. ANIMATED SCROLL LINE & BULLET INTERACTION ═══ */}
        <div ref={lineSectionRef} className="relative w-full py-4 flex flex-col items-center justify-center">
          
          {/* Vertical Line Container */}
          <div className="relative w-[1.5px] h-12 sm:h-24 bg-gray-300 rounded-full overflow-visible">
            
            {/* Moving Thick Line Bullet Indicator */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[3.5px] bg-[#00A89B] rounded-full shadow-sm"
              style={{ 
                height: '24px',
                top: `calc(${lineProgress * 100}% - ${lineProgress * 24}px)`
              }}
            />
          </div>

          {/* 2nd Section Scroll Text Reveal */}
          <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6 max-w-4xl w-full text-center">
            <h2 
              className={`text-2xl sm:text-4xl md:text-6xl font-quicksand transition-all duration-700 font-normal ${
                lineProgress > 0.2 
                  ? 'text-[#00A89B] opacity-100 scale-100' 
                  : 'text-gray-400 opacity-50 scale-95'
              }`}
            >
              Craftsmanship & Identity
            </h2>

            <div 
              className={`space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl leading-relaxed font-medium transition-all duration-700 ${
                lineProgress > 0.35 
                  ? 'text-[#0F2228] opacity-100' 
                  : 'text-gray-400 opacity-40'
              }`}
            >
              <p>
                Every playground we create undergoes rigorous engineering assessments to guarantee maximum safety, certified to EN1176 and ASTM international standards.
              </p>
              <p>
                We stress-test our premium materials against extreme weather and daily wear, ensuring our play systems remain durable and inspiring for generations.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ═══ 4. FEATURED MASTERPIECES OVERLAY WITH BABY CYAN TINT & ALL PROJECTS LINK ═══ */}
      <section className="relative w-full min-h-[500px] sm:min-h-[650px] mt-0 mb-6 overflow-hidden bg-slate-900 group shadow-2xl">
        
        {/* Full Width Background Image */}
        <img
          src="/assets/ourStory/Children_playroom_interior_design_2K_202608081257.jpeg"
          alt="Featured Playroom Interior Design"
          className="absolute inset-0 w-full h-full object-cover block group-hover:scale-[1.02] transition-transform duration-1000 z-0"
        />

        {/* Soft Baby Blue / Cyan Tint Overlay */}
        <div className="absolute inset-0 bg-[#E0F7F6]/95 sm:bg-gradient-to-r sm:from-[#E0F7F6]/95 sm:via-[#E0F7F6]/85 sm:to-transparent pointer-events-none z-10 w-full sm:w-[70%] lg:w-[60%]" />

        <div className="relative z-20 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[500px] sm:min-h-[650px] items-center px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          
          {/* Left Side: Overlaid Text on Image Wall - Shifted Left with Baby Cyan Tint */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-10 py-4 sm:py-6">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-quicksand tracking-tight text-[#0F2228] mb-6 sm:mb-10 font-normal">
                Featured masterpieces
              </h2>

              {/* List items with bottom border */}
              <div className="space-y-3 sm:space-y-4 font-quicksand text-xs sm:text-sm md:text-base">
                {[
                  { name: "KIDZA PLAYROOM SYSTEM", category: "INDOOR PLAY 2-6 YRS" },
                  { name: "OUTDOOR ADVENTURE TOWER", category: "MULTIPLAY PARK" },
                  { name: "JUNGLE GYM & SLIDES", category: "PRESCHOOL SERIES" },
                  { name: "SAFETY TRAMPOLINE PARK", category: "SPORTS & RECREATION" },
                  { name: "CREATIVE BLOCK ZONE", category: "TODDLER ACTIVITY" },
                  { name: "ECO WOODEN PLAY SET", category: "NATURAL WOOD" },
                  { name: "MODERN SOFT PLAY AREA", category: "COMMERCIAL MALLS" },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between border-b border-[#0F2228]/20 pb-2 sm:pb-3 hover:border-[#00A89B] transition-colors cursor-pointer group/item"
                  >
                    <span className="font-bold text-[#0F2228] group-hover/item:text-[#00A89B] transition-colors tracking-wide">
                      {item.name}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#475569] font-semibold group-hover/item:text-[#00A89B] transition-colors">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom All Projects Link */}
            <a 
              href="/products" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-[#0F2228] border-b-2 border-[#0F2228] pb-1 hover:text-[#00A89B] hover:border-[#00A89B] transition-colors w-fit pt-2"
            >
              <span>ALL PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

        </div>

      </section>

      {/* ═══ 5. SEA OF HONORS & 3 CODE-DESIGNED UI AWARD CARDS SECTION WITH VERTICAL SCROLL LINE ═══ */}
      <section className="pt-2 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto text-center flex flex-col items-center">
        
        {/* Animated Scroll Line & Bullet Indicator Above Cards Section */}
        <div ref={cardsLineSectionRef} className="relative w-full py-4 flex flex-col items-center justify-center">
          <div className="relative w-[1.5px] h-12 sm:h-24 bg-gray-300 rounded-full overflow-visible">
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[3.5px] bg-[#00A89B] rounded-full shadow-sm"
              style={{ 
                height: '24px',
                top: `calc(${cardsLineProgress * 100}% - ${cardsLineProgress * 24}px)`
              }}
            />
          </div>
        </div>

        {/* Section Heading */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl text-center mb-8 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#00A89B] bg-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-[#00C4B5]/40 shadow-sm inline-block">
            GLOBAL RECOGNITION & CERTIFICATIONS
          </span>
          <h2 
            className={`text-3xl sm:text-5xl md:text-6xl font-quicksand transition-all duration-700 font-normal ${
              cardsLineProgress > 0.2 
                ? 'text-[#00A89B] opacity-100 scale-100' 
                : 'text-gray-400 opacity-50 scale-95'
            }`}
          >
            Sea of honors
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#475569] font-medium leading-relaxed max-w-2xl mx-auto">
            Design recognized at the highest level of craftsmanship. Our play spaces have earned prestigious safety certifications and design awards worldwide.
          </p>
        </div>

        {/* 3 Pure Code-Designed UI Cards Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {[
            {
              year: "2025",
              title: "International Safety & Ergonomics Award",
              desc: "Certified for zero-compromise child ergonomics, rounded safety edges, and eco-certified non-toxic play materials.",
              badge: "SAFETY STANDARDS CERTIFIED",
              icon: Sparkles,
              gradient: "from-[#00A89B]/10 via-[#00C4B5]/20 to-white",
              accent: "#00A89B"
            },
            {
              year: "2025",
              title: "Design Elite Playroom Award",
              desc: "Honored for modular playroom integration, spatial flexibility, and interactive sensory play environments.",
              badge: "EXCELLENCE IN PLAY INFRASTRUCTURE",
              icon: Award,
              gradient: "from-[#E0F7F6] via-teal-50 to-white",
              accent: "#00C4B5"
            },
            {
              year: "2025",
              title: "Global Outdoor Park Concept",
              desc: "Awarded for groundbreaking multiplay tower architecture and eco-sustainable outdoor play structures.",
              badge: "INNOVATIVE PLAY CONCEPTS",
              icon: Shapes,
              gradient: "from-sky-100/70 via-blue-50 to-white",
              accent: "#1E293B"
            }
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div 
                key={idx}
                className="group relative flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-[#00C4B5]/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 text-left overflow-hidden"
              >
                {/* Top Badge & Code Graphic */}
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center border border-[#00C4B5]/30 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <IconComp className="w-6 h-6 sm:w-7 sm:h-7 text-[#00A89B]" />
                    </div>
                    <span className="text-xl sm:text-2xl font-quicksand font-black text-[#0F2228]/20 group-hover:text-[#00A89B] transition-colors">
                      {card.year}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-quicksand font-bold text-[#0F2228] group-hover:text-[#00A89B] transition-colors leading-tight mb-3 sm:mb-4">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed font-medium mb-6 sm:mb-8">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Badge */}
                <div className="pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#00A89B] bg-[#E0F7F6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-block border border-[#00C4B5]/30">
                    {card.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 6. TOY PARK STORYBOOK */}
      <section className="pt-0 pb-0 my-0 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Animated Scroll Line & Bullet Indicator Above Storybook Section */}
        <div ref={storybookLineSectionRef} className="relative w-full py-4 flex flex-col items-center justify-center">
          <div className="relative w-[1.5px] h-12 sm:h-24 bg-gray-300 rounded-full overflow-visible">
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[3.5px] bg-[#00A89B] rounded-full shadow-sm"
              style={{ 
                height: '24px',
                top: `calc(${storybookLineProgress * 100}% - ${storybookLineProgress * 24}px)`
              }}
            />
          </div>
        </div>

        {/* Headline with SVG beside it */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
          <h2 
            className={`text-2xl sm:text-4xl md:text-5xl font-quicksand font-normal tracking-tight transition-all duration-700 ${
              storybookLineProgress > 0.2 
                ? 'text-[#00A89B] opacity-100 scale-100' 
                : 'text-gray-400 opacity-50 scale-95'
              }`}
          >
            The Toy Park Storybook
          </h2>
          <div 
            className="w-8 h-8 sm:w-12 sm:h-12 bg-[#00A89B] flex-shrink-0"
            style={{
              maskImage: 'url(/assets/ourStory/animal-kangaroo-svgrepo-com.svg)',
              WebkitMaskImage: 'url(/assets/ourStory/animal-kangaroo-svgrepo-com.svg)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          />
        </div>

        {/* Main Open Book Image with responsive negative margins to prevent clipping/overflow on mobile */}
        <div className="w-full flex justify-center items-center drop-shadow-2xl hover:scale-[1.01] transition-transform duration-700 -mt-16 sm:-mt-24 md:-mt-36 lg:-mt-[150px] -mb-16 sm:-mb-24 md:-mb-32 lg:-mb-[140px] overflow-hidden">
          <img
            src="/assets/ourStory/Open_book_featuring_logo_and_202608081207 Background Removed.png"
            alt="Toy Park Open Book Story"
            className="w-full max-w-5xl h-auto object-contain block scale-110 sm:scale-100"
          />
        </div>
      </section>

      {/* ═══ 7. BOTTOM FOOTER BAR WITH SCROLL TO TOP BUTTON ═══ */}
      <div className="pt-4 pb-8 px-6 md:px-16 max-w-[1400px] mx-auto flex justify-end items-center">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E293B] text-white flex items-center justify-center hover:bg-[#00A89B] transition-colors duration-300 shadow-md"
          title="Scroll to top"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

    </div>
  );
}
