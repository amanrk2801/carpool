import { IndianRupee, Leaf, Shield } from 'lucide-react';

function FeatureCard({ icon: IconComponent, title, description, bgColor, iconColor }) {
  return (
    <div className="text-center p-4 sm:p-6 rounded-lg border bg-white shadow-sm">
      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
        <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor}`} />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: IndianRupee,
      title: "Save Money",
      description: "Split fuel costs with fellow commuters and save up to 70% on travel expenses.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce carbon footprint by sharing rides and help create a greener planet.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified profiles and real-time GPS tracking ensure safe travel.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            Why Choose <span className="text-blue-600">CarpoolConnect?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Experience safe, affordable, and eco-friendly commuting with verified members.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
