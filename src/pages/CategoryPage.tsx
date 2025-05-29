
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { t } = useLanguage();

  // Mock data - in real app, this would be fetched from Supabase
  const categoryBlogs = [
    {
      id: '1',
      title: 'Advanced Technology Trends 2024',
      excerpt: 'Exploring the cutting-edge technologies that will shape our future.',
      image: 'photo-1518770660439-4636190af475',
      author: 'John Smith',
      authorId: '1',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Machine Learning Innovations',
      excerpt: 'Latest breakthroughs in machine learning and artificial intelligence.',
      image: 'photo-1461749280684-dccba630e2f6',
      author: 'Sarah Johnson',
      authorId: '2',
      date: '2024-01-14'
    },
    {
      id: '3',
      title: 'Digital Transformation Guide',
      excerpt: 'How businesses are adapting to the digital revolution.',
      image: 'photo-1488590528505-98d2b5aba04b',
      author: 'Mike Wilson',
      authorId: '3',
      date: '2024-01-13'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 capitalize">
            {t(category || '')} Blogs
          </h1>
          <p className="text-gray-600 mt-2">
            Discover the latest articles and insights in {t(category || '')}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              category={category || ''}
              author={blog.author}
              authorId={blog.authorId}
              date={blog.date}
              size="large"
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
