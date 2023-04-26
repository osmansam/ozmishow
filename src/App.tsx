import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "./store";
import Deneme from "./scenes/deneme";
function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <Deneme />
    </div>
  );
}

export default App;
