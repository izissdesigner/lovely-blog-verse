
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Star, Hash } from 'lucide-react';

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
    },
    {
      id: '4',
      title: 'Future of Web Development',
      excerpt: 'Emerging trends and technologies in web development.',
      image: 'photo-1487058792275-0ad4aaf24ca7',
      author: 'Emily Chen',
      authorId: '4',
      date: '2024-01-12'
    }
  ];

  const relatedBlogs = [
    {
      id: '5',
      title: 'AI Ethics and Responsible Development',
      excerpt: 'Understanding the importance of ethical AI development.',
      image: 'photo-1526374965328-7f61d4dc18c5',
      author: 'Dr. Amanda White',
      authorId: '5',
      date: '2024-01-11'
    },
    {
      id: '6',
      title: 'Quantum Computing Basics',
      excerpt: 'An introduction to quantum computing principles.',
      image: 'photo-1581091226825-a6a2a5aee158',
      author: 'Prof. Mark Davis',
      authorId: '6',
      date: '2024-01-10'
    },
    {
      id: '7',
      title: 'Cybersecurity Best Practices',
      excerpt: 'Essential security measures for modern businesses.',
      image: 'photo-1501854140801-50d01698950b',
      author: 'Lisa Brown',
      authorId: '7',
      date: '2024-01-09'
    }
  ];

  const popularBlogs = [
    {
      id: '8',
      title: 'The Complete Guide to React Hooks',
      excerpt: 'Master React Hooks with practical examples and best practices.',
      image: 'photo-1649972904349-6e44c42644a7',
      author: 'Tom Wilson',
      authorId: '8',
      date: '2024-01-08'
    },
    {
      id: '9',
      title: 'Building Scalable APIs',
      excerpt: 'Learn how to design and build APIs that scale.',
      image: 'photo-1506744038136-46273834b3fb',
      author: 'Alex Rivera',
      authorId: '9',
      date: '2024-01-07'
    },
    {
      id: '10',
      title: 'Modern CSS Techniques',
      excerpt: 'Advanced CSS features and modern layout techniques.',
      image: 'photo-1488590528505-98d2b5aba04b',
      author: 'Maya Patel',
      authorId: '10',
      date: '2024-01-06'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize text-blue-600">{t(category || '')}</span>
          </div>
          <p className="text-gray-600 text-lg">
            Discover the latest articles and insights in {t(category || '')}.
          </p>
        </div>

        {/* Main Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* Related Blogs Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <Hash className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Related Articles</h2>
              <p className="text-gray-600">More articles in this topic</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.map((blog) => (
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
                size="small"
              />
            ))}
          </div>
        </section>

        {/* Popular Blogs Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Popular This Week</h2>
              <p className="text-gray-600">Most viewed articles</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBlogs.map((blog) => (
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
                size="small"
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
