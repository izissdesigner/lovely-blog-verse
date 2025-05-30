
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import BlogCard from '@/components/BlogCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Star, Hash } from 'lucide-react';
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

const CategoryPage = () => {
  const { category } = useParams();
  const { t } = useLanguage();
  const [categoryBlogs, setCategoryBlogs] = useState<Blog[]>([]);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetchCategoryBlogs();
      fetchRelatedBlogs();
      fetchPopularBlogs();
    }
  }, [category]);

  const fetchCategoryBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setCategoryBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching category blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(6, 8);

      if (!error && data) {
        setRelatedBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select(`
          *,
          blog_views(count)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setPopularBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching popular blogs:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
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
            {categoryBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {categoryBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id.toString()}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    image={blog.image_url || 'photo-1518770660439-4636190af475'}
                    category={category || ''}
                    author="Author"
                    authorId={blog.author_id}
                    date={new Date(blog.created_at).toLocaleDateString()}
                    size="large"
                    showCategoryTag={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500">There are no published articles in this category yet.</p>
              </div>
            )}

            {/* Related Blogs Section */}
            {relatedBlogs.length > 0 && (
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
                      id={blog.id.toString()}
                      title={blog.title}
                      excerpt={blog.excerpt}
                      image={blog.image_url || 'photo-1518770660439-4636190af475'}
                      category={category || ''}
                      author="Author"
                      authorId={blog.author_id}
                      date={new Date(blog.created_at).toLocaleDateString()}
                      size="small"
                      showCategoryTag={false}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Popular Blogs Section */}
            {popularBlogs.length > 0 && (
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
                      id={blog.id.toString()}
                      title={blog.title}
                      excerpt={blog.excerpt}
                      image={blog.image_url || 'photo-1518770660439-4636190af475'}
                      category={category || ''}
                      author="Author"
                      authorId={blog.author_id}
                      date={new Date(blog.created_at).toLocaleDateString()}
                      size="small"
                      showCategoryTag={false}
                    />
                  ))}
                </div>
              </section>
            )}
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

export default CategoryPage;
