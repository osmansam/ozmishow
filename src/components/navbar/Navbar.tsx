import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { LanguageOptions } from "../../shared/types";
import {
  setLanguage,
  setIsSidebarOpen,
} from "../../features/context/contextSlice";
import { getNavbar } from "../../features/twoPicture/twoPictureSlice";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {
  currentPage: string;
};

const Navbar = ({ currentPage }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pageOptions, logo } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  //   get the logo
  useEffect(() => {
    dispatch(getNavbar());
  }, [dispatch]);
  return (
    <nav className="h-60 flex flex-col ">
      {/* logo and language options  */}
      <div className="w-5/6 flex flex-row justify-between mx-auto">
        {/* logo */}
        <div className="w-1/3">
          <img
            className="py-2 cursor-pointer h-36"
            src={logo ? logo : "https://via.placeholder.com/150"}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        {/* language options */}
        <ul className="flex flex-row">
          {Object.values(LanguageOptions).map((option, index) => (
            <li
              key={index}
              className={` h-8 flex items-center rounded-md p-2 mt-4 ${
                option === language && "bg-[#9f000f] text-white "
              }`}
              onClick={() => dispatch(setLanguage(option))}
            >
              {option.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
      {/* links  */}
      <div>
        {/* button */}
        <div className="w-5/6 mx-auto flex justify-end">
          <FaBars
            className="w-8 h-6 my-auto mt-3 lg:hidden cursor-pointer"
            onClick={() => {
              dispatch(setIsSidebarOpen(!isSidebarOpen));
            }}
          />
        </div>
        {/* links */}
        <div className="hidden lg:block">
          <ul className="w-3/4 flex flex-row justify-between mx-auto flex-wrap ">
            {" "}
            {pageOptions.map(
              (page, index) =>
                page.isNavbar && (
                  <li
                    key={index}
                    className={`p-2 m-2 mt-4 uppercase cursor-pointer hover:underline ${
                      currentPage === page.pageName &&
                      "bg-[#9f000f] text-white rounded-md hover:no-underline"
                    }`}
                    onClick={() => navigate(`/${page.pageName}`)}
                  >
                    {page.pageName}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>

      <div></div>
    </nav>
  );
};

export default Navbar;
