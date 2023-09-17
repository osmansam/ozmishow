import React from "react";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../../shared/types";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";
import { useNavigate } from "react-router-dom";
const PicLeftType6 = ({
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
      className="flex flex-col mx-auto px-8 py-8 gap-16 "
      style={{
        ...componentStyle,
      }}
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
      <div className="w-full flex flex-row flex-wrap justify-center gap-8 md:gap-20">
        {/* header */}

        <h1
          className="uppercase text-2xl font-[450] flex flex-row gap-4 w-fit  py-0.5 rounded-2xl"
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

        {/*  paragraph */}
        <div className="md:w-1/2 flex flex-col gap-8 ">
          {/* paragraphs */}
          {paragraphs && (
            <p
              className=" mx-auto font-[400] leading-6  "
              style={paragraphs?.style}
            >
              {paragraphs?.content?.[0]?.length &&
              paragraphs?.content?.[0]?.length > 250 ? (
                <>{paragraphs?.content?.[0]?.substring(0, 250)}...</>
              ) : (
                <>{paragraphs?.content?.[0]}</>
              )}
            </p>
          )}
          <ContentModalContainer
            content={paragraphs}
            twoPictureId={_id ?? ""}
            componentId={""}
            contentContainerType="paragraphs"
            type="twoPicture"
          />
        </div>
      </div>
    </div>
  );
};

export default PicLeftType6;
