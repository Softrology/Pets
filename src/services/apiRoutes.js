// services/apiRoutes.js
export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/sign-up",
  SEND_OTP: "/auth/send-account-verification-otp",
  VERIFY_OTP: "/auth/verify-account-verification-otp",
};

//vets-superadmin
export const GET_ALL_VETS = "/vet/get-all-vets";
export const APPROVE_VET = "/vet/get-all-vets";
export const CHANGE_VET_STATUS = "/vet/change-vet-activation-status";

//pets
export const POST_PET = "/pet/add-pet";
export const GET_ALL_PETS = "/pet/get-all-pets";
export const DELETE_PET = (id) => `/pet/delete-pet/${id}`;
export const UPDATE_PET = (id) => `/pet/update-pet/${id}`;
export const GET_PET_BY_ID = (id) => `/pet/${id}`;

//Pet owner profile
export const GET_PET_OWNER_PROFILE = "/pet-owner/my-profile";
export const UPDATE_PET_PROFILE = "/pet-owner/update-my-profile";

//Medical record
export const POST_MEDICAL_RECORD = "/medical-record/add-medical-record";
export const GET_ALL_MEDICAL_RECORD = "/medical-record/get-all-medical-records";
export const GET_MEDICAL_RECORD_BY_ID = (id) => `/medical-record/${id}`;
export const GET_MEDICAL_RECORD_BY_PETID = (id) =>
  `/medical-record/get-all-medical-records-by-pet/${id}`;
export const DELETE_MEDICAL_RECORD = (id) =>
  `/medical-record/delete-medical-record/${id}`;
export const UPDATE_MEDICAL_RECORD = (id) =>
  `/medical-record/update-medical-record/${id}`;

// Homepage/Landing Page Routes
export const HOMEPAGE_ROUTES = {
  GET_ALL_AVAILABLE_VETS: "/vet/get-all-available-vets-on-landing-page",
  SEARCH_VETS: "/vet/get-all-search-results-for-user",
  GET_FILTERED_VETS: "/vet/get-all-vets-for-user",
};

export const GET_VET_PROFILE = "/vet/my-profile";
export const UPDATE_VET_PROFILE = "/vet/update-my-profile";

//appointmets

//by petowner
export const REQUEST_APPOINTMENT = "/appointment/request-appointment";
export const GET_ALL_PETOWNER_APPOINTMENTS =
  "/appointment/get-all-pet-owner-appointments";
export const GET_SINGLE_PETOWNER_APPOINTMENTS =
  "/appointment/get-single-appointment";
export const PETOWNER_CANCEL_APPOINTMENT = "/appointment/cancel-appointment";
//by vet
export const GET_ALL_VET_APPOINTMENTS = "/appointment/get-all-vet-appointments";
export const GET_SINGLE_VET_APPOINTMENT = "/appointment/get-single-appointment";
export const VET_CONFIRM_APPOINTMENT = "/appointment/confirm-appointment";
export const VET_REJECT_APPOINTMENT = "/appointment/reject-appointment";
export const VET_CANCEL_APPOINTMENT = "/appointment/cancel-appointment";
