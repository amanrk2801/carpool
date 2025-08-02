import { Shield, Car, UserCheck, Search, CreditCard, MapPin, Clock, Phone, ArrowLeft, Users, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function HowItWorks() {
  const riderSteps = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Sign In with verified ID and phone number. Add your photo and basic details for a complete profile.",
      icon: UserCheck
    },
    {
      step: 2,
      title: "Search for Rides",
      description: "Enter your route and travel date to find available rides with verified drivers.",
      icon: Search
    },
    {
      step: 3,
      title: "Book & Pay",
      description: "Secure your seat with instant booking and safe payment options.",
      icon: CreditCard
    },
    {
      step: 4,
      title: "Travel Safe",
      description: "Enjoy GPS-tracked journeys with real-time location sharing and 24/7 support.",
      icon: Shield
    }
  ];

  const driverSteps = [
    {
      step: 1,
      title: "Vehicle Verification",
      description: "Register your vehicle with valid documents and get verified.",
      icon: Car
    },
    {
      step: 2,
      title: "Create Trip",
      description: "Post your route, time, and available seats for passengers to find.",
      icon: MapPin
    },
    {
      step: 3,
      title: "Accept Passengers",
      description: "Review passenger requests and confirm bookings.",
      icon: Users
    },
    {
      step: 4,
      title: "Complete Trip",
      description: "Complete the journey safely and earn money.",
      icon: Star
    }
  ];

  const faqs = [
    {
      question: "Is CarpoolConnect safe?",
      answer: "Yes! We verify all users with government ID, track all rides with GPS, provide 24/7 support, and have emergency contact features."
    },
    {
      question: "How much does it cost?",
      answer: "Joining is absolutely free! Ride costs are shared among passengers, typically 50-70% cheaper than individual cab rides."
    },
    {
      question: "What if my ride gets cancelled?",
      answer: "We'll help you find alternative rides immediately. If no alternative is available, you get a full refund within 24 hours."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel up to 2 hours before the trip. Cancellation fees may apply based on timing."
    },
    {
      question: "How do I contact my co-passengers?",
      answer: "After booking confirmation, you can contact your driver and co-passengers through our secure in-app messaging system."
    },
    {
      question: "What if I face any issues during the trip?",
      answer: "Use our SOS feature for immediate help. Our 24/7 safety team will assist you and can contact emergency services if needed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar/>

      <section className="pt-20 pb-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How <span className="text-blue-600">CarpoolConnect</span> Works
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 1 lakh+ Indians in safe, affordable carpooling. Simple steps to start your journey today!
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              For <span className="text-blue-600">Passengers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find safe, affordable rides with verified drivers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {riderSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              For <span className="text-green-600">Drivers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your ride, earn money, and help reduce traffic pollution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {driverSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Get answers to common questions about CarpoolConnect
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Indians who travel safely and affordably with CarpoolConnect
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/find-ride"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Search className="w-5 h-5" />
              Find a Ride
            </Link>
            <Link 
              to="/offer-ride"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-colors border-2 border-green-600"
            >
              <Car className="w-5 h-5" />
              Offer a Ride
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default HowItWorks;
