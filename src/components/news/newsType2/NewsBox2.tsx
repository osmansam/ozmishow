import React from "react";
import useMediaQuery from "../../../hooks/UseMediaQuery";
import { PictureType } from "../../../shared/types";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LanguageOptions } from "../../../shared/types";

const NewsBox2 = ({
  twoPictureId,
  _id,
  img,
  header,
  paragraphs,
  date,
}: PictureType) => {
  const navigate = useNavigate();
  const type = "Type2";
  return (
    <div
      className="w-5/6 py-4 flex flex-col gap-2 mx-auto  cursor-pointer"
      onClick={() => {
        navigate(`/news/${twoPictureId}/${_id}/${type}`);
      }}
    >
      {/* header */}
      <h1 className="text-lg font-[500] leading-6 ">{header}</h1>
      {/* date */}
      <p
        className="font-[400] text-[12px] leading-[19px]"
        style={{ color: "#77797a" }}
      >
        {date ? date : "2021-09-09"}
      </p>
      {/* paragraph[0] */}
      {paragraphs && (
        <p className=" mx-auto font-[400] leading-6 py-2 ">
          {paragraphs[0]?.substring(0, 200)}...
        </p>
      )}
      {/* br */}
      <div className="h-[0.5px] bg-[#77797a] mt-4"></div>
    </div>
  );
};

export default NewsBox2;
