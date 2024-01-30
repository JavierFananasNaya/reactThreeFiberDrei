import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls, SpotLight, PositionalAudio } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import audio from '../assets/music/background_music.mp3'

const SPEED = 3;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
export default function Player({ initialPosition }) {
  const ref = useRef();
  const meshRef = useRef();
  const spotLightRef = useRef();
  const audioRef = useRef();
  const [, get] = useKeyboardControls();
  useFrame((state) => {
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    // update camera
    state.camera.position.set(...ref.current.translation());
    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    // Update spotlight

    meshRef.current.position.copy(new THREE.Vector3(state.camera.position.x, state.camera.position.y -1, state.camera.position.z))
    meshRef.current.updateMatrix()
    meshRef.current.rotation.copy(state.camera.rotation)
    meshRef.current.add(spotLightRef.current)
    meshRef.current.add(spotLightRef.current.target)
    spotLightRef.current.target.position.z = -6
    
    // Update audio position as it is a positional audio
    audioRef.current.position.copy(state.camera.position)
  });
  return (
    <>
      <RigidBody
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[initialPosition, 0, -1]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.1, 0.1]} />
      </RigidBody>
      <mesh ref={meshRef}>
      </mesh>
      <SpotLight
        ref={spotLightRef}
        angle={Math.PI/9 }
        penumbra={0.2} // Soften the edge of the light cone
        intensity={0.6} // Set the light intensity
        color="white" // Set the color of the light
        attenuation={5}
        castShadow // Enable shadows if needed
      />
      <PositionalAudio ref={audioRef} autoplay loop url={audio} />
     
    </>
  );
}
