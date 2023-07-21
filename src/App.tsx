import React, { lazy, useEffect, useState, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import TwoPicture from "./scenes/ComponentContainer";
import { getPageOptions } from "./features/twoPicture/twoPictureSlice";
import { PageOptionsType } from "./shared/types";
const Login = lazy(() => import("./scenes/login"));
const SingleNew = lazy(() => import("./components/news/newsType1/SingleNew"));
const Loading = lazy(() => import("./components/loading"));
const Page = lazy(() => import("./scenes/pages/Page"));
const PageAdmin = lazy(() => import("./scenes/pages/PageAdmin"));
const SectionPage = lazy(() => import("./scenes/pages/SectionPage"));
function App() {
  const dispatch = useAppDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);

  useEffect(() => {
    const fetchPageOptions = async () => {
      await dispatch(getPageOptions());
    };
    fetchPageOptions();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          {/* Add Suspense and fallback prop */}
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Common routes */}
              <Route path="/admin" element={<TwoPicture />} />
              <Route path="/login" element={<Login />} />

              {/* Conditional routes based on isAdmin */}
              {isAdmin ? (
                <>
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
              ) : (
                <>
                  <Route path="/" element={<Page page="CANSU" />} />
                  {pageOptions?.map((page, index) => (
                    <React.Fragment key={index}>
                      {page.isSectionPage && (
                        <Route
                          key={index}
                          path={`/${page.pageNameEN.toLowerCase()}`}
                          element={<SectionPage page={page.pageNameEN} />}
                        />
                      )}
                      {!page.isSectionPage && (
                        <Route
                          key={index}
                          path={`/${page.pageNameEN.toLowerCase()}`}
                          element={<Page page={page.pageNameEN} />}
                        />
                      )}
                      <Route
                        path={`/news/:twoPictureId/:id/:type`}
                        element={<SingleNew />}
                      />
                    </React.Fragment>
                  ))}
                </>
              )}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
