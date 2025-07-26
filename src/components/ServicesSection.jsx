import React from 'react';
import { Heart, Scissors, Stethoscope, Syringe, Eye, Pill, Shield, Activity } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Stethoscope,
      title: 'General Checkups',
      description: 'Comprehensive health examinations for your pets to ensure they stay healthy and happy.',
      price: 'Starting from $50'
    },
    {
      icon: Syringe,
      title: 'Vaccinations',
      description: 'Essential vaccines to protect your pets from common diseases and infections.',
      price: 'Starting from $35'
    },
    {
      icon: Scissors,
      title: 'Grooming Services',
      description: 'Professional grooming services including bathing, nail trimming, and styling.',
      price: 'Starting from $40'
    },
    {
      icon: Heart,
      title: 'Surgery',
      description: 'Advanced surgical procedures performed by experienced veterinary surgeons.',
      price: 'Consultation Required'
    },
    {
      icon: Eye,
      title: 'Eye Care',
      description: 'Specialized eye examinations and treatments for various eye conditions.',
      price: 'Starting from $75'
    },
    {
      icon: Pill,
      title: 'Dental Care',
      description: 'Complete dental care including cleaning, extractions, and oral health maintenance.',
      price: 'Starting from $85'
    },
    {
      icon: Shield,
      title: 'Emergency Care',
      description: '24/7 emergency services for urgent pet health situations and accidents.',
      price: 'Variable Pricing'
    },
    {
      icon: Activity,
      title: 'Health Monitoring',
      description: 'Regular health monitoring and wellness programs for senior pets.',
      price: 'Starting from $60'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">
            OUR SERVICES
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive veterinary care services to keep your beloved pets healthy and happy. 
            Our experienced team is dedicated to providing the best possible care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-teal-50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-teal-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto">
                    <span className="text-teal-600 font-semibold text-sm">
                      {service.price}
                    </span>
                  </div>
                  
                  <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-teal-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need Emergency Care?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              We're available 24/7 for emergency situations. Don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors duration-200">
                Call Emergency: (555) 123-4567
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-full font-semibold transition-colors duration-200">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;