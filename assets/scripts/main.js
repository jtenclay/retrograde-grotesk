import '../styles/main.scss';
import * as THREE from 'three';

// Scene setup

const scene = new THREE.Scene();

// Camera

let aspect = window.innerWidth / window.innerHeight;
const d = 20;
const camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
// camera.position.x = 225;
// camera.position.y = 200;
// camera.position.z = 200;
// camera.lookAt(25, 0, 0);

camera.position.x = 25;
camera.position.y = 0;
camera.position.z = 100;
camera.lookAt(25, 0, 0);

// Renderer

const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Cube

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, material );

scene.add( cube );

// Text

const loader = new THREE.FontLoader();

loader.load( '/data/Retrograde_Grotesk_Regular.json', function ( font ) {
  // Note: would using a bitmap font fix this messed-up kerning?
  const textGeometry = new THREE.TextGeometry( 'SWXEDCRFVTGBYHNUJMIKNUHYBGTVFRCD!', {
    font: font,
    size: 10,
    height: 4,
    curveSegments: 12,
    // bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  } );

  const textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );

  // const textMaterials = [
  //   new THREE.MeshPhongMaterial({ color: 0xffffff }),
  //   new THREE.MeshPhongMaterial({ color: 0xffffff }),
  //  ];

  var textMesh = new THREE.Mesh( textGeometry, textMaterial );
  textMesh.position.set( 0, 0, 0 );

  scene.add( textMesh );
} );

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 100, 90);
pointLight.color.setHSL(0.25, 1, 0.5);

scene.add(pointLight);

scene.add( new THREE.AmbientLight( 0x333333 ) );

// Animation

function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.position.x += 0.25;

  // Try transitioning from ortho to iso view
  if (camera.position.x < 225) {
    camera.position.y += 1;
    camera.position.x += 1;
    camera.position.z += .5;
    camera.lookAt(25, 0, 0);
  }
  renderer.render( scene, camera );
}
animate();
