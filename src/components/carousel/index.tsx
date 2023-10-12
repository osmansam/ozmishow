import React, { useState } from "react";
import AddCarousel from "./AddCarousel";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { CarouselType } from "../../shared/types";
import {
  updateExplanationBar,
  resetTwoPictureArray,
  getPageTwoPictures,
} from "../../features/twoPicture/twoPictureSlice";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import SinglePicture from "./SinglePicture";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";

const Carousel = ({
  mainMainHeader,
  carouselArray,
  componentStyle,
  id,
  page,
}: CarouselType) => {
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
    dispatch(getPageTwoPictures(page ?? ""));
  };
  const carouselWidth = carouselArray.length * 466;
  return (
    <div className="py-10 flex flex-col items-center" style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          // buraya componentTYpe gelecek
          currentType="type1"
          isComponentType={false}
        />
      </div>
      {/* mainHeader */}
      <div className="w-5/6 mx-auto mb-4">
        <h1
          className="text-3xl font-bold  ml-4 w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
          style={mainMainHeader?.style}
        >
          {mainMainHeader?.content}
          <StyleModalContainer
            styleData={mainMainHeader}
            twoPictureId={id ?? ""}
            componentId={""}
            contentContainerType="mainHeader"
            isContentSend={true}
            type="mainMainHeader"
          />
        </h1>
      </div>

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
