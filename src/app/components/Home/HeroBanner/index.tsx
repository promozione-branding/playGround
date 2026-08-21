"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const PLANE_POSITION = {
  bottom: "16%",
  left: "32%",
};

const HELICOPTER_POSITION = {
  top: "10%",
  right: "10%",
};

const PLAYSTATION_IMAGES = [
  "/assets/banner/playsation2.png",
  "/assets/banner/playstation1.png",
];

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % PLAYSTATION_IMAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-10 w-full overflow-hidden font-quicksand">
      
      <div className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden sm:min-h-[580px] md:min-h-[660px] lg:min-h-[700px] xl:min-h-[760px]">

        {/* Background */}
        <Image
          src="/assets/banner/background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Plane */}
        <Image
          src="/assets/plane_icon.webp"
          alt=""
          width={112}
          height={112}
          sizes="112px"
          style={{
            bottom: PLANE_POSITION.bottom,
            left: PLANE_POSITION.left,
          }}
          className="
            absolute z-10 hidden h-auto w-14 select-none
            drop-shadow-lg
            animate-[planeFloat_4.5s_ease-in-out_infinite]
            md:block md:w-20
            lg:w-28
          "
        />

        {/* Helicopter */}
        <Image
          src="/assets/helicopter_icon.svg"
          alt=""
          width={96}
          height={96}
          sizes="96px"
          style={{
            top: HELICOPTER_POSITION.top,
            right: HELICOPTER_POSITION.right,
          }}
          className="
            absolute z-10 hidden h-auto w-12 select-none
            drop-shadow-lg
            animate-[helicopterFloat_5.2s_ease-in-out_0.6s_infinite]
            md:block md:w-16
            lg:w-24
          "
        />

        {/* Content Container (Mobile: Image on top, Text on bottom. Desktop: Text left, Image right) */}
        <div className="relative z-20 mx-auto flex flex-col-reverse lg:grid lg:grid-cols-12 w-full max-w-[1400px] items-center gap-8 px-6 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12 sm:px-8 md:px-10 lg:gap-10 lg:px-12 lg:pb-16">

          {/* Text Content */}
          <div className="flex flex-col items-center space-y-4 text-center text-white sm:space-y-5 lg:col-span-6 lg:items-start lg:text-left w-full">

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Play School Furniture.
              <br className="hidden sm:block" />
              <span>Made to Inspire.</span>
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-white sm:text-lg md:text-xl">
              Quality furniture designed for little learners and built for
              the everyday demands of play schools, daycares, and learning
              spaces.
            </p>

            <div className="pt-2 sm:pt-3">
              <a
                href="/products"
                className="
                  inline-flex items-center gap-2.5
                  rounded-full bg-white
                  px-6 py-3
                  text-sm font-extrabold text-[#2B545B]
                  shadow-lg
                  transition-transform duration-200
                  hover:-translate-y-0.5
                  sm:px-7 sm:py-3.5 sm:text-base
                "
              >
                Explore products
                <ArrowRight className="h-5 w-5" strokeWidth={3} />
              </a>
            </div>
          </div>

          {/* Playground Image Slideshow */}
          <div className="relative flex justify-center lg:col-span-6 lg:justify-end items-center min-h-[280px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[550px] w-full">
            {PLAYSTATION_IMAGES.map((imgSrc, index) => (
              <Image
                key={imgSrc}
                src={imgSrc}
                alt="Playground equipment"
                width={793}
                height={630}
                priority={index === 0}
                sizes="(max-width: 1024px) 90vw, 793px"
                className={`
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-0 lg:translate-x-0
                  h-auto w-full max-w-[340px] sm:max-w-[525px] object-contain lg:max-w-[683px]
                  transition-opacity duration-1000 ease-in-out pointer-events-none
                  ${index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
                `}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Lightweight animation CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes planeFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-3deg);
          }

          50% {
            transform: translateY(-12px) rotate(4deg);
          }
        }

        @keyframes helicopterFloat {
          0%,
          100% {
            transform: translateY(0) rotate(4deg);
          }

          50% {
            transform: translateY(-14px) rotate(-4deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          img {
            animation: none !important;
            transition: none !important;
          }
        }
      ` }} />
    </section>
  );
}