import { ArrowRight, Shield, Users, Star } from 'lucide-react';

function CTASection() {
  return (
    <section className="py-20 bg-blue-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-400 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/30">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by 50,000+ Happy Commuters
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <span className="block text-green-300">Your Commute?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with like-minded commuters in your area. Save money, protect the environment, 
            and travel with complete confidence every single day.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">50,000+</div>
              <div className="text-blue-100">Verified Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Star className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">4.8/5</div>
              <div className="text-blue-100">Safety Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">ID Verified</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mb-12">
            <button className="group bg-white hover:bg-gray-50 text-blue-700 px-12 py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 hover:scale-105 mx-auto">
              Begin Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Safety Promise */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <div className="flex items-start justify-center text-left">
              <Shield className="w-8 h-8 text-green-300 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Our Safety Promise</h3>
                <p className="text-blue-100 leading-relaxed">
                  Every ride is GPS tracked with real-time location sharing. Emergency contacts 
                  are automatically notified, and our 24/7 support team is always ready to help. 
                  Your safety and peace of mind are our top priorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
