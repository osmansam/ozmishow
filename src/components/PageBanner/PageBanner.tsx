import { PictureWithStyleType } from "../../shared/types";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";

const PageBanner = ({ img, header, _id }: PictureWithStyleType) => {
  return (
    <div className="relative w-full pt-10 mb-10">
      {/* image */}
      <img src={img} alt="pageImage" className="w-full h-72 object-cover" />
      {/* Description */}
      <div className="absolute bottom-[-20px] left-20  bg-[#9f000f] text-white">
        <h2
          className="text-xl uppercase px-4 py-2 font-[700] flex flex-row gap-2"
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
