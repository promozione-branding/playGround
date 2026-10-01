
import KidzaNavbar from '../components/Navbar';
import WhyChooseUsPageContent from '../components/pages/why-choose-us';
import Footer2 from '../components/Footer2';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Choose Toy Park | Play School Furniture Manufacturer",
  description: "Choose Toy Park for quality Play School Furniture, kids’ products, toys and playground equipment. Trusted manufacturer and wholesaler since 2002.",
};




export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-[#e0f7fa]">
      <KidzaNavbar />
      <WhyChooseUsPageContent />
      <Footer2 />
    </main>
  );
}
