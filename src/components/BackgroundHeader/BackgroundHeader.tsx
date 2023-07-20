import React from "react";

type Props = {
  mainHeader: string;
  header: string;
};

const BackgroundHeader = ({ header, mainHeader }: Props) => {
  return (
    <div className=" flex items-center justify-center w-full pt-24 pb-10 ">
      <div className="w-full flex items-center justify-center relative py-10">
        <div className="z-10">
          <h1 className="font-semibold text-4xl font-[Poppins,sans-serif] text-gray-800 capitalize leading-[54px] ">
            {mainHeader}
          </h1>
          <div className="w-24 h-[3px] bg-[#fd7e13]  mt-3 mx-auto"></div>
        </div>

        <h2
          className="absolute  font-[600] font-[Poppins,sans-serif] text-8xl md:text-8xl lg:text-[132px] leading-[54px] text-[#dee3e4] uppercase w-full text-center opacity-40"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {header}
        </h2>
      </div>
    </div>
  );
};

export default BackgroundHeader;
