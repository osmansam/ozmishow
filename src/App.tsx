import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import TwoPicture from "./scenes/ComponentContainer";
import Page from "./scenes/pages/Page";
import PageAdmin from "./scenes/pages/PageAdmin";
import Login from "./scenes/login";

import SingleNew from "./components/news/newsType1/SingleNew";
import Loading from "./components/loading";

function App() {
  const { isAdmin } = useSelector((state: RootState) => state.context);

  const PageAdminWrapper = () => {
    const { page } = useParams();

    return <PageAdmin page={page ? page : ""} />;
  };
  const PageWrapper = () => {
    const { page } = useParams();

    return <Page page={page ? page : ""} />;
  };
  const renderedComponent = () => {
    if (isAdmin) {
      return (
        <>
          <Route path="/admin" element={<TwoPicture />} />
          <Route path="/" element={<PageAdmin page="CANSU" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:page" element={<PageAdminWrapper />} />
          <Route
            path={`/news/:twoPictureId/:id/:type`}
            element={<SingleNew />}
          />
        </>
      );
    } else {
      return (
        <>
          <Route path="/admin" element={<TwoPicture />} />
          <Route path="/" element={<Page page="CANSU" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:page" element={<PageWrapper />} />
          <Route
            path={`/news/:twoPictureId/:id/:type`}
            element={<SingleNew />}
          />
        </>
      );
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          <Routes>{renderedComponent()}</Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
