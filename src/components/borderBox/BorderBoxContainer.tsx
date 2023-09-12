import React from "react";
import { TwoPictureContainerType } from "../../shared/types";
import BorderBox from "./BorderBox";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
const BorderBoxContainer = ({
  mainHeader,
  twoPictureArray,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-20  " style={{ background: "#f6f6f6" }}>
      <div className="w-full flex justify-between gap-8 flex-col ">
        <div className="w-5/6 mx-auto">
          <h1
            className="font-[700] text-4xl leading-[44px] mb-3  w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
            style={mainHeader?.style}
          >
            {mainHeader?.content}
            <StyleModalContainer
              styleData={mainHeader}
              twoPictureId={id ?? ""}
              componentId={""}
              contentContainerType="mainHeader"
              isContentSend={true}
              type="mainMainHeader"
            />
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row lg:w-5/6 w-full justify-center items-center mx-auto gap-20">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;

            return (
              <BorderBox
                key={index}
                img={img}
                header={header}
                _id={id}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BorderBoxContainer;
