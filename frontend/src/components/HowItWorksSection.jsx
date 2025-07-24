import { UserCheck, Search, Car, Shield, CheckCircle } from 'lucide-react';

function StepCard({ step, title, description, icon: Icon }) {
  return (
    <div className="text-center relative group hover:-translate-y-2 transition-all duration-300 cursor-pointer">
      <div className="relative z-10">
        {/* Step Icon Circle */}
        <div className="relative mx-auto mb-6">
          <div className="w-24 h-24 bg-blue-700 text-white rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:bg-blue-800 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
            <Icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:bg-green-700 group-hover:scale-110 transition-all duration-300">
            {step}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto group-hover:text-gray-700 transition-colors duration-300">{description}</p>
        
        {/* Completion Indicator */}
        <div className="mt-6 flex justify-center">
          <div className="bg-green-100 rounded-full p-2 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
            <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Sign Up & Verify",
      description: "Create your profile with government ID verification, phone number confirmation, and safety training completion for a secure community experience.",
      icon: UserCheck
    },
    {
      step: 2,
      title: "Find Perfect Matches",
      description: "Use our smart algorithm to find rides or passengers based on your route, schedule, preferences, and safety ratings for optimal compatibility.",
      icon: Search
    },
    {
      step: 3,
      title: "Travel Safely",
      description: "Enjoy GPS-tracked journeys with real-time location sharing, emergency contacts notification, and 24/7 support for complete peace of mind.",
      icon: Car
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200">
            <Shield className="w-4 h-4 mr-2" />
            Simple, Safe & Secure Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-blue-700">CarpoolConnect</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is simple and takes just minutes. Our three-step process ensures 
            safety, convenience, and peace of mind for every journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((stepItem, index) => (
            <StepCard
              key={index}
              step={stepItem.step}
              title={stepItem.title}
              description={stepItem.description}
              icon={stepItem.icon}
            />
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
            <div className="text-2xl font-bold text-blue-700 mb-1 group-hover:scale-110 transition-transform">2 mins</div>
            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Signup Time</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
            <div className="text-2xl font-bold text-green-600 mb-1 group-hover:scale-110 transition-transform">100%</div>
            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">ID Verified</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
            <div className="text-2xl font-bold text-gray-700 mb-1 group-hover:scale-110 transition-transform">24/7</div>
            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Support</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
            <div className="text-2xl font-bold text-blue-700 mb-1 group-hover:scale-110 transition-transform">Live</div>
            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">GPS Tracking</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
