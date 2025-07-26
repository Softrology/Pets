import React from 'react';
import { AlertTriangle, Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        {/* Icon */}
        <div className="mx-auto bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-[#39a2a1] to-[#21527b] hover:from-[#2d8a89] hover:to-[#1a4062] text-white px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wide transition-colors duration-200 inline-flex items-center"
        >
          Go to Homepage
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-2">
            Need help? Contact our support team:
          </p>
          <a
            href="mailto:support@PetCare.com"
            className="text-[#39a2a1] hover:underline text-sm"
          >
            support@PetCare.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;