import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import StyledModal from "./StyledModal";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";

interface StyledModalProps {
  styleData: any;
  twoPictureId: string;
  componentId: string;
  contentContainerType: string;
  isContentSend?: boolean;
  type?: string;
}

const StyleModalContainer = ({
  styleData,
  twoPictureId,
  componentId,
  contentContainerType,
  isContentSend,
  type,
}: StyledModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [contentType, setContentType] = useState("");
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: style,
  });

  const openModal = (styleData: any) => {
    setSelectedStyle(styleData);
    setIsModalOpen(true);
  };
  return (
    <div>
      {!isModalOpen && isAdmin && (
        <AiOutlineDown
          className="text-lg justify-end"
          onClick={() => {
            openModal({
              style: styleData?.style,
              content: styleData?.content,
            });
            setContentType(contentContainerType);
          }}
        />
      )}
      {isModalOpen && contentType === contentContainerType && (
        <StyledModal
          key={twoPictureId}
          isOpen={isModalOpen}
          styleData={selectedStyle}
          onClose={() => setIsModalOpen(false)}
          type={type}
          twoPictureId={twoPictureId}
          componentId={componentId ?? ""}
          contentType={contentContainerType}
          isContentSend={isContentSend}
        />
      )}
    </div>
  );
};

export default StyleModalContainer;
