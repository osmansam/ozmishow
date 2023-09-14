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

export interface StyleData {
  content: string;
  style: StyleType;
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
  percentage?: number;
  year1?: string;
  year2?: string;
  university?: string;
  paragraph?: string;
  icon?: string;
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
  id: string;
  mainHeader?: ContentStyleType;
  twoPictureArray: Array<PictureWithStyleType>;
  componentStyle: ComponentStyleType;
}

export interface IconExplainContainerType {
  id: string;
  mainHeader?: ContentStyleType;
  iconExplainArray: Array<PictureWithStyleType>;
}
export interface NewsContainerType {
  id: string;
  mainHeader?: ContentStyleType;
}
export interface ProgressBarContainerType {
  id: string;
  mainHeader?: ContentStyleType;
  progressBarArray: Array<PictureType>;
}
export interface ResumeIconContainerType {
  id: string;
  mainHeader?: ContentStyleType;
  resumeIconArray: Array<PictureWithStyleType>;
}
export interface ResumeBoxContainerType {
  id: string;
  mainHeader?: ContentStyleType;
  resumeBoxArray: Array<PictureWithStyleType>;
}
export interface YoutubeType {
  embedId: string;
  header: string;
}
export interface FreqAskedType {
  id: string;
  freqAskedArray: Array<PictureWithStyleType>;
  componentStyle: ComponentStyleType;
}
export interface FullPageItemType {
  mainMainHeader?: ContentStyleType;
  fullPageItemArray: Array<PictureWithStyleType>;
  componentStyle: ComponentStyleType;
  id: string;
}
export interface ExplanationBarType {
  id: string;
  mainMainHeader?: ContentStyleType;
  explanationArray: Array<PictureWithStyleType>;
  componentStyle: ComponentStyleType;
}
export interface ContentStyleType {
  content?: string;
  style?: StyleType;
}
export interface StyleType {
  color?: string;
  fontWeight?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  fontFamily?: string;
  hover: string;
  effectAll?: boolean;
}
export interface ComponentStyleType {
  backgroundColor?: string;
  width?: string;
}
export const style = {
  color: "",
  fontWeight: "",
  backgroundColor: "",
  padding: "",
  fontSize: "",
  fontFamily: "",
  hover: "",
  effectAll: false,
};
export const componentStyle = {
  backgroundColor: "",
  width: "",
};
export interface PictureWithStyleType {
  img?: string;
  mainMainHeader?: ContentStyleType;
  header?: ContentStyleType;
  paragraphs?: {
    content?: string[];
    style: StyleType;
  };
  buttons?: ButtonType[];
  _id?: string;
  twoPictureId?: string;
  mainHeader?: ContentStyleType;
  subHeaders?: {
    content?: string[];
    style: StyleType;
  };
  name?: ContentStyleType;
  lastName?: ContentStyleType;
  title?: ContentStyleType;
  page?: string;
  date?: string; // Change this from 'String' to 'string'
  percentage?: number;
  year1?: ContentStyleType;
  year2?: ContentStyleType;
  university?: ContentStyleType;
  paragraph?: ContentStyleType;
  paragraphStyle?: ContentStyleType;
  componentStyle?: ComponentStyleType;
  icon?: string;
  index?: number;
}

export interface CarouselType {
  id: string;
  mainMainHeader?: ContentStyleType;
  carouselArray: Array<PictureWithStyleType>;
  componentStyle: ComponentStyleType;
}
export interface SliderType {
  id: string;
  mainMainHeader?: ContentStyleType;
  sliderArray: Array<PictureWithStyleType>;
}
export interface WorkTeamBarType {
  id: string;
  mainMainHeader?: ContentStyleType;
  workTeamArray: Array<PictureWithStyleType>;
  componentStyle: any;
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
  Carousel: {
    name: "Carousel",
    pictureContainerNumber: 0,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  YoutubeVideo: {
    name: "YoutubeVideo",
    pictureContainerNumber: 1,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  TypingEffectContainer: {
    name: "TypingEffectContainer",
    pictureContainerNumber: 1,
    isMainHeader: false,
    isPictureContainerImage: true,
    isPictureContainerButton: false,
    isPictureContainerParagraph: true,
  },
  ProgressBar: {
    name: "ProgressBar",
    pictureContainerNumber: 0,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  ResumeBox: {
    name: "ResumeBox",
    pictureContainerNumber: 0,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  ResumeIcon: {
    name: "ResumeIcon",
    pictureContainerNumber: 0,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  BackgroundHeader: {
    name: "BackgroundHeader",
    pictureContainerNumber: 1,
    isMainHeader: true,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
  SpeedReader: {
    name: "SpeedReader",
    pictureContainerNumber: 0,
    isMainHeader: false,
    isPictureContainerImage: false,
    isPictureContainerButton: false,
    isPictureContainerParagraph: false,
  },
};

export interface ContainerType {
  _id?: string;
  page: string;
  mainHeader?: ContentStyleType;
  selectedSection?: string;
  componentName: string;
  twoPictureArray: Array<PictureType> | Array<PictureWithStyleType>;
  position: number;
  language: string;
  style: any;
}

export interface ButtonType {
  buttonName: string;
  buttonLink: string;
}
export const LanguageOptions = {
  EN: "EN",
  TR: "TR",
};
export const SectionPageTypes = {
  Type1: "Type1",
  Type2: "Type2",
};
export interface PageOptionsType {
  pageNameTR: string;
  pageNameEN: string;
  isNavbar: boolean;
  _id: string;
  isSubpage: boolean;
  sections: string[];
  isSectionPage: boolean;
  hasSubpage: boolean;
  motherPageTR: string;
  motherPageEN: string;
  sectionPageType: string;
}
