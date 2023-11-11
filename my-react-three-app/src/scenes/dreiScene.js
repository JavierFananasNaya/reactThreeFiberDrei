import { KeyboardControls, Sky,PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Player from "../Objects/sphereCharacterV2";
import { Ground } from "../Objects/ground";
import { Canvas } from "react-three-fiber";

function DreiScene() {
  console.log('He creado dreiscene');
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
    <Sky sunPosition={[100, 20, 100]} />
    <ambientLight intensity={0.3}></ambientLight>
    {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />*/}
    <directionalLight castShadow intensity={0.8} position={[100,100,100]}></directionalLight>
    <Physics gravity={[0, 0, 0]}>
      {/* floor (need to make a component for the floor) */}
      <Ground/>
      {/* end of floor */}
      <Player/>
    </Physics>
    <PointerLockControls />
    </Canvas>
  </KeyboardControls>
  )
}

export default DreiScene;
