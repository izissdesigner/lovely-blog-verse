
import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
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

interface Author {
  id: string;
  name: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { t } = useLanguage();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    fetchAuthor();
  }, [blog.author_id]);

  const fetchAuthor = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name')
        .eq('id', blog.author_id)
        .single();

      if (!error && data) {
        setAuthor(data);
      }
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const imageUrl = blog.image_url?.startsWith('http') 
    ? blog.image_url 
    : `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80`;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blog/${blog.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Tag className="h-4 w-4" />
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
              {t(blog.category)}
            </span>
          </div>
          
          {author && (
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <Link 
                to={`/author/${blog.author_id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {author.name}
              </Link>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <Link to={`/blog/${blog.id}`}>
          <h3 className="font-bold text-xl text-gray-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 line-clamp-3 mb-4">{blog.excerpt}</p>
        
        <Link 
          to={`/blog/${blog.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {t('readMore')} →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
