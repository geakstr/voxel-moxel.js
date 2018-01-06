import { getUniform, SHADER_UNIFORM } from "./shaders";
import * as camera from "./camera";
import { renderCube } from "./meshes/cube";

const fpsNode = document.querySelector("#fps")!;
let elapsedTime = 0;
let fps = 0;
let lastTime = performance.now();

export const render = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shaders: WebGLProgram,
  cubes: WebGLVertexArrayObject[]
) => {
  requestAnimationFrame(timeNow => {
    render(gl, canvas, shaders, cubes);

    const now = performance.now();
    fps++;
    elapsedTime += now - lastTime;
    lastTime = now;
    if (elapsedTime >= 1000) {
      fpsNode.textContent = `${fps} FPS`;
      fps = 0;
      elapsedTime -= 1000;
    }
  });
  tick(gl, canvas, shaders, cubes);
};

const tick = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shader: WebGLProgram,
  cubes: WebGLVertexArrayObject[]
) => {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniformMatrix4fv(
    getUniform(SHADER_UNIFORM.MVP_MATRIX),
    false,
    camera.update(canvas.width / canvas.height)
  );
  const cubesCount = cubes.length;
  for (let i = 0; i < cubesCount; i += 1) {
    renderCube(gl, cubes[i]);
  }
};
