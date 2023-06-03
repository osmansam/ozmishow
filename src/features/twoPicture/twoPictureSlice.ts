import TwoPictureContainer from "../../components/twoPicture/TwoPictureContainer";
import {
  ThunkAPIType,
  TwoPictureContainerType,
  ExplanationBarType,
} from "./../../shared/types";
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
  async (updateTwoPicture: ContainerType) => {
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
//delete component container
export const deleteTwoPicture = createAsyncThunk(
  "twoPicture/deleteTwoPicture",
  async (id: string) => {
    const url = "twoPicture/";
    try {
      const response = await axios.delete(`${baseURL}/${url}${id}`);
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
// add items into newsContainer
export const updateContainer = createAsyncThunk(
  "twoPicture/updateContainer",
  async ({ container, id }: { container: PictureType[]; id: string }) => {
    const url = `twoPicture/updateContainer/${id}`;
    try {
      const response = await axios.patch(`${baseURL}/${url}`, { container });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
// updateExplanationBar
export const updateExplanationBar = createAsyncThunk(
  "twoPicture/updateExplanationBar",
  async ({ container, id }: { container: PictureType[]; id: string }) => {
    const url = `twoPicture/updateExplanationBar/${id}`;
    try {
      const response = await axios.patch(`${baseURL}/${url}`, { container });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
//Delete item in Container
export const deleteItemInContainer = createAsyncThunk(
  "twoPicture/deleteItemInContainer",
  async ({ id, itemId }: { id: string; itemId: string }) => {
    const url = `twoPicture/deleteItem/${id}/${itemId}`;
    try {
      const response = await axios.patch(`${baseURL}/${url}`);
      return response.data;
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
      })
      .addCase(createTwoPicture.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(updateTwoPicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTwoPicture.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateTwoPicture.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getPageOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageOptions.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.pageOptions = action.payload.data.pageOptions.map(
          (option: any) => option.pageName
        );
      })
      .addCase(getPageOptions.rejected, (state, action) => {
        state.isLoading = false;
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
      });
  },
});

export const { setTwoPictureArray, resetTwoPictureArray } =
  twoPictureSlice.actions;
export default twoPictureSlice.reducer;
