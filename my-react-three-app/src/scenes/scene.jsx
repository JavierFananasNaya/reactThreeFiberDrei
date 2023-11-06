import React, { useRef } from 'react';
import { angleToRadians } from '../utils/angle';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
function Scene() {
  const sphereRef = useRef();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0,1,5]}/>
      <OrbitControls/>
      {/* Ball */}
      <mesh castShadow ref={sphereRef} position={[0,0.5,0]}>
        <sphereGeometry args={[0.5,32,32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh receiveShadow rotation={[-(angleToRadians(90)),0,0]}>
        <planeGeometry args={[7,7]}></planeGeometry>
        <meshPhongMaterial color="Pink"></meshPhongMaterial>
      </mesh>
      {/* ambient light */}
      <ambientLight args={["#ffffff", 0.1]}></ambientLight>
      {/* <pointLight args={['#ffffff', 1]} position={[-3,2,0]}></pointLight> */}
      <spotLight args={['#ffffff', 1.5,7, angleToRadians(45),0.4]} position={[-3,1,0]} castShadow></spotLight>

    </>
  );
}

export default Scene;