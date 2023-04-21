import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { motion } from "framer-motion";
import { PressType } from "../../shared/types";
import HText from "../../shared/Htext";
import PressImage from "./PressImage";
const presses: Array<PressType> = [
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/8516/8122/3198/Ultima_Gstaad_Exterior_Summer_Season-5_Easy-Resize.com.jpg",
    description:
      '"At the sunniest point of the resort, Ultima Courchevel Belvédère seems straight out of a dream"',
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/8516/8122/3198/Ultima_Gstaad_Exterior_Summer_Season-5_Easy-Resize.com.jpg",
    description:
      '"Ultima press takes the home away from home concept to luxurious new heights"',
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/8516/8122/3198/Ultima_Gstaad_Exterior_Summer_Season-5_Easy-Resize.com.jpg",
    description: '"Ultima press unfolds the ultra-luxury side of the Alps"',
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/8516/8122/3198/Ultima_Gstaad_Exterior_Summer_Season-5_Easy-Resize.com.jpg",
    description:
      '"Ultima press takes the home away from home concept to luxurious new heights"',
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/8516/8122/3198/Ultima_Gstaad_Exterior_Summer_Season-5_Easy-Resize.com.jpg",
    description:
      '"Ultima press takes the home away from home concept to luxurious new heights"',
  },
];

const Press = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [scroll, setScroll] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerWidth = 460 * presses.length;
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
          transition={{ duration: 1.5 }}
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
      <div
        ref={containerRef}
        className="mx-20 mt-20 h-[400px] mx-auto w-5/6 overflow-x-auto overflow-y-hidden scrollbar-hide"
      >
        <ul className={`w-[${scrollContainerWidth}px] whitespace-nowrap`}>
          {presses.map((press, index) => (
            <PressImage
              key={index}
              img={press.img}
              description={press.description}
              header={press.header}
            />
          ))}
        </ul>

        {/* button */}
        <div
          className="m-4 h-10 border-2 rounded-3xl w-24 z-40 flex justify-between bg-scroll-back"
          style={{
            position: "sticky",
            bottom: 250,
            left: scrollPosition,
          }}
        >
          <button
            className=" mr-2"
            onClick={() => {
              handleScroll(-450);
              setScroll(scroll - 1);
            }}
            disabled={scroll === 1}
          >
            Left
          </button>
          <button
            onClick={() => {
              handleScroll(450);
              setScroll(scroll + 1);
            }}
            disabled={scroll === presses.length}
          >
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

export default Press;
