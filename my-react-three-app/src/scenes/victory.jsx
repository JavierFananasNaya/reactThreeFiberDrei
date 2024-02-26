import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import victoryBackgroundMusic from "../assets/music/victory_background_Sound.mp3";
import "./victory.scss";

const playAgain = (setVictory) => {
  setVictory(false);
};

export const VictoryScene = ({ setVictory }) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(false), 100000000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="victory-screen">
      <Canvas>
        <Html center>
          {showText && <p className="thought-text">"Uh... What a dream..."</p>}
          <button
            className="playAgainButton"
            onClick={() => playAgain(setVictory)}
          >
            Fall asleep again
          </button>
        </Html>
      </Canvas>
      <audio src={victoryBackgroundMusic} autoPlay loop />
    </div>
  );
};
