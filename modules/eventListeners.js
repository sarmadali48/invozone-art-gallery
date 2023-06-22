import { keysPressed } from "./movement.js";
import { showMenu, hideMenu } from "./menu.js";
import { renderModel, renderHideModel } from "./model.js";
import { startAudio, stopAudio } from "./audioGuide.js";

let lockPointer = true;
let showMenuOnUnlock = false;

export const setupEventListeners = (controls, camera, scene) => {
  document.addEventListener(
    "keydown",
    (event) => onKeyDown(event, controls),
    false
  );
  document.addEventListener(
    "keyup",
    (event) => onKeyUp(event, controls),
    false
  );

  controls.addEventListener("unlock", () => {
    if (showMenuOnUnlock) {
      showMenu();
    }
    showMenuOnUnlock = false;
  });

  document.getElementById("start_audio").addEventListener("click", startAudio);
  document.getElementById("stop_audio").addEventListener("click", stopAudio);
};

function togglePointerLock(controls) {
  if (lockPointer) {
    controls.lock();
  } else {
    showMenuOnUnlock = false;
    controls.unlock();
  }
  lockPointer = !lockPointer;
}

function onKeyDown(event, controls) {
  if (event.key in keysPressed) {
    keysPressed[event.key] = true;
  }

  if (event.key === "Escape") {
    showMenu();
    showMenuOnUnlock = true;
    controls.unlock();
    lockPointer = false;
  }

  if (event.key === "p") {
    controls.unlock();
    lockPointer = false;
  }

  if (event.key === "Enter") {
    hideMenu();
    renderHideModel();
    controls.lock();
    lockPointer = true;
  }

  if (event.key === " ") {
    togglePointerLock(controls);
  }

  if (event.key === "g") {
    // startAudio(); // start the audio guide
  }

  if (event.key === "p") {
    stopAudio(); // stop the audio guide
  }

  if (event.key === "m") {
    showMenu(); // show the menu
    showMenuOnUnlock = true;
    controls.unlock();
    lockPointer = false;
  }

  if (event.key === "r") {
    location.reload(); // reload the page
  }
}

function onKeyUp(event, controls) {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false;
  }
}

document.getElementById("toggle-info").addEventListener("click", () => {
  document.getElementById("info-panel").classList.toggle("collapsed");
  document.getElementById("toggle-info").innerText = document
    .getElementById("info-panel")
    .classList.contains("collapsed")
    ? "Show"
    : "Hide";
});

document.getElementById("about_button").addEventListener("click", function () {
  document.getElementById("about-overlay").classList.add("show");
});

document.getElementById("close-about").addEventListener("click", function () {
  document.getElementById("about-overlay").classList.remove("show");
});
