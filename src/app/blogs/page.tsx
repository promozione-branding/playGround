import dynamic from 'next/dynamic';
import PlayfulHeader from '../components/Navbar';

const BlogsPageContent = dynamic(() => import('../components/pages/blogs'));
const Footer2 = dynamic(() => import('../components/Footer2'));

export const metadata = {
  title: "About Us |Leading Play School Furniture Wholesaler | Toy Park",
  description: "Discover Toy Park, a trusted Play School Furniture manufacturer in India since 2002, offering quality kids’ furniture, toys, playground equipment and more.",
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen">
      <PlayfulHeader />
      <BlogsPageContent />
      <Footer2 />
    </main>
  );
}
