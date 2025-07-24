import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { post } from "../services/apiService";
import { AUTH_ROUTES } from "../services/apiRoutes";
import {
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
} from "../redux/reducers/auth/authSlice";

// Custom hook for login
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials) => {
      dispatch(loginStart());
      const response = await post(AUTH_ROUTES.LOGIN, credentials);
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(loginSuccess(data.data));

        // Navigate based on user role
        const userRole = data.data.user.role;
        switch (userRole) {
          case "PET_OWNER":
            navigate("/pet-owner/dashboard");
            break;
          case "VET":
            navigate("/vet/dashboard");
            break;
          case "SUPER_ADMIN":
            navigate("/super-admin/dashboard");
            break;
          default:
            navigate("/");
        }
      }
    },
    onError: (error) => {
      dispatch(loginFailure(error.message));

      // Check if error is about email verification
      if (error.message.includes("not verified")) {
        // Navigate to OTP verification with user data
        navigate("/verify-otp", {
          state: {
            emailAddress: error.response?.data?.data?.emailAddress,
            userId: error.response?.data?.data?.userId,
          },
        });
      }
    },
  });
};

// Custom hook for registration
export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      dispatch(registrationStart());
      const response = await post(AUTH_ROUTES.REGISTER, userData);
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(registrationSuccess(data.data));
        // Navigate to login page after successful registration
        navigate("/login", {
          state: {
            message:
              "Registration successful! Please login with your credentials.",
            emailAddress: data.data.emailAddress,
          },
        });
      }
    },
    onError: (error) => {
      dispatch(registrationFailure(error.message));
    },
  });
};

// Custom hook for sending OTP
export const useSendOTP = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (otpData) => {
      dispatch(sendOtpStart());
      const response = await post(AUTH_ROUTES.SEND_OTP, otpData);
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(sendOtpSuccess());
      }
    },
    onError: (error) => {
      dispatch(sendOtpFailure(error.message));
    },
  });
};

// Custom hook for verifying OTP
export const useVerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (verificationData) => {
      dispatch(otpVerificationStart());
      const response = await post(AUTH_ROUTES.VERIFY_OTP, verificationData);
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        dispatch(otpVerificationSuccess());
        // Navigate to login page after successful verification
        navigate("/login", {
          state: {
            message: "Account verified successfully! Please login.",
            emailAddress: null,
          },
        });
      }
    },
    onError: (error) => {
      dispatch(otpVerificationFailure(error.message));
    },
  });
};

// Custom hook for logout
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return { logout: logoutUser };
};
