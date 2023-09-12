import React, { useEffect, useState } from "react";
import { FullPageItemType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/contentModal/ContentModal";
import { style } from "../../shared/types";
import { useSelector } from "react-redux";
import {
  updateContainer,
  resetTwoPictureArray,
} from "../../features/twoPicture/twoPictureSlice";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
type Props = {};

const FullPageItem = ({
  mainMainHeader,
  fullPageItemArray,
  id,
}: FullPageItemType) => {
  const dispatch = useAppDispatch();
  const [isAddNewItem, setIsAddNewItem] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [contentType, setContentType] = useState("");
  const [contentModalContentType, setContentModalContentType] = useState("");
  const [modalId, setModalId] = useState("");
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: style,
  });

  const openModal = (styleData: any, idModal: string) => {
    setSelectedStyle(styleData);
    setModalId(idModal);
    setIsModalOpen(true);
  };
  const openContentModal = (
    content: any,
    contentType: string,
    idModal: string
  ) => {
    setContentToEdit(content);
    setContentModalContentType(contentType);
    setModalId(idModal);

    setIsContentModalOpen(true);
  };

  const handleCreate = async () => {
    console.log("twoPictureArray", twoPictureArray);
    dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  return (
    <div className="w-5/6 lg:w-4/5  mx-auto my-auto h-full py-10">
      <h1
        className="font-[700] text-4xl leading-[44px] pb-4"
        style={{ color: "#333333" }}
      >
        {mainMainHeader?.content}
      </h1>
      {fullPageItemArray.map((fullPageItem, index) => {
        const { header, paragraphs, buttons, img, _id } = fullPageItem;
        return (
          <div key={index} className="w-full">
            {img && (
              <img
                src={img}
                alt={header?.content}
                className="w-full md:w-5/6 mx-auto lg:h-80 sm:h-60"
              />
            )}
            <h1
              className="w-fit px-4 py-1 gap-8 rounded-2xl font-[700] text-lg  text-[#333333] flex flex-row mt-2"
              style={header?.style ? header?.style : {}}
            >
              {header?.content}
              {!isModalOpen && isAdmin && (
                <AiOutlineDown
                  className="text-lg justify-end my-auto"
                  onClick={() => {
                    openModal(
                      {
                        style: header?.style,
                        content: header?.content,
                      },
                      index.toString()
                    );
                    setContentType("header");
                  }}
                />
              )}
              {isModalOpen &&
                contentType === "header" &&
                modalId === index.toString() && (
                  <StyledModal
                    key={id}
                    isOpen={isModalOpen}
                    styleData={selectedStyle}
                    onClose={() => setIsModalOpen(false)}
                    type="twoPictureIndex"
                    twoPictureId={id ?? ""}
                    componentId={index.toString()}
                    contentType="header"
                    isContentSend={true}
                  />
                )}
            </h1>
            <div
              className="flex flex-col gap-2 w-full rounded-lg py-2"
              style={paragraphs?.style ? paragraphs?.style : {}}
            >
              {paragraphs?.content?.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-normal leading-6 "
                  style={{ color: "#333333" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {isContentModalOpen && modalId === index.toString() && (
              <ContentModal
                isOpen={isContentModalOpen}
                content={contentToEdit}
                onClose={() => setIsContentModalOpen(false)}
                componentId={index.toString()}
                type="twoPictureIndex"
                contentType="paragraphs"
                twoPictureId={id ?? ""}
              />
            )}
            {/* editing part */}
            {isAdmin && (
              <div className="flex flex-row justify-start gap-2 rounded-2xl py-2">
                {!isModalOpen && (
                  <button
                    className="flex flex-row gap-1 bg-blue-500 text-white px-2 rounded-2xl hover:bg-blue-700 mr-2"
                    onClick={() => {
                      openModal(
                        {
                          style: paragraphs?.style,
                          content: paragraphs?.content,
                        },
                        index.toString()
                      );
                      setContentType("paragraphs");
                    }}
                  >
                    Style <AiOutlineDown className="my-auto" />
                  </button>
                )}
                {paragraphs?.content && (
                  <button
                    onClick={() =>
                      openContentModal(
                        paragraphs,
                        "paragraphs",
                        index.toString()
                      )
                    }
                    className="flex flex-row gap-1 bg-blue-500 text-white px-2 rounded-2xl hover:bg-blue-700 mr-2"
                  >
                    Edit <AiOutlineDown className="my-auto" />
                  </button>
                )}
                {isModalOpen &&
                  contentType === "paragraphs" &&
                  modalId === index.toString() && (
                    <StyledModal
                      isOpen={isModalOpen}
                      styleData={selectedStyle}
                      onClose={() => setIsModalOpen(false)}
                      type="twoPictureIndex"
                      twoPictureId={id ?? ""}
                      componentId={index.toString()}
                      contentType="paragraphs"
                      isContentSend={false}
                    />
                  )}
              </div>
            )}
          </div>
        );
      })}
      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New Item
        </button>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={false}
            isPictureContainerButton={true}
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

export default FullPageItem;
