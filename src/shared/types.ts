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
  button?: string;
}
export interface TwoPictureContainerType {
  mainHeader: string;
  twoPictureArray: Array<TwoPictureType>;
}
export interface IconExplainType {
  img?: string;
  icon?: string;
  header: string;
  paragraphs: string[];
  button?: string;
}
export interface IconExplainContainerType {
  mainHeader: string;
  iconExplainArray: Array<IconExplainType>;
}
