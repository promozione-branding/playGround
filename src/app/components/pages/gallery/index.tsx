'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Wrench, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// 1. DATA (Static Information)
// ============================================================================
export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  description: string;
  tags?: string[];
  category?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    url: '/assets/split_vantage_images/kids_playsHouse.png',
    title: 'Wondear Dreamhouse Play Tent',
    description: 'A magical retreat crafted with durable ABS polymer and breathable mesh windows for endless roleplay.',
    tags: ['Playhouse', 'Indoor', 'Ages 3-6', 'Roleplay'],
    category: 'Playhouses',
  },
  {
    id: 2,
    url: '/assets/split_vantage_images/Kids_Furniture.png',
    title: 'Modern Ergonomic Kids Furniture Set',
    description: 'Sustainably sourced birch wood study & activity table set designed for comfort, safety, and creative sessions.',
    tags: ['Furniture', 'Wooden', 'Activity', 'Ergonomic'],
    category: 'Furniture',
  },
  {
    id: 3,
    url: '/assets/split_vantage_images/Kids_Trampoline.png',
    title: 'Safety Enclosed Active Trampoline',
    description: 'Heavy-duty steel framed active jump arena featuring 360-degree safety netting and padded spring guards.',
    tags: ['Trampoline', 'Outdoor', 'Active Play', 'Safety Certified'],
    category: 'Active Play',
  },
  {
    id: 4,
    url: '/assets/WHOWEARE/Organized_playroom_with_toys_2K_202608081617.jpeg',
    title: 'Interactive Wooden Learning Blocks',
    description: 'Vibrant non-toxic organic dyed Montessori building blocks that nurture spatial thinking and fine motor skills.',
    tags: ['Learning', 'Montessori', 'Blocks', 'Non-Toxic'],
    category: 'Learning',
  },
  {
    id: 5,
    url: '/assets/WHOWEARE/Playroom_with_castle_and_toys_202608081652.jpeg',
    title: 'Adventure Climber & Play Slide',
    description: 'All-weather modular indoor/outdoor slide unit engineered for smooth playdates and active coordination.',
    tags: ['Slide', 'Active', 'Climber', 'EN71 Certified'],
    category: 'Active Play',
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, text: '100% Non-Toxic & BIS Certified', color: 'text-[#00C4B5]' },
  { icon: Wrench, text: 'Handcrafted Quality', color: 'text-[#FF6B6B]' },
  { icon: Rocket, text: 'Easy 5-Min Assembly', color: 'text-[#9B59B6]' },
];

// ============================================================================
// 2. SUB-COMPONENTS
// ============================================================================

// Individual Accordion Image Card
interface AccordionCardProps {
  item: GalleryItem;
  isActive: boolean;
  onSelect: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

function AccordionCard({ item, isActive, onSelect, cardRef }: AccordionCardProps) {
  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      onMouseEnter={onSelect}
      className={`relative h-[340px] sm:h-[400px] md:h-[460px] shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-[#2D3436] transition-[width,transform] duration-300 ease-out cursor-pointer snap-center select-none ${
        isActive
          ? 'w-[calc(100vw-130px)] sm:w-[460px] md:w-[560px] shadow-lg'
          : 'w-[32px] sm:w-[75px] md:w-[90px] hover:brightness-110'
      }`}
    >
      {/* Background Image */}
      <Image
        src={item.url}
        alt={item.title}
        fill
        quality={80}
        sizes="(max-width: 640px) 75vw, (max-width: 1024px) 460px, 560px"
        className={`object-cover transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-105'}`}
        draggable={false}
      />

      {/* Content Overlay (Visible when Active) */}
      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent p-3.5 sm:p-6 md:p-8 text-white transition-[opacity,transform] duration-300 ${
          isActive
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        {item.category && (
          <span className="bg-[#FFE66D] text-[#2D3436] text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full w-fit mb-1.5 sm:mb-2.5 shadow-xs">
            {item.category}
          </span>
        )}

        <h3 className="text-sm sm:text-xl md:text-2xl font-black tracking-tight leading-snug text-white drop-shadow-sm">
          {item.title}
        </h3>

        <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-gray-200 leading-relaxed max-w-md font-medium line-clamp-2 sm:line-clamp-none">
          {item.description}
        </p>

        {item.tags && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-4">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/20 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Inactive Vertical Title Label */}
      {!isActive && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 hover:from-black/40 hover:to-black/50 transition-colors flex items-center justify-center">
          <span className="text-white font-extrabold text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] rotate-90 whitespace-nowrap opacity-95 drop-shadow-md">
            {item.title}
          </span>
        </div>
      )}
    </div>
  );
}

// Mobile Previous / Next Controls and Indicators
function MobileNavigation({
  currentIndex,
  totalItems,
  onPrev,
  onNext,
  onSelect,
}: {
  currentIndex: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-between w-full max-w-xs px-4 pt-4 sm:hidden">
      <button
        type="button"
        onClick={onPrev}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-zinc-800 active:bg-gray-100 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 text-[#2D3436]" />
      </button>

      {/* Dot Indicators */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalItems }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={`transition-[width,background-color] duration-200 rounded-full ${
              currentIndex === i ? 'w-5 h-2 bg-[#FF5722]' : 'w-2 h-2 bg-zinc-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FFE66D] border border-zinc-800 active:bg-yellow-200 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 text-[#2D3436]" />
      </button>
    </div>
  );
}

// ============================================================================
// 3. ACCORDION GALLERY WRAPPER
// ============================================================================
interface GalleryProps {
  items: GalleryItem[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function AccordionGallery({ items, setIndex, index }: GalleryProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const showcaseItems = items.slice(0, 5);

  // Auto-center active card on mobile viewport
  useEffect(() => {
    if (itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [index]);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : showcaseItems.length - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < showcaseItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Horizontal Accordion Container */}
      <div className="mx-auto flex w-full max-w-6xl justify-start sm:justify-center gap-2 sm:gap-4 py-4 sm:py-6 overflow-x-auto scrollbar-none px-4 sm:px-6 snap-x snap-mandatory">
        {showcaseItems.map((item, i) => (
          <AccordionCard
            key={item.id}
            item={item}
            isActive={index === i}
            onSelect={() => setIndex(i)}
            cardRef={(el) => {
              itemRefs.current[i] = el;
            }}
          />
        ))}

        {/* Spacer to prevent right-edge clipping on mobile */}
        <div className="w-6 sm:w-0 shrink-0" aria-hidden="true" />
      </div>

      {/* Mobile-only Navigation Controls */}
      <MobileNavigation
        currentIndex={index}
        totalItems={showcaseItems.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={setIndex}
      />
    </div>
  );
}

// ============================================================================
// 4. MAIN PAGE COMPONENT
// ============================================================================
export default function GalleryPageContent() {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full relative overflow-hidden font-sans text-[#2D3436] py-6 sm:py-10">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Top Tag Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#FFE66D] text-[#2D3436] text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-zinc-800 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
          <span>ToyPark Interactive Showcase</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Where Imagination Meets <span className="text-[#FF5722]">Playful Innovation</span>
        </h1>

        <p className="text-gray-600 font-medium text-xs sm:text-base mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
          Step into the magical world of ToyPark! From custom playhouses and ergonomic kids furniture
          to active trampolines and safety-certified Montessori toys.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 text-xs sm:text-sm font-semibold">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-zinc-200"
              >
                <Icon className={`w-4 h-4 ${badge.color}`} />
                <span>{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion Showcase */}
      <div className="mt-4 sm:mt-6">
        <AccordionGallery items={GALLERY_ITEMS} index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}