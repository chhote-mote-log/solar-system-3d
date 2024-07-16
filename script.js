import * as THREE from "three";
import earthImage from "./img/earth.jpg"
import jupiterImage from "./img/jupiter.jpg"
import marsImage from "./img/mars.jpg"
import mercuryImage from "./img/mercury.jpg"
import neptuneImage from "./img/neptune.jpg"
import plutoImage from "./img/pluto.jpg"
import saturnImage from "./img/saturn.jpg"
import starsImage from "./img/stars.jpg"
import sunImage from "./img/sun.jpg"
import uranusImage from "./img/uranus.jpg"
import venusImage from "./img/venus.jpg"
import uranusringImage from "./img/uranusring.png"
import saturnringImage from "./img/saturnring.png"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,0.1,20000);

const scene = new THREE.Scene();
const orbit = new OrbitControls(camera,renderer.domElement);
camera.position.set(100,100,100)
orbit.update();
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTexter = new THREE.CubeTextureLoader();
scene.background= cubeTexter.load([
    starsImage,
    starsImage,
    starsImage,
    starsImage,
    starsImage,
    starsImage,
])
const texter = new THREE.TextureLoader();

const sunGeometry = new THREE.SphereGeometry(100,30,30);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: texter.load(sunImage)
});
const sun = new THREE.Mesh(sunGeometry,sunMaterial);
scene.add(sun);
function createPlanet(size,texterImage,position,ring){
    const Geometry = new THREE.SphereGeometry(size,30,30);
    const Material = new THREE.MeshBasicMaterial({
        map: texter.load(texterImage)
    });
    const planet = new THREE.Mesh(Geometry,Material);
    const Obj = new THREE.Object3D();
    Obj.add(planet);
    if(ring){
        const ringGeo = new THREE.RingGeometry(ring.innerRadius,ring.outerRadius,32);
        const ringMat = new THREE.MeshBasicMaterial({
            map:texter.load(ring.image),
            side: THREE.DoubleSide
        })
        const Mesh = new THREE.Mesh(ringGeo,ringMat);
        Obj.add(Mesh);
        Mesh.position.x = position;
        Mesh.rotation.x = 0.5*Math.PI;
    }
  planet.position.x = position;
  scene.add(Obj)
  return {planet,Obj};
}

const mercury = createPlanet(5,mercuryImage,157)
const venus = createPlanet(5,venusImage,208)
const earth = createPlanet(7,earthImage,249)
const mars = createPlanet(5,marsImage,327)
const jupiter = createPlanet(30,jupiterImage,878)
const saturn = createPlanet(30,saturnImage,1529,{
    innerRadius:35,
    outerRadius:55,
    image:saturnringImage,
})
const neptune = createPlanet(27,neptuneImage,4590)
const uranus = createPlanet(21,uranusImage,2970,{
    innerRadius:24,
    outerRadius:27,
    image:uranusringImage,

})
const pluto = createPlanet(25,plutoImage,6000)

const pointLight = new THREE.PointLight(0xFFFFFF, 10, 300);
scene.add(pointLight);
renderer.render(scene,camera);
function animate(){
   sun.rotateY(24);
   mercury.Obj.rotateY(0.1)
   earth.Obj.rotateY(0.06);
   venus.Obj.rotateY(0.073);
   mars.Obj.rotateY(0.05);
   jupiter.Obj.rotateY(0.027);
   saturn.Obj.rotateY(0.020);
   uranus.Obj.rotateY(0.014);
   neptune.Obj.rotateY(0.011);
   pluto.Obj.rotateY(0.010);
   
   mercury.planet.rotateY(0.04)
   earth.planet.rotateY(-0.06);
   venus.planet.rotateY(0.043);
   mars.planet.rotateY(0.05);
   jupiter.planet.rotateY(0.027);
   saturn.planet.rotateY(0.020);
   uranus.planet.rotateY(-0.04);
   neptune.planet.rotateY(0.031);
   pluto.planet.rotateY(0.020);
   

   


   renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);