import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  symptoms as symptomsData,
  diseases as diseasesData,
} from "../utitlities/SymtomsDiseaseList";

const SymptomsDiseasesSection = ({ symptoms = [], diseases = [] }) => {
  const symptomsRef = useRef(null);
  const diseasesRef = useRef(null);
  const navigate = useNavigate();

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
    // Use data from Redux if available, otherwise use static data
    if (symptoms.length > 0) {
      return symptoms.slice(0, 6).map((symptom) => ({
        id: symptom.id,
        name: symptom.name.toUpperCase(),
        icon: getIconByCategory(symptom.category),
        color: getSeverityColor(symptom.severity),
        category: symptom.category,
        severity: symptom.severity,
        originalData: symptom,
      }));
    } else {
      // Use static data from utils
      return symptomsData.slice(0, 6).map((symptom) => ({
        id: symptom.id,
        name: symptom.name.toUpperCase(),
        icon: getIconByCategory(symptom.category),
        color: getSeverityColor(symptom.severity),
        category: symptom.category,
        severity: symptom.severity,
        originalData: symptom,
      }));
    }
  };

  // Map diseases data to display format
  const getDisplayDiseases = () => {
    // Use data from Redux if available, otherwise use static data
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
        originalData: disease,
      }));
    }
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
      aural: Eye,
      inflammatory: Activity,
      genetic: Activity,
      renal: Activity,
      allergic: Activity,
      neoplastic: Heart,
      hepatic: Thermometer,
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

  // Handle symptom/disease click - navigate to search results
  const handleItemClick = (item, type) => {
    console.log(`${type} clicked:`, item);

    // Navigate to search results with the item name as query
    navigate("/search-results", {
      state: {
        query: item.originalData.name,
        type: type,
        searchCategory: item.category,
        originalItem: item.originalData,
      },
    });
  };

  // Handle "View All" click
  const handleViewAllClick = (type) => {
    const allData = type === "symptoms" ? symptomsData : diseasesData;
    navigate("/search-results", {
      state: {
        query: "",
        type: type,
        showAll: true,
        allItems: allData,
      },
    });
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
            <button
              onClick={() => handleViewAllClick("symptoms")}
              className="flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors group"
            >
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
                    className={`${symptom.color} text-white rounded-xl p-6 min-w-[280px] sm:min-w-[320px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden`}
                  >
                    {/* Background decoration */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>

                    <div className="flex items-center relative z-10">
                      <div className="bg-white/20 rounded-full p-3 mr-4 backdrop-blur-sm">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold tracking-wide mb-1">
                          {symptom.name}
                        </h3>
                        {symptom.category && (
                          <p className="text-sm opacity-90 capitalize mb-2">
                            {symptom.category.replace("_", " ")}
                          </p>
                        )}
                        <div className="flex items-center space-x-2">
                          {symptom.severity && (
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize font-medium">
                              {symptom.severity}
                            </span>
                          )}
                          <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                            Click to find vets
                          </span>
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
                onClick={() => scrollLeft(symptomsRef)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 rotate-180 text-gray-600" />
              </button>
              <button
                onClick={() => scrollRight(symptomsRef)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
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
            <button
              onClick={() => handleViewAllClick("diseases")}
              className="flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors group"
            >
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
              {displayDiseases?.map((disease, index) => {
                const IconComponent = disease.icon;
                return (
                  <div
                    key={disease.id || index}
                    onClick={() => handleItemClick(disease, "disease")}
                    className={`${disease.color} text-white rounded-xl p-6 min-w-[280px] sm:min-w-[320px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden`}
                  >
                    {/* Background decoration */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>

                    <div className="flex items-center relative z-10">
                      <div className="bg-white/20 rounded-full p-3 mr-4 backdrop-blur-sm">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold tracking-wide mb-1">
                          {disease.name}
                        </h3>
                        {disease.category && (
                          <p className="text-sm opacity-90 capitalize mb-2">
                            {disease.category.replace("_", " ")}
                          </p>
                        )}
                        <div className="flex items-center flex-wrap gap-1">
                          {disease.severity && (
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize font-medium">
                              {disease.severity}
                            </span>
                          )}
                          {disease.contagious && (
                            <span className="text-xs bg-red-400/30 px-2 py-1 rounded-full">
                              Contagious
                            </span>
                          )}
                          {disease.zoonotic && (
                            <span className="text-xs bg-orange-400/30 px-2 py-1 rounded-full">
                              Zoonotic
                            </span>
                          )}
                        </div>
                        <div className="mt-2">
                          <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                            Click to find specialists
                          </span>
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
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 rotate-180 text-gray-600" />
              </button>
              <button
                onClick={() => scrollRight(diseasesRef)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Need Help Finding the Right Care?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Observe Symptoms
              </h4>
              <p className="text-gray-600 text-sm">
                Click on any symptom above to find veterinarians who specialize
                in treating that condition.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Get Diagnosis
              </h4>
              <p className="text-gray-600 text-sm">
                Click on diseases to find specialists who can help diagnose and
                treat specific conditions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Start Treatment
              </h4>
              <p className="text-gray-600 text-sm">
                Book appointments with qualified veterinarians and start your
                pet's journey to better health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsDiseasesSection;
