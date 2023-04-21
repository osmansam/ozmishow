import React from "react";
import { PressType } from "../../shared/types";
import { motion } from "framer-motion";
import HText from "../../shared/Htext";

const PressImage = ({ img, header, description }: PressType) => {
  return (
    <div className="relative mx-5 inline-block h-full w-[450px]">
      <div className=" w-full h-64 object-cover overflow-hidden">
        <motion.img
          src={img}
          alt={header}
          whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      </div>

      <div className="w-full h-20 flex justify-between mt-8 ">
        <h1
          className="leading-6 text-xl font-thin"
          style={{ whiteSpace: "normal" }}
        >
          {description}
        </h1>
        {/* <HText>{header}</HText> */}
      </div>
    </div>
  );
};

export default PressImage;
