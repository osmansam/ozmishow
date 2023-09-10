import React, { useState } from "react";
import AddExplanationItem from "./AddExplanationItem";
import { ExplanationBarType } from "../../shared/types";
import ContentModal from "../../hooks/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  updateExplanationBar,
  resetTwoPictureArray,
  deleteItemInContainer,
} from "../../features/twoPicture/twoPictureSlice";

import StyledModal from "../../hooks/StyledModal";
import { AiOutlineDown } from "react-icons/ai";
const ExplanationBar = ({
  mainMainHeader,
  explanationArray,
  id,
}: ExplanationBarType) => {
  const [isAddExplanationItem, setIsAddExplanationItem] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: {
      color: "",
      fontWeight: "",
      backgroundColor: "",
      padding: "",
      fontSize: "",
      fontFamily: "",
      hover: "",
      effectAll: true,
    },
  });

  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [barSelection, setBarSelection] = useState(0);
  const [hovered, setHovered] = useState(Number);
  const [contentType, setContentType] = useState("");
  const [mainHeaderId, setMainHeaderId] = useState("");
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
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
  // Function to open the modal and set the selected style data
  const openModal = (styleData: any) => {
    setSelectedStyle(styleData);
    setIsModalOpen(true);
  };
  const openContentModal = (content: any) => {
    setContentToEdit(content);
    setIsContentModalOpen(true);
  };

  const closeContentModal = () => {
    setContentToEdit("");
    setIsContentModalOpen(false);
  };

  const barHeight = explanationArray.length * 25 + 50;
  const barClassName = `lg:w-[270px] md:w-[270px] sm:w-full  w-full flex flex-col gap-4  justify-between mb-4  h-[${barHeight}px ] bg-[#f9f9f9] rounded-lg py-4 `;
  return (
    <div className="py-10 flex flex-col items-center">
      <h1
        className="text-3xl font-bold p-4 ml-4"
        style={mainMainHeader?.style ? mainMainHeader.style : {}}
      >
        {mainMainHeader?.content}
      </h1>
      <div className="w-5/6 mx-auto flex lg:flex-row flex-col items-center sm:items-start ">
        {/* Bar part */}
        <div className={barClassName}>
          <div className="w-max  gap-4 mx-auto justify-center items-center cursor-pointer">
            {explanationArray.map((explanation, index) => {
              const { mainHeader } = explanation;
              const explanationId = explanation._id;

              return (
                <div
                  className="flex flex-row my-4 justify-center items-center"
                  key={index}
                >
                  <li
                    className="  !w-full px-8 rounded-lg  list-none capitalize pointer  z-10  justify-center  items-center mx-auto  py-1  "
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
                  {!isModalOpen && isAdmin && (
                    <AiOutlineDown
                      className="text-lg justify-end"
                      onClick={() => {
                        openModal({
                          style: mainHeader?.style,
                          content: mainHeader?.content,
                        });
                        setContentType("mainHeader");
                        setMainHeaderId(explanationId ?? "");
                      }}
                    />
                  )}
                  {isModalOpen &&
                    contentType === "mainHeader" &&
                    mainHeaderId === explanationId && (
                      <StyledModal
                        key={explanationId}
                        isOpen={isModalOpen}
                        styleData={selectedStyle}
                        onClose={() => setIsModalOpen(false)}
                        type="explanationBar"
                        twoPictureId={id}
                        componentId={explanationId ? explanationId : ""}
                        contentType="mainHeader"
                        isContentSend={true}
                      />
                    )}
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
                <img
                  src={explanationArray[barSelection].img}
                  alt="explanationImage"
                  className="w-full lg:h-96 sm:h-60 object-fit "
                />
              )}
              <h2
                className="flex flex-row  w-fit px-4 py-2 gap-8 rounded-2xl text-2xl leading-7 font-[500] text-[#212529] capitalize "
                style={
                  explanationArray[barSelection].header?.style
                    ? explanationArray[barSelection].header?.style
                    : {}
                }
              >
                {explanationArray[barSelection].header?.content}
                {!isModalOpen && isAdmin && (
                  <AiOutlineDown
                    className="text-lg justify-end"
                    onClick={() => {
                      openModal({
                        style: explanationArray[barSelection].header?.style,
                        content: explanationArray[barSelection].header?.content,
                      });
                      setContentType("header");
                    }}
                  />
                )}
                {isModalOpen && contentType === "header" && (
                  <StyledModal
                    key={explanationArray[barSelection]._id}
                    isOpen={isModalOpen}
                    styleData={selectedStyle}
                    onClose={() => setIsModalOpen(false)}
                    type="explanationBar"
                    twoPictureId={id}
                    componentId={explanationArray[barSelection]._id ?? ""}
                    contentType="header"
                    isContentSend={true}
                  />
                )}
              </h2>
              {/* paragraphs */}
              <div className="flex flex-col gap-2 w-full  ">
                {explanationArray[barSelection].paragraphs?.content?.map(
                  (paragraph, index) => (
                    <div key={index}>
                      <p
                        className=" font-[400] leading-6 text-[#333333] rounded-lg px-4 py-1"
                        style={
                          explanationArray[barSelection].paragraphs?.style
                            ? explanationArray[barSelection].paragraphs?.style
                            : {}
                        }
                      >
                        {paragraph}
                      </p>
                    </div>
                  )
                )}

                {/* ContentModal for editing paragraphs */}
                {isContentModalOpen && (
                  <ContentModal
                    isOpen={isContentModalOpen}
                    content={contentToEdit}
                    onClose={closeContentModal}
                    componentId={explanationArray[barSelection]._id ?? ""}
                    type="explanationBar"
                    contentType="paragraphs"
                    twoPictureId={id}
                  />
                )}
                {/* editing part */}
                {isAdmin && (
                  <div className="flex flex-row justify-end gap-2 rounded-2xl py-2">
                    {!isModalOpen && (
                      <button
                        className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                        onClick={() => {
                          openModal({
                            style:
                              explanationArray[barSelection].paragraphs?.style,
                            content:
                              explanationArray[barSelection].paragraphs
                                ?.content,
                          });
                          setContentType("paragraphs");
                        }}
                      >
                        Style <AiOutlineDown className="my-auto" />
                      </button>
                    )}
                    {explanationArray[barSelection].paragraphs?.content && (
                      <button
                        onClick={() =>
                          openContentModal(
                            explanationArray[barSelection].paragraphs
                          )
                        }
                        className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                      >
                        Edit
                        <AiOutlineDown className="my-auto" />
                      </button>
                    )}
                    {isModalOpen && contentType === "paragraphs" && (
                      <StyledModal
                        key={explanationArray[barSelection]._id}
                        isOpen={isModalOpen}
                        styleData={selectedStyle}
                        onClose={() => setIsModalOpen(false)}
                        type="explanationBar"
                        twoPictureId={id}
                        componentId={explanationArray[barSelection]._id ?? ""}
                        contentType="paragraphs"
                        isContentSend={false}
                      />
                    )}
                  </div>
                )}
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
