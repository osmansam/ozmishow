import React, { useEffect, useState } from "react";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../shared/types";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
const PictureAtLeft = ({
  img,
  header,
  paragraphs,
  buttons,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  return (
    <div
      className="lg:flex w-full lg:justify-center items-center h-full mx-auto  py-10 bg-gray-400  px-8"
      style={componentStyle}
    >
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={_id ?? ""}
        />
      </div>
      {/* left side */}
      <img
        src={img}
        alt="img"
        className="w-full lg:basis-1/2 lg:h-[400px] sm:h-[250px] sm:py-5 md:py-0"
      />

      {/* right side  */}

      <div className="basis-1/2 ">
        {/* if you want to have more wide paragraphs you need to decrease lg:pl-28 */}
        <div className="flex w-full lg:pl-28 gap-4 flex-col h-full md:pt-20">
          <h1
            className="w-fit px-4 py-1 gap-8 rounded-2xl font-[700] text-4xl flex flex-row "
            style={header?.style ? header?.style : {}}
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
          {/* paragraphs */}

          <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
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

          {/* buttons */}
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
      </div>
    </div>
  );
};

export default PictureAtLeft;
