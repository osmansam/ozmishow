import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import motion from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const { flexBetween, isTopOfPage } = useSelector(
    (state: RootState) => state.context
  );
  const [isMenuToggled, setIsMenuToggled] = React.useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <nav>
      <div className={`${flexBetween} fixed top-0 z-40 w-full py-8 bg-white`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-32`}>
            {/* LEFT SIDE */}
            <button
              onClick={() => {
                setIsMenuToggled(!isMenuToggled);
              }}
            >
              <Bars3Icon className="h-10 w-10 text-gray-30 font-thin" />
            </button>
            {/* Middle part */}
            <img
              src="https://images.wondershare.com/mockitt/examples/common-logo.jpg"
              alt="logo"
              className="h-20 w-20"
            />
            {/* Right part */}
            <button className="border border-solid border-gray-30 text-gray-30 text-lg w-64 h-12 font-thin ">
              <BsArrowRight />
              Enquire now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
