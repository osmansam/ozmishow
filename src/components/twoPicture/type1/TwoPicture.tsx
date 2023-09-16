import React, { useEffect, useState } from "react";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../../shared/types";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";

const TwoPicture = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
  index,
}: PictureWithStyleType) => {
  return (
    <div className="flex flex-col gap-4 md:px-4 w-full md:w-1/2a h-full mt-8 ">
      {img && (
        <img src={img} alt={header?.content} className="w-full max-h-80" />
      )}
      <h1
        className="text-lg font-[500] leading-6 mt-2 text-[#333333] flex flex-row gap-8 rounded-2xl px-4 py-0.5"
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

      <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
        {paragraphs?.content?.map((paragraph, index) => (
          <p
            key={index}
            className=" font-[400] leading-6 text-[#333333] rounded-2xl px-2"
            style={paragraphs?.style}
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

      <div className="w-full flex gap-8 flex-row">
        {buttons &&
          buttons.map((button, index) => (
            <div className="mt-4" key={index}>
              <ButtonUnderline
                text={button.buttonName}
                buttonLink={button.buttonLink}
                textColor="black"
                underlineColorBefore="#e5e5e5"
                underlineColorAfter="#414141"
              ></ButtonUnderline>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TwoPicture;
