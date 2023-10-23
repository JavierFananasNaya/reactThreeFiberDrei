import React, { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { angleToRadians } from '../utils/angle';
import { PerspectiveCamera } from 'drei';
function Scene() {
  const sphereRef = useRef();

  return (
    <>
    <Canvas>
      {/* <PerspectiveCamera makeDefault position={[angleToRadians(90),0,0]}></PerspectiveCamera> */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 32,32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh rotation={[(angleToRadians(75)),0,0]}>
        <planeGeometry args={[7,7]}></planeGeometry>
        <meshStandardMaterial color="Pink"></meshStandardMaterial>
      </mesh>
      {/* ambient light */}
      <ambientLight args={["#ffffff", 1]}></ambientLight>
    </Canvas>
    </>
  );
}

export default Scene;