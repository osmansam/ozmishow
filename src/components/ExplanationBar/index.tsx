import React, { useState } from "react";
import AddExplanationItem from "./AddExplanationItem";
import { ExplanationBarType } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import {
  updateExplanationBar,
  resetTwoPictureArray,
  deleteItemInContainer,
  getPageTwoPictures,
} from "../../features/twoPicture/twoPictureSlice";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";

const ExplanationBar = ({
  mainMainHeader,
  explanationArray,
  componentStyle,
  id,
  page,
}: ExplanationBarType) => {
  const [isAddExplanationItem, setIsAddExplanationItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [barSelection, setBarSelection] = useState(0);
  const [hovered, setHovered] = useState(Number);

  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();

  //handle create new explanation item
  const handleCreate = async () => {
    await dispatch(updateExplanationBar({ container: twoPictureArray, id }));
    setIsAddExplanationItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  const barHeight = explanationArray.length * 25 + 50;
  const barClassName = `lg:w-[270px] md:w-[270px] sm:w-full  w-full flex flex-col gap-4  justify-between mb-4  h-[${barHeight}px ] bg-[#f9f9f9] rounded-lg py-4 `;
  return (
    <div className="py-10 flex flex-col items-center" style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          // buraya componentTYpe gelecek
          currentType="type1"
          isComponentType={false}
        />
      </div>
      <div className="w-5/6 mx-auto mb-4">
        <h1
          className="text-3xl font-bold  ml-4 w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
          style={mainMainHeader?.style}
        >
          {mainMainHeader?.content}
          <StyleModalContainer
            styleData={mainMainHeader}
            twoPictureId={id ?? ""}
            componentId={""}
            contentContainerType="mainHeader"
            isContentSend={true}
            type="mainMainHeader"
          />
        </h1>
      </div>

      <div className="w-5/6 mx-auto flex lg:flex-row flex-col items-center sm:items-start ">
        {/* Bar part */}
        <div className={barClassName}>
          <div className="w-max flex flex-col  gap-4 mx-auto justify-center items-center cursor-pointer">
            {explanationArray.map((explanation, index) => {
              const { mainHeader } = explanation;
              const explanationId = explanation._id;

              return (
                <div
                  className="w-full flex flex-row  justify-center items-center"
                  key={index}
                >
                  <li
                    className="  !w-full px-8 rounded-lg  list-none capitalize pointer  z-10  flex justify-center  items-center mx-auto  py-1  "
                    style={
                      mainHeader?.style
                        ? {
                            ...mainHeader.style,
                            color:
                              index === barSelection
                                ? mainHeader.style.hover
                                  ? mainHeader.style.hover
                                  : "#e1241b"
                                : index === hovered
                                ? mainHeader.style.hover
                                  ? mainHeader.style.hover
                                  : mainHeader.style.color
                                : mainHeader.style.color,
                          }
                        : {}
                    }
                    onClick={() => setBarSelection(index)}
                    onMouseOver={() => setHovered(index)}
                    onMouseLeave={() => setHovered(barSelection)}
                  >
                    {mainHeader?.content}
                  </li>
                  <StyleModalContainer
                    styleData={mainHeader}
                    twoPictureId={id}
                    componentId={explanationId ? explanationId : ""}
                    contentContainerType="mainHeader"
                    isContentSend={true}
                    type="explanationBar"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* next to bar  */}
        <div className="flex mx-auto flex-col gap-4 px-4 w-full lg:w-2/3">
          {explanationArray[barSelection] && (
            <>
              {explanationArray[barSelection].img && (
                <div className="flex flex-col justify-center items-center gap-4">
                  {explanationArray[barSelection].img?.content && (
                    <img
                      src={explanationArray[barSelection].img?.content}
                      alt="explanationImage"
                      className="w-full lg:h-96 sm:h-60 object-fit "
                      style={explanationArray[barSelection].img?.style}
                    />
                  )}

                  <ImageStyleModalContainer
                    twoPictureId={id ?? ""}
                    componentId={explanationArray[barSelection]._id ?? ""}
                    type="explanationBar"
                    styleData={explanationArray[barSelection].img}
                  />
                </div>
              )}
              <h2
                className="flex flex-row  w-fit px-4 pb-2 gap-8 rounded-2xl text-2xl leading-7 font-[500] text-[#212529] capitalize "
                style={explanationArray[barSelection].header?.style}
              >
                {explanationArray[barSelection].header?.content}
                <StyleModalContainer
                  styleData={explanationArray[barSelection].header}
                  twoPictureId={id}
                  componentId={explanationArray[barSelection]._id ?? ""}
                  contentContainerType="header"
                  isContentSend={true}
                  type="explanationBar"
                />
              </h2>
              {/* paragraphs */}
              <div className="flex flex-col gap-2 w-full  ">
                {explanationArray[barSelection].paragraphs?.content?.map(
                  (paragraph, index) => (
                    <div key={index}>
                      <p
                        className=" font-[400] leading-6 text-[#333333] rounded-lg px-4 py-1"
                        style={explanationArray[barSelection].paragraphs?.style}
                      >
                        {paragraph}
                      </p>
                    </div>
                  )
                )}
                <ContentModalContainer
                  content={explanationArray[barSelection].paragraphs}
                  twoPictureId={id}
                  componentId={explanationArray[barSelection]._id ?? ""}
                  contentContainerType="paragraphs"
                  type="explanationBar"
                />
              </div>
              {isAdmin && (
                <button
                  className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
                  onClick={async () => {
                    try {
                      await dispatch(
                        deleteItemInContainer({
                          id,
                          itemId: explanationArray[barSelection]?._id ?? "",
                        })
                      );
                      setBarSelection(0);
                      dispatch(getPageTwoPictures(page ?? ""));
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {/* Button to add new item */}
      {!isAddExplanationItem && isAdmin && (
        <button
          className="capitalize border-2  cursor-pointer w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddExplanationItem(true)}
        >
          Add New item
        </button>
      )}
      {isAddExplanationItem && isAdmin && (
        <div className="w-full mx-auto">
          <AddExplanationItem
            isPictureContainerImage={true}
            isPictureContainerButton={false}
            isPictureContainerParagraph={true}
          />
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplanationBar;
