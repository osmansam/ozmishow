import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PictureWithStyleType } from "../../../shared/types";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { deleteItemInContainer } from "../../../features/twoPicture/twoPictureSlice";
import Navbar from "../../navbar/Navbar";
import NewsContainer from "./NewsContainer";
import NewsContainer2 from "../newsType2/NewsContainer2";
import Footer from "../../footer";
import StyledModal from "../../../hooks/styledModal/StyledModal";
import ContentModal from "../../../hooks/ContentModal";
import { style } from "../../../shared/types";
import { AiOutlineDown } from "react-icons/ai";

const SingleNew = () => {
  const { id, twoPictureId, type } = useParams();
  const dispatch = useAppDispatch();
  const [news, setNews] = useState({} as PictureWithStyleType);

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
  const getSingleNew = async () => {
    const response = await axios.get(
      `https://ozmishow-back.onrender.com/api/v1/twoPicture/getSingleNew/${twoPictureId}/${id}`
    );
    setNews(response.data.news);
  };
  useEffect(() => {
    getSingleNew();
  }, []);
  const { img, header, paragraphs } = news;
  return (
    <div>
      <Navbar />
      <div className=" w-5/6 lg:w-3/4  mx-auto flex flex-col py-10 ">
        {/* header */}
        <h1
          className="w-fit  font-[700] text-4xl flex flex-row gap-8 rounded-2xl px-4 py-0.5"
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
              key={twoPictureId}
              isOpen={isModalOpen}
              styleData={selectedStyle}
              onClose={() => setIsModalOpen(false)}
              type="explanationBar"
              twoPictureId={twoPictureId ?? ""}
              componentId={id ?? ""}
              contentType="header"
              isContentSend={true}
            />
          )}
        </h1>
        {/* img */}
        {news.img && (
          <img
            src={news.img}
            alt="img"
            className="  mx-auto lg:h-[450px] sm:h-60 py-10"
          />
        )}
        {/* paragraphs */}
        <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
          {paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className=" font-[400] leading-6 text-[#333333] rounded-2xl px-2"
              style={paragraphs?.style ? paragraphs?.style : {}}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {/* ContentModal for editing paragraphs */}
        {isContentModalOpen && (
          <ContentModal
            isOpen={isContentModalOpen}
            content={contentToEdit}
            onClose={() => setIsContentModalOpen(false)}
            componentId={id ?? ""}
            type="explanationBar"
            contentType="paragraphs"
            twoPictureId={twoPictureId ?? ""}
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
                    style: paragraphs?.style,
                    content: paragraphs?.content,
                  });
                  setContentType("paragraphs");
                }}
              >
                Paragraph Style <AiOutlineDown className="my-auto" />
              </button>
            )}
            {paragraphs?.content && (
              <button
                onClick={() => openContentModal(paragraphs, "paragraphs")}
                className="flex flex-row gap-1 bg-blue-500 text-white px-2  rounded-2xl hover:bg-blue-700 mr-2"
              >
                Paragraph Edit
                <AiOutlineDown className="my-auto" />
              </button>
            )}
            {isModalOpen && contentType === "paragraphs" && (
              <StyledModal
                key={twoPictureId}
                isOpen={isModalOpen}
                styleData={selectedStyle}
                onClose={() => setIsModalOpen(false)}
                type="explanationBar"
                twoPictureId={twoPictureId ?? ""}
                componentId={id ?? ""}
                contentType="paragraphs"
                isContentSend={false}
              />
            )}
          </div>
        )}
        {isAdmin && (
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={async () => {
              try {
                await dispatch(
                  deleteItemInContainer({
                    id: twoPictureId ? twoPictureId : "",
                    itemId: id ? id : "",
                  })
                );
                window.location.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SingleNew;
