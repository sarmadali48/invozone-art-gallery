import * as THREE from "three";

export const createCeiling = (scene, textureLoader) => {
  const ceilingTexture = textureLoader.load("img/ceiling-01.jpg"); // load the texture
  ceilingTexture.wrapS = THREE.RepeatWrapping;
  ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(4, 4);
  const ceilingGeometry = new THREE.PlaneGeometry(45, 40); // create the geometry
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: ceilingTexture,
  });
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

  ceilingPlane.rotation.x = Math.PI / 2;
  ceilingPlane.position.y = 10;

  scene.add(ceilingPlane);
};
