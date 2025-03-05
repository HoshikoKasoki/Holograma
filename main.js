import * as THREE from 'three';
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

//Se instancian las variables
    let container;

    let camera, scene, renderer, effect;

    let textureLoader = new THREE.TextureLoader();
    let texturallave = textureLoader.load('/textura_oro.png'); 


//Se crea un contenedor
    container = document.createElement( 'div' );
    document.body.appendChild( container );

//render

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setAnimationLoop( animate );
    container.appendChild( renderer.domElement );

//Se crea el efecto PeppersGhost
    effect = new PeppersGhostEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.cameraDistance = 5;

    window.addEventListener( 'resize', onWindowResize );
//Camara
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
//Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaafa);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff,3);
    hemiLight.color.setHSL(10,10,10);
    hemiLight.position.set(0,0,0);
    scene.add(hemiLight);

    //comienzo de fbx
//var Myfbx;

const objgirar = [];

const fbxLoader = new FBXLoader()
fbxLoader.load('/llave.fbx', (object) => {
    object.scale.set(0.5, 0.5, 0.5); // Escalar si es necesario
    object.position.set(0,0,0);
    scene.add(object);
    object.rotation.set( Math.PI/1, 0, Math.PI/2);
    objgirar.push(object);

    object.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: texturallave, roughness: 0.5, metalness: 0.7 });
        }
    });

}, 

(xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% cargado'); }, 
(error) => { console.error('Error al cargar FBX:', error); });

//Ajuste de pantalla

function onWindowResize(){

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

effect.setSize(window.innerWidth, window.innerHeight);

}

//Animaciones
function animate(){
    objgirar.some(object => object.rotation.y += 0.005);

effect.render(scene, camera);
}
animate();
 

 