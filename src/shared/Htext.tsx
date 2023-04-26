import React from "react";

type Props = {
  children: React.ReactNode;
};

const HText = ({ children }: Props) => {
  return (
    <h1 className="text-black font-[700] text-3xl md:text-4xl  ">{children}</h1>
  );
};

export default HText;
