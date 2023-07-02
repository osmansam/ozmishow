import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import TwoPicture from "./scenes/ComponentContainer";
import Page from "./scenes/pages/Page";
import PageAdmin from "./scenes/pages/PageAdmin";
import { getPageOptions } from "./features/twoPicture/twoPictureSlice";
import SingleNew from "./components/news/newsType1/SingleNew";
import Loading from "./components/loading";
function App() {
  const dispatch = useAppDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPageOptions = async () => {
      await dispatch(getPageOptions());
      setIsLoading(false);
    };
    fetchPageOptions();
  }, [dispatch]);

  const renderedComponent = () => {
    if (isAdmin) {
      return (
        <>
          <Route path="/admin" element={<TwoPicture />} />
          <Route path="/" element={<PageAdmin page="CANSU" />} />
          {pageOptions?.map((page, index) => (
            <React.Fragment key={index}>
              <Route
                key={`page-${page.pageNameEN.toLowerCase()}`}
                path={`/${page.pageNameEN.toLowerCase()}`}
                element={<PageAdmin page={page.pageNameEN} />}
              />
              <Route
                key={`news-${page.pageNameEN.toLowerCase()}`}
                path={`/news/:twoPictureId/:id/:type`}
                element={<SingleNew />}
              />
            </React.Fragment>
          ))}
        </>
      );
    } else {
      return (
        <>
          <Route path="/admin" element={<TwoPicture />} />
          <Route path="/" element={<Page page="CANSU" />} />
          {pageOptions?.map((page, index) => (
            <React.Fragment key={index}>
              <Route
                key={index}
                path={`/${page.pageNameEN.toLowerCase()}`}
                element={<Page page={page.pageNameEN} />}
              />
              <Route
                path={`/news/:twoPictureId/:id/:type`}
                element={<SingleNew />}
              />
            </React.Fragment>
          ))}
        </>
      );
    }
  };

  if (isLoading) {
    // Show loading state or placeholder until pageOptions are fetched
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>{renderedComponent()}</Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
