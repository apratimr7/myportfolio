import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';

let scene, camera, renderer, controls;
let particles, lines;
let isAnimating = true;

const particleCount = 80;
const maxDistance = 0.7;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a1f); // Dark blue background
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;
    controls = new OrbitControls(camera, renderer.domElement);

    createParticles();
    createLines();
    animate();

    // Add click event listener to the renderer's DOM element
    renderer.domElement.addEventListener('click', toggleAnimation);
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 1;
        positions[i + 1] = (Math.random() - 0.5) * 0.8;
        positions[i + 2] = (Math.random() - 0.5) * 1.5;

        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03,
        transparent: true,
        opacity: 0.5
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createLines() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({
        color: 0xaaaaff,
        transparent: true,
        opacity: 0.3
    });

    lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);
}

function updateLines() {
    const positions = particles.geometry.attributes.position.array;
    const linePositions = [];

    for (let i = 0; i < positions.length; i += 3) {
        const x1 = positions[i];
        const y1 = positions[i + 1];
        const z1 = positions[i + 2];

        for (let j = i + 3; j < positions.length; j += 3) {
            const x2 = positions[j];
            const y2 = positions[j + 1];
            const z2 = positions[j + 2];

            const distance = Math.sqrt(
                Math.pow(x2 - x1, 2) +
                Math.pow(y2 - y1, 2) +
                Math.pow(z2 - z1, 2)
            );

            if (distance < maxDistance) {
                linePositions.push(x1, y1, z1);
                linePositions.push(x2, y2, z2);
            }
        }
    }

    lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lines.geometry.attributes.position.needsUpdate = true;
}

function animateParticles() {
    if (!isAnimating) return;

    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
        // Update positions based on velocities
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Bounce off boundaries
        for (let j = 0; j < 3; j++) {
            if (Math.abs(positions[i + j]) > 1) {
                velocities[i + j] *= -0.2;
                positions[i + j] = Math.sign(positions[i + j]) * 0.15;
            }
        }

        // Slowly change velocities for more organic movement
        velocities[i] += (Math.random() - 0.5) * 0.001;
        velocities[i + 1] += (Math.random() - 0.5) * 0.001;
        velocities[i + 2] += (Math.random() - 0.5) * 0.001;

        // Limit velocity to prevent particles from moving too fast
        const speed = Math.sqrt(velocities[i]**2 + velocities[i+1]**2 + velocities[i+2]**2);
        if (speed > 0.03) {
            velocities[i] *= 0.03 / speed;
            velocities[i + 1] *= 0.03 / speed;
            velocities[i + 2] *= 0.03 / speed;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;
}

function animate() {
    requestAnimationFrame(animate);
    animateParticles();
    updateLines();
    renderer.render(scene, camera);
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    console.log("Animation toggled:", isAnimating);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
