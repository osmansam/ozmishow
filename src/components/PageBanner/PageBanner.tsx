import React, { useEffect, useState } from "react";
import { PictureType, PictureWithStyleType } from "../../shared/types";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/contentModal/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";

type Props = {};

const PageBanner = ({ img, header, _id }: PictureWithStyleType) => {
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
    <div className="relative w-full pt-10 mb-10">
      {/* image */}
      <img src={img} alt="pageImage" className="w-full h-72 object-cover" />
      {/* Description */}
      <div className="absolute bottom-[-20px] left-20  bg-[#9f000f] text-white">
        <h2
          className="text-xl uppercase px-4 py-2 font-[700] flex flex-row gap-2"
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
        </h2>
      </div>
    </div>
  );
};

export default PageBanner;
