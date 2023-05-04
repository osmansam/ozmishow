import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  getPageTwoPictures,
  updateTwoPicture,
} from "../../features/twoPicture/twoPictureSlice";
import { LanguageOptions, PageOptions } from "../../shared/types";
import PictureAtLeft from "../../components/PictureAtLeft";
import PictureAtRight from "../../components/PictureAtRight";
import IconExplainContainer from "../../components/IconExplainContainer";
import TwoPictureContainer from "../../components/TwoPictureContainer";
import { ContainerType } from "../../shared/types";
import MaximContainer from "../../components/maxim";
import { setLanguage } from "../../features/context/contextSlice";
interface Props {
  page: string;
}

const PageAdmin = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language } = useSelector((state: RootState) => state.context);
  useEffect(() => {
    if (Object.values(PageOptions).includes(page as keyof typeof PageOptions)) {
      window.scrollTo(0, 0);
      dispatch(
        getPageTwoPictures(PageOptions[page as keyof typeof PageOptions])
      );
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
                  twoPictureArray={item.twoPictureArray}
                />
              </div>
            );
          case "IconExplainContainer":
            const { mainHeader, twoPictureArray: iconExplainArray } = item;
            return (
              <div key={index}>
                <IconExplainContainer
                  mainHeader={mainHeader}
                  iconExplainArray={iconExplainArray}
                />
              </div>
            );
          case "MaximContainer":
            return (
              <div key={index}>
                <MaximContainer {...item.twoPictureArray[0]} />
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
      {renderComponents()}
    </div>
  );
};

export default PageAdmin;
