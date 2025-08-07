// redux/slices/homepageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../../services/apiService";

// API Routes
const HOMEPAGE_ROUTES = {
  GET_ALL_AVAILABLE_VETS: "/vet/get-all-available-vets-on-landing-page",
  SEARCH_VETS: "/vet/get-all-search-results-for-user",
  GET_FILTERED_VETS: "/vet/get-all-vets-for-user",
};

// Async Thunks
export const fetchAvailableVets = createAsyncThunk(
  "homepage/fetchAvailableVets",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if we already have vets in state to avoid unnecessary API calls
      const { homepage } = getState();
      if (homepage.availableVets.length > 0 && !homepage.shouldRefetchVets) {
        return { data: homepage.availableVets, fromCache: true };
      }

      const response = await get(HOMEPAGE_ROUTES.GET_ALL_AVAILABLE_VETS);
      return { data: response.data || [], fromCache: false };
    } catch (error) {
      console.error("Fetch available vets error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch available vets"
      );
    }
  }
);

export const searchVets = createAsyncThunk(
  "homepage/searchVets",
  async ({ query }, { rejectWithValue }) => {
    try {
      if (!query || query.trim() === "") {
        return { data: [], query: "" };
      }

      const response = await get(
        `${HOMEPAGE_ROUTES.SEARCH_VETS}?query=${encodeURIComponent(
          query.trim()
        )}`
      );
      return { data: response.data || [], query: query.trim() };
    } catch (error) {
      console.error("Search vets error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to search vets"
      );
    }
  }
);

export const getFilteredVets = createAsyncThunk(
  "homepage/getFilteredVets",
  async (
    { specialization, name, page = 1, limit = 10 },
    { rejectWithValue }
  ) => {
    try {
      let queryParams = [];

      if (specialization && specialization.trim() !== "") {
        queryParams.push(
          `specialization=${encodeURIComponent(specialization.trim())}`
        );
      }

      if (name && name.trim() !== "") {
        queryParams.push(`name=${encodeURIComponent(name.trim())}`);
      }

      if (page) {
        queryParams.push(`page=${page}`);
      }

      if (limit) {
        queryParams.push(`limit=${limit}`);
      }

      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const response = await get(
        `${HOMEPAGE_ROUTES.GET_FILTERED_VETS}${queryString}`
      );

      return {
        data: response.data || {
          vets: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
        filters: { specialization, name, page, limit },
      };
    } catch (error) {
      console.error("Get filtered vets error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to get filtered vets"
      );
    }
  }
);

// Initial state
const initialState = {
  // Available vets for landing page
  availableVets: [],
  availableVetsLoading: false,
  availableVetsError: null,
  shouldRefetchVets: false,

  // Search results
  searchResults: [],
  searchLoading: false,
  searchError: null,
  lastSearchQuery: "",

  // Filtered vets
  filteredVets: {
    vets: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  filteredVetsLoading: false,
  filteredVetsError: null,
  currentFilters: {
    specialization: "",
    name: "",
    page: 1,
    limit: 10,
  },

  // Symptoms and diseases data
  symptoms: [],
  diseases: [],

  // Cache timestamp for smart refetching
  lastFetchTimestamp: null,
  cacheExpirationTime: 5 * 60 * 1000, // 5 minutes in milliseconds
};

// Helper function to check if cache is expired
const isCacheExpired = (timestamp, expirationTime) => {
  if (!timestamp) return true;
  return Date.now() - timestamp > expirationTime;
};

// Slice
const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchError = null;
      state.lastSearchQuery = "";
    },

    // Clear filtered vets
    clearFilteredVets: (state) => {
      state.filteredVets = {
        vets: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      };
      state.filteredVetsError = null;
      state.currentFilters = {
        specialization: "",
        name: "",
        page: 1,
        limit: 10,
      };
    },

    // Force refetch of available vets
    forceRefetchAvailableVets: (state) => {
      state.shouldRefetchVets = true;
    },

    // Set symptoms and diseases data
    setSymptomsAndDiseases: (state, action) => {
      const { symptoms, diseases } = action.payload;
      if (symptoms) state.symptoms = symptoms;
      if (diseases) state.diseases = diseases;
    },

    // Update current filters
    updateCurrentFilters: (state, action) => {
      state.currentFilters = { ...state.currentFilters, ...action.payload };
    },

    // Reset homepage state
    resetHomepageState: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Available Vets
      .addCase(fetchAvailableVets.pending, (state) => {
        state.availableVetsLoading = true;
        state.availableVetsError = null;
      })
      .addCase(fetchAvailableVets.fulfilled, (state, action) => {
        state.availableVetsLoading = false;
        state.availableVets = action.payload.data;
        state.shouldRefetchVets = false;
        state.availableVetsError = null;

        // Update cache timestamp only if data came from API
        if (!action.payload.fromCache) {
          state.lastFetchTimestamp = Date.now();
        }
      })
      .addCase(fetchAvailableVets.rejected, (state, action) => {
        state.availableVetsLoading = false;
        state.availableVetsError = action.payload;
        state.shouldRefetchVets = false;
      })

      // Search Vets
      .addCase(searchVets.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchVets.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.data;
        state.lastSearchQuery = action.payload.query;
        state.searchError = null;
      })
      .addCase(searchVets.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      })

      // Get Filtered Vets
      .addCase(getFilteredVets.pending, (state) => {
        state.filteredVetsLoading = true;
        state.filteredVetsError = null;
      })
      .addCase(getFilteredVets.fulfilled, (state, action) => {
        state.filteredVetsLoading = false;
        state.filteredVets = action.payload.data;
        state.currentFilters = action.payload.filters;
        state.filteredVetsError = null;
      })
      .addCase(getFilteredVets.rejected, (state, action) => {
        state.filteredVetsLoading = false;
        state.filteredVetsError = action.payload;
      });
  },
});

// Export actions
export const {
  clearSearchResults,
  clearFilteredVets,
  forceRefetchAvailableVets,
  setSymptomsAndDiseases,
  updateCurrentFilters,
  resetHomepageState,
} = homepageSlice.actions;

// Selectors
export const selectAvailableVets = (state) => state.homepage.availableVets;
export const selectAvailableVetsLoading = (state) =>
  state.homepage.availableVetsLoading;
export const selectAvailableVetsError = (state) =>
  state.homepage.availableVetsError;

export const selectSearchResults = (state) => state.homepage.searchResults;
export const selectSearchLoading = (state) => state.homepage.searchLoading;
export const selectSearchError = (state) => state.homepage.searchError;
export const selectLastSearchQuery = (state) => state.homepage.lastSearchQuery;

export const selectFilteredVets = (state) => state.homepage.filteredVets;
export const selectFilteredVetsLoading = (state) =>
  state.homepage.filteredVetsLoading;
export const selectFilteredVetsError = (state) =>
  state.homepage.filteredVetsError;
export const selectCurrentFilters = (state) => state.homepage.currentFilters;

export const selectSymptoms = (state) => state.homepage.symptoms;
export const selectDiseases = (state) => state.homepage.diseases;

// Smart selector that checks if we should refetch based on cache expiration
export const selectShouldFetchVets = (state) => {
  const { availableVets, lastFetchTimestamp, cacheExpirationTime } =
    state.homepage;
  return (
    availableVets.length === 0 ||
    isCacheExpired(lastFetchTimestamp, cacheExpirationTime)
  );
};

export default homepageSlice.reducer;
