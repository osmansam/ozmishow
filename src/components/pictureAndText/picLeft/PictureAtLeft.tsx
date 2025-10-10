import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";
import { PictureWithStyleType } from "../../../shared/types";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
const PictureAtLeft = ({
  img,
  header,
  paragraphs,
  buttons,
  componentStyle,
  componentType,
  _id,
}: PictureWithStyleType) => {
  return (
    <div className="w-full h-full flex flex-col mx-auto" style={componentStyle}>
      <div className=" w-full flex justify-end pr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          currentType={componentType ?? ""}
          twoPictureId={_id ?? ""}
          componentTypes={pictureAndTextTypes}
          isComponentType={true}
        />
      </div>
      <div
        className="lg:flex w-full lg:justify-center items-center h-full mx-auto  py-10  px-8"
        style={componentStyle}
      >
        {/* left side */}

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

        {/* right side  */}

        <div className="basis-1/2 ">
          {/* if you want to have more wide paragraphs you need to decrease lg:pl-28 */}
          <div className="flex w-full lg:pl-28 gap-4 flex-col h-full md:pt-20">
            <h1
              className="w-fit px-4 py-1 gap-8 rounded-2xl font-[700] text-4xl flex flex-row "
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

            <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
              {paragraphs?.content?.map((paragraph, index) => (
                <div key={index}>
                  <p
                    className=" font-[400] leading-6 rounded-lg px-4 py-1  text-[#333333] "
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
                    />
                    <StyleModalContainer
                      styleData={button}
                      twoPictureId={_id ?? ""}
                      componentId={""}
                      contentContainerType="buttons"
                      isContentSend={true}
                      type="twoPicture"
                      buttonIndex={index}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureAtLeft;
