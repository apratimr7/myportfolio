import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export function loadPlanet(scene) {
  const loader = new GLTFLoader();

  loader.load('assets/models/Planets/purple_planet.glb', function (gltf) {
      const planet = gltf.scene;
      const mixer = new THREE.AnimationMixer(planet);  // Create the AnimationMixer

      // Scale and position planet
      planet.scale.setScalar(80);
      planet.position.set(-300, 300, -200);
      scene.add(planet);

      // Play the planet's rotation animation if it exists
      if (gltf.animations && gltf.animations.length ) {
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
      }

      // Function to update the mixer
      function updateMixer(deltaTime) {
          mixer.update(deltaTime);  // Update the animation mixer
      }

      // Return updateMixer to call it in the main animation loop
      return updateMixer;
      
  });
}