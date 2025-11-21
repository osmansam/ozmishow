import {
    ContainerType,
    ContentStyleType,
    ImageContentStyleType,
    PictureType,
    PictureWithStyleType,
} from "../../../shared/types";

/**
 * Helper functions to build props for different component types
 * from ContainerType data
 */

export const buildPictureWithStyleProps = (item: ContainerType) => {
  const pictureItem = {
    ...item.twoPictureArray[0],
    componentStyle: item.style,
    componentType: item.componentType,
  };
  return {
    ...(pictureItem as PictureWithStyleType),
    _id: item._id ?? "",
  };
};

export const buildTwoPictureProps = (item: ContainerType) => {
  return {
    mainHeader: item.mainHeader,
    componentStyle: item.style,
    componentType: item.componentType,
    twoPictureArray: item.twoPictureArray as PictureWithStyleType[],
    id: item._id ?? "",
  };
};

export const buildIconExplainProps = (item: ContainerType) => {
  return {
    mainHeader: item.mainHeader,
    componentType: item.componentType,
    iconExplainArray: item.twoPictureArray as PictureWithStyleType[],
    componentStyle: item.style,
    id: item._id ?? "",
  };
};

export const buildNewsProps = (item: ContainerType, page: string) => {
  return {
    id: item._id ?? "",
    mainHeader: item.mainHeader,
    componentType: item.componentType,
    componentStyle: item.style,
    page,
  };
};

export const buildTypingEffectProps = (item: ContainerType) => {
  const paragraphs = Array.isArray(item.twoPictureArray[0]?.paragraphs)
    ? item.twoPictureArray[0]?.paragraphs
    : [];
  return {
    img: item.twoPictureArray[0].img as ImageContentStyleType,
    paragraphs,
  };
};

export const buildExplanationBarProps = (item: ContainerType, page: string) => {
  return {
    id: item._id ?? "",
    mainMainHeader: item.mainHeader as ContentStyleType,
    componentStyle: item.style,
    explanationArray: item.twoPictureArray as PictureWithStyleType[],
    page,
  };
};

export const buildProgressBarProps = (item: ContainerType) => {
  return {
    id: item._id ?? "",
    mainHeader: item.mainHeader,
    componentStyle: item.style,
    progressBarArray: item.twoPictureArray as PictureType[],
  };
};

export const buildResumeBoxProps = (item: ContainerType, page: string) => {
  return {
    id: item._id ?? "",
    mainHeader: item.mainHeader,
    resumeBoxArray: item.twoPictureArray as PictureWithStyleType[],
    componentStyle: item.style,
    page,
  };
};

export const buildSliderProps = (item: ContainerType, page: string) => {
  return {
    id: item._id ?? "",
    mainMainHeader: item.mainHeader,
    sliderArray: item.twoPictureArray as PictureWithStyleType[],
    componentType: item.componentType,
    componentStyle: item.style,
    page,
  };
};

export const buildCarouselProps = (item: ContainerType, page: string) => {
  return {
    id: item._id ?? "",
    mainMainHeader: item.mainHeader,
    componentStyle: item.style,
    carouselArray: item.twoPictureArray as PictureWithStyleType[],
    page,
  };
};

export const buildResumeIconProps = (item: ContainerType) => {
  return {
    id: item._id ?? "",
    mainHeader: item.mainHeader,
    resumeIconArray: item.twoPictureArray as PictureWithStyleType[],
    componentStyle: item.style,
  };
};

export const buildYoutubeVideoProps = (item: ContainerType) => {
  return {
    embedId: item.mainHeader?.content ?? "",
    header: item.twoPictureArray[0].header
      ? (item.twoPictureArray[0].header as string)
      : "",
  };
};

export const buildFreqAskedProps = (item: ContainerType, page: string) => {
  return {
    id: item._id ?? "",
    componentStyle: item.style,
    freqAskedArray: item.twoPictureArray as PictureWithStyleType[],
    componentType: item.componentType,
    page,
  };
};

export const buildWorkTeamBarProps = (item: ContainerType, page: string) => {
  return {
    id: item._id ?? "",
    mainMainHeader: item.mainHeader,
    workTeamArray: item.twoPictureArray as PictureWithStyleType[],
    componentStyle: item.style,
    page,
  };
};

export const buildBorderBoxProps = (item: ContainerType) => {
  return {
    id: item._id ?? "",
    mainHeader: item.mainHeader,
    componentStyle: item.style,
    componentType: item.componentType,
    twoPictureArray: item.twoPictureArray as PictureWithStyleType[],
  };
};

export const buildBackgroundHeaderProps = (item: ContainerType) => {
  return {
    _id: item._id ?? "",
    mainMainHeader: item.mainHeader,
    componentStyle: item.style,
    header: item.twoPictureArray[0]?.header as ContentStyleType,
  };
};

export const buildFullPageItemProps = (item: ContainerType, page: string) => {
  return {
    mainMainHeader: item.mainHeader,
    fullPageItemArray: item.twoPictureArray as PictureWithStyleType[],
    componentStyle: item.style,
    id: item._id ?? "",
    page,
  };
};
