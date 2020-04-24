import Canvas from "./Canvas";
import pc from "playcanvas";

let app = {};
if (process.browser) {
  const canvas = document.getElementById(Canvas().props.id);
  app = new pc.Application(canvas, {
    mouse: new pc.Mouse(canvas),
    touch: new pc.TouchDevice(canvas),
    keyboard: new pc.Keyboard(window),
  });
  app.start();
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  // ensure canvas is resized when window changes size
  window.addEventListener("resize", function () {
    app.resizeCanvas();
  });
}
export default app;
