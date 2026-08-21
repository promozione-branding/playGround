import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';

const AboutUsScrollAnimation = dynamic(() => import('../components/pages/about'));
const ShopElementsSection = dynamic(() => import('../components/Home/ShopElementsSection'));
const WhoWeAre = dynamic(() => import('../components/Home/WhoWeAre'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#E0F7F6]">
      <PlayfulHeader />
      <AboutUsScrollAnimation />
      <ShopElementsSection bgColor="bg-[#E0F7F6]" />
      <WhoWeAre />
      <Footer2 />
    </main>
  );
}
