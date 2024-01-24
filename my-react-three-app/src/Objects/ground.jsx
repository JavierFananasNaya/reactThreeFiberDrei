import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import diffuse from '../assets/ground/diffuse_ground.jpg'
import displacement from '../assets/ground/displacement_ground.jpg'
import normals from '../assets/ground/normal_ground.jpg'
import specular from '../assets/ground/specular_ground.jpg'
import {setTextureTiling} from '../utils/texture_utils.ts'


export function Ground(props) {

  let [colorMap, normalMap, displacementMap, specularMap] = useTexture([
    diffuse,
    normals,
    displacement,
    specular
  ]);

  const tilingScale = 150

  colorMap = setTextureTiling(colorMap, tilingScale)
  normalMap = setTextureTiling(normalMap, tilingScale)
  displacement = setTextureTiling(displacementMap, tilingScale)
  specular = setTextureTiling(specularMap, tilingScale)

  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, -10, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
            attach="material"
            map={colorMap} 
            normalMap={normalMap} 
            displacementMap={displacementMap} 
            specular={specularMap}
            displacementScale={0.2}
          />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
