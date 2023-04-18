import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import contextSlice from "./features/context/contextSlice";
export const store = configureStore({
  reducer: {
    context: contextSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
