import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';

// Import the equation logic
import { loadEquationTextures, spawnNewEquation } from './equationFall.js';
import { loadAstronaut } from './astronaut.js';
// import { loadPlanet } from './planets.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#space-background"),
  antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);


// Create a group to hold the black hole
const blackHoleGroup = new THREE.Group();
const blackHolePosition = new THREE.Vector3(-100,0,-20);
// console.log(blackHolePosition)

// Load Black Hole Model
const loader = new GLTFLoader();
loader.load(
  'assets/models/blackhole.glb', // Path to the downloaded black hole model
  function (gltf) {
    const blackHole = gltf.scene;
    // Add the black hole to the group
    blackHoleGroup.add(blackHole);
    scene.add(blackHoleGroup);
    blackHoleGroup.children[0].position.set(-100,0,-20); // Position the black hole in the scene
    // console.log(blackHoleGroup.children[0].posi)
    blackHoleGroup.children[0].scale.setScalar(80);    // Scale the black hole model
    // Tilt the whole group along the z-axis
    blackHoleGroup.rotation.z = Math.PI / 12;
    
    // Optional: Animate rotation
    function animateBlackHole() {
      requestAnimationFrame(animateBlackHole);
      // blackHole.rotation.y += 0.005; // Rotate the black hole
      // Rotate the black hole around its local y-axis (inside the tilted group)
      blackHoleGroup.children[0].rotation.y += 0.01;  // Adjust rotation speed as needed
    }
    animateBlackHole();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
//----------------------------------------------------------------------------


//-------------------------- Load equation textures -------------------------
const equationPaths = [
  'assets/eqns/EE.png',
  // 'path_to_equation2.png',
  // Add more equation PNG paths here
];
const equationTextures = loadEquationTextures(equationPaths);

// Start the equation falling effect
spawnNewEquation(equationTextures, scene);

//-------------------Load astronaut----------------------
const { updateAstronaut, cleanup } = loadAstronaut(scene, camera, renderer, blackHolePosition);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);  // Soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);  // Strong directional light
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

//-------------- Planets 3D-------------------
// loadPlanet(scene);





//------------- Particles -----------------
// Create a custom circular texture
function createParticleTexture() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    
    // Create a gradient from white to transparent
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Particle system setup
const particles = new THREE.BufferGeometry();
const particleCount = 1000;

const positions = [];
const velocities = [];

for (let i = 0; i < particleCount; i++) {
    positions.push((Math.random() * 2 - 1) * 500);
    positions.push((Math.random() * 2 - 1) * 500);
    positions.push((Math.random() * 2 - 1) * 500);
    
    velocities.push((Math.random() - 0.5) * 0.2);
    velocities.push((Math.random() - 0.5) * 0.2);
    velocities.push((Math.random() - 0.5) * 0.2);
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 3,
    map: createParticleTexture(),  // Use the generated texture
    blending: THREE.AdditiveBlending,
    transparent: true
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 500;
//--------------------------------------------------------------------

// Load planet models
const planets = [];

const textureLoader = new TextureLoader();

// Png textures for plannets
// 1)
textureLoader.load('assets/models/Planets/planet05.png', (texture) => {
  const P1Material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const P1 = new THREE.Sprite(P1Material);
  P1.scale.setScalar(40); // Scale the sprite to a suitable size
  P1.position.set(220, -200, 100); // Set the initial position of the planet

  scene.add(P1);
  planets.push(P1);
});

// 2)
textureLoader.load('assets/models/Planets/planet03.png', (texture) => {
    const P2Material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const P2 = new THREE.Sprite(P2Material);
    P2.scale.setScalar(100); // Scale the sprite to a suitable size
    P2.position.set(200,150, 100); // Set the initial position of the planet
  
    scene.add(P2);
    planets.push(P2);
  });

  // 3)
textureLoader.load('assets/models/Planets/planet06.png', (texture) => {
    const P3Material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const P3 = new THREE.Sprite(P3Material);
    P3.scale.setScalar(20); // Scale the sprite to a suitable size
    P3.position.set(-750,-300, -450); // Set the initial position of the planet
  
    scene.add(P3);
    planets.push(P3);
  });

  // 4)
textureLoader.load('assets/models/Planets/planet09.png', (texture) => {
    const P4Material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const P4 = new THREE.Sprite(P4Material);
    P4.scale.setScalar(100); // Scale the sprite to a suitable size
    P4.position.set(-750,-300,-350); // Set the initial position of the planet
  
    scene.add(P4);
    planets.push(P4);
  });

  const orbitRadius = 70 //scene.P4.position.distanceTo(P3.position);
  let orbitAngle = 0;
  let temp = 0;


// Mouse tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  // Move particles
  const positions = particles.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] += velocities[i * 3];
    positions[i * 3 + 1] += velocities[i * 3 + 1];
    positions[i * 3 + 2] += velocities[i * 3 + 2];

    if (positions[i * 3] > 500 || positions[i * 3] < -500) velocities[i * 3] *= -1;
    if (positions[i * 3 + 1] > 500 || positions[i * 3 + 1] < -500) velocities[i * 3 + 1] *= -1;
    if (positions[i * 3 + 2] > 500 || positions[i * 3 + 2] < -500) velocities[i * 3 + 2] *= -1;
  }
  particles.attributes.position.needsUpdate = true;

 

  // Update planets' positions
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    // console.log(i)
    planet.position.x += 0.01;
    planet.position.y += 0.01;
    planet.position.z -= 0.001;
    
    if(i==2)
    {
      planet.position.z = planets[3].position.z + orbitRadius*Math.cos(orbitAngle);
      planet.position.x = planets[3].position.x + orbitRadius*Math.sin(orbitAngle);
    }

    if(i==0)
    {
      planet.position.z = planets[1].position.z + 150*Math.cos(orbitAngle);
      planet.position.y = planets[1].position.y + 150*Math.sin(orbitAngle);
    }
  }
  orbitAngle += 0.01;

  // Update astronaut
  updateAstronaut();





  renderer.render(scene, camera);

  // Update camera position to follow mouse
  camera.position.x += (mouseX * 100 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 100 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

cleanup();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

