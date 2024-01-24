import * as THREE from "three"
export const setTextureTiling = (texture: THREE.Texture, repeatFactor: number) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatFactor, repeatFactor);
  return texture
};