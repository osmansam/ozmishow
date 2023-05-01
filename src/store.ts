import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import contextSlice from "./features/context/contextSlice";
import twoPictureSlice from "./features/twoPicture/twoPictureSlice";
export const store = configureStore({
  reducer: {
    context: contextSlice,
    twoPicture: twoPictureSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
