"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Leaf, CheckCircle, Award, Star, ArrowRight } from "lucide-react";

// ============================================================================
// 1. DATA (Static Certifications List)
// ============================================================================
const CERTIFICATIONS = [
  {
    id: "bis",
    title: "BIS Certified",
    subtitle: "Bureau of Indian Standards",
    desc: "Our products undergo strict testing to meet the comprehensive safety and quality requirements set by the Bureau of Indian Standards, ensuring complete peace of mind.",
    color: "bg-[#FF5A5F]",
    icon: <Award className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    image: "/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg",
  },
  {
    id: "fsc",
    title: "FSC™ Certified Wood",
    subtitle: "Forest Stewardship Council",
    desc: "We exclusively use timber from responsibly managed forests. The FSC certification guarantees our wood is harvested sustainably, protecting global ecosystems.",
    color: "bg-[#00C4B5]",
    icon: <Leaf className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    image: "/assets/WHOWEARE/Empty_children_playroom_with_toys_202608081653.jpeg",
  },
  {
    id: "en71",
    title: "EN71 Compliant",
    subtitle: "European Toy Safety Standard",
    desc: "Tested for mechanical, physical, and chemical properties. Our products contain absolutely zero toxic paints or heavy metals, far exceeding EN71 baseline requirements.",
    color: "bg-[#0284C7]",
    icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    image: "/assets/WHOWEARE/Playroom_with_castle_and_toys_202608081652.jpeg",
  },
  {
    id: "ce",
    title: "CE Marking",
    subtitle: "Conformité Européenne",
    desc: "A testament to our uncompromising dedication to health, safety, and environmental protection standards within the European Economic Area and globally.",
    color: "bg-[#FF7A59]",
    icon: <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    image: "/assets/WHOWEARE/Playroom_with_toys_and_furniture_202608081652.jpeg",
  },
];

// ============================================================================
// 2. HELPER SUB-COMPONENTS
// ============================================================================

// Floating Stamp Badge (Pure CSS Animation)
function StampBadge() {
  return (
    <div className="absolute right-[4%] top-[8%] sm:right-[6%] sm:top-[10%] lg:right-[8%] lg:top-[12%] z-20 pointer-events-none transform-gpu animate-stamp-badge">
      <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full border-[6px] sm:border-[8px] md:border-[10px] border-[#00C4B5] text-[#00C4B5] flex flex-col items-center justify-center bg-white shadow-lg transform -rotate-12">
        <Star className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 mb-0.5 sm:mb-1 fill-[#00C4B5]" />
        <span className="font-black text-lg sm:text-2xl md:text-4xl uppercase tracking-widest leading-none">
          Passed
        </span>
        <span className="font-bold text-[9px] sm:text-xs md:text-sm uppercase tracking-widest mt-0.5 sm:mt-1 text-zinc-500">
          Global Stds
        </span>
      </div>
    </div>
  );
}

// Single Certification Card
function CertCard({ cert, index }: { cert: (typeof CERTIFICATIONS)[0]; index: number }) {
  const isOffset = index % 2 === 1;

  return (
    <div className={`relative group flex flex-col hover:-translate-y-1.5 transition-transform duration-300 ${isOffset ? "md:mt-24" : ""}`}>
      {/* Card Image Banner */}
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-zinc-100">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          quality={70}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center sm:group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Floating Category Icon */}
        <div
          className={`absolute top-5 left-5 sm:top-8 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full ${cert.color} flex items-center justify-center sm:group-hover:rotate-12 transition-transform duration-300 shadow-md`}
        >
          {cert.icon}
        </div>
      </div>

      {/* Card Text Content */}
      <div className="mt-4 sm:mt-6 px-2 sm:px-4">
        <div className="text-xs sm:text-sm font-bold text-[#00C4B5] uppercase tracking-widest mb-1 sm:mb-2">
          {cert.subtitle}
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 mb-2 sm:mb-3">
          {cert.title}
        </h3>
        <p className="text-zinc-600 font-medium text-base sm:text-lg leading-relaxed">
          {cert.desc}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 3. MAIN PAGE COMPONENT
// ============================================================================
export default function CertificationPageContent() {
  return (
    <div className="bg-white text-zinc-900 font-quicksand selection:bg-[#00C4B5] selection:text-white">
      {/* ─── 1. HERO SECTION ─────────────────────────────── */}
      <section className="relative min-h-[65vh] md:min-h-[75vh] py-12 md:py-16 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e0f7fa] to-[#e3f2f7]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/WHOWEARE/Brightly_lit_empty_playroom_toys_202608081652.jpeg"
            alt="Bright Safe Play Area"
            fill
            sizes="100vw"
            className="object-cover opacity-60 md:opacity-70"
            priority
          />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mt-6 sm:mt-12 bg-white/85 p-6 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[3rem] border border-white/60 shadow-xs">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-[#00C4B5] font-bold text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6 border border-cyan-100">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> Verified Safety Standards
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] md:leading-[0.95] tracking-tight text-zinc-900 mb-4 sm:mb-6">
            Tested for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C4B5] to-[#FF5A5F]">
              Safety &amp; Quality.
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-zinc-800 font-semibold max-w-3xl mx-auto leading-relaxed">
            We don't just build furniture. We engineer peace of mind. Discover the rigorous international standards behind every ToyPark product.
          </p>
        </div>

        {/* Floating Stamp */}
        <StampBadge />

        {/* Scroll Indicator */}
        <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 text-xs font-bold tracking-widest uppercase">
          <div className="w-6 h-10 border-2 border-zinc-500 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full opacity-75 animate-bounce" />
          </div>
          Scroll
        </div>
      </section>

      {/* ─── 2. CERTIFICATIONS SECTION ───────────────────── */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-3 sm:mb-5">
            Our Badges of Honor
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-500 font-medium max-w-3xl mx-auto">
            Each certification represents hours of testing, sustainable sourcing, and an unwavering commitment to quality.
          </p>
        </div>

        {/* Grid mapping through certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {CERTIFICATIONS.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </section>

      {/* ─── 3. BOTTOM CTA SECTION ───────────────────────── */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 bg-zinc-900 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 sm:mb-8">
            Ready to Build with <br className="hidden md:block" />
            <span className="text-[#00C4B5]">Absolute Confidence?</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-xl font-medium mb-8 sm:mb-12 max-w-2xl mx-auto">
            Partner with ToyPark to bring certified, premium children's furniture to your market or project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[#00C4B5] hover:bg-[#00a89b] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg active:translate-y-1 hover:translate-y-1 transition-[transform,background-color] duration-200"
            >
              Explore Catalog <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-colors duration-200"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* Floating Stamp CSS Animation */}
      <style jsx>{`
        @keyframes stampPop {
          0% {
            transform: scale(3.5) rotate(35deg);
            opacity: 0;
          }
          75% {
            transform: scale(0.95) rotate(-15deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(-12deg);
            opacity: 1;
          }
        }
        @keyframes stampFloat {
          0%, 100% {
            transform: translateY(0px) rotate(-12deg);
          }
          50% {
            transform: translateY(-8px) rotate(-7deg);
          }
        }
        :global(.animate-stamp-badge) {
          animation: stampPop 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, stampFloat 3s ease-in-out 0.9s infinite !important;
        }
      `}</style>
    </div>
  );
}