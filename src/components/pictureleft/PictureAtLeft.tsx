import React from "react";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";
import { PictureType } from "../../shared/types";

const PictureAtLeft = ({ img, header, paragraphs, buttons }: PictureType) => {
  return (
    <div className="lg:flex w-4/5 lg:justify-between h-full mx-auto  py-10 ">
      {/* left side */}
      <img
        src={img}
        alt="img"
        className="w-full lg:basis-1/2 lg:h-[400px] sm:h-[250px] sm:py-5 md:py-0"
      />

      {/* right side  */}

      <div className="basis-1/2 ">
        {/* if you want to have more wide paragraphs you need to decrease lg:pl-28 */}
        <div className="flex w-full lg:pl-28 gap-4 flex-col h-full md:pt-20">
          <h1 className="font-[700] text-4xl">{header}</h1>
          {/* paragraphs */}
          {paragraphs?.map((paragraph, index) => (
            <p
              key={index}
              className=" font-[400] leading-6 "
              style={{ color: "#333333" }}
            >
              {paragraph}
            </p>
          ))}
          {/* buttons */}
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
      </div>
    </div>
  );
};

export default PictureAtLeft;
