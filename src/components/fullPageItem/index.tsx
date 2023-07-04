import React from "react";
import { FullPageItemType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import {
  updateContainer,
  resetTwoPictureArray,
} from "../../features/twoPicture/twoPictureSlice";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
type Props = {};

const FullPageItem = ({
  mainMainHeader,
  fullPageItemArray,
  id,
}: FullPageItemType) => {
  const dispatch = useAppDispatch();
  const [isAddNewItem, setIsAddNewItem] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );

  const handleCreate = async () => {
    dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  return (
    <div className="w-5/6 lg:w-4/5  mx-auto my-auto h-full py-10">
      <h1
        className="font-[700] text-4xl leading-[44px] pb-4"
        style={{ color: "#333333" }}
      >
        {mainMainHeader}
      </h1>
      {fullPageItemArray.map((fullPageItem, index) => {
        const { header, paragraphs, buttons, img, _id } = fullPageItem;
        return (
          <div key={index} className="w-full">
            {img && (
              <img
                src={img}
                alt={header}
                className="w-full md:w-5/6 mx-auto lg:h-80 sm:h-60"
              />
            )}
            <h1
              className="text-lg font-semibold leading-6 py-4"
              style={{ color: "#333333" }}
            >
              {header}
            </h1>
            {paragraphs?.map((paragraph, index) => (
              <p
                key={index}
                className="font-normal leading-6 py-2"
                style={{ color: "#333333" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        );
      })}
      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New Item
        </button>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={false}
            isPictureContainerButton={true}
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

export default FullPageItem;
