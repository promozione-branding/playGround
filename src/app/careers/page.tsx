import React from 'react';
import KidzaNavbar from '../components/Navbar';
import CareersPageContent from '../components/pages/careers';
import Footer2 from '../components/Footer2';

export const metadata = {
  title: '',
  description: '',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <KidzaNavbar />
      <CareersPageContent />
      <Footer2 />
    </main>
  );
}
