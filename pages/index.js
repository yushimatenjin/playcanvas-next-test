import React, { useEffect, useState } from "react";
import pc from "playcanvas";
import styled from "styled-components";
import Canvas from '../components/Canvas'
import Create from '../utils/create'
const Types = styled.div`
  display: "flex";
`;
const ModelType = styled.span`
  margin: 5px;
  border: 4px solid #333;
  :hover {
    font-size: 1.5rem;
  }
`;


function createMaterial(color) {
  var material = new pc.StandardMaterial();
  material.diffuse = color;
  material.update()

  return material;
}
const Page = () => {
  const [modelType, setModelType] = useState("cone");
  const [speed, setSpeed] = useState(300);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const app = require("../components/App").default
      const cube = require("../components/Cube").default
      // create camera entity
      app.mouse.on(pc.EVENT_MOUSEDOWN, ()=>{
      })
      // create directional light entity
      const light = new pc.Entity("light");
      light.addComponent("light");
      var green = createMaterial(new pc.Color(0, 1, 0));
      var types = [ 'box', 'capsule', 'cone', 'cylinder', 'sphere' ];
      types.forEach(function (type, idx) {
          Create(type, green, idx * 2 + 1, 2, 0, app);
      });
      // add to hierarchy
      app.root.addChild(cube);
      app.root.addChild(light);
      cube.setPosition(1, 2, 0)
      light.setEulerAngles(45, 0, 0);

      var camera = new pc.Entity();
      camera.addComponent("camera", {
          clearColor: new pc.Color(0.5, 0.5, 0.8)
      });

      app.root.addChild(camera);
      camera.setPosition(5, 0, 15);

      // register a global update event
      app.on("update", function(deltaTime) {
        cube.rotate(speed * deltaTime, speed * deltaTime, speed * deltaTime);
      });
    }
  }, [modelType, speed]);

  return (
      <Canvas />
  );
};

export default Page;
