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
          {pageOptions.map((page) => (
            <Route
              key={page}
              path={`/${page.toLowerCase()}`}
              element={<PageAdmin page={page} />}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          <Route path="/" element={<TwoPicture />} />
          {pageOptions.map((page) => (
            <Route
              key={page}
              path={`/${page.toLowerCase()}`}
              element={<Page page={page} />}
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
