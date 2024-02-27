import React, { useContext, useRef } from "react";
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { pickUpsContext } from "../Contexts/pick_ups_context.tsx";
import { Book } from "../assets/skull/Ornate_book.jsx";

const PickUpsComponent = ({ isDebug }) => {
  const pickUpsRef = useRef();
  const { pickUps } = useContext(pickUpsContext);

  // Map the pickUps positions to 3D objects
  const pickUpsElements = pickUps.map((pickUp, index) => {
    const { row, col } = pickUp.position;
    if (pickUp.visible) {
      return (
        <RigidBody
          type="kinematicPosition"
          key={`${index}-rigidBody`}
          name="pickUp"
        >
          <Book
            key={`${index}-book`}
            position={[col, 0.2, -row]}
            scale={0.00045}
          />
          <Box
            args={[1, 2, 1]}
            position={[col, 0, -row]}
            receiveShadow
            visible={true}
          >
            {isDebug && (
              <meshStandardMaterial
                castShadow={false}
                receiveShadow={false}
                attach="material"
                color="red"
              />
            )}
            {!isDebug && (
              <meshStandardMaterial
                castShadow={false}
                receiveShadow={false}
                attach="material"
                color="black"
                transparent
                opacity={0}
              />
            )}
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
