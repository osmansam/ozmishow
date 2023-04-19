import React from "react";

type Props = {
  children: React.ReactNode;
};

const HText = ({ children }: Props) => {
  return (
    <h1 className=" font-[Helvetica] text-gray-30 text-2xl md:text-6xl  ">
      {children}
    </h1>
  );
};

export default HText;
