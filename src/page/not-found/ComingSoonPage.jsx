import React, { useState, useEffect } from "react";
import { Mail, Bell, Clock } from "lucide-react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Content */}
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <div className="animate-fade-in">
            <div className="w-20 h-20 bg-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-4">
              Coming Soon
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We're crafting something amazing for you. Stay tuned for an
              experience that will exceed your expectations.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-4 md:space-x-8 animate-slide-up">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-teal-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                    {value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm md:text-base text-slate-500 capitalize font-medium">
                    {unit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto animate-fade-in-delay">
            {!isSubscribed ? (
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300 text-slate-700 bg-white shadow-sm"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Bell className="w-5 h-5" />
                  <span>Notify Me When Ready</span>
                </button>
              </div>
            ) : (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 animate-bounce-in">
                <div className="flex items-center justify-center space-x-2 text-teal-700">
                  <Bell className="w-5 h-5" />
                  <span className="font-semibold">Thanks for subscribing!</span>
                </div>
                <p className="text-teal-600 mt-2">
                  We'll notify you as soon as we launch.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-200 animate-fade-in-delay-2">
            <p className="text-slate-500 text-sm">
              Follow us for updates and behind-the-scenes content
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-400 hover:text-teal-600 transition-colors duration-300 text-sm font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.9s both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
