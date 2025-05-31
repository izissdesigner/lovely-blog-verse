
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, User, Mail, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import BlogCard from '@/components/BlogCard';
import { supabase } from '@/integrations/supabase/client';

interface AuthorProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  mobile?: string;
  created_at: string;
}

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  author_id: string;
  created_at: string;
  published: boolean;
}

const AuthorProfile = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState<AuthorProfile | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  const fetchAuthorData = async () => {
    try {
      // Fetch author profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authorId)
        .single();

      if (profileError) {
        console.error('Error fetching author profile:', profileError);
        return;
      }

      setAuthor(profileData);

      // Fetch author's published blogs
      const { data: blogsData, error: blogsError } = await supabase
        .from('blog')
        .select('*')
        .eq('author_id', authorId)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (blogsError) {
        console.error('Error fetching author blogs:', blogsError);
        return;
      }

      setBlogs(blogsData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Author not found</div>
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
            {/* Author Profile Header */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{author.name}</h1>
                  
                  {author.bio && (
                    <p className="text-gray-600 mb-4">{author.bio}</p>
                  )}
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{author.email}</span>
                    </div>
                    
                    {author.mobile && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{author.mobile}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {new Date(author.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Author's Blogs */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Articles by {author.name} ({blogs.length})
              </h2>
              
              {blogs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">This author hasn't published any articles yet.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              )}
            </div>
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

export default AuthorProfile;
