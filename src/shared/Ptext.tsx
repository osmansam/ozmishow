import React from "react";

type Props = {
  children: React.ReactNode;
};

const Ptext = ({ children }: Props) => {
  return <p className=" mt-2 leading-7 text-gray-50 text-md ">{children}</p>;
};

export default Ptext;
