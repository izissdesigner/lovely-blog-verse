
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  author_id: string;
  created_at: string;
}

const Index = () => {
  const { t } = useLanguage();
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [categoryBlogs, setCategoryBlogs] = useState<{[key: string]: Blog[]}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // Fetch latest blogs
      const { data: latest, error: latestError } = await supabase
        .from('blog')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (!latestError && latest) {
        setLatestBlogs(latest);
      }

      // Fetch entertainment blogs
      const { data: entertainment, error: entError } = await supabase
        .from('blog')
        .select('*')
        .eq('category', 'entertainment')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);

      // Fetch health blogs
      const { data: health, error: healthError } = await supabase
        .from('blog')
        .select('*')
        .eq('category', 'health')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);

      setCategoryBlogs({
        entertainment: entertainment || [],
        health: health || []
      });

    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
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

  const CategorySection = ({ category, blogs }: { category: string, blogs: Blog[] }) => (
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
          <div key={blog.id} className="flex-shrink-0 w-80">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </section>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

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
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </section>

            {/* Entertainment Section */}
            <CategorySection category="entertainment" blogs={categoryBlogs.entertainment || []} />
            
            {/* Health Section */}
            <CategorySection category="health" blogs={categoryBlogs.health || []} />

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
