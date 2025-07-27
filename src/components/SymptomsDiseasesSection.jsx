import React, { useRef } from "react";
import {
  ChevronRight,
  Heart,
  Thermometer,
  Wind,
  Eye,
  Activity,
  Brain,
  Zap,
  Stethoscope,
} from "lucide-react";

const SymptomsDiseasesSection = () => {
  const symptomsRef = useRef(null);
  const diseasesRef = useRef(null);

  const symptoms = [
    { name: "LOSS OF APPETITE", icon: Heart, color: "bg-teal-600" },
    { name: "HOT EARS OR NOSE", icon: Thermometer, color: "bg-teal-600" },
    { name: "BAD BREATH", icon: Wind, color: "bg-teal-600" },
    { name: "SWOLLEN EYES", icon: Eye, color: "bg-teal-600" },
    { name: "FEVER", icon: Activity, color: "bg-teal-600" },
    { name: "LETHARGY", icon: Brain, color: "bg-teal-600" },
  ];

  const diseases = [
    { name: "HEARTWORM DISEASE", icon: Heart, color: "bg-teal-600" },
    { name: "HYPOTHYROIDISM", icon: Zap, color: "bg-teal-600" },
    { name: "BRUCELLOSIS", icon: Stethoscope, color: "bg-teal-600" },
    { name: "ASPERGILLOSIS", icon: Activity, color: "bg-teal-600" },
    { name: "DIABETES", icon: Activity, color: "bg-teal-600" },
    { name: "ARTHRITIS", icon: Activity, color: "bg-teal-600" },
  ];

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Symptoms Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-500">
              SYMPTOMS
            </h2>
            <button className="flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors group">
              VIEW ALL
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative">
            <div
              ref={symptomsRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {symptoms.map((symptom, index) => {
                const IconComponent = symptom.icon;
                return (
                  <div
                    key={index}
                    className={`${symptom.color} text-white rounded-xl p-6 min-w-[280px] sm:min-w-[320px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <div className="bg-white/20 rounded-full p-3 mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-wide">
                          {symptom.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll buttons for larger screens */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollLeft(symptomsRef)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 rotate-180 text-gray-600" />
              </button>
              <button
                onClick={() => scrollRight(symptomsRef)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Diseases Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-500">
              DISEASES
            </h2>
            <button className="flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors group">
              VIEW ALL
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative">
            <div
              ref={diseasesRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {diseases.map((disease, index) => {
                const IconComponent = disease.icon;
                return (
                  <div
                    key={index}
                    className={`${disease.color} text-white rounded-xl p-6 min-w-[280px] sm:min-w-[320px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <div className="bg-white/20 rounded-full p-3 mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-wide">
                          {disease.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll buttons for larger screens */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollLeft(diseasesRef)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 rotate-180 text-gray-600" />
              </button>
              <button
                onClick={() => scrollRight(diseasesRef)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsDiseasesSection;
