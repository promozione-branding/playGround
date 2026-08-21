import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';
import GalleryPageContent from '../components/pages/gallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "",
  description: "",
};

const GalleryLightboxZoom = dynamic(() => import('../components/GalleryLightboxZoom'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white font-quicksand">
      <PlayfulHeader />
      
      {/* 1. Accordion Interactive Showcase */}
      <section className="pt-8 pb-4 bg-[#EAF8F9]">
        <GalleryPageContent />
      </section>

      {/* 2. Lightbox Zoom Full Gallery */}
      <section className="py-12 border-t-2 border-dashed border-gray-200">
        <div className="text-center max-w-2xl mx-auto px-4 mb-8">
          <span className="bg-[#4ECDC4] text-[#2D3436] text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#2D3436]">
            Full Photo Collection
          </span>
          <h3 className="text-2xl md:text-4xl font-black text-[#2D3436] tracking-tight mt-3">
            High-Resolution Photo Gallery & Lightbox
          </h3>
        </div>
        <GalleryLightboxZoom />
      </section>

      <Footer2 />
    </main>
  );
}

