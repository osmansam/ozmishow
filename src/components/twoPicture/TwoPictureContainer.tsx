import React, { useEffect, useState } from "react";
import { TwoPictureContainerType } from "../../shared/types";
import TwoPicture from "./TwoPicture";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
const TwoPictureContainer = ({
  mainHeader,
  twoPictureArray,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-5/6 h-full mx-auto py-10 ">
      <h1
        className="font-[700] text-4xl leading-[44px] mb-2 text-[#333333] w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
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
      <div className="w-full h-full md:flex md:justify-between mx-auto">
        {twoPictureArray.map((twoPicture, index) => {
          const { img, header, paragraphs, buttons } = twoPicture;
          return (
            <TwoPicture
              _id={id}
              index={index}
              key={index}
              img={img}
              header={header}
              paragraphs={paragraphs}
              buttons={buttons}
            ></TwoPicture>
          );
        })}
      </div>
    </div>
  );
};

export default TwoPictureContainer;
