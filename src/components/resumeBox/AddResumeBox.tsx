import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setTwoPictureArray } from "../../features/twoPicture/twoPictureSlice";
import { ButtonType } from "../../shared/types";

const AddResumeBox = () => {
  const { twoPictureArray, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [img, setImg] = useState("");
  const [year1, setYear1] = useState("");
  const [year2, setYear2] = useState("");
  const [header, setHeader] = useState("");
  const [university, setUniversity] = useState("");
  const [paragraph, setParagraph] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTwoPictureArray = {
      year1: year1,
      year2: year2,
      header: header,
      university: university,
      paragraph: paragraph,
    };
    dispatch(setTwoPictureArray(newTwoPictureArray));
    setYear1("");
    setYear2("");
    setHeader("");
    setUniversity("");
    setParagraph("");
    setAllDone(true);
  };

  return (
    <div className="w-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center h-full w-5/6  mx-auto gap-2 rounded-md py-4 px-8 border-4"
      >
        {/* header */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="header">
            Header :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </div>
        {/* year1 */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="year1">
            Year1 :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="year1"
            value={year1}
            onChange={(e) => setYear1(e.target.value)}
          />
        </div>
        {/* year2 */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="year2">
            Year2 :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="year2"
            value={year2}
            onChange={(e) => setYear2(e.target.value)}
          />
        </div>
        {/* university */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="university">
            University :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>
        {/* paragraph */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="paragraph">
            Paragraph :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          />
        </div>
        {/* submit */}
        <button
          type="submit"
          className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddResumeBox;
