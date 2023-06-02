import React from "react";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { PictureType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";

const NewsBox = ({ img, header }: PictureType) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  return (
    <div className="w-1/3  pr-3 pt-3  ">
      <div
        className="hover:shadow-2xl transition duration-300 flex flex-col gap-10 h-[400px]"
        style={{ backgroundColor: "#f8f8f9" }}
      >
        <img src={img} alt={header} className="h-1/2 w-full" />
        <div className="flex flex-col gap-2 w-3/4 mx-auto">
          <p
            className="font-[400] text-[12px] leading-[19px]"
            style={{ color: "#77797a" }}
          >
            US | Mar 9
          </p>
          <h1 className="font-[500] text-2xl leading-7">{header}</h1>
        </div>
      </div>
    </div>
  );
};

export default NewsBox;
