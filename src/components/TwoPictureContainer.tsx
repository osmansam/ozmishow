import React from "react";
import { TwoPictureContainerType } from "../shared/types";
import TwoPicture from "./TwoPicture";

const TwoPictureContainer = ({
  mainHeader,
  twoPictureArray,
}: TwoPictureContainerType) => {
  return (
    <div className="w-5/6 h-full mx-auto py-10 md:py-20">
      <h1
        className="font-[700] text-4xl leading-[44px] pb-3"
        style={{ color: "#333333" }}
      >
        {mainHeader}
      </h1>
      <div className="w-full h-full md:flex md:justify-between mx-auto">
        {twoPictureArray.map((twoPicture, index) => {
          const { img, header, paragraphs, buttons } = twoPicture;
          return (
            <TwoPicture
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
