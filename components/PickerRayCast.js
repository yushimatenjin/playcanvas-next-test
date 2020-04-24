import pc from "playcanvas";
const PickerRayCastCreator = (func) => {
  var PickerRaycast = pc.createScript("pickerRaycast");

  // initialize code called once per entity
  PickerRaycast.prototype.initialize = function () {
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);
  };

  PickerRaycast.prototype.onSelect = function (e) {
    var from = this.entity.camera.screenToWorld(
      e.x,
      e.y,
      this.entity.camera.nearClip
    );
    var to = this.entity.camera.screenToWorld(
      e.x,
      e.y,
      this.entity.camera.farClip
    );
    // cosole.log(e)
    // console.log(this.entity)n

    var result = this.app.systems.rigidbody.raycastFirst(from, to);
    console.log(result, "resul")
    if (result) {
      var pickedEntity = result.entity;
      console.log("Entity")
      func()
    }
  };
};
export default PickerRayCastCreator;
