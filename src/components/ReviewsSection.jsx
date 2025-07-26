import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

const ReviewsSection = () => {
  const scrollRef = useRef(null);

  const reviews = [
    {
      doctor: 'DR. PAWS',
      rating: 5,
      status: 'GOOD',
      review: 'MY CAT IS USUALLY VERY NERVOUS AT VET VISITS, BUT DR. PAWS HANDLED HER WITH SUCH CALM ENERGY. THE CLINIC IS CLEAN, QUIET, AND THE STAFF IS INCREDIBLY FRIENDLY.'
    },
    {
      doctor: 'DR. WHISKERS',
      rating: 5,
      status: 'GOOD',
      review: 'OUR DOG USUALLY PANICS AT VET VISITS, BUT DR. WHISKERS WAS INCREDIBLY CALM AND GENTLE. I WOULD SET OUR PUP AT EASE AT HIS OFFICE. QUALITY MEDICINE!'
    },
    {
      doctor: 'DR. PETPULSE',
      rating: 5,
      status: 'GOOD',
      review: 'THE VET AT DR. PETPULSE WAS KIND, KNOWLEDGEABLE, AND TRULY CARED ABOUT MY PUPPYS HEALTH. THEY DIAGNOSED A SKIN ALLERGY AND RECOMMENDED THE BEST TREATMENT.'
    },
    {
      doctor: 'DR. PAWS',
      rating: 5,
      status: 'GOOD',
      review: 'EXCELLENT SERVICE AND VERY PROFESSIONAL STAFF. MY PET RECEIVED THE BEST CARE POSSIBLE. HIGHLY RECOMMEND THIS CLINIC FOR ALL PET OWNERS.'
    },
    {
      doctor: 'DR. WHISKERS',
      rating: 5,
      status: 'GOOD',
      review: 'AMAZING EXPERIENCE! THE DOCTOR WAS VERY PATIENT AND EXPLAINED EVERYTHING CLEARLY. THE TREATMENT WAS EFFECTIVE AND MY PET RECOVERED QUICKLY.'
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    let scrollPosition = 0;

    const autoScroll = () => {
      scrollPosition += 1;
      if (scrollPosition >= scrollWidth - clientWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(autoScroll, 30);

    // Pause on hover
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      const newIntervalId = setInterval(autoScroll, 30);
      return newIntervalId;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-500 mb-2">REVIEWS</h2>
        </div>

        {/* Reviews Carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate reviews for seamless loop */}
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 sm:w-96 bg-teal-600 rounded-2xl p-6 text-white shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{review.doctor}</h3>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm leading-relaxed opacity-90">
                    "{review.review}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-teal-200">
                      {review.status}
                    </span>
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile scroll hint */}
        <div className="mt-6 text-center lg:hidden">
          <p className="text-sm text-gray-500">
            Swipe to see more reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;