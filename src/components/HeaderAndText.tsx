import React from "react";
import FreqAsked from "./FreqAsked";
type Props = { mainHeader: string; paragraphs: string[] };

const HeaderAndText = ({ mainHeader, paragraphs }: Props) => {
  return (
    <div className="w-5/6 h-full mx-auto py-10 md:py-20">
      <div className="w-full md:w-3/5 h-full flex flex-col gap-4 ">
        <h1
          className="font-[700] text-4xl leading-[44px] pb-3"
          style={{ color: "#333333" }}
        >
          {mainHeader}
        </h1>
        {paragraphs.map((paragraph) => (
          <p className=" font-[400] leading-6" style={{ color: "#333333" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HeaderAndText;
