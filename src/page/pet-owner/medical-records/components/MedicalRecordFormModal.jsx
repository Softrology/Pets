import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { X, Save, Upload } from "lucide-react";
import { post, patch } from "../../../../services/apiService";
import {
  POST_MEDICAL_RECORD,
  UPDATE_MEDICAL_RECORD,
} from "../../../../services/apiRoutes";
import { getUserToken } from "../../../../utitlities/Globals";
import AlertDialog from "../../../../utitlities/Alert";

const MedicalRecordFormModal = ({
  pets,
  vets,
  selectedPetId,
  recordTypes,
  editingRecord = null,
  onClose,
  onSuccess,
}) => {
  const isEditing = !!editingRecord;
  const token = getUserToken();

  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Form state
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
    bloodTests: [], // New field for blood tests
    x_rays: [], // New field for x-rays
  });

  // Initialize form when editing or when selectedPetId changes
  useEffect(() => {
    if (isEditing && editingRecord) {
      setRecordForm({
        pet: editingRecord.pet._id || editingRecord.pet,
        type: editingRecord.type,
        date: new Date(editingRecord.date).toISOString().slice(0, 16),
        prescription: editingRecord.prescription || "",
        clinicName: editingRecord.clinicName || "",
        isExistingVet: editingRecord.isExistingVet || false,
        existingVet: editingRecord.existingVet || "",
        vet: editingRecord.vet || "",
        images: editingRecord.images || [],
        bloodTests: editingRecord.bloodTests || [],
        x_rays: editingRecord.x_rays || [],
      });
      // Set input values for editing
      setBloodTestInput((editingRecord.bloodTests || []).join(", "));
      setXRayInput((editingRecord.x_rays || []).join(", "));
      setSelectedFiles([]);
    } else {
      // For add mode, reset form and pre-select pet if coming from specific pet view
      setRecordForm({
        pet: selectedPetId !== "all" ? selectedPetId : "",
        type: "CONSULTATION",
        date: new Date().toISOString().slice(0, 16),
        prescription: "",
        clinicName: "",
        isExistingVet: false,
        existingVet: "",
        vet: "",
        images: [],
        bloodTests: [],
        x_rays: [],
      });
      setBloodTestInput("");
      setXRayInput("");
      setSelectedFiles([]);
    }
  }, [isEditing, editingRecord, selectedPetId]);

  // Add medical record mutation
  const useAddMedicalRecord = () => {
    return useMutation({
      mutationFn: async (recordData) => {
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

        if (recordData.isExistingVet && recordData.existingVet) {
          formData.append("existingVet", recordData.existingVet);
        }

        if (!recordData.isExistingVet && recordData.vet) {
          formData.append("vet", recordData.vet);
        }

        if (recordData.imageFiles && recordData.imageFiles.length > 0) {
          recordData.imageFiles.forEach((file) => {
            formData.append("images", file);
          });
        }

        // ONLY add conditional fields based on type - using the passed arrays
        if (
          recordData.type === "BLOOD_TEST" &&
          recordData._bloodTests &&
          recordData._bloodTests.length > 0
        ) {
          formData.append("bloodTests", JSON.stringify(recordData._bloodTests));
        }

        if (
          recordData.type === "X-RAY" &&
          recordData._x_rays &&
          recordData._x_rays.length > 0
        ) {
          formData.append("x_rays", JSON.stringify(recordData._x_rays));
        }

        // Add conditional fields based on type
        if (
          recordData.type === "BLOOD_TEST" &&
          recordData.bloodTests &&
          recordData.bloodTests.length > 0
        ) {
          formData.append("bloodTests", JSON.stringify(recordData.bloodTests));
        }

        if (
          recordData.type === "X-RAY" &&
          recordData.x_rays &&
          recordData.x_rays.length > 0
        ) {
          formData.append("x_rays", JSON.stringify(recordData.x_rays));
        }

        const response = await post(POST_MEDICAL_RECORD, formData, token, {
          "Content-Type": "multipart/form-data",
        });

        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Medical record added successfully",
          "success",
          1500
        );
        onSuccess();
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

  // Update medical record mutation
  const useUpdateMedicalRecord = () => {
    return useMutation({
      mutationFn: async ({ id, recordData }) => {
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

        if (recordData.isExistingVet && recordData.existingVet) {
          formData.append("existingVet", recordData.existingVet);
        }

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
        onSuccess();
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

  const addRecordMutation = useAddMedicalRecord();
  const updateRecordMutation = useUpdateMedicalRecord();

  // Define loading state
  const isLoading =
    addRecordMutation.isLoading || updateRecordMutation.isLoading;

  const handleSubmit = (e) => {
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

    if (!recordForm.type) {
      AlertDialog("Validation Error", "Record type is required", "error", 2000);
      return;
    }

    if (!recordForm.date) {
      AlertDialog("Validation Error", "Date is required", "error", 2000);
      return;
    }

    if (recordForm.isExistingVet && !recordForm.existingVet) {
      AlertDialog(
        "Validation Error",
        "Please select an existing veterinarian",
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
      imageFiles: selectedFiles,
      // Pass the arrays directly for FormData processing, but don't add them as properties
      _bloodTests:
        recordForm.type === "BLOOD_TEST" ? recordForm.bloodTests : undefined,
      _x_rays: recordForm.type === "X-RAY" ? recordForm.x_rays : undefined,
    };

    if (isEditing) {
      recordData.existingImages = recordForm.images;
      updateRecordMutation.mutate({
        id: editingRecord._id,
        recordData: recordData,
      });
    } else {
      addRecordMutation.mutate(recordData);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    setUploadingImages(true);

    try {
      for (let file of files) {
        if (file.size > 10 * 1024 * 1024) {
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

  // Helper functions for array fields - using a different approach
  const [bloodTestInput, setBloodTestInput] = useState("");
  const [xRayInput, setXRayInput] = useState("");

  const handleArrayInputChange = (fieldName, value, setInput) => {
    setInput(value);

    // Parse the comma-separated input into array
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    setRecordForm((prev) => ({
      ...prev,
      [fieldName]: arrayValue,
    }));
  };

  const addArrayItem = (fieldName, inputValue, setInput) => {
    if (inputValue.trim()) {
      const newItem = inputValue.trim();
      setRecordForm((prev) => ({
        ...prev,
        [fieldName]: [...prev[fieldName], newItem],
      }));
      setInput("");
    }
  };

  const removeArrayItem = (fieldName, index) => {
    setRecordForm((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }));
  };

  // Handle record type change and clear conditional fields
  const handleTypeChange = (newType) => {
    setRecordForm((prev) => ({
      ...prev,
      type: newType,
      // Clear conditional fields when switching types
      bloodTests: newType === "BLOOD_TEST" ? prev.bloodTests : [],
      x_rays: newType === "X-RAY" ? prev.x_rays : [],
    }));

    // Clear input fields when switching types
    if (newType !== "BLOOD_TEST") {
      setBloodTestInput("");
    }
    if (newType !== "X-RAY") {
      setXRayInput("");
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Medical Record" : "Add New Medical Record"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet <span className="text-red-500">*</span>
                </label>
                <select
                  value={recordForm.pet}
                  onChange={(e) => {
                    setRecordForm({ ...recordForm, pet: e.target.value });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                        existingVet: e.target.checked
                          ? recordForm.existingVet
                          : "",
                        vet: e.target.checked ? "" : recordForm.vet,
                      });
                    }}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required={recordForm.isExistingVet}
                    >
                      <option value="">Select a veterinarian</option>
                      {vets.map((vet) => (
                        <option key={vet._id} value={vet._id}>
                          Dr. {vet.name}{" "}
                          {vet.specialization ? `- ${vet.specialization}` : ""}
                        </option>
                      ))}
                    </select>
                    {recordForm.isExistingVet && !recordForm.existingVet && (
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter veterinarian name"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter prescription details or notes..."
              />
            </div>

            {/* Conditional Fields Based on Record Type */}
            {recordForm.type === "BLOOD_TEST" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Tests
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={bloodTestInput}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "bloodTests",
                          e.target.value,
                          setBloodTestInput
                        )
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addArrayItem(
                            "bloodTests",
                            bloodTestInput,
                            setBloodTestInput
                          );
                        }
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Type and press Enter or use commas: Glucose, CBC, Hemoglobin"
                    />
                  </div>

                  {recordForm.bloodTests.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {recordForm.bloodTests.map((test, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full flex items-center gap-1"
                        >
                          {test}
                          <button
                            type="button"
                            onClick={() => removeArrayItem("bloodTests", index)}
                            className="ml-1 text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Type comma-separated values or press Enter to add individual
                    items
                  </p>
                </div>
              </div>
            )}

            {recordForm.type === "X-RAY" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  X-Ray Details
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={xRayInput}
                      onChange={(e) =>
                        handleArrayInputChange(
                          "x_rays",
                          e.target.value,
                          setXRayInput
                        )
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addArrayItem("x_rays", xRayInput, setXRayInput);
                        }
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Type and press Enter or use commas: Chest X-Ray, Leg X-Ray"
                    />
                  </div>

                  {recordForm.x_rays.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {recordForm.x_rays.map((xray, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center gap-1"
                        >
                          {xray}
                          <button
                            type="button"
                            onClick={() => removeArrayItem("x_rays", index)}
                            className="ml-1 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Type comma-separated values or press Enter to add individual
                    items
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? "Upload More Images" : "Upload Images"}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
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
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600 mr-2"></div>
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
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || uploadingImages || !recordForm.pet}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isLoading
                  ? isEditing
                    ? "Updating..."
                    : "Adding..."
                  : isEditing
                  ? "Update Record"
                  : "Add Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordFormModal;
