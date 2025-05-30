
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Calendar, Sun, Moon, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PanchangData {
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [panchangData, setPanchangData] = useState<PanchangData>({
    date: new Date().toISOString().split('T')[0],
    tithi: 'Chaturdashi',
    nakshatra: 'Rohini',
    yoga: 'Siddhi',
    karana: 'Bava',
    sunrise: '06:30',
    sunset: '18:45',
    moonrise: '20:15',
    moonset: '08:30',
    festivals: ['Karva Chauth', 'Diwali Preparation']
  });

  const [upcomingFestivals, setUpcomingFestivals] = useState([
    { name: 'Diwali', date: '2024-11-01', description: 'Festival of Lights' },
    { name: 'Bhai Dooj', date: '2024-11-03', description: 'Brother-Sister Bond' },
    { name: 'Chhath Puja', date: '2024-11-07', description: 'Sun Worship Festival' },
    { name: 'Guru Nanak Jayanti', date: '2024-11-15', description: 'Guru Nanak Birthday' },
    { name: 'Kartik Purnima', date: '2024-11-15', description: 'Full Moon in Kartik' }
  ]);

  useEffect(() => {
    fetchPanchangData();
  }, [currentDate]);

  const fetchPanchangData = async () => {
    try {
      const dateString = currentDate.toISOString().split('T')[0];
      
      // Try to get data from Supabase first
      const { data, error } = await supabase
        .from('panchang')
        .select('*')
        .eq('date', dateString)
        .single();

      if (data && !error) {
        setPanchangData({
          date: data.date,
          tithi: data.tithi || 'Chaturdashi',
          nakshatra: data.nakshatra || 'Rohini',
          yoga: data.yoga || 'Siddhi',
          karana: data.karana || 'Bava',
          sunrise: data.sunrise || '06:30',
          sunset: data.sunset || '18:45',
          moonrise: data.moonrise || '20:15',
          moonset: data.moonset || '08:30',
          festivals: data.festivals || []
        });
      } else {
        // Generate dynamic data based on date
        const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / 86400000);
        const tithis = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'];
        const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
        
        setPanchangData({
          date: dateString,
          tithi: tithis[dayOfYear % 15],
          nakshatra: nakshatras[dayOfYear % 27],
          yoga: 'Siddhi',
          karana: 'Bava',
          sunrise: '06:30',
          sunset: '18:45',
          moonrise: '20:15',
          moonset: '08:30',
          festivals: currentDate.getDay() === 0 ? ['Special Sunday'] : []
        });
      }
    } catch (error) {
      console.error('Error fetching panchang data:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Daily Panchang</h1>
              <p className="text-gray-600 text-lg">Hindu Calendar with Tithi, Nakshatra & Festival Information</p>
            </div>

            <div className="space-y-8">
              {/* Date Navigation */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateDate('prev')}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    ← Previous Day
                  </button>
                  
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{formatDate(currentDate)}</h2>
                    <p className="text-gray-600">Hindu Calendar Details</p>
                  </div>
                  
                  <button
                    onClick={() => navigateDate('next')}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    Next Day →
                  </button>
                </div>
              </div>

              {/* Main Panchang Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tithi & Nakshatra */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Star className="h-6 w-6 mr-2 text-purple-600" />
                    Astrological Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Tithi</h4>
                      <p className="text-purple-600 font-medium text-lg">{panchangData.tithi}</p>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Nakshatra</h4>
                      <p className="text-indigo-600 font-medium text-lg">{panchangData.nakshatra}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Yoga</h4>
                      <p className="text-blue-600 font-medium text-lg">{panchangData.yoga}</p>
                    </div>
                    
                    <div className="bg-cyan-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Karana</h4>
                      <p className="text-cyan-600 font-medium text-lg">{panchangData.karana}</p>
                    </div>
                  </div>
                </div>

                {/* Sun & Moon Timings */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Sun className="h-6 w-6 mr-2 text-yellow-600" />
                    Sun & Moon Timings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-semibold text-gray-800">Sunrise</span>
                      </div>
                      <span className="text-yellow-600 font-medium text-lg">{panchangData.sunrise}</span>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 text-orange-600 mr-2" />
                        <span className="font-semibold text-gray-800">Sunset</span>
                      </div>
                      <span className="text-orange-600 font-medium text-lg">{panchangData.sunset}</span>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <Moon className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="font-semibold text-gray-800">Moonrise</span>
                      </div>
                      <span className="text-gray-600 font-medium text-lg">{panchangData.moonrise}</span>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <Moon className="h-5 w-5 text-slate-600 mr-2" />
                        <span className="font-semibold text-gray-800">Moonset</span>
                      </div>
                      <span className="text-slate-600 font-medium text-lg">{panchangData.moonset}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Festivals */}
              {panchangData.festivals && panchangData.festivals.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Star className="h-6 w-6 mr-2 text-pink-600" />
                    Today's Festivals
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {panchangData.festivals.map((festival, index) => (
                      <div key={index} className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-gray-800 text-lg">{festival}</h4>
                        <p className="text-pink-600">Special observance today</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Festivals */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-green-600" />
                  Upcoming Festivals
                </h3>
                
                <div className="space-y-4">
                  {upcomingFestivals.map((festival, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <h4 className="font-semibold text-gray-800">{festival.name}</h4>
                        <p className="text-gray-600 text-sm">{festival.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{new Date(festival.date).toLocaleDateString('en-IN')}</p>
                        <p className="text-gray-500 text-sm">
                          {Math.ceil((new Date(festival.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
