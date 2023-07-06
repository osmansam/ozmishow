import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { SliderType } from "../../shared/types";
import AddSliderItem from "./AddSliderItem";
import {
  updateSlider,
  resetTwoPictureArray,
  deleteItemInContainer,
} from "../../features/twoPicture/twoPictureSlice";

const Slider = ({ mainMainHeader, sliderArray, id }: SliderType) => {
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [isAddSlider, setIsAddSlider] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );

  useEffect(() => {
    const lastIndex = sliderArray.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, sliderArray.length]);

  const handlePrev = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? sliderArray.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex === sliderArray.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  const handleCreate = async () => {
    await dispatch(updateSlider({ container: twoPictureArray, id }));
    setIsAddSlider(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };

  const currentSlide = sliderArray[index];
  const { img, header, name, lastName, paragraphs, title } = currentSlide;

  return (
    <div className="py-10 flex flex-col items-center w-full">
      <div className="flex flex-col border-2 w-5/6 lg:w-2/3">
        <div className="relative flex justify-center items-center">
          <div className="radius-ball absolute top-1/2  ml-3 transform translate-y-[-50%] w-40 h-40 rounded-full bg-blue-400 z-0"></div>
          <img src={img} alt={header} className="w-40 h-40 rounded-full z-10" />
          {/* <FaQuoteRight className="z-40" /> */}
        </div>

        <h2 className="text-2xl leading-7 font-[500] text-center text-[#212529] capitalize p-2">
          {name + "  " + lastName}
        </h2>
        <p className="text-center text-[#212529] font-[400] leading-6">
          {title}
        </p>
        <p className="mb-2">{`${name} ${lastName}`}</p>
        {paragraphs?.map((paragraph, index) => (
          <p
            key={index}
            className=" font-[400] leading-6"
            style={{ color: "#333333" }}
          >
            {paragraph}
          </p>
        ))}
        <div className="flex justify-center items-center">
          <button
            className="prev text-xl text-primary-7 border-0 bg-transparent text-[#99d0fa]"
            onClick={handlePrev}
          >
            <FiChevronLeft />
          </button>
          <button
            className="next text-xl text-primary-7 border-0 bg-transparent  text-[#99d0fa]"
            onClick={handleNext}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {!isAddSlider && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2  mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddSlider(true)}
        >
          Add New Item
        </button>
      )}

      {isAddSlider && isAdmin && (
        <div>
          <AddSliderItem
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

export default Slider;
