// pages/SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  User,
  MapPin,
  Clock,
  Star,
  Calendar,
  DollarSign,
  ChevronDown,
  Grid,
  List,
  ArrowLeft,
} from "lucide-react";
import { useFilteredVets, useDebouncedSearch } from "../../hooks/useHomepage";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get search data from location state or URL params
  const searchQuery =
    location.state?.query ||
    new URLSearchParams(location.search).get("q") ||
    "";
  const searchType = location.state?.type || "all";
  const initialResults = location.state?.results || [];

  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    specialization: "",
    minFee: "",
    maxFee: "",
    availability: "",
    rating: "",
  });

  const {
    vets,
    loading,
    error,
    pagination,
    currentFilters,
    applyFilters,
    nextPage,
    prevPage,
    goToPage,
  } = useFilteredVets();

  // Apply initial search on mount
  useEffect(() => {
    if (searchQuery) {
      const searchFilters = {
        page: 1,
        limit: 12,
      };

      // Apply search based on type
      if (searchType === "specialty" || searchType === "specialization") {
        searchFilters.specialization = searchQuery;
      } else if (searchType === "name" || searchType === "vet") {
        searchFilters.name = searchQuery;
      } else {
        // Try both if type is 'all' or unknown
        searchFilters.specialization = searchQuery;
      }

      applyFilters(searchFilters);
    }
  }, [searchQuery, searchType, applyFilters]);

  // Handle filter application
  const handleApplyFilters = () => {
    const newFilters = {
      ...currentFilters,
      ...filters,
      page: 1, // Reset to first page
    };

    // Remove empty filters
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] === "" || newFilters[key] === null) {
        delete newFilters[key];
      }
    });

    applyFilters(newFilters);
    setShowFilters(false);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      specialization: "",
      minFee: "",
      maxFee: "",
      availability: "",
      rating: "",
    });

    applyFilters({
      page: 1,
      limit: 12,
      ...(searchQuery && { specialization: searchQuery }),
    });
  };

  // Handle vet card click
  const handleVetClick = (vet) => {
    navigate("/vet-details", { state: { vet } });
  };

  // Handle book appointment
  const handleBookAppointment = (vet, e) => {
    e.stopPropagation();
    navigate("/vet-details", { state: { vet, showBooking: true } });
  };

  // Format specialization
  const formatSpecialization = (specialization) => {
    return specialization
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get severity color for badges
  const getSeverityColor = (severity) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
      critical: "bg-red-200 text-red-900",
    };
    return colors[severity] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h1>
                {searchQuery && (
                  <p className="text-sm text-gray-600">
                    Results for "{searchQuery}" • {pagination.total}{" "}
                    veterinarians found
                  </p>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-teal-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-teal-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {/* Specialization Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <select
                    value={filters.specialization}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        specialization: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Specializations</option>
                    <option value="GENERAL_PRACTITIONER">
                      General Practitioner
                    </option>
                    <option value="VETERINARY_SURGEON">
                      Veterinary Surgeon
                    </option>
                    <option value="VETERINARY_CARDIOLOGIST">
                      Cardiologist
                    </option>
                    <option value="VETERINARY_DERMATOLOGIST">
                      Dermatologist
                    </option>
                    <option value="EMERGENCY_AND_CRITICAL_CARE_VET">
                      Emergency Care
                    </option>
                  </select>
                </div>

                {/* Consultation Fee Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minFee}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          minFee: e.target.value,
                        }))
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxFee}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxFee: e.target.value,
                        }))
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {vets.length} of {pagination.total} results
              </p>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="fee_low">Fee: Low to High</option>
                <option value="fee_high">Fee: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="text-red-600 text-lg font-medium mb-2">
                  Failed to load veterinarians
                </div>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Results Grid/List */}
            {!loading && !error && vets.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {vets.map((vet) => (
                  <div
                    key={vet._id}
                    onClick={() => handleVetClick(vet)}
                    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                      viewMode === "list" ? "p-6" : "p-4"
                    }`}
                  >
                    <div
                      className={`flex ${
                        viewMode === "list" ? "flex-row" : "flex-col"
                      }`}
                    >
                      {/* Vet Profile Image */}
                      <div
                        className={`${
                          viewMode === "list"
                            ? "w-20 h-20 mr-4"
                            : "w-full h-48 mb-4"
                        } flex-shrink-0`}
                      >
                        {vet.profilePicture ? (
                          <img
                            src={vet.profilePicture}
                            alt={`Dr. ${vet.firstName} ${vet.lastName}`}
                            className={`${
                              viewMode === "list"
                                ? "w-20 h-20 rounded-full"
                                : "w-full h-48 rounded-lg"
                            } object-cover`}
                          />
                        ) : (
                          <div
                            className={`${
                              viewMode === "list"
                                ? "w-20 h-20 rounded-full"
                                : "w-full h-48 rounded-lg"
                            } bg-teal-100 flex items-center justify-center`}
                          >
                            <User
                              className={`${
                                viewMode === "list" ? "w-10 h-10" : "w-16 h-16"
                              } text-teal-600`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Vet Information */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Dr. {vet.firstName} {vet.lastName}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {vet.gender === "MALE" ? "👨‍⚕️" : "👩‍⚕️"} Veterinarian
                            </p>
                          </div>
                          {vet.isActivated && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Available
                            </span>
                          )}
                        </div>

                        {/* Specializations */}
                        {vet.specialization &&
                          vet.specialization.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {vet.specialization
                                .slice(0, 2)
                                .map((spec, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-teal-100 text-teal-700"
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
                          )}

                        {/* Qualifications */}
                        {vet.qualifications &&
                          vet.qualifications.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm text-gray-600">
                                <strong>Education:</strong>{" "}
                                {vet.qualifications
                                  .map((qual) => qual.qualifications.join(", "))
                                  .join(", ")}
                              </p>
                            </div>
                          )}

                        {/* Contact Info */}
                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                          {vet.phoneNumber && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              Phone: {vet.phoneNumber}
                            </div>
                          )}
                          {vet.emailAddress && (
                            <div className="flex items-center">
                              <span className="w-4 h-4 mr-2">📧</span>
                              {vet.emailAddress}
                            </div>
                          )}
                        </div>

                        {/* Availability */}
                        {vet.availability && vet.availability.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Available:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {vet.availability
                                .slice(0, 3)
                                .map((avail, index) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                  >
                                    {avail.day}: {avail.startTime}-
                                    {avail.endTime}
                                  </span>
                                ))}
                              {vet.availability.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{vet.availability.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center text-lg font-semibold text-teal-600">
                            <DollarSign className="w-4 h-4" />
                            {vet.consultationFee || "Contact for pricing"}
                          </div>
                          <button
                            onClick={(e) => handleBookAppointment(vet, e)}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Book Appointment</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && vets.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No veterinarians found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading &&
              !error &&
              vets.length > 0 &&
              pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <span>
                      Showing page {pagination.currentPage} of{" "}
                      {pagination.totalPages}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevPage}
                      disabled={!pagination.hasPrevPage}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                      {Array.from(
                        { length: Math.min(5, pagination.totalPages) },
                        (_, i) => {
                          const page =
                            i + Math.max(1, pagination.currentPage - 2);
                          if (page > pagination.totalPages) return null;

                          return (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                page === pagination.currentPage
                                  ? "bg-teal-600 text-white"
                                  : "border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <button
                      onClick={nextPage}
                      disabled={!pagination.hasNextPage}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
