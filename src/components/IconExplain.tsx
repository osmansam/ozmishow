import React from "react";
import ButtonUnderline from "./ButtonUnderline";
import { IconExplainType } from "../shared/types";

const IconExplain = ({
  icon,
  img,
  header,
  paragraphs,
  button,
}: IconExplainType) => {
  return (
    <div className="flex flex-col gap-4 md:pr-6 w-full md:w-1/3 h-full mt-8">
      {img && <img src={img} alt={header} className="w-full h-60" />}
      {icon && <img src={icon} alt={header} className="w-20 h-20" />}
      <h1 className="text-lg font-[500] leading-6" style={{ color: "#333333" }}>
        {header}
      </h1>
      {paragraphs.map((paragraph) => (
        <p className=" font-[400] leading-6" style={{ color: "#333333" }}>
          {paragraph}
        </p>
      ))}
      {button && (
        <div className="mt-4">
          <ButtonUnderline
            text={button}
            textColor="black"
            underlineColorBefore="#e5e5e5"
            underlineColorAfter="#414141"
          ></ButtonUnderline>
        </div>
      )}
    </div>
  );
};

export default IconExplain;
