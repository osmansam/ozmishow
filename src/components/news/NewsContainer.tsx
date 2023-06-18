import React, { useEffect, useState } from "react";
import { LanguageOptions, NewsContainerType } from "../../shared/types";
import NewsBox from "./NewsBox";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { PictureType } from "../../shared/types";
import {
  updateContainer,
  resetTwoPictureArray,
} from "../../features/twoPicture/twoPictureSlice";
import { Components } from "../../shared/types";

const NewsContainer = ({
  page,
  id,
  mainHeader,
  newsArray,
}: NewsContainerType) => {
  const dispatch = useAppDispatch();
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { language } = useSelector((state: RootState) => state.context);
  const [search, setSearch] = useState("");
  const [news, setNews] = useState<PictureType[]>();

  useEffect(() => {
    setNews(newsArray);
    setSearch("");
  }, []);

  const handleSearch = async () => {
    const response = await axios.get(
      `http://localhost:3002/api/v1/twoPicture/searchNews/${id}?searchQuery=${search}`
    );
    setNews(response.data.news);
  };
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const handleCreate = async () => {
    dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const [isAddNewItem, setIsAddNewItem] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      {isAdmin && (
        <div className="w-5/6 mx-auto flex justify-end items-center px-4 pt-2 ">
          <input
            type="text"
            placeholder={`${
              language === LanguageOptions.EN ? "Search" : "Ara"
            }`}
            className="border rounded-l py-1 px-2 w-32 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-[#f8f9fa] h-8 rounded-r px-2"
            onClick={handleSearch}
          >
            <FiSearch />
          </button>
        </div>
      )}
      <div className="w-5/6 h-full flex-wrap flex  mx-auto py-10  mb-4">
        {news?.map((item, index) => {
          const { img, header, date } = item;
          return (
            <NewsBox
              key={index}
              _id={item._id}
              twoPictureId={id}
              page={page}
              img={img}
              header={header}
              date={date ? date.slice(0, 10) : ""}
            />
          );
        })}
      </div>
      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New item
        </button>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={
              Components[NewsContainer.name].isPictureContainerImage
            }
            isPictureContainerButton={
              Components[NewsContainer.name].isPictureContainerButton
            }
            isPictureContainerParagraph={
              Components[NewsContainer.name].isPictureContainerParagraph
            }
          />
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsContainer;
