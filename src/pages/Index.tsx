
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  // Mock data - in real app, this would come from Supabase
  const latestBlogs = [
    {
      id: '1',
      title: 'The Future of Artificial Intelligence in 2024',
      excerpt: 'Exploring the latest developments in AI technology and its impact on various industries.',
      image: 'photo-1518770660439-4636190af475',
      category: 'technology',
      author: 'John Smith',
      authorId: '1',
      date: '2024-01-15'
    },
    {
      id: '2', 
      title: 'Healthy Living: 10 Tips for a Better Lifestyle',
      excerpt: 'Simple yet effective ways to improve your health and well-being through daily habits.',
      image: 'photo-1506744038136-46273834b3fb',
      category: 'health',
      author: 'Sarah Johnson',
      authorId: '2',
      date: '2024-01-14'
    },
    {
      id: '3',
      title: 'Top Entertainment Trends This Season',
      excerpt: 'Discover the latest movies, shows, and entertainment content that everyone is talking about.',
      image: 'photo-1649972904349-6e44c42644a7',
      category: 'entertainment',
      author: 'Mike Wilson',
      authorId: '3',
      date: '2024-01-13'
    },
    {
      id: '4',
      title: 'Business Strategies for Digital Growth',
      excerpt: 'Learn how successful companies are leveraging digital transformation for business growth.',
      image: 'photo-1461749280684-dccba630e2f6',
      category: 'business',
      author: 'Emily Chen',
      authorId: '4',
      date: '2024-01-12'
    }
  ];

  const categoryBlogs = {
    entertainment: [
      { id: '5', title: 'Latest Movie Reviews and Ratings', image: 'photo-1649972904349-6e44c42644a7', author: 'Mike Wilson', authorId: '3', date: '2024-01-11' },
      { id: '6', title: 'Music Industry Trends 2024', image: 'photo-1488590528505-98d2b5aba04b', author: 'Lisa Brown', authorId: '5', date: '2024-01-10' },
      { id: '7', title: 'Celebrity News and Updates', image: 'photo-1526374965328-7f61d4dc18c5', author: 'Tom Davis', authorId: '6', date: '2024-01-09' },
      { id: '8', title: 'Gaming Reviews and Tips', image: 'photo-1487058792275-0ad4aaf24ca7', author: 'Alex Rivera', authorId: '7', date: '2024-01-08' }
    ],
    health: [
      { id: '9', title: 'Mental Health Awareness', image: 'photo-1506744038136-46273834b3fb', author: 'Dr. Amanda White', authorId: '8', date: '2024-01-11' },
      { id: '10', title: 'Nutrition Facts and Myths', image: 'photo-1501854140801-50d01698950b', author: 'nutritionist Emma', authorId: '9', date: '2024-01-10' },
      { id: '11', title: 'Exercise Routines for Beginners', image: 'photo-1581091226825-a6a2a5aee158', author: 'Fitness Coach Mark', authorId: '10', date: '2024-01-09' }
    ]
  };

  const scrollContainer = (direction: 'left' | 'right', containerId: string) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const CategorySection = ({ category, blogs }: { category: string, blogs: any[] }) => (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">{t(category)}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scrollContainer('left', `${category}-scroll`)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scrollContainer('right', `${category}-scroll`)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div 
        id={`${category}-scroll`}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            excerpt={`Latest update in ${category} category. Stay tuned for more insights and updates.`}
            image={blog.image}
            category={category}
            author={blog.author}
            authorId={blog.authorId}
            date={blog.date}
            size="small"
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - 80% */}
          <div className="lg:w-4/5">
            {/* Latest Blogs Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('latestBlogs')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {latestBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    image={blog.image}
                    category={blog.category}
                    author={blog.author}
                    authorId={blog.authorId}
                    date={blog.date}
                    size="large"
                  />
                ))}
              </div>
            </section>

            {/* Entertainment Section */}
            <CategorySection category="entertainment" blogs={categoryBlogs.entertainment} />
            
            {/* Health Section */}
            <CategorySection category="health" blogs={categoryBlogs.health} />

            {/* Contact Form */}
            <ContactForm />
          </div>

          {/* Sidebar - 20% */}
          <div className="lg:w-1/5">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
