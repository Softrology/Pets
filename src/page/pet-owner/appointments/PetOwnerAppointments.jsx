// components/PetOwnerAppointments.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  User,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  X,
  Check,
  Ban,
  MessageSquare,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Phone,
  Mail,
  PawPrint,
} from "lucide-react";
import { get, patch } from "../../../services/apiService";
import {
  GET_ALL_PETOWNER_APPOINTMENTS,
  GET_SINGLE_PETOWNER_APPOINTMENTS,
  PETOWNER_CANCEL_APPOINTMENT,
} from "../../../services/apiRoutes";
import { getUserToken } from "../../../utitlities/Globals";
import AlertDialog from "../../../utitlities/Alert";

const PetOwnerAppointments = () => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelledReason, setCancelledReason] = useState("");
  const [expandedCards, setExpandedCards] = useState(new Set());

  const queryClient = useQueryClient();

  // Fetch all pet owner appointments
  const useGetAllPetOwnerAppointments = () => {
    return useQuery({
      queryKey: ["petOwnerAppointments"],
      queryFn: async () => {
        try {
          const response = await get(
            GET_ALL_PETOWNER_APPOINTMENTS,
            getUserToken()
          );
          return response.data || [];
        } catch (error) {
          console.error("Fetch appointments error:", error);
          throw error;
        }
      },
      onError: (error) => {
        AlertDialog("Error", error.message, "error");
      },
    });
  };

  // Fetch single appointment details
  const useGetSinglePetOwnerAppointment = (appointmentId) => {
    return useQuery({
      queryKey: ["petOwnerAppointment", appointmentId],
      queryFn: async () => {
        try {
          const response = await get(
            `${GET_SINGLE_PETOWNER_APPOINTMENTS}/${appointmentId}`,
            getUserToken()
          );
          return response.data;
        } catch (error) {
          console.error("Fetch appointment details error:", error);
          throw error;
        }
      },
      enabled: !!appointmentId,
      onError: (error) => {
        AlertDialog("Error", error.message, "error");
      },
    });
  };

  // Cancel appointment mutation
  const useCancelPetOwnerAppointment = () => {
    return useMutation({
      mutationFn: async ({ appointmentId, cancelledReason }) => {
        const response = await patch(
          `${PETOWNER_CANCEL_APPOINTMENT}/${appointmentId}`,
          { cancelledReason },
          getUserToken(),
          {
            "Content-Type": "application/json",
          }
        );
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Appointment cancelled successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["petOwnerAppointments"]);
        setShowCancelModal(false);
        setSelectedAppointment(null);
        setCancelledReason("");
      },
      onError: (error) => {
        console.error("Cancel appointment error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to cancel appointment";
        AlertDialog("Error", errorMessage, "error", 3000);
      },
    });
  };

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetAllPetOwnerAppointments();
  const { mutate: cancelAppointment, isLoading: isCancelling } =
    useCancelPetOwnerAppointment();

  // Filter appointments
  const filteredAppointments =
    appointments?.filter((appointment) => {
      const matchesStatus =
        selectedStatus === "ALL" ||
        appointment.appointmentStatus === selectedStatus;
      const matchesSearch =
        searchTerm === "" ||
        appointment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.vet?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    }) || [];

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "CONFIRMED":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "REJECTED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "COMPLETED":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "CONFIRMED":
        return <CheckCircle className="w-4 h-4" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4" />;
      case "CANCELLED":
        return <Ban className="w-4 h-4" />;
      case "COMPLETED":
        return <Check className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  // Get cancellation info
  const getCancellationInfo = (appointment) => {
    if (appointment.appointmentStatus !== "CANCELLED") return null;

    return {
      cancelledBy: appointment.cancelledBy,
      reason: appointment.cancelledReason,
      date: appointment.cancellationDate,
    };
  };

  // Handle cancel appointment
  const handleCancelAppointment = () => {
    if (!cancelledReason.trim()) {
      AlertDialog(
        "Error",
        "Please provide a reason for cancellation",
        "error",
        2000
      );
      return;
    }
    cancelAppointment({
      appointmentId: selectedAppointment._id,
      cancelledReason: cancelledReason.trim(),
    });
  };

  // Toggle card expansion
  const toggleCardExpansion = (appointmentId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(appointmentId)) {
      newExpanded.delete(appointmentId);
    } else {
      newExpanded.add(appointmentId);
    }
    setExpandedCards(newExpanded);
  };

  // Check if appointment can be cancelled
  const canCancelAppointment = (appointment) => {
    return (
      appointment.appointmentStatus === "PENDING" ||
      appointment.appointmentStatus === "CONFIRMED"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-teal-700 font-medium text-lg">Loading your appointments...</p>
          <p className="text-teal-600 mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-teal-100 max-w-md">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load appointments</h3>
          <p className="text-gray-600 mb-6">Please try again later</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-4">
            <Calendar className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Track and manage your pet's consultation appointments with our veterinary experts
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-teal-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500" />
              <input
                type="text"
                placeholder="Search by appointment ID or vet name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3.5 w-full border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-teal-50/50"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-teal-600" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-teal-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-teal-50/50"
              >
                <option value="ALL">All Appointments</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="REJECTED">Rejected</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        {filteredAppointments.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 text-center border border-teal-100 shadow-sm">
              <div className="text-2xl font-bold text-teal-700">{filteredAppointments.length}</div>
              <div className="text-xs text-teal-600 mt-1">Total</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-amber-100 shadow-sm">
              <div className="text-2xl font-bold text-amber-700">
                {filteredAppointments.filter(a => a.appointmentStatus === "PENDING").length}
              </div>
              <div className="text-xs text-amber-600 mt-1">Pending</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-teal-100 shadow-sm">
              <div className="text-2xl font-bold text-teal-700">
                {filteredAppointments.filter(a => a.appointmentStatus === "CONFIRMED").length}
              </div>
              <div className="text-xs text-teal-600 mt-1">Confirmed</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-rose-100 shadow-sm">
              <div className="text-2xl font-bold text-rose-700">
                {filteredAppointments.filter(a => a.appointmentStatus === "REJECTED" || a.appointmentStatus === "CANCELLED").length}
              </div>
              <div className="text-xs text-rose-600 mt-1">Cancelled</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-indigo-100 shadow-sm">
              <div className="text-2xl font-bold text-indigo-700">
                {filteredAppointments.filter(a => a.appointmentStatus === "COMPLETED").length}
              </div>
              <div className="text-xs text-indigo-600 mt-1">Completed</div>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="space-y-5">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center border border-teal-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-100 rounded-2xl mb-5">
                <Calendar className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {selectedStatus === "ALL"
                  ? "You don't have any appointments yet. Schedule one to get started!"
                  : `No ${selectedStatus.toLowerCase()} appointments found.`}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => {
              const isExpanded = expandedCards.has(appointment._id);
              const cancellationInfo = getCancellationInfo(appointment);

              return (
                <div
                  key={appointment._id}
                  className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  {/* Main Card Content */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Appointment #{appointment._id.slice(-8)}
                            </h3>
                          </div>
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                              appointment.appointmentStatus
                            )}`}
                          >
                            {getStatusIcon(appointment.appointmentStatus)}
                            <span className="ml-1.5">
                              {appointment.appointmentStatus}
                            </span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Stethoscope className="w-4 h-4 mr-2 text-teal-600" />
                            <span className="text-sm">Vet ID: {appointment.vet}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                            <span className="text-sm">
                              Created: {formatDateTime(appointment.createdAt).date}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <PawPrint className="w-4 h-4 mr-2 text-teal-600" />
                            <span className="text-sm">{appointment.pets?.length || 0} Pet(s)</span>
                          </div>
                        </div>

                        {/* Confirmed Date or Requested Slots */}
                        {appointment.appointmentStatus === "CONFIRMED" &&
                        appointment.appointmentConfirmedDate?.startTime ? (
                          <div className="mb-4 p-3 bg-teal-50 rounded-xl border border-teal-200">
                            <div className="flex items-center text-teal-800">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                Confirmed Time:
                              </span>
                            </div>
                            <p className="text-teal-700 mt-1 text-sm">
                              {
                                formatDateTime(
                                  appointment.appointmentConfirmedDate.startTime
                                ).date
                              }{" "}
                              at{" "}
                              {
                                formatDateTime(
                                  appointment.appointmentConfirmedDate.startTime
                                ).time
                              }{" "}
                              -{" "}
                              {
                                formatDateTime(
                                  appointment.appointmentConfirmedDate.endtime
                                ).time
                              }
                            </p>
                          </div>
                        ) : (
                          appointment.appointmentRequestsDates?.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Clock className="w-4 h-4 mr-1.5 text-teal-600" />
                                Requested Time Slots:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {appointment.appointmentRequestsDates
                                  .slice(0, 3)
                                  .map((slot, index) => (
                                    <span
                                      key={index}
                                      className="px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs border border-teal-100"
                                    >
                                      {formatDateTime(slot.startTime).time} -{" "}
                                      {formatDateTime(slot.endtime).time}
                                    </span>
                                  ))}
                                {appointment.appointmentRequestsDates.length >
                                  3 && (
                                  <span className="px-2.5 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs border border-teal-100">
                                    +
                                    {appointment.appointmentRequestsDates
                                      .length - 3}{" "}
                                    more
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        )}

                        {/* Cancellation Info */}
                        {cancellationInfo && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex items-center text-gray-800 mb-2">
                              <Ban className="w-4 h-4 mr-2 text-rose-600" />
                              <span className="font-medium">
                                Cancelled by:{" "}
                                {cancellationInfo.cancelledBy === "VET"
                                  ? "Veterinarian"
                                  : "You"}
                              </span>
                            </div>
                            {cancellationInfo.reason && (
                              <p className="text-gray-600 text-sm">
                                Reason: {cancellationInfo.reason}
                              </p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">
                              Cancelled on:{" "}
                              {formatDateTime(cancellationInfo.date).date}
                            </p>
                          </div>
                        )}

                        {/* Rejection Reason */}
                        {appointment.appointmentStatus === "REJECTED" &&
                          appointment.rejectedReason && (
                            <div className="mb-4 p-3 bg-rose-50 rounded-xl border border-rose-200">
                              <div className="flex items-center text-rose-800 mb-2">
                                <XCircle className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  Rejected by Veterinarian
                                </span>
                              </div>
                              <p className="text-rose-700 text-sm">
                                Reason: {appointment.rejectedReason}
                              </p>
                            </div>
                          )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                        <button
                          onClick={() => toggleCardExpansion(appointment._id)}
                          className="p-2.5 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-xl transition-colors flex items-center justify-center"
                          aria-label={isExpanded ? "Collapse details" : "Expand details"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                          <span className="ml-1.5 text-sm font-medium sr-only md:not-sr-only">
                            {isExpanded ? "Less" : "More"}
                          </span>
                        </button>

                        {canCancelAppointment(appointment) && (
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowCancelModal(true);
                            }}
                            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center"
                          >
                            <X className="w-4 h-4 mr-1.5" />
                            Cancel
                          </button>
                        )}

                        {appointment.appointmentStatus === "CONFIRMED" && (
                          <button className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center">
                            <Video className="w-4 h-4 mr-1.5" />
                            Join Call
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-teal-100 p-6 bg-teal-50/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* All Requested Time Slots */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-teal-600" />
                            All Requested Time Slots
                          </h4>
                          <div className="space-y-2">
                            {appointment.appointmentRequestsDates?.map(
                              (slot, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-teal-100 shadow-sm"
                                >
                                  <span className="text-sm">
                                    {formatDateTime(slot.startTime).date} at{" "}
                                    {formatDateTime(slot.startTime).time} -{" "}
                                    {formatDateTime(slot.endtime).time}
                                  </span>
                                  {appointment.appointmentConfirmedDate
                                    ?.startTime === slot.startTime && (
                                    <CheckCircle className="w-4 h-4 text-teal-600" />
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Appointment Timeline */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-teal-600" />
                            Appointment Timeline
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                              <div>
                                <span className="text-gray-600">Created:</span>
                                <span className="font-medium ml-2">
                                  {formatDateTime(appointment.createdAt).date}
                                </span>
                              </div>
                            </div>

                            {appointment.confirmedDate && (
                              <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                <div>
                                  <span className="text-gray-600">
                                    Confirmed:
                                  </span>
                                  <span className="font-medium ml-2">
                                    {
                                      formatDateTime(appointment.confirmedDate)
                                        .date
                                    }
                                  </span>
                                </div>
                              </div>
                            )}

                            {appointment.rejectedDate && (
                              <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                                <div>
                                  <span className="text-gray-600">
                                    Rejected:
                                  </span>
                                  <span className="font-medium ml-2">
                                    {
                                      formatDateTime(appointment.rejectedDate)
                                        .date
                                    }
                                  </span>
                                </div>
                              </div>
                            )}

                            {appointment.cancellationDate && (
                              <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                                <div>
                                  <span className="text-gray-600">
                                    Cancelled:
                                  </span>
                                  <span className="font-medium ml-2">
                                    {
                                      formatDateTime(
                                        appointment.cancellationDate
                                      ).date
                                    }
                                  </span>
                                </div>
                              </div>
                            )}

                            {appointment.completedDate && (
                              <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                                <div>
                                  <span className="text-gray-600">
                                    Completed:
                                  </span>
                                  <span className="font-medium ml-2">
                                    {
                                      formatDateTime(appointment.completedDate)
                                        .date
                                    }
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="mt-6 pt-6 border-t border-teal-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">
                              Appointment ID:
                            </span>
                            <p className="font-medium break-all text-teal-700">
                              {appointment._id}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Veterinarian ID:
                            </span>
                            <p className="font-medium break-all text-teal-700">
                              {appointment.vet}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Number of Pets:
                            </span>
                            <p className="font-medium text-teal-700">
                              {appointment.pets?.length || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Cancel Appointment Modal */}
        {showCancelModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-teal-100">
              <div className="flex items-center justify-between p-6 border-b border-teal-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cancel Appointment
                </h3>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Please provide a reason for cancelling this appointment:
                </p>

                <textarea
                  value={cancelledReason}
                  onChange={(e) => setCancelledReason(e.target.value)}
                  placeholder="Enter reason for cancellation..."
                  rows={4}
                  className="w-full p-3 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 mb-6 transition-colors bg-teal-50/30"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowCancelModal(false);
                      setCancelledReason("");
                    }}
                    className="flex-1 px-4 py-3 border border-teal-200 text-teal-700 rounded-xl hover:bg-teal-50 transition-colors font-medium"
                  >
                    Keep Appointment
                  </button>
                  <button
                    onClick={handleCancelAppointment}
                    disabled={!cancelledReason.trim() || isCancelling}
                    className="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
                  >
                    {isCancelling ? "Cancelling..." : "Cancel Appointment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetOwnerAppointments;