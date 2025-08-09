import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PlusCircle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Heart,
  Calendar,
  FileText,
  X,
  Save,
  Upload,
  Stethoscope,
  Activity,
  MapPin,
  User,
} from "lucide-react";
import { get, post, patch, del } from "../../services/apiService";
import {
  POST_MEDICAL_RECORD,
  GET_ALL_MEDICAL_RECORD,
  DELETE_MEDICAL_RECORD,
  UPDATE_MEDICAL_RECORD,
  GET_MEDICAL_RECORD_BY_ID,
  GET_ALL_PETS,
  GET_ALL_VETS, // Add this to your apiRoutes
} from "../../services/apiRoutes";
import { getUserToken } from "../../utitlities/Globals";
import AlertDialog from "../../utitlities/Alert";
import { GiDoctorFace } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";

const MedicalRecord = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const queryClient = useQueryClient();

  // Form state for adding/editing medical records
  const [recordForm, setRecordForm] = useState({
    pet: "",
    type: "CONSULTATION",
    date: new Date().toISOString().slice(0, 16),
    prescription: "",
    clinicName: "",
    isExistingVet: false,
    existingVet: "",
    vet: "",
    images: [],
  });

  const token = getUserToken();

  console.log("this is the token =================>>", token);

  // Custom hook to fetch all pets
  const useGetPets = () => {
    return useQuery({
      queryKey: ["pets"],
      queryFn: async () => {
        try {
          const response = await get(GET_ALL_PETS, token);
          console.log("Pets response:", response.data);
          return response.data || [];
        } catch (error) {
          console.error("Fetch pets error:", error);
          throw error;
        }
      },
      onError: (error) => {
        AlertDialog("Error", error.message, "error");
      },
    });
  };

  // Custom hook to fetch all vets
  const useGetVets = () => {
    return useQuery({
      queryKey: ["vets"],
      queryFn: async () => {
        try {
          const response = await get(GET_ALL_VETS, token);
          console.log("Vets response:", response.data);
          return response.data || [];
        } catch (error) {
          console.error("Fetch vets error:", error);
          throw error;
        }
      },
      onError: (error) => {
        AlertDialog("Error", error.message, "error");
      },
    });
  };

  // Custom hook to fetch all medical records
  const useGetMedicalRecords = (token) => {
    return useQuery({
      queryKey: ["medicalRecords"],
      queryFn: async () => {
        try {
          const response = await get(GET_ALL_MEDICAL_RECORD, token);
          return response.data || [];
        } catch (error) {
          console.error("Fetch error:", error);
          throw error;
        }
      },
      onError: (error) => {
        AlertDialog("Error", error.message, "error");
      },
    });
  };

  // Custom hook to add medical record
  const useAddMedicalRecord = () => {
    return useMutation({
      mutationFn: async (recordData) => {
        console.log("Adding medical record with data:", recordData);

        const formData = new FormData();

        // Ensure pet ID is properly set
        if (!recordData.pet) {
          throw new Error("Pet selection is required");
        }

        formData.append("pet", recordData.pet);
        formData.append("type", recordData.type);
        formData.append("date", recordData.date);
        formData.append("prescription", recordData.prescription || "");
        formData.append("clinicName", recordData.clinicName || "");
        formData.append("isExistingVet", recordData.isExistingVet.toString());

        // Only send existingVet if isExistingVet is true
        if (recordData.isExistingVet && recordData.existingVet) {
          formData.append("existingVet", recordData.existingVet);
        }

        // Only send vet if isExistingVet is false
        if (!recordData.isExistingVet && recordData.vet) {
          formData.append("vet", recordData.vet);
        }

        // Add images if any
        if (recordData.imageFiles && recordData.imageFiles.length > 0) {
          recordData.imageFiles.forEach((file) => {
            formData.append("images", file);
          });
        }

        // Log formData contents for debugging
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const response = await post(POST_MEDICAL_RECORD, formData, token, {
          "Content-Type": "multipart/form-data",
        });

        console.log("Add medical record response:", response);
        return response;
      },
      onSuccess: (data) => {
        console.log("Medical record added successfully:", data);
        AlertDialog(
          "",
          data.message || "Medical record added successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["medicalRecords"]);
        setShowAddModal(false);
        resetForm();
      },
      onError: (error) => {
        console.error("Add medical record error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        AlertDialog("Error", errorMessage, "error", 3000);
      },
    });
  };

  // Custom hook to update medical record
  const useUpdateMedicalRecord = () => {
    return useMutation({
      mutationFn: async ({ id, recordData }) => {
        console.log("Updating medical record with data:", recordData);

        const formData = new FormData();

        if (!recordData.pet) {
          throw new Error("Pet selection is required");
        }

        formData.append("pet", recordData.pet);
        formData.append("type", recordData.type);
        formData.append("date", recordData.date);
        formData.append("prescription", recordData.prescription || "");
        formData.append("clinicName", recordData.clinicName || "");
        formData.append("isExistingVet", recordData.isExistingVet.toString());

        // Only send existingVet if isExistingVet is true
        if (recordData.isExistingVet && recordData.existingVet) {
          formData.append("existingVet", recordData.existingVet);
        }

        // Only send vet if isExistingVet is false
        if (!recordData.isExistingVet && recordData.vet) {
          formData.append("vet", recordData.vet);
        }

        if (recordData.existingImages && recordData.existingImages.length > 0) {
          formData.append(
            "existingImages",
            JSON.stringify(recordData.existingImages)
          );
        }

        if (recordData.imageFiles && recordData.imageFiles.length > 0) {
          recordData.imageFiles.forEach((file) => {
            formData.append("images", file);
          });
        }

        const response = await patch(
          UPDATE_MEDICAL_RECORD(id),
          formData,
          token,
          {
            "Content-Type": "multipart/form-data",
          }
        );
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Medical record updated successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["medicalRecords"]);
        setShowEditModal(false);
        setEditingRecord(null);
        resetForm();
      },
      onError: (error) => {
        console.error("Update medical record error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        AlertDialog("Error", errorMessage, "error", 3000);
      },
    });
  };

  // Custom hook to delete medical record
  const useDeleteMedicalRecord = () => {
    return useMutation({
      mutationFn: async (id) => {
        const response = await del(DELETE_MEDICAL_RECORD(id), token);
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Medical record deleted successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["medicalRecords"]);
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        AlertDialog("Error", errorMessage, "error", 1500);
      },
    });
  };

  // Use the custom hooks
  const {
    data: medicalRecords,
    isLoading,
    refetch,
    isRefetching,
  } = useGetMedicalRecords(token);

  const { data: pets = [], isLoading: isLoadingPets } = useGetPets();

  const { data: vets = [], isLoading: isLoadingVets } = useGetVets();

  const addRecordMutation = useAddMedicalRecord();
  const updateRecordMutation = useUpdateMedicalRecord();
  const deleteRecordMutation = useDeleteMedicalRecord();

  const analytics = useMemo(() => {
    const recordsArray = medicalRecords || [];

    // Get unique pet IDs from records
    const uniquePetIds = new Set(
      recordsArray.map((record) => record.pet?._id || record.pet)
    );
    const totalPetsWithRecords = uniquePetIds.size;

    const consultations = recordsArray.filter(
      (record) => record.type === "CONSULTATION"
    ).length;
    const vaccinations = recordsArray.filter(
      (record) => record.type === "VACCINATION"
    ).length;
    const others = recordsArray.length - consultations - vaccinations;

    return {
      total: totalPetsWithRecords, // Now shows unique pets with records
      consultations,
      vaccinations,
      others,
    };
  }, [medicalRecords]);

  // Updated record types to match backend enum values
  const recordTypes = [
    { value: "all", label: "All Types" },
    { value: "CONSULTATION", label: "Consultation" },
    { value: "VACCINATION", label: "Vaccination" },
  ];

  // Filter medical records
  const filteredRecords = useMemo(() => {
    const recordsArray = medicalRecords || [];
    return recordsArray.filter((record) => {
      const matchesSearch =
        record.pet?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.vet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.clinicName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "all" || record.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [medicalRecords, searchTerm, typeFilter]);

  const resetForm = () => {
    setRecordForm({
      pet: "",
      type: "CONSULTATION",
      date: new Date().toISOString().slice(0, 16),
      prescription: "",
      clinicName: "",
      isExistingVet: false,
      existingVet: "",
      vet: "",
      images: [],
    });
    setSelectedFiles([]);
  };

  const handleAddRecord = (e) => {
    e.preventDefault();

    console.log("Form data before validation:", recordForm);

    if (!recordForm.pet) {
      AlertDialog(
        "Validation Error",
        "Pet selection is required",
        "error",
        2000
      );
      return;
    }

    // Validate required fields
    if (!recordForm.type) {
      AlertDialog("Validation Error", "Record type is required", "error", 2000);
      return;
    }

    if (!recordForm.date) {
      AlertDialog("Validation Error", "Date is required", "error", 2000);
      return;
    }

    // Validate vet selection based on isExistingVet
    if (recordForm.isExistingVet && !recordForm.existingVet) {
      AlertDialog(
        "Validation Error",
        "Please select an existing veterinarian",
        "error",
        2000
      );
      return;
    }
    //
    // if (!recordForm.isExistingVet && !recordForm.vet) {
    //   AlertDialog(
    //     "Validation Error",
    //     "Please enter veterinarian name",
    //     "error",
    //     2000
    //   );
    //   return;
    // }

    const recordData = {
      pet: recordForm.pet, // This should be the pet ID
      type: recordForm.type,
      date: new Date(recordForm.date).toISOString(),
      prescription: recordForm.prescription,
      clinicName: recordForm.clinicName,
      isExistingVet: recordForm.isExistingVet,
      existingVet: recordForm.existingVet,
      vet: recordForm.vet,
      imageFiles: selectedFiles,
    };

    console.log("Sending record data:", recordData);
    addRecordMutation.mutate(recordData);
  };

  const handleUpdateRecord = (e) => {
    e.preventDefault();

    if (!recordForm.pet) {
      AlertDialog(
        "Validation Error",
        "Pet selection is required",
        "error",
        2000
      );
      return;
    }

    // Validate vet selection based on isExistingVet
    if (recordForm.isExistingVet && !recordForm.existingVet) {
      AlertDialog(
        "Validation Error",
        "Please select an existing veterinarian",
        "error",
        2000
      );
      return;
    }

    if (!recordForm.isExistingVet && !recordForm.vet) {
      AlertDialog(
        "Validation Error",
        "Please enter veterinarian name",
        "error",
        2000
      );
      return;
    }

    const recordData = {
      pet: recordForm.pet,
      type: recordForm.type,
      date: new Date(recordForm.date).toISOString(),
      prescription: recordForm.prescription,
      clinicName: recordForm.clinicName,
      isExistingVet: recordForm.isExistingVet,
      existingVet: recordForm.existingVet,
      vet: recordForm.vet,
      existingImages: recordForm.images,
      imageFiles: selectedFiles,
    };

    updateRecordMutation.mutate({
      id: editingRecord._id,
      recordData: recordData,
    });
  };

  const handleDeleteRecord = (recordId) => {
    if (
      window.confirm("Are you sure you want to delete this medical record?")
    ) {
      deleteRecordMutation.mutate(recordId);
    }
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setRecordForm({
      pet: record.pet._id || record.pet, // Handle both object and ID cases
      type: record.type,
      date: new Date(record.date).toISOString().slice(0, 16),
      prescription: record.prescription || "",
      clinicName: record.clinicName || "",
      isExistingVet: record.isExistingVet || false,
      existingVet: record.existingVet || "",
      vet: record.vet || "",
      images: record.images || [],
    });
    setSelectedFiles([]);
    setShowEditModal(true);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    setUploadingImages(true);

    try {
      // Validate file sizes
      for (let file of files) {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          AlertDialog(
            "File Error",
            `File ${file.name} is too large. Maximum size is 10MB.`,
            "error",
            3000
          );
          setUploadingImages(false);
          return;
        }
      }

      setSelectedFiles((prev) => [...prev, ...files]);

      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setRecordForm((prev) => ({
        ...prev,
        images: [...prev.images, ...previewUrls],
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      AlertDialog("Error", "Failed to process images", "error", 2000);
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    setRecordForm((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });

    setSelectedFiles((prev) => {
      const existingImagesCount = editingRecord
        ? (editingRecord.images || []).length
        : 0;
      const fileIndex = index - existingImagesCount;
      if (fileIndex >= 0) {
        return prev.filter((_, i) => i !== fileIndex);
      }
      return prev;
    });
  };

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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || isLoadingPets || isLoadingVets) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  console.log("Available pets:", pets);
  console.log("Available vets:", vets);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Medical Records
              </h1>
              <p className="text-emerald-100">
                Manage pet medical records, track health history, and maintain
                veterinary information
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 md:mt-0 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Record
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pets with Records
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Consultations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.consultations}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Vaccinations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.vaccinations}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Others</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.others}
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
                placeholder="Search by pet name, vet, or health center..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

        {/* Medical Records Grid/Table */}
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
                    <div className="h-16 w-16 rounded-lg bg-emerald-100 flex items-center justify-center">
                      {getTypeIcon(record.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {pets.find(
                          (p) => p._id === (record.pet?._id || record.pet)
                        )?.name || "Unknown Pet"}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="text-emerald-600 hover:text-emerald-900 p-1"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditRecord(record)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(record._id)}
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
                          <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
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
                          onClick={() => setSelectedRecord(record)}
                          className="text-emerald-600 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleEditRecord(record)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                          title="Edit Record"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteRecord(record._id)}
                          disabled={deleteRecordMutation.isLoading}
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
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Add Medical Record Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Add New/Past Medical Record
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleAddRecord} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pet <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={recordForm.pet}
                        onChange={(e) => {
                          console.log("Selected pet ID:", e.target.value);
                          setRecordForm({ ...recordForm, pet: e.target.value });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a pet</option>
                        {pets.map((pet) => (
                          <option key={pet._id} value={pet._id}>
                            {pet.name} {pet.breed ? `(${pet.breed})` : ""}
                          </option>
                        ))}
                      </select>
                      {!recordForm.pet && (
                        <p className="mt-1 text-sm text-red-600">
                          Pet selection is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Record Type
                      </label>
                      <select
                        value={recordForm.type}
                        onChange={(e) =>
                          setRecordForm({ ...recordForm, type: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {recordTypes
                          .filter((type) => type.value !== "all")
                          .map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={recordForm.date}
                        onChange={(e) =>
                          setRecordForm({ ...recordForm, date: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Clinic Name
                      </label>
                      <input
                        type="text"
                        value={recordForm.clinicName}
                        onChange={(e) =>
                          setRecordForm({
                            ...recordForm,
                            clinicName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter health center name"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          id="isExistingVet"
                          checked={recordForm.isExistingVet}
                          onChange={(e) => {
                            setRecordForm({
                              ...recordForm,
                              isExistingVet: e.target.checked,
                              // Clear the other field when switching
                              existingVet: e.target.checked
                                ? recordForm.existingVet
                                : "",
                              vet: e.target.checked ? "" : recordForm.vet,
                            });
                          }}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isExistingVet"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Use Existing Veterinarian
                        </label>
                      </div>

                      {recordForm.isExistingVet ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Veterinarian{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={recordForm.existingVet}
                            onChange={(e) =>
                              setRecordForm({
                                ...recordForm,
                                existingVet: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            required={recordForm.isExistingVet}
                          >
                            <option value="">Select a veterinarian</option>
                            {vets.map((vet) => (
                              <option key={vet._id} value={vet._id}>
                                Dr. {vet.name}{" "}
                                {vet.specialization
                                  ? `- ${vet.specialization}`
                                  : ""}
                              </option>
                            ))}
                          </select>
                          {recordForm.isExistingVet &&
                            !recordForm.existingVet && (
                              <p className="mt-1 text-sm text-red-600">
                                Please select a veterinarian
                              </p>
                            )}
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Veterinarian Name
                          </label>
                          <input
                            type="text"
                            value={recordForm.vet}
                            onChange={(e) =>
                              setRecordForm({
                                ...recordForm,
                                vet: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter veterinarian name"
                            required={!recordForm.isExistingVet}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prescription/Notes
                    </label>
                    <textarea
                      value={recordForm.prescription}
                      onChange={(e) =>
                        setRecordForm({
                          ...recordForm,
                          prescription: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter prescription details or notes..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Images
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 10MB each)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    {uploadingImages && (
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600 mr-2"></div>
                        Processing images...
                      </div>
                    )}
                  </div>

                  {/* Preview uploaded images */}
                  {recordForm.images.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Previews
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {recordForm.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDEzVjE3TTE2IDEzSDE2LjAxTTggMTNIOC4wMSIgc3Ryb2tlPSIjOUM5Qzk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        addRecordMutation.isLoading ||
                        uploadingImages ||
                        !recordForm.pet
                      }
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {addRecordMutation.isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {addRecordMutation.isLoading ? "Adding..." : "Add Record"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Medical Record Modal */}
        {showEditModal && editingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Edit Medical Record
                  </h2>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingRecord(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateRecord} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pet <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={recordForm.pet}
                        onChange={(e) =>
                          setRecordForm({ ...recordForm, pet: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a pet</option>
                        {pets.map((pet) => (
                          <option key={pet._id} value={pet._id}>
                            {pet.name} {pet.breed ? `(${pet.breed})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Record Type
                      </label>
                      <select
                        value={recordForm.type}
                        onChange={(e) =>
                          setRecordForm({ ...recordForm, type: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {recordTypes
                          .filter((type) => type.value !== "all")
                          .map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={recordForm.date}
                        onChange={(e) =>
                          setRecordForm({ ...recordForm, date: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Clinic Name
                      </label>
                      <input
                        type="text"
                        value={recordForm.clinicName}
                        onChange={(e) =>
                          setRecordForm({
                            ...recordForm,
                            clinicName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter Clinic Name   name"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          id="isExistingVetEdit"
                          checked={recordForm.isExistingVet}
                          onChange={(e) => {
                            setRecordForm({
                              ...recordForm,
                              isExistingVet: e.target.checked,
                              // Clear the other field when switching
                              existingVet: e.target.checked
                                ? recordForm.existingVet
                                : "",
                              vet: e.target.checked ? "" : recordForm.vet,
                            });
                          }}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isExistingVetEdit"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Use Existing Veterinarian
                        </label>
                      </div>

                      {recordForm.isExistingVet ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Veterinarian{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={recordForm.existingVet}
                            onChange={(e) =>
                              setRecordForm({
                                ...recordForm,
                                existingVet: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            required={recordForm.isExistingVet}
                          >
                            <option value="">Select a veterinarian</option>
                            {vets.map((vet) => (
                              <option key={vet._id} value={vet._id}>
                                Dr. {vet.name}{" "}
                                {vet.specialization
                                  ? `- ${vet.specialization}`
                                  : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Veterinarian Name{" "}
                            {/* <span className="text-red-500">*</span> */}
                          </label>
                          <input
                            type="text"
                            value={recordForm.vet}
                            onChange={(e) =>
                              setRecordForm({
                                ...recordForm,
                                vet: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter veterinarian name"
                            // required={!recordForm.isExistingVet}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prescription/Notes
                    </label>
                    <textarea
                      value={recordForm.prescription}
                      onChange={(e) =>
                        setRecordForm({
                          ...recordForm,
                          prescription: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter prescription details or notes..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload More Images
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 10MB each)
                          </p>
                        </div>
                        <input
                          id="dropzone-file-edit"
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    {uploadingImages && (
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600 mr-2"></div>
                        Processing images...
                      </div>
                    )}
                  </div>

                  {/* Preview existing and new images */}
                  {recordForm.images.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Previews
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {recordForm.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDEzVjE3TTE2IDEzSDE2LjAxTTggMTNIOC4wMSIgc3Ryb2tlPSIjOUM5Qzk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingRecord(null);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        updateRecordMutation.isLoading ||
                        uploadingImages ||
                        !recordForm.pet
                      }
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {updateRecordMutation.isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {updateRecordMutation.isLoading
                        ? "Updating..."
                        : "Update Record"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Medical Record Details Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Medical Record Details
                  </h2>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Record Images */}
                  {selectedRecord.images &&
                    selectedRecord.images.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          Medical Images
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedRecord.images.map((image, index) => (
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
                          <Heart className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">Pet:</span>
                            <p className="font-medium">
                              {pets.find(
                                (p) =>
                                  p._id ===
                                  (selectedRecord.pet?._id ||
                                    selectedRecord.pet)
                              )?.name || "Unknown Pet"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {getTypeIcon(selectedRecord.type)}
                          <div className="ml-3">
                            <span className="text-sm text-gray-500">Type:</span>
                            <p className="font-medium">
                              {formatType(selectedRecord.type)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">Date:</span>
                            <p className="font-medium">
                              {formatDate(selectedRecord.date)}
                            </p>
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
                          <User className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">
                              Veterinarian:
                            </span>
                            <p className="font-medium">
                              {selectedRecord.vet || "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">
                              Health Center:
                            </span>
                            <p className="font-medium">
                              {selectedRecord.clinicName || "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Stethoscope className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">
                              Existing Vet:
                            </span>
                            <p className="font-medium">
                              {selectedRecord.isExistingVet ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prescription Information */}
                  {selectedRecord.prescription && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Prescription & Notes
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                          {selectedRecord.prescription}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSelectedRecord(null);
                        handleEditRecord(selectedRecord);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Record
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRecord(null);
                        handleDeleteRecord(selectedRecord._id);
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
        )}
      </div>
    </div>
  );
};

export default MedicalRecord;
