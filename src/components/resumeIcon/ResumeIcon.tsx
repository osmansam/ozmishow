import React, { ReactElement } from "react";
import { BsFillPaletteFill } from "react-icons/bs";
import { MdDesignServices } from "react-icons/md";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPaintBrush } from "react-icons/fa";
import { AiOutlineAreaChart } from "react-icons/ai";
import { AiTwotoneSound } from "react-icons/ai";

type Props = { icon: string; header: string; paragraph: string };

const ResumeIcon = ({ header, paragraph, icon }: Props) => {
  const handleIcon = (icon: string): ReactElement => {
    switch (icon) {
      case "BsFillPaletteFill":
        return <BsFillPaletteFill />;
      case "MdDesignServices":
        return <MdDesignServices />;
      case "HiDesktopComputer":
        return <HiDesktopComputer />;
      case "FaPaintBrush":
        return <FaPaintBrush />;
      case "AiOutlineAreaChart":
        return <AiOutlineAreaChart />;
      case "AiTwotoneSound":
        return <AiTwotoneSound />;
      default:
        return <BsFillPaletteFill />;
    }
  };
  const newIcon = handleIcon(icon);

  return (
    <div className="flex flex-row gap-4 w-full  md:w-1/2 py-4 px-3 ">
      {/* icon */}
      <div className="h-16 w-16 text-[30px] flex items-center justify-center text-[#fd7e14] bg-white shadow-lg rounded-lg py-2 px-4 font-[Poppins,sans-serif] flex-shrink-0">
        <div style={{ width: "30px", height: "30px" }}>{newIcon}</div>
      </div>
      {/* header and explanation */}
      <div className="flex flex-col gap-2">
        <h1 className=" font-[500] text-xl leading-[29px] text-[#212529] ">
          {header}
        </h1>
        <p className="font-[400] text-lg  font-[Poppins,sans-serif] text-[#4c4d4d]  leading-[29px] ">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default ResumeIcon;
