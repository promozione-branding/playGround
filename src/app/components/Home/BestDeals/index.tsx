'use client';

import React from 'react';
import { Heart, Star, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Product type definition
interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  discountBadge?: string;
  image: string;
}

// Sample Data using your local image folder paths
const SPECIAL_ITEMS: Product[] = [
  {
    id: 's1',
    category: 'Kids Furniture',
    title: 'Harbors: Where Young Musicians Find Melody!',
    price: '$33.00',
    originalPrice: '$54.00',
    rating: 5,
    reviewCount: 5,
    image: '/assets/split_vantage_images/Kids_Furniture.png',
  },
  {
    id: 's2',
    category: 'Playshouse',
    title: 'Wondear Dolls: Where Imagination Plays',
    price: '$33.00 – $72.00',
    rating: 5,
    reviewCount: 5,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
  },
  {
    id: 's3',
    category: 'Trampoline',
    title: 'Galore: Rev Up The Playtimes Joy',
    price: '$30.00',
    rating: 5,
    reviewCount: 5,
    image: '/assets/split_vantage_images/Kids_Trampoline.png',
  },
  {
    id: 's4',
    category: 'Kids Furniture',
    title: 'Echwizs Marvels: Electronic Playtime Fun',
    price: '$56.00',
    rating: 5,
    reviewCount: 5,
    image: '/assets/split_vantage_images/Kids_Furniture.png',
  },
];

const HOT_DEALS: Product[] = [
  {
    id: 'h1',
    category: 'Trampoline',
    title: 'Becca: Rev Up the Playtime Excitement!',
    price: '$54.00',
    rating: 5.0,
    reviewCount: 5,
    image: '/assets/split_vantage_images/Kids_Trampoline.png',
  },
  {
    id: 'h2',
    category: 'Playshouse',
    title: 'Culinary Creations: Where Mini Chefs Cook...',
    price: '$42.00',
    rating: 5.0,
    reviewCount: 5,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
  },
  {
    id: 'h3',
    category: 'Kids Furniture',
    title: 'EchWiz Marvels: Electronic Playtime...',
    price: '$56.00',
    rating: 5.0,
    reviewCount: 5,
    image: '/assets/split_vantage_images/Kids_Furniture.png',
  },
  {
    id: 'h4',
    category: 'Trampoline',
    title: 'Harbors: Where Young Musicians Find Melody!',
    price: '$33.00',
    originalPrice: '$54.00',
    discountBadge: '-39%',
    rating: 4.0,
    reviewCount: 4,
    image: '/assets/split_vantage_images/Kids_Trampoline.png',
  },
  {
    id: 'h5',
    category: 'Playshouse',
    title: 'Enchanted Dolls: A World of Glamour and...',
    price: '$58.00',
    rating: 5.0,
    reviewCount: 5,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
  },
  {
    id: 'h6',
    category: 'Kids Furniture',
    title: 'Galore: Rev Up the Playtime Excitement!',
    price: '$47.00',
    originalPrice: '$51.00',
    discountBadge: '-8%',
    rating: 5.0,
    reviewCount: 5,
    image: '/assets/split_vantage_images/Kids_Furniture.png',
  },
  {
    id: 'h7',
    category: 'Trampoline',
    title: 'Wondear Dolls: Where Imagination Comes to...',
    price: '$33.00 – $72.00',
    discountBadge: '-25%',
    rating: 5.0,
    reviewCount: 5,
    image: '/assets/split_vantage_images/Kids_Trampoline.png',
  },
  {
    id: 'h8',
    category: 'Playshouse',
    title: 'Enchanted Dolls: A World of Glamour and...',
    price: '$58.00',
    rating: 5.0,
    reviewCount: 5,
    image: '/assets/split_vantage_images/kids_playsHouse.png',
  },
];

// Chunk hot deals into groups of 4 for mobile 2x2 grid slides
const HOT_DEALS_MOBILE_SLIDES = [
  HOT_DEALS.slice(0, 4),
  HOT_DEALS.slice(4, 8),
];

export const DealsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 px-3 sm:px-8 font-quicksand text-slate-800">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ═══ LEFT COLUMN: SPECIAL ITEMS ═══ */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4 sm:gap-6 pr-0 lg:pr-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
              Special Items
            </h2>
          </div>

          {/* 📱 MOBILE VIEW: Swiper Auto-Swipe One-by-One Carousel (< sm) */}
          <div className="block sm:hidden w-full relative pb-8">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={16}
              loop={true}
              autoplay={false}
              pagination={{
                clickable: true,
              }}
              className="w-full special-items-swiper"
            >
              {SPECIAL_ITEMS.map((item) => (
                <SwiperSlide key={item.id}>
                  <SpecialItemCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 🖥️ DESKTOP VIEW: FULL VERTICAL LIST (>= sm) */}
          <div className="hidden sm:flex flex-col gap-6 lg:gap-8 xl:gap-[2.2rem] justify-between flex-1">
            {SPECIAL_ITEMS.map((item) => (
              <SpecialItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* ═══ RIGHT COLUMN: HOT DEAL ═══ */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4 sm:gap-6">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-1 sm:pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🔥</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
                Hot Deal
              </h2>
            </div>

            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 border border-slate-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-slate-50 hover:text-slate-900 transition-all">
              <span>Explore all</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          {/* 📱 MOBILE VIEW: 2x2 GRID AUTO-SWIPE CAROUSEL (Visible on < sm) */}
          <div className="block sm:hidden w-full relative pb-7">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={12}
              loop={true}
              autoplay={false}
              pagination={{
                clickable: true,
              }}
              className="w-full hot-deals-swiper"
            >
              {HOT_DEALS_MOBILE_SLIDES.map((slideItems, index) => (
                <SwiperSlide key={index}>
                  <div className="grid grid-cols-2 gap-3">
                    {slideItems.map((deal) => (
                      <ProductCard key={deal.id} deal={deal} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 🖥️ DESKTOP VIEW: STANDARD GRID (Visible on >= sm) */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {HOT_DEALS.map((deal) => (
              <ProductCard key={deal.id} deal={deal} />
            ))}
          </div>

        </div>

      </div>

      {/* Custom Swiper Pagination Styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .special-items-swiper .swiper-pagination-bullet,
        .hot-deals-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #00C4B5;
          opacity: 0.35;
          transition: all 0.3s ease;
        }
        .special-items-swiper .swiper-pagination-bullet-active,
        .hot-deals-swiper .swiper-pagination-bullet-active {
          width: 22px;
          border-radius: 4px;
          background: #00C4B5;
          opacity: 1;
        }
        .special-items-swiper .swiper-pagination,
        .hot-deals-swiper .swiper-pagination {
          bottom: 0px !important;
        }
      ` }} />
    </section>
  );
};

// Reusable Product Card Component
const ProductCard: React.FC<{ deal: Product }> = ({ deal }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-2.5 sm:p-4 flex flex-col justify-between relative hover:shadow-xl hover:border-slate-200 transition-all duration-300 group cursor-pointer h-full">
      {/* Discount Badge */}
      {deal.discountBadge && (
        <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-[#FF4D4F] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md z-10">
          {deal.discountBadge}
        </span>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white shadow-sm transition-all z-10">
        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      {/* Product Image Area */}
      <div className="w-full h-28 sm:h-44 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-2.5 sm:mb-4 relative overflow-hidden">
        <img 
          src={deal.image} 
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Meta */}
      <div className="flex flex-col gap-1 sm:gap-1.5">
        <span className="text-[9px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {deal.category}
        </span>

        <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-cyan-600 transition-colors h-8 sm:h-10">
          {deal.title}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400 text-[10px] sm:text-xs">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(deal.rating) ? 'fill-current' : 'text-slate-200'}`} 
            />
          ))}
          <span className="text-slate-400 text-[9px] sm:text-[11px] font-semibold ml-0.5 sm:ml-1">
            ({deal.rating.toFixed(1)})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
          <span className="text-xs sm:text-base font-extrabold text-[#00C4B5]">
            {deal.price}
          </span>
          {deal.originalPrice && (
            <span className="text-[10px] sm:text-xs text-slate-400 line-through">
              {deal.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Special Item Card Component
const SpecialItemCard: React.FC<{ item: Product }> = ({ item }) => {
  return (
    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#00C4B5]/40 transition-all cursor-pointer group">
      {/* Thumbnail Box */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-100 flex-shrink-0 overflow-hidden shadow-sm">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 overflow-hidden flex-1">
        <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
          {item.category}
        </span>
        <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#00C4B5] transition-colors">
          {item.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-sm sm:text-base font-black text-[#00C4B5]">
            {item.price}
          </span>
          {item.originalPrice && (
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 line-through">
              {item.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsSection;