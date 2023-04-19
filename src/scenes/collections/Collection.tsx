import React from "react";
import HText from "../../shared/Htext";
import { CollectionType } from "../../shared/types";
import { motion } from "framer-motion";
const Collection = ({ img, country, header, rooms }: CollectionType) => {
  return (
    <li className="relative mx-5 inline-block h-full w-[450px]">
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

      <div>
        <h1>{country}</h1>
        {/* <HText>{header}</HText> */}
      </div>
    </li>
  );
};

export default Collection;
