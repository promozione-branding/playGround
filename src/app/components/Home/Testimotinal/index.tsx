"use client";

import { motion } from "motion/react";

type Review = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tint: string;
  emoji: string;
};

// Simplified and updated kid-friendly reviews
const rowA: Review[] = [
  {
    quote: "Bedtime stories are now a breeze!",
    name: "Elena Ruiz",
    role: "Parent of 2",
    initials: "ER",
    tint: "from-amber-200 to-yellow-300",
    emoji: "🧸",
  },
  {
    quote: "Learning letters is now a fun game.",
    name: "Kofi Mensah",
    role: "Teacher",
    initials: "KM",
    tint: "from-pink-200 to-rose-300",
    emoji: "🎨",
  },
  {
    quote: "The brightest, happiest family tablet.",
    name: "Anya Petrova",
    role: "Preschooler Mom",
    initials: "AP",
    tint: "from-sky-200 to-blue-300",
    emoji: "🚀",
  },
  {
    quote: "So many laughs and giggles. Love it!",
    name: "Tobias Reinhardt",
    role: "Dad of 3",
    initials: "TR",
    tint: "from-purple-200 to-fuchsia-300",
    emoji: "🎉",
  },
];

const rowB: Review[] = [
  {
    quote: "Learning is now a total joy.",
    name: "Idris Bello",
    role: "Kindergarten Dad",
    initials: "IB",
    tint: "from-teal-200 to-cyan-300",
    emoji: "⚽",
  },
  {
    quote: "Beautiful art and music for kids.",
    name: "Priya Nair",
    role: "Kids Art Teacher",
    initials: "PN",
    tint: "from-lime-200 to-emerald-300",
    emoji: "🌱",
  },
  {
    quote: "A perfect blend of fun and learning.",
    name: "Sophia Lindqvist",
    role: "Early Ed Blogger",
    initials: "SL",
    tint: "from-orange-200 to-amber-300",
    emoji: "💡",
  },
  {
    quote: "The story time app they love.",
    name: "Marcus Bell",
    role: "Happy parent",
    initials: "MB",
    tint: "from-rose-200 to-pink-300",
    emoji: "🎈",
  },
];

function Card({ r, duplicate }: { r: Review; duplicate?: boolean }) {
  return (
    <figure
      aria-hidden={duplicate ? "true" : undefined}
      className="w-[20rem] shrink-0 rounded-3xl border-2 border-amber-200/80 bg-white p-6 shadow-md shadow-amber-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-xl hover:border-amber-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-label="Rated 5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((s) => (
            <svg
              key={s}
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-amber-400 stroke-amber-500 stroke-[1.2]"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-xl" aria-hidden="true">
          {r.emoji}
        </span>
      </div>

      <blockquote className="mt-4 text-base font-semibold leading-relaxed text-amber-950">
        “{r.quote}”
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3.5 border-t border-amber-100 pt-4">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${r.tint} text-xs font-black text-amber-950 shadow-sm`}
          aria-hidden="true"
        >
          {r.initials}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1 text-sm font-bold text-amber-950">
            <span className="truncate">{r.name}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 fill-sky-500"
              aria-hidden="true"
            >
              <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.5l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3-.1L12 2zm-1 12.4l5-5-1.4-1.4-3.6 3.6-1.6-1.6L8 11.4l3 3z" />
            </svg>
          </span>
          <span className="block truncate text-xs font-medium text-amber-800/70">
            {r.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Review[];
  direction: "l" | "r";
  duration: number;
}) {
  return (
    <div className="atest-mq group relative overflow-hidden py-2">
      <div
        className="atest-mq-track flex w-max gap-6"
        style={{
          animationName: direction === "l" ? "atest-mq-l" : "atest-mq-r",
          animationDuration: `${duration}s`,
        }}
      >
        {[...items, ...items, ...items, ...items].map((r, i) => (
          <Card key={`${r.name}-${i}`} r={r} duplicate={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

export default function AtestMarqueeWall() {
  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-20 md:py-24">
      {/* Playful background doodles */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-10 h-32 w-32 rounded-full bg-yellow-200/50 blur-3xl" />
        <div className="absolute bottom-1/4 right-12 h-40 w-40 rounded-full bg-pink-200/50 blur-3xl" />
      </div>

      <style>{`
        @keyframes atest-mq-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes atest-mq-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes atest-mq-shine { to { background-position: 200% center; } }
        .atest-mq-track { animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
        .atest-mq:hover .atest-mq-track { animation-play-state: paused; }
        .atest-mq-title {
          background-image: linear-gradient(90deg, #f59e0b, #ec4899, #06b6d4, #f59e0b);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: atest-mq-shine 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .atest-mq-track { animation: none; }
          .atest-mq-title { animation: none; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-amber-300 bg-amber-100/80 px-4 py-1.5 text-xs font-bold tracking-wide text-amber-900 shadow-sm">
          ✨ 10,000 Happy Families ✨
        </span>

        <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-amber-950 sm:text-5xl">
          <span>A wall full of </span>
          <span className="atest-mq-title">happy smiles</span>
        </h2>

        <p className="mt-4 text-lg font-medium text-amber-900/70">
          Hover to pause and read what parents and teachers say! 💛
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
        className="relative mt-12 flex flex-col gap-6"
      >
        <MarqueeRow items={rowA} direction="l" duration={30} />
        <MarqueeRow items={rowB} direction="r" duration={36} />
      </motion.div>
    </section>
  );
}