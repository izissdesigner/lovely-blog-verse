
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  authorId: string;
  date: string;
  size?: 'small' | 'medium' | 'large';
}

const BlogCard = ({ 
  id, 
  title, 
  excerpt, 
  image, 
  category, 
  author, 
  authorId, 
  date, 
  size = 'medium' 
}: BlogCardProps) => {
  const { t } = useLanguage();

  const sizeClasses = {
    small: 'w-72',
    medium: 'w-80',
    large: 'w-full'
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${sizeClasses[size]} flex-shrink-0`}>
      <Link to={`/blog/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80`}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Link 
              to={`/category/${category}`}
              className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              {t(category)}
            </Link>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/blog/${id}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{excerpt}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <Link 
            to={`/author/${authorId}`}
            className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
          >
            <User className="h-3 w-3" />
            <span>{t('by')} {author}</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
