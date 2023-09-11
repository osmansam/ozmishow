import React, { useEffect, useState } from "react";
import { PictureType, PictureWithStyleType } from "../../shared/types";
import StyledModal from "../../hooks/StyledModal";
import ContentModal from "../../hooks/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";

const Maxim = ({ header, paragraphs, _id }: PictureWithStyleType) => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
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
    <div
      className="w-full h-52  flex flex-col gap-10 justify-center items-center py-20"
      style={{ backgroundColor: "#f6f6f6" }}
    >
      {paragraphs?.content?.map((paragraph, index) => (
        <h1
          key={index}
          className="font-[550] text-lg leading-6 text-[#333333] "
          style={paragraphs?.style ? paragraphs?.style : {}}
        >
          {`“${paragraph}”`}
        </h1>
      ))}
      {/* ContentModal for editing paragraphs */}
      {isContentModalOpen && (
        <ContentModal
          isOpen={isContentModalOpen}
          content={contentToEdit}
          onClose={() => setIsContentModalOpen(false)}
          componentId={"0"}
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
              componentId={"0"}
              contentType="paragraphs"
              isContentSend={false}
            />
          )}
        </div>
      )}
      <p
        className="font-[400] leading-6 text-[#333333] flex flex-row gap-6"
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
            type="twoPictureIndex"
            twoPictureId={_id ?? ""}
            componentId={"0"}
            contentType="header"
            isContentSend={true}
          />
        )}
      </p>
    </div>
  );
};

export default Maxim;
