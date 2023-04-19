import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { motion } from "framer-motion";
import { PressType } from "../../shared/types";
import HText from "../../shared/Htext";

const presses: Array<PressType> = [
  {
    img: "https://www.ultimacollection.com/application/files/7016/4147/1350/ULTIMA_-_COURCHEVEL_Drone_-_DECEMBER_2021_-_IGOR_LASKI_web_hd_srvb-9.jpg",
    description:
      '"At the sunniest point of the resort, Ultima Courchevel Belvédère seems straight out of a dream"',
  },
];

const Press = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [scroll, setScroll] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  //setScrollPosition based on width
  useEffect(() => {
    setScroll(1);
    setScrollPosition((window.innerWidth * 3) / 4);
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setScrollPosition((window.innerWidth * 3) / 4);
      } else if (window.innerWidth >= 768) {
        setScrollPosition((window.innerWidth * 1.8) / 3);
      } else {
        setScrollPosition((window.innerWidth * 3) / 5);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //prevents the x scroll with mouse
  useEffect(() => {
    const handleScroll = (event: any) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="bg-white">
      <div className="flex  justify-center w-5/6 mx-auto h-full md:justify-between  ">
        <motion.div
          className=" md:basis-3/5 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <div className="mb-8 mt-28 mx-auto ">
            <HText>
              In The <span className="text-yellow-20">Press</span>
            </HText>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Press;
