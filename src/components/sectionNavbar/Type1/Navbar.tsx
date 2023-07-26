import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "./Link";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import {
  setSelectedSection,
  setIsTopOfPage,
} from "../../../features/context/contextSlice";
import classNames from "classnames";

import useMediaQuery from "../../../hooks/UseMediaQuery";

interface Props {
  links: string[];
}
const Navbar = ({ links }: Props) => {
  const dispatch = useAppDispatch();
  const { flexBetween, isTopOfPage } = useSelector(
    (state: RootState) => state.context
  );

  const navbarBackground = classNames({
    "bg-white text-black": !isTopOfPage,
    "bg-black transition-colors duration-500 ease-in-out": isTopOfPage,
    "bg-black": isTopOfPage,
    "text-white": isTopOfPage,
    "drop-shadow": !isTopOfPage,
    "shadow-sm": isTopOfPage,
  });

  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  return (
    <nav>
      <div
        className={`${navbarBackground} flex justify-between  fixed top-0 z-40 w-full py-6  `}
      >
        <div className={` flex justify-between  mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            {/* name surname */}
            <h1>osman erdogan</h1>
            {/* RIGHT SIDE */}

            <div className={`${flexBetween}  hidden md:flex `}>
              <div className={`${flexBetween} gap-8 text-sm`}>
                {links.map((link) => (
                  <Link page={link} />
                ))}
              </div>
            </div>

            <button
              className="rounded-full bg-secondary-500 p-2 md:hidden"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              {!isMenuToggled && (
                <Bars3Icon
                  className={`h-6 w-6 ${
                    isTopOfPage ? "text-white" : "text-black"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[200px] text-center bg-transparent  drop-shadow-xl md:hidden">
          {/* CLOSE ICON */}
          <div className="flex justify-end px-12 py-6">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className=" flex flex-col h-full gap-10 text-2xl py-8 bg-white overflow-y-auto no-scrollbar">
            {links.map((link) => (
              <Link page={link} />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
