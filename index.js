//import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const THREE = window.MINDAR.IMAGE.THREE;
const mindarThree = new window.MINDAR.IMAGE.MindARThree({
container: document.querySelector("#container"),
    imageTargetSrc: "./targets.mind"
});
const {renderer, scene, camera} = mindarThree;
const anchor = mindarThree.addAnchor(0);
const geometry = new THREE.PlaneGeometry(1, 0.55);
const material = new THREE.MeshBasicMaterial( {color: 0xF7CAC9, transparent: true, opacity: 0.5} );
const plane = new THREE.Mesh( geometry, material );

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshLambertMaterial( {color: 0xF7CAC9, side: THREE.DoubleSide, emissive: 0xF7CAC9} );
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//const loader = new GLTFLoader();

scene.add(new THREE.AmbientLight(0xffffff));
anchor.group.add(plane);
anchor.group.add(box);
camera.position.set(20,0,20);
/*camera.lookAt(new THREE.Vector3(0,0,0));
loader.load( './koala.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );*/
const start = async() => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
	start();
});
stopButton.addEventListener("click", () => {
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
});