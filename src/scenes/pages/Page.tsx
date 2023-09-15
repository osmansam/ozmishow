import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { pageStyle } from "../../shared/types";
import {
  getPageTwoPictures,
  getAllTwoPicture,
} from "../../features/twoPicture/twoPictureSlice";
import { ContainerType } from "../../shared/types";
import Loading from "../../components/loading";
import { renderComponents } from "./RenderComponents";

const Navbar = lazy(() => import("../../components/navbar/Navbar"));
const Sidebar = lazy(() => import("../../components/sidebar"));
const Footer = lazy(() => import("../../components/footer"));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Props {
  page: string;
}

const Page = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const [firstContainer, setFirstContainer] = useState<ContainerType[]>([]);
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const { container } = useSelector((state: RootState) => state.twoPicture);
  const currentPage = pageOptions.find((item) => item.pageNameEN === page);

  // first get all the two pictures from the database
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllTwoPicture());
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setFirstContainer(container.filter((c) => c.page === page));
  }, [container, page]);
  // then get the two pictures for the current page
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

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full min-h-screen">
        {(currentPage?.isNavbar || currentPage?.isSubpage) && (
          <div>
            {isSidebarOpen && (
              <Sidebar
                currentPage={currentPage ? currentPage.pageNameEN : ""}
              />
            )}
            <Navbar currentPage={currentPage} />
          </div>
        )}
        <div style={currentPage?.pageStyle}>
          {renderComponents(newContainer)}
        </div>
        {(currentPage?.isNavbar || currentPage?.isSubpage) && (
          <Footer currentPage={currentPage ? currentPage.pageNameEN : ""} />
        )}
      </div>
    </Suspense>
  );
};

export default Page;
