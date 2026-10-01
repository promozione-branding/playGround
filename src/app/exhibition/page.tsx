import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';
import type { Metadata } from 'next';

const ExhibitionPageContent = dynamic(() => import('../components/pages/exhibition'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "Toy Park Exhibitions | Play School Furniture Manufacturer",
  description: "Explore Toy Park’s exhibition journey showcasing Play School Furniture, kids’ products, toys and playground solutions as a trusted manufacturer and wholesaler since 2002.",
};

export default function ExhibitionPage() {
  return (
    <main className="min-h-screen">
      <PlayfulHeader />
      <ExhibitionPageContent />
      <Footer2 />
    </main>
  );
}
