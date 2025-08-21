// components/VetAppointments.jsx
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
} from "lucide-react";
import { get, patch } from "../../services/apiService";
import {
  GET_ALL_VET_APPOINTMENTS,
  GET_SINGLE_VET_APPOINTMENT,
  VET_CONFIRM_APPOINTMENT,
  VET_REJECT_APPOINTMENT,
  VET_CANCEL_APPOINTMENT,
} from "../../services/apiRoutes";
import { getUserToken } from "../../utitlities/Globals";
import AlertDialog from "../../utitlities/Alert";

const VetAppointments = () => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [rejectedReason, setRejectedReason] = useState("");
  const [expandedCards, setExpandedCards] = useState(new Set());

  const queryClient = useQueryClient();

  // Fetch all appointments
  const useGetAllAppointments = () => {
    return useQuery({
      queryKey: ["vetAppointments"],
      queryFn: async () => {
        try {
          const response = await get(GET_ALL_VET_APPOINTMENTS, getUserToken());
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
  const useGetSingleAppointment = (appointmentId) => {
    return useQuery({
      queryKey: ["appointment", appointmentId],
      queryFn: async () => {
        try {
          const response = await get(
            `${GET_SINGLE_VET_APPOINTMENT}/${appointmentId}`,
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

  // Confirm appointment mutation
  const useConfirmAppointment = () => {
    return useMutation({
      mutationFn: async ({ appointmentId, confirmedDateTime }) => {
        const response = await patch(
          `${VET_CONFIRM_APPOINTMENT}/${appointmentId}`,
          {
            appointmentConfirmedDate: {
              startTime: confirmedDateTime.startTime,
              endtime: confirmedDateTime.endtime,
            },
          },
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
          data.message || "Appointment confirmed successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["vetAppointments"]);
        setShowConfirmModal(false);
        setSelectedAppointment(null);
        setSelectedTimeSlot(null);
      },
      onError: (error) => {
        console.error("Confirm appointment error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to confirm appointment";
        AlertDialog("Error", errorMessage, "error", 3000);
      },
    });
  };

  // Reject appointment mutation
  const useRejectAppointment = () => {
    return useMutation({
      mutationFn: async ({ appointmentId, rejectedReason }) => {
        const response = await patch(
          `${VET_REJECT_APPOINTMENT}/${appointmentId}`,
          { rejectedReason },
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
          data.message || "Appointment rejected successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["vetAppointments"]);
        setShowRejectModal(false);
        setSelectedAppointment(null);
        setRejectedReason("");
      },
      onError: (error) => {
        console.error("Reject appointment error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to reject appointment";
        AlertDialog("Error", errorMessage, "error", 3000);
      },
    });
  };

  // Cancel appointment mutation
  const useCancelAppointment = () => {
    return useMutation({
      mutationFn: async ({ appointmentId }) => {
        const response = await patch(
          `${VET_CANCEL_APPOINTMENT}/${appointmentId}`,
          {},
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
        queryClient.invalidateQueries(["vetAppointments"]);
        setShowCancelModal(false);
        setSelectedAppointment(null);
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

  const { data: appointments, isLoading, error } = useGetAllAppointments();
  const { mutate: confirmAppointment, isLoading: isConfirming } =
    useConfirmAppointment();
  const { mutate: rejectAppointment, isLoading: isRejecting } =
    useRejectAppointment();
  const { mutate: cancelAppointment, isLoading: isCancelling } =
    useCancelAppointment();

  // Filter appointments
  const filteredAppointments =
    appointments?.filter((appointment) => {
      const matchesStatus =
        selectedStatus === "ALL" ||
        appointment.appointmentStatus === selectedStatus;
      const matchesSearch =
        searchTerm === "" ||
        appointment._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patient?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
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

  // Handle confirm appointment
  const handleConfirmAppointment = () => {
    if (!selectedTimeSlot) {
      AlertDialog("Error", "Please select a time slot", "error", 2000);
      return;
    }
    confirmAppointment({
      appointmentId: selectedAppointment._id,
      confirmedDateTime: selectedTimeSlot,
    });
  };

  // Handle reject appointment
  const handleRejectAppointment = () => {
    if (!rejectedReason.trim()) {
      AlertDialog(
        "Error",
        "Please provide a reason for rejection",
        "error",
        2000
      );
      return;
    }
    rejectAppointment({
      appointmentId: selectedAppointment._id,
      rejectedReason: rejectedReason.trim(),
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
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
            Manage your consultation requests and appointments
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
                placeholder="Search by ID or patient name..."
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
                            <User className="w-4 h-4 mr-2" />
                            <span>Patient ID: {appointment.patient}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              Created:{" "}
                              {formatDateTime(appointment.createdAt).date}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Video className="w-4 h-4 mr-2" />
                            <span>{appointment.pets?.length || 0} Pet(s)</span>
                          </div>
                        </div>

                        {/* Requested Time Slots Preview */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Requested Time Slots:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {appointment.appointmentRequestsDates
                              ?.slice(0, 3)
                              .map((slot, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 rounded text-xs"
                                >
                                  {formatDateTime(slot.startTime).time} -{" "}
                                  {formatDateTime(slot.endtime).time}
                                </span>
                              ))}
                            {appointment.appointmentRequestsDates?.length >
                              3 && (
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                +
                                {appointment.appointmentRequestsDates.length -
                                  3}{" "}
                                more
                              </span>
                            )}
                          </div>
                        </div>
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

                        {appointment.appointmentStatus === "PENDING" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowConfirmModal(true);
                              }}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowRejectModal(true);
                              }}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {appointment.appointmentStatus === "CONFIRMED" && (
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowCancelModal(true);
                            }}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Cancel
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
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Additional Details */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Appointment Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Appointment ID:
                              </span>
                              <span className="font-medium">
                                {appointment._id}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Patient ID:</span>
                              <span className="font-medium">
                                {appointment.patient}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Number of Pets:
                              </span>
                              <span className="font-medium">
                                {appointment.pets?.length || 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created:</span>
                              <span className="font-medium">
                                {formatDateTime(appointment.createdAt).date}
                              </span>
                            </div>
                            {appointment.confirmedDate && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Confirmed:
                                </span>
                                <span className="font-medium">
                                  {
                                    formatDateTime(appointment.confirmedDate)
                                      .date
                                  }
                                </span>
                              </div>
                            )}
                            {appointment.rejectedReason && (
                              <div className="mt-3">
                                <span className="text-gray-600">
                                  Rejection Reason:
                                </span>
                                <p className="mt-1 text-sm bg-red-50 p-2 rounded border-l-4 border-red-400">
                                  {appointment.rejectedReason}
                                </p>
                              </div>
                            )}
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

        {/* Confirm Appointment Modal */}
        {showConfirmModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm Appointment
                </h3>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Select one time slot to confirm for this appointment:
                </p>

                <div className="space-y-2 mb-6">
                  {selectedAppointment.appointmentRequestsDates?.map(
                    (slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`w-full p-3 text-left border rounded-lg transition-colors ${
                          selectedTimeSlot?._id === slot._id
                            ? "border-teal-500 bg-teal-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            {formatDateTime(slot.startTime).date} at{" "}
                            {formatDateTime(slot.startTime).time} -{" "}
                            {formatDateTime(slot.endtime).time}
                          </span>
                          {selectedTimeSlot?._id === slot._id && (
                            <Check className="w-5 h-5 text-teal-600" />
                          )}
                        </div>
                      </button>
                    )
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmAppointment}
                    disabled={!selectedTimeSlot || isConfirming}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConfirming ? "Confirming..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reject Appointment Modal */}
        {showRejectModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reject Appointment
                </h3>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Please provide a reason for rejecting this appointment:
                </p>

                <textarea
                  value={rejectedReason}
                  onChange={(e) => setRejectedReason(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 mb-6"
                />

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectedReason("");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectAppointment}
                    disabled={!rejectedReason.trim() || isRejecting}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRejecting ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel this confirmed appointment?
                  This action cannot be undone.
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Keep Appointment
                  </button>
                  <button
                    onClick={() =>
                      cancelAppointment({
                        appointmentId: selectedAppointment._id,
                      })
                    }
                    disabled={isCancelling}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

export default VetAppointments;
