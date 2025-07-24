import { IndianRupee, Leaf, Shield, Star } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description, bgColor, iconColor }) {
  return (
    <div className="text-center p-8 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 bg-white group cursor-pointer">
      <div className={`w-20 h-20 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
        <Icon className={`w-10 h-10 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: IndianRupee,
      title: "Save Money",
      description: "Split fuel and parking costs with fellow commuters. Save up to 70% on your daily travel expenses with our smart cost-sharing system.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-700"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint by sharing rides. Help create a cleaner, greener planet while enjoying a social commute experience.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified profiles, ratings, reviews, and real-time GPS tracking ensure you travel with trusted community members safely.",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-700"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-200 hover:bg-green-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <Star className="w-4 h-4 mr-2 hover:rotate-12 transition-transform" />
            Trusted by Thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-blue-700 hover:text-blue-800 transition-colors cursor-pointer">CarpoolConnect?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-700 transition-colors">
            Experience the future of commuting with our comprehensive safety features, 
            cost-effective solutions, and environmental benefits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
