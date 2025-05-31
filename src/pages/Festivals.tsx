
import { useState, useEffect } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Festival {
  id: string;
  name: string;
  date: string;
  description: string;
  location?: string;
}

const Festivals = () => {
  const { t } = useLanguage();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock festival data - in real app this would come from API
    const mockFestivals: Festival[] = [
      {
        id: '1',
        name: 'Diwali',
        date: '2024-11-12',
        description: 'Festival of lights celebrating the victory of light over darkness',
        location: 'Pan-India'
      },
      {
        id: '2',
        name: 'Holi',
        date: '2024-03-25',
        description: 'Festival of colors celebrating spring and love',
        location: 'Pan-India'
      },
      {
        id: '3',
        name: 'Navaratri',
        date: '2024-10-03',
        description: 'Nine nights dedicated to Goddess Durga',
        location: 'Pan-India'
      },
      {
        id: '4',
        name: 'Karva Chauth',
        date: '2024-10-20',
        description: 'Fasting festival for married women',
        location: 'North India'
      },
      {
        id: '5',
        name: 'Ganesh Chaturthi',
        date: '2024-09-07',
        description: 'Birthday of Lord Ganesha',
        location: 'Maharashtra'
      },
      {
        id: '6',
        name: 'Durga Puja',
        date: '2024-10-09',
        description: 'Worship of Goddess Durga',
        location: 'West Bengal'
      }
    ];
    
    setFestivals(mockFestivals);
    setLoading(false);
  }, []);

  const filteredFestivals = festivals.filter(festival =>
    festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    festival.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading festivals...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Hindu Festivals</h1>
            <p className="text-gray-600 mb-6">
              Discover upcoming Hindu festivals and their significance
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search festivals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredFestivals.map((festival) => (
              <div key={festival.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{festival.name}</h3>
                    <p className="text-gray-600 mb-3">{festival.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(festival.date).toLocaleDateString()}</span>
                      </div>
                      {festival.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{festival.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFestivals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No festivals found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Festivals;
