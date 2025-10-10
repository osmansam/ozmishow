import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/sectionNavbar/Type2/Navbar";
import { setIsTopOfPage } from "../../../features/context/contextSlice";
import { ContainerType } from "../../../shared/types";
import { RootState } from "../../../store";
import { renderComponents } from "../RenderComponents";

interface Props {
  page: string;
}

const SectionPageType2 = ({ page }: Props) => {
  const dispatch = useDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const [firstContainer, setFirstContainer] = useState<ContainerType[]>([]);
  const { language } = useSelector((state: RootState) => state.context);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const { container } = useSelector((state: RootState) => state.twoPicture);
  const { selectedSection } = useSelector((state: RootState) => state.context);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const sections = pageOptions.find(
    (item) => item.pageNameEN === page
  )?.sections;

  useEffect(() => {
    setFirstContainer(container?.filter((c) => c.page === page));
    console.log(container);
    console.log(firstContainer);
  }, [container, page]);

  useEffect(() => {
    if (firstContainer.length > 0) {
      let sortedContainer = firstContainer.sort(
        (a, b) => a.position - b.position
      );
      setNewContainer(sortedContainer);
    }
  }, [firstContainer, language]);

  // Assuming sections is the array of section names

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        dispatch(setIsTopOfPage(true));
      }
      if (window.scrollY !== 0) dispatch(setIsTopOfPage(false));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);
  console.log(newContainer, "newContainer");
  return (
    <div>
      <Navbar links={sections ? sections : []} />
      <div className="mx-auto">
        <motion.div className="min-h-screen mt-20">
          {newContainer.filter((c) => c.selectedSection === selectedSection)
            .length > 0
            ? renderComponents(
                newContainer.filter(
                  (c) => c.selectedSection === selectedSection
                )
              )
            : renderComponents(
                newContainer.filter((c) => c.selectedSection === page)
              )}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionPageType2;
