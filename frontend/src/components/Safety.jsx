import { Shield, Car, UserCheck, Phone, MapPin, Clock, Eye, AlertTriangle, CheckCircle, ArrowLeft, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
function Safety() {
  const safetyFeatures = [
    {
      title: "ID Verification",
      description: "All users must verify with government-issued ID before joining our platform.",
      icon: UserCheck
    },
    {
      title: "Real-time GPS Tracking",
      description: "Every ride is tracked with GPS for complete transparency and safety.",
      icon: MapPin
    },
    {
      title: "24/7 Safety Support",
      description: "Our dedicated safety team is available round the clock for any emergency.",
      icon: Phone
    },
    {
      title: "Background Checks",
      description: "We conduct thorough background verification for all drivers.",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar/>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            <span className="text-green-600">Safety First</span> at CarpoolConnect
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Multiple layers of safety verification, real-time tracking, and 24/7 support to ensure your journey is always secure.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our <span className="text-blue-600">Safety Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive safety measures to protect every journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Additional <span className="text-green-600">Safety Tips</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">For Passengers</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Always check driver's profile and ratings before booking</li>
                <li>• Share trip details with family or friends</li>
                <li>• Sit in the back seat when traveling alone</li>
                <li>• Keep your phone charged and accessible</li>
                <li>• Trust your instincts - if something feels wrong, speak up</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-green-800 mb-3">For Drivers</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Verify passenger details before confirming ride</li>
                <li>• Keep your vehicle well-maintained and clean</li>
                <li>• Follow traffic rules and drive safely</li>
                <li>• Be respectful and professional with passengers</li>
                <li>• Report any suspicious behavior immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Safety;
