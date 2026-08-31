'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface UpperFooterProps {
  className?: string;
}

export const UpperFooter: React.FC<UpperFooterProps> = ({ className = "mt-16 md:mt-24 lg:mt-32" }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const rafId = useRef<number | null>(null);

  // Check touch capabilities once on mount to avoid calling matchMedia on every mouse move tick
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  // Lazy-load video when footer approaches viewport
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Ref-based mouse parallax throttled with requestAnimationFrame (Desktop only)
  const cloudsRef = useRef<{
    c1: HTMLDivElement | null;
    c2: HTMLDivElement | null;
    c3: HTMLDivElement | null
  }>({ c1: null, c2: null, c3: null });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Fast boolean check for touch devices
    if (isTouchDevice.current) return;

    if (rafId.current !== null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    rafId.current = requestAnimationFrame(() => {
      if (cloudsRef.current.c1) cloudsRef.current.c1.style.transform = `translate3d(${x * 0.04}px, ${y * 0.04}px, 0)`;
      if (cloudsRef.current.c2) cloudsRef.current.c2.style.transform = `translate3d(${x * 0.07}px, ${y * 0.07}px, 0)`;
      if (cloudsRef.current.c3) cloudsRef.current.c3.style.transform = `translate3d(${x * 0.03}px, ${y * 0.03}px, 0)`;
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice.current) return;

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (cloudsRef.current.c1) cloudsRef.current.c1.style.transform = 'translate3d(0px, 0px, 0)';
    if (cloudsRef.current.c2) cloudsRef.current.c2.style.transform = 'translate3d(0px, 0px, 0)';
    if (cloudsRef.current.c3) cloudsRef.current.c3.style.transform = 'translate3d(0px, 0px, 0)';
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    state: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedFullName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedCompany = formData.company.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedState = formData.state.trim();
    const trimmedCity = formData.city.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedFullName) {
      alert('Please enter a valid Full Name.');
      return;
    }
    if (!trimmedEmail) {
      alert('Please enter a valid Email Address.');
      return;
    }
    const cleanPhone = trimmedPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }
    if (!trimmedState) {
      alert('Please enter a valid State.');
      return;
    }
    if (!trimmedCity) {
      alert('Please enter a valid City.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('https://brandbnalo.com/api/form/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: "Playground Home Page",
          platformEmail: "info@toyparkindia.com",
          name: trimmedFullName,
          email: trimmedEmail,
          company: trimmedCompany,
          phone: trimmedPhone,
          product: "N/A",
          place: trimmedCity,
          message: trimmedMessage,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.message || 'Failed to submit partner form');
      }
    } catch (err) {
      alert('Error connecting to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`relative w-full overflow-visible font-sans antialiased ${className}`}>

      {/* ═══ SCALLOP WAVE OVERLAY ═══ */}
      <div className="absolute top-0 left-0 w-full leading-none z-10 -translate-y-[99%] pointer-events-none">
        <svg
          className="w-full h-24 sm:h-32 md:h-40 block"
          viewBox="0 0 1440 190"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,128L48,117.3C96,107,192,85,288,85.3C384,85,480,107,576,128C672,149,768,171,864,165.3C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,190L0,190Z"
            fill="#BDECF0"
          />
        </svg>
      </div>

      {/* ═══ MAIN SECTION ═══ */}
      <div
        id="contact"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full bg-[#BDECF0] text-[#0F2942] pt-6 pb-12 sm:pb-16 px-3 sm:px-12 z-20 scroll-mt-10 overflow-hidden"
        style={{ contain: 'paint' }}
      >

        {/* Parallax Clouds */}
        <div
          ref={(el) => { cloudsRef.current.c1 = el; }}
          className="absolute opacity-80 pointer-events-none z-10 left-[3%] sm:left-[10%] -top-2 md:top-0"
          aria-hidden="true"
        >
          <Image
            src="/assets/upperFooter/cloud_string.webp"
            alt=""
            width={144}
            height={80}
            className="w-20 sm:w-28 md:w-36 h-auto object-contain"
            loading="lazy"
          />
        </div>
        <div
          ref={(el) => { cloudsRef.current.c2 = el; }}
          className="hidden md:block absolute opacity-80 pointer-events-none z-10 left-[45%] top-10"
          aria-hidden="true"
        >
          <Image
            src="/assets/upperFooter/cloud_string.webp"
            alt=""
            width={160}
            height={90}
            className="w-32 sm:w-40 h-auto object-contain"
            loading="lazy"
          />
        </div>
        <div
          ref={(el) => { cloudsRef.current.c3 = el; }}
          className="absolute opacity-80 pointer-events-none z-10 right-[3%] sm:right-[10%] -top-4 md:-top-5"
          aria-hidden="true"
        >
          <Image
            src="/assets/upperFooter/cloud_string.webp"
            alt=""
            width={192}
            height={100}
            className="w-24 sm:w-36 md:w-48 h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Static Decorative Stars */}
        <div className="absolute top-[20%] left-[25%] text-[#70C1D6] opacity-70 w-5 h-5 select-none pointer-events-none" aria-hidden="true">✦</div>
        <div className="absolute top-[15%] right-[35%] text-[#70C1D6] opacity-70 w-4 h-4 select-none pointer-events-none" aria-hidden="true">✦</div>
        <div className="absolute bottom-[20%] left-[15%] text-[#70C1D6] opacity-70 w-6 h-6 select-none pointer-events-none" aria-hidden="true">✦</div>
        <div className="absolute top-[40%] right-[10%] text-[#70C1D6] opacity-70 w-5 h-5 select-none pointer-events-none" aria-hidden="true">✦</div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-20 mt-4">

          {/* Left: Text & Video Container */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start justify-center font-quicksand z-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#4ECDC4] mb-3 text-center lg:text-left">
              Partner With Us
            </h2>
            <p className="text-base sm:text-lg font-extrabold text-[#4ECDC4] mb-6 text-center lg:text-left">
              Have questions? We'd love to hear from you. Drop us a message below.
            </p>

            {/* Playful Video Frame */}
            <div className="relative w-full max-w-[520px] aspect-video p-3 bg-white rounded-[2.5rem] shadow-sm z-10">
              {isVideoVisible ? (
                <video
                  src="https://pub-eb2eff44950b4abfbe1564159bd1cbc8.r2.dev/video/toy_park_3.mp4%20(2).mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover rounded-[2rem] bg-gray-100"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-[2rem]" />
              )}
            </div>
          </div>

          {/* Right: Solid/Light Glass Form */}
          <div className="w-full lg:w-7/12 flex justify-center lg:justify-end relative z-20">
            {isSubmitted ? (
              <div className="w-full max-w-2xl bg-white/50 p-8 sm:p-12 rounded-[2.5rem] border border-white/60 shadow-sm text-center font-quicksand">
                <div className="w-16 h-16 bg-[#4ECDC4] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F2942] mb-2">Thank You!</h3>
                <p className="text-slate-700 font-extrabold text-base sm:text-lg">
                  Your message has been sent successfully. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl flex flex-col gap-5 bg-white/35 p-8 sm:p-10 rounded-[2.5rem] border border-white/50 shadow-sm"
              >
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-[#4ECDC4] uppercase tracking-widest pl-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-transparent text-[#0F2942] text-sm font-semibold focus:bg-white focus:outline-none focus:border-[#70C1D6] transition-colors placeholder:text-[#0F2942]/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-[#4ECDC4] uppercase tracking-widest pl-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-transparent text-[#0F2942] text-sm font-semibold focus:bg-white focus:outline-none focus:border-[#70C1D6] transition-colors placeholder:text-[#0F2942]/50"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-[#4ECDC4] uppercase tracking-widest pl-1">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name (optional)"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-transparent text-[#0F2942] text-sm font-semibold focus:bg-white focus:outline-none focus:border-[#70C1D6] transition-colors placeholder:text-[#0F2942]/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-[#4ECDC4] uppercase tracking-widest pl-1">Phone Number</label>
                    <div className="flex items-center bg-white/50 rounded-2xl border border-transparent focus-within:border-[#70C1D6] focus-within:bg-white transition-colors overflow-hidden">
                      <span className="pl-4 pr-3 py-3.5 text-[#0F2942]/60 font-semibold border-r border-[#0F2942]/10 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        placeholder="Enter 10-digit number"
                        className="w-full px-4 py-3.5 bg-transparent text-[#0F2942] text-sm font-semibold focus:outline-none placeholder:text-[#0F2942]/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: State & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-[#4ECDC4] uppercase tracking-widest pl-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="State"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-transparent text-[#0F2942] text-sm font-semibold focus:bg-white focus:outline-none focus:border-[#70C1D6] transition-colors placeholder:text-[#0F2942]/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold text-[#4ECDC4] uppercase tracking-widest pl-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-transparent text-[#0F2942] text-sm font-semibold focus:bg-white focus:outline-none focus:border-[#70C1D6] transition-colors placeholder:text-[#0F2942]/50"
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-[#4ECDC4] uppercase tracking-widest pl-1">Your Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message..."
                    className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-transparent text-[#0F2942] text-sm font-semibold focus:bg-white focus:outline-none focus:border-[#70C1D6] transition-colors placeholder:text-[#0F2942]/50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 rounded-2xl bg-[#4ECDC4] text-white font-black text-sm tracking-widest uppercase hover:bg-[#3dbcb3] active:scale-[0.98] transition-colors duration-200 shadow-sm flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpperFooter;