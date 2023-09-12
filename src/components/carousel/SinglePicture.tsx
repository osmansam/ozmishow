import React, { useEffect, useState } from "react";
import { PictureType, PictureWithStyleType } from "../../shared/types";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/contentModal/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";

const SinglePicture = ({
  header,
  paragraphs,
  img,
  _id,
  index,
}: PictureWithStyleType) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [contentType, setContentType] = useState("");
  const [modalId, setModalId] = useState("");
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: style,
  });

  const openModal = (styleData: any, idModal: string) => {
    setSelectedStyle(styleData);
    setIsModalOpen(true);
    setModalId(idModal);
  };
  const openContentModal = (
    content: any,
    contentType: string,
    idModal: string
  ) => {
    setContentToEdit(content);
    setModalId(idModal);
    setIsContentModalOpen(true);
  };
  return (
    <li className="relative mx-5 inline-block h-[380px] w-[450px] ">
      <div
        className="p-5 absolute  flex
  h-[380px]  w-[450px] z-30 flex-col items-center justify-center
  whitespace-normal bg-[#FF6B66] text-center text-white
  opacity-0 transition duration-500 hover:opacity-90"
      >
        <p
          className="text-2xl flex flex-row gap-4 rounded-2xl px-4"
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
                  index?.toString() ?? ""
                );
                setContentType("header");
              }}
            />
          )}
          {isModalOpen &&
            contentType === "header" &&
            modalId === index?.toString() && (
              <StyledModal
                key={_id}
                isOpen={isModalOpen}
                styleData={selectedStyle}
                onClose={() => setIsModalOpen(false)}
                type="twoPictureIndex"
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentType="header"
                isContentSend={true}
              />
            )}
        </p>
        <div className="flex flex-col gap-2 w-full  py-1  l  ">
          {paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className=" font-[400] leading-6 rounded-2xl"
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
                  openModal(
                    {
                      style: paragraphs?.style,
                      content: paragraphs?.content,
                    },
                    index?.toString() ?? ""
                  );
                  setContentType("paragraphs");
                }}
              >
                Paragraph Style <AiOutlineDown className="my-auto" />
              </button>
            )}
            {paragraphs?.content && (
              <button
                onClick={() =>
                  openContentModal(
                    paragraphs,
                    "paragraphs",
                    index?.toString() ?? ""
                  )
                }
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
      </div>
      <img
        alt="carousel img"
        src={img}
        className="object-cover h-full w-full "
      />
    </li>
  );
};

export default SinglePicture;
