
import { useParams } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  // Mock blog data - in real app, this would be fetched from Supabase
  const blog = {
    id: id,
    title: 'The Future of Artificial Intelligence in 2024',
    content: `
      <p>Artificial Intelligence continues to evolve at an unprecedented pace, reshaping industries and transforming the way we live and work. As we progress through 2024, several key trends are emerging that will define the future of AI technology.</p>
      
      <h2>Machine Learning Breakthroughs</h2>
      <p>Recent advancements in machine learning algorithms have led to more efficient and accurate models. These improvements are particularly notable in natural language processing and computer vision applications.</p>
      
      <h2>Ethical AI Development</h2>
      <p>The focus on responsible AI development has intensified, with organizations implementing stronger ethical guidelines and transparency measures. This shift ensures that AI technology benefits society while minimizing potential risks.</p>
      
      <h2>Industry Applications</h2>
      <p>From healthcare diagnostics to autonomous vehicles, AI is being integrated into critical systems that impact our daily lives. The technology's ability to process vast amounts of data and make intelligent decisions continues to open new possibilities.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we look to the future, AI will likely become even more integrated into our personal and professional lives. The key will be ensuring that this integration happens in a way that enhances human capabilities rather than replacing them.</p>
    `,
    image: 'photo-1518770660439-4636190af475',
    category: 'technology',
    author: 'John Smith',
    authorId: '1',
    date: '2024-01-15'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="h-96 overflow-hidden">
            <img 
              src={`https://images.unsplash.com/${blog.image}?auto=format&fit=crop&w=1200&q=80`}
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
                <span>{t('by')} {blog.author}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{blog.date}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
