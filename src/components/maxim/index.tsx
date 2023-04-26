import React from "react";

type Props = {
  header: string;
  writer: string;
};

const Maxim = ({ header, writer }: Props) => {
  return (
    <div
      className="w-full h-52  flex flex-col gap-10 justify-center items-center"
      style={{ backgroundColor: "#f6f6f6" }}
    >
      <h1
        className="font-[500] text-[18px] leading-6"
        style={{ color: "#333333" }}
      >
        {header}
      </h1>
      <p className="font-[400] leading-6" style={{ color: "#333333" }}>
        {writer}
      </p>
    </div>
  );
};

export default Maxim;
