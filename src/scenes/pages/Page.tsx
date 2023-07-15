import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  getPageOptions,
  getPageTwoPictures,
} from "../../features/twoPicture/twoPictureSlice";
import PictureAtLeft from "../../components/pictureleft/PictureAtLeft";
import PictureAtRight from "../../components/pictureRight/PictureAtRight";
import IconExplainContainer from "../../components/IconExplain/IconExplainContainer";
import TwoPictureContainer from "../../components/twoPicture/TwoPictureContainer";
import { ContainerType } from "../../shared/types";
import MaximContainer from "../../components/maxim";
import FreqAsked from "../../components/freqAsked/FreqAsked";
import BorderBoxContainer from "../../components/borderBox/BorderBoxContainer";
import NewsContainer from "../../components/news/newsType1/NewsContainer";
import NewsContainer2 from "../../components/news/newsType2/NewsContainer2";
import ExplanationBar from "../../components/ExplanationBar";
import PageBanner from "../../components/PageBanner/PageBanner";
import WorkTeamBar from "../../components/WorkTeamBar/WorkTeamBar";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import ContactFormEn from "../../components/contactForm/ContactFormEn";
import ContactFormTr from "../../components/contactForm/ContactFormTr";
import ContactContainer from "../../components/contactContainer/ContactContainer";
import Map from "../../components/map";
import FullPageItem from "../../components/fullPageItem";
import Slider from "../../components/slider/Slider";
import Carousel from "../../components/carousel";
import YoutubeVideo from "../../components/youtube";
import TypingEffect from "../../components/TypingEffect/TypingEffect";
import Loading from "../../components/loading";
interface Props {
  page: string;
}

const PageAdmin = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPageOptions());
      await dispatch(getPageTwoPictures(page));
      setIsLoading(false);
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [dispatch, page]);

  const { container } = useSelector((state: RootState) => state.twoPicture);
  useEffect(() => {
    if (container.length > 0) {
      let filteredContainer = container.filter((c) => c.language === language);
      let sortedContainer = filteredContainer.sort(
        (a, b) => a.position - b.position
      );
      setNewContainer(sortedContainer);
    }
  }, [container, language]);

  const renderComponents = () => {
    return newContainer?.map((item, index) => {
      if (item && item.componentName) {
        const { mainHeader, twoPictureArray } = item;
        switch (item.componentName) {
          case "PictureAtRight":
            return (
              <div key={index}>
                <PictureAtRight {...item.twoPictureArray[0]} />
              </div>
            );
          case "PictureAtLeft":
            return (
              <div key={index}>
                <PictureAtLeft {...item.twoPictureArray[0]} />
              </div>
            );
          case "TwoPictureContainer":
            return (
              <div key={index}>
                <TwoPictureContainer
                  mainHeader={item.mainHeader}
                  twoPictureArray={twoPictureArray}
                />
              </div>
            );
          case "IconExplainContainer":
            return (
              <div key={index}>
                <IconExplainContainer
                  mainHeader={mainHeader}
                  iconExplainArray={twoPictureArray}
                />
              </div>
            );
          case "MaximContainer":
            return (
              <div key={index}>
                <MaximContainer {...item.twoPictureArray[0]} />
              </div>
            );
          case "BorderBoxContainer":
            return (
              <div key={index}>
                <BorderBoxContainer
                  mainHeader={mainHeader}
                  twoPictureArray={twoPictureArray}
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
                  mainMainHeader={mainHeader}
                  explanationArray={twoPictureArray}
                />
              </div>
            );
          case "Slider":
            return (
              <div key={index}>
                <Slider
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  sliderArray={twoPictureArray}
                />
              </div>
            );
          case "Carousel":
            return (
              <div key={index}>
                <Carousel
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  carouselArray={twoPictureArray}
                />
              </div>
            );
          case "YoutubeVideo":
            return (
              <div key={index}>
                <YoutubeVideo
                  embedId={mainHeader ? mainHeader : ""}
                  header={
                    twoPictureArray[0].header ? twoPictureArray[0].header : ""
                  }
                />
              </div>
            );
          case "PageBanner":
            return (
              <div key={index}>
                <PageBanner {...twoPictureArray[0]} />
              </div>
            );
          case "FrequentlyAskedQuestions":
            return (
              <div key={index}>
                <FreqAsked
                  id={item && item._id ? item._id : ""}
                  freqAskedArray={twoPictureArray}
                />
              </div>
            );
          case "WorkTeamBar":
            return (
              <div key={index}>
                <WorkTeamBar
                  id={item && item._id ? item._id : ""}
                  mainMainHeader={mainHeader}
                  workTeamArray={twoPictureArray}
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
                  fullPageItemArray={twoPictureArray}
                  id={item && item._id ? item._id : ""}
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
  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col h-full min-h-screen">
      {(currentPage?.isNavbar || currentPage?.isSubpage) && (
        <div>
          {isSidebarOpen && (
            <Sidebar currentPage={currentPage ? currentPage.pageNameEN : ""} />
          )}
          <Navbar currentPage={currentPage} />
        </div>
      )}

      {renderComponents()}
      {(currentPage?.isNavbar || currentPage?.isSubpage) && (
        <Footer currentPage={currentPage ? currentPage.pageNameEN : ""} />
      )}
    </div>
  );
};

export default PageAdmin;
