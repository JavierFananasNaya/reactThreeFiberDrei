import React, { useContext, useRef } from 'react';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { pickUpsContext } from '../Contexts/pick_ups_context.tsx';
import { Skull } from '../assets/skull/Skull_downloadable.jsx';

const PickUpsComponent = () => {
  const pickUpsRef = useRef();
  const { pickUps } = useContext(pickUpsContext);

  // Map the pickUps positions to 3D objects
  const pickUpsElements = pickUps.map((pickUp, index) => {
    const { row, col } = pickUp.position;
    if (pickUp.visible) {
      return (
        <RigidBody type="kinematicPosition" key={`${index}-rigidBody`} name="pickUp">
          <Skull key={`${index}-skull`} position={[col, 0.3, -row]} scale={0.2}></Skull>
          <Box
            args={[1, 2, 1]}
            position={[col, 0, -row]}
            receiveShadow
            visible={true}
            >
            <meshStandardMaterial castShadow={false} receiveShadow={false} attach="material" color="black" transparent opacity={0} />
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
