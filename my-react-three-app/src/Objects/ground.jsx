// import diffuse from "../assets/ground/diffuse_ground.jpg";
// import normals from "../assets/ground/normal_ground.jpg";
import diffuse from "../assets/dirt/Ground_Dirt_007_basecolor_2.jpg";
import normals from "../assets/dirt/Ground_Dirt_007_normal.jpg";
import ambientOclussion from "../assets/dirt/Ground_Dirt_007_ambientOcclusion.jpg";
import roughness from "../assets/dirt/Ground_Dirt_007_roughness.jpg";
import displacement from "../assets/dirt/Ground_Dirt_007_height.png";

import { useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { setTextureTiling } from "../utils/texture_utils.js";

export function Ground(props) {
  let [colorMap, normalMap, aoMap, roughnessMap, displacementMap] = useTexture([
    diffuse,
    normals,
    ambientOclussion,
    roughness,
    displacement,
  ]);

  const tilingScale = 900;

  colorMap = setTextureTiling(colorMap, tilingScale);
  normalMap = setTextureTiling(normalMap, tilingScale);
  aoMap = setTextureTiling(aoMap, tilingScale);
  roughnessMap = setTextureTiling(roughnessMap, tilingScale);
  displacementMap = setTextureTiling(displacementMap, tilingScale);

  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, -0.5, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry receiveShadow args={[1000, 1000]} />
        <meshStandardMaterial
          attach="material"
          map={colorMap}
          normalMap={normalMap}
          aoMap={aoMap}
          roughnessMap={roughnessMap}
          displacementMap={displacementMap}
        />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
}
