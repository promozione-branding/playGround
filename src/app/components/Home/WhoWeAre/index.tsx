import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FFFFFF] -mt-17 md:-mt-17 pt-0 pb-10 sm:pb-16 px-5 sm:px-10 overflow-hidden font-quicksand antialiased text-[#2D3436] z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center">

        {/* Right Column: Text & Features — shown first on mobile via order */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">
          {/* Sub-badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#FF5A5F]/10 border border-[#FF5A5F]/20 rounded-full px-3.5 py-1 text-xs font-black tracking-widest text-[#FF5A5F] uppercase">
              WHO WE ARE
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#0D1C3A] leading-[1.2] tracking-tight">
            We Make Things <span className="text-[#FF5A5F]">Kids Love.</span>
            <br className="hidden sm:block" />
            Businesses Can <span className="bg-gradient-to-r from-[#00C4B5] to-[#0284C7] bg-clip-text text-transparent">Count On.</span>
          </h2>

          {/* Description — hidden on mobile */}
          <p className="hidden sm:block text-sm sm:text-base text-[#334155] leading-relaxed font-medium">
            What started with a passion for creating better childhood experiences has grown into a <span className="font-bold text-[#0D1C3A]">trusted name</span> in toys, play equipment, and <span className="font-bold text-[#00C4B5]">Play School Furniture</span>. We combine years of industry know-how with thoughtful design, dependable quality, and production built for <span className="font-bold text-[#FF5A5F]">wholesale</span>—so our partners can confidently bring more products, more value, and more smiles to their customers.
          </p>

          <div className="w-full h-px bg-slate-200/80 border-dashed border-t border-slate-300" />

          {/* Features List */}
          <div className="space-y-3 sm:space-y-6">

            {/* Feature 1 */}
            <div className="flex items-center sm:items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8BC34A] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-extrabold text-[#8BC34A] text-base sm:text-lg leading-tight">
                  Made to Impress
                </h4>
                <p className="hidden sm:block text-xs sm:text-sm text-[#475569] leading-relaxed font-medium">
                  Products designed to catch attention, spark curiosity, and keep children coming back for more.
                </p>
                <p className="block sm:hidden text-xs text-[#475569] font-medium">
                  Designed to catch attention & spark curiosity.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center sm:items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00ACC1] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-extrabold text-[#00ACC1] text-base sm:text-lg leading-tight">
                  Made to Perform
                </h4>
                <p className="hidden sm:block text-xs sm:text-sm text-[#475569] leading-relaxed font-medium">
                  Thoughtfully crafted for everyday use, with quality and durability at the heart of every product.
                </p>
                <p className="block sm:hidden text-xs text-[#475569] font-medium">
                  Quality & durability at the heart of every product.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center sm:items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF5722] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-extrabold text-[#FF5722] text-base sm:text-lg leading-tight">
                  Made to Grow with You
                </h4>
                <p className="hidden sm:block text-xs sm:text-sm text-[#475569] leading-relaxed font-medium">
                  Reliable wholesale solutions that help retailers, schools, daycares, and distributors build stronger businesses.
                </p>
                <p className="block sm:hidden text-xs text-[#475569] font-medium">
                  Wholesale solutions for retailers, schools & daycares.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Left Column: School Illustration — shown second on mobile */}
        <div className="lg:col-span-6 flex justify-center items-center order-2 lg:order-1">
          <div className="relative w-full max-w-[220px] sm:max-w-xl">
            <Image
              src="/assets/school.png"
              alt="Our Journey of Inspiring Children"
              width={576}
              height={400}
              className="w-full h-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;
