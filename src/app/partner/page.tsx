import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';
import type { Metadata } from 'next';

const PartnerPageContent = dynamic(() => import('../components/pages/partnerpage'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "Partner With Toy Park | Play School Furniture Manufacturer",
  description: "Partner with Toy Park for quality Play School Furniture, kids’ products, toys, and playground solutions from an experienced manufacturer and wholesaler since 2002.",
};

export default function PartnerPage() {
  return (
    <main className="min-h-screen">
      <PlayfulHeader />
      <PartnerPageContent />
      <Footer2 />
    </main>
  );
}
