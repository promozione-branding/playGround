import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';
import type { Metadata } from 'next';

const ContactPageContent = dynamic(() => import('../components/pages/contact'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "contact us page for ToyPark",
  description: "contact us page for ToyPark",
};


export default function ContactUsPage() {
  return (
    <main className="min-h-screen">
      <PlayfulHeader />
      <ContactPageContent />
      <Footer2 />
    </main>
  );
}
