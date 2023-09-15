import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PageStyleModal from "./PageStyleModal";
import { PageStyleType } from "../../shared/types";
import { AiOutlineDown } from "react-icons/ai";

interface PageStyleModalProps {
  isOpen: boolean;
  styleData: PageStyleType;
  onClose: () => void;
  pageOptionsId: string;
}

const PageStyleModalContainer = ({
  isOpen,
  styleData,
  onClose,
  pageOptionsId,
}: PageStyleModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      {!isModalOpen && isAdmin && (
        <AiOutlineDown className="text-lg justify-end" onClick={openModal} />
      )}
      {isModalOpen && (
        <PageStyleModal
          key={pageOptionsId}
          isOpen={isModalOpen}
          styleData={styleData}
          onClose={() => setIsModalOpen(false)}
          pageOptionsId={pageOptionsId}
        />
      )}
    </div>
  );
};

export default PageStyleModalContainer;
