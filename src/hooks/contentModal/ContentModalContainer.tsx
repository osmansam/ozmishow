import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";
import StyledModal from "../styledModal/StyledModal";
import { StyleType } from "../../shared/types";
import ContentModal from "./ContentModal";

interface ContentModalProps {
  content: any;
  twoPictureId: string;
  componentId: string;
  contentContainerType: string;
  type?: string;
}
const ContentModalContainer = ({
  content,
  twoPictureId,
  componentId,
  contentContainerType,
  type,
}: ContentModalProps) => {
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
    <div>
      {/* ContentModal for editing paragraphs */}
      {isContentModalOpen && (
        <ContentModal
          isOpen={isContentModalOpen}
          content={contentToEdit}
          onClose={() => setIsContentModalOpen(false)}
          componentId={componentId}
          type={type}
          contentType={contentContainerType}
          twoPictureId={twoPictureId}
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
                  style: content?.style,
                  content: content?.content,
                });
                setContentType(contentContainerType);
              }}
            >
              Paragraph Style <AiOutlineDown className="my-auto" />
            </button>
          )}
          {content?.content && (
            <button
              onClick={() => openContentModal(content, contentContainerType)}
              className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
            >
              Paragraph Edit
              <AiOutlineDown className="my-auto" />
            </button>
          )}
          {isModalOpen && contentType === contentContainerType && (
            <StyledModal
              isOpen={isModalOpen}
              styleData={selectedStyle}
              onClose={() => setIsModalOpen(false)}
              type={type}
              twoPictureId={twoPictureId}
              componentId={componentId}
              contentType={contentContainerType}
              isContentSend={false}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ContentModalContainer;
