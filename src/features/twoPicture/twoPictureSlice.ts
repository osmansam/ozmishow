import TwoPictureContainer from "../../components/twoPicture/TwoPictureContainer";
import { ThunkAPIType, TwoPictureContainerType } from "./../../shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PictureType, ContainerType } from "../../shared/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "axios";
interface ComponentState {
  isLoading: boolean;
  twoPictureArray: Array<PictureType>;
  container: Array<ContainerType>;
  pageOptions: Array<string>;
}
const initialState: ComponentState = {
  isLoading: false,
  twoPictureArray: [],
  container: [],
  pageOptions: [],
};

const serializeHeaders = (headers: any) => {
  const serialized: any = {};
  Object.keys(headers).forEach((key) => {
    const val = headers[key];
    if (typeof val === "string" || typeof val === "number") {
      serialized[key] = val;
    }
  });
  return serialized;
};
function extractHeaders(response: AxiosResponse) {
  return {
    headers: serializeHeaders(response.headers),
    data: response.data,
  };
}

const baseURL = "/api/v1";
//get Componont container
export const getPageTwoPictures = createAsyncThunk(
  "twoPicture/getPageTwoPictures",
  async (pageName: string, thunkAPI) => {
    const url = "twoPicture/";
    try {
      const response = await axios.get(`${baseURL}/${url}${pageName}`);
      return extractHeaders(response);
    } catch (error) {
      return error;
    }
  }
);
// Create new component container
export const createTwoPicture = createAsyncThunk(
  "twoPicture/createTwoPicture",
  async (newTwoPicture: ContainerType, thunkAPI) => {
    const url = "twoPicture/";
    try {
      const response = await axios.post(`${baseURL}/${url}`, newTwoPicture);
      return extractHeaders(response);
    } catch (error) {
      return error;
    }
  }
);
//update component container
export const updateTwoPicture = createAsyncThunk(
  "twoPicture/updateTwoPicture",
  async (updateTwoPicture: ContainerType, thunkAPI) => {
    const url = "twoPicture/";
    try {
      const response = await axios.patch(
        `${baseURL}/${url}${updateTwoPicture._id}`,
        updateTwoPicture
      );
      return extractHeaders(response);
    } catch (error) {
      return error;
    }
  }
);
//get page options
export const getPageOptions = createAsyncThunk(
  "twoPicture/getPageOptions",
  async (thunkAPI) => {
    const url = "pageOptions/";
    try {
      const response = await axios.get(`${baseURL}/${url}`);
      return extractHeaders(response);
    } catch (error) {
      return error;
    }
  }
);
//create page options
export const createPageOptions = createAsyncThunk(
  "twoPicture/createPageOptions",
  async (pageName: string, thunkAPI) => {
    const url = "pageOptions/";
    try {
      const response = await axios.post(`${baseURL}/${url}`, { pageName });
      return extractHeaders(response);
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
      })
      .addCase(getPageTwoPictures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageTwoPictures.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.container = action.payload.data.data;
      })

      .addCase(getPageTwoPictures.rejected, (state, action) => {
        state.isLoading = false;
        console.log("====================================");
        console.log(action.payload);
        console.log("====================================");
      })
      .addCase(updateTwoPicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTwoPicture.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("====================================");
        console.log(action.payload);
        console.log("====================================");
      })
      .addCase(updateTwoPicture.rejected, (state, action) => {
        state.isLoading = false;
        console.log("====================================");
        console.log(action.payload);
        console.log("====================================");
      })
      .addCase(getPageOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageOptions.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.pageOptions = action.payload.data.pageOptions.map(
          (option: any) => option.pageName
        );
        console.log("====================================");
        console.log(state.pageOptions);
        console.log("====================================");
      })
      .addCase(getPageOptions.rejected, (state, action) => {
        state.isLoading = false;
        console.log("====================================");
        console.log(action.payload);
        console.log("====================================");
      })
      .addCase(createPageOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPageOptions.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.pageOptions = [...state.pageOptions, action.payload.data];
      })
      .addCase(createPageOptions.rejected, (state, action) => {
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
