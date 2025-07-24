import { Star, Shield, Quote, MapPin } from 'lucide-react';

function TestimonialCard({ name, role, location, content, rating, verified }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-4 h-4 transition-all duration-200 ${i <= rating ? 'text-yellow-500 fill-current group-hover:scale-110' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const getInitials = (fullName) => {
    const names = fullName.split(' ');
    return names[0][0] + names[1][0];
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group">
      <div className="flex items-center mb-4">
        {renderStars()}
      </div>
      
      <p className="text-gray-700 mb-4 italic group-hover:text-gray-900 transition-colors">"{content}"</p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold mr-3 group-hover:bg-blue-800 transition-colors duration-300">
          {getInitials(name)}
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-bold text-gray-900 mr-2 group-hover:text-blue-700 transition-colors">{name}</h4>
            {verified && <Shield className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />}
          </div>
          <p className="text-sm text-gray-600">{role} • {location}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma", role: "Software Engineer", location: "Delhi",
      content: "CarpoolConnect transformed my commute! ID verification gives me peace of mind, and I've saved ₹3,000/month. GPS tracking keeps my family secure.",
      rating: 5, verified: true
    },
    {
      name: "Rahul Mehta", role: "Marketing Manager", location: "Mumbai", 
      content: "Amazing safety features - GPS tracking, verified profiles, 24/7 support. It's like a safety net for every journey. Made great friends too!",
      rating: 5, verified: true
    },
    {
      name: "Anjali Gupta", role: "Teacher", location: "Bangalore",
      content: "Love the eco-friendly, community-driven platform. Everyone's respectful and safety-conscious. Savings help me buy more educational materials!",
      rating: 5, verified: true
    }
  ];

  const stats = [
    { value: "50K+", label: "Users", icon: "👥" },
    { value: "4.8/5", label: "Rating", icon: "⭐" },
    { value: "₹2.5Cr", label: "Saved", icon: "💰" },
    { value: "1.2M kg", label: "CO₂ Cut", icon: "🌱" }
  ];

  const trustFeatures = [
    { icon: Shield, title: "100% Verified", description: "Strict ID verification", color: "bg-blue-100 text-blue-700" },
    { icon: MapPin, title: "Live Tracking", description: "Real-time GPS", color: "bg-green-100 text-green-600" },
    { icon: "🛡️", title: "24/7 Support", description: "Always available", color: "bg-gray-100 text-gray-700" },
    { icon: "⚡", title: "Instant Help", description: "Emergency button", color: "bg-blue-100 text-blue-700" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by Thousands
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Stories from <span className="text-blue-700">Real Commuters</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Authentic experiences from verified members who choose CarpoolConnect daily.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
              <div className="text-xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">{stat.value}</div>
              <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              name={testimonial.name}
              role={testimonial.role}
              location={testimonial.location}
              content={testimonial.content}
              rating={testimonial.rating}
              verified={testimonial.verified}
            />
          ))}
        </div>

        {/* Trust Features */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Why <span className="text-blue-700">50K+</span> Choose Us
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${feature.color} group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg`}>
                  {typeof feature.icon === 'string' ? (
                    <div className="text-xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                  ) : (
                    <feature.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{feature.title}</h4>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-xl font-bold mb-2">Become Part of the Movement</h3>
            <p className="text-green-100 mb-4">Transform your commute with safety-first travelers.</p>
            <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <span className="group-hover:animate-pulse">Join the Community Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;