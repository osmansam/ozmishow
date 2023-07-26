import React from "react";

type Props = {
  mainHeader: string;
  header: string;
};

const BackgroundHeader = ({ header, mainHeader }: Props) => {
  return (
    <div className=" flex items-center justify-center w-full pt-12  ">
      <div className="w-full flex items-center justify-center relative ">
        <div className="z-10 flex ">
          <div>
            <h1 className="font-semibold text-2xl  md:text-4xl sfont-[Poppins,sans-serif] text-gray-800 capitalize leading-[54px] ">
              {mainHeader}
            </h1>
            <div className="w-24 h-[3px] bg-[#fd7e13]  mx-auto"></div>
          </div>
        </div>

        <h2
          className="absolute  font-[600]  font-[Poppins,sans-serif] text-5xl md:text-8xl lg:text-[132px] leading-[54px] text-[#dee3e4] uppercase w-full text-center opacity-40 "
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
