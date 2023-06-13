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
            <Route
              key={index}
              path={`/${page.pageName.toLowerCase()}`}
              element={<PageAdmin page={page.pageName} />}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          <Route path="/" element={<TwoPicture />} />
          {pageOptions.map((page, index) => (
            <Route
              key={index}
              path={`/${page.pageName.toLowerCase()}`}
              element={<Page page={page.pageName} />}
            />
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
