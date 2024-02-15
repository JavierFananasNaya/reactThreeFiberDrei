import React, { useContext, useRef } from 'react';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { pickUpsContext } from '../Contexts/pick_ups_context.tsx';

const PickUpsComponent = () => {
  const pickUpsRef = useRef();
  const { pickUps } = useContext(pickUpsContext);

  // Map the pickUps positions to 3D objects
  const pickUpsElements = pickUps.map((pickUp, index) => {
    const { row, col } = pickUp.position;
    if (pickUp.visible) {
      return (
        <RigidBody type="kinematicPosition" key={`${index}-rigidBody`} name="pickUp">
          <Box
            args={[1, 2, 1]}
            position={[col, 0, -row]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial attach="material" color="red" />
          </Box>
        </RigidBody>
      );
    }
    return null;
  });

  return (
    <group ref={pickUpsRef} key="pickUps">
      {pickUpsElements}
    </group>
  );
};

export default PickUpsComponent;
