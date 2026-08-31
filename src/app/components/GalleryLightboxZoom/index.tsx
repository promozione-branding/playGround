"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

type Shape = "portrait" | "landscape" | "square";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  caption: string;
  location: string;
  shape: Shape;
}

const PHOTOS: Photo[] = [
  {
    id: 1,
    src: "/assets/split_vantage_images/kids_playsHouse.png",
    title: "Wonderland Play Tent & Cottage",
    category: "Playhouses",
    caption: "Premium child-safe playhouse with mesh windows and durable wooden frame.",
    location: "ToyPark Playhouses",
    shape: "portrait",
  },
  {
    id: 2,
    src: "/assets/split_vantage_images/Kids_Furniture.png",
    title: "Ergonomic Activity Study Set",
    category: "Furniture",
    caption: "Sustainably crafted birch study table and chair set engineered for healthy posture.",
    location: "ToyPark Kids Furniture",
    shape: "landscape",
  },
  {
    id: 3,
    src: "/assets/split_vantage_images/Kids_Trampoline.png",
    title: "Safety Enclosed Jump Trampoline",
    category: "Active Play",
    caption: "360-degree padded safety net and heavy-duty steel frame for outdoor active play.",
    location: "ToyPark Active",
    shape: "square",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=75",
    title: "Montessori Wooden Learning Blocks",
    category: "Learning",
    caption: "Non-toxic organic dyed wooden building blocks nurturing spatial skills.",
    location: "ToyPark Montessori",
    shape: "portrait",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1566454544259-f4b94c96758f?auto=format&fit=crop&w=800&q=75",
    title: "Adventure Climber & Slide Unit",
    category: "Active Play",
    caption: "All-weather indoor/outdoor slide set built for gross motor development.",
    location: "ToyPark Active",
    shape: "landscape",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=75",
    title: "Pastel Preschool Activity Rug",
    category: "Classroom",
    caption: "Anti-skid washable plush play mat designed for classroom group activities.",
    location: "ToyPark Interiors",
    shape: "square",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=75",
    title: "Creative Soft Play Blocks",
    category: "Soft Play",
    caption: "High-density foam play cushions for toddler obstacle courses and building.",
    location: "ToyPark Toddlers",
    shape: "portrait",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=75",
    title: "Wooden Rainbow Stacker Toy",
    category: "Learning",
    caption: "Handcrafted natural wood arc set fostering open-ended creative play.",
    location: "ToyPark Craft",
    shape: "landscape",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=75",
    title: "Sensory Wooden Activity Board",
    category: "Montessori",
    caption: "Tactile fine-motor skill board with gear wheels, latches, and wooden beads.",
    location: "ToyPark Learning",
    shape: "square",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&w=800&q=75",
    title: "Eco Wooden Toy Train Set",
    category: "Play Sets",
    caption: "Smooth sanded beechwood track set with magnetic train cars and wooden trees.",
    location: "ToyPark Play Sets",
    shape: "square",
  },
];

const SPAN: Record<Shape, string> = {
  portrait: "sm:row-span-2",
  landscape: "sm:col-span-2",
  square: "",
};

export default function GalleryLightboxZoom() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const uid = useId().replace(/[:]/g, "");
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const open = activeIndex !== null;
  const active = activeIndex !== null ? PHOTOS[activeIndex] : null;

  const goTo = useCallback((idx: number) => {
    setActiveIndex(((idx % PHOTOS.length) + PHOTOS.length) % PHOTOS.length);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % PHOTOS.length));
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev]);

  return (
    <section
      aria-label="Photography gallery"
      className="relative w-full overflow-hidden bg-white px-3 py-8 text-gray-900 sm:px-8 sm:py-20 font-quicksand"
    >
      <style>{`
        @keyframes ${uid}-sheen {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          18% { opacity: 0.7; }
          60% { opacity: 0.7; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
        .${uid}-sheen::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%);
          transform: translateX(-120%) skewX(-18deg);
          pointer-events: none;
        }
        .${uid}-card:hover .${uid}-sheen::after {
          animation: ${uid}-sheen 1.1s ease-in-out;
        }
      `}</style>

      {/* Atmospheric Background Effects (Desktop Only) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#00C4B5]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00C4B5]/30 bg-[#00C4B5]/10 px-3 py-1 text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#00C4B5]">
              <span className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
              ToyPark Collection Showcase
            </span>
            <h2 className="mt-2.5 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Moments of Joy &amp;{" "}
              <span className="bg-gradient-to-r from-[#00C4B5] to-[#FF6B6B] bg-clip-text text-transparent">
                Play
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm font-semibold leading-relaxed text-gray-500">
            Tap any photo frame to enlarge, then navigate through high-res showcase photos.
          </p>
        </div>

        {/* Lightweight Mobile-Optimized Masonry Grid */}
        <ul className="grid auto-rows-[150px] grid-cols-2 gap-2.5 grid-flow-dense sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {PHOTOS.map((photo, i) => (
            <li key={photo.id} className={`relative ${SPAN[photo.shape]}`}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Open “${photo.title}” — ${photo.location}`}
                className={`${uid}-card group relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 sm:border-2 sm:border-gray-100 bg-gray-50 text-left shadow-sm sm:shadow-md outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#00C4B5]/40 hover:shadow-xl active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={photo.src}
                    alt={`${photo.title}. ${photo.caption}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>

                <span
                  aria-hidden
                  className={`${uid}-sheen absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl`}
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90"
                />

                <span className="pointer-events-none absolute left-2.5 top-2.5 sm:left-3 sm:top-3 rounded-full bg-white/90 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-800 shadow-sm">
                  {photo.category}
                </span>

                <span className="pointer-events-none absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 translate-y-0.5 sm:translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="block text-xs sm:text-sm font-bold leading-tight text-white drop-shadow">
                    {photo.title}
                  </span>
                  <span className="mt-0.5 block text-[0.65rem] sm:text-[0.7rem] font-medium text-slate-200/90">
                    {photo.location}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {open && active && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title}, ${active.location}`}
            className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setActiveIndex(null)}
              className="absolute inset-0 cursor-zoom-out bg-slate-950/90"
            />

            {/* Lightbox Content Area */}
            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
              <div className="relative w-full overflow-hidden rounded-3xl bg-amber-950 shadow-2xl shadow-amber-950/60 ring-1 ring-amber-200/20">
                <div className="relative h-[60vh] sm:h-[70vh] w-full">
                  <Image
                    src={active.src}
                    alt={`${active.title}. ${active.caption}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                    draggable={false}
                    className="object-contain"
                  />
                </div>

                {/* Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-amber-950/95 via-amber-950/60 to-transparent p-5 sm:p-7">
                  <div className="max-w-lg">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-300">
                      {active.category} · {active.location}
                    </span>
                    <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                      {active.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-amber-100/85">
                      {active.caption}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-900/60 px-3 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-700/50">
                    {(activeIndex ?? 0) + 1} / {PHOTOS.length}
                  </span>
                </div>
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="mt-5 flex max-w-full items-center gap-2 overflow-x-auto px-1 pb-1">
                {PHOTOS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`View ${p.title}`}
                    aria-current={i === activeIndex}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl outline-none ring-offset-2 ring-offset-amber-950 transition focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      i === activeIndex
                        ? "opacity-100 ring-2 ring-amber-400"
                        : "opacity-45 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={p.src}
                      alt={p.title}
                      width={48}
                      height={48}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Controls (No backdrop-blur on mobile) */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-amber-900/80 text-amber-100 outline-none ring-1 ring-amber-700/50 transition hover:bg-amber-800 focus-visible:ring-2 focus-visible:ring-amber-400 sm:right-6 sm:top-6"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="group absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-amber-900/80 text-amber-100 outline-none ring-1 ring-amber-700/50 transition hover:bg-amber-800 focus-visible:ring-2 focus-visible:ring-amber-400 sm:left-6"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="group absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-amber-900/80 text-amber-100 outline-none ring-1 ring-amber-700/50 transition hover:bg-amber-800 focus-visible:ring-2 focus-visible:ring-amber-400 sm:right-6"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}