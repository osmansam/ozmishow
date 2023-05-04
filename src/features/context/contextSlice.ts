import { LanguageOptions } from "./../../shared/types";
import { createSlice } from "@reduxjs/toolkit";

interface ContextSliceType {
  isTopOfPage: boolean;
  isAdmin: boolean;
  flexBetween: string;
  language: string;
}

const initialState: ContextSliceType = {
  isTopOfPage: false,
  isAdmin: true,
  flexBetween: "flex items-center justify-between",
  language: LanguageOptions.EN,
};
const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setIsTopOfPage: (state, action) => {
      state.isTopOfPage = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setIsTopOfPage, setIsAdmin, setLanguage } = contextSlice.actions;
export default contextSlice.reducer;
