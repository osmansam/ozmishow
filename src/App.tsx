import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import Deneme from "./scenes/deneme";
import TwoPicture from "./scenes/ComponentContainer";
import Page from "./scenes/pages/Page";
import PageAdmin from "./scenes/pages/PageAdmin";
import { getPageOptions } from "./features/twoPicture/twoPictureSlice";
import SingleNew from "./components/news/SingleNew";

function App() {
  const dispatch = useAppDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  useEffect(() => {
    dispatch(getPageOptions());
  }, []);

  const renderedComponent = () => {
    if (isAdmin) {
      return (
        <>
          <Route path="/" element={<TwoPicture />} />
          {pageOptions.map((page, index) => (
            <React.Fragment key={index}>
              <Route
                key={`page-${page.pageNameEN.toLowerCase()}`}
                path={`/${page.pageNameEN.toLowerCase()}`}
                element={<PageAdmin page={page.pageNameEN} />}
              />
              <Route
                key={`news-${page.pageNameEN.toLowerCase()}`}
                path={`/${page.pageNameEN.toLowerCase()}/news/:twoPictureId/:id`}
                element={<SingleNew />}
              />
            </React.Fragment>
          ))}
        </>
      );
    } else {
      return (
        <>
          <Route path="/" element={<TwoPicture />} />
          {pageOptions.map((page, index) => (
            <React.Fragment key={index}>
              <Route
                key={index}
                path={`/${page.pageNameEN.toLowerCase()}`}
                element={<Page page={page.pageNameEN} />}
              />
              <Route
                path={`/${page.pageNameEN.toLowerCase()}/news/:twoPictureId/:id`}
                element={<SingleNew />}
              />
            </React.Fragment>
          ))}
        </>
      );
    }
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>{renderedComponent()}</Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
