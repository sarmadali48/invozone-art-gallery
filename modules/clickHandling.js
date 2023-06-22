import * as THREE from "three";

import { renderModel, renderHideModel } from "./model.js"; // import the showMenu function

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function clickHandling(renderer, camera, paintings) {
  renderer.domElement.addEventListener(
    "click",
    (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      onClick(camera, paintings);
    },
    false
  );
}

function onClick(camera, paintings) {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;

    console.log("Clicked painting:", painting.userData.info.year);
    renderModel(painting.userData.info.year);
  }
}

export { clickHandling };
