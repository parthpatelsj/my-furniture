import React, { useEffect, useState } from "react";
import ImageUploading from 'react-images-uploading';
import * as THREE from "three";


import {
  ControlsContainer,
  RadioButton,
  Total,
  SettingsButton,
  CloseButton,
} from "../styles/styles";
import Colors from "./controls/Colors";

const Controls = ({ Scene3D }) => {
  const [topWidth, setTopWidth] = useState(20);
  const [topDepth, setTopDepth] = useState(20);
  const [sideHeight, setSideHeight] = useState(1);
  const [total, setTotal] = useState(300);
  const [realWidth, setRealWidth] = useState(6);
  const [controlsOpen, setControlsOpen] = useState(false);
  const maxNumber = 69;


  const loader = new THREE.TextureLoader();


  const changeTableTopTexutre = (img) => {
    const object = Scene3D.scene.getObjectByName( "top-plane" );
    var texture = new THREE.TextureLoader().load( img );
    const newMaterial = new THREE.MeshBasicMaterial({
      map: texture,
    });
    object.material = newMaterial;

  }

  const changeTopSize = (part1, part2, position, width) => {
    const currentItems = Scene3D.scene.children.filter(
      (item) => item.name === part1 || item.name === part2
    );
    currentItems.map((item) => {
      item.scale[position] = width;
      Scene3D.renderer.render(Scene3D.scene, Scene3D.camera);
    });
  };

  const changeHeight = (part1, part2, position, height) => {
    const currentItems = Scene3D.scene.children.filter(
      (item) => item.name === part1 || item.name === part2
    );

    currentItems.map((item) => {
      item.scale[position] = height;
      const multi = item.geometry.parameters.height * height;
      const diff = multi - item.geometry.parameters.height;
      const sub = -diff / 2;
      item.position.set(item.position.x, sub, item.position.z);
      Scene3D.renderer.render(Scene3D.scene, Scene3D.camera);
    });
  };

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
        changeTableTopTexutre(current.src);

      };
      reader.readAsDataURL(file);
    }

  };

  useEffect(() => {
    const width = topWidth / 20;
    setRealWidth(realWidth * width);
    if (Scene3D.scene) changeTopSize("top-plane", "top-ruler", "y", width);
  }, [topWidth]);

  useEffect(() => {
    const width = topDepth / 20;
    if (Scene3D.scene) changeTopSize("top-plane", "top-ruler", "z", width);
  }, [topDepth]);

  useEffect(() => {
    const height = parseFloat(sideHeight);
    if (Scene3D.scene) changeHeight("side-plane", "side-ruler", "y", height);
  }, [sideHeight]);

  const calculateTotal = () => {
    const widthTotal = (topWidth - 20) * 10;
    const topTotal = (topDepth - 20) * 10;
    const sideTotal = sideHeight * 15;
    const newTotal = 300 + widthTotal + topTotal + sideTotal;
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [topWidth, topDepth, sideHeight]);

  return controlsOpen ? (
    <ControlsContainer>
      <CloseButton
        onClick={() => setControlsOpen(!controlsOpen)}
        src="../../cancel.png"
        alt="Settings"
      />
     
      <Total>
        <p>Total: $500</p>
      </Total>


    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        style={{
          height: "60px",
          width: "60px",
          border: "1px dashed black"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "100%",
            height: "100%",
            position: "acsolute"
          }}
        />
      </div>
      <span
        style={{
          color: "white"
        }}
        >Click to upload Image</span>
    </div>

    </ControlsContainer>
  ) : (
    <SettingsButton
      onClick={() => setControlsOpen(!controlsOpen)}
      src="../../setting.png"
      alt="Settings"
    />
  );
};

export default Controls;
