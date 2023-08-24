import TwoPictureContainer from "../../components/twoPicture/TwoPictureContainer";
import {
  ThunkAPIType,
  TwoPictureContainerType,
  ExplanationBarType,
} from "./../../shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PictureType,
  ContainerType,
  PageOptionsType,
  MapType,
} from "../../shared/types";
import { AxiosResponse } from "axios";
import axios from "axios";
import { REHYDRATE } from "redux-persist";

interface ComponentState {
  isLoading: boolean;
  twoPictureArray: Array<PictureType>;
  container: Array<ContainerType>;
  pageOptions: Array<PageOptionsType>;
  logo: string;
  footer: any;
  map: MapType;
}
const initialState: ComponentState = {
  isLoading: false,
  twoPictureArray: [],
  container: [],
  pageOptions: [],
  logo: "",
  footer: {},
  map: { lat: 0, lng: 0 },
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

const baseURL = "https://ozmishow-back.onrender.com/api/v1";
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
//get all TwoPicture
export const getAllTwoPicture = createAsyncThunk(
  "twoPicture/getAllTwoPicture",
  async (thunkAPI) => {
    const url = "twoPicture/";
    try {
      const response = await axios.get(`${baseURL}/${url}`);
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
  async (
    {
      pageNameTR,
      pageNameEN,
      isNavbar,
      sections,
      isSectionPage,
      isSubpage,
      hasSubpage,
      motherPageTR,
      motherPageEN,
      sectionPageType,
    }: {
      pageNameTR: string;
      pageNameEN: string;
      isNavbar: boolean;
      sections: string[];
      isSubpage: boolean;
      isSectionPage: boolean;
      hasSubpage: boolean;
      motherPageTR: string;
      motherPageEN: string;
      sectionPageType: string;
    },
    thunkAPI
  ) => {
    const url = "pageOptions/";
    try {
      const response = await axios.post(`${baseURL}/${url}`, {
        pageNameTR,
        pageNameEN,
        isNavbar,
        sections,
        isSectionPage,
        isSubpage,
        hasSubpage,
        motherPageTR,
        motherPageEN,
        sectionPageType,
      });
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
// updateProgressBar
export const updateProgressBar = createAsyncThunk(
  "twoPicture/updateProgressBar",
  async ({ container, id }: { container: PictureType[]; id: string }) => {
    const url = `twoPicture/updateProgressBar/${id}`;
    try {
      const response = await axios.patch(`${baseURL}/${url}`, { container });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
//updateResumeBox
export const updateResumeBox = createAsyncThunk(
  "twoPicture/updateResumeBox",
  async ({ container, id }: { container: PictureType[]; id: string }) => {
    const url = `twoPicture/updateResumeBox/${id}`;
    try {
      const response = await axios.patch(`${baseURL}/${url}`, { container });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
// updateWorkTeamBar
export const updateWorkTeamBar = createAsyncThunk(
  "twoPicture/updateWorkTeamBar",
  async ({ container, id }: { container: PictureType[]; id: string }) => {
    const url = `twoPicture/updateWorkTeamBar/${id}`;
    try {
      const response = await axios.patch(`${baseURL}/${url}`, { container });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
// updateSlider
export const updateSlider = createAsyncThunk(
  "twoPicture/updateSlider",
  async ({ container, id }: { container: PictureType[]; id: string }) => {
    const url = `twoPicture/updateSlider/${id}`;
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
//update page and language
export const updatePageAndLanguage = createAsyncThunk(
  "twoPicture/updatePageAndLanguage",
  async ({
    id,
    page,
    language,
  }: {
    id: string;
    page: string;
    language: string;
  }) => {
    const url = `twoPicture/updatePageAndLanguage/${id}`;
    try {
      const response = await axios.patch(`${baseURL}/${url}`, {
        page,
        language,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

//create navbar
export const createNavbar = createAsyncThunk(
  "twoPicture/createNavbar",
  async (logo: string) => {
    const url = `pageOptions/navbar`;
    try {
      const response = await axios.post(`${baseURL}/${url}`, {
        logo,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
// get navbar
export const getNavbar = createAsyncThunk("twoPicture/getNavbar", async () => {
  const url = `pageOptions/navbar`;
  try {
    const response = await axios.get(`${baseURL}/${url}`);
    return response.data;
  } catch (error) {
    return error;
  }
});
//create footer
export const createFooter = createAsyncThunk(
  "twoPicture/createFooter",
  async ({
    adress,
    phone,
    fax,
    email,
  }: {
    adress: string;
    phone: string;
    fax: string;
    email: string;
  }) => {
    const url = `pageOptions/footer`;
    try {
      const response = await axios.post(`${baseURL}/${url}`, {
        adress,
        phone,
        fax,
        email,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
//get footer
export const getFooter = createAsyncThunk("twoPicture/getFooter", async () => {
  const url = `pageOptions/footer`;
  try {
    const response = await axios.get(`${baseURL}/${url}`);
    return response.data;
  } catch (error) {
    return error;
  }
});
//create map
export const createMap = createAsyncThunk(
  "twoPicture/createMap",
  async ({ lat, lng }: { lat: number; lng: number }) => {
    const url = `twoPicture/createMap/`;
    try {
      const response = await axios.post(`${baseURL}/${url}`, {
        lat,
        lng,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
//getMap
export const getMap = createAsyncThunk("twoPicture/getMap", async () => {
  const url = `twoPicture/getMap`;
  try {
    const response = await axios.get(`${baseURL}/${url}`);
    return response.data;
  } catch (error) {
    return error;
  }
});
//delete page
export const deletePage = createAsyncThunk(
  "twoPicture/deletePage",
  async (id: string) => {
    const url = `pageOptions/${id}`;
    try {
      const response = await axios.delete(`${baseURL}/${url}`);
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

  extraReducers: {
    [REHYDRATE]: (state, action) => {
      state.container = action.payload?.twoPicture.container;
      state.pageOptions = action.payload?.twoPicture.pageOptions;
      state.logo = action.payload?.twoPicture.logo;
      state.footer = action.payload?.twoPicture.footer;
      state.map = action.payload?.twoPicture.map;
    },

    [createTwoPicture.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createTwoPicture.fulfilled.type]: (state, action) => {
      state.isLoading = false;
    },
    [createTwoPicture.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [getPageTwoPictures.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPageTwoPictures.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.container = action.payload.data.data;
    },
    [getPageTwoPictures.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [getAllTwoPicture.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllTwoPicture.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.container = action.payload.data.data;
    },
    [getAllTwoPicture.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [updateTwoPicture.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateTwoPicture.fulfilled.type]: (state, action) => {
      state.isLoading = false;
    },
    [updateTwoPicture.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [getPageOptions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPageOptions.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.pageOptions = action.payload.data.pageOptions;
    },
    [getPageOptions.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [createPageOptions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createPageOptions.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.pageOptions = [...state.pageOptions, action.payload.data];
    },
    [createPageOptions.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [getNavbar.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getNavbar.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.logo = action.payload.navbar[0].logo;
    },
    [getNavbar.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [getFooter.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getFooter.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.footer = action.payload.footer[0];
    },
    [getFooter.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [getMap.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getMap.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.map = action.payload.map[0];
    },
    [getMap.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setTwoPictureArray, resetTwoPictureArray } =
  twoPictureSlice.actions;
export default twoPictureSlice.reducer;
