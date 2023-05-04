import React from "react";
import { PictureType } from "../../shared/types";

const Maxim = ({ header, paragraphs }: PictureType) => {
  return (
    <div
      className="w-full h-52  flex flex-col gap-10 justify-center items-center"
      style={{ backgroundColor: "#f6f6f6" }}
    >
      {paragraphs?.map((paragraph, index) => (
        <h1
          key={index}
          className="font-[500] text-[18px] leading-6"
          style={{ color: "#333333" }}
        >
          {`“${paragraph}”`}
        </h1>
      ))}

      <p className="font-[400] leading-6" style={{ color: "#333333" }}>
        {header}
      </p>
    </div>
  );
};

export default Maxim;
