import React, { lazy } from "react";
import { ResumeBoxContainerType } from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  updateResumeBox,
  resetTwoPictureArray,
} from "../../features/twoPicture/twoPictureSlice";

const ResumeBox = lazy(() => import("./ResumeBox"));
const AddResumeBox = lazy(() => import("./AddResumeBox"));

const ResumeBoxContainer = ({
  id,
  mainHeader,
  resumeBoxArray,
}: ResumeBoxContainerType) => {
  const [isAddResumeBox, setIsAddResumeBox] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
  //handle create new resumeBox item
  const handleCreate = async () => {
    await dispatch(updateResumeBox({ container: twoPictureArray, id }));
    setIsAddResumeBox(false);
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
      {/* resume Box container */}
      <div className="flex flex-wrap w-5/6 mx-auto pb-6">
        {resumeBoxArray.map((resumeBox, index) => {
          const { header, year1, year2, paragraph, university } = resumeBox;
          return (
            <ResumeBox
              key={index}
              index={index}
              header={header}
              year1={year1}
              year2={year2}
              paragraph={paragraph}
              university={university}
              _id={id}
            ></ResumeBox>
          );
        })}
      </div>
      {/* Button to add new item */}
      {!isAddResumeBox && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2  mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddResumeBox(true)}
        >
          Add New item
        </button>
      )}
      {isAddResumeBox && isAdmin && (
        <div className="w-full mx-auto">
          <AddResumeBox />
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

export default ResumeBoxContainer;
