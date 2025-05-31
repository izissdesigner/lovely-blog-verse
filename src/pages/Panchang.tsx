
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sunrise, Sunset, Moon, Star, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface PanchangData {
  id: string;
  date: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  festivals: string[];
}

const Panchang = () => {
  const { t } = useLanguage();
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchPanchangData();
  }, []);

  const fetchPanchangData = async () => {
    try {
      // Try to fetch today's panchang data from database
      const { data, error } = await supabase
        .from('panchang')
        .select('*')
        .eq('date', today)
        .single();

      if (error || !data) {
        // If no data found, create mock data for today
        const mockData: PanchangData = {
          id: '1',
          date: today,
          tithi: 'Chaturthi',
          nakshatra: 'Rohini',
          yoga: 'Shukla',
          karana: 'Bava',
          sunrise: '06:30',
          sunset: '18:45',
          moonrise: '08:15',
          moonset: '20:30',
          festivals: ['Karva Chauth', 'Diwali Preparation']
        };
        setPanchangData(mockData);
      } else {
        setPanchangData(data);
      }
    } catch (error) {
      console.error('Error fetching panchang data:', error);
      // Fallback to mock data
      const mockData: PanchangData = {
        id: '1',
        date: today,
        tithi: 'Chaturthi',
        nakshatra: 'Rohini',
        yoga: 'Shukla',
        karana: 'Bava',
        sunrise: '06:30',
        sunset: '18:45',
        moonrise: '08:15',
        moonset: '20:30',
        festivals: ['Karva Chauth', 'Diwali Preparation']
      };
      setPanchangData(mockData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading Panchang...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!panchangData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Panchang data not available</div>
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
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg p-8 text-white mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-8 w-8" />
                <h1 className="text-3xl font-bold">Today's Panchang</h1>
              </div>
              <p className="text-orange-100 text-lg">
                {new Date(panchangData.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Main Panchang Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Hindu Calendar Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-purple-600" />
                  Hindu Calendar Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Tithi:</span>
                    <span className="text-gray-800">{panchangData.tithi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Nakshatra:</span>
                    <span className="text-gray-800">{panchangData.nakshatra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Yoga:</span>
                    <span className="text-gray-800">{panchangData.yoga}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Karana:</span>
                    <span className="text-gray-800">{panchangData.karana}</span>
                  </div>
                </div>
              </div>

              {/* Sun & Moon Timings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Sunrise className="h-5 w-5 mr-2 text-yellow-600" />
                  Sun & Moon Timings
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Sunrise className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-gray-600">Sunrise:</span>
                    </div>
                    <span className="text-gray-800">{panchangData.sunrise}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Sunset className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-gray-600">Sunset:</span>
                    </div>
                    <span className="text-gray-800">{panchangData.sunset}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-gray-600">Moonrise:</span>
                    </div>
                    <span className="text-gray-800">{panchangData.moonrise}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4 text-blue-700" />
                      <span className="font-medium text-gray-600">Moonset:</span>
                    </div>
                    <span className="text-gray-800">{panchangData.moonset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Festivals */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Upcoming Festivals
                </h2>
                <Button asChild variant="outline" size="sm">
                  <Link to="/festivals" className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>View All</span>
                  </Link>
                </Button>
              </div>
              
              {panchangData.festivals && panchangData.festivals.length > 0 ? (
                <div className="space-y-3">
                  {panchangData.festivals.slice(0, 3).map((festival, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-800 font-medium">{festival}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No festivals today</p>
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

export default Panchang;
