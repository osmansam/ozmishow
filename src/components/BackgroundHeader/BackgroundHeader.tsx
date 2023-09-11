import React, { useEffect, useState } from "react";
import { PictureType, PictureWithStyleType } from "../../shared/types";
import StyledModal from "../../hooks/StyledModal";
import ContentModal from "../../hooks/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";

const BackgroundHeader = ({
  header,
  mainMainHeader,
  _id,
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
    <div className=" flex items-center justify-center w-full pt-12  ">
      <div className="w-full flex items-center justify-center relative ">
        <div className="z-10 flex ">
          <div>
            <h1 className="font-semibold text-2xl  md:text-4xl sfont-[Poppins,sans-serif] text-gray-800 capitalize leading-[54px] ">
              {mainMainHeader}
            </h1>
            <div className="w-24 h-[3px] bg-[#fd7e13]  mx-auto"></div>
          </div>
        </div>

        <h2
          className="absolute font-[600] font-[Poppins,sans-serif] text-5xl md:text-8xl lg:text-[132px] leading-[54px] text-[#dee3e4] uppercase w-full text-center opacity-40 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-2xl px-4 py-0.5 flex flex-row gap-2 justify-center items-center"
          style={header?.style ? header?.style : {}}
        >
          {header?.content}
          {!isModalOpen && isAdmin && (
            <AiOutlineDown
              className="text-3xl justify-end my-auto text-black"
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
        </h2>
      </div>
    </div>
  );
};

export default BackgroundHeader;
