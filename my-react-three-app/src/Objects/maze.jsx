import React, { useRef } from 'react';
import { Box } from '@react-three/drei';

const Maze = ({ mazeData }) => {
  const mazeRef = useRef();

  // Define the size of the cubes (walls)
  const cubeSize = 1;

  // Map the maze data to 3D cubes
  const cubes = mazeData.flatMap((row, rowIndex) =>
    row.map((cell, colIndex) =>
      cell === 0 ? (
        <Box
          key={`${rowIndex}-${colIndex}`}
          args={[cubeSize, cubeSize, cubeSize]}
          position={[colIndex * cubeSize, 0, -rowIndex * cubeSize]}
        >
          <meshStandardMaterial color="gray" />
        </Box>
      ) : null
    )
  );

  return <group ref={mazeRef}>{cubes}</group>;
};

export default Maze;
