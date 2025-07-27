import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { mutate: login } = useLogin();

  const [formData, setFormData] = useState({
    emailAddress: location.state?.emailAddress || "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.emailAddress || !formData.password) {
      return;
    }
    // Remove the onError handler since useLogin hook handles it
    login(formData);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative header */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 py-6 px-6">
            <div className="flex justify-center">
              <Link to="/" className="inline-block">
                <h2 className="text-2xl font-bold text-white">PetCare</h2>
              </Link>
            </div>
            <h2 className="mt-2 text-center text-xl font-bold text-white">
              Welcome Back!
            </h2>
            <p className="mt-1 text-center text-indigo-100 text-sm">
              Sign in to continue to your account
            </p>
          </div>

          <div className="p-6">
            {/* Success Message */}
            {showMessage && location.state?.message && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-green-700">
                        {location.state.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && error.response?.data?.statusCode !== 403 && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-red-700">
                        {error || error.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-3 py-2 text-sm rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="your@email.com"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaEnvelope className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 text-sm rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaLock className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-teal-600 to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in <FaChevronRight className="ml-1 h-3 w-3" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <Link
                  to="/signup"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-600">
          <p>
            By signing in, you agree to our{" "}
            <Link
              to="/terms"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
