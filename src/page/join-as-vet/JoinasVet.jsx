import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Briefcase, Award,
  Clock, Calendar, CheckCircle, ChevronDown, Star,
  Shield, Heart, Stethoscope, Clipboard, FileText
} from 'lucide-react';

const JoinasVet = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    licenseNumber: '',
    availableFrom: '',
    resume: null,
    coverLetter: ''
  });

  const [activeTab, setActiveTab] = useState('benefits');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const specializations = [
    'General Practice',
    'Surgery',
    'Dentistry',
    'Dermatology',
    'Ophthalmology',
    'Cardiology',
    'Neurology',
    'Oncology',
    'Emergency Care',
    'Exotic Animals'
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-2">
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
                          Location
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
                          Main Hospital
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
                          Downtown Clinic
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
                          Specialty Center
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
                          Main Hospital
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

            {/* Right Column - Application Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Form</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Application Submitted!</h3>
                    <p className="text-green-600">We'll review your information and get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          id="specialization"
                          name="specialization"
                          required
                          value={formData.specialization}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 appearance-none"
                        >
                          <option value="">Select your specialization</option>
                          {specializations.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        min="0"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        License Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        required
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-1">
                        Available From
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          id="availableFrom"
                          name="availableFrom"
                          value={formData.availableFrom}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                        Resume/CV <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileText className="w-8 h-8 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-500">
                              {formData.resume ? (
                                <span className="font-medium">{formData.resume.name}</span>
                              ) : (
                                <>
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </>
                              )}
                            </p>
                          </div>
                          <input
                            id="resume"
                            name="resume"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows="4"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        placeholder="Tell us why you'd be a great fit..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <Clipboard className="w-5 h-5 mr-2" />
                      Submit Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinasVet;