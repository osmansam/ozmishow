import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { motion } from "framer-motion";
import { CollectionType } from "../../shared/types";
import Collection from "./Collection";
import HText from "../../shared/Htext";
import Ptext from "../../shared/Ptext";

const collections: Array<CollectionType> = [
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/8516/8122/3198/Ultima_Gstaad_Exterior_Summer_Season-5_Easy-Resize.com.jpg",
    country: "Switzerland",
    header: "Ultima Gstaad",
    rooms: "1-4",
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/3516/8122/3504/Ultima_Crans-Montana_Aerial_View_during_the_Summer-7_Easy-Resize.com.jpg",
    country: "Switzerland",
    header: "Ultima Crans-Montana",
    rooms: "16",
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/8316/8122/3393/Ultima_Megeve_Surrounded_by_Verdant_Wilds_Exterior_Chalets-3_Easy-Resize.com-2.jpg",
    country: "France",
    header: "Ultima Megève",
    rooms: "8",
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/6016/5841/0637/UTLIMA_CORFU_-_PART_DRONE_-_MAI_2022_igor_laski_web_hd_srvb-54.jpg",
    country: "Greece",
    header: "Ultima Corfu",
    rooms: "6",
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/4316/7662/8469/7_-_Ultima_Geneva_Grand_Villa_Easy-Resize.com.jpg",
    country: "Switzerland",
    header: "Ultima Geneva Grand Villa",
    rooms: "9",
  },
  {
    img: "https://www.ultimacollection.com/application/files/thumbnails/collections_thumb_retina/6916/7656/2119/On_The_Slope_Exterior_Shot_Ultima_Courchevel_Belvedere_Easy-Resize.com.jpg",
    country: "France",
    header: "Ultima Courchevel Belvedere",
    rooms: "4-5",
  },
];
const Collections = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [scroll, setScroll] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerWidth = 460 * collections.length;

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
    <div className="bg-collections-background ">
      <div className="flex  justify-center w-5/6 pt-10 mx-auto h-full md:justify-between  ">
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
            <HText>The Collection</HText>
          </div>

          <Ptext>
            Our ultra-luxury private residences include villas, ski chalets and
            spas, as well as a 5-star superior hotel. Each one is chosen for its
            unique character and is designed impeccably in the signature Ultima
            style. Browse our growing portfolio of destinations below.
          </Ptext>
        </motion.div>
      </div>
      <div
        ref={containerRef}
        className="mx-20 mt-20 h-[400px] mx-auto w-5/6 overflow-x-auto overflow-y-hidden scrollbar-hide"
      >
        <ul className={`w-[${scrollContainerWidth}px] whitespace-nowrap`}>
          {collections.map((collection, index) => (
            <Collection
              key={index}
              img={collection.img}
              country={collection.country}
              header={collection.header}
              rooms={collection.rooms}
            />
          ))}
        </ul>
        {/* underline */}
        {isAboveMediumScreens && (
          <div
            className="h-[0.9px] my-4 w-5/6 mx-auto bg-scroll-gray mt-8"
            style={{ position: "sticky", top: 0, left: 50 }}
          >
            <div
              className={`bg-scroll-yellow h-full float-left`}
              style={{ width: `${(scroll / collections.length) * 100}%` }}
            ></div>
          </div>
        )}
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
            disabled={scroll === collections.length}
          >
            Right
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collections;
