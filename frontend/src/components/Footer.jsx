import { Car, Shield, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <Car className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mr-3" />
              <span className="text-xl sm:text-2xl font-bold">CarpoolConnect</span>
            </div>
            <p className="text-blue-200 mb-4 text-sm sm:text-base">
              Safe, affordable, and eco-friendly carpooling for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200 text-sm sm:text-base">
              <li><Link to="/find-ride" className="hover:text-green-400 transition-colors">Find a Ride</Link></li>
              <li><Link to="/offer-ride" className="hover:text-green-400 transition-colors">Offer a Ride</Link></li>
              <li><Link to="/how-it-works" className="hover:text-green-400 transition-colors">How It Works</Link></li>
              <li><Link to="/safety" className="hover:text-green-400 transition-colors">Safety</Link></li>
              <li><Link to="/help" className="hover:text-green-400 transition-colors">Help</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Contact Us</h3>
            <div className="space-y-3 text-blue-200 text-sm sm:text-base">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                <span>1800-0000-1234</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                <span className="break-all">support@carpoolconnect.com</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                <span>24/7 Safety Support</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-blue-300 text-xs sm:text-sm">
              © 2024 CarpoolConnect. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-300 hover:text-green-400 text-xs sm:text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-green-400 text-xs sm:text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-blue-300 hover:text-green-400 text-xs sm:text-sm transition-colors">Safety Guidelines</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
