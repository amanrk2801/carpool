import { IndianRupee , Leaf, Shield } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description, bgColor, iconColor }) {
  return (
    <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: IndianRupee,
      title: "Save Money",
      description: "Split fuel and parking costs with fellow commuters. Save up to 70% on your daily travel expenses.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint by sharing rides. Help create a cleaner, greener planet.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified profiles, ratings, and reviews ensure you travel with trusted community members.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CarpoolConnect?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of commuting with our feature-rich platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
