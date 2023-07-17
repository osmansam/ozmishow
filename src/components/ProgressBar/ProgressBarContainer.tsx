import React, { lazy } from "react";
import { ProgressBarContainerType } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  updateProgressBar,
  resetTwoPictureArray,
} from "../../features/twoPicture/twoPictureSlice";

const ProgressBar = lazy(() => import("./ProgressBar"));
const AddProgressBar = lazy(() => import("./AddProgressBar"));

const ProgressBarContainer = ({
  id,
  mainHeader,
  progressBarArray,
}: ProgressBarContainerType) => {
  const [isAddProgressBar, setIsAddProgressBar] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
  //handle create new progressBar item
  const handleCreate = async () => {
    await dispatch(updateProgressBar({ container: twoPictureArray, id }));
    setIsAddProgressBar(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-3">
      {/* mainHeader */}
      <h1
        className="w-5/6 mx-auto flex justify-start font-[700] text-4xl leading-[44px] pb-3"
        style={{ color: "#333333" }}
      >
        {mainHeader}
      </h1>
      <div className="flex flex-wrap w-5/6 mx-auto pb-6">
        {progressBarArray.map((progressBar, index) => {
          const { header, percentage } = progressBar;
          return (
            <ProgressBar
              key={index}
              header={header ? header : ""}
              percentage={percentage ? percentage : 0}
            ></ProgressBar>
          );
        })}
      </div>
      {/* Button to add new item */}
      {!isAddProgressBar && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2  mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddProgressBar(true)}
        >
          Add New item
        </button>
      )}
      {isAddProgressBar && isAdmin && (
        <div className="w-full mx-auto">
          <AddProgressBar
            isPictureContainerImage={false}
            isPictureContainerButton={false}
            isPictureContainerParagraph={false}
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

export default ProgressBarContainer;
