import React from 'react';
import { Shield, Lock, EyeOff, Mail, User, Clipboard, Server, Heart, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Privacy <span className="text-teal-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trust is important to us. Learn how we protect your information at PetCare.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Policy Sections */}
            <div className="divide-y divide-gray-200">
              {/* Introduction */}
              <div className="p-8 md:p-10">
                <p className="text-gray-600 mb-6">
                  Last updated: January 15, 2025
                </p>
                <p className="text-gray-700">
                  At PetCare, we are committed to protecting the privacy and security of our clients' and patients' information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our clinics, use our website, or interact with our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Clipboard className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
                    <p className="text-gray-600 mt-2">
                      We may collect personal information about you and your pet in various ways:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <User className="w-5 h-5 text-teal-600 mr-2" />
                      <h3 className="font-semibold text-gray-800">Personal Information</h3>
                    </div>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Your name, contact details, and address</li>
                      <li>Payment and insurance information</li>
                      <li>Medical history and treatment records</li>
                      <li>Emergency contact details</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <Server className="w-5 h-5 text-teal-600 mr-2" />
                      <h3 className="font-semibold text-gray-800">Technical Information</h3>
                    </div>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>IP address and browser type when using our website</li>
                      <li>Appointment scheduling interactions</li>
                      <li>Cookies and usage data (with your consent)</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Lock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">2. How We Use Information</h2>
                    <p className="text-gray-600 mt-2">
                      Your information helps us provide the best possible care for your pet:
                    </p>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <Heart className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Medical Care</h3>
                        <p className="text-gray-600 text-sm">Providing veterinary services and treatment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <Mail className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Communication</h3>
                        <p className="text-gray-600 text-sm">Sending appointment reminders and health updates</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <Shield className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Security</h3>
                        <p className="text-gray-600 text-sm">Protecting against fraud and unauthorized access</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <Clipboard className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Records</h3>
                        <p className="text-gray-600 text-sm">Maintaining accurate medical histories</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <User className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Personalization</h3>
                        <p className="text-gray-600 text-sm">Tailoring our services to your needs</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <EyeOff className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Compliance</h3>
                        <p className="text-gray-600 text-sm">Meeting legal and regulatory requirements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <EyeOff className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">3. Information Sharing</h2>
                    <p className="text-gray-600 mt-2">
                      We value your privacy and only share information when necessary:
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">With Your Consent</h3>
                    <p className="text-gray-600">
                      We may share information with other veterinary specialists or pet insurance providers only with your explicit permission.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">For Medical Treatment</h3>
                    <p className="text-gray-600">
                      Your pet's medical information may be shared with emergency clinics or specialists when necessary for continuing care.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Legal Requirements</h3>
                    <p className="text-gray-600">
                      We may disclose information when required by law, such as in response to court orders or public health requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Lock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">4. Data Security</h2>
                    <p className="text-gray-600 mt-2">
                      We implement robust security measures to protect your information:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Encryption</h3>
                    <p className="text-gray-600 text-sm">
                      All sensitive data is encrypted both in transit and at rest using industry-standard protocols.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <EyeOff className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Access Control</h3>
                    <p className="text-gray-600 text-sm">
                      Strict access controls ensure only authorized personnel can view your information.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Server className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Secure Systems</h3>
                    <p className="text-gray-600 text-sm">
                      Our systems are regularly audited and updated to protect against vulnerabilities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <User className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">5. Your Rights</h2>
                    <p className="text-gray-600 mt-2">
                      You have certain rights regarding your personal information:
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          Access
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          Request copies of your pet's medical records
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          Correction
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          Update inaccurate or incomplete information
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          Deletion
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          Request deletion of non-essential personal data
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          Objection
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          Opt-out of certain data processing activities
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          Portability
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          Request transfer of data to another provider
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Contact Us */}
              <div className="p-8 md:p-10 bg-teal-50">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Privacy Policy?</h2>
                  <p className="text-gray-600 mb-6">
                    If you have any questions about how we handle your information or would like to exercise your privacy rights, please contact our Privacy Officer.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="mailto:privacy@PetCare.com"
                      className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      privacy@PetCare.com
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
            This Privacy Policy was last updated on January 15, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;