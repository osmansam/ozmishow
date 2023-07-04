import { UserType } from "./../../shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import axios from "axios";

interface UserState {
  user: UserType;
  isUserLoading: boolean;
  isUserLoggedIn: boolean;
  users: UserType[];
}
export type PayloadType = {
  name: keyof typeof initialState;
  value: string | number | boolean | FormData;
};
const initialState: UserState = {
  user: {
    name: "",
    lastName: "",
    userName: "",
    email: "",
    role: "",
    userId: "",
  },
  isUserLoading: false,
  users: [],
  isUserLoggedIn: false,
};
const baseURL = "https://ozmishow-back.onrender.com/api/v1";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: any, thunkAPI: any) => {
    try {
      const url = "auth/login";
      const resp = await axios.post(`${baseURL}/${url}`, user);
      return resp.data;
    } catch (error: any) {
      throw error.response.data.msg;
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (userId: string) => {
    const url = "auth/logout";
    try {
      const response = await axios.delete(`${baseURL}/${url}/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data.msg;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = initialState.user;
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUserLoggedIn = true;
        state.isUserLoading = false;
        state.user = action.payload?.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserLoading = false;
      })

      .addCase(logout.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = initialState.user;
        state.isUserLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isUserLoading = false;
      });
  },
});

export const { resetUser, setIsUserLoggedIn } = userSlice.actions;
export default userSlice.reducer;
