// redux/reducers/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper function to get token from localStorage
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem("authToken");
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
};

// Helper function to get user from localStorage
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  isAuthenticated: !!(getTokenFromStorage() && getUserFromStorage()),
  isLoading: false,
  error: null,
  registrationData: null, // For storing temporary registration data
  otpVerificationData: null, // For storing OTP verification data
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.authToken;
      state.isAuthenticated = true;
      state.error = null;

      // Store in localStorage
      localStorage.setItem("authToken", action.payload.authToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    // Registration actions
    registrationStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registrationSuccess: (state, action) => {
      state.isLoading = false;
      state.registrationData = action.payload;
      state.error = null;
    },
    registrationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.registrationData = null;
    },

    // OTP Verification actions
    otpVerificationStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    otpVerificationSuccess: (state) => {
      state.isLoading = false;
      state.otpVerificationData = { verified: true };
      state.error = null;
    },
    otpVerificationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Send OTP actions
    sendOtpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    sendOtpSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    sendOtpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.registrationData = null;
      state.otpVerificationData = null;

      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear registration data
    clearRegistrationData: (state) => {
      state.registrationData = null;
    },

    // Clear OTP verification data
    clearOtpVerificationData: (state) => {
      state.otpVerificationData = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registrationStart,
  registrationSuccess,
  registrationFailure,
  otpVerificationStart,
  otpVerificationSuccess,
  otpVerificationFailure,
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  logout,
  clearError,
  clearRegistrationData,
  clearOtpVerificationData,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
