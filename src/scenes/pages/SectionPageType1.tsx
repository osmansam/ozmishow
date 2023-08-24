import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setIsTopOfPage,
  setSelectedSection,
} from "../../features/context/contextSlice";
import { ContainerType } from "../../shared/types";
import { motion } from "framer-motion";
import { renderComponents } from "./RenderComponents";
import Navbar from "../../components/sectionNavbar/Type1/Navbar";

interface Props {
  page: string;
}

const SectionPageType1 = ({ page }: Props) => {
  const dispatch = useDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const [firstContainer, setFirstContainer] = useState<ContainerType[]>([]);
  const { language } = useSelector((state: RootState) => state.context);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const { container } = useSelector((state: RootState) => state.twoPicture);

  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    setFirstContainer(container.filter((c) => c.page === page));
  }, [container, page]);

  useEffect(() => {
    if (firstContainer.length > 0) {
      let filteredContainer = firstContainer.filter(
        (c) => c.language === language
      );
      let sortedContainer = filteredContainer.sort(
        (a, b) => a.position - b.position
      );
      setNewContainer(sortedContainer);
    }
  }, [firstContainer, language]);

  useEffect(() => {
    const observerOptions = {
      root: null, // use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // when 50% of the section is visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          if (sectionId) {
            dispatch(setSelectedSection(sectionId));
          }
        }
      });
    };

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observe each section element
    sectionRefs.current.forEach((sectionRef) => {
      observer.observe(sectionRef);
    });

    // Clean up the observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, [pageOptions, dispatch]);

  // Assuming sections is the array of section names
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
    <div>
      <Navbar links={sections ? sections : []} />
      <div className="mx-auto">
        {sections?.map((section, index) => {
          return (
            <section
              key={index}
              id={section}
              style={{ paddingTop: "60px" }}
              ref={(el) => {
                if (el && !sectionRefs.current.includes(el)) {
                  sectionRefs.current.push(el);
                }
              }}
            >
              <motion.div className="min-h-screen">
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

export default SectionPageType1;
