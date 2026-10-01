import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';

const AboutUsScrollAnimation = dynamic(() => import('../components/pages/about'));
const ShopElementsSection = dynamic(() => import('../components/Home/ShopElementsSection'));
const WhoWeAre = dynamic(() => import('../components/Home/WhoWeAre'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "About Us |Leading Play School Furniture Wholesaler | Toy Park",
  description: "Discover Toy Park, a trusted Play School Furniture manufacturer in India since 2002, offering quality kids’ furniture, toys, playground equipment and more.",
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
