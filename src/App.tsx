import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootState, useAppDispatch } from "./store";
import Deneme from "./scenes/deneme";
import TwoPicture from "./scenes/TwoPicture";
import Page from "./scenes/pages/Page";
import { PageOptions } from "./shared/types";

function App() {
  const dispatch = useAppDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TwoPicture />} />
        {Object.values(PageOptions).map((page) => (
          <Route
            path={`/${page.toLowerCase()}`}
            element={<Page page={page} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
