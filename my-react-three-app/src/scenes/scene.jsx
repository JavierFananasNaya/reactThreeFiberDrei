import React, { useRef } from 'react';
import { Canvas } from 'react-three-fiber';

function Scene() {
  const boxRef = useRef();

  return (
    <Canvas>
      <mesh ref={boxRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </Canvas>
  );
}

export default Scene;