import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

const MedicalRecordFilters = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  showFilters,
  setShowFilters,
  recordTypes,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by pet name, vet, or health center..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
          <ChevronDown
            className={`h-4 w-4 ml-2 transform transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Record Type Filter
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {recordTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordFilters;
