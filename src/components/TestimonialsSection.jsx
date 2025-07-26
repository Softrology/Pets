import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      petName: 'Max',
      petType: 'Golden Retriever',
      rating: 5,
      image: 'placeholder-image-1',
      testimonial: 'Dr. Paws and the entire team at this clinic are absolutely wonderful. Max was so comfortable during his surgery, and the aftercare instructions were thorough. I couldn\'t be happier with the service we received.',
      service: 'Surgery & Recovery'
    },
    {
      name: 'Michael Chen',
      petName: 'Whiskers',
      petType: 'Persian Cat',
      rating: 5,
      image: 'placeholder-image-2',
      testimonial: 'The eye care treatment Whiskers received was exceptional. Dr. Whiskers explained everything clearly and made sure we understood the treatment plan. Our cat\'s vision has improved significantly.',
      service: 'Eye Care Treatment'
    },
    {
      name: 'Emily Rodriguez',
      petName: 'Buddy',
      petType: 'Mixed Breed',
      rating: 5,
      image: 'placeholder-image-3',
      testimonial: 'Emergency care at 2 AM - they were there for us when Buddy needed help the most. Professional, caring, and efficient. This clinic saved our dog\'s life and we are forever grateful.',
      service: 'Emergency Care'
    },
    {
      name: 'David Thompson',
      petName: 'Luna',
      petType: 'Siamese Cat',
      rating: 5,
      image: 'placeholder-image-4',
      testimonial: 'Regular checkups have never been easier. The staff is friendly, the facility is clean, and Luna actually seems to enjoy visiting! The preventive care program has kept her healthy for years.',
      service: 'Regular Checkups'
    },
    {
      name: 'Lisa Wang',
      petName: 'Rocky',
      petType: 'Bulldog',
      rating: 5,
      image: 'placeholder-image-5',
      testimonial: 'The dental care Rocky received was outstanding. The procedure went smoothly, and the team was very professional. Rocky\'s teeth look great and his breath is much better now!',
      service: 'Dental Care'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Pets Treated' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '15+', label: 'Years of Experience' },
    { number: '24/7', label: 'Emergency Support' }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="py-16 bg-gradient-to-r from-[#39a2a1] to-[#21527b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="text-lg text-teal-100 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what pet owners have to say about their experience with our veterinary care.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-teal-100 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          <div className="p-8 md:p-10">
            <div className="flex items-start">
              <Quote className="w-8 h-8 text-teal-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  {testimonials[currentTestimonial].testimonial}
                </p>
                <div className="flex items-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                <div className="font-medium text-gray-900">
                  {testimonials[currentTestimonial].name} •{' '}
                  <span className="text-teal-600">
                    {testimonials[currentTestimonial].petName} ({testimonials[currentTestimonial].petType})
                  </span>
                </div>
                <div className="text-gray-500">
                  {testimonials[currentTestimonial].service}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;