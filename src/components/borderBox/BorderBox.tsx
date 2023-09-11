import React, { useEffect, useState } from "react";
import StyledModal from "../../hooks/StyledModal";
import ContentModal from "../../hooks/ContentModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { PictureType, PictureWithStyleType } from "../../shared/types";

const BorderBox = ({ img, header, _id, index }: PictureWithStyleType) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = React.useState(false);

  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [contentType, setContentType] = useState("");
  const [contentModalContentType, setContentModalContentType] = useState("");
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
    setContentModalContentType(contentType);
    setModalId(idModal);
    setIsContentModalOpen(true);
  };
  return (
    <motion.div
      className="w-5/6  h-52 flex  gap-12 mx-auto items-center p-8 border-2 bg-white"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img src={img} alt={header?.content} className="w-40 h-40 " />
      <div className="w-full flex justify-between ">
        <h1
          className="font-[700] text-2xl leading-8 flex flex-row gap-4"
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
          {isModalOpen && contentType === "header" && (
            <StyledModal
              key={_id}
              isOpen={isModalOpen}
              styleData={selectedStyle}
              onClose={() => setIsModalOpen(false)}
              type="twoPictureIndex"
              twoPictureId={_id ?? ""}
              componentId={modalId ?? ""}
              contentType="header"
              isContentSend={true}
            />
          )}
        </h1>
        <div>
          <BsArrowRight
            className={`text-2xl justify-end ${
              isHovered ? "translate-x-4 transition duration-300 ease-out" : ""
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BorderBox;
