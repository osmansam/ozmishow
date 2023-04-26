import React from "react";

type Props = {
  text: string;
  textColor: string;
  backgroundColor: string;
  backgroundColorHover: string;
};
// #f6f6f6 hover bg
const WhiteButton = ({
  text,
  textColor,
  backgroundColor,
  backgroundColorHover,
}: Props) => {
  return (
    <button
      className={`${backgroundColor} hover:${backgroundColorHover} ${textColor} w-fit  mx-auto px-10 rounded-lg font-[500] text-xl h-12`}
    >
      {text}
    </button>
  );
};

export default WhiteButton;
