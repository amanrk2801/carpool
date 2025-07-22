import { Car } from 'lucide-react';

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-gray-400">
        {links.map((link, index) => (
          <li key={index} className="hover:text-white cursor-pointer transition-colors">
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
      links: ["Find Rides", "Offer Rides", "Safe Payments", "User Ratings"]
    },
    {
      title: "Support",
      links: ["Help Center", "Safety Guidelines", "Contact Us", "Community Rules"]
    },
    {
      title: "Company",
      links: ["About Us", "Privacy Policy", "Terms of Service", "Blog"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Car className="w-8 h-8 text-blue-400 mr-2" />
              <h3 className="text-2xl font-bold text-blue-400">CarpoolConnect</h3>
            </div>
            <p className="text-gray-400">
              Making commuting affordable, social, and sustainable for everyone.
            </p>
          </div>
          
          {footerData.map((column, index) => (
            <FooterColumn
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CarpoolConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
