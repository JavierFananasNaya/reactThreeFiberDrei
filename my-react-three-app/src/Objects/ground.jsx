import diffuse from '../assets/ground/diffuse_ground.jpg'
import normals from '../assets/ground/normal_ground.jpg'
import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import {setTextureTiling} from '../utils/texture_utils.ts'


export function Ground(props) {

  let [colorMap, normalMap] = useTexture([
    diffuse,
    normals
  ]);

  const tilingScale = 150

  colorMap = setTextureTiling(colorMap, tilingScale)
  normalMap = setTextureTiling(normalMap, tilingScale)


  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, -10, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
            attach="material"
            map={colorMap} 
            normalMap={normalMap} 
          />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
