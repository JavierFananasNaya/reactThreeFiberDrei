import diffuse from "../assets/bricks/diffuse_bricks.jpg";
import normals from "../assets/bricks/normals_bricks.jpg";

import React, { useRef } from "react";
import {Box, useTexture } from "@react-three/drei";

const Maze = ({ mazeData }) => {
  const mazeRef = useRef();

  // Define the size of the cubes (walls)
  const cubeSize = 1;

  const [colorMap, normalMap] = useTexture([diffuse, normals]);

  // Map the maze data to 3D cubes
  const cubes = mazeData.flatMap((row, rowIndex) =>
    row.map((cell, colIndex) =>
      cell === 0 ? (
        <Box
          key={`${rowIndex}-${colIndex}`}
          args={[cubeSize, cubeSize, cubeSize]}
          position={[colIndex * cubeSize, 0, -rowIndex * cubeSize]}
        >
          {/* <CuboidCollider args={[cubeSize, cubeSize, cubeSize]} position={[colIndex * cubeSize, 0, -rowIndex]} /> */}
          <meshStandardMaterial
            attach="material"
            map={colorMap}
            normalMap={normalMap}
          />
        </Box>
      ) : null
    )
  );

  return <group ref={mazeRef}>{cubes}</group>;
};

export default Maze;
