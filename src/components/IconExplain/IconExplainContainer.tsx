import React from "react";
import { IconExplainContainerType } from "../../shared/types";
import IconExplain from "./IconExplain";

const IconExplainContainer = ({
  mainHeader,
  iconExplainArray,
}: IconExplainContainerType) => {
  return (
    <div className="w-5/6 h-full mx-auto py-10 md:py-20">
      <h1
        className="font-[700] text-4xl leading-[44px] pb-3"
        style={{ color: "#333333" }}
      >
        {mainHeader}
      </h1>
      <div className="w-full h-full md:flex md:justify-between mx-auto">
        {iconExplainArray.map((iconExplain, index) => {
          const { img, header, paragraphs, buttons } = iconExplain;
          return (
            <IconExplain
              key={index}
              img={img}
              header={header}
              paragraphs={paragraphs}
              buttons={buttons}
            ></IconExplain>
          );
        })}
      </div>
    </div>
  );
};

export default IconExplainContainer;
