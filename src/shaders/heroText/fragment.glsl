precision highp float;

uniform float uTime;
uniform float uScroll;

void main() {
  // gl_PointCoord is 0..1 across the point sprite
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);

  // Soft circular alpha
  float alpha = smoothstep(0.5, 0.2, d);

  vec3 color = vec3(0.4, 0.8, 1.0);
  gl_FragColor = vec4(color, alpha * clamp(uScroll, 0.0, 1.0));
}