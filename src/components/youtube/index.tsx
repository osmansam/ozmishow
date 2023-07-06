import React from "react";
import { YoutubeType } from "../../shared/types";
import YoutubeEmbed from "./YoutubeEmbed";

const YoutubeVideo = ({ embedId }: YoutubeType) => {
  return (
    <div className="w-5/6 lg:w-2/5 h-80 mx-auto ">
      <YoutubeEmbed embedId={embedId} />
    </div>
  );
};

export default YoutubeVideo;
