import React, { useState } from 'react';
import { 
  Search, MapPin, Filter, Star, Calendar, Clock, Phone, 
  Mail, Award, Users, Heart, Eye, Stethoscope, Scissors,
  ChevronDown, ChevronRight
} from 'lucide-react';

const FindDoctor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Faisalabad', 'Peshawar'];
  const specialties = ['General Medicine', 'Surgery', 'Dentistry', 'Ophthalmology', 'Emergency Care', 'Dermatology'];
  const availabilities = ['Available Today', 'Available Tomorrow', 'Available This Week', 'Any Day'];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Paws',
      specialty: 'General Veterinarian & Surgery',
      experience: '15 years',
      rating: 4.9,
      reviews: 127,
      location: 'Lahore',
      image: 'doctor-1-placeholder',
      availability: 'Available Today',
      nextSlot: '2:30 PM',
      consultation: '$75',
      about: 'Dr. Paws specializes in general veterinary care and surgical procedures with a gentle approach.',
      languages: ['English', 'Urdu'],
      education: 'DVM from University of Veterinary Sciences',
      badges: ['Top Rated', 'Fast Response']
    },
    {
      id: 2,
      name: 'Dr. Michael Whiskers',
      specialty: 'Ophthalmology & Eye Care',
      experience: '12 years',
      rating: 4.8,
      reviews: 89,
      location: 'Karachi',
      image: 'doctor-2-placeholder',
      availability: 'Available Tomorrow',
      nextSlot: '10:00 AM',
      consultation: '$85',
      about: 'Expert in eye care and vision problems with advanced treatment methods.',
      languages: ['English', 'Urdu', 'Sindhi'],
      education: 'DVM, Certified Veterinary Ophthalmologist',
      badges: ['Eye Specialist', 'Advanced Equipment']
    },
    {
      id: 3,
      name: 'Dr. Emily Petpulse',
      specialty: 'Emergency & Critical Care',
      experience: '10 years',
      rating: 4.9,
      reviews: 156,
      location: 'Islamabad',
      image: 'doctor-3-placeholder',
      availability: 'Available 24/7',
      nextSlot: 'Immediate',
      consultation: '$100',
      about: 'Emergency care specialist providing life-saving treatments around the clock.',
      languages: ['English', 'Urdu'],
      education: 'DVM, Emergency & Critical Care Certification',
      badges: ['24/7 Available', 'Emergency Expert']
    },
    {
      id: 4,
      name: 'Dr. James Furry',
      specialty: 'Internal Medicine',
      experience: '18 years',
      rating: 4.7,
      reviews: 203,
      location: 'Lahore',
      image: 'doctor-4-placeholder',
      availability: 'Available This Week',
      nextSlot: 'Thu 11:00 AM',
      consultation: '$90',
      about: 'Specializes in complex internal medical conditions in cats and dogs.',
      languages: ['English', 'Urdu', 'Punjabi'],
      education: 'DVM, Internal Medicine Specialist',
      badges: ['Senior Doctor', 'Complex Cases']
    },
    {
      id: 5,
      name: 'Dr. Lisa Canine',
      specialty: 'Dermatology',
      experience: '8 years',
      rating: 4.8,
      reviews: 94,
      location: 'Multan',
      image: 'doctor-5-placeholder',
      availability: 'Available Today',
      nextSlot: '4:00 PM',
      consultation: '$70',
      about: 'Expert in skin conditions, allergies, and dermatological treatments.',
      languages: ['English', 'Urdu'],
      education: 'DVM, Dermatology Specialist',
      badges: ['Skin Expert', 'Allergy Specialist']
    },
    {
      id: 6,
      name: 'Dr. Robert Dental',
      specialty: 'Dentistry',
      experience: '14 years',
      rating: 4.9,
      reviews: 178,
      location: 'Karachi',
      image: 'doctor-6-placeholder',
      availability: 'Available Tomorrow',
      nextSlot: '9:30 AM',
      consultation: '$80',
      about: 'Specialized in dental care, cleaning, and oral surgery for pets.',
      languages: ['English', 'Urdu'],
      education: 'DVM, Veterinary Dentistry Certification',
      badges: ['Dental Expert', 'Pain-Free Treatment']
    }
  ];

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const handleSearch = () => {
    let filtered = doctors;

    if (searchQuery) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(doctor => doctor.location === selectedCity);
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => 
        doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }

    if (selectedAvailability) {
      filtered = filtered.filter(doctor => doctor.availability === selectedAvailability);
    }

    setFilteredDoctors(filtered);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSpecialtyIcon = (specialty) => {
    if (specialty.includes('Surgery')) return Heart;
    if (specialty.includes('Eye') || specialty.includes('Ophthalmology')) return Eye;
    if (specialty.includes('Dentistry')) return Scissors;
    return Stethoscope;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Find the Perfect <span className="text-teal-600">Veterinarian</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with experienced veterinarians in your area. Browse profiles, read reviews, and book appointments online.
            </p>
          </div>

          {/* Search Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search Doctor</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Doctor name or specialty"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Doctors ({filteredDoctors.length})
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Rating</option>
                <option>Experience</option>
                <option>Price</option>
                <option>Availability</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredDoctors.map((doctor) => {
              const SpecialtyIcon = getSpecialtyIcon(doctor.specialty);
              return (
                <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Doctor Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center">
                          <SpecialtyIcon className="w-12 h-12 text-teal-600" />
                        </div>
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                            <p className="text-teal-600 font-semibold mb-2">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span>{doctor.experience} exp</span>
                              <div className="flex items-center">
                                {renderStars(doctor.rating)}
                                <span className="ml-1">{doctor.rating}</span>
                                <span className="ml-1">({doctor.reviews})</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-teal-600 mb-1">{doctor.consultation}</div>
                            <div className="text-sm text-gray-600">Consultation</div>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doctor.badges.map((badge, index) => (
                            <span key={index} className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Location & Availability */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {doctor.location}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                            <span className="text-green-600 font-semibold">{doctor.availability}</span>
                          </div>
                        </div>

                        {/* About */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.about}</p>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book {doctor.nextSlot}
                          </button>
                          <button className="flex-1 border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-8 rounded-lg font-semibold transition-colors duration-200">
              Load More Doctors
            </button>
          </div>
        </div>
      </div>

      {/* Featured Specialties */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-600 mb-4">Browse by Specialty</h2>
            <p className="text-lg text-gray-600">Find specialized care for your pet's specific needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map((specialty, index) => {
              const icons = [Heart, Eye, Scissors, Stethoscope, Users, Award];
              const IconComponent = icons[index];
              return (
                <div key={specialty} className="bg-gray-50 hover:bg-teal-50 rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 group">
                  <div className="w-16 h-16 bg-teal-100 group-hover:bg-teal-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{specialty}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;