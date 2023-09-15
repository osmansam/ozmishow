import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PageStyleModal from "./PageStyleModal";
import { PageStyleType } from "../../shared/types";
import { AiOutlineDown } from "react-icons/ai";

interface PageStyleModalProps {
  styleData: PageStyleType;
  pageOptionsId: string;
}

const PageStyleModalContainer = ({
  styleData,
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
        <div
          className="flex flex-row gap-1 my-10 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700"
          onClick={openModal}
        >
          <h2>Page Style</h2>
          <AiOutlineDown className="text-lg justify-end" />
        </div>
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
