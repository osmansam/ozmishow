import React, { useState } from "react";
import { NewsContainerType } from "../../shared/types";
import NewsBox from "./NewsBox";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
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
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const handleCreate = async () => {
    dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  const [isAddNewItem, setIsAddNewItem] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      <div className="w-5/6 h-full flex-wrap flex  mx-auto py-10  mb-4">
        {newsArray.map((news, index) => {
          const { img, header, date } = news;
          return (
            <NewsBox
              key={index}
              _id={news._id}
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
