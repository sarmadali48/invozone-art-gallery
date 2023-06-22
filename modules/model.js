import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create a scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
// Create directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const gltfContainer = document.getElementById("gltf-container");

// Controls
const controls = new OrbitControls(camera, gltfContainer);

export const renderHideModel = () => {
  const model = document.getElementById("model");
  scene.clear();
  const catModel = scene.getObjectByName("cat");
  scene.remove(catModel);
  scene.remove(ambientLight);
  scene.remove(directionalLight);
  camera.remove();
  scene.remove(camera);
  renderer.renderLists.dispose();

  model.style.display = "none"; // Hide the menu
};

export const renderModel = (modelNumber) => {
  const modal = document.getElementById("model");

  modal.style.display = "block"; // Show the modal

  // let position = 0;
  // let mixer = null;

  // Create ambient light

  // ambientLight.intensity(0.3);

  // directionalLight.intensity(2.5);

  scene.background = new THREE.Color(0xffffff);

  scene.add(ambientLight);

  directionalLight.position.set(1, 1, 1); // Adjust the position of the light
  scene.add(directionalLight);

  camera.position.set(4, 1, -4);

  // Create a renderer

  renderer.setSize(600, 400);
  gltfContainer.appendChild(renderer.domElement);

  controls.target.set(0, 1, 0);
  controls.enableDamping = false;

  // Load and display the GLB model
  const loader = new GLTFLoader();
  let modelPath = "";

  switch (modelNumber) {
    case "1":
      modelPath = "models/shiba.glb";
      break;
    case "2":
      modelPath = "models/2bench.glb";
      break;
    case "3":
      modelPath = "models/3blue-audi.glb";
      break;
    case "4":
      // modelPath = "models/gun.gltf";
      modelPath = "models/4cardboard.glb";
      break;
    case "5":
      modelPath = "models/5computer.glb";
      break;
    case "6":
      modelPath = "models/6cussion.glb";
      break;
    case "7":
      modelPath = "models/7fight-arena.glb";
      break;
    case "8":
      // modelPath = "models/gun.gltf";
      modelPath = "models/8first-aid.glb";
      break;
    case "9":
      modelPath = "models/16table-watch.glb";
      break;
    case "10":
      modelPath = "models/low-poly_telescope.glb";
      break;
    case "11":
      modelPath = "models/11photo-frame.glb";
      break;
    case "12":
      // modelPath = "models/gun.gltf";
      modelPath = "models/monstera_deliciosa_potted_mid-century_plant.glb";
      break;
    case "13":
      modelPath = "models/13small-cupboard.glb";
      break;
    case "14":
      modelPath = "models/14sports-cupboard.glb";
      break;
    case "15":
      modelPath = "models/15stole.glb";
      break;
    case "16":
      // modelPath = "models/gun.gltf";
      modelPath = "models/16table-watch.glb";
      break;
  }

  console.log("modelPath ... ", modelPath);

  loader.load(
    modelPath,
    (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      gltf.scene.position.set(0, -4, 0);
      gltf.scene.rotation.y = Math.PI * 0.5;
      const catModel = gltf.scene;
      catModel.name = "cat";
      scene.add(catModel);

      // Calculate the bounding box of the model
      const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      // Update the controls target to the center of the model
      controls.target.copy(center);
      camera.position.set(0, 0, 20);

      // Render the scene
      const animate = function () {
        requestAnimationFrame(animate);
        console.log("gltf.animations ", gltf.animations);
        renderer.render(scene, camera);
        controls.update();
      };
      animate();
    },
    (xhr) => {
      // Loading progress
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      // Error loading the model
      console.error("Error loading model:", error);
    }
  );
};

// Lock the pointer (controls are activated) and hide the menu when the experience starts
export const startExperience = (controls) => {
  //   controls.lock(); // Lock the pointer (controls are activated)
  renderHideModel();
};

export const setupModelButton = (controls) => {
  const playButton = document.getElementById("view-model"); // Get the reference
  playButton.addEventListener("click", () => startExperience(controls)); // Add the click event listener to the play button to start the experience
};
