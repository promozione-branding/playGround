'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Check, ArrowRight } from 'lucide-react';
import PlayfulHeader from '../../components/Navbar';
import Footer2 from '../../components/Footer2';
import ContactForm from '../../components/ContactForm';

// ============================================================================
// HELPER COMPONENTS
// Moving messy SVG icons out of the main code makes it much easier to read!
// ============================================================================
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProductDetail() {

  // --- 1. COMPONENT STATE ---
  // These variables keep track of data that can change while the user interacts with the page.
  const [quantity, setQuantity] = useState(1); // Ready for future use if you add a quantity selector
  const [activeImage, setActiveImage] = useState(0); // Keeps track of which image is currently selected

  // --- 2. STATIC DATA ---
  // Storing data in arrays makes our HTML cleaner. Instead of copy-pasting HTML blocks, we map over these arrays.
  const PRODUCT_IMAGES = [
    '/assets/split_vantage_images/kids_playsHouse.png',
    '/assets/split_vantage_images/Kids_Furniture.png',
    '/assets/split_vantage_images/Kids_Trampoline.png'
  ];

  const PRODUCT_FEATURES = [
    '100% Safe & Non-Toxic Materials',
    'Easy 5-Minute Assembly',
    'Enhances Creative Roleplay'
  ];

  const PRODUCT_SPECS = [
    { label: 'Storage Capacity', value: '12 L' },
    { label: 'Mounting Type', value: 'Wall Mounted / Free' },
    { label: 'Usage / Application', value: 'Creative & Active Play' },
    { label: 'Material', value: 'ABS Plastic & Birch Wood' }
  ];

  // --- 3. HELPER FUNCTIONS ---
  // Actions that happen when a user clicks a button
  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  // --- 4. RENDER (What shows on the screen) ---
  return (
    <div className="min-h-screen bg-white font-quicksand text-[#2D3436] flex flex-col justify-between">
      <PlayfulHeader />

      <div className="max-w-[1440px] mx-auto py-8 lg:py-10 px-4 sm:px-6 lg:px-10 w-full flex-1">

        {/* === BREADCRUMBS === */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 mb-6 sm:mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#00C4B5] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#00C4B5] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#2D3436] truncate">Wondear Dolls Dreamhouse</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* === LEFT COLUMN: IMAGE GALLERY === */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28 self-start">

            {/* Big Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-[280px] sm:h-[380px] md:h-[460px] bg-[#EAF8F9] rounded-[2rem] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
            >
              <motion.img
                key={activeImage} // Changing the key forces Framer Motion to re-animate when the image changes
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                src={PRODUCT_IMAGES[activeImage]}
                alt="Product"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Small Clickable Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
              {PRODUCT_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex-shrink-0 flex items-center justify-center p-2 transition-all cursor-pointer ${activeImage === index
                      ? 'border border-[#00C4B5] bg-[#FFE66D]/30 scale-105'
                      : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                >
                  <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* === MIDDLE COLUMN: MAIN DETAILS === */}
          <div className="lg:col-span-5 flex flex-col py-2">

            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-3 sm:mb-4 text-[#2D3436]">
                Wondear Dolls Dreamhouse Play Tent
              </h1>

              {/* Star Ratings */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="flex items-center text-[#FFB800]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-500">(156 Parent Reviews)</span>
              </div>

              {/* Price Tags */}
              <div className="flex items-end gap-3 mb-5 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-black text-[#00C4B5]">$85.00</span>
                <span className="text-lg sm:text-xl font-bold text-gray-400 line-through mb-1">$110.00</span>
              </div>

              <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                Transform any room into a magical kingdom! Built with 100% breathable, non-toxic materials perfect for roleplay and active imagination.
              </p>
            </div>

            {/* Quick Features List */}
            <div className="border-t border-gray-100 py-6 mb-6">
              <ul className="space-y-3">
                {PRODUCT_FEATURES.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 font-bold text-sm md:text-base text-[#2D3436]">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#A7F3D0] text-[#00C4B5] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 stroke-[3]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col mb-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                <a href='tel:+919811117654'
                  className="flex-1 bg-[#FF6B6B] text-white font-bold text-sm sm:text-base tracking-wider uppercase rounded-xl shadow-md hover:bg-[#ff5252] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 cursor-pointer"
                >
                  Enquiry Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                </a>

                <a
                  href="https://wa.me/?text=Hi%20ToyPark!%20I'm%20interested%20in%20Wondear%20Dolls%20Dreamhouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base tracking-wider uppercase rounded-xl shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>WhatsApp</span>
                </a>

              </div>
            </div>

            {/* Specifications Table */}
            <div className="bg-[#F4F9FF] rounded-2xl overflow-hidden">
              <div className="bg-[#E5F0FF] px-4 sm:px-6 py-4 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-[#1E3A8A] uppercase tracking-wider">Key Specifications</h3>
                <span className="text-[10px] sm:text-xs font-bold bg-[#3B82F6] text-white px-2.5 py-1 rounded-full">Official Specs</span>
              </div>
              <div className="divide-y divide-[#E2E8F0] text-xs sm:text-sm md:text-base">

                {/* Dynamically render specs from our array above */}
                {PRODUCT_SPECS.map((spec, index) => (
                  <div key={index} className={`grid grid-cols-2 px-4 sm:px-6 py-3.5 sm:py-4 font-medium ${index % 2 !== 0 ? 'bg-white/50' : ''}`}>
                    <span className="font-bold text-[#334155]">{spec.label}</span>
                    <span className="text-[#0F172A]">{spec.value}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* === RIGHT COLUMN: BRANDING SIDEBAR === */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 self-start z-10 w-full ml-auto">
            <div className="bg-[#F8FAFC] rounded-[2rem] p-5 sm:p-6 shadow-md relative overflow-visible flex flex-col gap-6">

              <img
                src="/assets/clouds/giraffe-svgrepo-com.svg"
                alt="Giraffe Mascot"
                className="absolute -top-5 -right-3 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none rotate-6 z-10"
              />

              <div className="border-b border-gray-200/80 pb-4 sm:pb-5">
                <img src="/assets/clean_logo_toypark.webp" alt="ToyPark Logo" className="h-12 sm:h-14 w-auto object-contain mb-3" />
                <h3 className="text-xl sm:text-2xl font-black text-[#FF5722] tracking-tight uppercase leading-none">
                  TOYPARK
                </h3>
                <p className="text-xs sm:text-sm font-bold text-gray-500 mt-1.5">
                  Authentic &amp; Premium Quality Products
                </p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A] uppercase tracking-wider mb-3">
                  Why Choose ToyPark
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-600">
                  <li className="flex items-start gap-2.5"><span className="text-[#FF5722] text-base">•</span><span>Quality-focused Indian manufacturing</span></li>
                  <li className="flex items-start gap-2.5"><span className="text-[#FF5722] text-base">•</span><span>Reliable and consistent safety standards</span></li>
                  <li className="flex items-start gap-2.5"><span className="text-[#FF5722] text-base">•</span><span>Built for modern play & active learning</span></li>
                </ul>
              </div>

              <div className="border-t border-gray-200/80 pt-4 sm:pt-5">
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A] uppercase tracking-wider mb-3">
                  About ToyPark
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-600">
                  <li className="flex items-start gap-2.5"><span className="text-[#00C4B5] text-base">•</span><span>Premium product solutions & designs</span></li>
                  <li className="flex items-start gap-2.5"><span className="text-[#00C4B5] text-base">•</span><span>Trust, EN71 & BIS certified safety</span></li>
                  <li className="flex items-start gap-2.5"><span className="text-[#00C4B5] text-base">•</span><span>Unwavering commitment to excellence</span></li>
                </ul>
              </div>

              <a href="https://wa.me/?text=Hi%20ToyPark!%20I'm%20interested%20in%20Wondear%20Dolls%20Dreamhouse" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center transition-all">
                <span>Whatsapp Us</span>
              </a>
            </div>
          </div>

        </div>

        {/* === BOTTOM SECTION: DETAILS & CARDS === */}
        <div className="mt-12 lg:mt-16 pt-8 lg:pt-10 border-t border-gray-100">

          {/* Detailed Paragraphs */}
          <div className="bg-[#F9FAFB] rounded-[2rem] p-6 sm:p-8 md:p-12 font-medium text-gray-700 leading-relaxed space-y-5 sm:space-y-6 mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2D3436]">About Wondear Dolls Dreamhouse Play Tent</h3>
            <p className="text-sm sm:text-base md:text-lg">
              The Wondear Dolls Dreamhouse Play Tent is designed to provide kids with their very own magical retreat right inside your home or classroom. Built with durable high-grade ABS polymer and solid natural wooden supports, it seamlessly combines stability with lightweight portability.
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              Whether used for quiet storytimes, creative house roleplaying, or interactive fun with siblings and friends, this set offers a safe, spacious interior with breathable mesh windows for constant airflow and parent visibility.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl flex items-start gap-3">
                <span className="text-lg sm:text-xl">✨</span>
                <div>
                  <h4 className="font-bold text-[#2D3436] text-sm md:text-base mb-1">Easy Washable Fabric</h4>
                  <p className="text-xs md:text-sm text-gray-500">Fabric elements are machine-washable for hassle-free cleaning after active play sessions.</p>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl flex items-start gap-3">
                <span className="text-lg sm:text-xl">🌱</span>
                <div>
                  <h4 className="font-bold text-[#2D3436] text-sm md:text-base mb-1">Eco-Friendly Materials</h4>
                  <p className="text-xs md:text-sm text-gray-500">Sustainably sourced wood and recyclable plastics crafted with environment care.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Cards */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="bg-[#FFE66D] text-[#2D3436] text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                Key Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D3436] tracking-tight mt-4">
                Crafted for Endless Joy & Safety
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* Card 1 */}
              <div className="bg-[#FDF6ED] rounded-[2rem] p-6 lg:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF6B6B] text-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">🎨</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2D3436] mb-2 sm:mb-3">Imaginative Roleplay</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Designed to encourage social interaction, creativity, and cognitive development through open-ended pretend play. Perfect for playdates and cozy reading nooks.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-200/60 font-bold text-[10px] sm:text-xs text-[#FF6B6B] uppercase tracking-wider">
                  • Sparks Creativity
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#EAF8F9] rounded-[2rem] p-6 lg:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#4ECDC4] text-[#2D3436] rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">🛡️</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2D3436] mb-2 sm:mb-3">Certified Kid Safety</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Constructed with smooth rounded edges, non-toxic organic dyes, and heavy-duty reinforced joints certified under EN71 and BIS safety standards.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-200/60 font-bold text-[10px] sm:text-xs text-[#00C4B5] uppercase tracking-wider">
                  • 100% Non-Toxic
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#F5EFFB] rounded-[2rem] p-6 lg:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#9B59B6] text-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">🚀</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2D3436] mb-2 sm:mb-3">Quick Assembly</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                    Includes modular interlocking components that snap together effortlessly in under 5 minutes without needing extra tools or hardware.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-200/60 font-bold text-[10px] sm:text-xs text-[#9B59B6] uppercase tracking-wider">
                  • Modular Setup
                </div>
              </div>

            </div>

            <ContactForm productName="Wondear Dolls Dreamhouse Play Tent" className="mt-16 sm:mt-20" />
          </div>
        </div>
      </div>

      <Footer2 />
    </div>
  );
}