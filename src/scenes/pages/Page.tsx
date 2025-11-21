import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";
import Navbar5 from "../../components/navbar/Navbar5";
import {
  getPageOptions,
  getPageTwoPictures,
} from "../../features/twoPicture/twoPictureSlice";
import PageStyleModalContainer from "../../hooks/pageStyle/PageStyleModalContainer";
import { ContainerType, PageOptionsType, pageStyle } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { getComponentConfig } from "./admin/componentRegistry";

const Navbar2 = React.lazy(() => import("../../components/navbar/Navbar2"));
const Sidebar = React.lazy(() => import("../../components/sidebar"));
const Footer = React.lazy(() => import("../../components/footer"));

interface Props {
  page: string;
}

/**
 * Render a single block using the component registry
 * User view - no admin controls or borders
 */
const renderBlock = (
  item: ContainerType,
  index: number,
  page: string
) => {
  if (!item || !item.componentName) {
    return null;
  }

  const config = getComponentConfig(item.componentName, item.componentType);

  if (!config) {
    // Graceful fallback for unknown component types - minimal display for users
    return null;
  }

  const { component: Component, propBuilder } = config;
  const componentProps = propBuilder(item, page);

  // Robust key handling
  const key = item._id || `fallback-${index}-${item.componentName}`;

  return <Component key={key} {...componentProps} />;
};

const Page = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const [newContainer, setNewContainer] = useState<ContainerType[]>([]);
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  const { container, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );

  // Fetch data on mount and when page changes
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPageOptions());
      await dispatch(getPageTwoPictures(page));
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [dispatch, page]);

  // Filter and sort containers by language
  useEffect(() => {
    if (!container || container.length === 0) {
      setNewContainer([]);
      return;
    }

    const filteredContainer = container.filter((c) => c.language === language);

    if (filteredContainer.length === 0) {
      setNewContainer([]);
      return;
    }

    // Create a sorted copy explicitly
    const sortedContainer = [...filteredContainer].sort(
      (a, b) => a.position - b.position
    );
    
    setNewContainer(sortedContainer);
  }, [container, language]);

  /**
   * Memoize the list of rendered components to avoid unnecessary re-renders
   */
  const renderedBlocks = useMemo(() => {
    return newContainer.map((item, index) =>
      renderBlock(item, index, page)
    );
  }, [newContainer, page]);

  // Cast pageOptions to PageOptionsType[] to ensure type safety if Redux state is loosely typed
  // or just rely on the selector if it's already typed (it seemed to be any[] in PageAdmin usage context)
  const typedPageOptions = pageOptions as PageOptionsType[];
  const currentPage = typedPageOptions.find((item) => item.pageNameEN === page);

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
            <Navbar5 currentPage={currentPage} />
          </div>
        )}
        <div style={currentPage?.pageStyle}>
          <PageStyleModalContainer
            pageOptionsId={currentPage?._id ?? ""}
            styleData={currentPage?.pageStyle ?? pageStyle}
          />
          {renderedBlocks}
        </div>
        {(currentPage?.isNavbar || currentPage?.isSubpage) && (
          <Footer currentPage={currentPage ? currentPage.pageNameEN : ""} />
        )}
      </div>
    </Suspense>
  );
};

export default Page;
