'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// ============================================================================
// 🖼️ BANNER SLIDES DATA
// ============================================================================
const BANNER_SLIDES = [
  {
    id: 1,
    desktopImg: '/assets/banner/home_banner1.png',
    mobileImg: '/assets/banner/mobile_banner_1.png',
    overlayType: 'hero',
  },
  {
    id: 2,
    desktopImg: '/assets/banner/home_banner2.png',
    mobileImg: '/assets/banner/mobile_banner2.png',
    overlayType: 'classroom',
  },
  {
    id: 3,
    desktopImg: '/assets/banner/home_banner3.png',
    mobileImg: '/assets/banner/mobile_banner3.png',
    overlayType: 'explore',
  },
  {
    id: 4,
    desktopImg: '/assets/banner/home_banner4.png',
    mobileImg: '/assets/banner/mobile_banner4.png',
    overlayType: 'activePlay',
  },
];

// Single source of truth for Floating Icons
const FLOATING_ICONS = [
  {
    id: 'paper-plane',
    src: '/assets/paper_plane_with_trail.png',
    alt: 'Paper Plane',
    size: 240,
    top: '18%',
    left: '29%',
    rotation: -10,
    floatY: 20,
    duration: 3.5,
    delay: 0,
    maskColor: '#0047BA',
  },
  {
    id: 'helicopter',
    src: '/assets/helicopter_icon.svg',
    alt: 'Helicopter',
    size: 100,
    top: '87%',
    left: '1%',
    rotation: 5,
    floatY: 15,
    duration: 4.2,
    delay: 0.5,
  },
  {
    id: 'plane-icon',
    src: '/assets/plane_icon.webp',
    alt: 'Plane Icon',
    size: 110,
    top: '4%',
    right: '5%',
    rotation: -5,
    floatY: 18,
    duration: 3.8,
    delay: 0.2,
  },
];

// Text shadow styles for text outlines (replaces global CSS classes)
const DESKTOP_TEXT_SHADOW =
  '0.25vw 0.25vw 0px #ffffff, -0.25vw -0.25vw 0px #ffffff, 0.25vw -0.25vw 0px #ffffff, -0.25vw 0.25vw 0px #ffffff, 0px 0.3vw 0.8vw rgba(0,0,0,0.12)';

const MOBILE_TEXT_SHADOW =
  '1.5px 1.5px 0px #ffffff, -1.5px -1.5px 0px #ffffff, 1.5px -1.5px 0px #ffffff, -1.5px 1.5px 0px #ffffff, 0px 2px 6px rgba(0,0,0,0.12)';

// ============================================================================
// 🖼️ RESPONSIVE IMAGE COMPONENT
// ============================================================================
interface ResponsiveBannerImageProps {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  priority?: boolean;
}

const ResponsiveBannerImage = ({ desktopSrc, mobileSrc, alt, priority = false }: ResponsiveBannerImageProps) => {
  return (
    <>
      {/* 🖥️ Desktop Banner Image */}
      <div className="hidden sm:block relative w-full h-auto">
        <Image
          src={desktopSrc}
          alt={`${alt} Desktop`}
          width={1920}
          height={800}
          priority={priority}
          sizes="100vw"
          className="w-full h-auto object-cover"
        />
      </div>
      {/* 📱 Mobile Banner Image */}
      <div className="block sm:hidden relative w-full h-auto">
        <Image
          src={mobileSrc}
          alt={`${alt} Mobile`}
          width={800}
          height={1000}
          priority={priority}
          sizes="100vw"
          className="w-full h-auto object-cover object-top"
        />
      </div>
    </>
  );
};

// ============================================================================
// 🎈 REUSABLE FLOATING ICON (USES NEXT/IMAGE)
// ============================================================================
interface FloatingIconProps {
  id: string;
  src: string;
  alt: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  rotation: number;
  floatY: number;
  duration: number;
  delay: number;
  maskColor?: string;
}

const FloatingIcon = ({ src, alt, size, top, left, right, rotation, floatY, duration, delay, maskColor }: FloatingIconProps) => (
  <div
    style={{
      top: top || 'auto',
      left: left || 'auto',
      right: right || 'auto',
      animation: `floatAnimation ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      // Custom CSS properties
      ['--float-y' as any]: `-${floatY}px`,
    }}
    className="hidden sm:block absolute z-20 pointer-events-none drop-shadow-md"
  >
    <div 
      style={{ 
        maxWidth: `${size}px`,
        transform: `rotate(${rotation}deg)`
      }} 
      className="w-full h-auto"
    >
      {maskColor ? (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: maskColor,
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-auto h-auto object-contain"
        />
      )}
    </div>
  </div>
);

// ============================================================================
// 📝 REUSABLE HEADLINE COMPONENT
// ============================================================================
interface TextGroup {
  text: string;
  color: string;
}

const ColoredHeadline = ({
  desktopLines = [],
  mobileRows = [],
}: {
  desktopLines?: TextGroup[];
  mobileRows?: TextGroup[][];
}) => (
  <>
    {/* Desktop View */}
    {desktopLines.length > 0 && (
      <h1 className="hidden sm:block font-black text-[6.5vw] tracking-tight leading-[0.98] uppercase drop-shadow-sm">
        {desktopLines.map((line, idx) => (
          <span key={idx} className="block" style={{ color: line.color, textShadow: DESKTOP_TEXT_SHADOW }}>
            {line.text}
          </span>
        ))}
      </h1>
    )}

    {/* Mobile View */}
    {mobileRows.length > 0 && (
      <h1 className="flex sm:hidden font-black text-[6.8vw] sm:text-[7.5vw] tracking-tight leading-[1.05] uppercase drop-shadow-sm flex-col items-center">
        {mobileRows.map((row, rowIdx) => (
          <div key={rowIdx} className={`flex items-center gap-1.5 ${rowIdx > 0 ? 'mt-[0.3vw]' : ''}`}>
            {row.map((item, itemIdx) => (
              <span key={itemIdx} style={{ color: item.color, textShadow: MOBILE_TEXT_SHADOW }}>
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </h1>
    )}
  </>
);

// ============================================================================
// 📝 SLIDE OVERLAY COMPONENTS
// ============================================================================
const HeroOverlay = () => (
  <>
    <div className="hidden sm:flex absolute z-30 top-[10.5%] left-[5%] max-w-[48vw] flex-col justify-center text-left">
      <ColoredHeadline
        desktopLines={[
          { text: 'PLAY,', color: '#E52421' },
          { text: 'LEARN,', color: '#0047BA' },
          { text: 'GROW', color: '#008B74' },
          { text: 'TOGETHER!', color: '#F56B00' },
        ]}
      />
      <div className="flex items-center gap-[0.6vw] my-[1.2vw] w-full max-w-[22vw]">
        <div className="h-[0.18vw] flex-1 bg-[#0047BA]/30 rounded-full" />
        <div className="w-[0.8vw] h-[0.8vw] min-w-[4px] min-h-[4px] rounded-full bg-[#0047BA]" />
        <div className="h-[0.18vw] flex-1 bg-[#0047BA]/30 rounded-full" />
      </div>
      <div className="text-[1.9vw] font-bold text-slate-800 leading-snug">
        <p className="font-black text-slate-900">Premium Outdoor Playgrounds</p>
        <p className="mt-[0.2vw] font-extrabold text-slate-700">
          for <span className="text-[#0047BA]">Active Play</span> and <span className="text-[#008B74]">Happy Memories</span>
        </p>
      </div>
    </div>

    <div className="block sm:hidden absolute z-30 top-[4.5%] left-0 w-full px-3 text-center">
      <div className="flex flex-col items-center">
        <ColoredHeadline
          mobileRows={[
            [{ text: 'PLAY,', color: '#E52421' }, { text: 'LEARN,', color: '#0047BA' }],
            [{ text: 'GROW', color: '#008B74' }, { text: 'TOGETHER!', color: '#F56B00' }],
          ]}
        />
        <div className="mt-1.5 text-[2.8vw] font-extrabold text-slate-800 leading-snug text-center">
          <p className="font-black text-slate-900">Premium Outdoor Playgrounds</p>
          <p className="mt-0.5 font-extrabold text-slate-700">
            for <span className="text-[#0047BA]">Active Play</span> and <span className="text-[#008B74]">Happy Memories</span>
          </p>
        </div>
      </div>
    </div>

    {FLOATING_ICONS.map((icon) => (
      <FloatingIcon key={icon.id} {...icon} />
    ))}
  </>
);

const ClassroomOverlay = () => (
  <>
    <div className="hidden sm:flex absolute z-30 top-[22%] left-[6%] max-w-[42vw] flex-col justify-center text-left">
      <h1 className="font-black text-[5.8vw] sm:text-[5.5vw] tracking-tight leading-[0.98] uppercase drop-shadow-sm flex flex-col">
        <span className="text-[#0F2942]">EDUCATIONAL</span>
        <div className="flex items-center gap-[0.1vw] my-[0.2vw]">
          <span className="text-[#00A859]">C</span><span className="text-[#0047BA]">L</span><span className="text-[#F56B00]">A</span><span className="text-[#7B1FA2]">S</span><span className="text-[#512DA8]">S</span><span className="text-[#D32F2F]">R</span><span className="text-[#E64A19]">O</span><span className="text-[#689F38]">O</span><span className="text-[#7B1FA2]">M</span>
        </div>
        <div className="flex items-center gap-[1.2vw] text-[#0F2942]">
          <span className="text-[#FFB300] tracking-tighter text-[4vw] sm:text-[3.5vw] leading-none">≡</span>
          <span>RUG</span>
          <span className="text-[#FFB300] tracking-tighter text-[4vw] sm:text-[3.5vw] leading-none">≡</span>
        </div>
      </h1>
    </div>

    <div className="block sm:hidden absolute z-30 top-[4.5%] left-0 w-full px-3 text-center">
      <h1 className="font-black text-[6vw] tracking-tight leading-[1] uppercase drop-shadow-sm flex flex-col items-center">
        <span className="text-[#0F2942]">EDUCATIONAL</span>
        <div className="flex items-center gap-1 my-0.5">
          <span className="text-[#00A859]">C</span><span className="text-[#0047BA]">L</span><span className="text-[#F56B00]">A</span><span className="text-[#7B1FA2]">S</span><span className="text-[#512DA8]">S</span><span className="text-[#D32F2F]">R</span><span className="text-[#E64A19]">O</span><span className="text-[#689F38]">O</span><span className="text-[#7B1FA2]">M</span>
        </div>
        <div className="flex items-center gap-1 text-[#0F2942]">
          <span className="text-[#FFB300] tracking-tighter text-[4.5vw] leading-none">≡</span>
          <span>RUG</span>
          <span className="text-[#FFB300] tracking-tighter text-[4.5vw] leading-none">≡</span>
        </div>
      </h1>
    </div>
  </>
);

const ExploreOverlay = () => {
  const desktopLines = [
    { text: 'EXPLORE,', color: '#E52421' },
    { text: 'CREATE,', color: '#0047BA' },
    { text: 'DISCOVER', color: '#008B74' },
    { text: 'MORE!', color: '#F56B00' },
  ];
  const mobileRows = [
    [{ text: 'EXPLORE,', color: '#E52421' }, { text: 'CREATE,', color: '#0047BA' }],
    [{ text: 'DISCOVER', color: '#008B74' }, { text: 'MORE!', color: '#F56B00' }],
  ];

  return (
    <>
      <div className="hidden sm:flex absolute z-30 top-[10.5%] left-[5%] max-w-[48vw] flex-col justify-center text-left">
        <ColoredHeadline desktopLines={desktopLines} />
      </div>
      <div className="block sm:hidden absolute z-30 top-[4.5%] left-0 w-full px-3 text-center">
        <div className="flex flex-col items-center">
          <ColoredHeadline mobileRows={mobileRows} />
          <div className="mt-1 text-[2.7vw] font-extrabold text-slate-800 leading-snug text-center">
            <p className="font-black text-slate-900">Interactive Toys & Play Sets</p>
            <p className="mt-0.5 font-extrabold text-slate-700">
              for <span className="text-[#0047BA]">Imaginative</span> <span className="text-[#008B74]">Young Minds</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ActivePlayOverlay = () => {
  const desktopLines = [
    { text: 'ACTIVE PLAY,', color: '#0047BA' },
    { text: 'ENDLESS', color: '#008B74' },
    { text: 'FUN!', color: '#F56B00' },
  ];
  const mobileRows = [
    [{ text: 'ACTIVE PLAY,', color: '#0047BA' }],
    [{ text: 'ENDLESS', color: '#008B74' }, { text: 'FUN!', color: '#F56B00' }],
  ];

  return (
    <>
      <div className="hidden sm:flex absolute z-30 top-[10.5%] left-[5%] max-w-[48vw] flex-col justify-center text-left">
        <ColoredHeadline desktopLines={desktopLines} />
      </div>
      <div className="block sm:hidden absolute z-30 top-[4.5%] left-0 w-full px-3 text-center">
        <div className="flex flex-col items-center">
          <ColoredHeadline mobileRows={mobileRows} />
          <div className="mt-1 text-[2.7vw] font-extrabold text-slate-800 leading-snug text-center">
            <p className="font-black text-slate-900">Safe & Premium Playgrounds</p>
            <p className="mt-0.5 font-extrabold text-slate-700">
              built for <span className="text-[#0047BA]">Every</span> <span className="text-[#008B74]">Adventure</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const renderSlideOverlay = (type: string) => {
  switch (type) {
    case 'hero': return <HeroOverlay />;
    case 'classroom': return <ClassroomOverlay />;
    case 'explore': return <ExploreOverlay />;
    case 'activePlay': return <ActivePlayOverlay />;
    default: return null;
  }
};

// ============================================================================
// 🏆 MAIN BANNER COMPONENT
// ============================================================================
const MainBanner = () => {
  return (
    <section className="w-full relative overflow-hidden bg-white select-none font-quicksand">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-auto main-banner-swiper"
        style={{
          '--swiper-pagination-color': '#00c4b5',
          '--swiper-pagination-bullet-inactive-color': '#00c4b5',
          '--swiper-pagination-bullet-inactive-opacity': '0.4',
          '--swiper-pagination-bullet-size': '10px',
        } as React.CSSProperties}
      >
        {BANNER_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-auto overflow-hidden">
            <ResponsiveBannerImage
              desktopSrc={slide.desktopImg}
              mobileSrc={slide.mobileImg}
              alt={`Main Banner ${slide.id}`}
              priority={index === 0}
            />
            {renderSlideOverlay(slide.overlayType)}
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        :global(.main-banner-swiper .swiper-pagination) {
          bottom: 12px !important;
        }
        :global(.main-banner-swiper .swiper-pagination-bullet) {
          transition: all 0.3s ease;
        }
        :global(.main-banner-swiper .swiper-pagination-bullet-active) {
          width: 28px !important;
          border-radius: 6px !important;
        }
        @keyframes floatAnimation {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, var(--float-y), 0);
          }
        }
      `}</style>
    </section>
  );
};

export default MainBanner;