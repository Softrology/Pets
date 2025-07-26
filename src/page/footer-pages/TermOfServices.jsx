import React from 'react';
import { FileText, Clipboard, Shield, AlertTriangle, BookOpen, Mail, Phone } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Terms of <span className="text-teal-600">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using our veterinary services.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {/* Introduction */}
              <div className="p-8 md:p-10">
                <p className="text-gray-600 mb-6">
                  Effective Date: January 15, 2025
                </p>
                <p className="text-gray-700">
                  These Terms of Service ("Terms") govern your use of PetCare's veterinary services, website, and related offerings. By accessing or using our services, you agree to be bound by these Terms.
                </p>
              </div>

              {/* Services Overview */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Clipboard className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">1. Veterinary Services</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Scope of Services</h3>
                    <p className="text-gray-600">
                      PetCare provides professional veterinary medical services including but not limited to: wellness exams, diagnostic testing, surgical procedures, emergency care, and preventive treatments.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Medical Judgement</h3>
                    <p className="text-gray-600">
                      Our veterinarians will exercise their professional judgement to determine appropriate treatment plans. You understand that medicine is not an exact science and outcomes cannot be guaranteed.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Emergency Protocol</h3>
                    <p className="text-gray-600">
                      In emergency situations, we reserve the right to provide immediate necessary care without prior consent when delay would endanger the animal's life or health.
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Responsibilities */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">2. Client Responsibilities</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="bg-teal-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3">1</span>
                      Accurate Information
                    </h3>
                    <p className="text-gray-600">
                      You agree to provide complete and accurate information about your pet's health history, behavior, and any medications or supplements.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="bg-teal-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3">2</span>
                      Financial Responsibility
                    </h3>
                    <p className="text-gray-600">
                      You accept responsibility for all charges for services rendered, including any diagnostic tests or treatments your pet receives.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="bg-teal-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3">3</span>
                      Appointment Policy
                    </h3>
                    <p className="text-gray-600">
                      You agree to arrive on time for appointments and provide 24-hour notice for cancellations to avoid fees.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="bg-teal-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3">4</span>
                      Animal Handling
                    </h3>
                    <p className="text-gray-600">
                      You are responsible for properly restraining your pet or allowing our staff to do so for safety.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payments & Fees */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <BookOpen className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">3. Payments & Fees</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-teal-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg mr-4">
                      <span className="font-semibold text-teal-600">§3.1</span>
                    </div>
                    <p className="text-gray-700">
                      Payment is due at time of service. We accept cash, credit cards, and pet insurance (with approved claims).
                    </p>
                  </div>
                  <div className="flex items-start p-4 bg-teal-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg mr-4">
                      <span className="font-semibold text-teal-600">§3.2</span>
                    </div>
                    <p className="text-gray-700">
                      Estimates are provided for planned procedures but may vary based on actual findings during treatment.
                    </p>
                  </div>
                  <div className="flex items-start p-4 bg-teal-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg mr-4">
                      <span className="font-semibold text-teal-600">§3.3</span>
                    </div>
                    <p className="text-gray-700">
                      A $50 deposit may be required for surgical procedures, applied to your final bill.
                    </p>
                  </div>
                  <div className="flex items-start p-4 bg-teal-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg mr-4">
                      <span className="font-semibold text-teal-600">§3.4</span>
                    </div>
                    <p className="text-gray-700">
                      Late payments may incur a 1.5% monthly finance charge and accounts over 60 days may be sent to collections.
                    </p>
                  </div>
                </div>
              </div>

              {/* Limitations */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <AlertTriangle className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">4. Limitations of Liability</h2>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                  <h3 className="font-semibold text-red-800 mb-3">Important Disclaimer</h3>
                  <p className="text-red-700 mb-4">
                    While we strive to provide the highest quality care, PetCare cannot guarantee specific treatment outcomes or cure of any condition. Veterinary medicine involves inherent risks that you acknowledge.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-red-700">
                    <li>We are not liable for unforeseeable complications or pre-existing conditions</li>
                    <li>We are not responsible for animals left unattended in our facility beyond treatment hours</li>
                    <li>We reserve the right to refuse service for safety or other professional reasons</li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">5. Intellectual Property</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Ownership</h3>
                    <p className="text-gray-600">
                      All medical records, treatment plans, and diagnostic images remain the property of PetCare, though you may request copies for personal use.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Website Content</h3>
                    <p className="text-gray-600">
                      All content on our website including text, graphics, logos is our property and protected by copyright laws.
                    </p>
                  </div>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Clipboard className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">6. Changes to Terms</h2>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <p className="text-gray-700">
                    We may update these Terms periodically. The revised version will be effective immediately when posted on our website. Your continued use of our services constitutes acceptance of the updated Terms.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-8 md:p-10 bg-teal-50">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Terms?</h2>
                  <p className="text-gray-600 mb-6">
                    If you have any questions about these Terms of Service, please contact our office manager.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="mailto:office@PetCare.com"
                      className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      office@PetCare.com
                    </a>
                    <a
                      href="tel:+15551234567"
                      className="bg-white hover:bg-gray-100 text-teal-600 py-3 px-6 rounded-lg font-medium border border-teal-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            These Terms of Service were last updated on January 15, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;