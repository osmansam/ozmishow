import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { getPageTwoPictures } from "../../features/twoPicture/twoPictureSlice";
import { ContainerType } from "../../shared/types";
import Loading from "../../components/loading";
import { motion } from "framer-motion";
import { renderComponents } from "./RenderComponents";
import {
  setSelectedSection,
  setIsTopOfPage,
} from "../../features/context/contextSlice";
import Sidebar from "../../components/sectionNavbar/Type1/Sidebar";
import Navbar from "../../components/sectionNavbar/Type1/Navbar";

interface Props {
  page: string;
}

const SectionPage = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language, isSidebarOpen, selectedSection } = useSelector(
    (state: RootState) => state.context
  );
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const { container } = useSelector((state: RootState) => state.twoPicture);

  // when page first load take the page component from the store
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPageTwoPictures(page));
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [dispatch, page]);

  useEffect(() => {
    if (container.length > 0) {
      let filteredContainer = container.filter((c) => c.language === language);
      let sortedContainer = filteredContainer.sort(
        (a, b) => a.position - b.position
      );
      setNewContainer(sortedContainer);
    }
  }, [container, language]);

  const sections = pageOptions.find(
    (item) => item.pageNameEN === page
  )?.sections;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        dispatch(setIsTopOfPage(true));
        dispatch(setSelectedSection("Home"));
      }
      if (window.scrollY !== 0) dispatch(setIsTopOfPage(false));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        links={sections ? sections : [""]}
        img="https://media.licdn.com/dms/image/D4E03AQFMtHrbjJivmQ/profile-displayphoto-shrink_100_100/0/1681161894112?e=1694649600&v=beta&t=UUnS386vMxx596HY-lYS_Zf8aXxwIEJLwHj3j8yEffY"
        name="osman erdogan"
      />
      <div style={{ flex: 1, marginLeft: "200px" }}>
        {sections?.map((section, index) => {
          return (
            <section
              key={index}
              id={section}
              style={{ paddingTop: "60px" }} // Add padding to account for the fixed sidebar height
            >
              <motion.div
                className="min-h-screen"
                onViewportEnter={() => {
                  dispatch(setSelectedSection(section));
                }}
              >
                {renderComponents(
                  newContainer.filter((c) => c.selectedSection === section)
                )}
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default SectionPage;
