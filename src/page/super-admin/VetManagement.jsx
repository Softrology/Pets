import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Filter,
  Eye,
  Check,
  X,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Clock,
  DollarSign,
} from "lucide-react";
import { get, patch, put } from "../../services/apiService";
import {
  APPROVE_VET,
  CHANGE_VET_STATUS,
  GET_ALL_VETS,
} from "../../services/apiRoutes";
import { getUserToken } from "../../utitlities/Globals";
import AlertDialog from "../../utitlities/Alert";

const VetManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [selectedVet, setSelectedVet] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const queryClient = useQueryClient();

  // Custom hook to fetch all vets
  const useGetVets = (token) => {
    return useQuery({
      queryKey: ["vets"],
      queryFn: async () => {
        const response = await get(GET_ALL_VETS, token);
        return response.data;
      },
      onError: (error) => {
        AlertDialog("", error.message || "Something went wrong", "error", 1500);
      },
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });
  };

  // Custom hook to approve vet
  const useApproveVet = () => {
    return useMutation({
      mutationFn: async ({ id, isApproved }) => {
        const response = await patch(
          `${APPROVE_VET}/${id}`,
          { isApproved },
          getUserToken()
        );
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Vet approved successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["vets"]);
      },
      onError: (error) => {
        AlertDialog("", error.message || "Something went wrong", "error", 1500);
      },
    });
  };

  // Custom hook to change activation status
  const useChangeVetStatus = () => {
    return useMutation({
      mutationFn: async ({ id, isActivated }) => {
        const response = await patch(
          `${CHANGE_VET_STATUS}/${id}`,
          { isActivated },
          getUserToken()
        );
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Status updated successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["vets"]);
      },
      onError: (error) => {
        AlertDialog("", error.message || "Something went wrong", "error", 1500);
      },
    });
  };

  // Use the custom hooks
  const {
    data: vets,
    isLoading,
    refetch,
    isRefetching,
  } = useGetVets(getUserToken());
  const approveVetMutation = useApproveVet();
  const changeActivationMutation = useChangeVetStatus();

  // Calculate analytics
  const analytics = useMemo(() => {
    const vetsArray = vets || [];
    const total = vetsArray.length;
    const approved = vetsArray.filter((vet) => vet.isApproved).length;
    const active = vetsArray.filter((vet) => vet.isActivated).length;
    const pending = vetsArray.filter((vet) => !vet.isApproved).length;

    return { total, approved, active, pending };
  }, [vets]);

  // Filter vets
  const filteredVets = useMemo(() => {
    const vetsArray = vets || [];
    return vetsArray.filter((vet) => {
      const matchesSearch =
        vet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.emailAddress.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && vet.isActivated) ||
        (statusFilter === "inactive" && !vet.isActivated);

      const matchesApproval =
        approvalFilter === "all" ||
        (approvalFilter === "approved" && vet.isApproved) ||
        (approvalFilter === "pending" && !vet.isApproved);

      return matchesSearch && matchesStatus && matchesApproval;
    });
  }, [vets, searchTerm, statusFilter, approvalFilter]);

  const handleApprove = (vetId, isApproved) => {
    approveVetMutation.mutate({ id: vetId, isApproved });
  };

  const handleActivationChange = (vetId, isActivated) => {
    changeActivationMutation.mutate({ id: vetId, isActivated });
  };

  const formatSpecialization = (specializations) => {
    if (!specializations || specializations.length === 0) return "General";
    return specializations
      .map((spec) =>
        spec
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase())
      )
      .join(", ");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-teal-600 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Veterinarian Management
          </h1>
          <p className="text-gray-200">
            Manage veterinarians, their approval status, and monitor their
            activity
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Vets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.approved}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.active}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.pending}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search vets by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    Status Filter
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approval Filter
                  </label>
                  <select
                    value={approvalFilter}
                    onChange={(e) => setApprovalFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Approvals</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vets Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veterinarian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVets.map((vet) => (
                  <tr
                    key={vet._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {vet.profilePicture ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={vet.profilePicture}
                              alt={`${vet.firstName} ${vet.lastName}`}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-purple-600 font-medium">
                                {vet.firstName.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {vet.firstName} {vet.lastName}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {vet.gender?.toLowerCase() || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {vet.emailAddress}
                      </div>
                      {vet.phoneNumber && (
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {vet.phoneNumber}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatSpecialization(vet.specialization)}
                      </div>
                      {vet.consultationFee && (
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                          {vet.consultationFee}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vet.isApproved
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {vet.isApproved ? "Approved" : "Pending"}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            vet.isActivated
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {vet.isActivated ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(vet.createdAt)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedVet(vet)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {!vet.isApproved && (
                          <button
                            onClick={() => handleApprove(vet._id, true)}
                            disabled={approveVetMutation.isLoading}
                            className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleActivationChange(vet._id, !vet.isActivated)
                          }
                          disabled={changeActivationMutation.isLoading}
                          className={`p-1 rounded-full transition-colors disabled:opacity-50 ${
                            vet.isActivated
                              ? "text-red-600 hover:text-red-900 hover:bg-red-100"
                              : "text-green-600 hover:text-green-900 hover:bg-green-100"
                          }`}
                          title={vet.isActivated ? "Deactivate" : "Activate"}
                        >
                          {vet.isActivated ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVets.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No veterinarians found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Vet Details Modal */}
        {selectedVet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Veterinarian Details
                  </h2>
                  <button
                    onClick={() => setSelectedVet(null)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Profile Section */}
                  <div className="flex items-center space-x-4">
                    {selectedVet.profilePicture ? (
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={selectedVet.profilePicture}
                        alt={`${selectedVet.firstName} ${selectedVet.lastName}`}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-medium text-xl">
                          {selectedVet.firstName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedVet.firstName} {selectedVet.lastName}
                      </h3>
                      <p className="text-gray-500">
                        {selectedVet.emailAddress}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Contact Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-500">Email:</span>{" "}
                          {selectedVet.emailAddress}
                        </p>
                        <p>
                          <span className="text-gray-500">Phone:</span>{" "}
                          {selectedVet.phoneNumber || "Not provided"}
                        </p>
                        <p>
                          <span className="text-gray-500">Gender:</span>{" "}
                          {selectedVet.gender || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Professional Info
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-500">Specialization:</span>{" "}
                          {formatSpecialization(selectedVet.specialization)}
                        </p>
                        <p>
                          <span className="text-gray-500">
                            Consultation Fee:
                          </span>{" "}
                          ${selectedVet.consultationFee || "Not set"}
                        </p>
                        <p>
                          <span className="text-gray-500">Joined:</span>{" "}
                          {formatDate(selectedVet.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Qualifications */}
                  {selectedVet.qualifications &&
                    selectedVet.qualifications.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Qualifications
                        </h4>
                        <div className="space-y-2">
                          {selectedVet.qualifications.map((qual, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-3 rounded-lg"
                            >
                              <p className="font-medium text-sm capitalize">
                                {qual.level.toLowerCase()}
                              </p>
                              <p className="text-sm text-gray-600">
                                {qual.qualifications.join(", ")}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Availability */}
                  {selectedVet.availability &&
                    selectedVet.availability.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Availability
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedVet.availability.map((slot, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-2 rounded text-sm"
                            >
                              <span className="font-medium capitalize">
                                {slot.day.toLowerCase()}:
                              </span>
                              <span className="ml-2">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VetManagement;
