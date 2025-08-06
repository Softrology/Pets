import React, { useRef, useEffect } from "react";
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

const SymptomsDiseasesSection = ({ symptoms = [], diseases = [] }) => {
  const symptomsRef = useRef(null);
  const diseasesRef = useRef(null);

  // Default symptoms if none provided from Redux
  const defaultSymptoms = [
    { name: "LOSS OF APPETITE", icon: Heart, color: "bg-teal-600" },
    { name: "HOT EARS OR NOSE", icon: Thermometer, color: "bg-teal-600" },
    { name: "BAD BREATH", icon: Wind, color: "bg-teal-600" },
    { name: "SWOLLEN EYES", icon: Eye, color: "bg-teal-600" },
    { name: "FEVER", icon: Activity, color: "bg-teal-600" },
    { name: "LETHARGY", icon: Brain, color: "bg-teal-600" },
  ];

  // Default diseases if none provided from Redux
  const defaultDiseases = [
    { name: "HEARTWORM DISEASE", icon: Heart, color: "bg-teal-600" },
    { name: "HYPOTHYROIDISM", icon: Zap, color: "bg-teal-600" },
    { name: "BRUCELLOSIS", icon: Stethoscope, color: "bg-teal-600" },
    { name: "ASPERGILLOSIS", icon: Activity, color: "bg-teal-600" },
    { name: "DIABETES", icon: Activity, color: "bg-teal-600" },
    { name: "ARTHRITIS", icon: Activity, color: "bg-teal-600" },
  ];

  // Map symptoms data to display format
  const getDisplaySymptoms = () => {
    if (symptoms.length > 0) {
      return symptoms.slice(0, 6).map((symptom) => ({
        id: symptom.id,
        name: symptom.name.toUpperCase(),
        icon: getIconByCategory(symptom.category),
        color: getSeverityColor(symptom.severity),
        category: symptom.category,
        severity: symptom.severity,
      }));
    }
    return defaultSymptoms;
  };

  // Map diseases data to display format
  const getDisplayDiseases = () => {
    if (diseases.length > 0) {
      return diseases.slice(0, 6).map((disease) => ({
        id: disease.id,
        name: disease.name.toUpperCase(),
        icon: getIconByCategory(disease.category),
        color: getSeverityColor(disease.severity),
        category: disease.category,
        severity: disease.severity,
        contagious: disease.contagious,
        zoonotic: disease.zoonotic,
      }));
    }
    return defaultDiseases;
  };

  // Helper function to get icon based on category
  const getIconByCategory = (category) => {
    const iconMap = {
      respiratory: Activity,
      cardiac: Heart,
      digestive: Thermometer,
      neurological: Brain,
      ocular: Eye,
      dental: Wind,
      behavioral: Brain,
      dermatological: Activity,
      musculoskeletal: Activity,
      urinary: Activity,
      metabolic: Zap,
      endocrine: Zap,
      viral: Stethoscope,
      bacterial: Stethoscope,
      parasitic: Activity,
      default: Activity,
    };
    return iconMap[category] || iconMap.default;
  };

  // Helper function to get color based on severity
  const getSeverityColor = (severity) => {
    const colorMap = {
      low: "bg-teal-500",
      medium: "bg-teal-600",
      high: "bg-red-600",
      critical: "bg-red-700",
      default: "bg-teal-600",
    };
    return colorMap[severity] || colorMap.default;
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Handle symptom/disease click
  const handleItemClick = (item, type) => {
    console.log(`${type} clicked:`, item);
    // You can implement navigation to detail page or modal here
    // For example: navigate(`/${type}-detail/${item.id}`);
  };

  const displaySymptoms = getDisplaySymptoms();
  const displayDiseases = getDisplayDiseases();

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
              {displaySymptoms.map((symptom, index) => {
                const IconComponent = symptom.icon;
                return (
                  <div
                    key={symptom.id || index}
                    onClick={() => handleItemClick(symptom, "symptom")}
                    className={`${symptom.color} text-white rounded-xl p-6 min-w-[280px] sm:min-w-[320px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <div className="bg-white/20 rounded-full p-3 mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold tracking-wide">
                          {symptom.name}
                        </h3>
                        {symptom.category && (
                          <p className="text-sm opacity-90 capitalize">
                            {symptom.category.replace("_", " ")}
                          </p>
                        )}
                        {symptom.severity && (
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-white/20 px-2 py-1 rounded capitalize">
                              {symptom.severity}
                            </span>
                          </div>
                        )}
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
              {displayDiseases.map((disease, index) => {
                const IconComponent = disease.icon;
                return (
                  <div
                    key={disease.id || index}
                    onClick={() => handleItemClick(disease, "disease")}
                    className={`${disease.color} text-white rounded-xl p-6 min-w-[280px] sm:min-w-[320px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <div className="bg-white/20 rounded-full p-3 mr-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold tracking-wide">
                          {disease.name}
                        </h3>
                        {disease.category && (
                          <p className="text-sm opacity-90 capitalize">
                            {disease.category.replace("_", " ")}
                          </p>
                        )}
                        <div className="flex items-center mt-1 space-x-2">
                          {disease.severity && (
                            <span className="text-xs bg-white/20 px-2 py-1 rounded capitalize">
                              {disease.severity}
                            </span>
                          )}
                          {disease.contagious && (
                            <span className="text-xs bg-red-400/30 px-2 py-1 rounded">
                              Contagious
                            </span>
                          )}
                          {disease.zoonotic && (
                            <span className="text-xs bg-orange-400/30 px-2 py-1 rounded">
                              Zoonotic
                            </span>
                          )}
                        </div>
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
