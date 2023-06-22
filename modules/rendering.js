import * as THREE from "three";
import { displayPaintingInfo, hidePaintingInfo } from "./paintingInfo.js";
import { updateMovement } from "./movement.js";

export const setupRendering = (
  scene,
  camera,
  renderer,
  paintings,
  controls,
  walls
) => {
  const clock = new THREE.Clock();

  let render = function () {
    const delta = clock.getDelta();

    updateMovement(delta, controls, camera, walls);

    const distanceThreshold = 8;

    let paintingToShow;
    paintings.forEach((painting) => {
      const distanceToPainting = camera.position.distanceTo(painting.position);
      if (distanceToPainting < distanceThreshold) {
        paintingToShow = painting;
      }
    });

    if (paintingToShow) {
      displayPaintingInfo(paintingToShow.userData.info); // display the painting info
    } else {
      hidePaintingInfo(); // otherwise hide the painting info
    }

    renderer.render(scene, camera); // render the scene
    requestAnimationFrame(render); // it calls the render function again, so it runs over and over
  };

  render();
};
