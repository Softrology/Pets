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
  Scale,
  X,
  Save,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

// Mock API functions for demonstration
const mockApiService = {
  get: async (url, token) => {
    console.log("GET request to:", url, "with token:", token);
    // Return mock data for demonstration
    return {
      data: [
        {
          _id: "1",
          name: "Buddy",
          category: "DOG",
          age: 3,
          weight: "25kg",
          gender: "MALE",
          feed: ["Dry food", "Treats"],
          images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=400"]
        },
        {
          _id: "2",
          name: "Whiskers",
          category: "CAT",
          age: 2,
          weight: "4kg",
          gender: "FEMALE",
          feed: ["Wet food", "Fish"],
          images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"]
        }
      ]
    };
  },
  post: async (url, data, token) => {
    console.log("POST request to:", url, "with data:", data, "and token:", token);
    return { message: "Pet added successfully", data: { _id: Date.now().toString(), ...data } };
  },
  patch: async (url, data, token) => {
    console.log("PATCH request to:", url, "with data:", data, "and token:", token);
    return { message: "Pet updated successfully" };
  },
  del: async (url, token) => {
    console.log("DELETE request to:", url, "with token:", token);
    return { message: "Pet deleted successfully" };
  }
};

// Mock API routes
const API_ROUTES = {
  POST_PET: "/api/pets",
  GET_ALL_PETS: "/api/pets",
  DELETE_PET: (id) => `/api/pets/${id}`,
  UPDATE_PET: (id) => `/api/pets/${id}`,
  GET_PET_BY_ID: (id) => `/api/pets/${id}`,
};

// Mock getUserToken function
const getUserToken = () => "mock-auth-token-12345";

// Mock AlertDialog function
const AlertDialog = (title, message, type, duration = 3000) => {
  const alertType = type === "error" ? "Error" : type === "success" ? "Success" : "Info";
  console.log(`${alertType}: ${title} ${message}`);
  // In a real app, this would show a proper alert/toast
  alert(`${alertType}: ${message}`);
};

const MyPet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [selectedPet, setSelectedPet] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const queryClient = useQueryClient();

  // Form state for adding/editing pets
  const [petForm, setPetForm] = useState({
    name: "",
    category: "DOG",
    age: "",
    weight: "",
    gender: "MALE",
    feed: [],
    images: [],
  });

  // Custom hook to fetch all pets
  const useGetPets = (token) => {
    return useQuery({
      queryKey: ["pets"],
      queryFn: async () => {
        try {
          console.log("Making request with token:", token);
          const response = await mockApiService.get(API_ROUTES.GET_ALL_PETS, token);
          console.log("Full response:", response);
          console.log("Response data:", response?.data);
          return response.data || [];
        } catch (error) {
          console.error("Fetch error:", error);
          throw error;
        }
      },
      onError: (error) => {
        AlertDialog("Error", error.message, "error");
      }
    });
  };

  console.log("This is the user token", getUserToken());

  // Custom hook to add pet
  const useAddPet = () => {
    return useMutation({
      mutationFn: async (petData) => {
        console.log("Submitting pet data:", petData);
        
        // Create proper payload structure
        const payload = {
          name: petData.name.trim(),
          category: petData.category,
          age: parseInt(petData.age) || 0,
          weight: petData.weight,
          gender: petData.gender,
          feed: Array.isArray(petData.feed) ? petData.feed : [],
          images: Array.isArray(petData.images) ? petData.images : []
        };

        console.log("Final payload being sent:", payload);
        
        // If you need to send as FormData (for file uploads), uncomment below:
        // const formData = new FormData();
        // Object.keys(payload).forEach(key => {
        //   if (key === 'feed' || key === 'images') {
        //     formData.append(key, JSON.stringify(payload[key]));
        //   } else {
        //     formData.append(key, payload[key]);
        //   }
        // });
        // const response = await mockApiService.post(API_ROUTES.POST_PET, formData, getUserToken());

        // For JSON payload (current implementation):
        const response = await mockApiService.post(API_ROUTES.POST_PET, payload, getUserToken());
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Pet added successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["pets"]);
        setShowAddModal(false);
        resetForm();
      },
      onError: (error) => {
        console.error("Add pet error:", error);
        AlertDialog("", error.message || "Something went wrong", "error", 1500);
      },
    });
  };

  // Custom hook to update pet
  const useUpdatePet = () => {
    return useMutation({
      mutationFn: async ({ id, petData }) => {
        console.log("Updating pet with data:", petData);
        
        const payload = {
          name: petData.name.trim(),
          category: petData.category,
          age: parseInt(petData.age) || 0,
          weight: petData.weight,
          gender: petData.gender,
          feed: Array.isArray(petData.feed) ? petData.feed : [],
          images: Array.isArray(petData.images) ? petData.images : []
        };

        console.log("Update payload being sent:", payload);
        const response = await mockApiService.patch(API_ROUTES.UPDATE_PET(id), payload, getUserToken());
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Pet updated successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["pets"]);
        setShowEditModal(false);
        setEditingPet(null);
        resetForm();
      },
      onError: (error) => {
        console.error("Update pet error:", error);
        AlertDialog("", error.message || "Something went wrong", "error", 1500);
      },
    });
  };

  // Custom hook to delete pet
  const useDeletePet = () => {
    return useMutation({
      mutationFn: async (id) => {
        const response = await mockApiService.del(API_ROUTES.DELETE_PET(id), getUserToken());
        return response;
      },
      onSuccess: (data) => {
        AlertDialog(
          "",
          data.message || "Pet deleted successfully",
          "success",
          1500
        );
        queryClient.invalidateQueries(["pets"]);
      },
      onError: (error) => {
        AlertDialog("", error.message || "Something went wrong", "error", 1500);
      },
    });
  };

  // Use the custom hooks
  const {
    data: pets,
    isLoading,
    refetch,
    isRefetching,
  } = useGetPets(getUserToken());
  const addPetMutation = useAddPet();
  const updatePetMutation = useUpdatePet();
  const deletePetMutation = useDeletePet();

  // Calculate analytics
  const analytics = useMemo(() => {
    const petsArray = pets || [];
    const total = petsArray.length;
    const dogs = petsArray.filter((pet) => pet.category === "DOG").length;
    const cats = petsArray.filter((pet) => pet.category === "CAT").length;
    const others = total - dogs - cats;

    return { total, dogs, cats, others };
  }, [pets]);

  const petCategories = [
    { value: "all", label: "All Categories" },
    { value: "DOG", label: "Dog" },
    { value: "CAT", label: "Cat" },
    { value: "BIRD", label: "Bird" },
    { value: "FISH", label: "Fish" },
    { value: "REPTILE", label: "Reptile" },
    { value: "SMALL_MAMMAL", label: "Small Mammal" },
    { value: "AMPHIBIAN", label: "Amphibian" },
    { value: "FARM_ANIMAL", label: "Farm Animal" },
    { value: "EXOTIC", label: "Exotic" },
    { value: "OTHER", label: "Others" },
  ];

  // Filter pets
  const filteredPets = useMemo(() => {
    const petsArray = pets || [];
    return petsArray.filter((pet) => {
      const matchesSearch = pet.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || pet.category === categoryFilter;

      const matchesGender =
        genderFilter === "all" || pet.gender === genderFilter;

      return matchesSearch && matchesCategory && matchesGender;
    });
  }, [pets, searchTerm, categoryFilter, genderFilter]);

  const resetForm = () => {
    setPetForm({
      name: "",
      category: "DOG",
      age: "",
      weight: "",
      gender: "MALE",
      feed: [],
      images: [],
    });
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    
    // Validation
    if (!petForm.name.trim()) {
      AlertDialog("", "Pet name is required", "error", 1500);
      return;
    }
    
    if (!petForm.category) {
      AlertDialog("", "Pet category is required", "error", 1500);
      return;
    }

    // Prepare the data
    const petData = {
      name: petForm.name.trim(),
      category: petForm.category,
      age: petForm.age ? parseInt(petForm.age) : 0,
      weight: petForm.weight.trim(),
      gender: petForm.gender,
      feed: petForm.feed || [],
      images: petForm.images || []
    };

    console.log("Submitting pet data:", petData);
    addPetMutation.mutate(petData);
  };

  const handleUpdatePet = (e) => {
    e.preventDefault();
    
    if (!petForm.name.trim()) {
      AlertDialog("", "Pet name is required", "error", 1500);
      return;
    }

    const petData = {
      name: petForm.name.trim(),
      category: petForm.category,
      age: petForm.age ? parseInt(petForm.age) : 0,
      weight: petForm.weight.trim(),
      gender: petForm.gender,
      feed: petForm.feed || [],
      images: petForm.images || []
    };

    updatePetMutation.mutate({
      id: editingPet._id,
      petData: petData,
    });
  };

  const handleDeletePet = (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      deletePetMutation.mutate(petId);
    }
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name || "",
      category: pet.category || "DOG",
      age: pet.age ? pet.age.toString() : "",
      weight: pet.weight || "",
      gender: pet.gender || "MALE",
      feed: Array.isArray(pet.feed) ? pet.feed : [],
      images: Array.isArray(pet.images) ? pet.images : [],
    });
    setShowEditModal(true);
  };

  const handleFeedChange = (e) => {
    const value = e.target.value;
    const feedArray = value.split(",").map((item) => item.trim()).filter(Boolean);
    setPetForm({ ...petForm, feed: feedArray });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingImages(true);

    try {
      // Convert files to base64 URLs for preview (in real app, upload to server)
      const imagePromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            // For demo, create mock URLs
            const mockUrl = `https://res.cloudinary.com/demo/image/upload/v${Date.now()}/pet_images/${file.name.replace(/\s+/g, '_')}`;
            resolve(mockUrl);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const imageUrls = await Promise.all(imagePromises);

      setPetForm(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));

    } catch (error) {
      console.error("Image upload error:", error);
      AlertDialog("", "Failed to upload images", "error", 1500);
    } finally {
      setUploadingImages(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    setPetForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const formatWeight = (weight) => {
    if (!weight) return "N/A";
    return weight.toString().includes("kg") ? weight : `${weight}kg`;
  };

  const formatCategory = (category) => {
    if (!category) return "Unknown";
    return category.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  console.log("filtered pets =============>>>>", filteredPets);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                My Pets
              </h1>
              <p className="text-emerald-100">
                Manage your pets, their information, and keep track of their details
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 md:mt-0 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Pet
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-lg">
                <span className="text-amber-600 text-lg">🐕</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Dogs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.dogs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-lg">🐱</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cats</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.cats}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-green-600 text-lg">🐾</span>
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
                placeholder="Search pets by name..."
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
                className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? "rotate-180" : ""
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
                    Category Filter
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {petCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender Filter
                  </label>
                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="all">All Genders</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pets Grid/Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Mobile View - Cards */}
          <div className="md:hidden">
            {filteredPets.map((pet) => (
              <div
                key={pet._id}
                className="border-b border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {pet.images && pet.images.length > 0 ? (
                      <img
                        className="h-16 w-16 rounded-lg object-cover"
                        src={pet.images[0]}
                        alt={pet.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`h-16 w-16 rounded-lg bg-emerald-100 flex items-center justify-center ${pet.images && pet.images.length > 0 ? 'hidden' : ''}`}>
                      <Heart className="h-8 w-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {pet.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedPet(pet)}
                          className="text-emerald-600 hover:text-emerald-900 p-1"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditPet(pet)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePet(pet._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">
                        {formatCategory(pet.category)} • {pet.gender} • {pet.age} years
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Weight: {formatWeight(pet.weight)}
                      </p>
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
                    Pet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPets.map((pet) => (
                  <tr
                    key={pet._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {pet.images && pet.images.length > 0 ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={pet.images[0]}
                              alt={pet.name}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center ${pet.images && pet.images.length > 0 ? 'hidden' : ''}`}>
                            <Heart className="h-6 w-6 text-emerald-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {pet.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pet.gender}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {formatCategory(pet.category)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {pet.age} years
                        </div>
                        <div className="flex items-center">
                          <Scale className="h-4 w-4 mr-1 text-gray-400" />
                          {formatWeight(pet.weight)}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {pet.feed && pet.feed.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {pet.feed.slice(0, 2).map((food, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                              >
                                {food}
                              </span>
                            ))}
                            {pet.feed.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{pet.feed.length - 2} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">No feed specified</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedPet(pet)}
                          className="text-emerald-600 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleEditPet(pet)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                          title="Edit Pet"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDeletePet(pet._id)}
                          disabled={deletePetMutation.isLoading}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50"
                          title="Delete Pet"
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

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No pets found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Add Pet Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Add New Pet</h2>
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

                <form onSubmit={handleAddPet} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pet Name *
                      </label>
                      <input
                        type="text"
                        value={petForm.name}
                        onChange={(e) =>
                          setPetForm({ ...petForm, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter pet name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={petForm.category}
                        onChange={(e) => setPetForm({ ...petForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="DOG">Dog</option>
                        <option value="CAT">Cat</option>
                        <option value="BIRD">Bird</option>
                        <option value="FISH">Fish</option>
                        <option value="REPTILE">Reptile</option>
                        <option value="SMALL_MAMMAL">Small Mammal</option>
                        <option value="AMPHIBIAN">Amphibian</option>
                        <option value="FARM_ANIMAL">Farm Animal</option>
                        <option value="EXOTIC">Exotic</option>
                        <option value="OTHER">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        value={petForm.age}
                        onChange={(e) =>
                          setPetForm({ ...petForm, age: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter age"
                        min="0"
                        max="50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={petForm.weight}
                        onChange={(e) =>
                          setPetForm({ ...petForm, weight: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., 10kg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={petForm.gender}
                        onChange={(e) =>
                          setPetForm({ ...petForm, gender: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Feed (comma separated)
                      </label>
                      <input
                        type="text"
                        value={petForm.feed.join(", ")}
                        onChange={handleFeedChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., Dry food, Treats, Fish"
                      />
                    </div>
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
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 10MB each)
                          </p>
                        </div>
                        <input
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
                        Uploading images...
                      </div>
                    )}
                  </div>

                  {/* Preview uploaded images */}
                  {petForm.images.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Previews ({petForm.images.length} image{petForm.images.length !== 1 ? 's' : ''})
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {petForm.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTE2IDlIMTJNMTIgOUw4IDlNOCA5VjEzTTggMTNWMTdIMTIiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
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
                      disabled={addPetMutation.isLoading || uploadingImages}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {addPetMutation.isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {addPetMutation.isLoading ? "Adding..." : "Add Pet"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Pet Modal */}
        {showEditModal && editingPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Edit Pet: {editingPet.name}</h2>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingPet(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdatePet} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pet Name *
                      </label>
                      <input
                        type="text"
                        value={petForm.name}
                        onChange={(e) =>
                          setPetForm({ ...petForm, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter pet name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={petForm.category}
                        onChange={(e) =>
                          setPetForm({ ...petForm, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="DOG">Dog</option>
                        <option value="CAT">Cat</option>
                        <option value="BIRD">Bird</option>
                        <option value="FISH">Fish</option>
                        <option value="REPTILE">Reptile</option>
                        <option value="SMALL_MAMMAL">Small Mammal</option>
                        <option value="AMPHIBIAN">Amphibian</option>
                        <option value="FARM_ANIMAL">Farm Animal</option>
                        <option value="EXOTIC">Exotic</option>
                        <option value="OTHER">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        value={petForm.age}
                        onChange={(e) =>
                          setPetForm({ ...petForm, age: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter age"
                        min="0"
                        max="50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={petForm.weight}
                        onChange={(e) =>
                          setPetForm({ ...petForm, weight: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., 10kg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={petForm.gender}
                        onChange={(e) =>
                          setPetForm({ ...petForm, gender: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Feed (comma separated)
                      </label>
                      <input
                        type="text"
                        value={petForm.feed.join(", ")}
                        onChange={handleFeedChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., Dry food, Treats, Fish"
                      />
                    </div>
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
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 10MB each)
                          </p>
                        </div>
                        <input
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
                        Uploading images...
                      </div>
                    )}
                  </div>

                  {/* Preview existing and new images */}
                  {petForm.images.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Previews ({petForm.images.length} image{petForm.images.length !== 1 ? 's' : ''})
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {petForm.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTE2IDlIMTJNMTIgOUw4IDlNOCA5VjEzTTggMTNWMTdIMTIiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
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
                        setEditingPet(null);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updatePetMutation.isLoading || uploadingImages}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center"
                    >
                      {updatePetMutation.isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {updatePetMutation.isLoading ? "Updating..." : "Update Pet"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Pet Details Modal */}
        {selectedPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Pet Details: {selectedPet.name}
                  </h2>
                  <button
                    onClick={() => setSelectedPet(null)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Pet Images */}
                  {selectedPet.images && selectedPet.images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Photos ({selectedPet.images.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedPet.images.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                          >
                            <img
                              src={image}
                              alt={`${selectedPet.name} ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                              onClick={() => window.open(image, '_blank')}
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTE2IDlIMTJNMTIgOUw4IDlNOCA5VjEzTTggMTNWMTdIMTIiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pet Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Heart className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">Name:</span>
                            <p className="font-medium">{selectedPet.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-emerald-600 mr-3 text-lg">🐾</span>
                          <div>
                            <span className="text-sm text-gray-500">Category:</span>
                            <p className="font-medium">
                              {formatCategory(selectedPet.category)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-emerald-600 mr-3 text-lg">
                            {selectedPet.gender === 'MALE' ? '♂️' : '♀️'}
                          </span>
                          <div>
                            <span className="text-sm text-gray-500">Gender:</span>
                            <p className="font-medium">{selectedPet.gender}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Physical Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">Age:</span>
                            <p className="font-medium">{selectedPet.age} years old</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Scale className="h-5 w-5 text-emerald-600 mr-3" />
                          <div>
                            <span className="text-sm text-gray-500">Weight:</span>
                            <p className="font-medium">
                              {formatWeight(selectedPet.weight)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feed Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Feeding Information
                    </h3>
                    {selectedPet.feed && selectedPet.feed.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedPet.feed.map((food, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No feed information provided</p>
                    )}
                  </div