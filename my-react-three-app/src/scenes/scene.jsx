import React, { useRef } from "react";
import { angleToRadians } from "../utils/angle";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
function Scene() {
  const sphereRef = useRef();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls />
      {/* Ball */}
      <mesh castShadow ref={sphereRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={3}/>
      </mesh>
      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]}>
        <planeGeometry args={[20, 20]}></planeGeometry>
        <meshPhongMaterial color="#2266cc" metalness={1}></meshPhongMaterial>
      </mesh>
      {/* ambient light */}
      {/* <ambientLight args={["#ffffff", 0.25]}></ambientLight> */}
      <spotLight
        args={["#ffffff", 3, 7, angleToRadians(45), 0.4]}
        position={[-3, 1, 0]}
        castShadow
      ></spotLight>
      {/* Environment */}
      <Environment background>
        <mesh >
          <sphereGeometry args={[50, 100, 100]}></sphereGeometry>
          <meshBasicMaterial
            side={THREE.BackSide}
            color="Pink"
          ></meshBasicMaterial>
        </mesh>
      </Environment>
    </>
  );
}

export default Scene;