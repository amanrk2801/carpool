import { Car, Shield } from 'lucide-react';

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white">{title}</h4>
      <ul className="space-y-2 text-gray-400">
        {links.map((link, index) => (
          <li key={index} className="hover:text-green-300 cursor-pointer transition-colors">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const footerData = [
    {
      title: "Features",
      links: ["Find Rides", "Offer Rides", "Safe Payments", "User Ratings", "GPS Tracking"]
    },
    {
      title: "Safety",
      links: ["ID Verification", "Emergency Support", "24/7 Help", "Safety Guidelines", "Community Rules"]
    },
    {
      title: "Company",
      links: ["About Us", "Privacy Policy", "Terms of Service", "Contact Us", "Blog"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-700 p-2 rounded-lg mr-3">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">CarpoolConnect</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Making commuting affordable, social, and sustainable for everyone.
            </p>
            <div className="flex items-center text-sm text-green-400">
              <Shield className="w-4 h-4 mr-2" />
              Verified & Trusted Platform
            </div>
          </div>
          
          {footerData.map((column, index) => (
            <FooterColumn
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">50,000+</div>
              <div className="text-xs text-gray-500">Verified Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-400">4.8/5</div>
              <div className="text-xs text-gray-500">Safety Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">100%</div>
              <div className="text-xs text-gray-500">ID Verified</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-400">24/7</div>
              <div className="text-xs text-gray-500">Support</div>
            </div>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 CarpoolConnect. All rights reserved. | Safe. Trusted. Sustainable.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
