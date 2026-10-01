import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';
import type { Metadata } from 'next';

const WhoWeAreContent = dynamic(() => import('../components/pages/whoweare'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "Who We Are | Where Play Meets Purpose | Toy Park",
  description: "Get to know Toy Park, a Play School Furniture manufacturer and wholesaler creating thoughtfully designed kids’ furniture, toys, playgrounds, and play solutions since 2002.",
};

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen">
      <PlayfulHeader />
      <WhoWeAreContent />
      <Footer2 />
    </main>
  );
}
