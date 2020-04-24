import React, { useEffect, useState } from "react";
import pc from "playcanvas";
import styled from "styled-components";
import Canvas from "../components/Canvas";
import Create from "../utils/create";
import Header from "../components/Header";
import Footer from "../components/Footer";
import createRotator from '../components/Rotator'
function createMaterial(color) {
  var material = new pc.StandardMaterial();
  material.diffuse = color;
  material.update();

  return material;
}
const Page = () => {
  const [modelType, setModelType] = useState("cone");
  const [speed, setSpeed] = useState(4);
  const [loaded, setLoaded] = useState(false);
  const app = require("../components/App").default;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!loaded) {
        createRotator()

        app.mouse.on(pc.EVENT_MOUSEDOWN, () => {});
        var camera = new pc.Entity();
        camera.addComponent("camera", {
          clearColor: new pc.Color(0.5, 0.5, 0.8),
        });
        app.root.addChild(camera);
        camera.setPosition(5, 0, 15);

        camera.addComponent('script');
        camera.script.create('rotator');

        app.configure("/config.json", () => {
          app.loadScene("/908889.json", function (err, scene) {
            if (err) {
              console.error(err);
            }
            setLoaded(true);
          });
        });

 
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
    }
  }, [loaded, speed]);
  console.log(app);
  console.log(speed);
  return (
    <>
      <Header />
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
          <span>SideBar</span>
          <div
            onClick={() => {
              setSpeed(speed * 1.2);
            }}
          >
            SpeedUp
          </div>

          <div
            onClick={() => {
              setSpeed(speed / 1.2);
            }}
          >
            SpeedDown
          </div>
        </div>
        <Canvas />
      </div>
      <Footer />
    </>
  );
};

export default Page;
