"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Heart, Zap, Globe, Coffee, ArrowRight, ChevronDown, CheckCircle2, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// ============================================================================
// 1. DATA (Static Information)
// ============================================================================
const PERKS_DATA = [
  {
    title: "Creative Freedom",
    desc: "We believe the best ideas come from play. Experiment, tinker, and build without boundaries.",
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF5A5F]" />,
    color: "bg-[#FF5A5F]/10",
  },
  {
    title: "Health & Wellness",
    desc: "Comprehensive health coverage, mental health days, and an in-house wellness program.",
    icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#00C4B5]" />,
    color: "bg-[#00C4B5]/10",
  },
  {
    title: "Global Impact",
    desc: "Your work will touch the lives of millions of children around the world, fostering safe play.",
    icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-[#0284C7]" />,
    color: "bg-[#0284C7]/10",
  },
  {
    title: "Flexible Work",
    desc: "Whether you thrive in our vibrant office or your cozy home setup, we support hybrid working.",
    icon: <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF7A59]" />,
    color: "bg-[#FF7A59]/10",
  },
];

const OPEN_ROLES_DATA = [
  {
    id: 1,
    title: "Lead Product Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    desc: "We're looking for a visionary designer to lead the creation of our next generation of sustainable wooden toys.",
    reqs: ["5+ years experience in industrial or product design", "Portfolio demonstrating physical product design", "Passion for child development"],
  },
  {
    id: 2,
    title: "Quality Assurance Specialist",
    department: "Engineering & Safety",
    location: "On-site (Testing Lab)",
    type: "Full-time",
    desc: "Ensure every product leaving our facility exceeds global safety standards (BIS, EN71, CE).",
    reqs: ["Background in material science or compliance", "Meticulous attention to detail", "Experience with ISO standards"],
  },
  {
    id: 3,
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    desc: "Drive our B2B and D2C growth through innovative campaigns, partnerships, and data-driven strategies.",
    reqs: ["Proven track record in e-commerce growth", "Strong analytical skills", "Creative campaign execution"],
  },
];

const GALLERY_IMAGES = [
  "/assets/WHOWEARE/Kids_play_area_with_toys_202608081617.jpeg",
  "/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg",
  "/assets/WHOWEARE/Organized_playroom_with_toys_2K_202608081617.jpeg",
  "/assets/WHOWEARE/Playroom_with_toys_and_furniture_202608081652.jpeg",
];

// ============================================================================
// 2. HELPER HOOK: Scroll Animations
// ============================================================================
function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, domRef };
}

// ============================================================================
// 3. UI SUB-COMPONENTS
// ============================================================================

function PerkCard({ perk, delayIndex }: { perk: any; delayIndex: number }) {
  const { isVisible, domRef } = useIntersectionObserver();

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delayIndex * 150}ms` }}
      className={`group p-5 sm:p-10 md:p-12 rounded-3xl sm:rounded-[3rem] bg-white border border-zinc-100 hover:border-[#00C4B5]/30 transition-[transform,opacity,border-color] duration-700 hover:-translate-y-2 h-full flex flex-col justify-between ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div>
        <div className={`w-12 h-12 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl ${perk.color} flex items-center justify-center mb-3 sm:mb-8 group-hover:scale-105 transition-transform duration-300`}>
          {perk.icon}
        </div>
        <h3 className="text-lg sm:text-3xl font-extrabold text-zinc-900 mb-1.5 sm:mb-4">{perk.title}</h3>
        <p className="text-xs sm:text-xl text-zinc-600 font-medium leading-relaxed">{perk.desc}</p>
      </div>
    </div>
  );
}

function RoleAccordion({ role, isOpen, onToggle }: { role: any; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-[2rem] border border-zinc-200 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <button
        onClick={onToggle}
        className="w-full px-5 py-6 sm:px-8 sm:py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between text-left gap-3 sm:gap-4"
      >
        <div>
          <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm font-bold tracking-widest uppercase">
            <span className="text-[#FF5A5F]">{role.department}</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-500">{role.type}</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-900">{role.title}</h3>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 text-zinc-500 font-medium text-sm sm:text-base">
          <span>{role.location}</span>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#FF5A5F] text-white" : "bg-zinc-100 text-zinc-500"}`}>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </button>

      <div className={`px-5 sm:px-8 transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? "max-h-[800px] pb-6 sm:pb-10 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="h-px w-full bg-zinc-100 mb-6 sm:mb-8" />
        <p className="text-base sm:text-lg text-zinc-600 font-medium leading-relaxed mb-6 sm:mb-8">{role.desc}</p>

        <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 sm:mb-4">What we're looking for:</h4>
        <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
          {role.reqs.map((req: string, i: number) => (
            <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-zinc-600 font-medium">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00C4B5] shrink-0 mt-0.5" />
              <span>{req}</span>
            </li>
          ))}
        </ul>

        <button className="w-full sm:w-auto bg-[#FF5A5F] hover:bg-[#e04e53] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:-translate-y-0.5 transition-[transform,background-color] duration-200">
          Apply for this position
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 4. MAIN PAGE COMPONENT
// ============================================================================
export default function CareersPageContent() {
  const [activeRole, setActiveRole] = useState<number | null>(null);

  const toggleRole = (id: number) => {
    setActiveRole(activeRole === id ? null : id); 
  };

  const scrollToRoles = () => {
    document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-zinc-900 font-quicksand selection:bg-[#FF5A5F] selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[65vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF5F5] via-[#FFF9E6] to-[#E6F9F8] pt-12 sm:pt-20 px-4 sm:px-6">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/WHOWEARE/Children's_playroom_showcase_2K_202608081617.jpeg"
            alt="Playroom showcase"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 md:px-16 py-6 sm:py-12 md:py-16 max-w-5xl bg-white/80 border border-white/80 rounded-3xl sm:rounded-[3rem] my-4 sm:my-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[#FF5A5F] font-bold text-xs sm:text-sm tracking-widest uppercase mb-6 sm:mb-8 border border-pink-100">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF5A5F]" /> We are hiring
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black leading-[1.05] sm:leading-[0.95] tracking-tight text-zinc-900 mb-6 sm:mb-8">
            Join the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A5F] via-[#FF7A59] to-[#00C4B5]">Playground.</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-zinc-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Help us build the future of play. We're looking for dreamers, makers, and safety-obsessed creators.
          </p>

          <button
            onClick={scrollToRoles}
            className="mt-8 sm:mt-12 bg-[#FF5A5F] hover:bg-[#e04e53] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:-translate-y-0.5 transition-[transform,background-color] duration-200 flex items-center gap-2 sm:gap-3 cursor-pointer"
          >
            View Open Roles <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section className="relative py-8 sm:py-20 px-4 sm:px-6 bg-[#FFF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4">Life at ToyPark</h2>
            <p className="text-zinc-600 font-medium text-xs sm:text-lg max-w-xl mx-auto">Inside our colorful space where creativity, safety, and joy come together.</p>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-6 md:gap-8">
            {GALLERY_IMAGES.map((src, idx) => (
              <div key={idx} className="relative h-[320px] md:h-[400px] rounded-[2.5rem] overflow-hidden group border-4 border-white">
                <Image
                  src={src}
                  alt={`Life at ToyPark ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>

          {/* Mobile Swiper Layout */}
          <div className="block sm:hidden careers-gallery-swiper">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              slidesPerView={1.15}
              spaceBetween={14}
              centeredSlides={false}
              className="w-full !pb-7"
            >
              {GALLERY_IMAGES.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-[260px] rounded-3xl overflow-hidden border-2 border-white">
                    <Image
                      src={src}
                      alt={`Life at ToyPark ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* --- PERKS SECTION --- */}
      <section className="relative py-8 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF9F6] via-white to-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-20 relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-2 sm:mb-6">Why You'll Love It Here</h2>
            <p className="text-xs sm:text-xl text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
              We take care of our team so they can take care of crafting the best products for children.
            </p>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 relative z-10">
            {PERKS_DATA.map((perk, idx) => (
              <PerkCard key={idx} perk={perk} delayIndex={idx} />
            ))}
          </div>

          {/* Mobile Swiper Layout */}
          <div className="block md:hidden careers-perks-swiper relative z-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              slidesPerView={1.05}
              spaceBetween={14}
              className="w-full !pb-7"
            >
              {PERKS_DATA.map((perk, idx) => (
                <SwiperSlide key={idx} className="h-auto">
                  <PerkCard perk={perk} delayIndex={0} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* --- OPEN ROLES SECTION --- */}
      <section id="open-roles" className="relative py-8 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-16 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-2 sm:mb-6">Open Roles</h2>
            <p className="text-xs sm:text-xl text-zinc-500 font-medium">Find your next big adventure with us.</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {OPEN_ROLES_DATA.map((role) => (
              <RoleAccordion
                key={role.id}
                role={role}
                isOpen={activeRole === role.id}
                onToggle={() => toggleRole(role.id)}
              />
            ))}
          </div>

          {/* Call to Action Box */}
          <div className="mt-12 sm:mt-20 text-center bg-gradient-to-r from-[#00C4B5] to-[#FF5A5F] text-white p-8 sm:p-12 rounded-3xl sm:rounded-[3rem]">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">Don't see a fit?</h3>
            <p className="text-white/90 font-medium mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-lg leading-relaxed">
              We're always on the lookout for incredible talent. Send us your resume and tell us why you belong at ToyPark.
            </p>
            <button className="w-full sm:w-auto bg-white hover:bg-zinc-50 text-zinc-900 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:-translate-y-0.5 transition-[transform,background-color] duration-200 cursor-pointer">
              Submit Open Application
            </button>
          </div>
        </div>
      </section>

      {/* Styled Swiper Pagination Bullets */}
      <style jsx global>{`
        .careers-gallery-swiper .swiper-pagination-bullet,
        .careers-perks-swiper .swiper-pagination-bullet {
          background: #00C4B5;
          opacity: 0.3;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .careers-gallery-swiper .swiper-pagination-bullet-active,
        .careers-perks-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 9999px;
          background: #FF5A5F;
        }
      `}</style>
    </div>
  );
}