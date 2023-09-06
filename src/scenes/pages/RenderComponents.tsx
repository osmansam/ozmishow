import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  ContainerType,
  ContentStyleType,
  PictureType,
  PictureWithStyleType,
} from "../../shared/types";
const PictureAtLeft = lazy(
  () => import("../../components/pictureleft/PictureAtLeft")
);
const PictureAtRight = lazy(
  () => import("../../components/pictureRight/PictureAtRight")
);
const IconExplainContainer = lazy(
  () => import("../../components/IconExplain/IconExplainContainer")
);
const TwoPictureContainer = lazy(
  () => import("../../components/twoPicture/TwoPictureContainer")
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
////
type Props = {};

export const renderComponents = (newContainer: ContainerType[]) => {
  return newContainer?.map((item, index) => {
    if (item && item.componentName) {
      const { mainHeader, twoPictureArray } = item;
      switch (item.componentName) {
        case "PictureAtRight":
          return (
            <div key={index}>
              <PictureAtRight {...(item.twoPictureArray[0] as PictureType)} />
            </div>
          );
        case "PictureAtLeft":
          return (
            <div key={index}>
              <PictureAtLeft {...(item.twoPictureArray[0] as PictureType)} />
            </div>
          );
        case "TwoPictureContainer":
          return (
            <div key={index}>
              <TwoPictureContainer
                mainHeader={item.mainHeader}
                twoPictureArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "IconExplainContainer":
          return (
            <div key={index}>
              <IconExplainContainer
                mainHeader={mainHeader}
                iconExplainArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "MaximContainer":
          return (
            <div key={index}>
              <MaximContainer {...(item.twoPictureArray[0] as PictureType)} />
            </div>
          );
        case "BorderBoxContainer":
          return (
            <div key={index}>
              <BorderBoxContainer
                mainHeader={mainHeader}
                twoPictureArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "NewsContainer":
          return (
            <div key={index}>
              <NewsContainer
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader}
              />
            </div>
          );
        case "NewsContainer2":
          return (
            <div key={index}>
              <NewsContainer2
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader}
              />
            </div>
          );
        case "ExplanationBar":
          return (
            <div key={index}>
              <ExplanationBar
                id={item && item._id ? item._id : ""}
                mainMainHeader={mainHeader as ContentStyleType}
                explanationArray={twoPictureArray as PictureWithStyleType[]}
              />
            </div>
          );
        case "Slider":
          return (
            <div key={index}>
              <Slider
                id={item && item._id ? item._id : ""}
                mainMainHeader={mainHeader}
                sliderArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "Carousel":
          return (
            <div key={index}>
              <Carousel
                id={item && item._id ? item._id : ""}
                mainMainHeader={mainHeader}
                carouselArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "YoutubeVideo":
          return (
            <div key={index}>
              <YoutubeVideo
                embedId={mainHeader ? mainHeader : ""}
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
              <PageBanner {...(item.twoPictureArray[0] as PictureType)} />
            </div>
          );
        case "FrequentlyAskedQuestions":
          return (
            <div key={index}>
              <FreqAsked
                id={item && item._id ? item._id : ""}
                freqAskedArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "WorkTeamBar":
          return (
            <div key={index}>
              <WorkTeamBar
                id={item && item._id ? item._id : ""}
                mainMainHeader={mainHeader}
                workTeamArray={twoPictureArray as PictureType[]}
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
                mainHeader={mainHeader ? mainHeader : ""}
                progressBarArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "ResumeBox":
          return (
            <div key={index}>
              <ResumeBox
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader ? mainHeader : ""}
                resumeBoxArray={twoPictureArray as PictureType[]}
              />
            </div>
          );
        case "ResumeIcon":
          return (
            <div key={index}>
              <ResumeIcon
                id={item && item._id ? item._id : ""}
                mainHeader={mainHeader ? mainHeader : ""}
                resumeIconArray={twoPictureArray as PictureType[]}
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
                fullPageItemArray={twoPictureArray as PictureType[]}
                id={item && item._id ? item._id : ""}
              />
            </div>
          );
        case "BackgroundHeader":
          return (
            <div key={index}>
              <BackgroundHeader
                mainHeader={mainHeader ? mainHeader : ""}
                header={
                  twoPictureArray[0].header
                    ? (twoPictureArray[0].header as string)
                    : ""
                }
              />
            </div>
          );

        case "TypingEffectContainer":
          return (
            <div key={index}>
              <TypingEffectContainer
                img={twoPictureArray[0].img ? twoPictureArray[0].img : ""}
                paragraphs={
                  twoPictureArray[0].paragraphs
                    ? twoPictureArray[0].paragraphs
                    : []
                }
              />
            </div>
          );
        default:
          return null;
      }
    }
  });
};
