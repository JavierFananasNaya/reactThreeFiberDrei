import diffuse from "../assets/bricks/diffuse_bricks.jpg";
import normals from "../assets/bricks/normals_bricks.jpg";

import React, { useRef } from "react";
import { Box, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { setTextureTiling } from "../utils/texture_utils.js";

const Maze = ({ mazeData }) => {
  const mazeRef = useRef();
 
  // Define the size of the cubes (walls)
  const cubeSize = 1;

  let [colorMap, normalMap] = useTexture([diffuse, normals]);

  const tilingScale = 1.5;

  colorMap = setTextureTiling(colorMap, tilingScale);
  normalMap = setTextureTiling(normalMap, tilingScale);

  // Map the maze data to 3D cubes
  const cubes = mazeData.flatMap((row, rowIndex) =>
    row.map((cell, colIndex) =>
      cell === 0 ? (
        <RigidBody
          type="kinematicPosition"
          key={`${rowIndex}-${colIndex}-rigidBody`}
        >
          <Box
            key={`${rowIndex}-${colIndex}`}
            args={[cubeSize, cubeSize, cubeSize]}
            position={[colIndex * cubeSize, 0, -rowIndex * cubeSize]}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial
              attach="material"
              map={colorMap}
              normalMap={normalMap}
            />
          </Box>
        </RigidBody>
      ) : null
    )
  );

  return (
    <group ref={mazeRef} key={"maze"}>
      {cubes}
    </group>
  );
};

export default Maze;
