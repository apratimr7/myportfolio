import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadAstronaut(scene, camera, renderer, blackHolePosition) {
    const loader = new GLTFLoader();
    let astronaut;
    let mixer;
    const clock = new THREE.Clock();
    let currentAction;
    let isAnimationPlaying = false;
    let animationInterval;

    loader.load('assets/models/cute_astronaut.glb', (gltf) => {
        astronaut = gltf.scene;
        astronaut.scale.setScalar(125) // Adjust scale as needed
        // resetAstronautPosition();
        astronaut.position.set(200,-200,200)

        astronaut.traverse((child) => {
            if (child.isMesh) {
                child.material.needsUpdate = true;
                if (child.material.map) {
                    child.material.map.needsUpdate = true;
                }
            }
        });

        scene.add(astronaut);

        if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(astronaut);
            currentAction = mixer.clipAction(gltf.animations[0]);
            currentAction.clampWhenFinished = true;
            currentAction.loop = THREE.LoopOnce;
            playAnimationPeriodically();
        }

        addHoverEffect(astronaut, camera, renderer);
    });

    function resetAstronautPosition() {
        const radius = 400;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        astronaut.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
    }

    function playAnimationPeriodically() {
        animationInterval = setInterval(() => {
            if (!isAnimationPlaying) {
                currentAction.reset();
                currentAction.play();
                isAnimationPlaying = true;
                
                currentAction.getMixer().addEventListener('finished', () => {
                    isAnimationPlaying = false;
                });
                console.log(astronaut.position)
            }
        }, 2000); // Play animation every 5 seconds
    }

    function addHoverEffect(object, camera, renderer) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        renderer.domElement.addEventListener('mousemove', onMouseMove);

        function onMouseMove(event) {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(object, true);
            console.log("Intersects:",intersects.length);

            if (intersects.length > 0) {
                showPrompt(event.clientX, event.clientY);
            } else {
                hidePrompt();
            }
        }
    }

    function showPrompt(x, y) {
        let prompt = document.getElementById('astronaut-prompt');
        if (!prompt) {
            prompt = document.createElement('div');
            prompt.id = 'astronaut-prompt';
            prompt.className = 'box'; // Bulma CSS class for a box
            prompt.style.position = 'fixed';
            prompt.style.padding = '10px';
            // prompt.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            // prompt.style.color = 'white';
            // prompt.style.borderRadius = '5px';
            prompt.style.pointerEvents = 'none';
            prompt.style.zIndex = '1000';
            // prompt.textContent = "Hi! I'm on a mission to probe the mysteries of the universe";
            prompt.innerHTML = `
                <p class="has-text-white">Hi! I'm on a mission to probe the mysteries of the universe</p>
            `;
            document.body.appendChild(prompt);
        }
        prompt.style.display = 'block';
        prompt.style.left = `${x + 10}px`;
        prompt.style.top = `${y + 10}px`;
    }

    function hidePrompt() {
        const prompt = document.getElementById('astronaut-prompt');
        if (prompt) {
            prompt.style.display = 'none';
        }
    }

    function updateAstronaut() {
        if (astronaut && blackHolePosition) {
            const distanceToBlackHole = astronaut.position.distanceTo(blackHolePosition);
            const direction = new THREE.Vector3().subVectors(blackHolePosition, astronaut.position).normalize();
            
            // Calculate speed based on distance (slows down as it gets closer)
            const speed = Math.max(0.01, distanceToBlackHole / 500);
            // console.log(speed);
            
            astronaut.position.addScaledVector(direction, speed);
            
            // Small up and down motion
            // astronaut.position.y += Math.sin(clock.getElapsedTime()) * 0.05;
            
            // Rotate to face the black hole
            astronaut.lookAt(blackHolePosition);

            // Reset position if too close to black hole
            if (distanceToBlackHole < 20) {
                resetAstronautPosition();
            }

            // Update animation mixer
            if (mixer) {
                mixer.update(clock.getDelta());
            }
        }
    }

    return { 
        updateAstronaut,
        cleanup: () => {
            clearInterval(animationInterval);
            const prompt = document.getElementById('astronaut-prompt');
            if (prompt) {
                prompt.remove();
            }
        }
    };
}