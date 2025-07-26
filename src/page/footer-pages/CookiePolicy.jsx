import React from 'react';
import { Cookie, Shield, Settings, ToggleRight, List, Mail, Phone, Clock, Clipboard } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Cookie className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Cookie <span className="text-teal-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we use cookies and similar technologies to enhance your experience with PetCare.
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
                  Last Updated: January 15, 2025
                </p>
                <p className="text-gray-700">
                  This Cookie Policy explains how PetCare ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our website or use our online services. By continuing to browse our site, you agree to our use of cookies as described in this policy.
                </p>
              </div>

              {/* What Are Cookies */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Cookie className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">1. What Are Cookies?</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Small Text Files</h3>
                    <p className="text-gray-600">
                      Cookies are small text files placed on your device when you visit websites. They help the site remember information about your visit.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Various Functions</h3>
                    <p className="text-gray-600">
                      Cookies enable features like remembering your preferences, analyzing site usage, and supporting marketing efforts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Types of Cookies */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <List className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">2. Types of Cookies We Use</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-teal-600 text-white p-2 rounded-lg mr-4">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
                    </div>
                    <p className="text-gray-600 ml-14">
                      Necessary for the website to function. They enable core functionality like security, network management, and accessibility. You cannot opt-out of these.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-teal-600 text-white p-2 rounded-lg mr-4">
                        <Settings className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Preference Cookies</h3>
                    </div>
                    <p className="text-gray-600 ml-14">
                      Remember your choices (like language or region) to provide enhanced, more personalized features.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-teal-600 text-white p-2 rounded-lg mr-4">
                        <ToggleRight className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Analytics Cookies</h3>
                    </div>
                    <p className="text-gray-600 ml-14">
                      Help us understand how visitors interact with our website by collecting anonymous information. This helps us improve our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookie Duration */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">3. Cookie Duration</h2>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <span className="text-teal-600 font-bold">24h</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Session Cookies</h3>
                      <p className="text-gray-600 text-sm">
                        Temporary cookies that expire when you close your browser
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <span className="text-teal-600 font-bold">30d</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Short-term</h3>
                      <p className="text-gray-600 text-sm">
                        Persist for several days to remember your preferences
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <span className="text-teal-600 font-bold">2y</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">Persistent</h3>
                      <p className="text-gray-600 text-sm">
                        Remain for longer periods for analytics and marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Managing Cookies */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Settings className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">4. Managing Cookies</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Browser Settings</h3>
                    <p className="text-gray-600">
                      Most browsers allow you to control cookies through their settings. You can set your browser to refuse all or some cookies, or to alert you when websites set or access cookies.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Opt-Out Tools</h3>
                    <p className="text-gray-600">
                      For analytics and advertising cookies, you can use tools like the Digital Advertising Alliance's opt-out page or the Network Advertising Initiative opt-out page.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Our Cookie Consent</h3>
                    <p className="text-gray-600">
                      When you first visit our website, you'll see our cookie consent banner where you can manage your preferences for non-essential cookies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">5. Third-Party Cookies</h2>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <p className="text-gray-700 mb-4">
                    We may use services from third parties that set their own cookies, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><strong>Google Analytics:</strong> For understanding how visitors use our site</li>
                    <li><strong>Facebook Pixel:</strong> For measuring the effectiveness of our ads</li>
                    <li><strong>Hotjar:</strong> For improving user experience through heatmaps</li>
                    <li><strong>Calendly:</strong> For scheduling appointments online</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    These third parties have their own privacy policies and we don't control how they use cookies.
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div className="p-8 md:p-10">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Clipboard className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">6. Changes to This Policy</h2>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-lg p-6">
                  <p className="text-gray-700">
                    We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this Cookie Policy periodically for any changes.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-8 md:p-10 bg-teal-50">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Cookie Policy?</h2>
                  <p className="text-gray-600 mb-6">
                    If you have any questions about how we use cookies or other tracking technologies, please contact us.
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
            This Cookie Policy was last updated on January 15, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;