import React from "react";
import { PictureType } from "../../shared/types";
type Props = {};

const PageBanner = ({ img, header }: PictureType) => {
  return (
    <div className="relative w-full pt-10 mb-10">
      {/* image */}
      <img src={img} alt="pageImage" className="w-full h-72 object-cover" />
      {/* Description */}
      <div className="absolute bottom-[-20px] left-20  bg-[#9f000f] text-white">
        <p className="text-xl uppercase px-4 py-2 font-[700]">{header}</p>
      </div>
    </div>
  );
};

export default PageBanner;
