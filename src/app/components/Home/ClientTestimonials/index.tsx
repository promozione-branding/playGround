"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Shreya",
    role: "GURUGRAM",
    rating: 5,
    quote:
      "Toy Park made our play-school setup much easier. The furniture looks great, feels sturdy, and the team was helpful throughout the ordering process.",
  },
  {
    id: 2,
    name: "Punit Malik",
    role: "DELHI",
    rating: 5,
    quote:
      "The quality was exactly what we were looking for. The products arrived well-packed, and the entire bulk-order process was smooth from start to finish.",
  },
  {
    id: 3,
    name: "Rohan Singh",
    role: "HARYANA",
    rating: 5,
    quote:
      "From playground equipment to kids’ furniture, having so many products under one roof made sourcing much simpler for us.",
  },
  {
    id: 4,
    name: "Sahil Pal",
    role: "NOIDA",
    rating: 5,
    quote:
      "We needed products in bulk and wanted a manufacturer we could rely on. Toy Park was responsive, professional, and delivered as promised.",
  },
];

export const ClientTestimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  return (
    <div className="relative w-full overflow-hidden bg-[#FFFFFF] px-4 py-7 font-sans antialiased select-none sm:px-6 sm:py-13 md:px-12">
      {/* MAIN LAYOUT */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">

        {/* LEFT COLUMN */}
        <div className="relative flex h-full flex-col justify-between text-center lg:col-span-5 lg:text-left">
          <div>
            <span className="mb-2 block text-[14px] font-bold uppercase tracking-widest text-[#2D3436]/70 sm:text-sm">
              TOP REVIEWS
            </span>

            <h2 className="mb-3 text-[32px] font-black tracking-tight text-[#2D3436] sm:mb-4 sm:text-5xl lg:text-6xl">
              Client Testimonials
            </h2>

            <p className="mx-auto mb-6 max-w-md text-base font-semibold leading-relaxed text-[#636E72] sm:mb-8 sm:text-lg lg:mx-0">
              Read real feedback from teachers, parents, and designers who
              love our toys and furniture.
            </p>
          </div>

          {/* PAGINATION DOTS */}
          <div className="mb-4 flex items-center justify-center gap-2 lg:mb-6 lg:justify-start">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => swiperRef?.slideTo(idx)}
                className={`cursor-pointer rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "h-3 w-8 bg-[#4ECDC4]"
                    : "h-3 w-3 bg-[#2D3436]/30 hover:bg-[#2D3436]/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative lg:col-span-7">

          {/* GIRAFFE */}
          <div className="animate-float-gir pointer-events-none absolute -left-24 bottom-0 z-0 hidden lg:block">
            <svg
              className="h-auto w-28 drop-shadow-md sm:w-32"
              viewBox="0 0 100 160"
              fill="none"
            >
              <rect
                x="26"
                y="110"
                width="6"
                height="45"
                rx="3"
                fill="#D8BE9A"
              />

              <rect
                x="38"
                y="110"
                width="6"
                height="45"
                rx="3"
                fill="#C5AA85"
              />

              <rect
                x="62"
                y="110"
                width="6"
                height="45"
                rx="3"
                fill="#D8BE9A"
              />

              <rect
                x="72"
                y="110"
                width="6"
                height="45"
                rx="3"
                fill="#C5AA85"
              />

              <ellipse
                cx="50"
                cy="100"
                rx="30"
                ry="20"
                fill="#E8D2B4"
              />

              <circle
                cx="38"
                cy="105"
                r="4.5"
                fill="#4ECDC4"
                opacity="0.6"
              />

              <circle
                cx="48"
                cy="90"
                r="3"
                fill="#4ECDC4"
                opacity="0.6"
              />

              <circle
                cx="60"
                cy="102"
                r="4"
                fill="#4ECDC4"
                opacity="0.6"
              />

              <circle
                cx="55"
                cy="112"
                r="3.5"
                fill="#4ECDC4"
                opacity="0.6"
              />

              <path
                d="M28,95 C30,50 35,25 45,15 L58,18 C48,30 42,55 42,95 Z"
                fill="#E8D2B4"
              />

              <path
                d="M44,15 C40,25 38,40 32,60 M42,20 C38,30 36,45 30,65"
                stroke="#F4A261"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <ellipse
                cx="52"
                cy="15"
                rx="12"
                ry="8"
                fill="#E8D2B4"
              />

              <ellipse
                cx="62"
                cy="16"
                rx="6"
                ry="5"
                fill="#F4A261"
              />

              <circle
                cx="52"
                cy="12"
                r="1.5"
                fill="#2D3436"
              />

              <line
                x1="45"
                y1="10"
                x2="42"
                y2="3"
                stroke="#2D3436"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <circle
                cx="41"
                cy="2"
                r="2"
                fill="#F4A261"
              />

              <path
                d="M78,100 Q88,105 85,115"
                stroke="#E8D2B4"
                strokeWidth="3"
                fill="none"
              />

              <circle
                cx="85"
                cy="115"
                r="3"
                fill="#F4A261"
              />
            </svg>
          </div>

          {/* MAIN TESTIMONIAL CARD */}
          <div className="relative z-10 flex min-h-[300px] items-center justify-center overflow-hidden rounded-[2rem] border-4 border-white/20 bg-[#4ECDC4] p-5 text-white shadow-2xl sm:rounded-[2.5rem] sm:p-10">

            {/* TOP LEFT TOY CAR */}
            <div className="animate-float-y pointer-events-none absolute left-4 top-3 z-20 opacity-90 sm:left-6">
              <svg
                className="h-9 w-12 text-[#FF6B6B] sm:h-12 sm:w-16"
                viewBox="0 0 100 60"
                fill="currentColor"
              >
                <path d="M15,35 L25,18 C28,12 35,10 50,10 L70,10 C80,10 85,15 88,25 L95,35 C98,35 100,40 100,45 L100,50 C100,52 98,55 95,55 L85,55 C85,48 78,42 70,42 C62,42 55,48 55,55 L35,55 C35,48 28,42 20,42 C12,42 5,48 5,55 L0,55 L0,45 C0,40 5,35 15,35 Z" />

                <circle
                  cx="20"
                  cy="52"
                  r="7"
                  fill="#FFE66D"
                  stroke="#2D3436"
                  strokeWidth="2"
                />

                <circle
                  cx="70"
                  cy="52"
                  r="7"
                  fill="#FFE66D"
                  stroke="#2D3436"
                  strokeWidth="2"
                />

                <rect
                  x="32"
                  y="16"
                  width="18"
                  height="15"
                  rx="3"
                  fill="#FFFFFF"
                  opacity="0.8"
                />

                <rect
                  x="54"
                  y="16"
                  width="20"
                  height="15"
                  rx="3"
                  fill="#FFFFFF"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* TOP RIGHT RAINBOW */}
            <div className="animate-float-y-reverse pointer-events-none absolute right-4 top-4 z-20 opacity-80">
              <svg
                className="h-10 w-12 sm:h-12 sm:w-16"
                viewBox="0 0 100 70"
                fill="none"
              >
                <path
                  d="M10,60 A40,40 0 0,1 90,60"
                  stroke="#FF6B6B"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  d="M20,60 A30,30 0 0,1 80,60"
                  stroke="#FFE66D"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  d="M30,60 A20,20 0 0,1 70,60"
                  stroke="#4ECDC4"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="58"
                  r="10"
                  fill="#FFFFFF"
                />

                <circle
                  cx="88"
                  cy="58"
                  r="10"
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            {/* BOTTOM CLOUD */}
            <div className="animate-float-x pointer-events-none absolute bottom-3 left-6 z-20 opacity-50 sm:left-[54%]">
              <svg
                className="h-6 w-10 text-white sm:h-8 sm:w-12"
                viewBox="0 0 100 60"
                fill="currentColor"
              >
                <path d="M20,50 C10,50 0,40 0,28 C0,15 15,8 30,10 C40,0 65,0 75,12 C88,12 100,20 100,32 C100,45 85,50 70,50 Z" />
              </svg>
            </div>

            {/* BOTTOM RIGHT STAR */}
            <div className="animate-pulse-subtle pointer-events-none absolute bottom-4 right-4 z-20 text-[#D8BE9A] sm:right-8">
              <svg
                className="h-7 w-7 sm:h-8 sm:w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />

                <circle
                  cx="10"
                  cy="12"
                  r="1"
                  fill="#2D3436"
                />

                <circle
                  cx="14"
                  cy="12"
                  r="1"
                  fill="#2D3436"
                />

                <path
                  d="M10.5,15 Q12,17 13.5,15"
                  stroke="#2D3436"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>

            {/* SWIPER */}
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              onSwiper={setSwiperRef}
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.activeIndex)
              }
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="w-full overflow-hidden"
            >
              {testimonialsData.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="flex flex-col items-center gap-4 px-2 py-2 sm:gap-8 sm:py-4 md:flex-row">

                    {/* AVATAR + NAME */}
                    <div className="flex min-w-[130px] flex-col items-center space-y-2 text-center">

                      {/* INITIAL AVATAR */}
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/40 bg-white/20 shadow-lg backdrop-blur-sm sm:h-24 sm:w-24">
                        <span className="text-2xl font-black uppercase text-white sm:text-4xl">
                          {t.name.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-[20px] font-extrabold tracking-wide text-white sm:text-xl">
                          {t.name}
                        </h3>

                        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                          {t.role}
                        </p>
                      </div>

                    </div>

                    {/* SEPARATOR */}
                    <div className="mx-2 hidden h-36 w-0.5 border-r-2 border-dashed border-white/30 md:block" />

                    {/* RATING + QUOTE */}
                    <div className="flex flex-1 flex-col items-center space-y-2 text-center sm:space-y-3 md:items-start md:text-left">

                      {/* STARS */}
                      <div className="flex items-center justify-center gap-1 text-white md:justify-start">
                        {[...Array(t.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="h-4 w-4 fill-[#FFE66D] sm:h-5 sm:w-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>

                      {/* QUOTE */}
                      <p className="max-w-full text-sm font-semibold leading-relaxed text-white/95 sm:text-base">
                        &quot;{t.quote}&quot;
                      </p>

                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes floatYReverse {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(5px);
          }
        }

        @keyframes floatX {
          0%,
          100% {
            transform: translateX(0px);
          }

          50% {
            transform: translateX(-8px);
          }
        }

        @keyframes floatGiraffe {
          0%,
          100% {
            transform: translateX(-6px);
          }

          50% {
            transform: translateX(6px);
          }
        }

        @keyframes pulseSubtle {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }

        .animate-float-y {
          animation: floatY 3.5s ease-in-out infinite;
        }

        .animate-float-y-reverse {
          animation: floatYReverse 4s ease-in-out infinite;
        }

        .animate-float-x {
          animation: floatX 5s ease-in-out infinite;
        }

        .animate-float-gir {
          animation: floatGiraffe 4s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ClientTestimonials;