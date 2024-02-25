import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import deathBackgroundMusic from "../assets/music/gone_forever.mp3";
import "./death.scss";

const playAgain = (setDeath) => {
  setDeath(false);
};

export const DeathScene = ({ setDeath }) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(false), 100000000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="death-screen">
      <Canvas>
        <Html center>
          {showText && (
            <p className="death-thought-text">
              "I have lost myself in the maze..."
            </p>
          )}
          <button
            className="playAgainButton"
            onClick={() => playAgain(setDeath)}
          >
            Retrace your steps...
          </button>
        </Html>
      </Canvas>
      <audio src={deathBackgroundMusic} autoPlay loop />
    </div>
  );
};
