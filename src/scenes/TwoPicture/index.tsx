import React, { useEffect, useState } from "react";
import PictureContainer from "./PictureContainer";
import { ComponentType, ContainerType, PageOptions } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  createTwoPicture,
  resetTwoPictureArray,
  getPageTwoPictures,
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
  const [isMainHeader, setIsMainHeader] = useState(false);
  const [position, setPosition] = useState(0);
  const [numContainers, setNumContainers] = useState(0);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const [createContainer, setCreateContainer] = useState({} as ContainerType);
  const [componentName, setComponentName] =
    useState<keyof typeof ComponentType>();
  const { container } = useSelector((state: RootState) => state.twoPicture);

  //Set the number of picture containers according to the component type
  //set the isMainHeader according to the component type
  useEffect(() => {
    if (componentName != null) {
      setNumContainers(ComponentType[componentName].pictureContainerNumber);
      setIsMainHeader(ComponentType[componentName].isMainHeader);
    }
  }, [componentName]);
  //Render picture containers according to the number of containers
  const renderPictureContainers = (numContainers: number) => {
    const containers = [];
    for (let i = 0; i < numContainers; i++) {
      containers.push(<PictureContainer key={i} />);
    }
    return containers;
  };
  //get the ComponentContainers from the page
  useEffect(() => {
    dispatch(getPageTwoPictures(page));
  }, [dispatch, page]);
  //set the position of the new component
  useEffect(() => {
    setPosition(container.length);
  }, [container]);

  //Reset the inputs after creating the component
  const resetInputs = () => {
    setMainHeader("");
    setPage("Home");
    setComponentName(undefined);
    setIsMainHeader(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };

  const handleCreate = async () => {
    switch (componentName) {
      // case PictureAtRight and PictureAtLeft
      case ComponentType.PictureAtRight.name:
      case ComponentType.PictureAtLeft.name:
        if (twoPictureArray.length !== 1) return;
        await dispatch(
          createTwoPicture({
            page,
            componentName: componentName,
            twoPictureArray,
            position,
          })
        );
        resetInputs();
        break;
      // case TwoPictureContainer
      case ComponentType.TwoPictureContainer.name:
        if (twoPictureArray.length !== 2) return;
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
          })
        );
        resetInputs();
        break;
      // case IconExplainContainer
      case ComponentType.IconExplainContainer.name:
        if (twoPictureArray.length !== 3) return;
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
          })
        );
        resetInputs();
        break;

        break;
      default:
        break;
    }
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
            {Object.values(ComponentType).map((component) => (
              <label key={component.name}>
                <input
                  type="radio"
                  name="componentType"
                  value={component.name}
                  onChange={(e) =>
                    setComponentName(
                      e.target.value as keyof typeof ComponentType
                    )
                  }
                />
                {component.name}
              </label>
            ))}
            <br />
          </div>
        </div>
        {/* MainHeader */}
        {isMainHeader && (
          <div className="flex gap-5 w-full ">
            <label className="w-32" htmlFor="header">
              Main Header:
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
        {renderPictureContainers(numContainers)}
        {/* create button */}
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
