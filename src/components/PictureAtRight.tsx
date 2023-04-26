import React from "react";
import ButtonUnderline from "./ButtonUnderline";
type Props = {
  img: string;
  header: string;
  description: string;
  message?: string;
};

const PictureAtRight = ({ img, header, description, message }: Props) => {
  return (
    <div className="lg:flex w-4/5 lg:justify-between h-full mx-auto mt-8 py-10 md:py-20 ">
      {/* left side */}
      <div className="basis-1/2 flex  gap-4 flex-col h-full  pt-16 ">
        <h1 className="font-[700] text-4xl">{header}</h1>
        <p className="w-3/4 leading-6 font-[400]">{description}</p>
        {message && (
          <div>
            <ButtonUnderline
              text={message}
              textColor="black"
              underlineColorBefore="#e5e5e5"
              underlineColorAfter="#414141"
            ></ButtonUnderline>
          </div>
        )}
      </div>
      {/* right side  */}
      <img src={img} alt={header} className="w-full lg:basis-1/2 h-[400px]" />
    </div>
  );
};

export default PictureAtRight;
