import { lazy } from "react";
import SliderType2 from "../../components/slider/SliderType2";
import {
  ContainerType,
  ContentStyleType,
  ImageContentStyleType,
  PictureType,
  PictureWithStyleType,
} from "../../shared/types";
const PictureAtLeft = lazy(
  () => import("../../components/pictureAndText/picLeft/PictureAtLeft")
);
const PictureAtRight = lazy(
  () => import("../../components/pictureAndText/picRight/PictureAtRight")
);
const PicType4 = lazy(
  () => import("../../components/pictureAndText/picRight/PicType4")
);
const PicLeftType5 = lazy(
  () => import("../../components/pictureAndText/picLeft/PicLeftType5")
);
const PicLeftType6 = lazy(
  () => import("../../components/pictureAndText/picLeft/PicLeftType6")
);
const PictureAtLeftType3 = lazy(
  () => import("../../components/pictureAndText/picLeft/PictureAtLeftType3")
);
const IconExplainContainer = lazy(
  () => import("../../components/IconExplain/type1/IconExplainContainer")
);
const IconExplainContainer2 = lazy(
  () => import("../../components/IconExplain/type2/IconExplainContainer2")
);
const TwoPictureContainer = lazy(
  () => import("../../components/twoPicture/type1/TwoPictureContainer")
);
const TwoPictureContainer2 = lazy(
  () => import("../../components/twoPicture/type2/TwoPictureContainer2")
);
const MaximContainer = lazy(() => import("../../components/maxim"));
const FreqAsked = lazy(() => import("../../components/freqAsked/FreqAsked"));
const BorderBoxContainer = lazy(
  () => import("../../components/borderBox/BorderBoxContainer")
);
const NewsContainer = lazy(
  () => import("../../components/news/newsType1/NewsContainer")
);
const NewsContainer2 = lazy(
  () => import("../../components/news/newsType2/NewsContainer2")
);
const ExplanationBar = lazy(() => import("../../components/ExplanationBar"));
const PageBanner = lazy(() => import("../../components/PageBanner/PageBanner"));
const WorkTeamBar = lazy(
  () => import("../../components/WorkTeamBar/WorkTeamBar")
);

const ContactFormEn = lazy(
  () => import("../../components/contactForm/ContactFormEn")
);
const ContactFormTr = lazy(
  () => import("../../components/contactForm/ContactFormTr")
);
const ContactContainer = lazy(
  () => import("../../components/contactContainer/ContactContainer")
);
const Map = lazy(() => import("../../components/map"));
const FullPageItem = lazy(() => import("../../components/fullPageItem"));
const Slider = lazy(() => import("../../components/slider/Slider"));
const Carousel = lazy(() => import("../../components/carousel"));
const YoutubeVideo = lazy(() => import("../../components/youtube"));
const TypingEffect = lazy(
  () => import("../../components/TypingEffect/TypingEffect")
);
const ProgressBarContainer = lazy(
  () => import("../../components/ProgressBar/ProgressBarContainer")
);
const TypingEffectContainer = lazy(
  () => import("../../components/TypingEffect/TypingEffectContainer")
);
const ResumeBox = lazy(
  () => import("../../components/resumeBox/ResumeBoxContainer")
);
const BackgroundHeader = lazy(
  () => import("../../components/BackgroundHeader/BackgroundHeader")
);
const ResumeIcon = lazy(
  () => import("../../components/resumeIcon/ResumeIconContainer")
);
const SpeedReader = lazy(
  () => import("../../components/speedReader/SpeedReader")
);
const FreqAskedType2 = lazy(
  () => import("../../components/freqAsked/FreqAskedType2")
);
////
type Props = {};

export const renderComponents = (newContainer: ContainerType[]) => {
  return newContainer?.map((item, index) => {
    if (item && item.componentName) {
      const { mainHeader, twoPictureArray, style, componentType } = item;
      const pictureItem = {
        ...item.twoPictureArray[0],
        componentStyle: style,
        componentType: componentType,
      };
      switch (item.componentName) {
        case "PictureAndText":
          if (componentType === "type1") {
            return (
              <div key={index}>
                <PictureAtLeft
                  {...(pictureItem as PictureWithStyleType)}
                  _id={item && item._id ? item._id : ""}
                />
              </div>
            );
          } else if (componentType === "type2") {
            return (
              <div key={index}>
                <PictureAtRight
                  {...(pictureItem as PictureWithStyleType)}
                  _id={item && item._id ? item._id : ""}
                />
              </div>
            );
          } else if (componentType === "type3") {
            return (
              <div key={index}>
                <PictureAtLeftType3
                  {...(pictureItem as PictureWithStyleType)}
                  _id={item && item._id ? item._id : ""}
                />
              </div>
            );
          } else if (componentType === "type4") {
            return (
              <div key={index}>
                <PicType4
                  {...(pictureItem as PictureWithStyleType)}
                  _id={item && item._id ? item._id : ""}
                />
              </div>
            );
          } else if (componentType === "type5") {
            return (
              <div key={index}>
                <PicLeftType5
                  {...(pictureItem as PictureWithStyleType)}
                  _id={item && item._id ? item._id : ""}
                />
              </div>
            );
          } else if (componentType === "type6") {
            return (
              <div key={index}>
                <PicLeftType6
                  {...(pictureItem as PictureWithStyleType)}
                  _id={item && item._id ? item._id : ""}
                />
              </div>
            );
          }
          break;
        case "TwoPictureContainer":
          if (componentType === "type1") {
            return (
              <div key={index}>
                <TwoPictureContainer
                  id={item && item._id ? item._id : ""}
                  mainHeader={item.mainHeader}
                  componentType={componentType}
                  componentStyle={style}
                  twoPictureArray={twoPictureArray as PictureWithStyleType[]}
                />
              </div>
            );
          } else if (componentType === "type2") {
            return (
              <div key={index}>
                <TwoPictureContainer2
                  id={item && item._id ? item._id : ""}
                  mainHeader={item.mainHeader}
                  componentType={componentType}
                  componentStyle={style}
                  twoPictureArray={twoPictureArray as PictureWithStyleType[]}
                />
              </div>
            );
          }
          break;

        case "IconExplainContainer":
          if (componentType === "type1") {
            return (
              <div key={index}>
                <IconExplainContainer
                  mainHeader={mainHeader}
                  componentType={componentType}
                  componentStyle={style}
                  iconExplainArray={twoPictureArray as PictureWithStyleType[]}
                  id={item && item._id ? item._id : ""}
                />
              </div>
            );
          } else if (componentType === "type2") {
            return (
              <div key={index}>
                <IconExplainContainer2
                  mainHeader={mainHeader}
                  componentType={componentType}
                  componentStyle={style}
                  iconExplainArray={twoPictureArray as PictureWithStyleType[]}
                  id={item && item._id ? item._id : ""}
                />
              </div>
            );
          }
          break;

        case "MaximContainer":
          return (
            <div key={index}>
              <MaximContainer
                {...(pictureItem as PictureWithStyleType)}
                _id={item && item._id ? item._id : ""}
              />
            </div>
          );
        case "BorderBoxContainer":
          return (
            <div key={index}>
              <BorderBoxContainer
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader}
                componentType={componentType}
                componentStyle={style}
                twoPictureArray={twoPictureArray as PictureWithStyleType[]}
              />
            </div>
          );
        case "NewsContainer":
          if (componentType === "type1") {
            return (
              <div key={index}>
                <NewsContainer
                  id={item && item._id ? item._id : ""}
                  mainHeader={mainHeader}
                  componentType={componentType}
                  componentStyle={style}
                />
              </div>
            );
          } else if (componentType === "type2") {
            return (
              <div key={index}>
                <NewsContainer2
                  id={item && item._id ? item._id : ""}
                  componentStyle={style}
                  componentType={componentType}
                  mainHeader={mainHeader}
                />
              </div>
            );
          }
          break;
        case "ExplanationBar":
          return (
            <div key={index}>
              <ExplanationBar
                id={item && item._id ? item._id : ""}
                mainMainHeader={mainHeader as ContentStyleType}
                componentStyle={style}
                explanationArray={twoPictureArray as PictureWithStyleType[]}
              />
            </div>
          );
        case "Slider":
          if (componentType === "type1") {
            return (
              <div key={index}>
                <Slider
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  sliderArray={twoPictureArray as PictureWithStyleType[]}
                  componentType={componentType}
                  componentStyle={style}
                />
              </div>
            );
          } else if (componentType === "type2") {
            return (
              <div key={index}>
                <SliderType2
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  sliderArray={twoPictureArray as PictureWithStyleType[]}
                  componentType={componentType}
                  componentStyle={style}
                />
              </div>
            );
          }
          break;

        case "Carousel":
          return (
            <div key={index}>
              <Carousel
                id={item && item._id ? item._id : ""}
                mainMainHeader={mainHeader}
                componentStyle={style}
                carouselArray={twoPictureArray as PictureWithStyleType[]}
              />
            </div>
          );
        case "YoutubeVideo":
          return (
            <div key={index}>
              <YoutubeVideo
                embedId={mainHeader?.content ?? ""}
                header={
                  twoPictureArray[0].header
                    ? (twoPictureArray[0].header as string)
                    : ""
                }
              />
            </div>
          );
        case "PageBanner":
          return (
            <div key={index}>
              <PageBanner
                {...(pictureItem as PictureWithStyleType)}
                _id={item && item._id ? item._id : ""}
              />
            </div>
          );
        case "FrequentlyAskedQuestions":
          if (componentType === "type1") {
            return (
              <div key={index}>
                <FreqAsked
                  id={item && item._id ? item._id : ""}
                  componentStyle={style}
                  freqAskedArray={twoPictureArray as PictureWithStyleType[]}
                  componentType={componentType}
                />
              </div>
            );
          } else if (componentType === "type2") {
            return (
              <div key={index}>
                <FreqAskedType2
                  id={item && item._id ? item._id : ""}
                  componentStyle={style}
                  freqAskedArray={twoPictureArray as PictureWithStyleType[]}
                  componentType={componentType}
                />
              </div>
            );
          }
          break;
        case "WorkTeamBar":
          return (
            <div key={index}>
              <WorkTeamBar
                id={item && item._id ? item._id : ""}
                mainMainHeader={mainHeader}
                workTeamArray={twoPictureArray as PictureWithStyleType[]}
                componentStyle={style}
              />
            </div>
          );
        case "SpeedReader":
          return (
            <div key={index}>
              <SpeedReader />
            </div>
          );
        case "ProgressBar":
          return (
            <div key={index}>
              <ProgressBarContainer
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader}
                componentStyle={style}
                progressBarArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "ResumeBox":
          return (
            <div key={index}>
              <ResumeBox
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader}
                componentStyle={style}
                resumeBoxArray={twoPictureArray as PictureWithStyleType[]}
              />
            </div>
          );
        case "ResumeIcon":
          return (
            <div key={index}>
              <ResumeIcon
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader}
                resumeIconArray={twoPictureArray as PictureWithStyleType[]}
                componentStyle={style}
              />
            </div>
          );
        case "ContactFormEn":
          return (
            <div key={index}>
              <ContactFormEn />
            </div>
          );
        case "ContactFormTr":
          return (
            <div key={index}>
              <ContactFormTr />
            </div>
          );
        case "Map":
          return (
            <div key={index}>
              <Map />
            </div>
          );
        case "ContactContainer":
          return (
            <div key={index}>
              <ContactContainer />
            </div>
          );
        case "FullPageItem":
          return (
            <div key={index}>
              <FullPageItem
                mainMainHeader={mainHeader}
                componentStyle={style}
                fullPageItemArray={twoPictureArray as PictureWithStyleType[]}
                id={item && item._id ? item._id : ""}
              />
            </div>
          );
        case "BackgroundHeader":
          return (
            <div key={index}>
              <BackgroundHeader
                _id={item && item._id ? item._id : ""}
                componentStyle={style}
                mainMainHeader={mainHeader}
                header={twoPictureArray[0]?.header as ContentStyleType}
              />
            </div>
          );

        case "TypingEffectContainer":
          const paragraphs = Array.isArray(twoPictureArray[0]?.paragraphs)
            ? twoPictureArray[0]?.paragraphs
            : [];

          return (
            <div key={index}>
              <TypingEffectContainer
                img={twoPictureArray[0].img as ImageContentStyleType}
                paragraphs={paragraphs}
              />
            </div>
          );
        default:
          return null;
      }
    }
  });
};
