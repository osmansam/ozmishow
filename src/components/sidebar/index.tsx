import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setIsSidebarOpen } from "../../features/context/contextSlice";
import { getNavbar } from "../../features/twoPicture/twoPictureSlice";
import { useNavigate } from "react-router-dom";

type Props = { currentPage: string };

const Sidebar = ({ currentPage }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.context?.isSidebarOpen || false
  );
  const { pageOptions, logo } = useSelector(
    (state: RootState) => state.twoPicture
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        dispatch(setIsSidebarOpen(false));
      }
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup by removing event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  //   get the logo
  useEffect(() => {
    dispatch(getNavbar());
  }, [dispatch]);
  return (
    <div className="z-40">
      <div className={`${isSidebarOpen ? "" : "hidden"}  z-30`}>
        <div
          className={`${
            isSidebarOpen ? "" : "hidden"
          } lg:hidden fixed top-0  w-full h-full z-10`}
          onClick={() => dispatch(setIsSidebarOpen(false))}
        ></div>
        <div className="w-[250px] lg:w-1/6 h-screen bg-[#343a3b] fixed flex flex-col z-50">
          <div className="mx-auto ">
            <img
              className="py-2 cursor-pointer rounded-xl h-36 bg-[#343a3b] "
              src={logo ? logo : "https://via.placeholder.com/150"}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <ul className="w-3/4 flex flex-col justify-between mx-auto flex-wrap pt-4 ">
            {" "}
            {pageOptions.map(
              (page, index) =>
                page.isNavbar && (
                  <li
                    key={index}
                    className={` pl-4 py-2 m-2  text-white uppercase cursor-pointer hover:underline ${
                      currentPage === page.pageName &&
                      "bg-[#9f000f] text-black rounded-md hover:no-underline"
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
    </div>
  );
};

export default Sidebar;
