import React, { useState, useEffect } from "react";
import { MapPin, Search, ChevronDown, User } from "lucide-react";
import { useDebouncedSearch, useFilteredVets } from "../hooks/useHomepage";

const HeroSearchSection = ({
  availableVets = [],
  vetsLoading = false,
  vetsError = null,
}) => {
  const [searchType, setSearchType] = useState("Specialty");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Use search hooks
  const {
    results: searchResults,
    loading: searchLoading,
    search,
    clearResults,
    searchStats,
  } = useDebouncedSearch(300);

  const { applyFilters } = useFilteredVets();

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      search(value);
      setShowResults(true);
    } else {
      clearResults();
      setShowResults(false);
    }
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Apply filters based on search type
      const filters = {
        page: 1,
        limit: 10,
      };

      if (searchType === "Specialty") {
        filters.specialization = searchQuery;
      } else if (searchType === "VET") {
        filters.name = searchQuery;
      }

      applyFilters(filters);
      setShowResults(false);

      // You might want to navigate to a search results page here
      // navigate('/find-doctor', { state: { filters, results: searchResults } });
    }
  };

  // Handle search result click
  const handleResultClick = (vet) => {
    setSearchQuery(`${vet.firstName} ${vet.lastName}`);
    setShowResults(false);

    // You might want to navigate to vet detail page or show vet info
    console.log("Selected vet:", vet);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format specialization for display
  const formatSpecialization = (specialization) => {
    return specialization
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-teal-100 to-teal-200 overflow-hidden">
      {/* Background placeholder - you can replace this with your background image */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/80 to-teal-200/80">
        {/* Add your background image here */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            FIND THE BEST DOCTOR NEAR YOU
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 search-container relative">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Location Dropdown */}
              <div className="flex items-center bg-teal-600 text-white px-4 py-4 sm:py-3 min-w-0 sm:min-w-[200px]">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <select
                  className="bg-transparent text-white outline-none flex-1 appearance-none cursor-pointer"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="Specialty" className="text-gray-800">
                    Specialty
                  </option>
                  <option value="Disease" className="text-gray-800">
                    Disease
                  </option>
                  <option value="VET" className="text-gray-800">
                    VET
                  </option>
                </select>
                <ChevronDown className="w-5 h-5 ml-2 flex-shrink-0" />
              </div>

              {/* Search Input */}
              <div className="flex-1 flex items-center relative">
                <input
                  type="text"
                  placeholder={`SEARCH BY ${searchType.toUpperCase()}${
                    searchType === "VET" ? "S" : ""
                  }`}
                  className="flex-1 px-4 py-4 sm:py-3 text-gray-700 placeholder-gray-500 outline-none text-sm sm:text-base"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                />
                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white p-4 sm:p-3 transition-colors"
                  onClick={handleSearchSubmit}
                  disabled={searchLoading}
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Search Results Dropdown */}
                {showResults && (searchResults.length > 0 || searchLoading) && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                          <span>Searching...</span>
                        </div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((vet) => (
                          <div
                            key={vet._id}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleResultClick(vet)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-teal-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">
                                  {vet.firstName} {vet.lastName}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {vet.specialization
                                    .slice(0, 2)
                                    .map((spec, index) => (
                                      <span
                                        key={index}
                                        className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded"
                                      >
                                        {formatSpecialization(spec)}
                                      </span>
                                    ))}
                                  {vet.specialization.length > 2 && (
                                    <span className="text-xs text-gray-500">
                                      +{vet.specialization.length - 2} more
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  ${vet.consultationFee} consultation
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="p-3 bg-gray-50 border-t">
                          <button
                            onClick={handleSearchSubmit}
                            className="w-full text-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                          >
                            View All Results ({searchStats.resultCount})
                          </button>
                        </div>
                      </>
                    ) : (
                      searchQuery.trim() && (
                        <div className="p-4 text-center text-gray-500">
                          No results found for "{searchQuery}"
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
            HOW CAN WE HELP YOU TODAY?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {vetsLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-teal-600 rounded-lg p-6 text-white shadow-lg animate-pulse"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-white/20 rounded mb-2"></div>
                    <div className="h-3 bg-white/20 rounded mb-1 w-3/4"></div>
                    <div className="h-3 bg-white/20 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : vetsError ? (
            // Error state
            <div className="col-span-full text-center py-8">
              <div className="text-red-600 mb-2">Failed to load doctors</div>
              <button
                onClick={() => window.location.reload()}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Try Again
              </button>
            </div>
          ) : availableVets.length > 0 ? (
            // Display actual vets data
            availableVets.slice(0, 3).map((vet) => (
              <div
                key={vet._id}
                className="bg-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    {vet.profilePicture ? (
                      <img
                        src={vet.profilePicture}
                        alt={`Dr. ${vet.firstName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">
                      DR. {vet.firstName.toUpperCase()}{" "}
                      {vet.lastName.toUpperCase()}
                    </h3>
                    <p className="text-sm opacity-90">
                      {vet.specialization.length > 0
                        ? formatSpecialization(vet.specialization[0])
                        : "GENERAL VETERINARIAN"}
                    </p>
                    <p className="text-xs opacity-80">
                      ${vet.consultationFee || "Contact for pricing"}{" "}
                      CONSULTATION
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Default placeholder cards when no vets available
            <>
              {/* Dr. Paws */}
              <div className="bg-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">DR. PAWS</h3>
                    <p className="text-sm opacity-90">DENTIST</p>
                    <p className="text-xs opacity-80">13 YEAR EXPERIENCE</p>
                  </div>
                </div>
              </div>

              {/* Dr. Whiskers */}
              <div className="bg-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">DR. WHISKERS</h3>
                    <p className="text-sm opacity-90">EYES</p>
                    <p className="text-xs opacity-80">23 YEAR EXPERIENCE</p>
                  </div>
                </div>
              </div>

              {/* Dr. Petpulse */}
              <div className="bg-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">DR. PETPULSE</h3>
                    <p className="text-sm opacity-90">EAR MITES</p>
                    <p className="text-xs opacity-80">25 YEAR EXPERIENCE</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSearchSection;
