import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Briefcase, Award,
  Clock, Calendar, CheckCircle, ChevronDown, Star,
  Shield, Heart, Stethoscope, Clipboard, FileText
} from 'lucide-react';
import ApplicationForm from './ApplicationForm';

const JoinasVet = () => {
  const [activeTab, setActiveTab] = useState('benefits');

  

  const benefits = [
    {
      icon: Shield,
      title: 'Malpractice Insurance',
      description: 'Comprehensive coverage to protect you and your practice'
    },
    {
      icon: Award,
      title: 'Continuing Education',
      description: 'Annual stipend for professional development courses'
    },
    {
      icon: Heart,
      title: 'Health Benefits',
      description: 'Medical, dental, and vision insurance for you and family'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose shifts that work with your lifestyle'
    },
    {
      icon: Star,
      title: 'Competitive Salary',
      description: 'Base pay plus performance bonuses'
    },
    {
      icon: Stethoscope,
      title: 'Modern Equipment',
      description: 'State-of-the-art facilities and tools'
    }
  ];

  const requirements = [
    'DVM or equivalent degree from accredited institution',
    'Current state veterinary license in good standing',
    'Minimum 2 years clinical experience (new grads considered for residency)',
    'DEA license if prescribing controlled substances',
    'Strong communication and interpersonal skills',
    'Compassionate approach to patient care'
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Application Review',
      duration: '1-3 business days'
    },
    {
      step: 2,
      title: 'Phone Screening',
      duration: '30 minute call'
    },
    {
      step: 3,
      title: 'Clinical Interview',
      duration: '2-3 hour onsite visit'
    },
    {
      step: 4,
      title: 'Reference Check',
      duration: '2-5 business days'
    },
    {
      step: 5,
      title: 'Offer Extended',
      duration: 'Within 1 week of final interview'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Join Our <span className="text-teal-600">Veterinary Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Grow your career with a team that values expertise, compassion, and innovation in animal care.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Application Form - Now at the top */}
          <ApplicationForm/>
         

          {/* Tabs Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'benefits' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'requirements' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Requirements
              </button>
              <button
                onClick={() => setActiveTab('process')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'process' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Hiring Process
              </button>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              {activeTab === 'benefits' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="bg-teal-100 p-3 rounded-lg mr-4">
                          <benefit.icon className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <ul className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'process' && (
                <div className="space-y-8">
                  {processSteps.map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-6 mt-1 flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {step.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Current Openings */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Openings</h2>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Emergency Veterinarian</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Full-time
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">General Practice Vet</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Part-time
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Veterinary Surgeon</div>
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Full-time
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">Exotic Animal Specialist</div>
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        Full-time
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinasVet;