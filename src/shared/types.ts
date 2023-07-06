import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Action, AnyAction } from "redux";

export type ThunkAPIType = {
  dispatch: ThunkDispatch<RootState, void, AnyAction>;
  state: RootState;
  extra: any;
  rejectValue: any;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface ImageBoxType {
  img: string;
  header: string;
  description: string;
}

export interface CollectionType {
  img: string;
  country: string;
  header: string;
  rooms?: string;
}

export interface PressType {
  img: string;
  header?: string;
  description: string;
}
export interface PictureType {
  img?: string;
  header?: string;
  paragraphs?: string[];
  buttons?: ButtonType[];
  _id?: string;
  twoPictureId?: string;
  mainHeader?: string;
  subHeaders?: string[];
  name?: string;
  lastName?: string;
  title?: string;
  page?: string;
  date?: String;
}
export interface UserType {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
  userId: string;
}
export interface MapType {
  lat: number;
  lng: number;
}
export interface TwoPictureContainerType {
  mainHeader?: string;
  twoPictureArray: Array<PictureType>;
}

export interface IconExplainContainerType {
  mainHeader?: string;
  iconExplainArray: Array<PictureType>;
}
export interface NewsContainerType {
  id: string;
  mainHeader?: string;
}
export interface FreqAskedType {
  id: string;
  freqAskedArray: Array<PictureType>;
}
export interface FullPageItemType {
  mainMainHeader?: string;
  fullPageItemArray: Array<PictureType>;
  id: string;
}
export interface ExplanationBarType {
  id: string;
  mainMainHeader?: string;
  explanationArray: Array<PictureType>;
}
export interface SliderType {
  id: string;
  mainMainHeader?: string;
  sliderArray: Array<PictureType>;
}
export interface WorkTeamBarType {
  id: string;
  mainMainHeader?: string;
  workTeamArray: Array<PictureType>;
}
interface ComponentType {
  name: string;
  pictureContainerNumber: number;
  isMainHeader: boolean;
  isPictureContainerImage: boolean;
  isPictureContainerButton: boolean;
  isPictureContainerParagraph: boolean;
}
//add new component here
export const Components: { [key: string]: ComponentType } = {
  NewPage: {
    name: "NewPage",
    pictureContainerNumber: 0,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  PictureAtRight: {
    name: "PictureAtRight",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
    isPictureContainerParagraph: true,
  },
  PictureAtLeft: {
    name: "PictureAtLeft",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
    isPictureContainerParagraph: true,
  },
  TwoPictureContainer: {
    name: "TwoPictureContainer",
    pictureContainerNumber: 2,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
    isPictureContainerParagraph: true,
  },
  IconExplainContainer: {
    name: "IconExplainContainer",
    pictureContainerNumber: 3,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
    isPictureContainerParagraph: true,
  },
  MaximContainer: {
    name: "MaximContainer",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: true,
  },
  BorderBoxContainer: {
    name: "BorderBoxContainer",
    pictureContainerNumber: 2,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
    isPictureContainerParagraph: false,
  },
  NewsContainer: {
    name: "NewsContainer",
    pictureContainerNumber: 1,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: false,
    isPictureContainerParagraph: true,
  },
  NewsContainer2: {
    name: "NewsContainer2",
    pictureContainerNumber: 1,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: false,
    isPictureContainerParagraph: true,
  },
  ExplanationBar: {
    name: "ExplanationBar",
    pictureContainerNumber: 0,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  PageBanner: {
    name: "PageBanner",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: true,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  FrequentlyAskedQuestions: {
    name: "FrequentlyAskedQuestions",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: true,
    isPictureContainerParagraph: true,
  },
  WorkTeamBar: {
    name: "WorkTeamBar",
    pictureContainerNumber: 0,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  Navbar: {
    name: "Navbar",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: true,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  ContactFormEn: {
    name: "ContactFormEn",
    pictureContainerNumber: 0,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  ContactFormTr: {
    name: "ContactFormTr",
    pictureContainerNumber: 0,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  Map: {
    name: "Map",
    pictureContainerNumber: 0,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  ContactContainer: {
    name: "ContactContainer",
    pictureContainerNumber: 0,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  FullPageItem: {
    name: "FullPageItem",
    pictureContainerNumber: 1,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: false,
    isPictureContainerParagraph: true,
  },
  Slider: {
    name: "Slider",
    pictureContainerNumber: 0,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
};

export interface ContainerType {
  _id?: string;
  page: string;
  mainHeader?: string;
  componentName: string;
  twoPictureArray: Array<PictureType>;
  position: number;
  language: string;
}

export interface ButtonType {
  buttonName: string;
  buttonLink: string;
}
export const LanguageOptions = {
  EN: "EN",
  TR: "TR",
};
export interface PageOptionsType {
  pageNameTR: string;
  pageNameEN: string;
  isNavbar: boolean;
  _id: string;
  isSubpage: boolean;

  hasSubpage: boolean;
  motherPageTR: string;
  motherPageEN: string;
}
