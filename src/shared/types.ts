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
}
export interface TwoPictureContainerType {
  mainHeader?: string;
  twoPictureArray: Array<PictureType>;
}

export interface IconExplainContainerType {
  mainHeader?: string;
  iconExplainArray: Array<PictureType>;
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
    isMainHeader: true,
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
  EN: "ENGLISH",
  TR: "TURKISH",
};
export interface PageOptionsType {
  pageName: string;
}
