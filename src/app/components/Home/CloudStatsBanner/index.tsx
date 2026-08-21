import React from 'react';
import CountUp from 'react-countup';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface StatItem {
  number: number;
  suffix: string;
  decimals?: number;
  label: string;
}

const statsData: StatItem[] = [
  { number: 10000, suffix: '+', label: 'Happy Alumni' },
  { number: 251, suffix: '+', label: 'Students Enrolled' },
  { number: 47, suffix: '+', label: 'Expert Teachers' },
  { number: 4.7, suffix: '', decimals: 1, label: 'User Ratings' },
];

export const CloudStatsBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#00C4B5] pt-2 pb-6 px-4 font-quicksand antialiased">
      
      {/* ═══ PLAYFUL SCALLOPED CLOUD WAVE TOP DIVIDER ═══ */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-20 -translate-y-[98%] pointer-events-none">
        <svg 
          className="relative block w-full h-8 sm:h-12 md:h-14 text-[#00C4B5]" 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none" 
          fill="currentColor"
        >
          <path d="M0,30 C30,10 45,10 60,30 C90,10 105,10 120,30 C150,10 165,10 180,30 C210,10 225,10 240,30 C270,10 285,10 300,30 C330,10 345,10 360,30 C390,10 405,10 420,30 C450,10 465,10 480,30 C510,10 525,10 540,30 C570,10 585,10 600,30 C630,10 645,10 660,30 C690,10 705,10 720,30 C750,10 765,10 780,30 C810,10 825,10 840,30 C870,10 885,10 900,30 C930,10 945,10 960,30 C990,10 1005,10 1020,30 C1050,10 1065,10 1080,30 C1110,10 1125,10 1140,30 C1170,10 1185,10 1200,30 L1200,60 L0,60 Z" />
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto flex items-center justify-center pt-1">
        {/* Mobile & Tablet Slider (2 Clouds Auto-Swipe) */}
        <div className="block lg:hidden w-full">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            autoplay={false}
            loop={true}
            modules={[Autoplay]}
            className="w-full pb-2"
          >
            {statsData.map((stat, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="relative w-full max-w-[165px] sm:max-w-[210px] h-[105px] sm:h-[120px] flex flex-col items-center justify-center p-1 sm:p-2 cursor-pointer group">
                  <svg 
                    className="absolute inset-0 w-full h-full text-white filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.12)]" 
                    viewBox="0 0 280 160" 
                    fill="currentColor"
                  >
                    <path d="M 50 120 
                             C 20 120, 10 95, 30 75 
                             C 15 50, 45 30, 70 45 
                             C 90 20, 130 15, 150 40 
                             C 175 15, 220 25, 230 55 
                             C 260 55, 270 90, 245 110 
                             C 260 130, 230 145, 205 135 
                             C 185 145, 145 145, 130 135 
                             C 105 145, 65 140, 50 120 Z" 
                    />
                  </svg>

                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 sm:px-3">
                    <div className="text-xl sm:text-2xl font-black text-[#FF6B6B] tracking-tight flex items-baseline justify-center font-quicksand">
                      <CountUp 
                        end={stat.number} 
                        duration={2.5} 
                        decimals={stat.decimals || 0} 
                        enableScrollSpy 
                        scrollSpyOnce 
                      />
                      <span className="ml-0.5">{stat.suffix}</span>
                    </div>

                    <span className="text-[10px] sm:text-xs font-extrabold text-[#2D3436] tracking-wide mt-0.5 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop View (Static Row of 4 Clouds) */}
        <div className="hidden lg:grid grid-cols-4 gap-8 items-center justify-items-center w-full">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="relative w-full max-w-[230px] h-[120px] flex flex-col items-center justify-center p-2 cursor-pointer group transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-1"
            >
              <svg 
                className="absolute inset-0 w-full h-full text-white filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]" 
                viewBox="0 0 280 160" 
                fill="currentColor"
              >
                <path d="M 50 120 
                         C 20 120, 10 95, 30 75 
                         C 15 50, 45 30, 70 45 
                         C 90 20, 130 15, 150 40 
                         C 175 15, 220 25, 230 55 
                         C 260 55, 270 90, 245 110 
                         C 260 130, 230 145, 205 135 
                         C 185 145, 145 145, 130 135 
                         C 105 145, 65 140, 50 120 Z" 
                />
              </svg>

              <div className="relative z-10 flex flex-col items-center justify-center text-center px-3">
                <div className="text-2xl lg:text-3xl font-black text-[#FF6B6B] tracking-tight flex items-baseline justify-center font-quicksand">
                  <CountUp 
                    end={stat.number} 
                    duration={2.5} 
                    decimals={stat.decimals || 0} 
                    enableScrollSpy 
                    scrollSpyOnce 
                  />
                  <span className="ml-0.5">{stat.suffix}</span>
                </div>

                <span className="text-xs font-extrabold text-[#2D3436] tracking-wide mt-0.5 leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloudStatsBanner;
