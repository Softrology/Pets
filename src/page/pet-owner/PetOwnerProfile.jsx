import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, patch } from "../../services/apiService";
import { GET_PET_OWNER_PROFILE, UPDATE_PET_PROFILE } from "../../services/apiRoutes";
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
  
  Loader2,
  VenusAndMars
} from "lucide-react";

const PetOwnerProfile = () => {
  const PROFILE_STORAGE_KEY = 'petOwnerProfile';
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
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
  });

  // Fetch profile data with caching
  const { data: profileData, isLoading, isError, error } = useQuery({
    queryKey: ['petOwnerProfile'],
    queryFn: async () => {
      try {
        // First check if we have cached data
        const cachedData = getLocalStorage(PROFILE_STORAGE_KEY);
        if (cachedData) return cachedData;

        // If not, fetch from API
        const response = await get(GET_PET_OWNER_PROFILE, getUserToken());
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
        // Add required fields that aren't editable
        formData.append("emailAddress", profileData.emailAddress);
        formData.append("role", profileData.role);

        const response = await patch(
          UPDATE_PET_PROFILE,
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
          profilePicture: response.data.profilePicture || profileData.profilePicture
        };

        setLocalStorage(PROFILE_STORAGE_KEY, updatedProfile, 24);
        setCurrentUser(updatedProfile);

        return response;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update profile");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['petOwnerProfile']);
      AlertDialog("Success", "Profile updated successfully", "success", 1500);
      setIsEditing(false);
    },
    onError: (error) => {
      AlertDialog("Error", error.message, "error");
    }
  });

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
        profilePicture: profileData.profilePicture || "",
      });
      setImagePreview(profileData.profilePicture || "");
    }
  }, [profileData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", profileForm.firstName);
    formData.append("lastName", profileForm.lastName);
    formData.append("phoneNumber", profileForm.phoneNumber);
    formData.append("dateOfBirth", profileForm.dateOfBirth);
    formData.append("gender", profileForm.gender);
    formData.append("country", profileForm.country);
    formData.append("city", profileForm.city);

    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    updateProfileMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-emerald-600" />
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
            onClick={() => queryClient.refetchQueries(['petOwnerProfile'])}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
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
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                My Profile
              </h1>
              <p className="text-emerald-100">
                Manage your personal information and account settings
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={updateProfileMutation.isLoading}
              className="mt-4 md:mt-0 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center disabled:opacity-50"
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
                {/* Profile Picture */}
                <div className="md:col-span-1 flex flex-col items-center">
                  <div className="relative mb-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="h-40 w-40 rounded-full object-cover border-4 border-emerald-100"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDEzVjE3TTE2IDEzSDE2LjAxTTggMTNIOC4wMSIgc3Ryb2tlPSIjOUM5Qzk5IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                        }}
                      />
                    ) : (
                      <div className="h-40 w-40 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-emerald-100">
                        <User className="h-20 w-20 text-emerald-600" />
                      </div>
                    )}
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label className="cursor-pointer bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors">
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
                    <div className="text-sm text-gray-500 flex items-center">
                      <Loader2 className="animate-spin h-4 w-4 mr-2 text-emerald-600" />
                      Uploading image...
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-gray-900 mt-2">
                    {profileForm.firstName} {profileForm.lastName}
                  </h2>
                  <p className="text-emerald-600">
                    {formatUnderscoredString(profileData?.role || '')}
                  </p>
                </div>

                {/* Personal Information */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <User className="h-4 w-4 mr-2 text-emerald-600" />
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={profileForm.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        <User className="h-4 w-4 mr-2 text-emerald-600" />
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={profileForm.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                      <Mail className="h-4 w-4 mr-2 text-emerald-600" />
                      Email Address
                    </label>
                    <p className="px-3 py-2 bg-gray-50 rounded-lg">
                      {profileForm.emailAddress}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-emerald-600" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={profileForm.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        <VenusAndMars className="h-4 w-4 mr-2 text-emerald-600" />
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={profileForm.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                        Country
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={profileForm.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">
                          {profileForm.country || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={profileForm.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-lg">
                          {profileForm.city || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Account Status
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Email Verified</p>
                        <p className="font-medium">
                          {profileData?.isEmailVerified ? (
                            <span className="text-emerald-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Account Active</p>
                        <p className="font-medium">
                          {profileData?.isActivated ? (
                            <span className="text-emerald-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Member Since</p>
                        <p className="font-medium">
                          {profileData?.createdAt ? formatTime(profileData.createdAt) : 'N/A'}
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Last Updated</p>
                        <p className="font-medium">
                          {profileData?.updatedAt ? formatTime(profileData.updatedAt) : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        disabled={updateProfileMutation.isLoading || uploadingImage}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center"
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
  );
};

export default PetOwnerProfile;