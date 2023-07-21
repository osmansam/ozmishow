import { LanguageOptions } from "./../../shared/types";
import { createSlice } from "@reduxjs/toolkit";

interface ContextSliceType {
  isTopOfPage: boolean;
  isAdmin: boolean;
  isSidebarOpen?: boolean;
  selectedSection?: string;
  flexBetween: string;
  language: string;
}

const initialState: ContextSliceType = {
  isTopOfPage: false,
  isAdmin: false,
  flexBetween: "flex items-center justify-between",
  isSidebarOpen: false,
  language: LanguageOptions.EN,
  selectedSection: "Home",
};
const contextSlice = createSlice({
  name: "context",
  initialState: initialState,
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
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
  },
});

export const {
  setIsTopOfPage,
  setIsAdmin,
  setLanguage,
  setIsSidebarOpen,
  setSelectedSection,
} = contextSlice.actions;
export default contextSlice.reducer;
