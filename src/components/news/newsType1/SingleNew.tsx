import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PictureType } from "../../../shared/types";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import Navbar from "../../navbar/Navbar";
import NewsContainer from "./NewsContainer";
import NewsContainer2 from "../newsType2/NewsContainer2";

const SingleNew = () => {
  const { id, twoPictureId, type } = useParams();
  const [news, setNews] = useState({} as PictureType);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const getSingleNew = async () => {
    const response = await axios.get(
      `http://localhost:3002/api/v1/twoPicture/getSingleNew/${twoPictureId}/${id}`
    );
    setNews(response.data.news);
  };
  useEffect(() => {
    getSingleNew();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col py-10">
        {/* header */}
        <h1 className="w-5/6 lg:w-2/3 mx-auto font-[700] text-4xl">
          {news?.header}
        </h1>
        {/* img */}
        {news.img && (
          <img
            src={news.img}
            alt="img"
            className="w-5/6 lg:w-2/3  mx-auto lg:h-[450px] sm:h-72 py-10"
          />
        )}
        {/* paragraphs */}
        {news?.paragraphs?.map((paragraph, index) => (
          <p
            key={index}
            className="w-5/6 lg:w-2/3 mx-auto font-[400] leading-6 py-2 "
            style={{ color: "#333333" }}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {/* burasi tercihe gore eklenebilir */}
      {/* {type === "Type1" ? (
        <NewsContainer id={twoPictureId ? twoPictureId : ""} />
      ) : (
        <NewsContainer2 id={twoPictureId ? twoPictureId : ""} />
      )} */}
    </div>
  );
};

export default SingleNew;
