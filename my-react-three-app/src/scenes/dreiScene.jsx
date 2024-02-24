import { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  PointerLockControls,
  Stars,
  Html,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { PickUpsProvider } from "../Contexts/pick_ups_context.tsx";
import { MazeGenerator } from "../utils/mazeGenerator.js";
import {
  getPlayerInitialPosition,
  getPickUpsPositions,
} from "../utils/utils.js";
import { Ground } from "../Objects/ground.jsx";
import Maze from "../Objects/maze.jsx";
import PickUpsComponent from "../Objects/pickUps.jsx";
import Player from "../Objects/sphereCharacterV2.jsx";
import Ui from "../Objects/ui.jsx";
import { VictoryScene } from "./victory.jsx";
import "./dreiScene.scss";

const mazeRows = 51;
const mazeCols = 51;
const minutes = 10;
const mazeGenerator = new MazeGenerator(mazeRows, mazeCols);
const mazeData = mazeGenerator.generateMaze();
const pickUpsPositions = getPickUpsPositions(10, mazeData);
const playerInitialPosition = getPlayerInitialPosition(mazeData[1]);

const DreiScene = () => {
  const [victory, setVictory] = useState(false);
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    // Exit early when we reach 0
    if (timeLeft === 0) {
      return;
    }

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      // Decrease time left by one second
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (!victory) {
    return (
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <PickUpsProvider pickUpsData={pickUpsPositions} setVictory={setVictory}>
          <Canvas shadows camera={{ fov: 45 }}>
            <Suspense
              fallback={
                <Html center className="loading-text">
                  <div>Loading...</div>
                </Html>
              }
            >
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />
              <ambientLight intensity={0.05}></ambientLight>
              <Physics gravity={[0, -9.8, 0]}>
                <Ground />
                <Player initialPosition={playerInitialPosition} />
                <Maze mazeData={mazeData} />
                <PickUpsComponent pickUpsPositions={pickUpsPositions} />
              </Physics>
            </Suspense>
            <PointerLockControls />
            <EffectComposer>
              <Vignette darkness={0.75} offset={0.5} />
            </EffectComposer>
          </Canvas>
          <Ui timeLeft={timeLeft}></Ui>
        </PickUpsProvider>
      </KeyboardControls>
    );
  } else {
    return (
      <VictoryScene
        setVictory={setVictory}
        setTimeLeft={setTimeLeft}
        minutes={minutes}
      />
    );
  }
};
export default DreiScene;
