import React, { useRef } from "react";
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const PickUps = ({ pickUpsPositions }) => {
  const pickUpsRef = useRef();

  // Map the pickUpsPositions to 3D objects
  const pickUps = pickUpsPositions.map((coordinates, index) => {
    const {row, col} = coordinates;
    return (
      <RigidBody type="kinematicPosition" key={`${index}-rigidBody`} name='pickUp'>
        <Box
          key={`${index}`}
          args={[1, 2, 1]}
          position={[col , 0, -row]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial attach="material" color="red" />
        </Box>
      </RigidBody>
    );
  });

  return (
    <>
      <group ref={pickUpsRef} key={"pickUps"}>
        {pickUps}
      </group>
    </>
  );
};

export default PickUps;
