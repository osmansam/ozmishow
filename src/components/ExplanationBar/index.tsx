import React, { useState } from "react";
import AddExplanationItem from "./AddExplanationItem";
import { ExplanationBarType } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  updateExplanationBar,
  resetTwoPictureArray,
  deleteItemInContainer,
} from "../../features/twoPicture/twoPictureSlice";

const ExplanationBar = ({
  mainMainHeader,
  explanationArray,
  id,
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
    window.location.reload();
  };

  const barHeight = explanationArray.length * 25 + 50;
  const barClassName = `lg:w-[270px] md:w-[270px] sm:w-full  w-full flex flex-col gap-4  justify-between mb-4  h-[${barHeight}px ] bg-[#f9f9f9] rounded-lg py-4 `;
  return (
    <div className="py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold p-4 ml-4 ">{mainMainHeader}</h1>
      <div className="w-5/6 mx-auto flex lg:flex-row flex-col items-center sm:items-start ">
        {/* Bar part */}
        <div className={barClassName}>
          {explanationArray.map((explanation, index) => {
            const { mainHeader } = explanation;
            const listClassName = `list-none capitalize pointer  z-10 items-center mx-auto px-4 py-1  ${
              (index === barSelection || index === hovered) && "text-[#e1241b] "
            }`;
            return (
              <div
                className="flex justify-center items-center cursor-pointer"
                key={index}
              >
                <li
                  className={listClassName}
                  onClick={() => setBarSelection(index)}
                  onMouseOver={() => setHovered(index)}
                  onMouseLeave={() => setHovered(barSelection)}
                >
                  {mainHeader}
                </li>
              </div>
            );
          })}
        </div>
        {/* next to bar  */}
        <div className="flex mx-auto flex-col gap-4 px-4 w-full lg:w-2/3">
          {explanationArray[barSelection] && (
            <>
              {explanationArray[barSelection].img && (
                <img
                  src={explanationArray[barSelection].img}
                  alt="explanationImage"
                  className="w-full lg:h-96 sm:h-60 object-fit "
                />
              )}
              <h2 className="text-2xl leading-7 font-[500] text-[#212529] capitalize p-2">
                {explanationArray[barSelection].header}
              </h2>
              {explanationArray[barSelection].paragraphs?.map(
                (paragraph, index) => (
                  <p
                    key={index}
                    className=" font-[400] leading-6"
                    style={{ color: "#333333" }}
                  >
                    {paragraph}
                  </p>
                )
              )}
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
                      window.location.reload();
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
