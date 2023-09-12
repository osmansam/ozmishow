import React, { useEffect, useState } from "react";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../shared/types";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";

const PictureAtRight = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
}: PictureWithStyleType) => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [contentType, setContentType] = useState("");
  const [contentModalContentType, setContentModalContentType] = useState("");

  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: style,
  });

  const openModal = (styleData: any) => {
    setSelectedStyle(styleData);
    setIsModalOpen(true);
  };

  const openContentModal = (content: any, contentType: string) => {
    setContentToEdit(content);
    setContentModalContentType(contentType);
    setIsContentModalOpen(true);
  };

  return (
    <div className="lg:flex w-4/5 lg:justify-between h-full mx-auto py-10">
      {/* left side */}
      <div className="basis-1/2">
        <div className="flex w-full lg:pl-28 gap-4 flex-col h-full md:pt-20">
          <h1
            className="w-fit px-4 py-1 gap-8 rounded-2xl font-[700] text-4xl flex flex-row"
            style={header?.style ? header?.style : {}}
          >
            {header?.content}
            {!isModalOpen && isAdmin && (
              <AiOutlineDown
                className="text-lg justify-end my-auto"
                onClick={() => {
                  openModal({
                    style: header?.style,
                    content: header?.content,
                  });
                  setContentType("header");
                }}
              />
            )}
            {isModalOpen && contentType === "header" && (
              <StyledModal
                key={_id}
                isOpen={isModalOpen}
                styleData={selectedStyle}
                onClose={() => setIsModalOpen(false)}
                type="twoPicture"
                twoPictureId={_id ?? ""}
                componentId={""}
                contentType="header"
                isContentSend={true}
              />
            )}
          </h1>
          {/* paragraphs */}
          <div className="flex flex-col gap-2 w-full rounded-lg py-1">
            {paragraphs?.content?.map((paragraph, index) => (
              <div key={index}>
                <p
                  className="font-[400] leading-6 text-[#333333] rounded-lg px-4 py-1"
                  style={paragraphs?.style ? paragraphs?.style : {}}
                >
                  {paragraph}
                </p>
              </div>
            ))}
            {/* ContentModal for editing paragraphs */}
            {isContentModalOpen && (
              <ContentModal
                isOpen={isContentModalOpen}
                content={contentToEdit}
                onClose={() => setIsContentModalOpen(false)}
                componentId={""}
                type="twoPicture"
                contentType="paragraphs"
                twoPictureId={_id ?? ""}
              />
            )}
          </div>
          {/* editing part */}
          {isAdmin && (
            <div className="flex flex-row justify-start gap-2 rounded-2xl py-2">
              {!isModalOpen && (
                <button
                  className="flex flex-row gap-1 bg-blue-500 text-white px-2 rounded-2xl hover:bg-blue-700 mr-2"
                  onClick={() => {
                    openModal({
                      style: paragraphs?.style,
                      content: paragraphs?.content,
                    });
                    setContentType("paragraphs");
                  }}
                >
                  Style <AiOutlineDown className="my-auto" />
                </button>
              )}
              {paragraphs?.content && (
                <button
                  onClick={() => openContentModal(paragraphs, "paragraphs")}
                  className="flex flex-row gap-1 bg-blue-500 text-white px-2 rounded-2xl hover:bg-blue-700 mr-2"
                >
                  Edit <AiOutlineDown className="my-auto" />
                </button>
              )}
              {isModalOpen && contentType === "paragraphs" && (
                <StyledModal
                  isOpen={isModalOpen}
                  styleData={selectedStyle}
                  onClose={() => setIsModalOpen(false)}
                  type="twoPicture"
                  twoPictureId={_id ?? ""}
                  componentId={""}
                  contentType="paragraphs"
                  isContentSend={false}
                />
              )}
            </div>
          )}
          {/* buttons */}
          <div className="w-full flex gap-8 flex-row">
            {buttons &&
              buttons.map((button, index) => (
                <div className="mt-4" key={index}>
                  <ButtonUnderline
                    text={button.buttonName}
                    buttonLink={button.buttonLink}
                    textColor="black"
                    underlineColorBefore="#e5e5e5"
                    underlineColorAfter="#414141"
                  ></ButtonUnderline>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* right side */}
      <img
        src={img}
        alt="img"
        className="w-full lg:basis-1/2 lg:h-[400px] sm:h-[250px] sm:py-5 md:py-0"
      />
    </div>
  );
};

export default PictureAtRight;
