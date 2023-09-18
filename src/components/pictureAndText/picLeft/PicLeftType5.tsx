import React from "react";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
import { PictureWithStyleType } from "../../../shared/types";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";
import { useNavigate } from "react-router-dom";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
const PicLeftType5 = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
  componentType,
  componentStyle,
}: PictureWithStyleType) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex-col ">
      <div
        className="flex flex-row flex-wrap mx-auto px-8 py-8 gap-16 justify-center  "
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

        {/* img */}

        <img
          src={img?.content}
          alt={header?.content}
          className="w-full lg:basis-1/2 lg:h-[25rem] sm:h-[15rem] sm:py-5 md:py-0"
          style={img?.style}
        />

        <div className="md:w-1/3 gap-8 flex flex-col md:gap-20 justify-start ">
          {/* line */}
          <div className="h-0.5 bg-black"></div>
          {/* header and paragraph */}
          <div className="flex flex-col gap-8">
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
            <button
              className="w-fit uppercase px-4 py-2 bg-slate-400 text-white"
              onClick={() => {
                navigate(`/readMore/${_id}/${"0"}`);
              }}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
      <div className="w-fit px-4 ml-40">
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

export default PicLeftType5;
