import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";

type Props = {
  img: string;
  header: string;
};

const BorderBox = ({ img, header }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <motion.div
      className="w-1/2 h-full flex gap-12 mx-auto items-center p-8 border-2"
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
