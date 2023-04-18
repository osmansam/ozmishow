import React from "react";
import Ptext from "./Ptext";
import { motion } from "framer-motion";
type Props = {
  img: string;
  header: string;
  description: string;
};

const ImageBox = ({ img, header, description }: Props) => {
  return (
    <div className="flex flex-col  w-1/4">
      <img src={img} alt={header} className="object-cover w-full h-80" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mt-8 text-lg text-gray-40">{header}</h1>
        <Ptext>{description}</Ptext>
      </motion.div>
    </div>
  );
};

export default ImageBox;
