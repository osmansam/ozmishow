import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  getPageTwoPictures,
  updateTwoPicture,
  deleteTwoPicture,
  updatePageAndLanguage,
  getPageOptions,
} from "../../features/twoPicture/twoPictureSlice";
import {
  pageStyle,
  imageStyle,
  ImageContentStyleType,
} from "../../shared/types";
import PageStyleModalContainer from "../../hooks/pageStyle/PageStyleModalContainer";
import {
  LanguageOptions,
  PageOptionsType,
  ContainerType,
  PictureType,
  PictureWithStyleType,
  ContentStyleType,
} from "../../shared/types";
import ConfirmationModal from "../../hooks/confirmation";
import Loading from "../../components/loading";
import SliderType2 from "../../components/slider/SliderType2";
const PictureAtLeft = lazy(
  () => import("../../components/pictureAndText/picLeft/PictureAtLeft")
);
const PictureAtLeftType3 = lazy(
  () => import("../../components/pictureAndText/picLeft/PictureAtLeftType3")
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
const Navbar = lazy(() => import("../../components/navbar/Navbar"));
const Sidebar = lazy(() => import("../../components/sidebar"));
const Footer = lazy(() => import("../../components/footer"));
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
interface Props {
  page: string;
}
interface PageConfigurationButtonsProps {
  index: number;
  moveItem: (index: number, direction: "up" | "down") => void;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
  id: string;
  pageOptions: Array<PageOptionsType>;
  language: string;
}
// the buttons for the admin page configuration
export const PageConfigurationButtons: React.FC<
  PageConfigurationButtonsProps
> = ({
  index,
  moveItem,
  disableMoveUp,
  disableMoveDown,
  id,
  pageOptions,
  language,
}) => {
  const dispatch = useAppDispatch();

  const [updatePage, setUpdatePage] = useState(pageOptions[0].pageNameEN);
  const [updateLanguage, setUpdateLanguage] = useState(language);
  const handleConfirmDelete = async () => {
    await dispatch(deleteTwoPicture(id));
    window.location.reload();
  };
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="pt-4 flex flex-col items-center">
      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {/* move the container up and down */}
      <div className="flex flex-row gap-6">
        <button
          className="border-2 m-2 px-4 rounded-lg   hover:bg-slate-400 cursor-pointer"
          disabled={disableMoveUp}
          onClick={() => moveItem(index, "up")}
        >
          Move Up
        </button>
        <button
          className="border-2 m-2 px-4 rounded-lg   hover:bg-slate-400 cursor-pointer"
          disabled={disableMoveDown}
          onClick={() => moveItem(index, "down")}
        >
          Move Down
        </button>
        {/* Delete Container */}
        <button
          className="border-2 m-2 px-4 rounded-lg   hover:bg-slate-400 cursor-pointer"
          onClick={async () => {
            setShowConfirmationModal(true);
          }}
        >
          Delete
        </button>
      </div>
      {/* change page and language  */}
      <div className="flex flex-row gap-6  w-1/3 ">
        <select
          className="border-2 m-2 px-4 rounded-lg   hover:bg-slate-400 cursor-pointer"
          onChange={(e) => {
            setUpdatePage(e.target.value);
          }}
        >
          {pageOptions.map((page, index) => (
            <option key={index} value={page.pageNameEN}>
              {page.pageNameEN}
            </option>
          ))}
        </select>
        <select
          className="border-2 m-2 px-4 rounded-lg   hover:bg-slate-400 cursor-pointer w-1/3"
          onChange={(e) => {
            setUpdateLanguage(e.target.value);
          }}
        >
          {Object.entries(LanguageOptions).map(([value, label]) => (
            <option
              key={value}
              value={LanguageOptions[label as keyof typeof LanguageOptions]}
            >
              {label}
            </option>
          ))}
        </select>
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={async () => {
            await dispatch(
              updatePageAndLanguage({
                id,
                page: updatePage,
                language: updateLanguage,
              })
            );
            window.location.reload();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const PageAdmin = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  const { container, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );
  // make the page top and took the containers from database

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPageOptions());
      await dispatch(getPageTwoPictures(page));
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [dispatch, page]);

  // filter the container by language and then sort it
  useEffect(() => {
    if (container.length > 0) {
      let filteredContainer = container.filter((c) => c.language === language);
      let sortedContainer = filteredContainer.sort(
        (a, b) => a.position - b.position
      );
      setNewContainer(sortedContainer);
    }
  }, [container, language]);
  // render containers by the component name
  const moveItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      setNewContainer((prev) => {
        const updatedContainer = prev.map((c) => ({ ...c })); // create new objects
        const temp = updatedContainer[index];
        updatedContainer[index] = updatedContainer[index - 1];
        updatedContainer[index - 1] = temp;
        updatedContainer.forEach((c, i) => {
          c.position = i;
          dispatch(updateTwoPicture(c));
        });

        return updatedContainer;
      });
    } else if (direction === "down" && index < newContainer.length - 1) {
      setNewContainer((prev) => {
        const updatedContainer = prev.map((c) => ({ ...c })); // create new objects
        const temp = updatedContainer[index];
        updatedContainer[index] = updatedContainer[index + 1];
        updatedContainer[index + 1] = temp;
        updatedContainer.forEach((c, i) => {
          c.position = i;
          dispatch(updateTwoPicture(c));
        });
        return updatedContainer;
      });
    }
  };
  const renderComponents = () => {
    return newContainer?.map((item, index) => {
      if (item && item.componentName) {
        const { mainHeader, twoPictureArray, _id, style, componentType } = item;
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

                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                    mainHeader={item.mainHeader}
                    componentStyle={style}
                    componentType={componentType}
                    twoPictureArray={twoPictureArray as PictureWithStyleType[]}
                    id={item && item._id ? item._id : ""}
                  />
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
                  />
                </div>
              );
            } else if (componentType === "type2") {
              return (
                <div key={index}>
                  <TwoPictureContainer2
                    mainHeader={item.mainHeader}
                    componentStyle={style}
                    componentType={componentType}
                    twoPictureArray={twoPictureArray as PictureWithStyleType[]}
                    id={item && item._id ? item._id : ""}
                  />
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
                  />
                </div>
              );
            }

            break;

          case "SpeedReader":
            return (
              <div key={index}>
                <SpeedReader />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "IconExplainContainer":
            if (componentType === "type1") {
              return (
                <div key={index}>
                  <IconExplainContainer
                    mainHeader={mainHeader}
                    componentType={componentType}
                    iconExplainArray={twoPictureArray as PictureWithStyleType[]}
                    componentStyle={style}
                    id={item && item._id ? item._id : ""}
                  />
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
                  />
                </div>
              );
            } else if (componentType === "type2") {
              return (
                <div key={index}>
                  <IconExplainContainer2
                    mainHeader={mainHeader}
                    componentType={componentType}
                    iconExplainArray={twoPictureArray as PictureWithStyleType[]}
                    componentStyle={style}
                    id={item && item._id ? item._id : ""}
                  />
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "BorderBoxContainer":
            return (
              <div key={index}>
                <BorderBoxContainer
                  id={item && item._id ? item._id : ""}
                  mainHeader={mainHeader}
                  componentStyle={style}
                  componentType={componentType}
                  twoPictureArray={twoPictureArray as PictureWithStyleType[]}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
                  />
                </div>
              );
            }
            break;

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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ExplanationBar":
            return (
              <div key={index}>
                <ExplanationBar
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader as ContentStyleType}
                  componentStyle={style}
                  explanationArray={twoPictureArray as PictureWithStyleType[]}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ResumeBox":
            return (
              <div key={index}>
                <ResumeBox
                  id={item && item._id ? item._id : ""}
                  mainHeader={mainHeader}
                  resumeBoxArray={twoPictureArray as PictureWithStyleType[]}
                  componentStyle={style}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
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
                    page={page}
                  />
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                    page={page}
                  />
                  <PageConfigurationButtons
                    index={index}
                    moveItem={moveItem}
                    disableMoveUp={index === 0}
                    disableMoveDown={index === newContainer.length - 1}
                    id={_id ? _id : ""}
                    pageOptions={pageOptions}
                    language={language}
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
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ContactFormEn":
            return (
              <div key={index}>
                <ContactFormEn />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ContactFormTr":
            return (
              <div key={index}>
                <ContactFormTr />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "Map":
            return (
              <div key={index}>
                <Map />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "ContactContainer":
            return (
              <div key={index}>
                <ContactContainer />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "BackgroundHeader":
            return (
              <div key={index}>
                <BackgroundHeader
                  _id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  componentStyle={style}
                  header={twoPictureArray[0]?.header as ContentStyleType}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          case "FullPageItem":
            return (
              <div key={index}>
                <FullPageItem
                  mainMainHeader={mainHeader}
                  fullPageItemArray={twoPictureArray as PictureWithStyleType[]}
                  componentStyle={style}
                  id={item && item._id ? item._id : ""}
                />
                <PageConfigurationButtons
                  index={index}
                  moveItem={moveItem}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === newContainer.length - 1}
                  id={_id ? _id : ""}
                  pageOptions={pageOptions}
                  language={language}
                />
              </div>
            );
          default:
            return null;
        }
      }
    });
  };

  const currentPage = pageOptions.find((item) => item.pageNameEN === page);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full min-h-screen">
        {(currentPage?.isNavbar || currentPage?.isSubpage) && (
          <div>
            {isSidebarOpen && (
              <Sidebar
                currentPage={currentPage ? currentPage.pageNameEN : ""}
              />
            )}
            <Navbar currentPage={currentPage} />
          </div>
        )}
        <div style={currentPage?.pageStyle}>
          <PageStyleModalContainer
            pageOptionsId={currentPage?._id ?? ""}
            styleData={currentPage?.pageStyle ?? pageStyle}
          />
          {renderComponents()}
        </div>
        {(currentPage?.isNavbar || currentPage?.isSubpage) && (
          <Footer currentPage={currentPage ? currentPage.pageNameEN : ""} />
        )}
      </div>
    </Suspense>
  );
};

export default PageAdmin;
