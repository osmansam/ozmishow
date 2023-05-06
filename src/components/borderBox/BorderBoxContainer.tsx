import React from "react";
import { TwoPictureContainerType } from "../../shared/types";
import BorderBox from "./BorderBox";

const BorderBoxContainer = ({
  mainHeader,
  twoPictureArray,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-20  " style={{ background: "#f6f6f6" }}>
      <div className="w-full flex justify-between gap-8 flex-col ">
        <h1
          className="font-[700] text-4xl leading-[44px] pb-3 pl-5 lg:pl-20"
          style={{ color: "#333333" }}
        >
          {mainHeader}
        </h1>
        <div className="flex flex-col lg:flex-row lg:w-5/6 w-full justify-center items-center mx-auto gap-20">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;
            return (
              <BorderBox key={index} img={img} header={header}></BorderBox>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BorderBoxContainer;
