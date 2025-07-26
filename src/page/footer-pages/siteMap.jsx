import React from 'react';
import { Map, Home, PawPrint, User, FileText, Phone, Calendar, Heart, Shield, Mail, Search } from 'lucide-react';

const Sitemap = () => {
  const siteSections = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { name: "Home", url: "/" },
        { name: "About Us", url: "/about" },
        { name: "Services", url: "/services" },
        { name: "Our Team", url: "/team" },
        { name: "Testimonials", url: "/testimonials" },
        { name: "Contact Us", url: "/contact" }
      ]
    },
    {
      title: "Pet Services",
      icon: PawPrint,
      links: [
        { name: "Wellness Exams", url: "/services/wellness" },
        { name: "Vaccinations", url: "/services/vaccinations" },
        { name: "Dental Care", url: "/services/dental" },
        { name: "Surgery", url: "/services/surgery" },
        { name: "Emergency Care", url: "/services/emergency" },
        { name: "Senior Pet Care", url: "/services/senior" }
      ]
    },
    {
      title: "Resources",
      icon: FileText,
      links: [
        { name: "Blog", url: "/blog" },
        { name: "Pet Care Tips", url: "/resources/tips" },
        { name: "FAQs", url: "/faqs" },
        { name: "Pet Health Library", url: "/resources/library" },
        { name: "New Pet Owners", url: "/resources/new-pets" },
        { name: "Preventive Care", url: "/resources/prevention" }
      ]
    },
    {
      title: "Client Services",
      icon: User,
      links: [
        { name: "Appointments", url: "/appointments" },
        { name: "Patient Portal", url: "/portal" },
        { name: "Prescription Refills", url: "/prescriptions" },
        { name: "Pet Records", url: "/records" },
        { name: "Payment Options", url: "/payment" },
        { name: "Insurance Info", url: "/insurance" }
      ]
    },
    {
      title: "Legal & Policies",
      icon: Shield,
      links: [
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" },
        { name: "Cookie Policy", url: "/cookies" },
        { name: "Accessibility", url: "/accessibility" },
        { name: "Financial Policy", url: "/financial-policy" },
        { name: "HIPAA Compliance", url: "/hipaa" }
      ]
    },
    {
      title: "Connect With Us",
      icon: Phone,
      links: [
        { name: "Contact Information", url: "/contact" },
        { name: "Locations", url: "/locations" },
        { name: "Hours", url: "/hours" },
        { name: "Emergency Contacts", url: "/emergency" },
        { name: "Careers", url: "/careers" },
        { name: "Join Our Team", url: "/join" }
      ]
    }
  ];

  const quickLinks = [
    { name: "Book Appointment", url: "/appointments", icon: Calendar },
    { name: "Pet Health Tips", url: "/resources/tips", icon: Heart },
    { name: "Emergency Info", url: "/emergency", icon: Shield },
    { name: "Contact Us", url: "/contact", icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Map className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              PetCare <span className="text-teal-600">Sitemap</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore all the pages and resources available on our website.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Links */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center"
                >
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <link.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="font-medium text-gray-800">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Full Sitemap */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Complete Website Sitemap</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteSections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-teal-100 p-2 rounded-lg mr-3">
                        <section.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a 
                            href={link.url} 
                            className="text-gray-600 hover:text-teal-600 flex items-start py-2"
                          >
                            <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-3"></span>
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search Help */}
          <div className="mt-16 bg-teal-50 rounded-xl p-8 md:p-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Can't Find What You Need?</h2>
              <p className="text-gray-600 mb-6">
                Try our website search or contact us directly for assistance.
              </p>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search our website..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;