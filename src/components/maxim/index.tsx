import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const Maxim = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  return (
    <div
      className="w-full h-52  flex flex-col gap-10 justify-center items-center py-20 bg-[#f6f6f6]"
      style={componentStyle}
    >
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={false}
          // buraya componentTYpe gelecek
          currentType="type1"
          twoPictureId={_id ?? ""}
        />
      </div>
      {paragraphs?.content?.map((paragraph, index) => (
        <h1
          key={index}
          className="font-[550] text-lg leading-6 text-[#333333] "
          style={paragraphs?.style ? paragraphs?.style : {}}
        >
          {`“${paragraph}”`}
        </h1>
      ))}
      {/* ContentModal for editing paragraphs */}
      <ContentModalContainer
        content={paragraphs}
        twoPictureId={_id ?? ""}
        componentId={"0"}
        contentContainerType="paragraphs"
        type="twoPictureIndex"
      />
      <p
        className="font-[400] leading-6 text-[#333333] flex flex-row gap-6"
        style={header?.style ? header?.style : {}}
      >
        {header?.content}
        <StyleModalContainer
          styleData={header}
          twoPictureId={_id ?? ""}
          componentId={"0"}
          contentContainerType="header"
          isContentSend={true}
          type="twoPictureIndex"
        />
      </p>
    </div>
  );
};

export default Maxim;
