import {
  KeyboardControls,
  Stars,
  PointerLockControls
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from "../Objects/sphereCharacterV2.jsx";
import { Ground } from "../Objects/ground.jsx";
import { Canvas } from "react-three-fiber";
import Maze from "../Objects/maze.jsx";
import PickUpsComponent from "../Objects/pickUps.jsx";
import { MazeGenerator } from "../utils/mazeGenerator.js";
import {
  getPlayerInitialPosition,
  getPickUpsPositions,
} from "../utils/utils.js";
import { PickUpsProvider } from "../assets/Contexts/pick_ups_context.tsx";
import Ui from "../Objects/ui.jsx";

const mazeRows = 51;
const mazeCols = 51;
const mazeGenerator = new MazeGenerator(mazeRows, mazeCols);
const mazeData = mazeGenerator.generateMaze();
const pickUpsPositions = getPickUpsPositions(6, mazeData);
const playerInitialPosition = getPlayerInitialPosition(mazeData[1]);

const DreiScene = () => {
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
      <PickUpsProvider pickUpsData={pickUpsPositions}>
        <Canvas shadows camera={{ fov: 45 }}>
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
          <PointerLockControls />
        </Canvas>
        <Ui></Ui>
      </PickUpsProvider>
    </KeyboardControls>
  );
};

export default DreiScene;
