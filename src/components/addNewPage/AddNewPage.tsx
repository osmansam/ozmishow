import React, { useState } from "react";
import { createPageOptions } from "../../features/twoPicture/twoPictureSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
type Props = {};

const AddNewPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [pageNameTR, setPageNameTR] = useState("");
  const [pageNameEN, setPageNameEN] = useState("");
  const [isNavbar, setIsNavbar] = useState(false);
  //reset inputs after submit
  const resetInputs = () => {
    setPageNameEN("");
    setPageNameTR("");
    setIsNavbar(false);
  };
  //handle the submit page
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageNameTR(pageNameTR[0].toUpperCase() + pageNameTR.slice(1));
    setPageNameEN(pageNameEN[0].toUpperCase() + pageNameEN.slice(1));
    await dispatch(createPageOptions({ pageNameEN, pageNameTR, isNavbar }));
    resetInputs();
  };
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className="flex flex-col gap-5 w-full ">
        <div>
          <label className="w-32" htmlFor="header">
            PageName TR
          </label>
          <input
            className="border-2 w-4/5 rounded-md  capitalize"
            type="text"
            name="header"
            value={pageNameTR}
            onChange={(e) => setPageNameTR(e.target.value)}
          />
        </div>
        <div>
          <label className="w-32" htmlFor="header">
            PageName EN
          </label>
          <input
            className="border-2 w-4/5 rounded-md  capitalize"
            type="text"
            name="header"
            value={pageNameEN}
            onChange={(e) => setPageNameEN(e.target.value)}
          />
        </div>
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="header">
            Navbar
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="navbar-yes"
              name="navbar"
              value="true"
              checked={isNavbar === true}
              onChange={() => setIsNavbar(true)}
            />
            <label htmlFor="navbar-yes">Evet</label>
          </div>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="navbar-no"
              name="navbar"
              value="false"
              checked={isNavbar === false}
              onChange={() => setIsNavbar(false)}
            />
            <label htmlFor="navbar-no">Hayır</label>
          </div>
        </div>
        <button
          type="submit"
          className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewPage;
