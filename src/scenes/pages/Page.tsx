import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  getPageTwoPictures,
  updateTwoPicture,
} from "../../features/twoPicture/twoPictureSlice";
import { LanguageOptions } from "../../shared/types";
import PictureAtLeft from "../../components/pictureleft/PictureAtLeft";
import PictureAtRight from "../../components/pictureRight/PictureAtRight";
import IconExplainContainer from "../../components/IconExplain/IconExplainContainer";
import TwoPictureContainer from "../../components/twoPicture/TwoPictureContainer";
import { ContainerType } from "../../shared/types";
import MaximContainer from "../../components/maxim";
import { setLanguage } from "../../features/context/contextSlice";
import FreqAsked from "../../components/freqAsked/FreqAsked";
import BorderBoxContainer from "../../components/borderBox/BorderBoxContainer";
import NewsContainer from "../../components/news/NewsContainer";
import Deneme from "../deneme";
import ExplanationBar from "../../components/ExplanationBar";
import PageBanner from "../../components/PageBanner/PageBanner";
import WorkTeamBar from "../../components/WorkTeamBar/WorkTeamBar";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
interface Props {
  page: string;
}

const PageAdmin = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  useEffect(() => {
    dispatch(getPageTwoPictures(page));
    window.scrollTo(0, 0);
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
                  newsArray={twoPictureArray}
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
          default:
            return null;
        }
      }
    });
  };
  const currentPage = pageOptions.find((item) => item.pageName === page);

  return (
    <div>
      {currentPage?.isNavbar && (
        <div>
          {isSidebarOpen && (
            <Sidebar currentPage={currentPage ? currentPage.pageName : ""} />
          )}
          <Navbar currentPage={currentPage ? currentPage.pageName : ""} />
        </div>
      )}
      {renderComponents()}
      {currentPage?.isNavbar && (
        <Footer currentPage={currentPage ? currentPage.pageName : ""} />
      )}
    </div>
  );
};

export default PageAdmin;
