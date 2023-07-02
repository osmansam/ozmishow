import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PictureType } from "../../../shared/types";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { deleteItemInContainer } from "../../../features/twoPicture/twoPictureSlice";
import Navbar from "../../navbar/Navbar";
import NewsContainer from "./NewsContainer";
import NewsContainer2 from "../newsType2/NewsContainer2";
import Footer from "../../footer";

const SingleNew = () => {
  const { id, twoPictureId, type } = useParams();
  const dispatch = useAppDispatch();
  const [news, setNews] = useState({} as PictureType);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const getSingleNew = async () => {
    const response = await axios.get(
      `https://ozmishow-back.onrender.com/api/v1/twoPicture/getSingleNew/${twoPictureId}/${id}`
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
            className="w-5/6 lg:w-2/3  mx-auto lg:h-[450px] sm:h-60 py-10"
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
        {isAdmin && (
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={async () => {
              try {
                await dispatch(
                  deleteItemInContainer({
                    id: twoPictureId ? twoPictureId : "",
                    itemId: id ? id : "",
                  })
                );
                window.location.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SingleNew;
