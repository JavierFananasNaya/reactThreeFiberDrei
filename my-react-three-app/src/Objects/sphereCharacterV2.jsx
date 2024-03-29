import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useKeyboardControls,
  SpotLight,
  PositionalAudio,
} from "@react-three/drei";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import backgroundMusic from "../assets/music/background_music.mp3";
import stepSoundEffect from "../assets/music/step.mp3";
import pickUpSoundEffect from "../assets/music/book_closing.mp3";
import { pickUpsContext } from "../Contexts/pick_ups_context.tsx";

const collisionEnterHandler = (
  other,
  setPickUps,
  setPickUpCount,
  pickUpPlayer
) => {
  if (other.rigidBodyObject.name === "pickUp") {
    setPickUps((pickUps) =>
      pickUps.map((pickUp) => {
        const pickUpPosition = {
          x: pickUp.position.col,
          y: 0,
          z: -pickUp.position.row,
        };
        return {
          ...pickUp,
          visible:
            pickUp.visible === false
              ? false
              : !(
                  JSON.stringify(other.colliderObject.position) ===
                  JSON.stringify(pickUpPosition)
                ),
        };
      })
    );
    setPickUpCount();
    pickUpPlayer.current.play();
  }
};

const SPEED = 3;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
export default function Player({ initialPosition, isDebug }) {
  // The rigidbody of the character
  const ref = useRef();
  // The object used for updating the spotlight
  const meshRef = useRef();
  // The spotlight
  const spotLightRef = useRef();
  // The background music
  const audioRef = useRef();
  // The steps sound effect
  const stepAudioRef = useRef();
  // The pickUp sound effect
  const pickUpAudioRef = useRef();
  // This is rapier, used for jumping (debug purposes)
  const rapier = useRapier();

  // used for handling pickups
  const { setPickUps, setPickUpCount } = useContext(pickUpsContext);

  const [, get] = useKeyboardControls();
  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();
    // check if character is moving
    const isMoving = forward || backward || left || right;
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

    // jumping for debugging
    const world = rapier.world.raw();
    const ray = world.castRay(
      new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 })
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    if (jump && grounded && isDebug)
      ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });

    // Update spotlight

    meshRef.current.position.copy(
      new THREE.Vector3(
        state.camera.position.x,
        state.camera.position.y - 1,
        state.camera.position.z
      )
    );
    meshRef.current.updateMatrix();
    meshRef.current.rotation.copy(state.camera.rotation);
    meshRef.current.add(spotLightRef.current);
    meshRef.current.add(spotLightRef.current.target);
    spotLightRef.current.target.position.z = -6;

    // Update audio position as it is a positional audio
    audioRef.current.position.copy(state.camera.position);
    stepAudioRef.current.position.copy(state.camera.position);
    pickUpAudioRef.current.position.copy(state.camera.position);

    // Play or pause step audio based on movement
    if (
      isMoving &&
      stepAudioRef.current &&
      stepAudioRef.current.isPlaying === false
    ) {
      stepAudioRef.current.play();
    } else if (
      !isMoving &&
      stepAudioRef.current &&
      stepAudioRef.current.isPlaying === true
    ) {
      stepAudioRef.current.pause();
    }
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
        <CapsuleCollider args={[0.1, 0.2]} />
        <CapsuleCollider
          sensor
          onIntersectionEnter={(other) => {
            collisionEnterHandler(
              other,
              setPickUps,
              setPickUpCount,
              pickUpAudioRef
            );
          }}
          args={[0.5, 0.5]}
        />
      </RigidBody>
      <mesh ref={meshRef}></mesh>
      <SpotLight
        ref={spotLightRef}
        angle={Math.PI / 9}
        penumbra={0.2}
        intensity={0.5}
        color="white"
        attenuation={5}
        distance={10}
        castShadow
      />
      <PositionalAudio ref={audioRef} autoplay loop url={backgroundMusic} />
      <PositionalAudio ref={stepAudioRef} autoplay url={stepSoundEffect} />
      <PositionalAudio
        ref={pickUpAudioRef}
        loop={false}
        url={pickUpSoundEffect}
      />
    </>
  );
}
