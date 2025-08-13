import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  FileText,
  Stethoscope,
  Activity,
} from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";

const MedicalRecordTable = ({
  filteredRecords,
  pets,
  selectedPet,
  selectedPetId,
  onViewRecord,
  onEditRecord,
  onDeleteRecord,
  deleteLoading,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatType = (type) => {
    return type?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "CONSULTATION":
        return <Stethoscope className="h-4 w-4" />;
      case "VACCINATION":
        return <Activity className="h-4 w-4" />;
      case "BLOOD_TEST":
        return <TestTube className="h-4 w-4" />;
      case "X_RAY":
        return <Zap className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "CONSULTATION":
        return "bg-blue-100 text-blue-800";
      case "VACCINATION":
        return "bg-green-100 text-green-800";
      case "BLOOD_TEST":
        return "bg-red-100 text-red-800";
      case "X_RAY":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Mobile View - Cards */}
      <div className="md:hidden">
        {filteredRecords.map((record) => (
          <div
            key={record._id}
            className="border-b border-gray-200 p-4 hover:bg-gray-50"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-lg bg-teal-100 flex items-center justify-center">
                  {getTypeIcon(record.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {pets.find((p) => p._id === (record.pet?._id || record.pet))
                      ?.name || "Unknown Pet"}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewRecord(record)}
                      className="text-teal-600 hover:text-teal-900 p-1"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditRecord(record)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteRecord(record._id)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                      record.type
                    )}`}
                  >
                    {formatType(record.type)}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(record.date)}
                  </p>
                  {record.vet && (
                    <p className="text-sm text-gray-500 mt-1">
                      Vet: {record.vet}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pet & Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Veterinarian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health Center
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr
                key={record._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
                        {getTypeIcon(record.type)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {pets.find(
                          (p) => p._id === (record.pet?._id || record.pet)
                        )?.name || "Unknown Pet"}
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                          record.type
                        )}`}
                      >
                        {formatType(record.type)}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {formatDate(record.date) || "Not specified"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaUserDoctor className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {record.vet || "Not specified"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {record.clinicName || "Not specified"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewRecord(record)}
                      className="text-teal-600 hover:text-teal-900 p-1 rounded-full hover:bg-teal-100 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onEditRecord(record)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                      title="Edit Record"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onDeleteRecord(record._id)}
                      disabled={deleteLoading}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50"
                      title="Delete Record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No medical records found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedPetId !== "all"
              ? `${
                  selectedPet?.name || "This pet"
                } doesn't have any medical records yet.`
              : "Try adjusting your search or filter criteria."}
          </p>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordTable;
