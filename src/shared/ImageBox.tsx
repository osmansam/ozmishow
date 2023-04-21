import React from "react";
import Ptext from "./Ptext";
import { motion } from "framer-motion";
type Props = {
  img: string;
  header: string;
  description: string;
  height?: string;
};

const ImageBox = ({ img, header, description, height }: Props) => {
  return (
    <div className="flex flex-col  md:w-1/4  h-full  transition duration-200   ">
      <motion.img
        src={img}
        alt={header}
        className={`object-cover w-full h-${height} mt-10`}
        variants={{
          hidden: { y: 100 },
          visible: { y: 0 },
        }}
      />
      <motion.div className=" mt-8">
        <h1 className="text-lg text-gray-40">{header}</h1>
        <Ptext>{description}</Ptext>
      </motion.div>
    </div>
  );
};

export default ImageBox;
