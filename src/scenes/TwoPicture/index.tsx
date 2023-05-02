import React, { useEffect, useState } from "react";
import PictureContainer from "./PictureContainer";
import { ComponentType, ContainerType, PageOptions } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  createTwoPicture,
  resetTwoPictureArray,
} from "../../features/twoPicture/twoPictureSlice";

type TwoPictureType = {
  img: string;
  header: string;
  paragraphs: string[];
  buttons: string[];
};

const TwoPictureForm = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(PageOptions.Home);
  const [mainHeader, setMainHeader] = useState("");
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const [createContainer, setCreateContainer] = useState({} as ContainerType);
  const [componentName, setComponentName] =
    useState<keyof typeof ComponentType>();

  const renderPictureContainers = () => {
    let numContainers = 0;
    switch (componentName) {
      case ComponentType.PictureAtRight:
      case ComponentType.PictureAtLeft:
        numContainers = 1;
        break;
      case ComponentType.TwoPictureContainer:
        numContainers = 2;
        break;
      case ComponentType.IconExplainContainer:
        numContainers = 3;
        break;
      default:
        return null;
    }
    const containers = [];
    for (let i = 0; i < numContainers; i++) {
      containers.push(<PictureContainer key={i} />);
    }
    return containers;
  };
  const handleCreate = async () => {
    if (!page || !componentName) return;
    const newContainer = {
      page,
      componentName: ComponentType[componentName],
      mainHeader,
      twoPictureArray,
    };
    await dispatch(createTwoPicture(newContainer));
    setMainHeader("");
    setPage(PageOptions.Home);
    setComponentName(undefined);
    dispatch(resetTwoPictureArray());
  };

  return (
    <div className="w-5/6  mx-auto py-8">
      <div className="flex  flex-col gap-5 justify-center items-center h-full py-4 border-4 px-4">
        {/* Choose page*/}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="page">
            Page:
          </label>
          <select
            className="border-2 w-4/5 rounded-md"
            name="page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          >
            {Object.values(PageOptions).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* select component part */}
        <div className="w-full  flex gap-12">
          <p>Select component type:</p>
          <div className="flex gap-4">
            {Object.keys(ComponentType).map((key) => (
              <label key={key}>
                <input
                  type="radio"
                  name="componentType"
                  value={key}
                  onChange={(e) =>
                    setComponentName(
                      e.target.value as keyof typeof ComponentType
                    )
                  }
                />
                {key}
              </label>
            ))}
            <br />
          </div>
        </div>
        {/* MainHeader */}
        {(componentName === ComponentType.TwoPictureContainer ||
          componentName === ComponentType.IconExplainContainer) && (
          <div className="flex gap-5 w-full ">
            <label className="w-32" htmlFor="header">
              Main Header :
            </label>
            <input
              className="border-2 w-4/5 rounded-md"
              type="text"
              name="header"
              value={mainHeader}
              onChange={(e) => setMainHeader(e.target.value)}
            />
          </div>
        )}

        {/* picture containers */}
        {renderPictureContainers()}
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={handleCreate}
        >
          create
        </button>
      </div>
    </div>
  );
};

export default TwoPictureForm;
