import { createSlice } from "@reduxjs/toolkit";

const contextSlice = createSlice({
  name: "context",
  initialState: {
    isTopOfPage: true,
    flexBetween: "flex items-center justify-between",
  },
  reducers: {
    setIsTopOfPage: (state, action) => {
      state.isTopOfPage = action.payload;
    },
  },
});

export const { setIsTopOfPage } = contextSlice.actions;
export default contextSlice.reducer;
