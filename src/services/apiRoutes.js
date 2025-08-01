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
export const GET_PET_BY_ID = (id) => `/pet/${id}`

//Pet owner profile

export const GET_PET_OWNER_PROFILE = "/pet-owner/my-profile";
export const UPDATE_PET_PROFILE = "/pet-owner/update-my-profile";