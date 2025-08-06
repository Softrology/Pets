// hooks/useHomepage.js
import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableVets,
  searchVets,
  getFilteredVets,
  clearSearchResults,
  clearFilteredVets,
  forceRefetchAvailableVets,
  setSymptomsAndDiseases,
  updateCurrentFilters,
  resetHomepageState,
  selectAvailableVets,
  selectAvailableVetsLoading,
  selectAvailableVetsError,
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
  selectLastSearchQuery,
  selectFilteredVets,
  selectFilteredVetsLoading,
  selectFilteredVetsError,
  selectCurrentFilters,
  selectSymptoms,
  selectDiseases,
  selectShouldFetchVets,
} from "../redux/reducers/homepage/homepageSlice";

// Hook for managing available vets on homepage
export const useAvailableVets = () => {
  const dispatch = useDispatch();
  const vets = useSelector(selectAvailableVets);
  const loading = useSelector(selectAvailableVetsLoading);
  const error = useSelector(selectAvailableVetsError);
  const shouldFetch = useSelector(selectShouldFetchVets);

  // Fetch available vets with smart caching
  const fetchVets = useCallback(
    (force = false) => {
      if (force || shouldFetch) {
        dispatch(fetchAvailableVets());
      }
    },
    [dispatch, shouldFetch]
  );

  // Auto-fetch on mount if needed
  useEffect(() => {
    fetchVets();
  }, [fetchVets]);

  // Force refetch function
  const refetchVets = useCallback(() => {
    dispatch(forceRefetchAvailableVets());
    dispatch(fetchAvailableVets());
  }, [dispatch]);

  return {
    vets,
    loading,
    error,
    fetchVets,
    refetchVets,
  };
};

// Hook for vet search functionality
export const useVetSearch = () => {
  const dispatch = useDispatch();
  const results = useSelector(selectSearchResults);
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectSearchError);
  const lastQuery = useSelector(selectLastSearchQuery);

  // Search function with debounce capability
  const search = useCallback(
    (query) => {
      dispatch(searchVets({ query }));
    },
    [dispatch]
  );

  // Clear search results
  const clearResults = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  // Memoized search stats
  const searchStats = useMemo(
    () => ({
      hasResults: results.length > 0,
      resultCount: results.length,
      hasSearched: Boolean(lastQuery),
    }),
    [results.length, lastQuery]
  );

  return {
    results,
    loading,
    error,
    lastQuery,
    search,
    clearResults,
    searchStats,
  };
};

// Hook for filtered vet listings
export const useFilteredVets = () => {
  const dispatch = useDispatch();
  const filteredData = useSelector(selectFilteredVets);
  const loading = useSelector(selectFilteredVetsLoading);
  const error = useSelector(selectFilteredVetsError);
  const currentFilters = useSelector(selectCurrentFilters);

  // Apply filters
  const applyFilters = useCallback(
    (filters) => {
      dispatch(getFilteredVets(filters));
    },
    [dispatch]
  );

  // Update filters without triggering API call
  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(updateCurrentFilters(newFilters));
    },
    [dispatch]
  );

  // Clear filtered results
  const clearFilters = useCallback(() => {
    dispatch(clearFilteredVets());
  }, [dispatch]);

  // Pagination helpers
  const pagination = useMemo(
    () => ({
      currentPage: filteredData.page,
      totalPages: filteredData.totalPages,
      total: filteredData.total,
      hasNextPage: filteredData.page < filteredData.totalPages,
      hasPrevPage: filteredData.page > 1,
    }),
    [filteredData]
  );

  // Go to next page
  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      const newFilters = {
        ...currentFilters,
        page: currentFilters.page + 1,
      };
      applyFilters(newFilters);
    }
  }, [pagination.hasNextPage, currentFilters, applyFilters]);

  // Go to previous page
  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      const newFilters = {
        ...currentFilters,
        page: currentFilters.page - 1,
      };
      applyFilters(newFilters);
    }
  }, [pagination.hasPrevPage, currentFilters, applyFilters]);

  // Go to specific page
  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= filteredData.totalPages) {
        const newFilters = {
          ...currentFilters,
          page,
        };
        applyFilters(newFilters);
      }
    },
    [filteredData.totalPages, currentFilters, applyFilters]
  );

  return {
    vets: filteredData.vets,
    loading,
    error,
    currentFilters,
    pagination,
    applyFilters,
    updateFilters,
    clearFilters,
    nextPage,
    prevPage,
    goToPage,
  };
};

// Hook for symptoms and diseases data
export const useSymptomsAndDiseases = () => {
  const dispatch = useDispatch();
  const symptoms = useSelector(selectSymptoms);
  const diseases = useSelector(selectDiseases);

  // Set symptoms and diseases data
  const setData = useCallback(
    (symptomsData, diseasesData) => {
      dispatch(
        setSymptomsAndDiseases({
          symptoms: symptomsData,
          diseases: diseasesData,
        })
      );
    },
    [dispatch]
  );

  // Initialize with static data if needed
  useEffect(() => {
    // You can import and set your static symptoms/diseases data here
    // if you have it as a JSON file
    if (symptoms.length === 0 && diseases.length === 0) {
      // Uncomment and modify this if you want to load static data
      // import('../data/symptomsDiseasesData.json').then(data => {
      //   setData(data.symptoms, data.diseases);
      // });
    }
  }, [symptoms.length, diseases.length, setData]);

  return {
    symptoms,
    diseases,
    setData,
  };
};

// Combined hook for all homepage functionality
export const useHomepage = () => {
  const dispatch = useDispatch();
  const availableVets = useAvailableVets();
  const vetSearch = useVetSearch();
  const filteredVets = useFilteredVets();
  const symptomsAndDiseases = useSymptomsAndDiseases();

  // Reset entire homepage state
  const resetState = useCallback(() => {
    dispatch(resetHomepageState());
  }, [dispatch]);

  // All loading states
  const isLoading = useMemo(
    () => availableVets.loading || vetSearch.loading || filteredVets.loading,
    [availableVets.loading, vetSearch.loading, filteredVets.loading]
  );

  // All error states
  const errors = useMemo(
    () => ({
      availableVets: availableVets.error,
      search: vetSearch.error,
      filtered: filteredVets.error,
    }),
    [availableVets.error, vetSearch.error, filteredVets.error]
  );

  return {
    availableVets,
    vetSearch,
    filteredVets,
    symptomsAndDiseases,
    isLoading,
    errors,
    resetState,
  };
};

// Hook for search with debouncing
export const useDebouncedSearch = (delay = 500) => {
  const { search, ...rest } = useVetSearch();

  const debouncedSearch = useCallback(debounce(search, delay), [search, delay]);

  return {
    search: debouncedSearch,
    ...rest,
  };
};

// Debounce utility function
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}
