import dynamic from 'next/dynamic';
import PlayfulHeader from '../../components/Navbar';

const BlogDetailContent = dynamic(() => import('../../components/pages/blogs/detail'));
const Footer2 = dynamic(() => import('../../components/Footer2'));

export default function BlogDetailPage() {
  return (
    <main className="min-h-screen bg-[#f0f8fa]">
      <PlayfulHeader />
      <BlogDetailContent />
      <Footer2 />
    </main>
  );
}
