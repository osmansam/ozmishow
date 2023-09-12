import React, { lazy } from "react";
import {
  ProgressBarContainerType,
  ResumeIconContainerType,
} from "../../shared/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  updateProgressBar,
  resetTwoPictureArray,
} from "../../features/twoPicture/twoPictureSlice";
import AddResumeIcon from "./AddResumeIcon";

const ResumeIcon = lazy(() => import("./ResumeIcon"));

const ResumeIconContainer = ({
  id,
  mainHeader,
  resumeIconArray,
}: ResumeIconContainerType) => {
  const [isAddResumeIcon, setIsAddResumeIcon] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
  //handle create new progressBar item
  const handleCreate = async () => {
    await dispatch(updateProgressBar({ container: twoPictureArray, id }));
    setIsAddResumeIcon(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-3 py-10">
      {/* mainHeader */}
      <h1
        className="w-5/6 mx-auto flex justify-start font-[700] text-4xl leading-[44px] pb-3"
        style={{ color: "#333333" }}
      >
        {mainHeader}
      </h1>
      <div className="flex flex-wrap w-5/6 mx-auto pb-6">
        {resumeIconArray.map((resumeIcon, index) => {
          const { header, icon, paragraph } = resumeIcon;
          return (
            <ResumeIcon
              index={index}
              key={index}
              header={header}
              icon={icon ?? ""}
              paragraph={paragraph}
              _id={id}
            ></ResumeIcon>
          );
        })}
      </div>
      {/* Button to add new item */}
      {!isAddResumeIcon && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2  mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddResumeIcon(true)}
        >
          Add New item
        </button>
      )}
      {isAddResumeIcon && isAdmin && (
        <div className="w-full mx-auto">
          <AddResumeIcon />
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

export default ResumeIconContainer;
