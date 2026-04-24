import * as THREE from 'three';
import vertexShader from '../shaders/particles/vertex.glsl?raw';
import fragmentShader from '../shaders/particles/fragment.glsl?raw';

export class ParticleSystem {
  constructor(eventBus, scene) {
    this.eventBus = eventBus;
    this.scene = scene;

    this.uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    this.init();
    this.addListeners();

    this.targetScroll = 0;
  }

  init() {
    this.createGeometry();
    this.createMaterial();
    this.createPoints();
    this.scene.add(this.points);
  }

  onResize = ({ width, height }) => {
    this.uniforms.uResolution.value.set(width, height);
  };

  addListeners() {
    this.eventBus.on('scroll:progress', this.onScroll);
    this.eventBus.on('mouse:move', this.onMouseMove);
    this.eventBus.on('resize', this.onResize);
  }

  update(delta) {
    this.uniforms.uTime.value += delta;

    // k = 4 → slow floaty smoothing
    // k = 8 → balanced (good default)
    // k = 15 → snappy smoothing
    const k = 8;
    const safeDelta = Math.min(delta, 0.05);
    const alpha = 1 - Math.exp(-safeDelta * k);
    // smoothly animate the scroll progress
    this.uniforms.uScroll.value += (this.targetScroll - this.uniforms.uScroll.value) * alpha;
  }

  destroy() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
    this.eventBus.off('scroll:progress', this.onScroll);
    this.eventBus.off('mouse:move', this.onMouseMove);
    this.eventBus.off('section:enter', this.onSectionEnter);
    this.eventBus.off('resize', this.onResize);
  }

  createGeometry() {
    const count = 2000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }

  createMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }

  createPoints() {
    this.points = new THREE.Points(this.geometry, this.material);
  }

  onScroll = (progress) => {
    this.targetScroll = progress;
  };

  onMouseMove = (mouse) => {
    this.uniforms.uMouse.value.set(mouse.x, mouse.y);
  };

  onSectionEnter = () => {
    this.uniforms.uTime.value = 0;
  };
}
