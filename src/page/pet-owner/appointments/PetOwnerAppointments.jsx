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
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load appointments</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600">
            Track and manage your pet consultation appointments
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by appointment ID or vet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full md:w-80"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="REJECTED">Rejected</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-600">
                {selectedStatus === "ALL"
                  ? "You don't have any appointments yet."
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
                  className="bg-white rounded-lg shadow-sm border"
                >
                  {/* Main Card Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Appointment #{appointment._id.slice(-8)}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              appointment.appointmentStatus
                            )}`}
                          >
                            {getStatusIcon(appointment.appointmentStatus)}
                            <span className="ml-1">
                              {appointment.appointmentStatus}
                            </span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Stethoscope className="w-4 h-4 mr-2" />
                            <span>Vet ID: {appointment.vet}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              Created:{" "}
                              {formatDateTime(appointment.createdAt).date}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span>{appointment.pets?.length || 0} Pet(s)</span>
                          </div>
                        </div>

                        {/* Confirmed Date or Requested Slots */}
                        {appointment.appointmentStatus === "CONFIRMED" &&
                        appointment.appointmentConfirmedDate?.startTime ? (
                          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center text-green-800">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                Confirmed Time:
                              </span>
                            </div>
                            <p className="text-green-700 mt-1">
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
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Requested Time Slots:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {appointment.appointmentRequestsDates
                                  .slice(0, 3)
                                  .map((slot, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-gray-100 rounded text-xs"
                                    >
                                      {formatDateTime(slot.startTime).time} -{" "}
                                      {formatDateTime(slot.endtime).time}
                                    </span>
                                  ))}
                                {appointment.appointmentRequestsDates.length >
                                  3 && (
                                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">
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
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center text-gray-800 mb-2">
                              <Ban className="w-4 h-4 mr-2" />
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
                            <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                              <div className="flex items-center text-red-800 mb-2">
                                <XCircle className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  Rejected by Veterinarian
                                </span>
                              </div>
                              <p className="text-red-700 text-sm">
                                Reason: {appointment.rejectedReason}
                              </p>
                            </div>
                          )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleCardExpansion(appointment._id)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>

                        {canCancelAppointment(appointment) && (
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowCancelModal(true);
                            }}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        )}

                        {appointment.appointmentStatus === "CONFIRMED" && (
                          <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Join Call
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* All Requested Time Slots */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            All Requested Time Slots
                          </h4>
                          <div className="space-y-2">
                            {appointment.appointmentRequestsDates?.map(
                              (slot, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border"
                                >
                                  <span className="text-sm">
                                    {formatDateTime(slot.startTime).date} at{" "}
                                    {formatDateTime(slot.startTime).time} -{" "}
                                    {formatDateTime(slot.endtime).time}
                                  </span>
                                  {appointment.appointmentConfirmedDate
                                    ?.startTime === slot.startTime && (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Appointment Timeline */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Appointment Timeline
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              <div>
                                <span className="text-gray-600">Created:</span>
                                <span className="font-medium ml-2">
                                  {formatDateTime(appointment.createdAt).date}
                                </span>
                              </div>
                            </div>

                            {appointment.confirmedDate && (
                              <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
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
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
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
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
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
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">
                              Appointment ID:
                            </span>
                            <p className="font-medium break-all">
                              {appointment._id}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Veterinarian ID:
                            </span>
                            <p className="font-medium break-all">
                              {appointment.vet}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Number of Pets:
                            </span>
                            <p className="font-medium">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cancel Appointment
                </h3>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-gray-400 hover:text-gray-600"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 mb-6"
                />

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowCancelModal(false);
                      setCancelledReason("");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Keep Appointment
                  </button>
                  <button
                    onClick={handleCancelAppointment}
                    disabled={!cancelledReason.trim() || isCancelling}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
