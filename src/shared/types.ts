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
  header: string;
  paragraphs: string[];
  buttons?: string[];
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
  PictureAtRight: "PictureAtRight",
  PictureAtLeft: "PictureAtLeft",
  TwoPictureContainer: "TwoPictureContainer",
  IconExplainContainer: "IconExplainContainer",
};

export const PageOptions = {
  Home: "Home",
  About: "About",
  Contact: "Contact",
  Press: "Press",
  Collection: "Collection",
};
export interface ContainerType {
  _id?: string;
  page: string;
  mainHeader?: string;
  componentName: string;
  twoPictureArray: Array<TwoPictureType>;
}
