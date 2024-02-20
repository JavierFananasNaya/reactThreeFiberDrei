import React, { useState } from "react";
import "./App.scss";
import DreiScene from "./scenes/dreiScene";
const App = () => {
  const [isGameActive, setGameActive] = useState(false);

  const startGame = () => {
    setGameActive(true);
  };

  return (
    <div className="App">
      {!isGameActive && (
        <div className="mainMenu">
          <h1>The Maze Reacter</h1>
          <button className="playButton" onClick={startGame}>
            Play
          </button>
        </div>
      )}
      {isGameActive && <DreiScene />}
    </div>
  );
};

export default App;
