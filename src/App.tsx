import React, { lazy, Suspense, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { getPageOptions } from "./features/twoPicture/twoPictureSlice";
import TwoPicture from "./scenes/ComponentContainer";
import { persistor, RootState, store, useAppDispatch } from "./store";
const Login = lazy(() => import("./scenes/login"));
const SingleNew = lazy(() => import("./components/news/newsType1/SingleNew"));
const ReadMore = lazy(() => import("./components/readMore/ReadMore"));
const Loading = lazy(() => import("./components/loading"));
const Page = lazy(() => import("./scenes/pages/Page"));
const PageAdmin = lazy(() => import("./scenes/pages/PageAdmin"));
const SectionPageType1 = lazy(
  () => import("./scenes/pages/sectionPages/SectionPageType1")
);
const SectionPageType2 = lazy(
  () => import("./scenes/pages/sectionPages/SectionPageType2")
);

function App() {
  const dispatch = useAppDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  // fetching page options
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
                        key={`page-${page?.pageNameEN?.toLowerCase()}`}
                        path={`/${page?.pageNameEN?.toLowerCase()}`}
                        element={<PageAdmin page={page.pageNameEN} />}
                      />
                      <Route
                        key={`news-${page?.pageNameEN?.toLowerCase()}`}
                        path={`/news/:twoPictureId/:id/:type`}
                        element={<SingleNew />}
                      />
                      <Route
                        key={`readMore-${page?.pageNameEN?.toLowerCase()}`}
                        path={`/readMore/:twoPictureId/:index/`}
                        element={<ReadMore />}
                      />
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <Route path="/" element={<Page page="CANSU" />} />
                  {pageOptions?.map((page, index) => (
                    <React.Fragment key={index}>
                      {page.isSectionPage &&
                        page.sectionPageType === "Type1" && (
                          <Route
                            key={index}
                            path={`/${page?.pageNameEN?.toLowerCase()}`}
                            element={
                              <SectionPageType1 page={page?.pageNameEN} />
                            }
                          />
                        )}
                      {page?.isSectionPage &&
                        page?.sectionPageType === "Type2" && (
                          <Route
                            key={index}
                            path={`/${page?.pageNameEN?.toLowerCase()}`}
                            element={
                              <SectionPageType2 page={page?.pageNameEN} />
                            }
                          />
                        )}
                      {!page.isSectionPage && (
                        <Route
                          key={index}
                          path={`/${page?.pageNameEN?.toLowerCase()}`}
                          element={<Page page={page?.pageNameEN} />}
                        />
                      )}
                      <Route
                        path={`/news/:twoPictureId/:id/:type`}
                        element={<SingleNew />}
                      />
                      <Route
                        path={`/readMore/:twoPictureId/:index`}
                        element={<ReadMore />}
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
