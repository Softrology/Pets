import React from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';

const HeroSearchSection = () => {
  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-teal-100 to-teal-200 overflow-hidden">
      {/* Background placeholder - you can replace this with your background image */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/80 to-teal-200/80">
        {/* Add your background image here */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            FIND THE BEST DOCTOR NEAR YOU
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Location Dropdown */}
              <div className="flex items-center bg-teal-600 text-white px-4 py-4 sm:py-3 min-w-0 sm:min-w-[200px]">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <select className="bg-transparent text-white outline-none flex-1 appearance-none cursor-pointer">
                  <option value="lahore" className="text-gray-800">LAHORE</option>
                  <option value="karachi" className="text-gray-800">KARACHI</option>
                  <option value="islamabad" className="text-gray-800">ISLAMABAD</option>
                </select>
                <ChevronDown className="w-5 h-5 ml-2 flex-shrink-0" />
              </div>
              
              {/* Search Input */}
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="SEARCH BY DOCTORS"
                  className="flex-1 px-4 py-4 sm:py-3 text-gray-700 placeholder-gray-500 outline-none text-sm sm:text-base"
                />
                <button className="bg-teal-600 hover:bg-teal-700 text-white p-4 sm:p-3 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
            HOW CAN WE HELP YOU TODAY?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Dr. Paws */}
          <div className="bg-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <div className="w-8 h-8 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold">DR. PAWS</h3>
                <p className="text-sm opacity-90">DENTIST</p>
                <p className="text-xs opacity-80">13 YEAR EXPERIENCE</p>
              </div>
            </div>
          </div>

          {/* Dr. Whiskers */}
          <div className="bg-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold">DR. WHISKERS</h3>
                <p className="text-sm opacity-90">EYES</p>
                <p className="text-xs opacity-80">23 YEAR EXPERIENCE</p>
              </div>
            </div>
          </div>

          {/* Dr. Petpulse */}
          <div className="bg-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold">DR. PETPULSE</h3>
                <p className="text-sm opacity-90">EAR MITES</p>
                <p className="text-xs opacity-80">25 YEAR EXPERIENCE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchSection;