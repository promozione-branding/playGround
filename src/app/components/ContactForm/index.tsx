'use client';
import React, { useState } from 'react';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

interface ContactFormProps {
  productName?: string;
  className?: string;
}

export default function ContactForm({ productName = '', className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    product: productName,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedFullName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedProduct = formData.product.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedFullName) {
      setErrorMessage('Please enter a valid Full Name.');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter a valid Email Address.');
      return;
    }

    if (trimmedPhone) {
      const cleanPhone = trimmedPhone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        setErrorMessage('Phone number must be exactly 10 digits.');
        return;
      }
    }

    if (!trimmedMessage) {
      setErrorMessage('Please enter a valid Message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('https://brandbnalo.com/api/form/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: "Playground Contact Page",
          platformEmail: "info@toyparkindia.com",
          name: trimmedFullName,
          email: trimmedEmail,
          company: 'NA',
          phone: trimmedPhone,
          product: trimmedProduct,
          place: "N/A",
          message: trimmedMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          product: productName,
          message: ''
        });
      } else {
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form-section" className={`bg-[#EAF8F9] border-3 border-[#2D3436] rounded-[2.5rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_#2D3436] relative overflow-hidden ${className}`}>
      {/* Background Floating Clouds (Pure CSS Animated on Desktop, Static on Mobile) */}
      <img
        src="/assets/cloud-svgrepo-com.svg"
        alt="Floating Cloud 1"
        className="hidden md:block absolute top-4 left-[-40px] w-32 md:w-44 opacity-35 pointer-events-none z-0 animate-cloud-float-slow"
      />
      <img
        src="/assets/cloud-svgrepo-com.svg"
        alt="Floating Cloud 2"
        className="hidden md:block absolute bottom-6 right-[-20px] w-36 md:w-48 opacity-35 pointer-events-none z-0 animate-cloud-float-reverse"
      />

      <div className="max-w-3xl mx-auto relative z-10 font-quicksand">
        <div className="text-center mb-8">
          <span className="bg-[#FF6B6B] text-white text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full shadow-xs inline-flex items-center gap-2">
            <Mail className="w-4 h-4" />
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#2D3436] tracking-tight mt-3 flex items-center justify-center gap-2.5">
            <span>Have Questions About This Product?</span>
            <MessageSquare className="w-7 h-7 text-[#FF6B6B] hidden sm:inline-block" />
          </h2>
          <p className="text-gray-600 font-semibold text-sm md:text-base mt-2">
            Send us a quick message and our ToyPark support team will get back to you right away!
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white border-3 border-[#2D3436] p-8 sm:p-12 rounded-[2rem] text-center shadow-[6px_6px_0px_0px_#2D3436] space-y-4 my-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#00C4B5] text-white border-2 border-[#2D3436] rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-[3px_3px_0px_0px_#2D3436]">
              ✓
            </div>
            <h3 className="text-3xl font-black text-[#2D3436]">Thank You!</h3>
            <p className="text-gray-700 font-extrabold text-base sm:text-lg max-w-md mx-auto">
              Your inquiry has been submitted successfully. Our support team will get back to you right away!
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-6 py-3 bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-[#2D3436] shadow-[3px_3px_0px_0px_#2D3436] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              SEND ANOTHER INQUIRY
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="bg-red-50 border-2 border-[#FF6B6B] text-[#FF6B6B] font-extrabold text-xs p-3.5 rounded-2xl flex items-center gap-2 shadow-[2px_2px_0px_0px_#FF6B6B]">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-[#2D3436] uppercase tracking-wider mb-2">
                  YOUR FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-white border-2 border-[#2D3436] rounded-2xl px-4 py-3 text-sm font-bold text-[#2D3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C4B5] shadow-[2px_2px_0px_0px_#2D3436]"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-[#2D3436] uppercase tracking-wider mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah@example.com"
                  className="w-full bg-white border-2 border-[#2D3436] rounded-2xl px-4 py-3 text-sm font-bold text-[#2D3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C4B5] shadow-[2px_2px_0px_0px_#2D3436]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-[#2D3436] uppercase tracking-wider mb-2">
                  PHONE / WHATSAPP NUMBER
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-white border-2 border-[#2D3436] rounded-2xl px-4 py-3 text-sm font-bold text-[#2D3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C4B5] shadow-[2px_2px_0px_0px_#2D3436]"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-[#2D3436] uppercase tracking-wider mb-2">
                  INTERESTED PRODUCT
                </label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="e.g. Wondear Dolls Dreamhouse Play Tent"
                  className="w-full bg-white border-2 border-[#2D3436] rounded-2xl px-4 py-3 text-sm font-bold text-[#2D3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C4B5] shadow-[2px_2px_0px_0px_#2D3436]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#2D3436] uppercase tracking-wider mb-2">
                YOUR MESSAGE OR SPECIAL REQUEST *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask about bulk orders, delivery times, or custom sizes..."
                className="w-full bg-white border-2 border-[#2D3436] rounded-2xl px-4 py-3 text-sm font-bold text-[#2D3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C4B5] shadow-[2px_2px_0px_0px_#2D3436]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-black text-base uppercase tracking-wider py-4 rounded-2xl border-2 border-[#2D3436] shadow-[4px_4px_0px_0px_#2D3436] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY NOW'}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes cloudFloatSlow {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(60px); }
        }
        @keyframes cloudFloatReverse {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-50px); }
        }
        :global(.animate-cloud-float-slow) {
          animation: cloudFloatSlow 16s ease-in-out infinite;
        }
        :global(.animate-cloud-float-reverse) {
          animation: cloudFloatReverse 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
