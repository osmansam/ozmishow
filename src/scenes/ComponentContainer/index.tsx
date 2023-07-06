import React, { useEffect, useState } from "react";
import PictureContainer from "./PictureContainer";
import { Components, LanguageOptions } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  createTwoPicture,
  resetTwoPictureArray,
  getPageTwoPictures,
  createNavbar,
} from "../../features/twoPicture/twoPictureSlice";
import AddNewPage from "../../components/addNewPage/AddNewPage";
import { setIsAdmin, setLanguage } from "../../features/context/contextSlice";
import Deneme from "../deneme";
import { useNavigate } from "react-router-dom";
const ComponentContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState<string>("Home");
  const [mainHeader, setMainHeader] = useState("");
  const [isMainHeader, setIsMainHeader] = useState(false);
  const [position, setPosition] = useState(0);
  const [numContainers, setNumContainers] = useState(0);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { isAdmin, language } = useSelector(
    (state: RootState) => state.context
  );
  const { user } = useSelector((state: RootState) => state.user);
  const [componentName, setComponentName] = useState<keyof typeof Components>();
  const { container, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );

  //Set the number of picture containers according to the component type
  //set the isMainHeader according to the component type
  useEffect(() => {
    if (componentName != null) {
      setNumContainers(Components[componentName].pictureContainerNumber);
      setIsMainHeader(Components[componentName].isMainHeader);
    }
  }, [componentName]);
  //Render picture containers according to the number of containers
  const renderPictureContainers = (numContainers: number) => {
    const containers = [];
    for (let i = 0; i < numContainers; i++) {
      if (componentName != null) {
        containers.push(
          <PictureContainer
            isPictureContainerImage={
              Components[componentName].isPictureContainerImage
            }
            isPictureContainerButton={
              Components[componentName].isPictureContainerButton
            }
            isPictureContainerParagraph={
              Components[componentName].isPictureContainerParagraph
            }
            key={i}
          />
        );
      }
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
    setPage("");
    setComponentName(undefined);
    setIsMainHeader(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  // for each component arrange the  items to send backend
  const handleCreate = async () => {
    switch (componentName) {
      // case PictureAtRight and PictureAtLeft
      case Components.PictureAtRight.name:
      case Components.PictureAtLeft.name:
        if (twoPictureArray.length !== 1) return;
        await dispatch(
          createTwoPicture({
            page,
            componentName: componentName,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      // case TwoPictureContainer
      case Components.TwoPictureContainer.name:
        if (twoPictureArray.length !== 2) return;
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      // case IconExplainContainer
      case Components.IconExplainContainer.name:
        if (twoPictureArray.length !== 3) return;
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      //case BorderBoxContainer
      case Components.BorderBoxContainer.name:
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      case Components.NewsContainer.name:
      case Components.NewsContainer2.name:
      case Components.FullPageItem.name:
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      case Components.ExplanationBar.name:
      case Components.Slider.name:
      case Components.Carousel.name:
      case Components.YoutubeVideo.name:
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      case Components.FrequentlyAskedQuestions.name:
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      case Components.WorkTeamBar.name:
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            mainHeader,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      case Components.Navbar.name:
        await dispatch(
          createNavbar(
            twoPictureArray ? (twoPictureArray[0].img as string) : ""
          )
        );

        resetInputs();
        break;
      case Components.ContactFormEn.name:
      case Components.ContactFormTr.name:
      case Components.Map.name:
      case Components.PageBanner.name:
      case Components.MaximContainer.name:
      case Components.ContactContainer.name:
        await dispatch(
          createTwoPicture({
            page,
            componentName,
            twoPictureArray,
            position,
            language,
          })
        );
        resetInputs();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (user && !(user.role === "admin" || user.role === "superAdmin")) {
      navigate("/login");
    }
  }, [dispatch, page, user]);
  return (
    <div className="w-5/6  mx-auto py-8">
      {/* isAdmin  */}
      <div className="w-full flex justify-end mb-2">
        <button
          className="border-2 rounded-md p-2 "
          onClick={() => {
            dispatch(setIsAdmin(!isAdmin));
          }}
        >
          {isAdmin ? "Admin" : "User"}
        </button>
      </div>
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
            {pageOptions.map((option, index) => (
              <option key={index} value={option.pageNameEN}>
                {option.pageNameEN}
              </option>
            ))}
          </select>
        </div>
        {/* Choose Language*/}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="page">
            language:
          </label>
          <select
            className="border-2 w-4/5 rounded-md"
            name="page"
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
          >
            {Object.values(LanguageOptions).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* select component part */}
        <div className="w-full  flex gap-12">
          <p>Select component type:</p>
          <div className="w-full flex flex-wrap gap-6">
            {Object.values(Components).map((component) => (
              <label key={component.name}>
                <input
                  type="radio"
                  name="Components"
                  value={component.name}
                  onChange={(e) =>
                    setComponentName(e.target.value as keyof typeof Components)
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
              {componentName === "YoutubeVideo" ? "embedId" : "Main Header"}
            </label>
            <input
              className="border-2 w-4/5 rounded-md  capitalize"
              type="text"
              name="header"
              value={mainHeader}
              onChange={(e) => setMainHeader(e.target.value)}
            />
          </div>
        )}
        {/* newPage navbar */}
        {componentName === "NewPage" && <AddNewPage />}
        {/* picture containers */}
        {renderPictureContainers(numContainers)}
        {/* create button */}
        {componentName !== "NewPage" && (
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={handleCreate}
            disabled={page === "" || language === ""}
          >
            create
          </button>
        )}
      </div>
      <Deneme />
    </div>
  );
};

export default ComponentContainer;
