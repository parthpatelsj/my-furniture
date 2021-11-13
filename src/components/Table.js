import * as THREE from "three";
import * as OBJLoader from 'three-obj-loader';

export default class Table {
  constructor(topPlane, sidePlane, backPlane) {
    this.topPlane = topPlane;
    this.sidePlane = sidePlane;
    this.backPlane = backPlane;
  }

  init({ scene, camera, renderer }) {


    const sideGeometry = new THREE.BoxGeometry(
      this.sidePlane.x,
      this.sidePlane.y,
      this.sidePlane.z
    );

    const loader = new THREE.TextureLoader();

    const material = new THREE.MeshBasicMaterial({
      map: loader.load('./wood-floor.jpg'),
    });
    const bottomMaterial = new THREE.MeshLambertMaterial({
      color: "#f0dea6",
      side: THREE.DoubleSide,
    });



    const leftSide = new THREE.Mesh(sideGeometry, material);
    leftSide.position.x = 7;
    leftSide.name = "side-plane";
    scene.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeometry, material);
    rightSide.position.x = -7;
    rightSide.name = "side-plane";
    scene.add(rightSide);

    const topMaterial = new THREE.MeshLambertMaterial({
      color: "#996633",
      side: THREE.DoubleSide,
    });

    const topBottomMaterial = new THREE.MeshLambertMaterial({
      color: "#996633",
      side: THREE.DoubleSide,
    });

    const topGeometry = new THREE.BoxGeometry(
      this.topPlane.x,
      this.topPlane.y,
      this.topPlane.z
    );
    const topPlane = new THREE.Mesh(topGeometry, material);

    const topBottomPlane = new THREE.Mesh(topGeometry, material);

    topPlane.position.y = 4;
    topPlane.rotateZ(-Math.PI / 2);
    topPlane.name = "top-plane";
    scene.add(topPlane);


    topBottomPlane.position.y = 3.5;
    topBottomPlane.rotateZ(-Math.PI / 2);
    topBottomPlane.name = "top-bottom-plane";
    scene.add(topBottomPlane);

    const backGeometry = new THREE.BoxGeometry(
      this.backPlane.x,
      this.backPlane.y,
      this.backPlane.z
    );

    const backPlane = new THREE.Mesh(backGeometry, material);
    backPlane.position.y = 2;
    backPlane.position.z = 3;
    backPlane.rotateY(-Math.PI / 2);
    backPlane.name = "back-plane";
    // scene.add(backPlane);

    renderer.render(scene, camera);
  }
}
