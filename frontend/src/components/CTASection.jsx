import { ArrowRight } from 'lucide-react';

function CTASection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Carpooling?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of commuters who are already saving money and reducing their environmental impact.
        </p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 mx-auto">
          Get Started Today
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export default CTASection;
