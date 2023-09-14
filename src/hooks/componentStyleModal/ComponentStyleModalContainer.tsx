import React, { useState } from "react";
import ComponentStyleModal from "./ComponentStyleModal";
import { AiOutlineDown } from "react-icons/ai";
import { ComponentStyleType } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
interface ComponentStyleModalProps {
  styleData: any;
  twoPictureId: string;
  componentTypes?: string[];
  currentType: string;

  isComponentType: boolean;
}

const ComponentStyleModalContainer = ({
  styleData,
  currentType,
  twoPictureId,
  componentTypes,
  isComponentType,
}: ComponentStyleModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedStyle, setSelectedStyle] = useState<ComponentStyleType>({
    backgroundColor: "",
    width: "",
  });

  const openModal = (styleData: ComponentStyleType) => {
    setSelectedStyle(styleData);
    setIsModalOpen(true);
  };

  return (
    <div>
      {!isModalOpen && isAdmin && (
        <div
          className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700"
          onClick={() => {
            openModal(styleData);
          }}
        >
          <h2>Component Style</h2>
          <AiOutlineDown className="text-lg justify-end my-auto" />
        </div>
      )}

      {isModalOpen && (
        <ComponentStyleModal
          key={twoPictureId}
          twoPictureId={twoPictureId}
          isOpen={isModalOpen}
          styleData={selectedStyle}
          componentTypes={componentTypes}
          currentType={currentType}
          onClose={() => setIsModalOpen(false)}
          isComponentType={isComponentType}
        />
      )}
    </div>
  );
};

export default ComponentStyleModalContainer;
