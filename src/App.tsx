import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "./store";
import Deneme from "./scenes/deneme";
import TwoPicture from "./scenes/TwoPicture";
function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <TwoPicture />
    </div>
  );
}

export default App;
