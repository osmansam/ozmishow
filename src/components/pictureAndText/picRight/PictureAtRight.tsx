import React from "react";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../../shared/types";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";

const PictureAtRight = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
  componentType,
  componentStyle,
}: PictureWithStyleType) => {
  return (
    <div
      className="w-full h-full flex flex-col  lg:justify-center items-center mx-auto"
      style={componentStyle}
    >
      <div className=" w-full justify-end pr-20 flex  ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          currentType={componentType ?? ""}
          twoPictureId={_id ?? ""}
          componentTypes={pictureAndTextTypes}
          isComponentType={true}
        />
      </div>
      <div className="lg:flex  lg:justify-between h-full mx-auto py-10  px-8">
        {/* left side */}
        <div className="basis-1/2 px-4">
          <div className="flex w-full lg:pr-28 gap-4 flex-col h-full ">
            <h1
              className="w-fit px-4 py-1 gap-8 rounded-2xl font-[700] text-4xl flex flex-row"
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
            {/* paragraphs */}
            <div className="flex flex-col gap-2 w-full rounded-lg py-1">
              {paragraphs?.content?.map((paragraph, index) => (
                <div key={index}>
                  <p
                    className="font-[400] leading-6 text-[#333333] rounded-lg px-4 py-1"
                    style={paragraphs?.style}
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
                buttons.length > 0 &&
                buttons.map((button, index) => (
                  <div
                    className=" px-4 flex flex-row w-fit items-center justify-center gap-2 "
                    key={index}
                    style={button.style}
                  >
                    <ButtonUnderline
                      text={button.content}
                      buttonLink={button.link}
                      textColor="black"
                      underlineColorBefore="#e5e5e5"
                      underlineColorAfter="#414141"
                    />
                    <StyleModalContainer
                      styleData={button}
                      twoPictureId={_id ?? ""}
                      componentId={""}
                      contentContainerType="buttons"
                      isContentSend={true}
                      type="twoPicture"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* right side */}

        <img
          src={img?.content}
          alt={header?.content}
          className="w-full lg:basis-1/2 lg:h-[25rem] max-w-[25rem] sm:h-[15rem] sm:py-5 md:py-0"
          style={img?.style}
        />
        <ImageStyleModalContainer
          twoPictureId={_id ?? ""}
          componentId={""}
          type="twoPicture"
          styleData={img}
        />
      </div>
    </div>
  );
};

export default PictureAtRight;
