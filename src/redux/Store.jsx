import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/auth/authSlice";
import homepageSlice from "./reducers/homepage/homepageSlice";

const Store = configureStore({
  reducer: {
    auth: authSlice,
    homepage: homepageSlice,
  },
});

export default Store;
