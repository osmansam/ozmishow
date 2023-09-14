import React, { useEffect, useState } from "react";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../../shared/types";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";

type Props = {};

const PictureAtLeftType3 = ({
  img,
  header,
  paragraphs,
  buttons,
  componentStyle,
  componentType,
  _id,
}: PictureWithStyleType) => {
  return (
    <div className="flex flex-col gap-4 " style={componentStyle}>
      {/* component Style button */}
      <div className=" w-full flex justify-end pr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          currentType={componentType ?? ""}
          twoPictureId={_id ?? ""}
          componentTypes={pictureAndTextTypes}
          isComponentType={true}
        />
      </div>

      {/* header */}
      <div className="w-5/6 mx-auto">
        <h1
          className="w-fit px-4 py-1 gap-8 rounded-2xl font-[600] text-2xl flex flex-row "
          style={header?.style}
        >
          {header?.content}
          <StyleModalContainer
            styleData={header}
            twoPictureId={_id ?? ""}
            componentId={""}
            contentContainerType="header"
            isContentSend={true}
            type="twoPicture"
          />
        </h1>
      </div>
      {/* paragraphs */}
      <div className="md:w-1/2 flex flex-col gap-2 w-full rounded-lg py-1 md:ml-auto ">
        {paragraphs?.content?.map((paragraph, index) => (
          <div key={index}>
            <p
              className=" font-[400] leading-6 rounded-lg px-4 py-1  text-[#333333] "
              style={paragraphs?.style ? paragraphs?.style : {}}
            >
              {paragraph}
            </p>
          </div>
        ))}
        <ContentModalContainer
          content={paragraphs}
          twoPictureId={_id ?? ""}
          componentId={""}
          contentContainerType="paragraphs"
          type="twoPicture"
        />
      </div>
      {/* img */}
      <div className="w-5/6 md:w-3/4 mx-auto">
        <img
          src={img}
          alt="img"
          className="w-full h-[12rem] md:w-1/2 md:h-[20rem]  md:mt-[-5rem]  sm:py-5 md:py-0"
        />
      </div>
    </div>
  );
};

export default PictureAtLeftType3;
