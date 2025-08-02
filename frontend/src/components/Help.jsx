import { Shield, Car, Phone, Mail, MessageCircle, HelpCircle, Search, Book, Users, ArrowLeft, CheckCircle, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

function Help() {
  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      const containers = document.querySelectorAll('div, main, section');
      containers.forEach(container => {
        if (container.scrollTop > 0) {
          container.scrollTop = 0;
        }
      });
    };

    forceScrollToTop();
    
    setTimeout(forceScrollToTop, 0);
    setTimeout(forceScrollToTop, 10);
  }, []);

  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    { id: 'general', label: 'General', icon: HelpCircle },
    { id: 'booking', label: 'Booking', icon: Car },
    { id: 'payment', label: 'Payment', icon: Star },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'account', label: 'Account', icon: Users }
  ];

  const faqs = {
    general: [
      {
        question: "What is CarpoolConnect?",
        answer: "CarpoolConnect is India's safest carpooling platform that connects verified drivers and passengers for shared rides across the country. We help you save money, reduce pollution, and travel safely."
      },
      {
        question: "How do I get started?",
        answer: "Simply Sign In with your phone number, verify your identity with a government ID, add your profile photo, and you're ready to find rides or offer rides to others."
      },
      {
        question: "Is CarpoolConnect available in my city?",
        answer: "We operate in 50+ major cities across India including Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Pune, and many more. Check our app to see if we're available in your area."
      },
      {
        question: "What are the benefits of carpooling?",
        answer: "Carpooling helps you save 50-70% on travel costs, reduces traffic pollution, meets new people, and provides a safer alternative to traveling alone."
      }
    ],
    booking: [
      {
        question: "How do I book a ride?",
        answer: "Enter your pickup and drop locations, select your travel date and time, browse available rides, check driver profiles, and confirm your booking with instant payment."
      },
      {
        question: "Can I cancel my booking?",
        answer: "Yes, you can cancel up to 2 hours before the trip. Cancellation fees may apply: Free cancellation up to 24 hours, ₹50 fee for 2-24 hours, and ₹100 fee for last-minute cancellations."
      },
      {
        question: "What if the driver cancels the ride?",
        answer: "If a driver cancels, we'll immediately help you find alternative rides. If no alternatives are available, you'll receive a full refund within 24 hours."
      },
      {
        question: "How do I contact my driver or co-passengers?",
        answer: "After booking confirmation, you can use our secure in-app messaging system to contact your driver and co-passengers. Phone numbers are shared 2 hours before the trip."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept UPI, credit/debit cards, net banking, and digital wallets like Paytm, PhonePe, and Google Pay. All payments are secured with 256-bit encryption."
      },
      {
        question: "When do I pay for my ride?",
        answer: "Payment is made instantly when you confirm your booking. For drivers, earnings are transferred to your account within 24 hours of trip completion."
      },
      {
        question: "How is the ride fare calculated?",
        answer: "Fares are calculated based on distance, fuel costs, tolls, and platform fee. The total cost is divided among all passengers, making it much cheaper than individual travel."
      },
      {
        question: "What if I face payment issues?",
        answer: "Contact our support team immediately. We'll resolve payment issues within 24 hours and ensure you're not charged incorrectly."
      }
    ],
    safety: [
      {
        question: "How do you ensure safety?",
        answer: "We verify all users with government ID, conduct background checks for drivers, provide GPS tracking, offer SOS features, and have 24/7 safety support available."
      },
      {
        question: "What should I do in case of emergency?",
        answer: "Press the SOS button in the app to immediately alert our safety team and your emergency contacts. Call our 24/7 helpline at 1800-0000-1234 for immediate assistance."
      },
      {
        question: "Can I track my ride?",
        answer: "Yes, every ride is tracked with GPS. You can share your live location with family/friends, and our safety team monitors all active rides for unusual activity."
      },
      {
        question: "What if I feel unsafe during a ride?",
        answer: "Immediately use the SOS feature, contact our helpline, or ask the driver to stop at a safe public place. Your safety is our top priority."
      }
    ],
    account: [
      {
        question: "How do I verify my account?",
        answer: "Upload a government-issued ID (Aadhaar, PAN, or Driving License), verify your phone number with OTP, and add a clear profile photo. Verification usually takes 24-48 hours."
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click 'Forgot Password' on the sign-in page, enter your registered email or phone number, and follow the instructions to create a new password."
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to Profile > Edit Profile in the app. You can update your photo, contact details, and preferences. Some changes may require re-verification."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account anytime from Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone."
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar/>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Help & <span className="text-blue-600">Support Center</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant answers to your questions or contact our 24/7 support team for personalized assistance.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for help articles, FAQs, or topics..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about CarpoolConnect
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </button>
            ))}
          </div>
          
          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try searching with different keywords or check other categories.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Help;
