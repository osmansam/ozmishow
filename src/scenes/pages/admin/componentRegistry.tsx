import { lazy } from "react";
import { ContainerType } from "../../../shared/types";
import * as propBuilders from "./propBuilders";

// Lazy load all components
const PictureAtLeft = lazy(
  () => import("../../../components/pictureAndText/picLeft/PictureAtLeft")
);
const PictureAtLeftType3 = lazy(
  () => import("../../../components/pictureAndText/picLeft/PictureAtLeftType3")
);
const PictureAtRight = lazy(
  () => import("../../../components/pictureAndText/picRight/PictureAtRight")
);
const PicType4 = lazy(
  () => import("../../../components/pictureAndText/picRight/PicType4")
);
const PicLeftType5 = lazy(
  () => import("../../../components/pictureAndText/picLeft/PicLeftType5")
);
const PicLeftType6 = lazy(
  () => import("../../../components/pictureAndText/picLeft/PicLeftType6")
);
const IconExplainContainer = lazy(
  () => import("../../../components/IconExplain/type1/IconExplainContainer")
);
const IconExplainContainer2 = lazy(
  () => import("../../../components/IconExplain/type2/IconExplainContainer2")
);
const TwoPictureContainer = lazy(
  () => import("../../../components/twoPicture/type1/TwoPictureContainer")
);
const TwoPictureContainer2 = lazy(
  () => import("../../../components/twoPicture/type2/TwoPictureContainer2")
);
const MaximContainer = lazy(() => import("../../../components/maxim"));
const FreqAsked = lazy(() => import("../../../components/freqAsked/FreqAsked"));
const BorderBoxContainer = lazy(
  () => import("../../../components/borderBox/BorderBoxContainer")
);
const NewsContainer = lazy(
  () => import("../../../components/news/newsType1/NewsContainer")
);
const NewsContainer2 = lazy(
  () => import("../../../components/news/newsType2/NewsContainer2")
);
const ExplanationBar = lazy(() => import("../../../components/ExplanationBar"));
const PageBanner = lazy(() => import("../../../components/PageBanner/PageBanner"));
const WorkTeamBar = lazy(
  () => import("../../../components/WorkTeamBar/WorkTeamBar")
);
const ContactFormEn = lazy(
  () => import("../../../components/contactForm/ContactFormEn")
);
const ContactFormTr = lazy(
  () => import("../../../components/contactForm/ContactFormTr")
);
const ContactContainer = lazy(
  () => import("../../../components/contactContainer/ContactContainer")
);
const Map = lazy(() => import("../../../components/map"));
const FullPageItem = lazy(() => import("../../../components/fullPageItem"));
const Slider = lazy(() => import("../../../components/slider/Slider"));
const SliderType2 = lazy(() => import("../../../components/slider/SliderType2"));
const Carousel = lazy(() => import("../../../components/carousel"));
const YoutubeVideo = lazy(() => import("../../../components/youtube"));
const ProgressBarContainer = lazy(
  () => import("../../../components/ProgressBar/ProgressBarContainer")
);
const TypingEffectContainer = lazy(
  () => import("../../../components/TypingEffect/TypingEffectContainer")
);
const ResumeBox = lazy(
  () => import("../../../components/resumeBox/ResumeBoxContainer")
);
const BackgroundHeader = lazy(
  () => import("../../../components/BackgroundHeader/BackgroundHeader")
);
const ResumeIcon = lazy(
  () => import("../../../components/resumeIcon/ResumeIconContainer")
);
const SpeedReader = lazy(
  () => import("../../../components/speedReader/SpeedReader")
);
const FreqAskedType2 = lazy(
  () => import("../../../components/freqAsked/FreqAskedType2")
);

/**
 * Component configuration type
 */
interface ComponentConfig {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  propBuilder: (item: ContainerType, page: string) => any;
  showWrapper?: boolean;
}

/**
 * Registry key generator
 */
const getRegistryKey = (componentName: string, componentType?: string): string => {
  return componentType ? `${componentName}:${componentType}` : componentName;
};

/**
 * Component Registry
 * Maps (componentName, componentType) to component configuration
 */
const componentRegistry: Record<string, ComponentConfig> = {
  // PictureAndText variants
  "PictureAndText:type1": {
    component: PictureAtLeft,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type2": {
    component: PictureAtRight,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type3": {
    component: PictureAtLeftType3,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type4": {
    component: PicType4,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type5": {
    component: PicLeftType5,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type6": {
    component: PicLeftType6,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },

  // TwoPictureContainer variants
  "TwoPictureContainer:type1": {
    component: TwoPictureContainer,
    propBuilder: propBuilders.buildTwoPictureProps,
    showWrapper: true,
  },
  "TwoPictureContainer:type2": {
    component: TwoPictureContainer2,
    propBuilder: propBuilders.buildTwoPictureProps,
    showWrapper: true,
  },

  // IconExplainContainer variants
  "IconExplainContainer:type1": {
    component: IconExplainContainer,
    propBuilder: propBuilders.buildIconExplainProps,
    showWrapper: true,
  },
  "IconExplainContainer:type2": {
    component: IconExplainContainer2,
    propBuilder: propBuilders.buildIconExplainProps,
    showWrapper: true,
  },

  // NewsContainer variants
  "NewsContainer:type1": {
    component: NewsContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "NewsContainer:type2": {
    component: NewsContainer2,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },

  // Slider variants
  "Slider:type1": {
    component: Slider,
    propBuilder: propBuilders.buildSliderProps,
    showWrapper: true,
  },
  "Slider:type2": {
    component: SliderType2,
    propBuilder: (item: ContainerType) => ({
      id: item._id ?? "",
      mainMainHeader: item.mainHeader,
      sliderArray: item.twoPictureArray,
      componentType: item.componentType,
      componentStyle: item.style,
    }),
    showWrapper: true,
  },

  // FrequentlyAskedQuestions variants
  "FrequentlyAskedQuestions:type1": {
    component: FreqAsked,
    propBuilder: propBuilders.buildFreqAskedProps,
    showWrapper: true,
  },
  "FrequentlyAskedQuestions:type2": {
    component: FreqAskedType2,
    propBuilder: propBuilders.buildFreqAskedProps,
    showWrapper: true,
  },

  // Components without types
  SpeedReader: {
    component: SpeedReader,
    propBuilder: () => ({}),
    showWrapper: false,
  },
  // MaximContainer - support both with and without type
  MaximContainer: {
    component: MaximContainer,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type1": {
    component: MaximContainer,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  // BorderBoxContainer - support both with and without type
  BorderBoxContainer: {
    component: BorderBoxContainer,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type1": {
    component: BorderBoxContainer,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  // TypingEffectContainer - support both with and without type
  TypingEffectContainer: {
    component: TypingEffectContainer,
    propBuilder: propBuilders.buildTypingEffectProps,
    showWrapper: false,
  },
  "TypingEffectContainer:type1": {
    component: TypingEffectContainer,
    propBuilder: propBuilders.buildTypingEffectProps,
    showWrapper: false,
  },
  // ExplanationBar - support both with and without type
  ExplanationBar: {
    component: ExplanationBar,
    propBuilder: propBuilders.buildExplanationBarProps,
    showWrapper: false,
  },
  "ExplanationBar:type1": {
    component: ExplanationBar,
    propBuilder: propBuilders.buildExplanationBarProps,
    showWrapper: false,
  },
  // ProgressBar - support both with and without type
  ProgressBar: {
    component: ProgressBarContainer,
    propBuilder: propBuilders.buildProgressBarProps,
    showWrapper: false,
  },
  "ProgressBar:type1": {
    component: ProgressBarContainer,
    propBuilder: propBuilders.buildProgressBarProps,
    showWrapper: false,
  },
  ResumeBox: {
    component: ResumeBox,
    propBuilder: propBuilders.buildResumeBoxProps,
    showWrapper: false,
  },
  "ResumeBox:type1": {
    component: ResumeBox,
    propBuilder: propBuilders.buildResumeBoxProps,
    showWrapper: false,
  },
  // Carousel - support both with and without type
  Carousel: {
    component: Carousel,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  "Carousel:type1": {
    component: Carousel,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  // ResumeIcon - support both with and without type
  ResumeIcon: {
    component: ResumeIcon,
    propBuilder: propBuilders.buildResumeIconProps,
    showWrapper: false,
  },
  "ResumeIcon:type1": {
    component: ResumeIcon,
    propBuilder: propBuilders.buildResumeIconProps,
    showWrapper: false,
  },
  // YoutubeVideo - support both with and without type
  YoutubeVideo: {
    component: YoutubeVideo,
    propBuilder: propBuilders.buildYoutubeVideoProps,
    showWrapper: false,
  },
  "YoutubeVideo:type1": {
    component: YoutubeVideo,
    propBuilder: propBuilders.buildYoutubeVideoProps,
    showWrapper: false,
  },
  // PageBanner - support both with and without type
  PageBanner: {
    component: PageBanner,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "PageBanner:type1": {
    component: PageBanner,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  // WorkTeamBar - support both with and without type
  WorkTeamBar: {
    component: WorkTeamBar,
    propBuilder: propBuilders.buildWorkTeamBarProps,
    showWrapper: false,
  },
  "WorkTeamBar:type1": {
    component: WorkTeamBar,
    propBuilder: propBuilders.buildWorkTeamBarProps,
    showWrapper: false,
  },
  ContactFormEn: {
    component: ContactFormEn,
    propBuilder: () => ({}),
    showWrapper: false,
  },
  ContactFormTr: {
    component: ContactFormTr,
    propBuilder: () => ({}),
    showWrapper: false,
  },
  Map: {
    component: Map,
    propBuilder: () => ({}),
    showWrapper: false,
  },
  ContactContainer: {
    component: ContactContainer,
    propBuilder: () => ({}),
    showWrapper: false,
  },
  // BackgroundHeader - support both with and without type
  BackgroundHeader: {
    component: BackgroundHeader,
    propBuilder: propBuilders.buildBackgroundHeaderProps,
    showWrapper: false,
  },
  "BackgroundHeader:type1": {
    component: BackgroundHeader,
    propBuilder: propBuilders.buildBackgroundHeaderProps,
    showWrapper: false,
  },
  // FullPageItem - support both with and without type
  FullPageItem: {
    component: FullPageItem,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type1": {
    component: FullPageItem,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
};

/**
 * Get component configuration from registry
 */
export const getComponentConfig = (
  componentName: string,
  componentType?: string
): ComponentConfig | null => {
  const key = getRegistryKey(componentName, componentType);
  return componentRegistry[key] || null;
};

/**
 * Check if a component exists in the registry
 */
export const hasComponent = (
  componentName: string,
  componentType?: string
): boolean => {
  return getComponentConfig(componentName, componentType) !== null;
};
