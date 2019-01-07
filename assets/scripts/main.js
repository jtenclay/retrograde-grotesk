import '../styles/main.scss';

import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

var loader = new THREE.FontLoader();

loader.load( '/data/gentilis_regular.typeface.json', function ( font ) {

  var geometry = new THREE.TextGeometry( 'Hello three.js!', {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    // bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  } );

  const textMaterials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
    new THREE.MeshPhongMaterial({ color: 0xffffff }),
   ];

  var mesh = new THREE.Mesh( geometry, textMaterials );
  // mesh.position.set( x, y, z );

  scene.add( mesh );
} );

// var text = new THREE.TextGeometry( 'hi', loader );



const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 100, 90);
scene.add(pointLight);
pointLight.color.setHSL(0.5, 1, 0.5);

camera.position.x = 100;
camera.position.y = 100;
camera.position.z = 300;
camera.lookAt(100, 0, 0);

function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}
animate();
