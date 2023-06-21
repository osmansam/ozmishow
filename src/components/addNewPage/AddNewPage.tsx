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
  const [isSubpage, setIsSubpage] = useState(false);
  const [hasSubpage, setHasSubpage] = useState(false);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const [motherPageTR, setMotherPageTR] = useState(pageOptions[0].pageNameTR);
  const [motherPageEN, setMotherPageEN] = useState(pageOptions[0].pageNameEN);
  //reset inputs after submit
  const resetInputs = () => {
    setPageNameEN("");
    setPageNameTR("");
    setIsNavbar(false);
    setIsSubpage(false);
    setHasSubpage(false);
    setMotherPageTR("");
    setMotherPageEN("");
  };
  //handle the submit page
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageNameTR(pageNameTR[0].toUpperCase() + pageNameTR.slice(1));
    setPageNameEN(pageNameEN[0].toUpperCase() + pageNameEN.slice(1));
    if (!isSubpage) {
      setMotherPageEN("");
      setMotherPageTR("");
    }
    await dispatch(
      createPageOptions({
        pageNameEN,
        pageNameTR,
        isNavbar,
        isSubpage,
        hasSubpage,
        motherPageTR,
        motherPageEN,
      })
    );
    resetInputs();
  };
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className="flex flex-col gap-5 w-full ">
        {/* pageName tr */}
        <div>
          <label className="w-32" htmlFor="pageNameTr">
            PageName TR
          </label>
          <input
            className="border-2 w-4/5 rounded-md  capitalize"
            type="text"
            name="pageNameTr"
            value={pageNameTR}
            onChange={(e) => setPageNameTR(e.target.value)}
          />
        </div>
        {/* pagename en */}
        <div>
          <label className="w-32" htmlFor="pageNameEn">
            PageName EN
          </label>
          <input
            className="border-2 w-4/5 rounded-md  capitalize"
            type="text"
            name="pageNameEn"
            value={pageNameEN}
            onChange={(e) => setPageNameEN(e.target.value)}
          />
        </div>
        {/* isNavbar option */}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="isNavbar">
            Navbar
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="navbar-yes"
              name="isNavbar"
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
              name="isNavbar"
              value="false"
              checked={isNavbar === false}
              onChange={() => setIsNavbar(false)}
            />
            <label htmlFor="navbar-no">Hayır</label>
          </div>
        </div>
        {/* isSubpage option */}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="isNavbar">
            SubPage
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="isSubpage-yes"
              name="isSubpage"
              value="true"
              checked={isSubpage === true}
              onChange={() => setIsSubpage(true)}
            />
            <label htmlFor="isSubpage-yes">Evet</label>
          </div>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="isSubpage-no"
              name="isSubpage"
              value="false"
              checked={isSubpage === false}
              onChange={() => setIsSubpage(false)}
            />
            <label htmlFor="isSubpage-no">Hayır</label>
          </div>
        </div>
        {/* hassubpage option */}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="isNavbar">
            HasSubpage
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="hasSubpage-yes"
              name="hasSubpage"
              value="true"
              checked={hasSubpage === true}
              onChange={() => setHasSubpage(true)}
            />
            <label htmlFor="hasSubpage-yes">Evet</label>
          </div>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="hasSubpage-no"
              name="hasSubpage"
              value="false"
              checked={hasSubpage === false}
              onChange={() => setHasSubpage(false)}
            />
            <label htmlFor="hasSubpage-no">Hayır</label>
          </div>
        </div>
        {/* motherPage en */}

        {isSubpage && (
          <div className="flex gap-5 w-full">
            <label className="w-32" htmlFor="page">
              motherPageEN:
            </label>
            <select
              className="border-2 w-4/5 rounded-md"
              name="motherPageEN"
              value={motherPageEN}
              onChange={(e) => setMotherPageEN(e.target.value)}
            >
              {pageOptions.map((option, index) => (
                <option key={index} value={option.pageNameEN}>
                  {option.pageNameEN}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* motherPage tr */}
        {isSubpage && (
          <div className="flex gap-5 w-full">
            <label className="w-32" htmlFor="page">
              motherPageTR:
            </label>
            <select
              className="border-2 w-4/5 rounded-md"
              name="motherPageTR"
              value={motherPageTR}
              onChange={(e) => setMotherPageTR(e.target.value)}
            >
              {pageOptions.map((option, index) => (
                <option key={index} value={option.pageNameTR}>
                  {option.pageNameTR}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* submit */}
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
