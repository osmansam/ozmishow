import React, { useEffect, useState, ReactElement } from "react";
import { PictureWithStyleType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/ContentModal";
import { style } from "../../shared/types";
import { AiOutlineDown } from "react-icons/ai";
import { BsFillPaletteFill } from "react-icons/bs";
import { MdDesignServices } from "react-icons/md";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPaintBrush } from "react-icons/fa";
import { AiOutlineAreaChart } from "react-icons/ai";
import { AiTwotoneSound } from "react-icons/ai";

const ResumeIcon = ({
  header,
  paragraph,
  icon,
  _id,
  index,
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
  const handleIcon = (icon: string): ReactElement => {
    switch (icon) {
      case "BsFillPaletteFill":
        return <BsFillPaletteFill />;
      case "MdDesignServices":
        return <MdDesignServices />;
      case "HiDesktopComputer":
        return <HiDesktopComputer />;
      case "FaPaintBrush":
        return <FaPaintBrush />;
      case "AiOutlineAreaChart":
        return <AiOutlineAreaChart />;
      case "AiTwotoneSound":
        return <AiTwotoneSound />;
      default:
        return <BsFillPaletteFill />;
    }
  };
  const newIcon = handleIcon(icon ?? "");

  return (
    <div className="flex flex-row gap-4 w-full  md:w-1/2 py-4 px-3 ">
      {/* icon */}
      <div className="h-16 w-16 text-[30px] flex items-center justify-center text-[#fd7e14] bg-white shadow-lg rounded-lg py-2 px-4 font-[Poppins,sans-serif] flex-shrink-0">
        <div style={{ width: "30px", height: "30px" }}>{newIcon}</div>
      </div>
      {/* header and explanation */}
      <div className="flex flex-col gap-2">
        <h1
          className=" font-[500] text-xl leading-[29px] text-[#212529] rounded-2xl px-4 py-0.5 w-fit flex flex-row gap-2"
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
              type="resumeBox"
              twoPictureId={_id ?? ""}
              componentId={index?.toString() ?? ""}
              contentType="header"
              isContentSend={true}
            />
          )}
        </h1>
        <p
          className="font-[400] text-lg  font-[Poppins,sans-serif] text-[#4c4d4d]  leading-[29px] rounded-lg px-2 "
          style={paragraph?.style ?? {}}
        >
          {paragraph?.content}
        </p>
        {/* ContentModal for editing paragraph */}
        {isContentModalOpen && (
          <ContentModal
            key={_id}
            isOpen={isContentModalOpen}
            content={contentToEdit}
            onClose={() => setIsContentModalOpen(false)}
            componentId={index?.toString() ?? ""}
            type="resumeBox"
            contentType="paragraph"
            twoPictureId={_id ?? ""}
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
                    style: paragraph?.style,
                    content: [paragraph?.content],
                  });
                  setContentType("paragraph");
                }}
              >
                Paragraph Style <AiOutlineDown className="my-auto" />
              </button>
            )}
            {paragraph?.content && (
              <button
                onClick={() => openContentModal(paragraph, "paragraph")}
                className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
              >
                Paragraph Edit
                <AiOutlineDown className="my-auto" />
              </button>
            )}
            {isModalOpen && contentType === "paragraph" && (
              <StyledModal
                key={_id}
                isOpen={isModalOpen}
                styleData={selectedStyle}
                onClose={() => setIsModalOpen(false)}
                type="resumeBox"
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentType="paragraph"
                isContentSend={false}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeIcon;
