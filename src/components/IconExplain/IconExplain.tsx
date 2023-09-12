import React, { useEffect, useState } from "react";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../shared/types";
import StyledModal from "../../hooks/styledModal/StyledModal";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ContentModal from "../../hooks/contentModal/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";

const IconExplain = ({
  _id,
  index,
  img,
  header,
  paragraphs,
  buttons,
}: PictureWithStyleType) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [contentType, setContentType] = useState("");
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
    setIsContentModalOpen(true);
  };
  return (
    <div className="flex flex-col gap-4 md:pr-6 w-full md:w-1/3 h-full mt-8">
      {img && <img src={img} alt={header?.content} className="w-full h-60" />}
      <h1
        className="text-lg font-[500] leading-6 mt-2 text-[#333333] flex flex-row gap-8 rounded-2xl px-4 py-0.5"
        style={header?.style ? header?.style : {}}
      >
        {header?.content}
        <StyleModalContainer
          styleData={header}
          twoPictureId={_id ?? ""}
          componentId={index?.toString() ?? ""}
          contentContainerType="header"
          isContentSend={true}
          type="twoPictureIndex"
        />
      </h1>
      <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
        {paragraphs?.content?.map((paragraph, index) => (
          <p
            key={index}
            className=" font-[400] leading-6 text-[#333333] rounded-2xl px-2"
            style={paragraphs?.style ? paragraphs?.style : {}}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {/* ContentModal for editing paragraphs */}
      {isContentModalOpen && (
        <ContentModal
          isOpen={isContentModalOpen}
          content={contentToEdit}
          onClose={() => setIsContentModalOpen(false)}
          componentId={index?.toString() ?? ""}
          type="twoPictureIndex"
          contentType="paragraphs"
          twoPictureId={_id ?? ""}
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
                  style: paragraphs?.style,
                  content: paragraphs?.content,
                });
                setContentType("paragraphs");
              }}
            >
              Paragraph Style <AiOutlineDown className="my-auto" />
            </button>
          )}
          {paragraphs?.content && (
            <button
              onClick={() => openContentModal(paragraphs, "paragraphs")}
              className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
            >
              Paragraph Edit
              <AiOutlineDown className="my-auto" />
            </button>
          )}
          {isModalOpen && contentType === "paragraphs" && (
            <StyledModal
              isOpen={isModalOpen}
              styleData={selectedStyle}
              onClose={() => setIsModalOpen(false)}
              type="twoPictureIndex"
              twoPictureId={_id ?? ""}
              componentId={index?.toString() ?? ""}
              contentType="paragraphs"
              isContentSend={false}
            />
          )}
        </div>
      )}
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
  );
};

export default IconExplain;
