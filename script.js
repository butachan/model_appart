import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

// Création de la scène, caméra et rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Charger le modèle de l'appartement
const loader = new GLTFLoader();
loader.load('model/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
}, undefined, (error) => {
    console.error('Erreur de chargement du modèle', error);
});

// Ajouter une lumière
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Positionner la caméra
camera.position.set(0, 1.6, 3); // Hauteur des yeux (~1.6m)

// Déplacement avec touches ZQSD/AWSD (ou flèches)
const controls = { forward: false, backward: false, left: false, right: false };
document.addEventListener('keydown', (event) => {
    if (event.key === 'z' || event.key === 'w') controls.forward = true;
    if (event.key === 's') controls.backward = true;
    if (event.key === 'q' || event.key === 'a') controls.left = true;
    if (event.key === 'd') controls.right = true;
});
document.addEventListener('keyup', (event) => {
    if (event.key === 'z' || event.key === 'w') controls.forward = false;
    if (event.key === 's') controls.backward = false;
    if (event.key === 'q' || event.key === 'a') controls.left = false;
    if (event.key === 'd') controls.right = false;
});

// Boucle d’animation
function animate() {
    requestAnimationFrame(animate);

    // Gestion du déplacement
    const speed = 0.05;
    if (controls.forward) camera.position.z -= speed;
    if (controls.backward) camera.position.z += speed;
    if (controls.left) camera.position.x -= speed;
    if (controls.right) camera.position.x += speed;

    renderer.render(scene, camera);
}
animate();

// Ajuster la taille en cas de redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
