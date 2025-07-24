import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments:[],
};

const DepartmentsSlice = createSlice({
  name: "DepartmentsSlice",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});
export const { setDepartments} = DepartmentsSlice.actions;

export default DepartmentsSlice.reducer;
