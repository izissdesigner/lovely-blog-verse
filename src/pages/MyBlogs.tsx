
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  published: boolean;
}

const MyBlogs = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyBlogs();
    }
  }, [user]);

  const fetchMyBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('author_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        return;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId: number) => {
    try {
      const { error } = await supabase
        .from('blog')
        .delete()
        .eq('id', blogId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete blog. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog deleted successfully.",
      });

      fetchMyBlogs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog. Please try again.",
        variant: "destructive",
      });
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Blogs</h1>
              <p className="text-gray-600">Manage your published and draft articles</p>
            </div>

            {blogs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-4">No Blogs Yet</h3>
                <p className="text-gray-500 mb-6">You haven't created any blogs yet. Start writing your first article!</p>
                <Button asChild>
                  <Link to="/create-blog">Create Your First Blog</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img 
                          src={blog.image_url || `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80`}
                          alt={blog.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              blog.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                              {t(blog.category)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/create-blog?edit=${blog.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteBlog(blog.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <Link to={`/blog/${blog.id}`}>
                          <h3 className="font-bold text-xl text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

export default MyBlogs;
