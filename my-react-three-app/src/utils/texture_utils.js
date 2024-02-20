import * as THREE from "three";
export const setTextureTiling = (texture, repeatFactor) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatFactor, repeatFactor);
  return texture;
};
