'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface Project {
  id: string;
  name: string;
  title: string;
  year: string;
  timeline: string;
  services: string[];
  image: string;
  badgeColor: string;
  btnColor: string;
  pillColor: string;
  icon: string;
}

const projects: Project[] = [
  {
    id: 'trampoline',
    name: 'KIDS TRAMPOLINE',
    title: 'Safe & bouncy indoor trampolines for endless active fun',
    year: '3-8 Years',
    timeline: 'Active Play',
    services: ['Motor Skills', 'Energy Burn', 'Safety Net'],
    image: '/assets/split_vantage_images/kids_Trampoline_1.png',
    badgeColor: 'bg-[#FFE66D] text-[#2D3436] border-2 border-[#2D3436]',
    btnColor: 'bg-[#FFE66D] text-[#2D3436] hover:bg-[#f5dc5f]',
    pillColor: 'bg-[#4ECDC4] text-[#2D3436]',
    icon: '🏃‍♂️',
  },
  {
    id: 'playhouse',
    name: 'KIDS PLAY HOUSE',
    title: 'Imaginative play tents and wooden houses for little dreamers',
    year: '2-6 Years',
    timeline: 'Creative Play',
    services: ['Roleplay', 'Cozy Space', 'Imagination'],
    image: '/assets/split_vantage_images/kids_playHouse_1.png',
    badgeColor: 'bg-[#4ECDC4] text-[#2D3436] border-2 border-[#2D3436]',
    btnColor: 'bg-[#4ECDC4] text-[#2D3436] hover:bg-[#3dbcb3]',
    pillColor: 'bg-[#9B59B6] text-white',
    icon: '⛺',
  },
  {
    id: 'furniture',
    name: 'KIDS FURNITURE',
    title: 'Ergonomic & colorful tables for learning and art activities',
    year: '3-10 Years',
    timeline: 'Study & Art',
    services: ['Ergonomic', 'Storage', 'Durable'],
    image: '/assets/split_vantage_images/kids_furniture_1.png',
    badgeColor: 'bg-[#FF6B6B] text-white border-2 border-[#2D3436]',
    btnColor: 'bg-[#FF6B6B] text-white hover:bg-[#ff5252]',
    pillColor: 'bg-[#FFE66D] text-[#2D3436]',
    icon: '🎨',
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const updateMatch = () => setIsMobile(media.matches);
    updateMatch();

    media.addEventListener('change', updateMatch);
    return () => media.removeEventListener('change', updateMatch);
  }, []);

  return isMobile;
}

export default function PlayfulLightShowcase() {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return (
      <>
        <div className="block md:hidden">
          <MobileView />
        </div>
        <div className="hidden md:block">
          <DesktopView />
        </div>
      </>
    );
  }

  return isMobile ? <MobileView /> : <DesktopView />;
}

function MobileView() {
  return (
    <div className="w-full bg-[#FFFFFF] px-4 py-4 font-quicksand antialiased text-[#2D3436]">
      <div className="max-w-md mx-auto">
        
        <div className="flex items-center justify-between mb-4">
          <span className="bg-[#FFE66D] border-2 border-[#2D3436] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-[#2D3436]">
            FEATURED COLLECTIONS
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4ECDC4] border-2 border-[#2D3436] text-[#2D3436] text-xs font-black uppercase tracking-wider"
          >
            <Sparkles className="w-3 h-3" />
            <span>All</span>
          </a>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoplay={false}
          pagination={{ clickable: true }}
          className="splitvantage-mobile-swiper !pb-10"
        >
          {projects.map((proj) => (
            <SwiperSlide key={proj.id}>
              <div className="bg-white rounded-[1.8rem] border-3 border-[#2D3436] p-4 shadow-[5px_5px_0px_0px_#2D3436] flex flex-col gap-4">
                {/* Image Container */}
                <div className="w-full aspect-[4/3] rounded-[1.2rem] border-2 border-[#2D3436] overflow-hidden bg-slate-50 relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Badge */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${proj.badgeColor}`}>
                      {proj.name}
                    </span>
                    <span className="text-base">{proj.icon}</span>
                  </div>

                  <h3 className="text-lg font-black text-[#2D3436] leading-snug">
                    {proj.title}
                  </h3>
                </div>

                {/* Specs */}
                <div className="space-y-1.5 pt-2 border-t-2 border-[#2D3436] text-xs">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="font-black text-[#636E72] uppercase text-[10px]">Age Group</span>
                    <span className="font-extrabold text-[#2D3436] bg-white px-2 py-0.5 rounded-md border border-[#2D3436]">{proj.year}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-t border-[#2D3436]/15">
                    <span className="font-black text-[#636E72] uppercase text-[10px]">Play Type</span>
                    <span className="font-extrabold text-[#2D3436] bg-white px-2 py-0.5 rounded-md border border-[#2D3436]">{proj.timeline}</span>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="button"
                  className={`w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-between border-2 border-[#2D3436] cursor-pointer ${proj.btnColor}`}
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function DesktopView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.round(latest * (projects.length - 1));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full bg-[#FFFFFF] text-[#2D3436] select-none font-quicksand antialiased"
        style={{ height: `${projects.length * 55}vh` }}
      >
        {/* ═══ PINNED STICKY VIEWPORT ═══ */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center p-4 md:p-8 overflow-hidden z-10">
          {/* CSS ACCENTS */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block">
            <div className="absolute top-10 right-10 flex flex-col items-center opacity-90 animate-balloon-float">
              <div className="w-12 h-14 bg-[#FF6B6B] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border-3 border-[#2D3436] flex items-center justify-center">
                <div className="w-2.5 h-5 bg-white/60 rounded-full -ml-3 -mt-2" />
              </div>
              <div className="w-2 h-3 bg-[#FFE66D] rounded-xs mt-0.5 border border-[#2D3436]" />
            </div>

            <div className="absolute bottom-12 left-12 flex text-[#FFE66D] animate-star-spin">
              <Star className="w-8 h-8 fill-[#FFE66D] stroke-[#2D3436] stroke-[2]" />
            </div>
          </div>

          {/* Main Card Container */}
          <div className="grid h-[85vh] w-full max-w-7xl grid-cols-12 gap-8 bg-white rounded-[2.5rem] p-6 lg:p-8 border-4 border-[#2D3436] shadow-[8px_8px_0px_0px_#2D3436]">
            {/* Left Column */}
            <div className="col-span-5 flex flex-col justify-between pr-8 border-r-3 border-[#2D3436]">
              {/* Top Indicator */}
              <div className="flex justify-between items-start w-full gap-2">
                <div className="flex flex-col gap-2.5">
                  {projects.map((proj, idx) => (
                    <div key={proj.id} className="flex items-center gap-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 border-[#2D3436] transition-all duration-300 ${
                          activeIndex === idx
                            ? 'bg-[#FF6B6B] scale-110'
                            : 'bg-[#FFFFFF] scale-90'
                        }`}
                      />
                      <span
                        className={`text-xs font-black uppercase tracking-wider transition-colors duration-300 ${
                          activeIndex === idx
                            ? 'text-[#2D3436]'
                            : 'text-[#636E72]'
                        }`}
                      >
                        {proj.name}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFE66D] border-2 border-[#2D3436] text-[#2D3436] text-xs font-black uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0.5 transition-all shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2D3436]" />
                  <span>All Collections</span>
                </a>
              </div>

              {/* Dynamic Text Content */}
              <div className="relative my-auto flex-1 py-6 flex flex-col justify-center">
                <div
                  key={activeIndex}
                  className="animate-content-in space-y-5 w-full"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase ${projects[activeIndex].badgeColor}`}
                    >
                      {projects[activeIndex].name}
                    </span>
                    <span className="inline-block text-xl animate-emoji-wiggle">
                      {projects[activeIndex].icon}
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-black text-[#2D3436] leading-tight min-h-[6rem] tracking-tight">
                    {projects[activeIndex].title}
                  </h2>

                  <div className="space-y-3 pt-4 border-t-2 border-[#2D3436] text-sm">
                    <div className="flex justify-between items-center py-1">
                      <span className="font-black text-[#636E72] uppercase tracking-wider text-xs">
                        Recommended Age
                      </span>
                      <span className="font-extrabold text-[#2D3436] bg-[#FFFFFF] px-2.5 py-0.5 rounded-md border border-[#2D3436]">
                        {projects[activeIndex].year}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-t border-[#2D3436]/15">
                      <span className="font-black text-[#636E72] uppercase tracking-wider text-xs">
                        Play Duration
                      </span>
                      <span className="font-extrabold text-[#2D3436] bg-[#FFFFFF] px-2.5 py-0.5 rounded-md border border-[#2D3436]">
                        {projects[activeIndex].timeline}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-t border-[#2D3436]/15">
                      <span className="font-black text-[#636E72] uppercase tracking-wider text-xs">
                        Skills Developed
                      </span>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {projects[activeIndex].services.map((service, i) => (
                          <span
                            key={i}
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-black border-2 border-[#2D3436] ${projects[activeIndex].pillColor}`}
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-between border-3 border-[#2D3436] hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200 group mt-4 cursor-pointer ${projects[activeIndex].btnColor}`}
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-5 h-5 stroke-[3] transform group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Right Column - Image Reveal Container */}
            <div className="relative col-span-7 h-full w-full overflow-hidden rounded-[2rem] border-3 border-[#2D3436] bg-[#FFFFFF] p-2">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-white border-2 border-[#2D3436]">
                {projects.map((proj, i) => (
                  <ProjectImage
                    key={proj.id}
                    project={proj}
                    index={i}
                    total={projects.length}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightweight Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes balloonFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -14px, 0) rotate(6deg); }
        }
        @keyframes starSpin {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(20deg); }
        }
        @keyframes emojiWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translate3d(0, 8px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .animate-balloon-float {
          animation: balloonFloat 5.5s ease-in-out infinite;
        }
        .animate-star-spin {
          animation: starSpin 4s ease-in-out infinite;
        }
        .animate-emoji-wiggle {
          animation: emojiWiggle 2s ease-in-out infinite;
        }
        .animate-content-in {
          animation: contentIn 0.2s ease-out forwards;
        }

        .splitvantage-mobile-swiper .swiper-pagination-bullet {
          background: #2D3436;
        }
      ` }} />
    </>
  );
}

/* -------------------------------------------------------
   DESKTOP IMAGE REVEAL TRANSITION
------------------------------------------------------- */

function ProjectImage({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  if (index === 0) {
    return (
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const segment = 1 / (total - 1);
  const startWipe = (index - 1) * segment;
  const endWipe = startWipe + segment * 0.75;
  const holdEnd = index * segment;

  const clipPath = useTransform(
    progress,
    [startWipe, endWipe, holdEnd, 1],
    [
      'inset(100% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
    ],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        zIndex: index,
        clipPath,
      }}
      className="absolute inset-0 h-full w-full overflow-hidden will-change-[clip-path]"
    >
      <img
        src={project.image}
        alt={project.title}
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}