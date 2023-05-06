import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  getPageOptions,
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
import Deneme from "../deneme";
interface Props {
  page: string;
}

const PageAdmin = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language } = useSelector((state: RootState) => state.context);
  const { container, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );
  // make the page top and took the containers from database
  useEffect(() => {
    if (pageOptions.includes(page)) {
      window.scrollTo(0, 0);
      dispatch(getPageTwoPictures(page));
      dispatch(getPageOptions());
    } else {
      console.error(`Invalid page: ${page}`);
    }
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
  const renderComponents = () => {
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

    return newContainer?.map((item, index) => {
      if (item && item.componentName) {
        const { mainHeader, twoPictureArray } = item;

        switch (item.componentName) {
          case "PictureAtRight":
            return (
              <div key={index}>
                <PictureAtRight {...twoPictureArray[0]} />
                <button
                  className="border-2 m-2"
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                >
                  Move Up
                </button>
                <button
                  className="border-2 m-2"
                  disabled={index === newContainer.length - 1}
                  onClick={() => moveItem(index, "down")}
                >
                  Move Down
                </button>
              </div>
            );
          case "PictureAtLeft":
            return (
              <div key={index}>
                <PictureAtLeft {...twoPictureArray[0]} />
                <button
                  className="border-2 m-2"
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                >
                  Move Up
                </button>
                <button
                  className="border-2 m-2"
                  disabled={index === newContainer.length - 1}
                  onClick={() => moveItem(index, "down")}
                >
                  Move Down
                </button>
              </div>
            );
          case "TwoPictureContainer":
            return (
              <div key={index}>
                <TwoPictureContainer
                  mainHeader={item.mainHeader}
                  twoPictureArray={twoPictureArray}
                />
                <button
                  className="border-2 m-2"
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                >
                  Move Up
                </button>
                <button
                  className="border-2 m-2"
                  disabled={index === newContainer.length - 1}
                  onClick={() => moveItem(index, "down")}
                >
                  Move Down
                </button>
              </div>
            );
          case "IconExplainContainer":
            return (
              <div key={index}>
                <IconExplainContainer
                  mainHeader={mainHeader}
                  iconExplainArray={twoPictureArray}
                />
                <button
                  className="border-2 m-2"
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                >
                  Move Up
                </button>
                <button
                  className="border-2 m-2"
                  disabled={index === newContainer.length - 1}
                  onClick={() => moveItem(index, "down")}
                >
                  Move Down
                </button>
              </div>
            );
          case "MaximContainer":
            return (
              <div key={index}>
                <MaximContainer {...twoPictureArray[0]} />
                <button
                  className="border-2 m-2"
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                >
                  Move Up
                </button>
                <button
                  className="border-2 m-2"
                  disabled={index === newContainer.length - 1}
                  onClick={() => moveItem(index, "down")}
                >
                  Move Down
                </button>
              </div>
            );
          case "BorderBoxContainer":
            return (
              <div key={index}>
                <BorderBoxContainer
                  mainHeader={mainHeader}
                  twoPictureArray={twoPictureArray}
                />
                <button
                  className="border-2 m-2"
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                >
                  Move Up
                </button>
                <button
                  className="border-2 m-2"
                  disabled={index === newContainer.length - 1}
                  onClick={() => moveItem(index, "down")}
                >
                  Move Down
                </button>
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
      {/* language options  */}
      <div className="w-5/6 flex justify-end">
        {Object.values(LanguageOptions).map((option, index) => (
          <button
            key={index}
            className="border-2 rounded-md p-2 mt-4"
            onClick={() => dispatch(setLanguage(option))}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>
      <Deneme />
      {renderComponents()}
    </div>
  );
};

export default PageAdmin;
