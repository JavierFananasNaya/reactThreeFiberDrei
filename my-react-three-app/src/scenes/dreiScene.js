import { KeyboardControls, Stars,PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from "../Objects/sphereCharacterV2";
import { Ground } from "../Objects/ground.jsx";
import { Canvas } from "react-three-fiber";
import Maze from "../Objects/maze.jsx";
import {MazeGenerator} from "../utils/mazeGenerator.ts"
import {getPlayerInitialPosition} from "../utils/utils.ts"

const mazeRows = 51;
const mazeCols = 51;
const mazeGenerator = new MazeGenerator(mazeRows, mazeCols);
const mazeData = mazeGenerator.generateMaze();
const playerInitialPosition = getPlayerInitialPosition(mazeData[1])

function DreiScene() {
  return(
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "w", "W"] },
      { name: "backward", keys: ["ArrowDown", "s", "S"] },
      { name: "left", keys: ["ArrowLeft", "a", "A"] },
      { name: "right", keys: ["ArrowRight", "d", "D"] },
      { name: "jump", keys: ["Space"] },
    ]}
  >
    <Canvas shadows camera={{ fov: 45 }}>
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    <ambientLight intensity={0.05}></ambientLight>
    <fog attach="fog" args={['#202020', 5, 15]} />
    {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />*/}
    {/* <directionalLight castShadow intensity={0.05} position={[100,100,100]}></directionalLight> */}
    <Physics gravity={[0, 0, 0]}>
      {/* floor (need to make a component for the floor) */}
      <Ground/>
      {/* end of floor */}
      <Player initialPosition={playerInitialPosition} />
      <Maze mazeData={mazeData}/>
    </Physics>
    <PointerLockControls />
    </Canvas>
  </KeyboardControls>
  )
}

export default DreiScene;
