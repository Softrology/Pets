import React from "react";
import {
  X,
  Edit,
  Trash2,
  Heart,
  Calendar,
  User,
  MapPin,
  Stethoscope,
  FileText,
  Activity,
} from "lucide-react";

const ViewMedicalRecordModal = ({
  record,
  pets,
  onClose,
  onEdit,
  onDelete,
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
        return <Stethoscope className="h-5 w-5 text-teal-600 mr-3" />;
      case "VACCINATION":
        return <Activity className="h-5 w-5 text-teal-600 mr-3" />;
      case "BLOOD_TEST":
        return <TestTube className="h-5 w-5 text-teal-600 mr-3" />;
      case "X_RAY":
        return <Zap className="h-5 w-5 text-teal-600 mr-3" />;
      default:
        return <FileText className="h-5 w-5 text-teal-600 mr-3" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Medical Record Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Record Images */}
            {record.images && record.images.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Medical Images
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {record.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={image}
                        alt={`Medical record ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => window.open(image, "_blank")}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDEzVjE3TTE2IDEzSDE2LjAxTTggMTNIOC4wMSIgc3Ryb2tlPSIjOUM5Qzk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Record Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-teal-600 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">Pet:</span>
                      <p className="font-medium">
                        {pets.find(
                          (p) => p._id === (record.pet?._id || record.pet)
                        )?.name || "Unknown Pet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getTypeIcon(record.type)}
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <p className="font-medium">{formatType(record.type)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-teal-600 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">Date:</span>
                      <p className="font-medium">{formatDate(record.date)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Healthcare Provider
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-teal-600 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">
                        Veterinarian:
                      </span>
                      <p className="font-medium">
                        {record.vet || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-teal-600 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">
                        Health Center:
                      </span>
                      <p className="font-medium">
                        {record.clinicName || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Stethoscope className="h-5 w-5 text-teal-600 mr-3" />
                    <div>
                      <span className="text-sm text-gray-500">
                        Existing Vet:
                      </span>
                      <p className="font-medium">
                        {record.isExistingVet ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescription Information */}
            {record.prescription && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Prescription & Notes
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {record.prescription}
                  </pre>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  onClose();
                  onEdit(record);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Record
              </button>
              <button
                onClick={() => {
                  onClose();
                  onDelete(record._id);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicalRecordModal;
