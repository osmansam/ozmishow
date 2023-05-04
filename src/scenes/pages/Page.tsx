import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  getPageTwoPictures,
  updateTwoPicture,
} from "../../features/twoPicture/twoPictureSlice";
import { PageOptions } from "../../shared/types";
import PictureAtLeft from "../../components/PictureAtLeft";
import PictureAtRight from "../../components/PictureAtRight";
import IconExplainContainer from "../../components/IconExplainContainer";
import TwoPictureContainer from "../../components/TwoPictureContainer";
import { ContainerType } from "../../shared/types";
import MaximContainer from "../../components/maxim";
interface Props {
  page: string;
}

const Page = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  useEffect(() => {
    if (Object.values(PageOptions).includes(page as keyof typeof PageOptions)) {
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
      const sortedContainer = container
        .slice()
        .sort((a, b) => a.position - b.position);
      setNewContainer(sortedContainer);
    }
  }, [container]);

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
        switch (item.componentName) {
          case "PictureAtRight":
            return (
              <div key={index}>
                <PictureAtRight {...item.twoPictureArray[0]} />
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
                <PictureAtLeft {...item.twoPictureArray[0]} />
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
                  twoPictureArray={item.twoPictureArray}
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
            const { mainHeader, twoPictureArray: iconExplainArray } = item;
            return (
              <div key={index}>
                <IconExplainContainer
                  mainHeader={mainHeader}
                  iconExplainArray={iconExplainArray}
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
                <MaximContainer {...item.twoPictureArray[0]} />
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

  return <div>{renderComponents()}</div>;
};

export default Page;
