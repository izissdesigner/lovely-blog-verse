
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { User, Calendar, Edit } from 'lucide-react';

const AuthorProfile = () => {
  const { authorId } = useParams();

  // Mock author data - in real app, this would be fetched from Supabase
  const author = {
    id: authorId,
    name: 'John Smith',
    bio: 'Technology enthusiast and software developer with over 10 years of experience in the industry. Passionate about AI, machine learning, and emerging technologies.',
    avatar: 'photo-1649972904349-6e44c42644a7',
    joinDate: '2023-06-15',
    totalBlogs: 24
  };

  const authorBlogs = [
    {
      id: '1',
      title: 'The Future of Artificial Intelligence in 2024',
      excerpt: 'Exploring the latest developments in AI technology and its impact on various industries.',
      image: 'photo-1518770660439-4636190af475',
      category: 'technology',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Machine Learning Best Practices',
      excerpt: 'Essential guidelines for implementing successful machine learning projects.',
      image: 'photo-1461749280684-dccba630e2f6',
      category: 'technology',
      date: '2024-01-10'
    },
    {
      id: '3',
      title: 'Cloud Computing Trends',
      excerpt: 'How cloud technology is evolving and what it means for businesses.',
      image: 'photo-1488590528505-98d2b5aba04b',
      category: 'technology',
      date: '2024-01-05'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Author Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={`https://images.unsplash.com/${author.avatar}?auto=format&fit=crop&w=300&q=80`}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{author.name}</h1>
              <p className="text-gray-600 mb-4 leading-relaxed">{author.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {author.joinDate}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span>{author.totalBlogs} articles published</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Blogs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles by {author.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                image={blog.image}
                category={blog.category}
                author={author.name}
                authorId={author.id || ''}
                date={blog.date}
                size="large"
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorProfile;
