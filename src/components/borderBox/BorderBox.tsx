import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { PictureType } from "../../shared/types";

const BorderBox = ({ img, header }: PictureType) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <motion.div
      className="w-5/6  h-52 flex  gap-12 mx-auto items-center p-8 border-2 bg-white"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img src={img} alt={header} className="w-40 h-40 " />
      <div className="w-full flex justify-between ">
        <h1 className="font-[700] text-2xl leading-8">{header}</h1>
        <div>
          <BsArrowRight
            className={`text-2xl justify-end ${
              isHovered ? "translate-x-4 transition duration-300 ease-out" : ""
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BorderBox;
