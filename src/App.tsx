import React, { useEffect } from "react";
import Navbar from "./scenes/navbar";
import Home from "./scenes/home";
import Services from "./scenes/services";
import Collections from "./scenes/collections";
import Press from "./scenes/press";
import Video from "./scenes/video";
import { RootState, useAppDispatch } from "./store";
import { setIsTopOfPage } from "./features/context/contextSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        dispatch(setIsTopOfPage(true));
      }
      if (window.scrollY !== 0) dispatch(setIsTopOfPage(false));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="App">
      <Video />
      <Navbar />
      <Home />
      <Collections />
      <Services />
      <Press />
    </div>
  );
}

export default App;
