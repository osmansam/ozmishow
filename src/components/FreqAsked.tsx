import React, { useState } from "react";
import { motion } from "framer-motion";
import ButtonUnderline from "./ButtonUnderline";

type Props = {
  text: string;
  description: string;
  message?: string;
};
const FreqAsked = ({ text, description, message }: Props) => {
  const [isDescription, setIsDescription] = useState(false);
  const handleClick = () => {
    setIsDescription(!isDescription);
  };
  return (
    <div className="my-auto h-full py-2 px-4 " onClick={handleClick}>
      <h1 className="font-[500] ">{text}</h1>
      {isDescription && (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isDescription ? "auto" : 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClick}
        >
          <p className="mt-4 ">{description}</p>
          {message && (
            <div className="mt-4">
              <ButtonUnderline
                text={message}
                textColor="black"
                underlineColorBefore="#e5e5e5"
                underlineColorAfter="#414141"
              ></ButtonUnderline>
            </div>
          )}
        </motion.div>
      )}
      {/* Underline color #e2e2e2 */}
      <div className="h-px mt-4 font-[700] bg-freqUnderline "></div>
    </div>
  );
};

export default FreqAsked;
