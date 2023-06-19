import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";
import { FreqAskedType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
import {
  updateContainer,
  resetTwoPictureArray,
  deleteItemInContainer,
} from "../../features/twoPicture/twoPictureSlice";

const FreqAsked = ({ freqAskedArray, id }: FreqAskedType) => {
  const [selection, setSelection] = useState(-1);
  const [isAddNewItem, setIsAddNewItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();

  const handleCreate = async () => {
    dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const freqAskedContainer = document.getElementById("freqAskedContainer");
      if (
        freqAskedContainer &&
        !freqAskedContainer.contains(event.target as Node)
      ) {
        setSelection(-1);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-4/5 mx-auto  my-auto h-full py-10  px-4 cursor-pointer"
      id="freqAskedContainer"
    >
      {freqAskedArray.map((freqAsked, index) => {
        const { header, paragraphs, buttons, _id } = freqAsked;
        return (
          <div key={index} onClick={() => setSelection(index)}>
            <h1 className="font-[500] pt-2 px-4">{header}</h1>
            {selection === index && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: selection === index ? "auto" : 0 }}
                transition={{ duration: 0.5 }}
              >
                {paragraphs?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-[400] leading-6 px-4 pt-2"
                    style={{ color: "#333333" }}
                  >
                    {paragraph}
                  </p>
                ))}
                {buttons &&
                  buttons.map((button, index) => (
                    <div className="mt-4 px-4 " key={index}>
                      <ButtonUnderline
                        text={button.buttonName}
                        buttonLink={button.buttonLink}
                        textColor="black"
                        underlineColorBefore="#e5e5e5"
                        underlineColorAfter="#414141"
                      />
                    </div>
                  ))}
              </motion.div>
            )}
            {isAdmin && (
              <button
                className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
                onClick={async () => {
                  try {
                    await dispatch(
                      deleteItemInContainer({
                        id,
                        itemId: _id ?? "",
                      })
                    );
                    // window.location.reload();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Delete
              </button>
            )}
            {/* Underline color #e2e2e2 */}
            <div className="mx-auto h-px mt-4 font-[700] bg-freqUnderline"></div>
          </div>
        );
      })}

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

export default FreqAsked;
