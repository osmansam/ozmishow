import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { LanguageOptions, PageOptionsType } from "../../shared/types";
import {
  setLanguage,
  setIsSidebarOpen,
} from "../../features/context/contextSlice";
import {
  getNavbar,
  deletePage,
} from "../../features/twoPicture/twoPictureSlice";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

// import { AiOutlineDown } from "react-icons/ai";

type Props = {
  currentPage?: PageOptionsType;
};

const Navbar = ({ currentPage }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState("");

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
  const renderSubpages = (page: string) => {
    return pageOptions.filter(
      (item) => item.motherPageEN === page || item.motherPageTR === page
    );
  };
  const { isAdmin } = useSelector((state: RootState) => state.context);

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
                  <div
                    key={index}
                    onMouseOver={() => setIsHover(page._id)}
                    onMouseOut={() => setIsHover("")}
                  >
                    <div className="flex flex-row">
                      <li
                        className={`p-2 m-2 mt-4 w-fit flex items-center mx-auto uppercase cursor-pointer hover:underline ${
                          (currentPage?.pageNameEN === page.pageNameEN ||
                            currentPage?.motherPageEN === page.pageNameEN) &&
                          "bg-[#9f000f] text-white rounded-md hover:no-underline justify-center"
                        }`}
                        onClick={() => {
                          if (!page.hasSubpage) {
                            navigate(`/${page.pageNameEN}`);
                          }
                        }}
                      >
                        {language === LanguageOptions.EN
                          ? page.pageNameEN
                          : page.pageNameTR}
                      </li>
                      {isAdmin && (
                        <AiOutlineDelete
                          className="w-6 h-6 my-auto mt-3 cursor-pointer hover:text-[#e1241b]"
                          onClick={async () => {
                            await dispatch(deletePage(page._id));
                            window.location.reload();
                          }}
                        />
                      )}
                    </div>

                    {isHover === page._id && page.hasSubpage && (
                      <div className="flex flex-col ">
                        {(() => {
                          const subpages = renderSubpages(page.pageNameEN);
                          return (
                            <ul
                              className=" z-50 bg-[#f9f9f9] px-4"
                              onMouseOver={() => setIsHover(page._id)}
                            >
                              {subpages.map((subpage, index) => (
                                <li
                                  key={index}
                                  className="flex  justify-start py-2 pr-5 pl-2 cursor-pointer text-[#a7a7a7]  leading-5 font-[400] hover:text-[#e1241b]"
                                  onClick={() => {
                                    if (!subpage.hasSubpage) {
                                      navigate(`/${subpage.pageNameEN}`);
                                    }
                                  }}
                                >
                                  {language === LanguageOptions.EN
                                    ? subpage.pageNameEN
                                    : subpage.pageNameTR}
                                </li>
                              ))}
                            </ul>
                          );
                        })()}
                      </div>
                    )}
                  </div>
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
