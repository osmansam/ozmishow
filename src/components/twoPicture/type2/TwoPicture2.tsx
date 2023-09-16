import React, { useEffect, useState } from "react";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../../shared/types";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import { useNavigate } from "react-router-dom";

const TwoPicture2 = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
  index,
}: PictureWithStyleType) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 md:px-4 w-full md:w-1/2a h-full mt-8 ">
      {img && (
        <img src={img} alt={header?.content} className="w-full max-h-80" />
      )}
      <h1
        className="w-fit mx-auto capitalize text-lg font-[500] leading-6 mt-2 text-[#333333] flex flex-row gap-8 rounded-2xl px-4 py-0.5"
        style={header?.style}
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
      </h1>

      <div className="flex flex-col gap-2 w-full rounded-lg py-1 items-center justify-center ">
        {paragraphs?.content?.map((paragraph, index) => (
          <p
            key={index}
            className=" font-[400] leading-6 text-[#333333] rounded-2xl  "
            style={paragraphs?.style}
          >
            {paragraph.length && paragraph.length > 250 ? (
              <>{paragraph?.substring(0, 250)}...</>
            ) : (
              <>{paragraph}</>
            )}
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
      <button
        className="w-fit uppercase px-4 py-2 underline hover:no-underline mx-auto"
        onClick={() => {
          navigate(`/readMore/${_id}/${index?.toString()}`);
        }}
      >
        Read More
      </button>
    </div>
  );
};

export default TwoPicture2;
