import React from "react";

type Props = {
  year1: string;
  year2: string;
  header: string;
  university: string;
  paragraph: string;
};

const ResumeBox = ({ year1, year2, header, paragraph, university }: Props) => {
  return (
    <div className="w-full md:w-1/2 md:px-4 py-4">
      <div className=" py-8 flex flex-col gap-4  border-2 rounded-lg px-2">
        {/* years */}
        <div className="rounded-3xl bg-[#fd7e14] text-center w-fit px-3">
          <h1 className="text-white">
            {year1}-{year2}{" "}
          </h1>
        </div>
        {/* header */}
        <h1 className="font-[450] text-2xl leading-[25px] text-[#252b33] capitalize font-[Poppins, sans-serif]">
          {header}
        </h1>
        {/* university */}
        <p className="text-[#dc3545] font-[Poppins, sans-serif]">
          {university}
        </p>
        {/* paragraph */}
        <p className="font-[400]  font-[Poppins,sans-serif] text-[#4c4d4d]  leading-[29px] ">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default ResumeBox;
