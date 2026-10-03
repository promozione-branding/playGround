import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';
import type { Metadata } from 'next';

const ContactPageContent = dynamic(() => import('../components/pages/contact'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata: Metadata = {
  title: "Contact Toy Park | Play School Furniture ",
  description: "Contact Toy Park for Play School Furniture, kids’ furniture, toys, playground equipment, and wholesale solutions from a trusted manufacturer since 2002.",
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
