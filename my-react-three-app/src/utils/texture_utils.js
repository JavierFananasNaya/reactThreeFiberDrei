import * as THREE from "three";
export const setTextureTiling = (texture, repeatFactorX, repeatFactorY) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatFactorX, repeatFactorY);
  return texture;
};
