
import { useParams } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Blog {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  author_id: string;
  created_at: string;
  excerpt: string;
}

const BlogDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlog();
      trackBlogView();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching blog:', error);
        return;
      }

      setBlog(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackBlogView = async () => {
    try {
      // Track blog view for analytics
      await supabase
        .from('blog_views')
        .insert({
          blog_id: parseInt(id || '0'),
          ip_address: '0.0.0.0' // In real app, get actual IP
        });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

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

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Blog not found</div>
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
          <div className="lg:w-3/4">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Hero Image */}
              <div className="h-96 overflow-hidden">
                <img 
                  src={blog.image_url || `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {t(blog.category)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{t('by')} Author</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
                  {blog.title}
                </h1>

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none">
                  {blog.content ? (
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    <p>{blog.excerpt}</p>
                  )}
                </div>
              </div>
            </article>
          </div>

          <div className="lg:w-1/4">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
