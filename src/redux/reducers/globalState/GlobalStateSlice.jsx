import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  width: "260x",
  selectedOption: null,
};

const GlobalStateSlice = createSlice({
  name: "GlobalStateSlice",
  initialState,
  reducers: {
    setIsCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});
export const { setIsCollapsed, setWidth, setSelectedOption } =
  GlobalStateSlice.actions;

export default GlobalStateSlice.reducer;
