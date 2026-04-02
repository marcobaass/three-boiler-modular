precision highp float;

uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform vec2 uResolution;

void main() {
  // Basic position -> clip space
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // Size of each point sprite
  gl_PointSize = 2.0;
}