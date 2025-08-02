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

  const safetyProtocols = [
    {
      title: "Pre-Trip Safety",
      items: [
        "Verify driver and vehicle details",
        "Share trip details with family/friends",
        "Check driver's rating and reviews",
        "Confirm pickup location and time"
      ]
    },
    {
      title: "During the Trip",
      items: [
        "Use GPS tracking feature",
        "Keep emergency contacts handy",
        "Stay alert and aware",
        "Use in-app messaging only"
      ]
    },
    {
      title: "Emergency Procedures",
      items: [
        "Press SOS button for immediate help",
        "Call our 24/7 helpline: 1800-0000-1234",
        "Share live location with trusted contacts",
        "Contact local authorities if needed"
      ]
    }
  ];

  const emergencySteps = [
    {
      step: 1,
      title: "Press SOS Button",
      description: "Instantly alert our safety team and emergency contacts",
      icon: AlertTriangle
    },
    {
      step: 2,
      title: "Automatic Location Sharing",
      description: "Your live location is shared with safety team and emergency contacts",
      icon: MapPin
    },
    {
      step: 3,
      title: "Immediate Response",
      description: "Our team contacts you within 30 seconds and coordinates help",
      icon: Phone
    },
    {
      step: 4,
      title: "Continuous Monitoring",
      description: "We stay with you until you're safe and the situation is resolved",
      icon: Eye
    }
  ];

  const trustIndicators = [
    { label: "Users Verified", value: "1,00,000+" },
    { label: "Background Checks", value: "100%" },
    { label: "Safety Response Time", value: "< 30 sec" },
    { label: "Incident Resolution", value: "99.9%" }
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

      {/* Safety Features Section */}
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

      {/* Emergency Response Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-red-600">Emergency Response</span> System
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our rapid response system ensures help reaches you within seconds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencySteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-red-600 text-white px-8 py-4 rounded-lg inline-block shadow-md">
              <h3 className="text-xl font-bold mb-2">Emergency Helpline</h3>
              <p className="text-2xl font-bold">1800-0000-1234</p>
              <p className="text-sm text-red-100">Available 24/7 across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
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
