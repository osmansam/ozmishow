import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { getPageTwoPictures } from "../../features/twoPicture/twoPictureSlice";
import { PageOptions } from "../../shared/types";
import PictureAtLeft from "../../components/PictureAtLeft";
import PictureAtRight from "../../components/PictureAtRight";
import IconExplainContainer from "../../components/IconExplainContainer";
import TwoPictureContainer from "../../components/TwoPictureContainer";

interface Props {
  page: string;
}

const Page = ({ page }: Props) => {
  const dispatch = useAppDispatch();

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

  const renderComponents = () => {
    // Sort the items in the container array based on the position property
    // const sortedContainer = container?.sort((a, b) => a.position - b.position);
    // Map the sorted container array and render the components
    return container?.map((item, index) => {
      switch (item.componentName) {
        case "PictureAtRight":
          return <PictureAtRight key={index} {...item.twoPictureArray[0]} />;
        case "PictureAtLeft":
          return <PictureAtLeft key={index} {...item.twoPictureArray[0]} />;
        case "TwoPictureContainer":
          return (
            <TwoPictureContainer
              key={index}
              mainHeader={item.mainHeader}
              twoPictureArray={item.twoPictureArray}
            />
          );
        case "IconExplainContainer":
          const { mainHeader, twoPictureArray: iconExplainArray } = item;
          return (
            <IconExplainContainer
              key={index}
              mainHeader={mainHeader}
              iconExplainArray={iconExplainArray}
            />
          );
        default:
          return null;
      }
    });
  };

  return <div>{renderComponents()}</div>;
};

export default Page;
