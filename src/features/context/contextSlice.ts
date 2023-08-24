import { LanguageOptions } from "./../../shared/types";
import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
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
  extraReducers: {
    [REHYDRATE]: (state, action) => {
      const rehydratedContext = action.payload?.context;

      if (rehydratedContext) {
        state.isTopOfPage = rehydratedContext.isTopOfPage;
        state.isAdmin = rehydratedContext.isAdmin;
        state.language = rehydratedContext.language;
        state.isSidebarOpen = rehydratedContext.isSidebarOpen;
        state.flexBetween = rehydratedContext.flexBetween; // Corrected line
        state.selectedSection = rehydratedContext.selectedSection;
      }
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
