import TwoPictureContainer from "../../components/TwoPictureContainer";
import { ThunkAPIType, TwoPictureContainerType } from "./../../shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TwoPictureType, ContainerType } from "../../shared/types";

import axios from "axios";
interface TwoPictureState {
  isLoading: boolean;
  twoPictureArray: Array<TwoPictureType>;
  container: ContainerType;
}

const initialState: TwoPictureState = {
  isLoading: false,
  twoPictureArray: [],
  container: {} as ContainerType,
};

const baseURL = "/api/v1";
const url = "twoPicture/";

export const createTwoPicture = createAsyncThunk(
  "twoPicture/createTwoPicture",
  async (newTwoPicture: ContainerType, thunkAPI) => {
    try {
      const resp = await axios.post(`${baseURL}/${url}`, newTwoPicture);
      return resp;
    } catch (error) {
      return error;
    }
  }
);

const twoPictureSlice = createSlice({
  name: "twoPicture",
  initialState,
  reducers: {
    setTwoPictureArray: (state, action) => {
      state.twoPictureArray = [...state.twoPictureArray, action.payload];
    },
    resetTwoPictureArray: (state) => {
      state.twoPictureArray = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTwoPicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTwoPicture.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("====================================");
        console.log(action.payload);
        console.log("====================================");
      })
      .addCase(createTwoPicture.rejected, (state, action) => {
        state.isLoading = false;
        console.log("====================================");
        console.log(action.payload);
        console.log("====================================");
      });
  },
});

export const { setTwoPictureArray, resetTwoPictureArray } =
  twoPictureSlice.actions;
export default twoPictureSlice.reducer;
