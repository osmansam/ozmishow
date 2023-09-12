import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";
import { FreqAskedType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "../../shared/types";
import StyledModal from "../../hooks/styledModal/StyledModal";
import ContentModal from "../../hooks/ContentModal";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
import {
  updateContainer,
  resetTwoPictureArray,
  deleteItemInContainer,
} from "../../features/twoPicture/twoPictureSlice";

const FreqAsked = ({ freqAskedArray, id }: FreqAskedType) => {
  const [selection, setSelection] = useState(-1);
  const [isAddNewItem, setIsAddNewItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [modalId, setModalId] = useState<string>("");
  const [contentType, setContentType] = useState("");
  const [contentModalContentType, setContentModalContentType] = useState("");

  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: style,
  });
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
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

    setIsContentModalOpen(true);
    setModalId(idModal);
  };
  const handleCreate = async () => {
    dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const freqAskedContainer = document.getElementById("freqAskedContainer");
      if (
        freqAskedContainer &&
        !freqAskedContainer.contains(event.target as Node)
      ) {
        setSelection(-1);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-4/5 mx-auto  my-auto h-full py-10  px-4 cursor-pointer"
      id="freqAskedContainer"
    >
      {freqAskedArray.map((freqAsked, index) => {
        const { header, paragraphs, buttons, _id } = freqAsked;
        return (
          <div
            key={index}
            onClick={() => setSelection(index)}
            className="h-fit w-full rounded-lg  cursor-pointer"
          >
            <h1
              className="font-[500] pt-2  text-[#333333] flex flex-row gap-8"
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
                      index.toString()
                    );
                    setContentType("header");
                  }}
                />
              )}
              {isModalOpen &&
                contentType === "header" &&
                modalId === index.toString() && (
                  <StyledModal
                    key={id}
                    isOpen={isModalOpen}
                    styleData={selectedStyle}
                    onClose={() => setIsModalOpen(false)}
                    type="twoPictureIndex"
                    twoPictureId={id ?? ""}
                    componentId={index?.toString() ?? ""}
                    contentType="header"
                    isContentSend={true}
                  />
                )}
            </h1>
            {selection === index && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: selection === index ? "auto" : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col gap-2 w-full rounded-lg py-1 px-4 mt-2 ">
                  {paragraphs?.content?.map((paragraph, index) => (
                    <p
                      key={index}
                      className=" font-[400] leading-6 text-[#333333]"
                      style={paragraphs?.style ? paragraphs?.style : {}}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* ContentModal for editing paragraphs */}
                {isContentModalOpen && modalId === index.toString() && (
                  <ContentModal
                    isOpen={isContentModalOpen}
                    content={contentToEdit}
                    onClose={() => setIsContentModalOpen(false)}
                    componentId={index?.toString() ?? ""}
                    type="twoPictureIndex"
                    contentType="paragraphs"
                    twoPictureId={id ?? ""}
                  />
                )}
                {/* editing part */}
                {isAdmin && (
                  <div className="flex flex-row justify-end gap-2 rounded-2xl py-2">
                    {
                      <button
                        className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                        onClick={() => {
                          openModal(
                            {
                              style: paragraphs?.style,
                              content: paragraphs?.content,
                            },
                            index.toString()
                          );
                          setContentType("paragraphs");
                        }}
                      >
                        Paragraph Style <AiOutlineDown className="my-auto" />
                      </button>
                    }
                    {paragraphs?.content && (
                      <button
                        onClick={() =>
                          openContentModal(
                            paragraphs,
                            "paragraphs",
                            index.toString()
                          )
                        }
                        className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
                      >
                        Paragraph Edit
                        <AiOutlineDown className="my-auto" />
                      </button>
                    )}
                  </div>
                )}
                {buttons &&
                  buttons.length > 0 &&
                  buttons.map((button, index) => (
                    <div className=" px-4 " key={index}>
                      <ButtonUnderline
                        text={button.buttonName}
                        buttonLink={button.buttonLink}
                        textColor="black"
                        underlineColorBefore="#e5e5e5"
                        underlineColorAfter="#414141"
                      />
                    </div>
                  ))}
              </motion.div>
            )}
            {isModalOpen &&
              contentType === "paragraphs" &&
              modalId === index.toString() && (
                <StyledModal
                  isOpen={isModalOpen}
                  styleData={selectedStyle}
                  onClose={() => setIsModalOpen(false)}
                  type="twoPictureIndex"
                  twoPictureId={id ?? ""}
                  componentId={index?.toString() ?? ""}
                  contentType="paragraphs"
                  isContentSend={false}
                />
              )}
            {isAdmin && selection === index && (
              <button
                className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
                onClick={async () => {
                  try {
                    await dispatch(
                      deleteItemInContainer({
                        id,
                        itemId: _id ?? "",
                      })
                    );
                    // window.location.reload();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Delete
              </button>
            )}
            {/* Underline color #e2e2e2 */}
            <div className="mx-auto h-px mt-4 font-[700] bg-freqUnderline"></div>
          </div>
        );
      })}

      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New item
        </button>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={false}
            isPictureContainerButton={true}
            isPictureContainerParagraph={true}
          />
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default FreqAsked;
