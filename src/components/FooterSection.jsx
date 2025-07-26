import React from 'react';
import { 
  MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, 
  Youtube, Heart, ArrowRight, Stethoscope 
} from 'lucide-react';

const FooterSection = () => {
  const quickLinks = [
    'Home',
    'About Us',
    'Find Doctor',
    'Services',
    'Emergency Care',
    'Contact'
  ];

  const services = [
    'General Checkups',
    'Vaccinations',
    'Surgery',
    'Dental Care',
    'Eye Care',
    'Grooming'
  ];

  const petCareResources = [
    'Pet Health Tips',
    'Vaccination Schedule',
    'Emergency Signs',
    'Nutrition Guide',
    'Exercise Plans',
    'Senior Pet Care'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-teal-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Stay Updated with Pet Care Tips
              </h3>
              <p className="text-teal-100 text-lg">
                Subscribe to our newsletter for the latest pet health advice and clinic updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:ml-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-3 rounded-full text-gray-800 placeholder-gray-500 outline-none flex-1 min-w-0 sm:min-w-[300px]"
              />
              <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center">
                Subscribe
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-teal-400">PetCare</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Providing compassionate and professional veterinary care for your beloved pets. 
                Our experienced team is dedicated to keeping your furry friends healthy and happy.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-teal-400">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-teal-400">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-teal-400">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-teal-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">123 Pet Care Street</p>
                    <p className="text-gray-300">Lahore, Punjab, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-teal-400 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">Emergency: (555) 123-4567</p>
                    <p className="text-gray-300">General: (555) 123-4568</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-teal-400 mr-3 flex-shrink-0" />
                  <p className="text-gray-300">info@PetCare.com</p>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-teal-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Sat-Sun: 10:00 AM - 4:00 PM</p>
                    <p className="text-teal-400 font-semibold">Emergency: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pet Care Resources Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-teal-400 mb-4">Pet Care Resources</h3>
            <p className="text-gray-300">Helpful resources to keep your pets healthy and happy</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {petCareResources.map((resource, index) => (
              <a
                key={index}
                href="#"
                className="bg-gray-700 hover:bg-teal-600 rounded-lg p-4 text-center transition-colors duration-200 group"
              >
                <p className="text-sm text-gray-300 group-hover:text-white font-medium">
                  {resource}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-gray-400">
                © 2025 PetCare Clinic. Made with love for pets.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookie-policy" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="/site-map" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;