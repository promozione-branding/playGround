"use client";

import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-center gap-3">


        <a
        href="tel:+919811117654"
        aria-label="Call 9811117654"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#18A6A6] text-white shadow-xl transition-all duration-300 hover:scale-110 sm:h-16 sm:w-16"
      >
        {/* Blinking Ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#18A6A6] opacity-40" />

        <FaPhoneAlt className="relative z-10 h-6 w-6 sm:h-7 sm:w-7" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919811117654"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 sm:h-16 sm:w-16"
      >
        {/* Blinking Ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />

        <FaWhatsapp className="relative z-10 h-7 w-7 sm:h-8 sm:w-8" />
      </a>

      {/* Call Button */}
      

    </div>
  );
}