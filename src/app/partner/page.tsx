import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';
import type { Metadata } from 'next';

const PartnerPageContent = dynamic(() => import('../components/pages/partnerpage'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "Partner with us ",
  description: "partner with us ",
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
