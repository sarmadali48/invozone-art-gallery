import * as THREE from "three";

import { paintingData } from "./paintingData.js";

export function createPaintings(scene, textureLoader) {
  let paintings = [];

  paintingData.forEach((data) => {
    const painting = new THREE.Mesh(
      new THREE.PlaneGeometry(data.width, data.height),
      new THREE.MeshLambertMaterial({ map: textureLoader.load(data.imgSrc) })
    );

    painting.position.set(data.position.x, data.position.y, data.position.z); // position the painting
    painting.rotation.y = data.rotationY; // rotate the painting

    painting.userData = {
      type: "painting",
      info: data.info,
      url: data.info.link,
    };

    painting.castShadow = true;
    painting.receiveShadow = true;

    paintings.push(painting);
  });

  return paintings;
}
