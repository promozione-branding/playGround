'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import PlayfulHeader from './components/Navbar';
import MainBanner from './components/MainBanner';
import HeroBanner from './components/Home/HeroBanner';
import { FeaturesGrid } from './components/FeaturesGrid';

import Marquee2 from './components/Home/Marquee2';
import ToysForEveryNeed from './components/Home/ToysEveryNeed';
import ShopByCategories from './components/Home/ShopByCategories';
import ShopByAge from './components/Home/ShopByAge';
import ShopElementsSection from './components/Home/ShopElementsSection';
import WhoWeAre from './components/Home/WhoWeAre';
import CloudStatsBanner from './components/Home/CloudStatsBanner';
import HeroSubBanner from './components/Home/HeroSubBanner';
import BusinessStats from './components/Home/BusinessStats';
import HowItWorksProcess from './components/Home/HowItWorksProcess';
import DealsSection from './components/Home/BestDeals';
import HeroTextSection from './components/Home/HeroText';
import FaqInteractivePreview from './components/Home/Faq';
import KidsNewsSection from './components/Home/newletter';
import UpperFooter from './components/Home/UpperFooter';
import Footer2 from './components/Footer2';

// Heavy below-the-fold or highly animated components remain dynamic to improve initial page load speed
const ToyWindmillScroll = dynamic(() => import('./components/Home/ToyWindmillScroll').then((m) => m.ToyWindmillScroll), { ssr: false });
const SplitVantage = dynamic(() => import('./components/Home/splitVantage'), { ssr: false });
const ExpandableVideoMarquee = dynamic(() => import('./components/Home/ExpandableVideoMarquee').then((m) => m.ExpandableVideoMarquee), { ssr: false });
const KidsStackingCards = dynamic(() => import('./components/Home/KidsStackingCards'), { ssr: false });
const ClientTestimonials = dynamic(() => import('./components/Home/ClientTestimonials').then((m) => m.ClientTestimonials), { ssr: false });
const AnyProSection = dynamic(() => import('./components/Home/AnyProSection').then((m) => m.AnyProSection), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#2D3436]">
      <PlayfulHeader />
      <MainBanner />
      {/* <HeroBanner /> */}
   
      <FeaturesGrid />
      
  
      <ToyWindmillScroll />
         <Marquee2 />

      <ToysForEveryNeed />
      <ShopByCategories />
      
      <SplitVantage />
      <ShopElementsSection />
      <WhoWeAre />
      <CloudStatsBanner />
        <HeroSubBanner />
      <ExpandableVideoMarquee />
     
      <ShopByAge />
      <DealsSection />
     
      <BusinessStats />
      <HowItWorksProcess />
      
      <HeroTextSection />
      <AnyProSection />
      <KidsStackingCards />
      <div className="hidden md:block h-16 md:h-24 bg-white" />
   
    
      {/* <KidsNewsSection /> */}
        <FaqInteractivePreview />
           <ClientTestimonials />
      <UpperFooter />
      <Footer2 />
    </main>
  );
}
