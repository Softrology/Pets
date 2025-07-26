import React from 'react';

const AffiliatedClinicSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-500 mb-2">
            OUR AFFILIATED CLINIC
          </h2>
        </div>

        {/* Clinic Image */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Placeholder for clinic image */}
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              {/* You can replace this div with an actual image */}
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <p className="text-blue-600 font-semibold text-lg">
                  Professional Veterinary Care
                </p>
              </div>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Floating cards with clinic info */}
          <div className="absolute -bottom-8 left-4 right-4 sm:left-8 sm:right-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Expert Vets</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Emergency Care</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">1000+</div>
                <div className="text-sm text-gray-600">Happy Pets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Modern Equipment
            </h3>
            <p className="text-sm text-gray-600">
              State-of-the-art medical equipment for accurate diagnosis
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Experienced Staff
            </h3>
            <p className="text-sm text-gray-600">
              Qualified veterinarians with years of experience
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Comfortable Environment
            </h3>
            <p className="text-sm text-gray-600">
              Stress-free environment for your beloved pets
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Emergency Care
            </h3>
            <p className="text-sm text-gray-600">
              24/7 emergency services for urgent pet care needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatedClinicSection;