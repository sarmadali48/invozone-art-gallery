import * as THREE from "three";

// object to hold the keys pressed
export const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

export const updateMovement = (delta, controls, camera, walls) => {
  const moveSpeed = 5 * delta;

  const previousPosition = camera.position.clone();

  // cose self-explanatory
  if (keysPressed.ArrowRight) {
    controls.moveRight(moveSpeed);
  }
  if (keysPressed.ArrowLeft) {
    controls.moveRight(-moveSpeed);
  }
  if (keysPressed.ArrowUp) {
    controls.moveForward(moveSpeed);
  }
  if (keysPressed.ArrowDown) {
    controls.moveForward(-moveSpeed);
  }
  if (keysPressed.s && camera.rotation.x >= -1.5) {
    camera.rotateX(-0.01);
  }
  if (keysPressed.w && camera.rotation.x <= 1.5) {
    camera.rotateX(0.01);
  }
  if (keysPressed.d) {
    camera.rotateY(-0.01);
  }
  if (keysPressed.a) {
    camera.rotateY(0.01);
  }

  if (checkCollision(camera, walls)) {
    camera.position.copy(previousPosition);
  }
};

export const checkCollision = (camera, walls) => {
  const playerBoundingBox = new THREE.Box3();
  const cameraWorldPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraWorldPosition);
  playerBoundingBox.setFromCenterAndSize(
    cameraWorldPosition,
    new THREE.Vector3(1, 1, 1)
  );

  for (let i = 0; i < walls.children.length; i++) {
    const wall = walls.children[i]; // get the wall
    if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      return true;
    }
  }

  return false;
};
