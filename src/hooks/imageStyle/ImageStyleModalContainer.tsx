import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ImageStyleModal from "./ImageStyleModal";
import { AiOutlineDown } from "react-icons/ai";
import { imageStyle } from "../../shared/types";

interface StyledModalProps {
  styleData: any;
  twoPictureId: string;
  componentId: string;
  type: string;
  isContentSend?: boolean;
}

const ImageStyleModalContainer = ({
  styleData,
  twoPictureId,
  type,
  componentId,
}: StyledModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: imageStyle,
  });

  const openModal = (styleData: any) => {
    setSelectedStyle(styleData);
    setIsModalOpen(true);
  };
  return (
    <div>
      {!isModalOpen && isAdmin && (
        <div
          className="flex flex-row gap-1  bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 items-center cursor-pointer"
          onClick={() => {
            openModal({
              style: styleData?.style,
              content: styleData?.content,
            });
          }}
        >
          <h2>Image Style</h2>
          <AiOutlineDown className="text-lg justify-end" />
        </div>
      )}
      {isModalOpen && (
        <ImageStyleModal
          key={twoPictureId}
          isOpen={isModalOpen}
          styleData={selectedStyle}
          onClose={() => setIsModalOpen(false)}
          twoPictureId={twoPictureId}
          componentId={componentId ?? ""}
          type={type ?? ""}
        />
      )}
    </div>
  );
};

export default ImageStyleModalContainer;
