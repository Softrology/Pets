import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  User, Mail, Phone, MapPin, Briefcase, Calendar,
  CheckCircle, ChevronDown, Clipboard, FileText, Lock, X
} from 'lucide-react';
import { useRegister } from '../../hooks/useAuth';

const ApplicationForm = () => {
  const { mutate: register } = useRegister();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    gender: 'MALE',
    role: 'VET',
    specialization: '', // Now a single value
    qualifications: [],
    consultationFee: '',
    availability: [],
    profileImage: null,
    licenseImage: null
  });

  const [tempQualification, setTempQualification] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const specializationOptions = [
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

  const availabilityOptions = [
    'Full-time',
    'Part-time',
    'Weekends only',
    'Emergency shifts',
    'Flexible hours'
  ];

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

  const handleQualificationChange = (e) => {
    setTempQualification(e.target.value);
  };

  const addQualification = () => {
    if (tempQualification.trim() && !formData.qualifications.includes(tempQualification.trim())) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, tempQualification.trim()]
      }));
      setTempQualification('');
    }
  };

  const removeQualification = (index) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    if (value && !formData.availability.includes(value)) {
      setFormData(prev => ({
        ...prev,
        availability: [...prev.availability, value]
      }));
    }
  };

  const removeAvailability = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.emailAddress || 
        !formData.password || !formData.specialization) {
      return;
    }

    if (!formData.profileImage || !formData.licenseImage) {
      return;
    }

    if (formData.qualifications.length === 0 || formData.availability.length === 0) {
      return;
    }

    // Prepare form data for submission
    const formDataToSend = new FormData();
    
    // Append single value fields
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('emailAddress', formData.emailAddress);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('specialization', formData.specialization); // Single value
    formDataToSend.append('consultationFee', formData.consultationFee);
    
    // Append array fields
    formData.qualifications.forEach(qual => formDataToSend.append('qualifications', qual));
    formData.availability.forEach(avail => formDataToSend.append('availability', avail));
    
    // Append files
    formDataToSend.append('profileImage', formData.profileImage);
    formDataToSend.append('licenseImage', formData.licenseImage);

    // Call the register mutation
    register(formDataToSend, {
      onSuccess: () => {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({
          firstName: '',
          lastName: '',
          emailAddress: '',
          password: '',
          gender: 'MALE',
          role: 'VET',
          specialization: '',
          qualifications: [],
          consultationFee: '',
          availability: [],
          profileImage: null,
          licenseImage: null
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Veterinarian Application Form</h2>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

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
                  className="pl-10 py-3 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
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
                className="w-full py-3 pl-10 rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  required
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="pl-10 py-3 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 py-3 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full py-3 pl-10 rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 appearance-none"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="role"
                  name="role"
                  value="Veterinarian"
                  disabled
                  className="w-full py-3 pl-10 rounded-lg border-gray-300 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Specialization (Single Select) */}
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
              Specialization <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="specialization"
                name="specialization"
                required
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 appearance-none"
              >
                <option value="">Select your specialization</option>
                {specializationOptions.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Qualifications (Array) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualifications <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempQualification}
                onChange={handleQualificationChange}
                className="flex-1 py-2 px-3 rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Add qualification (e.g., DVM, PhD)"
              />
              <button
                type="button"
                onClick={addQualification}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.qualifications.map((qual, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                  {qual}
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="ml-1.5 inline-flex text-blue-600 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700 mb-1">
                Consultation Fee (USD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="consultationFee"
                  name="consultationFee"
                  min="0"
                  step="0.01"
                  required
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                  className="w-full py-3 pl-10 rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  placeholder="50.00"
                />
              </div>
            </div>

            {/* Availability (Array) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={handleAvailabilityChange}
                  className="w-full py-3 pl-10 rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>Select availability options</option>
                  {availabilityOptions.map(option => (
                    <option key={option} value={option} disabled={formData.availability.includes(option)}>
                      {option}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.availability.map((avail, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">
                    {avail}
                    <button
                      type="button"
                      onClick={() => removeAvailability(index)}
                      className="ml-1.5 inline-flex text-purple-600 hover:text-purple-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="w-8 h-8 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500">
                      {formData.profileImage ? (
                        <span className="font-medium">{formData.profileImage.name}</span>
                      ) : (
                        <>
                          <span className="font-semibold">Click to upload</span> profile photo
                        </>
                      )}
                    </p>
                  </div>
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="licenseImage" className="block text-sm font-medium text-gray-700 mb-1">
                License Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="w-8 h-8 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500">
                      {formData.licenseImage ? (
                        <span className="font-medium">{formData.licenseImage.name}</span>
                      ) : (
                        <>
                          <span className="font-semibold">Click to upload</span> license photo
                        </>
                      )}
                    </p>
                  </div>
                  <input
                    id="licenseImage"
                    name="licenseImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Clipboard className="w-5 h-5 mr-2" />
                Submit Application
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplicationForm;