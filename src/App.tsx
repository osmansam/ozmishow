import React from "react";
import Navbar from "./scenes/navbar";
import Home from "./scenes/home";
import Services from "./scenes/services";
function App() {
  return (
    <div className="App">
      {/* <video autoPlay loop muted id="video" className="fixed z-[-1] w-full  ">
        <source
          src="https://www.ultimacollection.com/application/files/3016/1668/4590/cover.mp4"
          type="video/mp4"
        />
      </video> */}
      {/* <Navbar /> */}
      <Home />
      <Services />
    </div>
  );
}

export default App;
