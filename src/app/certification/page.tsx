import React from 'react';
import KidzaNavbar from '../components/Navbar';
import CertificationPageContent from '../components/pages/certification';
import Footer2 from '../components/Footer2';

export const metadata = {
  title: 'certification',
  description: 'certification',
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
