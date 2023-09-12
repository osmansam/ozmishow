import React, { useEffect, useState } from "react";
import { PictureWithStyleType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/ContentModal";
import { style } from "../../shared/types";
import { AiOutlineDown } from "react-icons/ai";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
const ResumeBox = ({
  year1,
  year2,
  header,
  paragraph,
  university,
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
  return (
    <div className="w-full md:w-1/2 md:px-4 py-4">
      <div className=" py-8 flex flex-col gap-4  border-2 rounded-lg px-2">
        {/* years */}
        <div className="rounded-3xl bg-[#fd7e14] text-center w-fit px-3">
          <div className="flex flex-row">
            <h1
              className="text-white flex flex-row gap-2"
              style={year1?.style ?? {}}
            >
              {year1?.content}{" "}
              <StyleModalContainer
                styleData={year1}
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentContainerType="year1"
                isContentSend={true}
                type="resumeBox"
              />
            </h1>
            <h1 className="text-white">-</h1>
            <h1
              className="text-white flex flex-row gap-2"
              style={year2?.style ?? {}}
            >
              {year2?.content}{" "}
              <StyleModalContainer
                styleData={year2}
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentContainerType="year2"
                isContentSend={true}
                type="resumeBox"
              />
            </h1>
          </div>
        </div>
        {/* header */}
        <h1
          className="font-[450] w-fit rounded-2xl text-2xl leading-[25px] text-[#252b33] capitalize font-[Poppins, sans-serif]rounded-2xl px-4 py-0.5 flex flex-row gap-2"
          style={header?.style ? header?.style : {}}
        >
          {header?.content}
          <StyleModalContainer
            styleData={header}
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            contentContainerType="header"
            isContentSend={true}
            type="resumeBox"
          />
        </h1>
        {/* university */}
        <p
          className="text-[#dc3545] font-[Poppins, sans-serif] flex flex-row gap-2 rounded-2xl px-4 py-0.5"
          style={university?.style ?? {}}
        >
          {university?.content}
          <StyleModalContainer
            styleData={university}
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            contentContainerType="university"
            isContentSend={true}
            type="resumeBox"
          />
        </p>
        {/* paragraph */}
        <p
          className="font-[400]  font-[Poppins,sans-serif] text-[#4c4d4d]  leading-[29px] rounded-lg px-2 "
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

export default ResumeBox;
