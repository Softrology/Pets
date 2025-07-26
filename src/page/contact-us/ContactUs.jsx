import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Calendar, AlertCircle, CheckCircle, User, MessageSquare,
  Stethoscope, Heart, Shield
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    petName: '',
    urgency: 'normal'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        'Emergency: (555) 123-4567',
        'General Inquiries: (555) 123-4568',
        'Appointments: (555) 123-4569'
      ]
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'info@PetCare.com',
        'emergency@PetCare.com',
        'appointments@PetCare.com'
      ]
    },
    {
      icon: MapPin,
      title: 'Our Location',
      details: [
        '123 Pet Care Street',
        'Lahore, Punjab 54000',
        'Pakistan'
      ]
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: [
        'Mon-Fri: 9:00 AM - 6:00 PM',
        'Sat-Sun: 10:00 AM - 4:00 PM',
        'Emergency: 24/7 Available'
      ]
    }
  ];

  const emergencyContacts = [
    {
      icon: AlertCircle,
      title: 'Emergency Hotline',
      subtitle: 'For urgent medical situations',
      contact: '(555) 123-4567',
      available: '24/7 Available'
    },
    {
      icon: MessageCircle,
      title: 'Emergency WhatsApp',
      subtitle: 'Quick consultation via WhatsApp',
      contact: '+92 300 123 4567',
      available: '24/7 Available'
    }
  ];

  const departments = [
    {
      icon: Stethoscope,
      name: 'General Medicine',
      phone: '(555) 123-4570',
      email: 'general@PetCare.com'
    },
    {
      icon: Heart,
      name: 'Surgery Department',
      phone: '(555) 123-4571',
      email: 'surgery@PetCare.com'
    },
    {
      icon: Shield,
      name: 'Emergency Care',
      phone: '(555) 123-4567',
      email: 'emergency@PetCare.com'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-50 to-teal-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
              Get in <span className="text-teal-600">Touch</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're here to help you and your pets. Reach out to us for appointments, emergencies, or general inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <item.icon className="w-8 h-8 text-teal-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              </div>
              <ul className="space-y-2">
                {item.details.map((detail, i) => (
                  <li key={i} className="text-gray-600">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-1">
                        Pet's Name
                      </label>
                      <input
                        type="text"
                        id="petName"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="pl-10 w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    >
                      <option value="normal">Normal Inquiry</option>
                      <option value="urgent">Urgent (Within 24 hours)</option>
                      <option value="emergency">Emergency (Immediate response)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Emergency Contacts and Departments */}
          <div className="lg:w-1/2 space-y-8">
            {/* Emergency Contacts */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Emergency Contacts
              </h2>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <contact.icon className="w-6 h-6 text-red-500 mt-1 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{contact.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{contact.subtitle}</p>
                        <p className="text-gray-800 font-medium">{contact.contact}</p>
                        <p className="text-green-600 text-sm">{contact.available}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Departments
              </h2>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <dept.icon className="w-6 h-6 text-teal-600 mt-1 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{dept.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm mt-2">
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-1" />
                            <span>{dept.phone}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-1" />
                            <span>{dept.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;