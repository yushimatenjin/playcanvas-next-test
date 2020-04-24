import React, { useEffect, useState } from "react";
import pc from "playcanvas";
import styled from "styled-components";
import Canvas from "../components/Canvas";
import Create from "../utils/create";
import Header from "../components/Header";
import Footer from "../components/Footer";
import createRotator from "../components/Rotator";
import MouseInputCreator from "../components/MouseInput";
import OrbitCameraCreator from "../components/OrbitCamera";
import PickerRayCastCreator from "../components/PickerRayCast";
import LoadModule from '../utils/loadModule'
function createMaterial(color) {
  var material = new pc.StandardMaterial();
  material.diffuse = color;
  material.update();

  return material;
}
const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [speed, setSpeed] = useState(0.2);
  const [loaded, setLoaded] = useState(false);
  const app = require("../components/App").default;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!loaded) {
        createRotator();
        OrbitCameraCreator();
        MouseInputCreator();
        PickerRayCastCreator()
        console.log(app.script);

        var camera = new pc.Entity();
        camera.addComponent("camera", {
          clearColor: new pc.Color(0.4, 0.45, 0.5),
          projection: pc.PROJECTION_ORTHOGRAPHIC,
          orthoHeight: 3
  
        });
        camera.setPosition(5, 0, 15);

        camera.addComponent("script");
        camera.script.create("orbitCamera", {
          attributes: {
            inertiaFactor: 0.2, // Override default of 0 (no inertia)
          },
        });
        camera.script.create("orbitCameraInputMouse");
        camera.script.create("orbitCameraInputTouch");
        camera.script.create("pickerRaycast")
        app.root.addChild(camera);
        const PRELOAD_MODULES = [
          {'moduleName' : 'Ammo', 'glueUrl' : 'files/assets/30215644/1/ammo.wasm.js', 'wasmUrl' : 'files/assets/30215642/1/ammo.wasm.wasm', 'fallbackUrl' : 'files/assets/30215643/1/ammo.js', 'preload' : true},
      ];
      const ASSET_PREFIX = "";
        LoadModule(PRELOAD_MODULES, ASSET_PREFIX, () => {
          app.configure("/config.json", () => {
            app.loadScene("/908889.json", function (err, scene) {
              if (err) {
                console.error(err);
              }
              setLoaded(true);
            });
          });
        })
       
      }
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      app.off("update");
      const base = app.root.findByName("base");

      app.on("update", function (deltaTime) {
        base.rotate(speed, speed, speed);
      });
      app.mouse.on(pc.EVENT_MOUSEDOWN, () => {
      });
    }
  }, [loaded, speed,showModal]);

  return (
    <>
      <Header />
      {showModal && <div>Show Modal</div>}
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            padding: "1rem",
          }}
        >
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            toggle modal
          </button>
          <button
            onClick={() => {
              setSpeed(speed * 1.2);
            }}
          >
            SpeedUp
          </button>

          <button
            onClick={() => {
              setSpeed(speed / 1.2);
            }}
          >
            SpeedDown
          </button>
        </div>
        <Canvas />
      </div>
      <Footer />
    </>
  );
};

export default Page;
