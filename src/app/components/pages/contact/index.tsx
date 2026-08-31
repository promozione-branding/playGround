'use client';

import React from 'react';
import ContactForm from '@/app/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const CONTACT_CARDS = [
  {
    title: 'Call / WhatsApp',
    detail: '+91 9811117654',
    icon: Phone,
    bgColor: 'bg-[#FFE66D]',
    textColor: 'text-[#0F2942]',
  },
  {
    title: 'Email Us',
    detail: 'info@toypark.com',
    icon: Mail,
    bgColor: 'bg-[#FF6B6B]',
    textColor: 'text-white',
  },
  {
    title: 'Location',
    detail: '17a/57, W.E.A., Karol Bagh New Delhi - 110005, India',
    icon: MapPin,
    bgColor: 'bg-[#4ECDC4]',
    textColor: 'text-[#0F2942]',
  },
  {
    title: 'Working Hours',
    detail: 'Mon - Sat: 9 AM - 7 PM',
    icon: Clock,
    bgColor: 'bg-[#BDECF0]',
    textColor: 'text-[#0F2942]',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7FDFF] text-[#0F2942] font-quicksand overflow-x-hidden selection:bg-[#4ECDC4] selection:text-white">

      {/* ═══ TOP HERO SECTION ═══ */}
      <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 md:pt-20 md:pb-10 px-4 sm:px-12 max-w-7xl mx-auto">

        {/* Decorative Stars (Desktop only to save mobile GPU paints) */}
        <div className="hidden sm:block absolute top-10 left-5 text-[#70C1D6] opacity-40 text-2xl select-none animate-pulse">✦</div>
        <div className="hidden sm:block absolute top-24 right-10 text-[#70C1D6] opacity-50 text-xl select-none">✦</div>

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#BDECF0]/50 border border-[#70C1D6]/30 text-[#0F2942] text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-4 sm:mb-6 shadow-xs">
            <span>💬</span> We'd Love To Hear From You <span>💬</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0F2942] leading-[1.15] mb-4 sm:mb-6">
            Contact <span className="text-[#FF6B6B]">ToyPark</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-xl font-medium text-[#0F2942]/80 max-w-2xl leading-relaxed mb-4">
            Have questions about our products, bulk inquiries, or custom orders? Reach out to us anytime and we'll respond promptly!
          </p>
        </div>

      </section>

      {/* ═══ SIDE-BY-SIDE CONTENT: CARDS ON LEFT, FORM ON RIGHT ═══ */}
      <section className="px-4 sm:px-12 max-w-7xl mx-auto pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          {/* LEFT SIDE: CONTACT CARDS */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            {CONTACT_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#2D3436] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_0px_#2D3436] flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${card.bgColor} ${card.textColor} flex items-center justify-center shrink-0 border-2 border-[#2D3436]`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-[#2D3436] uppercase tracking-wider mb-0.5">{card.title}</h3>
                    <p className="text-xs sm:text-base font-bold text-gray-700">{card.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: MAIN CONTACT FORM */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

        </div>
      </section>

    </main>
  );
}
