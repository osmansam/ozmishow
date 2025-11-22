import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";
import Navbar5 from "../../components/navbar/Navbar5";
import {
  getPageOptions,
  getPageTwoPictures,
  updateTwoPicture,
} from "../../features/twoPicture/twoPictureSlice";
import PageStyleModalContainer from "../../hooks/pageStyle/PageStyleModalContainer";
import { ContainerType, PageOptionsType, pageStyle } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import { AdminBlockWrapper } from "./admin/AdminBlockWrapper";
import { getComponentConfig } from "./admin/componentRegistry";

const Navbar2 = React.lazy(() => import("../../components/navbar/Navbar2"));
const Sidebar = React.lazy(() => import("../../components/sidebar"));
const Footer = React.lazy(() => import("../../components/footer"));

interface Props {
  page: string;
}

/**
 * Render a single block using the component registry
 */
const renderBlock = (
  item: ContainerType,
  index: number,
  page: string,
  moveItem: (index: number, direction: "up" | "down") => void,
  totalItems: number,
  pageOptions: PageOptionsType[],
  language: string,
  handleDeleteSuccess: () => void
) => {
  if (!item || !item.componentName) {
    return null;
  }

  // Robust key handling: prefer _id, fallback to a combination that is likely unique but stable enough for rendering
  // Note: using index as part of key is generally discouraged for reordering, but if _id is missing, we need a fallback.
  // Ideally _id is always present.
  const key = item._id || `fallback-${index}-${item.componentName}`;

  const config = getComponentConfig(item.componentName, item.componentType);

  if (!config) {
    // Graceful fallback for unknown component types
    return (
      <AdminBlockWrapper
        key={key}
        index={index}
        moveItem={moveItem}
        disableMoveUp={index === 0}
        disableMoveDown={index === totalItems - 1}
        id={item._id ?? ""}
        pageOptions={pageOptions}
        language={language}
        showWrapper={false}
        onDeleteSuccess={handleDeleteSuccess}
      >
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-800">
            Unknown component: {item.componentName}
            {item.componentType ? `:${item.componentType}` : ""}
          </p>
        </div>
      </AdminBlockWrapper>
    );
  }

  const { component: Component, propBuilder, showWrapper } = config;
  const componentProps = propBuilder(item, page);

  return (
    <AdminBlockWrapper
      key={key}
      index={index}
      moveItem={moveItem}
      disableMoveUp={index === 0}
      disableMoveDown={index === totalItems - 1}
      id={item._id ?? ""}
      pageOptions={pageOptions}
      language={language}
      showWrapper={showWrapper}
      onDeleteSuccess={handleDeleteSuccess}
    >
      <Component {...componentProps} />
    </AdminBlockWrapper>
  );
};

const PageAdmin = ({ page }: Props) => {
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
  // Goal: Correct handling when container becomes empty or has no matching language
  // Goal: Avoid in-place mutation when sorting
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
   * Optimized moveItem - only dispatches updates for the two swapped items
   * Wrapped in useCallback for referential stability
   */
  const moveItem = useCallback(
    (index: number, direction: "up" | "down") => {
      setNewContainer((prev) => {
        // Create a shallow copy of the array to avoid mutation
        const updatedContainer = [...prev];
        
        if (direction === "up" && index > 0) {
          // Swap items
          const itemToMove = updatedContainer[index];
          const itemAbove = updatedContainer[index - 1];
          
          updatedContainer[index] = itemAbove;
          updatedContainer[index - 1] = itemToMove;

          // Update positions locally
          // We create new objects to avoid mutating the original items in the array
          updatedContainer[index] = { ...updatedContainer[index], position: index };
          updatedContainer[index - 1] = { ...updatedContainer[index - 1], position: index - 1 };

          // Dispatch updates
          dispatch(updateTwoPicture(updatedContainer[index]));
          dispatch(updateTwoPicture(updatedContainer[index - 1]));

          return updatedContainer;
        } else if (direction === "down" && index < updatedContainer.length - 1) {
          // Swap items
          const itemToMove = updatedContainer[index];
          const itemBelow = updatedContainer[index + 1];
          
          updatedContainer[index] = itemBelow;
          updatedContainer[index + 1] = itemToMove;

          // Update positions locally
          updatedContainer[index] = { ...updatedContainer[index], position: index };
          updatedContainer[index + 1] = { ...updatedContainer[index + 1], position: index + 1 };

          // Dispatch updates
          dispatch(updateTwoPicture(updatedContainer[index]));
          dispatch(updateTwoPicture(updatedContainer[index + 1]));

          return updatedContainer;
        }
        
        return prev; // No change
      });
    },
    [dispatch]
  );

  /**
   * Handle delete success - re-fetch data instead of reloading page
   * Wrapped in useCallback for referential stability
   */
  const handleDeleteSuccess = useCallback(() => {
    dispatch(getPageTwoPictures(page));
  }, [dispatch, page]);

  /**
   * Memoize the list of rendered components to avoid unnecessary re-renders
   */
  const renderedBlocks = useMemo(() => {
    return newContainer.map((item, index) =>
      renderBlock(
        item,
        index,
        page,
        moveItem,
        newContainer.length,
        pageOptions,
        language,
        handleDeleteSuccess
      )
    );
  }, [newContainer, page, moveItem, pageOptions, language, handleDeleteSuccess]);

  const currentPage = pageOptions.find((item) => item.pageNameEN === page);

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

export default PageAdmin;
