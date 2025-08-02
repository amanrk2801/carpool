import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
function CTASection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your <span className="text-green-300">Safe Journey?</span>
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of verified commuters across India saving money and traveling safely every day.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">1 Lakh+</div>
            <div className="text-blue-100 text-sm">Members</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">4.8/5</div>
            <div className="text-blue-100 text-sm">Safety Rating</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">100%</div>
            <div className="text-blue-100 text-sm">Verified</div>
          </div>
        </div>
        
        <Link 
          to="/join"
          className="inline-block bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-bold shadow-lg transition-colors"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
