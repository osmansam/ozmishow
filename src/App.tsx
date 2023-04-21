import React from "react";
import Navbar from "./scenes/navbar";
import Home from "./scenes/home";
import Services from "./scenes/services";
import Collections from "./scenes/collections";
import Press from "./scenes/press";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Collections />
      <Services />
      <Press />
    </div>
  );
}

export default App;
