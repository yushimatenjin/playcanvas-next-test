import pc from "playcanvas";

const createRotator = () => {
  const Rotator = pc.createScript("rotator");

  let t = 0;

  Rotator.prototype.update = function (dt) {
    t += dt;
    this.entity.setEulerAngles(0, Math.sin(t) * 20, 0);
  };
};

export default createRotator;
