
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Sidebar = () => {
  const { t } = useLanguage();

  const categories = [
    'entertainment',
    'health',
    'sport', 
    'lifestyle',
    'food',
    'technology',
    'business'
  ];

  const popularBlogs = [
    { id: '1', title: 'How to Build Better Habits for Success' },
    { id: '2', title: 'The Future of Artificial Intelligence' },
    { id: '3', title: 'Healthy Recipes for Busy Professionals' },
    { id: '4', title: 'Latest Technology Trends in 2024' },
    { id: '5', title: 'Business Growth Strategies' }
  ];

  return (
    <aside className="w-full space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">{t('categories')}</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${category}`}
                className="text-gray-600 hover:text-blue-600 transition-colors capitalize block py-1"
              >
                {t(category)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Advertisement */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">{t('advertisement')}</h3>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
          <h4 className="font-bold mb-2">Advertise Here</h4>
          <p className="text-sm opacity-90">Contact us for advertising opportunities</p>
        </div>
      </div>

      {/* Popular Blogs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">{t('popularBlogs')}</h3>
        <ul className="space-y-3">
          {popularBlogs.map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/blog/${blog.id}`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors block leading-relaxed"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
