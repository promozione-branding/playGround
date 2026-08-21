import dynamic from 'next/dynamic';

const OurStoryContent = dynamic(() => import('../components/pages/ourstory'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#E0F7F6]">
      <OurStoryContent />
      <Footer2 />
    </main>
  );
}
