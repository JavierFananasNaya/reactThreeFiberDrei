import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
const Ball = ({ position }) => {
  const ballRef = useRef();
  const ballPosition = useRef([0, position[1], 0]);
  const speed = 0.1;

  // Event listener for key press
  const handleKeyDown = (event) => {
    const distance = speed;

    switch (event.key) {
      case "w":
        ballPosition.current[2] -= distance;
        break;
      case "s":
        ballPosition.current[2] += distance;
        break;
      case "a":
        ballPosition.current[0] -= distance;
        break;
      case "d":
        ballPosition.current[0] += distance;
        break;
      default:
        break;
    }
  };

  // We attach the event listener to the browser window when component mounts
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Update the ball's position in everyFrame
  useFrame(() => {
    const [x, y, z] = ballPosition.current;
    ballRef.current.position.set(x, y, z);
  });

  return (
    <mesh ref={ballRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Ball;
