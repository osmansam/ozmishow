import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import Deneme from "./scenes/deneme";
import TwoPicture from "./scenes/TwoPicture";
import Page from "./scenes/pages/Page";
import PageAdmin from "./scenes/pages/PageAdmin";
import { PageOptions } from "./shared/types";

function App() {
  const dispatch = useAppDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.context);

  const renderedComponent = () => {
    if (isAdmin) {
      return (
        <>
          <Route path="/" element={<TwoPicture />} />
          {Object.values(PageOptions).map((page) => (
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
          {Object.values(PageOptions).map((page) => (
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
