
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Download, Calendar, Clock, MapPin, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Kundli = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Generate AI-powered Kundli data (mock for now)
      const generatedKundli = {
        name: formData.name,
        birthDetails: {
          date: formData.dateOfBirth,
          time: formData.timeOfBirth,
          place: formData.placeOfBirth
        },
        planetaryPositions: {
          sun: "Aries 15°30'",
          moon: "Cancer 22°45'",
          mars: "Leo 8°20'",
          mercury: "Gemini 28°15'",
          jupiter: "Sagittarius 12°50'",
          venus: "Taurus 5°35'",
          saturn: "Capricorn 18°40'",
          rahu: "Gemini 14°25'",
          ketu: "Sagittarius 14°25'"
        },
        houses: {
          firstHouse: "Leadership and personality",
          secondHouse: "Wealth and family",
          thirdHouse: "Communication and siblings",
          fourthHouse: "Home and mother",
          fifthHouse: "Education and children",
          sixthHouse: "Health and service",
          seventhHouse: "Marriage and partnerships",
          eighthHouse: "Transformation and longevity",
          ninthHouse: "Fortune and spirituality",
          tenthHouse: "Career and reputation",
          eleventhHouse: "Gains and friendships",
          twelfthHouse: "Liberation and expenses"
        },
        predictions: [
          "You have strong leadership qualities and natural charisma.",
          "Your career will see significant growth in the coming years.",
          "Family relationships will be harmonious and supportive.",
          "Health requires attention to diet and regular exercise.",
          "Financial stability will improve through wise investments."
        ]
      };

      setKundliData(generatedKundli);

      // Store in Supabase if user is logged in
      if (user) {
        const { error } = await supabase
          .from('kundli')
          .insert({
            user_id: user.id,
            name: formData.name,
            date_of_birth: formData.dateOfBirth,
            time_of_birth: formData.timeOfBirth,
            place_of_birth: formData.placeOfBirth,
            kundli_data: generatedKundli
          });

        if (error) {
          console.error('Error saving kundli:', error);
        }
      }

      toast({
        title: "Kundli Generated!",
        description: "Your personalized birth chart has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your Kundli. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const downloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "PDF generation feature will be implemented soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Free Kundli Generator</h1>
          <p className="text-gray-600 text-lg">Get your personalized birth chart and astrological insights</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!kundliData ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Your Birth Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="pl-10 h-12"
                    />
                  </div>
                  
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="time"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleChange}
                      required
                      placeholder="Place of Birth"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-lg font-semibold" 
                  disabled={loading}
                >
                  {loading ? 'Generating Kundli...' : 'Generate My Kundli'}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Kundli Header */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Kundli for {kundliData.name}</h2>
                    <p className="text-gray-600 mt-2">
                      Born on {kundliData.birthDetails.date} at {kundliData.birthDetails.time} in {kundliData.birthDetails.place}
                    </p>
                  </div>
                  <Button onClick={downloadPDF} className="bg-orange-600 hover:bg-orange-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {/* Planetary Positions */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Planetary Positions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(kundliData.planetaryPositions).map(([planet, position]) => (
                    <div key={planet} className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 capitalize">{planet}</h4>
                      <p className="text-orange-600 font-medium">{position}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Analysis */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">House Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(kundliData.houses).map(([house, description]) => (
                    <div key={house} className="border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 capitalize">{house.replace(/([A-Z])/g, ' $1')}</h4>
                      <p className="text-gray-600 text-sm mt-1">{description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predictions */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Astrological Predictions</h3>
                <div className="space-y-4">
                  {kundliData.predictions.map((prediction, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{prediction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Kundli;
