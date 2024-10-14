// equationFall.js

// Import THREE.js (assuming you are using ES modules)
import * as THREE from 'three';

// Function to load equation textures
export function loadEquationTextures(paths) {
    const loader = new THREE.TextureLoader();
    return paths.map(path => loader.load(path));
}

// Function to create a sprite for an equation PNG
export function createEquationSprite(texture, scene, scale = 50) {
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    // console.log(texture)
    // const imgWidth = texture.image.width;
    // const imgHeight = texture.image.height;
    // const aspectRatio = imgWidth / imgHeight;

    // Set the scale to make the equation bigger
    // sprite.scale.set(scale*aspectRatio,scale,1); // Adjust X and Y, keeping Z = 1 since it's a flat sprite
    sprite.scale.setScalar(scale)

    scene.add(sprite);
    return sprite;
}

// Function to get a random starting position for the equation
export function getRandomPosition(radius) {
    return new THREE.Vector3(
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius
    );
}

// Function to pop up an equation sprite at a random position
export function popUpEquation(equationSprite, radius = 500) {
    const startPosition = getRandomPosition(radius);
    equationSprite.position.copy(startPosition);
}

// Function to animate the falling of the equation into the black hole
export function animateFalling(sprite, scene, onReachCenter, speed = 1) {
    const targetPosition = new THREE.Vector3(-100,0,20); // Center of the black hole
    const direction = new THREE.Vector3();
    direction.subVectors(targetPosition, sprite.position).normalize();

    const interval = setInterval(() => {
        sprite.position.add(direction.clone().multiplyScalar(speed));

        // Check if sprite reaches the center (within a small threshold)
        if (sprite.position.distanceTo(targetPosition) < 5) {
            clearInterval(interval);
            scene.remove(sprite); // Remove the sprite from the scene
            onReachCenter();      // Trigger next equation to pop up
        }
    }, 16); // ~60fps
}

// Function to spawn a new equation
export function spawnNewEquation(textures, scene) {
    const randomIndex = Math.floor(Math.random() * textures.length);
    const newSprite = createEquationSprite(textures[randomIndex], scene);
    popUpEquation(newSprite);
    animateFalling(newSprite, scene, () => {
        spawnNewEquation(textures, scene); // Recursively spawn next equation
    });
}