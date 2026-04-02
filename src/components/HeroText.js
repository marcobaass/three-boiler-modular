import * as THREE from 'three';
import vertexShader from '../shaders/heroText/vertex.glsl?raw';
import fragmentShader from '../shaders/heroText/fragment.glsl?raw';
import { eventBus } from '../core/EventBus.js';

export class HeroText {
  constructor({ atlas, fontData }) {
    this.atlas = atlas ?? null;
    this.fontData = fontData ?? null;

    this.uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
    };

    this.geometry = new THREE.PlaneGeometry(1, 1);

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.onScroll = (progress) => this.setProgress(progress);
    eventBus.on('scroll:progress', this.onScroll);
  }

  setProgress(value) {
    this.uniforms.uProgress.value = value;
  }

  update(delta) {
    this.uniforms.uTime.value += delta;
  }

  destroy() {
    eventBus.off('scroll:progress', this.onScroll);
    this.geometry?.dispose();
    this.material?.dispose();
  }
}
