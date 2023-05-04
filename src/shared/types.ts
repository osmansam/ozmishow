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
export interface TwoPictureType {
  img?: string;
  header?: string;
  paragraphs?: string[];
  buttons?: ButtonType[];
}
export interface TwoPictureContainerType {
  mainHeader?: string;
  twoPictureArray: Array<TwoPictureType>;
}

export interface IconExplainContainerType {
  mainHeader?: string;
  iconExplainArray: Array<TwoPictureType>;
}

export const ComponentType = {
  PictureAtRight: {
    name: "PictureAtRight",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
  },
  PictureAtLeft: {
    name: "PictureAtLeft",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
  },
  TwoPictureContainer: {
    name: "TwoPictureContainer",
    pictureContainerNumber: 2,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
  },
  IconExplainContainer: {
    name: "IconExplainContainer",
    pictureContainerNumber: 3,
    isMainHeader: true,
    isPictureContainerImage: true,
    isPictureContainerButton: true,
  },
  MaximContainer: {
    name: "MaximContainer",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
  },
};

export const PageOptions = {
  Home: "Home",
  About: "About",
  Contact: "Contact",
  Press: "Press",
  Collection: "Collection",
  Furkan: "Furkan",
  Osman: "Osman",
  Sait: "Sait",
};
export interface ContainerType {
  _id?: string;
  page: string;
  mainHeader?: string;
  componentName: string;
  twoPictureArray: Array<TwoPictureType>;
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
