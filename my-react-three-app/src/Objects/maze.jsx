import React, { useRef } from "react";
import { Box, useTexture } from "@react-three/drei";
import diffuse from '../assets/bricks/diffuse_bricks.jpg'
import normals from '../assets/bricks/diffuse_bricks.jpg'
import displacement from '../assets/bricks/diffuse_bricks.jpg'
import specular from '../assets/bricks/diffuse_bricks.jpg'

const Maze = ({ mazeData }) => {
  const mazeRef = useRef();

  // Define the size of the cubes (walls)
  const cubeSize = 1;

  const [colorMap, normalMap, displacementMap, specularMap] = useTexture([
    diffuse,
    normals,
    displacement,
    specular
  ]);
  
  // Map the maze data to 3D cubes
  const cubes = mazeData.flatMap((row, rowIndex) =>
    row.map((cell, colIndex) =>
      cell === 0 ? (
        <Box
          key={`${rowIndex}-${colIndex}`}
          args={[cubeSize, cubeSize, cubeSize]}
          position={[colIndex * cubeSize, 0, -rowIndex * cubeSize]}
        >
          <meshStandardMaterial
            attach="material"
            map={colorMap} 
            normalMap={normalMap} 
            displacementMap={displacementMap} 
            specular={specularMap}
            displacementScale={0.2}
          />
        </Box>
      ) : null
    )
  );

  return <group ref={mazeRef}>{cubes}</group>;
};

export default Maze;
