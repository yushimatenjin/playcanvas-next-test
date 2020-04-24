import pc from "playcanvas";

function createPhysicalShape (type, material, x, y, z, app) {
    var e = new pc.Entity();

    // Have to set the position of the entity before adding the static rigidbody
    // component because static bodies cannot be moved after creation
    app.root.addChild(e);
    e.setPosition(x, y, z);
    e.setLocalScale(2,2,2)
    e.addComponent('model', {
        type: type,
        material: material
    });
    e.addComponent('rigidbody', {
        type: 'static'
    });
    e.addComponent('collision', {
        type: type,
        height: type === 'capsule' ? 2 : 1
    });

    return e;
}


export default createPhysicalShape