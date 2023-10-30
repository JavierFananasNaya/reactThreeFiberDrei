import React, { useRef, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { angleToRadians } from '../utils/angle';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
function Scene() {
  const sphereRef = useRef();

  return (
    <>
    <Canvas>

      <PerspectiveCamera makeDefault position={[0,1,5]}/>
      <OrbitControls/>
      {/* Ball */}
      <mesh ref={sphereRef} position={[0,0.5,0]}>
        <sphereGeometry args={[0.5,32,32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh rotation={[-(angleToRadians(90)),0,0]}>
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