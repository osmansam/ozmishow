import React, { useState } from "react";
import AddCarousel from "./AddCarousel";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { CarouselType } from "../../shared/types";
import {
  updateExplanationBar,
  resetTwoPictureArray,
  deleteItemInContainer,
} from "../../features/twoPicture/twoPictureSlice";
import { style } from "../../shared/types";
import SinglePicture from "./SinglePicture";

const Carousel = ({ mainMainHeader, carouselArray, id }: CarouselType) => {
  const dispatch = useAppDispatch();
  const [isAddCarousel, setIsAddCarousel] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );

  //handle create new carousel item
  const handleCreate = async () => {
    await dispatch(updateExplanationBar({ container: twoPictureArray, id }));
    setIsAddCarousel(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  const carouselWidth = carouselArray.length * 466;
  return (
    <div className="py-10 flex flex-col items-center">
      {/* mainHeader */}
      <h1 className="text-3xl font-bold p-4 ml-4 ">
        {mainMainHeader?.content}
      </h1>

      {/* carousel */}
      <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
        <ul className={`w-[${carouselWidth}px] whitespace-nowrap`}>
          {carouselArray.map((carouselItem, index) => (
            <SinglePicture
              key={index}
              _id={id}
              img={carouselItem?.img}
              header={carouselItem?.header}
              paragraphs={carouselItem?.paragraphs}
              index={index}
            />
          ))}
        </ul>
      </div>
      {/* Button to add new item */}
      {!isAddCarousel && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2  mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddCarousel(true)}
        >
          Add New item
        </button>
      )}
      {isAddCarousel && isAdmin && (
        <div className="w-full mx-auto">
          <AddCarousel
            isPictureContainerImage={true}
            isPictureContainerButton={false}
            isPictureContainerParagraph={true}
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

export default Carousel;
