import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  text: string;
  textColor: string;
  underlineColorBefore: string;
  underlineColorAfter: string;
};

const ButtonUnderline = ({
  text,
  textColor,
  underlineColorBefore,
  underlineColorAfter,
}: Props) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };
  return (
    <motion.div
      className="relative inline-block"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button className="leading-8" style={{ color: textColor }}>
        {text}
      </button>
      <div
        className={`relative  h-px`}
        style={{ background: underlineColorBefore }}
      >
        <motion.div
          className={`relative h-full`}
          style={{
            width: isHover ? "100%" : "0%",
            transition: "width 0.4s ease-in-out, background 1s ease-in-out",
            background: isHover ? underlineColorAfter : underlineColorBefore,
          }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default ButtonUnderline;
