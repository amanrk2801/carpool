function StepCard({ step, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your profile and verify your identity for a safe community experience."
    },
    {
      step: 2,
      title: "Find Matches",
      description: "Search for rides or passengers based on your route, schedule, and preferences."
    },
    {
      step: 3,
      title: "Start Carpooling",
      description: "Connect with your matches and enjoy a comfortable, cost-effective journey."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting started is simple and takes just minutes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((stepItem, index) => (
            <StepCard
              key={index}
              step={stepItem.step}
              title={stepItem.title}
              description={stepItem.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
