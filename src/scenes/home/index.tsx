import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { motion } from "framer-motion";
import HText from "../../shared/Htext";
import Ptext from "../../shared/Ptext";
import ImageBox from "../../shared/ImageBox";
import { ImageBoxType } from "../../shared/types";
const Home = () => {
  const dispatch = useAppDispatch();
  const { flexBetween, isTopOfPage } = useSelector(
    (state: RootState) => state.context
  );

  const aboutUsImage: Array<ImageBoxType> = [
    {
      img: "https://www.ultimacollection.com/application/files/8816/2189/5483/1_-_Why_Ultima_Collection_.jpg",
      header: "Why Ultima Collection",
      description:
        "Wherever in the world you’re exploring, if there’s Ultima’s name on the door, you can expect our signature services and exceptionally high standards.",
    },
    {
      img: "https://www.ultimacollection.com/application/files/4516/5841/0364/ULTIMA_GSTAAD_-_DEC_2020_-_IGOR_LASKI_PHOTOGRAPHIE_-_web_hd_srvb-296.jpg",
      header: "Our Roots ",
      description:
        "Many of you will know us from our beginnings at Ultima Gstaad: our award-winning, 5-star superior hotel in Switzerland. Now, we’re found in exclusive destinations across Europe.",
    },
    {
      img: "https://www.ultimacollection.com/application/files/4016/5841/0372/Event_Set-up_Ultima_Megeve.jpeg",
      header: "Sustainable Living ",
      description:
        "A tree is planted for every night you stay with us. Plus, you will find biodegradable and sustainable materials used throughout. Ultima’s properties enhance natural habitats and never disrupt them.",
    },
  ];
  return (
    <div className="bg-white">
      <div className="flex  justify-center w-5/6 mx-auto h-full md:justify-between mt-20 ">
        <motion.div
          className=" md:basis-1/2 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className=" flex justify-between pr-8 mt-28 mb-8">
            <HText>
              Step Into the World of{" "}
              <span className="text-yellow-20">Ultima Collection</span>
            </HText>
          </div>
          <Ptext>
            Rejuvenating at your own wellness retreat in the Swiss Alps, skiing
            from your own serviced chalet in France, or savouring each second on
            your villa’s private dock in the Mediterranean. Our secluded escapes
            are designed to feel like home.
          </Ptext>
          <Ptext>
            Look beyond our highly curated ski chalets, retreats, spas and
            villas and you’ll find a collection of people with an unwavering set
            of standards.
          </Ptext>
          <Ptext>
            Your in-house team will be there to offer highly personalised
            experiences in utter comfort and privacy. This is life savoured to
            the fullest.
          </Ptext>
        </motion.div>
      </div>
      {/* Image Area */}
      <div>
        <motion.div
          className="flex justify-between w-5/6 mx-auto  h-full mt-20 flex-col md:flex-row pb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            staggerChildren: 0.1,
          }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {aboutUsImage.map((item: ImageBoxType, index) => (
            <ImageBox
              key={index}
              img={item.img}
              header={item.header}
              description={item.description}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
