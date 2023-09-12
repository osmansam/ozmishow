import React, { useEffect, useState } from "react";
import { TwoPictureContainerType } from "../../shared/types";
import TwoPicture from "./TwoPicture";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/contentModal/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";
const TwoPictureContainer = ({
  mainHeader,
  twoPictureArray,
  id,
}: TwoPictureContainerType) => {
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
    <div className="w-5/6 h-full mx-auto py-10 ">
      <h1
        className="font-[700] text-4xl leading-[44px] mb-2 text-[#333333] w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5"
        style={mainHeader?.style}
      >
        {mainHeader?.content}
        {!isModalOpen && isAdmin && (
          <AiOutlineDown
            className="text-lg justify-end my-auto"
            onClick={() => {
              openModal({
                style: mainHeader?.style,
                content: mainHeader?.content,
              });
              setContentType("mainMainHeader");
            }}
          />
        )}
        {isModalOpen && contentType === "mainMainHeader" && (
          <StyledModal
            key={id}
            isOpen={isModalOpen}
            styleData={selectedStyle}
            onClose={() => setIsModalOpen(false)}
            type="mainMainHeader"
            twoPictureId={id ?? ""}
            componentId={""}
            contentType="mainMainHeader"
            isContentSend={true}
          />
        )}
      </h1>
      <div className="w-full h-full md:flex md:justify-between mx-auto">
        {twoPictureArray.map((twoPicture, index) => {
          const { img, header, paragraphs, buttons } = twoPicture;
          return (
            <TwoPicture
              _id={id}
              index={index}
              key={index}
              img={img}
              header={header}
              paragraphs={paragraphs}
              buttons={buttons}
            ></TwoPicture>
          );
        })}
      </div>
    </div>
  );
};

export default TwoPictureContainer;
