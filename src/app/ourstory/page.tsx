import dynamic from 'next/dynamic';

const OurStoryContent = dynamic(() => import('../components/pages/ourstory'));
const Footer2 = dynamic(() => import('../components/Footer2'));


export const metadata = {
  title: "Our Story | Play School Furniture Wholesaler | Toy Park",
  description: "Discover Toy Park’s journey since 2002 as a trusted Play School Furniture manufacturer and wholesaler, creating quality furniture, toys, playground equipment and more.",
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#E0F7F6]">
      <OurStoryContent />
      <Footer2 />
    </main>
  );
}
