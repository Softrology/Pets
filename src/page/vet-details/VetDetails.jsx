// pages/VetDetails.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Award,
  Stethoscope,
  Heart,
  CheckCircle,
  X,
  MessageCircle,
  Video,
} from "lucide-react";

const VetDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const vet = location.state?.vet;
  const showBooking = location.state?.showBooking || false;

  const [activeTab, setActiveTab] = useState("overview");
  const [showBookingModal, setShowBookingModal] = useState(showBooking);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("in-person");
  const [petDetails, setPetDetails] = useState({
    name: "",
    species: "",
    age: "",
    symptoms: "",
  });

  useEffect(() => {
    if (!vet) {
      navigate("/search-results");
    }
  }, [vet, navigate]);

  if (!vet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vet details...</p>
        </div>
      </div>
    );
  }

  // Format specialization
  const formatSpecialization = (specialization) => {
    return specialization
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get available dates (next 14 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Get available time slots for a specific day
  const getAvailableTimeSlots = (day) => {
    const dayName = day.toUpperCase();
    const availability = vet.availability?.find(
      (avail) => avail.day === dayName
    );

    if (!availability) return [];

    const slots = [];
    const start = availability.startTime;
    const end = availability.endTime;

    // Generate 30-minute slots
    const startHour = parseInt(start.split(":")[0]);
    const startMin = parseInt(start.split(":")[1]);
    const endHour = parseInt(end.split(":")[0]);
    const endMin = parseInt(end.split(":")[1]);

    for (
      let hour = startHour;
      hour < endHour || (hour === endHour && startMin < endMin);
      hour++
    ) {
      for (let min = 0; min < 60; min += 30) {
        if (hour === endHour && min >= endMin) break;
        if (hour === startHour && min < startMin) continue;

        const timeSlot = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeSlot);
      }
    }

    return slots;
  };

  // Handle booking submission
  const handleBookAppointment = (e) => {
    e.preventDefault();
    // Here you would normally send the booking data to your API
    console.log("Booking details:", {
      vet: vet._id,
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      pet: petDetails,
    });

    // Show success message and close modal
    alert("Appointment booked successfully!");
    setShowBookingModal(false);

    // Reset form
    setSelectedDate("");
    setSelectedTime("");
    setPetDetails({
      name: "",
      species: "",
      age: "",
      symptoms: "",
    });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "experience", label: "Experience", icon: Award },
    { id: "availability", label: "Availability", icon: Calendar },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Results
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Vet Info */}
          <div className="lg:col-span-2">
            {/* Vet Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Profile Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  {vet.profilePicture ? (
                    <img
                      src={vet.profilePicture}
                      alt={`Dr. ${vet.firstName} ${vet.lastName}`}
                      className="w-32 h-32 rounded-lg object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-teal-100 rounded-lg flex items-center justify-center shadow-md">
                      <User className="w-16 h-16 text-teal-600" />
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Dr. {vet.firstName} {vet.lastName}
                    </h1>
                    {vet.isActivated && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Available
                      </span>
                    )}
                    {vet.isApproved && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        <Award className="w-4 h-4 mr-1" />
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-lg text-gray-600 mb-4">
                    {vet.gender === "MALE" ? "👨‍⚕️" : "👩‍⚕️"} Veterinarian •{" "}
                    {vet.gender}
                  </p>

                  {/* Specializations */}
                  {vet.specialization && vet.specialization.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vet.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-700"
                        >
                          <Stethoscope className="w-4 h-4 mr-1" />
                          {formatSpecialization(spec)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-2 text-gray-600">
                    {vet.emailAddress && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{vet.emailAddress}</span>
                        {vet.isEmailVerified && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                      </div>
                    )}
                    {vet.phoneNumber && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{vet.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
              {/* Tab Headers */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                          activeTab === tab.id
                            ? "border-teal-500 text-teal-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* About */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        About Dr. {vet.firstName}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Dr. {vet.firstName} {vet.lastName} is a dedicated
                        veterinarian with expertise in{" "}
                        {vet.specialization
                          ?.map((spec) => formatSpecialization(spec))
                          .join(", ") || "general veterinary medicine"}
                        .{vet.isEmailVerified && " Email verified."}{" "}
                        {vet.isApproved && " Board approved."}
                      </p>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-gray-500">Status</div>
                          <div className="font-semibold text-gray-900">
                            {vet.isActivated ? "Active" : "Inactive"}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-gray-500">
                            Verification
                          </div>
                          <div className="font-semibold text-gray-900">
                            {vet.isEmailVerified ? "Verified" : "Pending"}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-gray-500">Approval</div>
                          <div className="font-semibold text-gray-900">
                            {vet.isApproved ? "Approved" : "Pending"}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-sm text-gray-500">Joined</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(vet.createdAt).getFullYear()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    {vet.specialization && vet.specialization.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Specializations
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {vet.specialization.map((spec, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 bg-gray-50 rounded-lg"
                            >
                              <Heart className="w-5 h-5 text-teal-600 mr-3" />
                              <span className="font-medium">
                                {formatSpecialization(spec)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="space-y-6">
                    {/* Education */}
                    {vet.qualifications && vet.qualifications.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Education & Qualifications
                        </h3>
                        <div className="space-y-4">
                          {vet.qualifications.map((qual, index) => (
                            <div
                              key={index}
                              className="border-l-4 border-teal-500 pl-4 bg-gray-50 p-4 rounded-r-lg"
                            >
                              <h4 className="font-semibold text-gray-900 capitalize mb-2">
                                {qual.level.replace("_", " ")}
                              </h4>
                              <div className="space-y-1">
                                {qual.qualifications.map((q, qIndex) => (
                                  <p
                                    key={qIndex}
                                    className="text-gray-600 flex items-center"
                                  >
                                    <Award className="w-4 h-4 mr-2 text-teal-600" />
                                    {q.replace(/_/g, " ")}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.max(
                            1,
                            new Date().getFullYear() -
                              new Date(vet.createdAt).getFullYear()
                          )}
                          +
                        </div>
                        <div className="text-sm text-blue-600">
                          Years Experience
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                          500+
                        </div>
                        <div className="text-sm text-green-600">
                          Patients Treated
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {vet.specialization?.length || 1}
                        </div>
                        <div className="text-sm text-purple-600">
                          Specializations
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          24/7
                        </div>
                        <div className="text-sm text-orange-600">
                          Emergency Care
                        </div>
                      </div>
                    </div>

                    {/* License Image */}
                    {vet.licenseImage && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Professional License
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <img
                            src={vet.licenseImage}
                            alt="Professional License"
                            className="max-w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "availability" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Weekly Schedule
                    </h3>
                    {vet.availability && vet.availability.length > 0 ? (
                      <div className="space-y-3">
                        {vet.availability.map((avail, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <Calendar className="w-5 h-5 text-teal-600 mr-3" />
                              <span className="font-medium text-gray-900">
                                {avail.day}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>
                                {avail.startTime} - {avail.endTime}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Availability information not provided.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Please contact the veterinarian directly for
                          scheduling.
                        </p>
                      </div>
                    )}

                    {/* Booking Guidelines */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Booking Guidelines
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Book at least 24 hours in advance</li>
                        <li>• Emergency appointments available</li>
                        <li>• Video consultations offered</li>
                        <li>• Cancellation policy: 2 hours notice required</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No reviews yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Be the first to leave a review for Dr. {vet.firstName}!
                      </p>
                      <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Write a Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  ${vet.consultationFee || "Contact for pricing"}
                </div>
                <p className="text-gray-600">Consultation Fee</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 py-2 px-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-2 px-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                    <Video className="w-4 h-4" />
                    <span>Video Call</span>
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="text-gray-900">Within 1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages:</span>
                    <span className="text-gray-900">English</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="text-gray-900">
                      {Math.max(
                        1,
                        new Date().getFullYear() -
                          new Date(vet.createdAt).getFullYear()
                      )}
                      + years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="text-gray-900">
                      {new Date(vet.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">
                  Emergency Contact
                </h4>
                <p className="text-sm text-red-800">
                  For urgent cases, call our 24/7 emergency hotline:
                  <span className="font-bold block mt-1">
                    +1 (555) 911-PETS
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Book Appointment
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="p-6 space-y-4">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Choose a date</option>
                  {getAvailableDates().map((date, index) => (
                    <option
                      key={index}
                      value={date.toISOString().split("T")[0]}
                    >
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Choose a time</option>
                    {getAvailableTimeSlots(
                      [
                        "SUNDAY",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY",
                      ][new Date(selectedDate).getDay()]
                    ).map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType("in-person")}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      consultationType === "in-person"
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <MapPin className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">In-Person</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationType("video")}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      consultationType === "video"
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Video className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Video Call</div>
                  </button>
                </div>
              </div>

              {/* Pet Details */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Pet Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    value={petDetails.name}
                    onChange={(e) =>
                      setPetDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your pet's name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Species *
                    </label>
                    <select
                      value={petDetails.species}
                      onChange={(e) =>
                        setPetDetails((prev) => ({
                          ...prev,
                          species: e.target.value,
                        }))
                      }
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select species</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="bird">Bird</option>
                      <option value="reptile">Reptile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={petDetails.age}
                      onChange={(e) =>
                        setPetDetails((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="e.g., 2 years"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms/Reason for Visit
                  </label>
                  <textarea
                    value={petDetails.symptoms}
                    onChange={(e) =>
                      setPetDetails((prev) => ({
                        ...prev,
                        symptoms: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Describe your pet's symptoms or reason for the visit"
                  />
                </div>
              </div>

              {/* Appointment Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <h4 className="font-medium text-teal-900 mb-2">
                    Appointment Summary
                  </h4>
                  <div className="space-y-1 text-sm text-teal-800">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Date: {new Date(selectedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Time: {selectedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      <span>
                        Type:{" "}
                        {consultationType === "in-person"
                          ? "In-Person Visit"
                          : "Video Consultation"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>Fee: ${vet.consultationFee}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    !selectedDate ||
                    !selectedTime ||
                    !petDetails.name ||
                    !petDetails.species
                  }
                  className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VetDetails;
