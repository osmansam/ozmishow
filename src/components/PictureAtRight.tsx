import React from "react";
import ButtonUnderline from "./ButtonUnderline";
import { TwoPictureType } from "../shared/types";

const PictureAtRight = ({
  img,
  header,
  paragraphs,
  buttons,
}: TwoPictureType) => {
  return (
    <div className="lg:flex w-4/5 lg:justify-between h-full mx-auto mt-8 py-10 md:py-20 ">
      {/* left side */}
      <div className="basis-1/2 flex  gap-4 flex-col h-full  pt-16 ">
        <h1 className="font-[700] text-4xl">{header}</h1>
        {paragraphs.map((paragraph) => (
          <p className=" font-[400] leading-6 " style={{ color: "#333333" }}>
            {paragraph}
          </p>
        ))}
        <div className="w-full flex gap-8 flex-row">
          {buttons &&
            buttons.map((button, index) => (
              <div className="mt-4" key={index}>
                <ButtonUnderline
                  text={button}
                  textColor="black"
                  underlineColorBefore="#e5e5e5"
                  underlineColorAfter="#414141"
                ></ButtonUnderline>
              </div>
            ))}
        </div>
      </div>
      {/* right side  */}
      <img src={img} alt={header} className="w-full lg:basis-1/2 h-[400px]" />
    </div>
  );
};

export default PictureAtRight;
