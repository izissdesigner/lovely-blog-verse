
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Star, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PopularBlog {
  id: string;
  title: string;
  image_url?: string;
}

const Sidebar = () => {
  const { t } = useLanguage();
  const [popularBlogs, setPopularBlogs] = useState<PopularBlog[]>([]);

  const categories = [
    'entertainment',
    'health',
    'sport', 
    'lifestyle',
    'food',
    'technology',
    'business'
  ];

  useEffect(() => {
    fetchPopularBlogs();
  }, []);

  const fetchPopularBlogs = async () => {
    try {
      // Get most viewed blogs by counting blog_views
      const { data, error } = await supabase
        .from('blog')
        .select(`
          id,
          title,
          image_url,
          blog_views(count)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setPopularBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching popular blogs:', error);
      // Fallback to mock data if no real data available
      setPopularBlogs([
        { id: '1', title: 'How to Build Better Habits for Success', image_url: 'photo-1518770660439-4636190af475' },
        { id: '2', title: 'The Future of Artificial Intelligence', image_url: 'photo-1461749280684-dccba630e2f6' },
        { id: '3', title: 'Healthy Recipes for Busy Professionals', image_url: 'photo-1488590528505-98d2b5aba04b' },
        { id: '4', title: 'Latest Technology Trends in 2024', image_url: 'photo-1487058792275-0ad4aaf24ca7' },
        { id: '5', title: 'Business Growth Strategies', image_url: 'photo-1526374965328-7f61d4dc18c5' }
      ]);
    }
  };

  return (
    <aside className="w-full space-y-6">
      {/* Kundli Banner */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Star className="h-6 w-6" />
            <h3 className="font-bold text-lg">Free Kundli</h3>
          </div>
          <p className="text-orange-100 text-sm mb-4">
            Get your personalized birth chart and astrological insights
          </p>
          <Link
            to="/kundli"
            className="inline-block bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors"
          >
            Generate Now
          </Link>
        </div>
      </div>

      {/* Panchang Banner */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Calendar className="h-6 w-6" />
            <h3 className="font-bold text-lg">Daily Panchang</h3>
          </div>
          <p className="text-purple-100 text-sm mb-4">
            Today's Hindu calendar with Tithi, Nakshatra & festivals
          </p>
          <Link
            to="/panchang"
            className="inline-block bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-purple-50 transition-colors"
          >
            View Today
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            {t('categories')}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="group flex items-center justify-between p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 capitalize"
              >
                <span className="font-medium">{t(category)}</span>
                <div className="w-2 h-2 bg-blue-200 rounded-full group-hover:bg-blue-400 transition-colors"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Advertisement */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">{t('advertisement')}</h3>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
            <h4 className="font-bold mb-2 text-lg">Advertise Here</h4>
            <p className="text-sm opacity-90 mb-3">Contact us for advertising opportunities</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Popular Blogs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            {t('popularBlogs')}
          </h3>
          <div className="space-y-4">
            {popularBlogs.map((blog, index) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="group block"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={blog.image_url ? blog.image_url : `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=80&q=80`}
                      alt={blog.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-600 font-bold text-xs">{index + 1}</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors leading-relaxed line-clamp-2">
                      {blog.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
