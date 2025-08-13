import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { PlusCircle, Heart } from "lucide-react";
import { get, del } from "../../../services/apiService";
import {
  GET_ALL_MEDICAL_RECORD,
  DELETE_MEDICAL_RECORD,
  GET_ALL_PETS,
  GET_ALL_VETS,
  GET_MEDICAL_RECORD_BY_PETID,
} from "../../../services/apiRoutes";
import { getUserToken } from "../../../utitlities/Globals";
import AlertDialog from "../../../utitlities/Alert";

import MedicalRecordHeader from "./components/MedicalRecordHeader";
import MedicalRecordAnalytics from "./components/MedicalRecordAnalytics";
import MedicalRecordFilters from "./components/MedicalRecordFilters";
import MedicalRecordTable from "./components/MedicalRecordTable";
import MedicalRecordFormModal from "./components/MedicalRecordFormModal";
import ViewMedicalRecordModal from "./components/ViewMedicalRecordModal";

const MedicalRecord = () => {
  const location = useLocation();
  const petIdFromState = location.state?.selectedPetId;
  const queryClient = useQueryClient();
  const token = getUserToken();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPetId, setSelectedPetId] = useState(petIdFromState || "all");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Custom hooks for data fetching
  const useGetPets = () => {
    return useQuery({
      queryKey: ["pets"],
      queryFn: async () => {
        try {
          const response = await get(GET_ALL_PETS, token);
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

  const useGetVets = () => {
    return useQuery({
      queryKey: ["vets"],
      queryFn: async () => {
        try {
          const response = await get(GET_ALL_VETS, token);
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

  const useGetMedicalRecords = (petId) => {
    return useQuery({
      queryKey: ["medicalRecords", petId],
      queryFn: async () => {
        try {
          let response;
          if (petId && petId !== "all") {
            response = await get(GET_MEDICAL_RECORD_BY_PETID(petId), token);
          } else {
            response = await get(GET_ALL_MEDICAL_RECORD, token);
          }
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
  const { data: medicalRecords, isLoading } =
    useGetMedicalRecords(selectedPetId);

  const { data: pets = [], isLoading: isLoadingPets } = useGetPets();
  const { data: vets = [], isLoading: isLoadingVets } = useGetVets();
  const deleteRecordMutation = useDeleteMedicalRecord();

  // Get selected pet info
  const selectedPet = pets.find((pet) => pet._id === selectedPetId);

  // Analytics calculation
  const analytics = useMemo(() => {
    const recordsArray = medicalRecords || [];
    const consultations = recordsArray.filter(
      (record) => record.type === "CONSULTATION"
    ).length;
    const vaccinations = recordsArray.filter(
      (record) => record.type === "VACCINATION"
    ).length;
    const bloodTests = recordsArray.filter(
      (record) => record.type === "BLOOD_TEST"
    ).length;
    const xrays = recordsArray.filter(
      (record) => record.type === "X-RAY"
    ).length;
    const others =
      recordsArray.length - consultations - vaccinations - bloodTests - xrays;

    return {
      total: recordsArray.length,
      consultations,
      vaccinations,
      bloodTests,
      xrays,
      others,
    };
  }, [medicalRecords]);

  // Record types
  const recordTypes = [
    { value: "all", label: "All Types" },
    { value: "CONSULTATION", label: "Consultation" },
    { value: "VACCINATION", label: "Vaccination" },
    { value: "BLOOD_TEST", label: "Blood Test" },
    { value: "X-RAY", label: "X-Ray" },
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

  // Event handlers
  const handleDeleteRecord = (recordId) => {
    if (
      window.confirm("Are you sure you want to delete this medical record?")
    ) {
      deleteRecordMutation.mutate(recordId);
    }
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setShowEditModal(true);
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedRecord(null);
    setEditingRecord(null);
  };

  if (isLoading || isLoadingPets || isLoadingVets) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <MedicalRecordHeader
          selectedPet={selectedPet}
          selectedPetId={selectedPetId}
          onAddRecord={() => setShowAddModal(true)}
        />

        {/* Pet Selector */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              View records for:
            </label>
            <select
              value={selectedPetId}
              onChange={(e) => setSelectedPetId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Pets</option>
              {pets.map((pet) => (
                <option key={pet._id} value={pet._id}>
                  {pet.name} {pet.breed ? `(${pet.breed})` : ""}
                </option>
              ))}
            </select>
            {selectedPetId !== "all" && selectedPet && (
              <div className="flex items-center text-sm text-gray-600">
                <Heart className="h-4 w-4 mr-1 text-teal-600" />
                <span>
                  {selectedPet.category} • {selectedPet.age} years old
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Analytics */}
        <MedicalRecordAnalytics analytics={analytics} />

        {/* Filters */}
        <MedicalRecordFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          recordTypes={recordTypes}
        />

        {/* Records Table */}
        <MedicalRecordTable
          filteredRecords={filteredRecords}
          pets={pets}
          selectedPet={selectedPet}
          selectedPetId={selectedPetId}
          onViewRecord={setSelectedRecord}
          onEditRecord={handleEditRecord}
          onDeleteRecord={handleDeleteRecord}
          deleteLoading={deleteRecordMutation.isLoading}
        />

        {/* Modals */}
        {showAddModal && (
          <MedicalRecordFormModal
            pets={pets}
            vets={vets}
            selectedPetId={selectedPetId}
            recordTypes={recordTypes}
            onClose={handleCloseModals}
            onSuccess={() => {
              queryClient.invalidateQueries(["medicalRecords"]);
              handleCloseModals();
            }}
          />
        )}

        {showEditModal && editingRecord && (
          <MedicalRecordFormModal
            pets={pets}
            vets={vets}
            selectedPetId={selectedPetId}
            recordTypes={recordTypes}
            editingRecord={editingRecord}
            onClose={handleCloseModals}
            onSuccess={() => {
              queryClient.invalidateQueries(["medicalRecords"]);
              handleCloseModals();
            }}
          />
        )}

        {selectedRecord && (
          <ViewMedicalRecordModal
            record={selectedRecord}
            pets={pets}
            onClose={() => setSelectedRecord(null)}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />
        )}
      </div>
    </div>
  );
};

export default MedicalRecord;
