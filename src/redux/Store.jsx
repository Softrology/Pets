import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/auth/authSlice";

const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default Store;
