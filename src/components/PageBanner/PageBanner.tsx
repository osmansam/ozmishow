import { PictureWithStyleType } from "../../shared/types";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";

const PageBanner = ({
  img,
  header,
  _id,
  componentStyle,
}: PictureWithStyleType) => {
  return (
    <div className="relative w-full pt-10 mb-10" style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          // buraya componentTYpe gelecek
          currentType="type1"
          twoPictureId={_id ?? ""}
          isComponentType={false}
        />
      </div>
      {/* image */}

      <img
        src={img?.content}
        alt="pageImage"
        className="w-full h-72 object-cover"
        style={img?.style}
      />
      <div className="w-fit px-4 ml-auto">
        <ImageStyleModalContainer
          twoPictureId={_id ?? ""}
          componentId={""}
          type="twoPicture"
          styleData={img}
        />
      </div>
      {/* Description */}
      <div className="absolute bottom-[-20px] left-20  bg-[#9f000f] text-white">
        <h2
          className="text-xl uppercase px-4 py-2 font-[700] flex flex-row gap-2 items-center "
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
        </h2>
      </div>
    </div>
  );
};

export default PageBanner;
