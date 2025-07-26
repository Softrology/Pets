import React from 'react';
import { 
  Heart, Award, Users, Clock, Shield, Stethoscope, 
  MapPin, Phone, Mail, Star, CheckCircle, Target,
  Eye, Zap, Activity
} from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every pet with love and compassion, understanding the special bond between pets and their families.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from medical care to customer service.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your pet\'s safety is our top priority. We maintain the highest standards of care and hygiene.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Our experienced team works together to provide comprehensive care for your beloved pets.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Paws',
      specialty: 'General Veterinarian & Surgery',
      experience: '15 years',
      education: 'DVM from University of Veterinary Sciences',
      image: 'doctor-1-placeholder',
      description: 'Dr. Paws specializes in general veterinary care and surgical procedures. She has a gentle approach that helps nervous pets feel comfortable.'
    },
    {
      name: 'Dr. Michael Whiskers',
      specialty: 'Ophthalmology & Eye Care',
      experience: '12 years',
      education: 'DVM, Certified Veterinary Ophthalmologist',
      image: 'doctor-2-placeholder',
      description: 'Dr. Whiskers is our eye care specialist, helping pets with vision problems and eye-related conditions with advanced treatment methods.'
    },
    {
      name: 'Dr. Emily Petpulse',
      specialty: 'Emergency & Critical Care',
      experience: '10 years',
      education: 'DVM, Emergency & Critical Care Certification',
      image: 'doctor-3-placeholder',
      description: 'Dr. Petpulse leads our emergency care team, providing life-saving treatments for pets in critical conditions around the clock.'
    },
    {
      name: 'Dr. James Furry',
      specialty: 'Internal Medicine',
      experience: '18 years',
      education: 'DVM, Internal Medicine Specialist',
      image: 'doctor-4-placeholder',
      description: 'Dr. Furry specializes in diagnosing and treating complex internal medical conditions in both cats and dogs.'
    }
  ];

  const achievements = [
    { number: '5000+', label: 'Pets Treated Successfully' },
    { number: '15+', label: 'Years of Experience' },
    { number: '98%', label: 'Customer Satisfaction Rate' },
    { number: '24/7', label: 'Emergency Care Available' }
  ];

  const facilities = [
    {
      icon: Stethoscope,
      title: 'Advanced Diagnostic Equipment',
      description: 'State-of-the-art diagnostic tools including digital X-ray, ultrasound, and laboratory facilities.'
    },
    {
      icon: Activity,
      title: 'Surgical Suites',
      description: 'Modern surgical facilities equipped with the latest technology for safe and effective procedures.'
    },
    {
      icon: Eye,
      title: 'Specialized Treatment Rooms',
      description: 'Dedicated rooms for different specialties including ophthalmology, dentistry, and emergency care.'
    },
    {
      icon: Shield,
      title: 'Isolation & Recovery Areas',
      description: 'Separate areas for infectious disease management and comfortable recovery spaces.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-50 to-teal-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              About <span className="text-teal-600">PetCare</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dedicated to providing exceptional veterinary care with compassion, 
              expertise, and cutting-edge medical technology for over 15 years.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-teal-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To provide the highest quality veterinary care while treating every pet as if they were our own. 
                  We are committed to promoting the health and well-being of pets through preventive care, 
                  advanced medical treatments, and compassionate service to pet families.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Eye className="w-8 h-8 text-teal-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be the leading veterinary clinic in our community, recognized for excellence in pet healthcare, 
                  innovative treatments, and exceptional client service. We envision a world where every pet 
                  receives the love, care, and medical attention they deserve.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Image placeholder */}
              <div className="aspect-square bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-teal-700 font-semibold text-lg">Mission & Vision Image Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape the way we care for your pets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of veterinary professionals brings years of experience and passion for animal care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image placeholder */}
                <div className="aspect-square bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Stethoscope className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-teal-700 font-semibold">{member.name} Photo</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-2">{member.specialty}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.experience} Experience</p>
                  <p className="text-sm text-gray-600 mb-4">{member.education}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-teal-100">
              Proud milestones in our journey of caring for pets
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-teal-100 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">Our Facilities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Modern equipment and comfortable spaces designed with your pet's health and comfort in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {facility.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied pet owners who trust us with their beloved companions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200">
              Book an Appointment
            </button>
            <button className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;