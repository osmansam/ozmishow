import React from "react";

type Props = {};

const Video = (props: Props) => {
  return (
    <div className="w-full h-screen">
      <video autoPlay loop muted id="video" className="fixed z-[-1] w-full   ">
        <source
          src="https://www.ultimacollection.com/application/files/3016/1668/4590/cover.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Video;
