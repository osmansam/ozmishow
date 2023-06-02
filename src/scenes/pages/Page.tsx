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
import BorderBoxContainer from "../../components/borderBox/BorderBoxContainer";
import NewsContainer from "../../components/news/NewsContainer";
import Deneme from "../deneme";
import NewsBox from "../../components/news/NewsBox";
interface Props {
  page: string;
}

const PageAdmin = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language } = useSelector((state: RootState) => state.context);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  useEffect(() => {
    if (pageOptions.includes(page)) {
      window.scrollTo(0, 0);
      dispatch(getPageTwoPictures(page));
    } else {
      console.error(`Invalid page: ${page}`);
    }
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
          default:
            return null;
        }
      }
    });
  };

  return (
    <div>
      {/* language options development purposes  */}
      <div className="w-5/6 flex justify-end">
        {Object.values(LanguageOptions).map((option) => (
          <button
            className="border-2 rounded-md p-2 mt-4"
            onClick={() => dispatch(setLanguage(option))}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>
      {/* burasi deneme silinecek */}
      <Deneme />
      {renderComponents()}
    </div>
  );
};

export default PageAdmin;
