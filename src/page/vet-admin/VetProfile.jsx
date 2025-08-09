import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, patch } from "../../services/apiService";
import { GET_VET_PROFILE, UPDATE_VET_PROFILE } from "../../services/apiRoutes";
import {
  getLocalStorage,
  setLocalStorage,
  setCurrentUser,
  isAuthenticated,
  getUserToken,
  getUserRole,
  clearAppStorage,
  formatTime,
  formatUnderscoredString
} from '../../utitlities/Globals';
import AlertDialog from "../../utitlities/Alert";
import {
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Upload,
  Briefcase,
  FileText,
  Stethoscope,
  Activity,
  Award,
  Clock,
  Loader2,
  VenusAndMars,
  DollarSign
} from "lucide-react";

const VetProfile = () => {
  const PROFILE_STORAGE_KEY = 'vetProfile';
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [licensePreview, setLicensePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingLicense, setUploadingLicense] = useState(false);
  const queryClient = useQueryClient();

  // Form state
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "MALE",
    country: "",
    city: "",
    profilePicture: "",
    licenseImage: "",
    consultationFee: "",
    specialization: [],
    qualifications: [],
    availability: []
  });

  // Fetch profile data with caching
  const { data: profileData, isLoading, isError, error } = useQuery({
    queryKey: ['vetProfile'],
    queryFn: async () => {
      try {
        // First check if we have cached data
        const cachedData = getLocalStorage(PROFILE_STORAGE_KEY);
        if (cachedData) return cachedData;

        // If not, fetch from API
        const response = await get(GET_VET_PROFILE, getUserToken());
        const userData = response.data;

        // Save to localStorage
        setLocalStorage(PROFILE_STORAGE_KEY, userData, 24);
        setCurrentUser(userData);

        return userData;
      } catch (error) {
        throw new Error("Failed to fetch profile data");
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await patch(
          UPDATE_VET_PROFILE,
          formData,
          getUserToken(),
          {
            'Content-Type': 'multipart/form-data'
          }
        );

        // Update local storage with new data
        const updatedProfile = {
          ...profileData,
          ...response.data,
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          phoneNumber: formData.get('phoneNumber'),
          dateOfBirth: formData.get('dateOfBirth'),
          gender: formData.get('gender'),
          country: formData.get('country'),
          city: formData.get('city'),
          consultationFee: formData.get('consultationFee'),
          specialization: JSON.parse(formData.get('specialization') || '[]'),
          qualifications: JSON.parse(formData.get('qualifications') || '[]'),
          profilePicture: response.data.profilePicture || profileData.profilePicture,
          licenseImage: response.data.licenseImage || profileData.licenseImage
        };

        setLocalStorage(PROFILE_STORAGE_KEY, updatedProfile, 24);
        setCurrentUser(updatedProfile);

        return response;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update profile");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['vetProfile']);
      AlertDialog("Success", "Profile updated successfully", "success", 1500);
      setIsEditing(false);
      setSelectedFile(null);
      setLicenseFile(null);
    },
    onError: (error) => {
      AlertDialog("Error", error.message, "error");
    }
  });

  // Parse specialization and qualifications arrays from server response
  const parseArrayField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) {
      // If it's already an array of objects, extract the values
      return field.map(item => {
        if (typeof item === 'object' && item !== null) {
          // If it's an object, try to get the value or name property
          return item.value || item.name || item.title || Object.values(item)[0] || '';
        }
        return item || '';
      }).filter(item => item !== '');
    }
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [field];
      } catch {
        return [field];
      }
    }
    return [];
  };

  // Initialize form with profile data
  useEffect(() => {
    if (profileData) {
      setProfileForm({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        emailAddress: profileData.emailAddress || "",
        phoneNumber: profileData.phoneNumber || "",
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: profileData.gender || "MALE",
        country: profileData.country || "",
        city: profileData.city || "",
        consultationFee: profileData.consultationFee || "",
        profilePicture: profileData.profilePicture || "",
        licenseImage: profileData.licenseImage || "",
        specialization: parseArrayField(profileData.specialization),
        qualifications: parseArrayField(profileData.qualifications),
        availability: profileData.availability || []
      });
      setImagePreview(profileData.profilePicture || "");
      setLicensePreview(profileData.licenseImage || "");
    }
  }, [profileData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle specialization changes
  const handleSpecializationChange = (e, index) => {
    const newSpecialization = [...profileForm.specialization];
    newSpecialization[index] = e.target.value;
    setProfileForm(prev => ({ ...prev, specialization: newSpecialization }));
  };

  // Add new specialization field
  const addSpecialization = () => {
    setProfileForm(prev => ({
      ...prev,
      specialization: [...prev.specialization, ""]
    }));
  };

  // Remove specialization field
  const removeSpecialization = (index) => {
    const newSpecialization = profileForm.specialization.filter((_, i) => i !== index);
    setProfileForm(prev => ({ ...prev, specialization: newSpecialization }));
  };

  // Handle qualification changes
  const handleQualificationChange = (e, index) => {
    const newQualifications = [...profileForm.qualifications];
    newQualifications[index] = e.target.value;
    setProfileForm(prev => ({ ...prev, qualifications: newQualifications }));
  };

  // Add new qualification field
  const addQualification = () => {
    setProfileForm(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, ""]
    }));
  };

  // Remove qualification field
  const removeQualification = (index) => {
    const newQualifications = profileForm.qualifications.filter((_, i) => i !== index);
    setProfileForm(prev => ({ ...prev, qualifications: newQualifications }));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      AlertDialog("Error", "Please select a valid image file (JPEG, PNG, GIF)", "error");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      AlertDialog("Error", "Image size should be less than 5MB", "error");
      return;
    }

    setUploadingImage(true);
    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle license image upload
  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      AlertDialog("Error", "Please select a valid file (JPEG, PNG, GIF, PDF)", "error");
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      AlertDialog("Error", "File size should be less than 10MB", "error");
      return;
    }

    setUploadingLicense(true);
    setLicenseFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setLicensePreview(reader.result);
      setUploadingLicense(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!profileForm.firstName.trim()) {
      AlertDialog("Error", "First name is required", "error");
      return;
    }
    if (!profileForm.lastName.trim()) {
      AlertDialog("Error", "Last name is required", "error");
      return;
    }

    const formData = new FormData();
    
    // Add basic profile fields
    formData.append("firstName", profileForm.firstName.trim());
    formData.append("lastName", profileForm.lastName.trim());
    formData.append("phoneNumber", profileForm.phoneNumber.trim());
    formData.append("dateOfBirth", profileForm.dateOfBirth);
    formData.append("gender", profileForm.gender);
    formData.append("country", profileForm.country.trim());
    formData.append("city", profileForm.city.trim());
    formData.append("consultationFee", profileForm.consultationFee);
    
    // Add required fields that aren't editable
    formData.append("emailAddress", profileData.emailAddress);
    formData.append("role", profileData.role);
    
    // Process and add specializations as objects
    const validSpecializations = profileForm.specialization
      .filter(spec => spec && spec.trim())
      .map(spec => ({ name: spec.trim() }));
    formData.append("specialization", JSON.stringify(validSpecializations));

    // Process and add qualifications as objects  
    const validQualifications = profileForm.qualifications
      .filter(qual => qual && qual.trim())
      .map(qual => ({ title: qual.trim() }));
    formData.append("qualifications", JSON.stringify(validQualifications));

    // Add availability
    formData.append("availability", JSON.stringify(profileForm.availability));

    // Handle file uploads
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    if (licenseFile) {
      formData.append("licenseImage", licenseFile);
    }

    // Debug: Log form data (remove in production)
    console.log('Form data being sent:');
    for (let [key, value] of formData.entries()) {
      if (key === 'specialization' || key === 'qualifications') {
        console.log(key, JSON.parse(value));
      } else {
        console.log(key, value);
      }
    }

    updateProfileMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={() => queryClient.refetchQueries(['vetProfile'])}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Veterinarian Profile
              </h1>
              <p className="text-blue-100">
                Manage your professional information and account settings
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={updateProfileMutation.isLoading}
              className="mt-4 md:mt-0 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center disabled:opacity-50"
            >
              {isEditing ? (
                <X className="h-5 w-5 mr-2" />
              ) : (
                <Edit className="h-5 w-5 mr-2" />
              )}
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Picture and License */}
                <div className="md:col-span-1 flex flex-col items-center space-y-6">
                  {/* Profile Picture */}
                  <div className="relative mb-4 w-full">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      Profile Picture
                    </h3>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="h-40 w-40 rounded-full object-cover border-4 border-blue-100 mx-auto"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDEzVjE3TTE2IDEzSDE2LjAxTTggMTNIOC4wMSIgc3Ryb2tlPSIjOUM5Qzk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                        }}
                      />
                    ) : (
                      <div className="h-40 w-40 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-100 mx-auto">
                        <User className="h-20 w-20 text-blue-600" />
                      </div>
                    )}
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label className="cursor-pointer bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                          <Upload className="h-5 w-5" />
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {uploadingImage && (
                    <div className="text-sm text-gray-500 flex items-center justify-center w-full">
                      <Loader2 className="animate-spin h-4 w-4 mr-2 text-blue-600" />
                      Uploading image...
                    </div>
                  )}

                  {/* License Image */}
                  <div className="relative w-full">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      License
                    </h3>
                    {licensePreview ? (
                      <div className="border-2 border-dashed border-blue-100 rounded-lg p-2">
                        <img
                          src={licensePreview}
                          alt="License"
                          className="h-40 w-full object-contain mx-auto"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDEzVjE3TTE2IDEzSDE2LjAxTTggMTNIOC4wMSIgc3Ryb2tlPSIjOUM5Qzk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-40 w-full bg-blue-50 flex items-center justify-center border-2 border-dashed border-blue-100 rounded-lg">
                        <FileText className="h-20 w-20 text-blue-300" />
                      </div>
                    )}
                    {isEditing && (
                      <div className="mt-2">
                        <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload License
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={handleLicenseUpload}
                            disabled={uploadingLicense}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {uploadingLicense && (
                    <div className="text-sm text-gray-500 flex items-center justify-center w-full">
                      <Loader2 className="animate-spin h-4 w-4 mr-2 text-blue-600" />
                      Uploading license...
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-gray-900 mt-2">
                    {profileForm.firstName} {profileForm.lastName}
                  </h2>
                  <p className="text-blue-600">
                    {formatUnderscoredString(profileData?.role || '')}
                  </p>
                </div>

                {/* Personal Information */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        First Name *
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={profileForm.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">
                          {profileForm.firstName || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        Last Name *
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={profileForm.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">
                          {profileForm.lastName || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      Email Address
                    </label>
                    <p className="px-3 py-2 bg-gray-50 rounded-lg">
                      {profileForm.emailAddress}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        pattern="[0-9]{10,15}"
                        title="Please enter a valid phone number"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg">
                        {profileForm.phoneNumber || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={profileForm.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          max={new Date().toISOString().split("T")[0]}
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">
                          {profileForm.dateOfBirth || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <VenusAndMars className="h-4 w-4 mr-2 text-blue-600" />
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={profileForm.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg capitalize">
                          {profileForm.gender?.toLowerCase() || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                        Country
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={profileForm.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">
                          {profileForm.country || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={profileForm.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">
                          {profileForm.city || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                      Consultation Fee
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="consultationFee"
                        value={profileForm.consultationFee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                        placeholder="Enter consultation fee"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg">
                        {profileForm.consultationFee ? `${profileForm.consultationFee}` : "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Specializations */}
                  <div className="pt-4 mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Stethoscope className="h-4 w-4 mr-2 text-blue-600" />
                      Specializations
                    </h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        {profileForm.specialization.map((spec, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={spec}
                              onChange={(e) => handleSpecializationChange(e, index)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter specialization"
                            />
                            <button
                              type="button"
                              onClick={() => removeSpecialization(index)}
                              className="p-2 text-red-500 hover:text-red-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSpecialization}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <span className="mr-1">+</span> Add Specialization
                        </button>
                      </div>
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg min-h-10">
                        {profileForm.specialization.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {profileForm.specialization.map((spec, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {spec}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No specializations added</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Qualifications */}
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-blue-600" />
                      Qualifications
                    </h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        {profileForm.qualifications.map((qual, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={qual}
                              onChange={(e) => handleQualificationChange(e, index)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter qualification"
                            />
                            <button
                              type="button"
                              onClick={() => removeQualification(index)}
                              className="p-2 text-red-500 hover:text-red-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addQualification}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <span className="mr-1">+</span> Add Qualification
                        </button>
                      </div>
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 rounded-lg min-h-10">
                        {profileForm.qualifications.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1">
                            {profileForm.qualifications.map((qual, index) => (
                              <li key={index}>{qual}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">No qualifications added</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Account Status */}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Account Status
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Email Verified</p>
                        <p className="font-medium">
                          {profileData?.isEmailVerified ? (
                            <span className="text-blue-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Account Active</p>
                        <p className="font-medium">
                          {profileData?.isActivated ? (
                            <span className="text-blue-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Approved</p>
                        <p className="font-medium">
                          {profileData?.isApproved ? (
                            <span className="text-blue-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Member Since</p>
                        <p className="font-medium">
                          {profileData?.createdAt ? formatTime(profileData.createdAt) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        disabled={updateProfileMutation.isLoading || uploadingImage || uploadingLicense}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                      >
                        {updateProfileMutation.isLoading ? (
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {updateProfileMutation.isLoading
                          ? "Saving..."
                          : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    //jk
  );
};

export default VetProfile;