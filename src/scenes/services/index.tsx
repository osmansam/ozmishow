import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import useMediaQuery from "../../hooks/UseMediaQuery";
import { motion } from "framer-motion";
import HText from "../../shared/Htext";
import Ptext from "../../shared/Ptext";
import ImageBox from "../../shared/ImageBox";
import { ImageBoxType } from "../../shared/types";

const Services = () => {
  const dispatch = useAppDispatch();
  const { flexBetween, isTopOfPage } = useSelector(
    (state: RootState) => state.context
  );
  const services: Array<ImageBoxType> = [
    {
      img: "https://www.ultimacollection.com/application/files/thumbnails/service_thumb_retina/1116/5839/0900/Private_Concierge_Services_-_Homepage.jpg",
      header: "Private Concierge ",
      description:
        "Helicopter transfers, Michelin star chefs and 24/7 service staff can be arranged by our in-house teams to personalise each experience. Consider it handled, however spontaneous the idea.",
    },
    {
      img: "https://www.ultimacollection.com/application/files/thumbnails/service_thumb_retina/5716/6599/7996/Health_-_Home_Page_UC.jpg",
      header: "Health & Wellness ",
      description:
        "Indulge in personalised treatments with state-of-the-art amenities and lifestyle wellness treatments at our leading Swiss clinic and renowned spas. ",
    },
    {
      img: "https://www.ultimacollection.com/application/files/thumbnails/service_thumb_retina/6016/5512/1368/Homepage_-_Tailored_Services.jpg",
      header: "Tailored Experiences & Events  ",
      description:
        "We can map-out the perfect day for your group based on your interests. Be it for business or pleasure. After all, no-one knows these locations like we do.",
    },
  ];
  return (
    <div className="bg-white-10 ">
      <div className="flex justify-between w-5/6 mx-auto h-full">
        <motion.div
          className=" basis-3/5 "
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
              Ultima <span className="text-yellow-20">Signature Services</span>
            </HText>
          </div>

          <Ptext>
            We’re known for our world-class service, surpassing ‘luxury’ to
            offer highly personalised experiences in utter seclusion. Not only
            do we get to know and anticipate your needs, but we’ll delight you
            with surprises along the way.
          </Ptext>
        </motion.div>
      </div>
      {/* Image Area */}
      <div>
        <motion.div
          className="flex justify-between w-5/6 mx-auto  h-full mt-20 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {services.map((item: ImageBoxType, index) => (
            <ImageBox
              key={index}
              img={item.img}
              header={item.header}
              description={item.description}
              height="100"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
