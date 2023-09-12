import { useState } from "react";
import { PictureWithStyleType } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { style } from "../../shared/types";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
const SinglePicture = ({
  header,
  paragraphs,
  img,
  _id,
  index,
}: PictureWithStyleType) => {
  return (
    <li className="relative mx-5 inline-block h-[380px] w-[450px] ">
      <div
        className="p-5 absolute  flex
  h-[380px]  w-[450px] z-30 flex-col items-center justify-center
  whitespace-normal bg-[#FF6B66] text-center text-white
  opacity-0 transition duration-500 hover:opacity-90"
      >
        <p
          className="text-2xl flex flex-row gap-4 rounded-2xl px-4"
          style={header?.style ? header?.style : {}}
        >
          {header?.content}
          <StyleModalContainer
            styleData={header}
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            contentContainerType="header"
            isContentSend={true}
            type="twoPictureIndex"
          />
        </p>
        <div className="flex flex-col gap-2 w-full  py-1  l  ">
          {paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className=" font-[400] leading-6 rounded-2xl"
              style={paragraphs?.style ? paragraphs?.style : {}}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <ContentModalContainer
          content={paragraphs}
          twoPictureId={_id ?? ""}
          componentId={index?.toString() ?? ""}
          contentContainerType="paragraphs"
          type="twoPictureIndex"
        />
      </div>
      <img
        alt="carousel img"
        src={img}
        className="object-cover h-full w-full "
      />
    </li>
  );
};

export default SinglePicture;
