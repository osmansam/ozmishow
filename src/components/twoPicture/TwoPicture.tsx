import React from "react";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";
import { PictureType } from "../../shared/types";

const TwoPicture = ({ img, header, paragraphs, buttons }: PictureType) => {
  return (
    <div className="flex flex-col gap-4 md:pr-6 w-full md:w-1/2a h-full mt-8">
      {img && <img src={img} alt={header} className="w-full" />}
      <h1
        className="text-lg font-[500] leading-6 pt-2"
        style={{ color: "#333333" }}
      >
        {header}
      </h1>
      {paragraphs?.map((paragraph, index) => (
        <p
          key={index}
          className=" font-[400] leading-6 "
          style={{ color: "#333333" }}
        >
          {paragraph}
        </p>
      ))}

      <div className="w-full flex gap-8 flex-row">
        {buttons &&
          buttons.map((button, index) => (
            <div className="mt-4" key={index}>
              <ButtonUnderline
                text={button.buttonName}
                buttonLink={button.buttonLink}
                textColor="black"
                underlineColorBefore="#e5e5e5"
                underlineColorAfter="#414141"
              ></ButtonUnderline>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TwoPicture;
