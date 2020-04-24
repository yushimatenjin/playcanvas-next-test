import pc from "playcanvas";

const cube = new pc.Entity("cube");
cube.addComponent({
    type: "cone"
})
cube.setLocalScale(3,3,3)

export default cube