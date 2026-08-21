"use client";

import { useState } from "react";
import {
  Heart,
  ArrowRight,
  Palette,
  Scale,
  Blocks,
  Puzzle,
  Rainbow,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ToyCardData {
  cat: string;
  age: string;
  sub: string;
  title: string;
  desc: string;
  img: string;
  fallback: string;
  emoji: string;
  stars: string;
  reviews: string;
}

const CARDS: ToyCardData[] = [
  {
    cat: "Creativity",
    age: "3–8 yrs",
    sub: "Easels, Drawers & Playhouses",
    title: "Creativity & Imagination",
    desc: "Art stations and play spaces that spark endless childhood imagination.",
    img: "/assets/ToysEveryNeed/kids1.webp",
    fallback: "#b2ede6",
    emoji: "🎨",
    stars: "★★★★★",
    reviews: "(2.4k)",
  },
  {
    cat: "Balance",
    age: "2–6 yrs",
    sub: "Swings, Boards & Active Play",
    title: "Balance & Coordination",
    desc: "Indoor swings and rockers designed to develop core stability.",
    img: "/assets/ToysEveryNeed/kids2.webp",
    fallback: "#7de8f4",
    emoji: "⚖️",
    stars: "★★★★★",
    reviews: "(1.8k)",
  },
  {
    cat: "Motor Skills",
    age: "1–5 yrs",
    sub: "Slides, Blocks & Towers",
    title: "Fine Motor Skills",
    desc: "Slides and stacking sets built to hone hand-eye coordination.",
    img: "/assets/ToysEveryNeed/kids3.webp",
    fallback: "#a7f3d0",
    emoji: "🧱",
    stars: "★★★★☆",
    reviews: "(3.1k)",
  },
  {
    cat: "Cognitive",
    age: "4–10 yrs",
    sub: "Puzzles & Memory Kits",
    title: "Cognitive Development",
    desc: "Engaging brain puzzles tailored for early childhood problem solving.",
    img: "/assets/ToysEveryNeed/kids4.webp",
    fallback: "#c4b5fd",
    emoji: "🧩",
    stars: "★★★★★",
    reviews: "(980)",
  },
  {
    cat: "Sensory",
    age: "0–3 yrs",
    sub: "Tactile Kits & Soft Play",
    title: "Sensory Exploration",
    desc: "Textured exploration kits designed for safe tactile discovery.",
    img: "/assets/ToysEveryNeed/kids5.webp",
    fallback: "#fca5a5",
    emoji: "🌈",
    stars: "★★★★★",
    reviews: "(1.2k)",
  },
];

function ToyCard({ card }: { card: ToyCardData }) {
  const [error, setError] = useState(false);

  return (
    <article
      className="
        group relative w-full overflow-hidden
        rounded-[22px]
        border border-[#b2ede6]
        bg-white
        transition-transform duration-200
        hover:-translate-y-1
        h-full flex flex-col justify-between
      "
    >
      <div>
        {/* Image */}
        <div
          className="
            relative flex h-[210px]
            items-center justify-center
            overflow-hidden
            bg-[#FDF3E7]
          "
          style={{
            backgroundColor: error ? card.fallback : "#FDF3E7",
          }}
        >
          {error ? (
            <span className="text-5xl">{card.emoji}</span>
          ) : (
            <img
              src={card.img}
              alt={card.title}
              loading="lazy"
              decoding="async"
              width={540}
              height={420}
              className="
                h-full w-full
                object-cover object-top
              "
              onError={() => setError(true)}
            />
          )}

          {/* Category */}
          <span
            className="
              absolute left-3 top-3
              rounded-full
              border border-[#2cbfb3]/40
              bg-white/95
              px-2.5 py-1
              text-[10px] font-extrabold
              uppercase tracking-wider
              text-[#1f4e4b]
            "
          >
            {card.cat}
          </span>

          {/* Age */}
          <span
            className="
              absolute right-3 top-3
              rounded-full
              bg-[#2cbfb3]
              px-2.5 py-1
              text-[10px] font-extrabold
              text-white
            "
          >
            {card.age}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <span
            className="
              mb-1 block
              text-[10px] font-extrabold
              uppercase tracking-widest
              text-[#1a9e93]
            "
          >
            {card.sub}
          </span>

          <h3 className="mb-1.5 text-[15px] font-extrabold leading-snug text-[#0d2b2a]">
            {card.title}
          </h3>

          <div className="mb-3 flex items-center gap-1.5">
            <span className="text-xs tracking-wider text-[#f59e0b]">
              {card.stars}
            </span>

            <span className="text-[11px] font-semibold text-[#4a8c88]">
              {card.reviews}
            </span>
          </div>

          <p className="mb-4 line-clamp-3 text-xs font-medium leading-relaxed text-[#4a8c88]">
            {card.desc}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <button
          type="button"
          className="
            flex-1
            inline-flex items-center justify-center gap-1.5
            rounded-[13px]
            bg-[#2cbfb3]
            py-2.5
            text-xs font-bold
            uppercase tracking-wider
            text-white
            transition-colors
            hover:bg-[#1a9e93]
            cursor-pointer
          "
        >
          Shop now
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          aria-label={`Add ${card.title} to wishlist`}
          className="
            flex h-[38px] w-[38px]
            shrink-0 items-center justify-center
            rounded-[13px]
            border border-[#b2ede6]
            text-[#2cbfb3]
            transition-colors
            hover:bg-[#e0f7f4]
            hover:text-[#e11d48]
            cursor-pointer
          "
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function ToysEveryNeed() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br
        from-[#e8faf8]
        via-[#cff4f8]
        to-[#dffaf7]
        pt-6 pb-12
        font-quicksand
        md:py-16
      "
    >
      {/* Mascot Floating Animation Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mascotFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(5deg);
          }
        }
        .mascot {
          animation: mascotFloat 5s ease-in-out infinite;
        }
        .mascot-delay {
          animation-delay: 1.5s;
        }
        .toys-swiper .swiper-pagination-bullet {
          background: #2cbfb3;
        }
      ` }} />

      {/* Small ambient decorations */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute -left-20 -top-20
          h-56 w-56
          rounded-full
          bg-[#22d3e8]/10
          blur-2xl
        "
      />

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute -bottom-20 -right-16
          h-48 w-48
          rounded-full
          bg-[#2cbfb3]/10
          blur-2xl
        "
      />

      {/* Floating mascot 1 */}
      <div
        aria-hidden
        className="
          mascot
          pointer-events-none
          absolute left-[8%] top-[10%]
          z-10
          hidden h-20 w-20
          rounded-full
          bg-[#b2ede6]/40
          p-2
          sm:flex
          md:h-24 md:w-24
          md:left-[18%]
          lg:left-[24%]
        "
      >
        <img
          src="/assets/icons/icon_mastcoff.avif"
          alt=""
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Floating mascot 2 */}
      <div
        aria-hidden
        className="
          mascot mascot-delay
          pointer-events-none
          absolute right-[8%] top-[8%]
          z-10
          hidden h-20 w-20
          rounded-full
          bg-[#a7f3d0]/40
          p-2
          sm:flex
          md:h-24 md:w-24
          md:right-[18%]
          lg:right-[24%]
        "
      >
        <img
          src="/assets/icons/icon_mastcoff2.avif"
          alt=""
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Header */}
      <header className="relative z-20 mb-10 px-4 text-center">

        <h2
          className="
            mb-2.5
            text-3xl font-black
            tracking-tight
            text-[#0d2b2a]
            sm:text-4xl
            md:text-5xl
          "
        >
          Toys for{" "}
          <span className="text-[#1a9e93]">
            Every
          </span>{" "}
          Need
        </h2>

        <p className="mx-auto max-w-[420px] text-sm leading-relaxed text-[#4a8c88]">
          Play collections crafted to nurture creativity, movement, and
          essential developmental milestones.
        </p>
      </header>

      {/* Swiper Slider */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={false}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            prevEl: '.custom-prev-btn',
            nextEl: '.custom-next-btn',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="toys-swiper !pb-12"
        >
          {CARDS.map((card, idx) => (
            <SwiperSlide key={idx} className="!h-auto flex">
              <ToyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="custom-prev-btn absolute left-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-[#b2ede6] text-[#1f4e4b] flex items-center justify-center shadow-md hover:bg-[#2cbfb3] hover:text-white transition-colors cursor-pointer">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="custom-next-btn absolute right-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-[#b2ede6] text-[#1f4e4b] flex items-center justify-center shadow-md hover:bg-[#2cbfb3] hover:text-white transition-colors cursor-pointer">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

    </section>
  );
}