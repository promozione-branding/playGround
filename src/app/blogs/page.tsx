import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';

const BlogsPageContent = dynamic(() => import('../components/pages/blogs'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export default function BlogsPage() {
  return (
    <main className="min-h-screen">
      <PlayfulHeader />
      <BlogsPageContent />
      <Footer2 />
    </main>
  );
}
