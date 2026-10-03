import React from 'react';
import KidzaNavbar from '../components/Navbar';
import CertificationPageContent from '../components/pages/certification';
import Footer2 from '../components/Footer2';

export const metadata = {
  title: 'Toy Park Certifications | Trusted Play School Furniture Manufacturer',
  description: 'Explore Toy Park’s certifications and quality standards. We are a trusted Play School Furniture manufacturer and wholesaler focused on quality, safety, and reliability.',
};

export default function CertificationPage() {
  return (
    <main className="min-h-screen bg-white">
      <KidzaNavbar />
      <CertificationPageContent />
      <Footer2 />
    </main>
  );
}
